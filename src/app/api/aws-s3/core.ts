
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
export default async function handler(req: { query: { file: any; fileType: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { url: string; }): void; new(): any; }; }; }) {
  
    const client = new S3Client({
      region: process.env.S3_REGION as string,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
      },
    });

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.query.file,
    // fileType: "pdf",
  });
  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  res.status(200).json({
    url: url,
  });
}
