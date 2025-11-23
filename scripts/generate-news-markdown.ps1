# PowerShell script to generate markdown files for news articles
# Usage: .\generate-news-markdown.ps1 [-DryRun]

param(
    [string]$CsvPath = "dataexport\Berichten-Export-2025-November-21-1214.csv",
    [string]$OutputDir = "content\nieuws",
    [string]$ImagesBaseDir = "public\images\news",
    [switch]$DryRun,
    [int]$MaxRows
)

# Ensure we're running from the correct directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

Write-Host "Starting markdown generation process..." -ForegroundColor Green
if ($DryRun) {
    Write-Host "[DRY RUN MODE] - No files will be created" -ForegroundColor Yellow
}
Write-Host "CSV Path: $CsvPath" -ForegroundColor Cyan
Write-Host "Output Directory: $OutputDir" -ForegroundColor Cyan
Write-Host "Images Base Directory: $ImagesBaseDir" -ForegroundColor Cyan
Write-Host "Max Rows to Process: $MaxRows" -ForegroundColor Cyan

# Check if CSV file exists
if (-not (Test-Path $CsvPath)) {
    Write-Error "CSV file not found: $CsvPath"
    exit 1
}

# Create output directory if it doesn't exist
if (-not $DryRun -and -not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "Created output directory: $OutputDir" -ForegroundColor Yellow
} elseif ($DryRun -and -not (Test-Path $OutputDir)) {
    Write-Host "[DRY RUN] Would create directory: $OutputDir" -ForegroundColor Cyan
}

# Function to sanitize folder names (same as image download script)
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

# Function to sanitize content for markdown
function Get-SafeMarkdownContent {
    param([string]$Content)
    
    if (-not $Content) {
        return ""
    }
    
    # Remove HTML tags and decode HTML entities
    $SafeContent = $Content -replace '<[^>]*>', ''
    $SafeContent = $SafeContent -replace '&amp;', '&'
    $SafeContent = $SafeContent -replace '&lt;', '<'
    $SafeContent = $SafeContent -replace '&gt;', '>'
    $SafeContent = $SafeContent -replace '&quot;', '"'
    $SafeContent = $SafeContent -replace '&#39;', "'"
    $SafeContent = $SafeContent -replace '&nbsp;', ' '
    
    # Clean up whitespace
    $SafeContent = $SafeContent -replace '\s+', ' '
    $SafeContent = $SafeContent.Trim()
    
    return $SafeContent
}

# Function to generate gallery items from image data
function Get-GalleryItems {
    param(
        [string]$ImageUrls,
        [string]$ImageFilenames,
        [string]$FolderName,
        [string]$Title
    )
    
    $galleryItems = @()
    
    if (-not $ImageUrls) {
        return $galleryItems
    }
    
    $UrlList = $ImageUrls -split '\|'
    
    # Handle filenames - ensure proper array behavior (same logic as download script)
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
        
        # Determine filename (same logic as download script)
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
        
        # Create gallery item
        $imagePath = "/images/news/$FolderName/$Filename"
        $altText = "$Title - Image $($i + 1)"
        
        $galleryItems += "  - src: `"$imagePath`"`n    alt: `"$altText`""
    }
    
    return $galleryItems
}

