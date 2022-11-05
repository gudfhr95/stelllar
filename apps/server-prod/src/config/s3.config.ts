import AWS from 'aws-sdk';

export default new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${
      process.env.AWS_S3_ENDPOINT ??
      'agoora-dev.s3.ap-northeast-2.amazonaws.com'
  }`,
});
