/**
 * Storage Service Utility
 * Supports Local Disk Storage, AWS S3, Neon Object Storage, MinIO, and Cloudflare R2
 */

const fs = require("fs");
const path = require("path");

class StorageService {
  constructor() {
    this.driver = process.env.STORAGE_DRIVER || (process.env.NEON_OBJECT_STORAGE_ENDPOINT ? "neon" : "local");
    const s3Endpoint = process.env.NEON_OBJECT_STORAGE_ENDPOINT || process.env.S3_ENDPOINT || null;
    this.s3Config = {
      bucket: process.env.S3_BUCKET || "zyno-construction-production",
      region: process.env.AWS_REGION || "ap-southeast-1",
      endpoint: s3Endpoint,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    };
  }

  /**
   * Upload file to configured storage driver
   * @param {Object} file - Express Multer file object
   * @param {string} folder - Destination subfolder (e.g. 'drawings', 'snags')
   * @returns {Promise<{ url: string, key: string, driver: string }>}
   */
  async uploadFile(file, folder = "general") {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;

    if (this.driver === "s3" || this.driver === "neon" || this.driver === "minio" || this.driver === "r2") {
      try {
        const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
        const clientParams = {
          region: this.s3Config.region,
          credentials: {
            accessKeyId: this.s3Config.accessKeyId,
            secretAccessKey: this.s3Config.secretAccessKey,
          },
        };

        if (this.s3Config.endpoint) {
          clientParams.endpoint = this.s3Config.endpoint;
        }

        const s3Client = new S3Client(clientParams);
        const s3Key = `${folder}/${fileName}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: this.s3Config.bucket,
            Key: s3Key,
            Body: file.buffer || fs.readFileSync(file.path),
            ContentType: file.mimetype,
          })
        );

        const publicUrl = this.s3Config.endpoint
          ? `${this.s3Config.endpoint}/${this.s3Config.bucket}/${s3Key}`
          : `https://${this.s3Config.bucket}.s3.${this.s3Config.region}.amazonaws.com/${s3Key}`;

        return {
          url: publicUrl,
          key: s3Key,
          driver: this.driver,
        };
      } catch (s3Err) {
        console.warn("⚠️ S3/Neon Storage upload fallback to local disk storage:", s3Err.message);
      }
    }

    // Default Local Disk Driver
    const uploadDir = path.join(__dirname, "../..", "uploads", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilePath = path.join(uploadDir, fileName);
    if (file.buffer) {
      fs.writeFileSync(localFilePath, file.buffer);
    } else if (file.path) {
      fs.copyFileSync(file.path, localFilePath);
    }

    const localUrl = `/uploads/${folder}/${fileName}`;
    return {
      url: localUrl,
      key: localFilePath,
      driver: "local",
    };
  }
}

module.exports = new StorageService();
