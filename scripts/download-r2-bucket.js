#!/usr/bin/env node

/**
 * Download all objects from a Cloudflare R2 bucket
 */

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import https from "https";

// Load env vars
config();

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!BUCKET_NAME || !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || !ACCOUNT_ID) {
  console.error("❌ Missing required env vars.");
  console.error("Required: CLOUDFLARE_R2_BUCKET_NAME, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, CLOUDFLARE_ACCOUNT_ID");
  process.exit(1);
}

const OUTPUT_DIR = "./r2-download";

// HTTPS Agent for corporate proxies
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const r2 = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
  },
  forcePathStyle: true,
  requestHandler: { httpsAgent }
});

/**
 * Fetch full bucket listing (handles pagination)
 */
async function listAllObjects() {
  let continuationToken = undefined;
  let all = [];

  while (true) {
    const res = await r2.send(
      new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        ContinuationToken: continuationToken
      })
    );

    if (res.Contents) all.push(...res.Contents);

    if (!res.IsTruncated) break;
    continuationToken = res.NextContinuationToken;
  }

  return all;
}

/**
 * Ensure folder exists
 */
function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

/**
 * Main download function
 */
async function downloadBucket() {
  console.log("📥 Downloading Cloudflare R2 bucket:", BUCKET_NAME);
  console.log("⬇️  Output directory:", OUTPUT_DIR);

  ensureDir(OUTPUT_DIR);

  const objects = await listAllObjects();

  console.log(`📦 Found ${objects.length} objects`);

  for (const obj of objects) {
    const key = obj.Key;

    console.log("⬇️  Downloading:", key);

    const res = await r2.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
      })
    );

    const localPath = join(OUTPUT_DIR, key);
    ensureDir(dirname(localPath));

    const body = Buffer.from(await res.Body.transformToByteArray());
    writeFileSync(localPath, body);
  }

  console.log("\n🎉 Download completed!");
}

downloadBucket().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
