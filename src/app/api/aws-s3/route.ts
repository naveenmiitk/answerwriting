import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  //   const { session } = await getUserAuth();
  //   if (!session) return new Response("Error", { status: 400 });
  const body = await request.json();
  // console.log('body: ', body);

  const client = new S3Client({
    region: process.env.S3_REGION as string,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_KEY as string,
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: body.filename,
    Body: body.file,
    ContentType: body.fileType,
  });
  // console.log(command);
  //   const url = await getSignedUrl(client, command, { expiresIn: 60 });
  // const response = await client.send(command);

  //   console.log(response);
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
