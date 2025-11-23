# PowerShell script to download images from CSV export and organize them
# Usage: .\download-news-images.ps1 [-DryRun]

param(
    [string]$CsvPath = "dataexport\Berichten-Export-2025-November-21-1214.csv",
    [string]$OutputPath = "public\images\news",
    [switch]$DryRun,
    [int]$MaxRows
)

# Ensure we're running from the correct directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "Starting image download process..." -ForegroundColor Green
if ($DryRun) {
    Write-Host "[DRY RUN MODE] - No files will be downloaded or directories created" -ForegroundColor Yellow
}
Write-Host "CSV Path: $CsvPath" -ForegroundColor Cyan
Write-Host "Output Path: $OutputPath" -ForegroundColor Cyan
Write-Host "Max Rows to Process: $MaxRows" -ForegroundColor Cyan

# Check if CSV file exists
if (-not (Test-Path $CsvPath)) {
    Write-Error "CSV file not found: $CsvPath"
    exit 1
}

# Create output directory if it doesn't exist
if (-not $DryRun -and -not (Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
    Write-Host "Created output directory: $OutputPath" -ForegroundColor Yellow
} elseif ($DryRun -and -not (Test-Path $OutputPath)) {
    Write-Host "[DRY RUN] Would create directory: $OutputPath" -ForegroundColor Cyan
}

# Function to sanitize folder names
function Get-SafeFolderName {
    param([string]$Name)
    
    # Convert to lowercase first
    $SafeName = $Name.ToLower()
    
    # Replace spaces with hyphens
    $SafeName = $SafeName -replace '\s+', '-'
    
    # Remove all characters that are NOT letters, numbers, or hyphens
    $SafeName = $SafeName -replace '[^a-z0-9\-]', ''
    
    # Replace multiple consecutive hyphens with single hyphen
    $SafeName = $SafeName -replace '-+', '-'
    
    # Remove leading/trailing hyphens
    $SafeName = $SafeName.Trim('-')
    
    # Limit length to avoid path issues
    if ($SafeName.Length -gt 50) {
        $SafeName = $SafeName.Substring(0, 50).Trim('-')
    }
    
    return $SafeName
}

# Function to log dry run actions
function Write-DryRunLog {
    param(
        [string]$Action,
        [string]$Details
    )
    Write-Host "[DRY RUN] $Action`: $Details" -ForegroundColor Cyan
}

# Function to download image with retry logic
function Download-Image {
    param(
        [string]$Url,
        [string]$OutputPath,
        [int]$MaxRetries = 3
    )
    
    if ($DryRun) {
        Write-DryRunLog "DOWNLOAD" "$Url -> $(Split-Path -Leaf $OutputPath)"
        return $true
    }
    
    for ($i = 1; $i -le $MaxRetries; $i++) {
        try {
            Write-Host "  Downloading: $Url" -ForegroundColor Gray
            Invoke-WebRequest -Uri $Url -OutFile $OutputPath -UseBasicParsing -TimeoutSec 30
            Write-Host "  ✓ Downloaded: $(Split-Path -Leaf $OutputPath)" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "  ✗ Attempt $i failed: $($_.Exception.Message)" -ForegroundColor Red
            if ($i -eq $MaxRetries) {
                Write-Host "  ✗ Failed to download after $MaxRetries attempts: $Url" -ForegroundColor Red
                return $false
            }
            Start-Sleep -Seconds 2
        }
    }
    return $false
}

# Read and parse CSV
try {
    $CsvData = Import-Csv -Path $CsvPath -Encoding UTF8
    Write-Host "Found $($CsvData.Count) records in CSV" -ForegroundColor Cyan
    
    # Limit to MaxRows for testing
    if ($MaxRows -gt 0 -and $CsvData.Count -gt $MaxRows) {
        $CsvData = $CsvData | Select-Object -First $MaxRows
        Write-Host "Limited to first $MaxRows records for processing" -ForegroundColor Yellow
    }
}
catch {
    Write-Error "Failed to read CSV file: $($_.Exception.Message)"
    exit 1
}

$TotalImages = 0
$SuccessfulDownloads = 0
$SkippedEntries = 0

# Process each row
foreach ($Row in $CsvData) {
    $Title = $Row.Title
    $Date = $Row.Date
    $ImageUrls = $Row."Image URL"
    $ImageFilenames = $Row."Image Filename"
    
    # Skip if no title, date, or images
    if (-not $Title -or -not $Date -or -not $ImageUrls) {
        $SkippedEntries++
        if ($DryRun) {
            Write-Host "Skipping entry - Missing: Title='$Title', Date='$Date', Images='$ImageUrls'" -ForegroundColor Yellow
        } else {
            Write-Host "Skipping entry - Missing required data (Title/Date/Images)" -ForegroundColor Yellow
        }
        continue
    }
    
    Write-Host "`nProcessing: $Title" -ForegroundColor Yellow
    
    # Parse date and create folder name
    try {
        $DateObj = [DateTime]::Parse($Date)
        $DateString = $DateObj.ToString("yyyy-MM-dd")
    }
    catch {
        Write-Host "  ⚠ Invalid date format, using raw date: $Date" -ForegroundColor Yellow
        $DateString = $Date -replace '[<>:"/\\|?*]', '-'
    }
    
    # Create folder name: date + title
    $SafeTitle = Get-SafeFolderName -Name $Title
    $FolderName = "$DateString-$SafeTitle"
    $TargetFolder = Join-Path $OutputPath $FolderName
    
    # Create target folder
    if (-not $DryRun -and -not (Test-Path $TargetFolder)) {
        New-Item -ItemType Directory -Path $TargetFolder -Force | Out-Null
        Write-Host "  Created folder: $FolderName" -ForegroundColor Cyan
    } elseif ($DryRun) {
        Write-DryRunLog "CREATE FOLDER" $FolderName
    }
    
    # Process images (multiple URLs separated by |)
    if ($ImageUrls) {
        $UrlList = $ImageUrls -split '\|'
        # Handle filenames - ensure proper array behavior
        if ($ImageFilenames) { 
            $splitFilenames = $ImageFilenames -split '\|'
            # PowerShell quirk: single item needs special handling
            if ($splitFilenames -is [string]) {
                $FilenameList = @($splitFilenames)  # Single string to array
            } else {
                $FilenameList = $splitFilenames  # Already an array
            }
        } else { 
            $FilenameList = @() 
        }
        
        for ($i = 0; $i -lt $UrlList.Count; $i++) {
            $Url = $UrlList[$i].Trim()
            if (-not $Url) { continue }
            
            $TotalImages++
            
            # Determine filename
            if ($i -lt $FilenameList.Count -and $FilenameList[$i] -and $FilenameList[$i] -ne '') {
                $Filename = [string]$FilenameList[$i]
                if ($Filename) {
                    $Filename = $Filename.Trim()
                }
            }
            else {
                # Extract filename from URL
                $Filename = Split-Path -Leaf ([System.Uri]$Url).LocalPath
                if (-not $Filename -or $Filename -eq "") {
                    $Filename = "image_$($i + 1).jpg"
                }
            }
            
            $OutputFilePath = Join-Path $TargetFolder $Filename

            # Skip if file already exists (only check in non-dry-run mode)
            if (-not $DryRun -and (Test-Path $OutputFilePath)) {
                Write-Host "  ⏭ File already exists: $Filename" -ForegroundColor Gray
                $SuccessfulDownloads++
                continue
            } elseif ($DryRun) {
                Write-DryRunLog "IMAGE FILE" "$Filename (from: $Url)"
            }
            
            # Download the image
            if (Download-Image -Url $Url -OutputPath $OutputFilePath) {
                $SuccessfulDownloads++
            }
        }
    }
}

# Summary
Write-Host "`n" + "="*50 -ForegroundColor Green
if ($DryRun) {
    Write-Host "Dry Run Summary:" -ForegroundColor Green
    Write-Host "Total images that would be processed: $TotalImages" -ForegroundColor Cyan
    Write-Host "Images that would be downloaded: $SuccessfulDownloads" -ForegroundColor Green
    Write-Host "Entries that would be skipped: $SkippedEntries" -ForegroundColor Yellow
} else {
    Write-Host "Download Summary:" -ForegroundColor Green
    Write-Host "Total images found: $TotalImages" -ForegroundColor Cyan
    Write-Host "Successfully downloaded: $SuccessfulDownloads" -ForegroundColor Green
    Write-Host "Failed downloads: $($TotalImages - $SuccessfulDownloads)" -ForegroundColor Red
    Write-Host "Skipped entries (no images/date/title): $SkippedEntries" -ForegroundColor Yellow
}
Write-Host "="*50 -ForegroundColor Green

if ($TotalImages -eq 0) {
    Write-Host "No images found to download. Please check the CSV file format." -ForegroundColor Yellow
}
elseif ($SuccessfulDownloads -eq $TotalImages) {
    Write-Host "All images downloaded successfully! ✓" -ForegroundColor Green
}
else {
    Write-Host "Some downloads failed. Check the output above for details." -ForegroundColor Yellow
}
