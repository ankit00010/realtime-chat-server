// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// let s3_client: S3Client;
// let aws_bucket_name: string;

// const initializeAws = async (): Promise<void> =>   {
//   const access_key_id = process.env.ACCESS_KEY_ID || "";
//   const secret_access_key = process.env.SECRET_ACCESS_KEY || "";
//   const aws_bucket_region = process.env.AWS_BUCKET_REGION || "";
//   aws_bucket_name = process.env.AWS_BUCKET_NAME || "";

//   s3_client = new S3Client({
//     credentials: {
//       accessKeyId: access_key_id,
//       secretAccessKey: secret_access_key,
//     },
//     region: aws_bucket_region,
//   });

//   console.log("Connected to AWS Storage");
// };

// export { s3_client, aws_bucket_name, initializeAws };