# Function to generate markdown content
function New-MarkdownFile {
    param(
        [string]$Title,
        [string]$Content,
        [string]$Excerpt,
        [string]$Date,
        [array]$GalleryItems,
        [string]$OutputPath
    )
    
    # Create description from excerpt or content
    $Description = if ($Excerpt) { 
        Get-SafeMarkdownContent $Excerpt 
    } elseif ($Content) { 
        $truncated = Get-SafeMarkdownContent $Content
        if ($truncated.Length -gt 150) {
            $truncated.Substring(0, 150) + "..."
        } else {
            $truncated
        }
    } else { 
        "Nieuws artikel van Jan Jansen Bouwkundig Adviseurs" 
    }
    
    # Build markdown content
    $markdown = @"
---
title: "$Title"
description: "$Description"
date: "$Date"
gallery:
$($GalleryItems -join "`n")
---

$(Get-SafeMarkdownContent $Content)
"@

    if ($DryRun) {
        Write-DryRunLog "CREATE MARKDOWN" $OutputPath
        Write-Host "Content preview:" -ForegroundColor Gray
        Write-Host ($markdown.Split("`n") | Select-Object -First 10 | Out-String) -ForegroundColor DarkGray
        Write-Host "..." -ForegroundColor DarkGray
    } else {
        try {
            $markdown | Out-File -FilePath $OutputPath -Encoding UTF8
            Write-Host "  ✓ Created: $OutputPath" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Failed to create: $OutputPath - $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    }
    
    return $true
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

$TotalProcessed = 0
$SuccessfulCreated = 0
$SkippedEntries = 0

# Process each row
foreach ($Row in $CsvData) {
    $Title = $Row.Title
    $Date = $Row.Date
    $Content = $Row.Content
    $Excerpt = $Row.Excerpt
    $ImageUrls = $Row."Image URL"
    $ImageFilenames = $Row."Image Filename"
    
    $TotalProcessed++
    
    # Skip if no title or date
    if (-not $Title -or -not $Date) {
        $SkippedEntries++
        if ($DryRun) {
            Write-Host "Skipping entry $TotalProcessed - Missing: Title='$Title', Date='$Date'" -ForegroundColor Yellow
        } else {
            Write-Host "Skipping entry $TotalProcessed - Missing required data (Title/Date)" -ForegroundColor Yellow
        }
        continue
    }
    
    # Skip if no images (required by schema)
    if (-not $ImageUrls) {
        $SkippedEntries++
        if ($DryRun) {
            Write-Host "Skipping entry $TotalProcessed - No images: '$Title'" -ForegroundColor Yellow
        } else {
            Write-Host "Skipping entry $TotalProcessed - No images (required by schema)" -ForegroundColor Yellow
        }
        continue
    }
    
    Write-Host "`nProcessing: $Title" -ForegroundColor Yellow
    
    # Parse date and create folder name
    try {
        $DateObj = [DateTime]::Parse($Date)
        $DateString = $DateObj.ToString("yyyy-MM-dd")
        $IsoDate = $DateObj.ToString("yyyy-MM-dd")
    }
    catch {
        Write-Host "  ⚠ Invalid date format, using raw date: $Date" -ForegroundColor Yellow
        $DateString = $Date -replace '[<>:"/\\|?*]', '-'
        $IsoDate = $Date
    }
    
    # Create folder name: date + title (same logic as image download script)
    $SafeTitle = Get-SafeFolderName -Name $Title
    $FolderName = "$DateString-$SafeTitle"
    
    # Create markdown filename
    $MarkdownFilename = "$FolderName.md"
    $OutputPath = Join-Path $OutputDir $MarkdownFilename
    
    # Check if file already exists
    if (-not $DryRun -and (Test-Path $OutputPath)) {
        Write-Host "  ⏭ File already exists: $MarkdownFilename" -ForegroundColor Gray
        $SuccessfulCreated++
        continue
    }
    
    # Generate gallery items
    $GalleryItems = Get-GalleryItems -ImageUrls $ImageUrls -ImageFilenames $ImageFilenames -FolderName $FolderName -Title $Title
    
    if ($GalleryItems.Count -eq 0) {
        Write-Host "  ⚠ No valid images found for gallery" -ForegroundColor Yellow
        $SkippedEntries++
        continue
    }
    
    # Create markdown file
    if (New-MarkdownFile -Title $Title -Content $Content -Excerpt $Excerpt -Date $IsoDate -GalleryItems $GalleryItems -OutputPath $OutputPath) {
        $SuccessfulCreated++
    }
}

# Summary
Write-Host "`n" + "="*50 -ForegroundColor Green
if ($DryRun) {
    Write-Host "Dry Run Summary:" -ForegroundColor Green
    Write-Host "Total entries processed: $TotalProcessed" -ForegroundColor Cyan
    Write-Host "Markdown files that would be created: $SuccessfulCreated" -ForegroundColor Green
    Write-Host "Entries that would be skipped: $SkippedEntries" -ForegroundColor Yellow
} else {
    Write-Host "Generation Summary:" -ForegroundColor Green
    Write-Host "Total entries processed: $TotalProcessed" -ForegroundColor Cyan
    Write-Host "Markdown files successfully created: $SuccessfulCreated" -ForegroundColor Green
    Write-Host "Entries skipped (missing data/images): $SkippedEntries" -ForegroundColor Yellow
}
Write-Host "="*50 -ForegroundColor Green

if ($SuccessfulCreated -eq 0) {
    Write-Host "No markdown files created. Check the CSV file format and image data." -ForegroundColor Yellow
} else {
    Write-Host "Markdown generation completed! ✓" -ForegroundColor Green
    if (-not $DryRun) {
        Write-Host "Files created in: $OutputDir" -ForegroundColor Cyan
    }
}
