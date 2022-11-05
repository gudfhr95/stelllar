export default () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
      console.error(
          'DATABASE_URL environment variable missing. Shutting down.');
      process.exit();
    }
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error(
        'ACCESS_TOKEN_SECRET environment variable missing. Shutting down.',
    );
    process.exit();
  }

  if (!(process.env.AWS_S3_ACCESS_KEY_ID &&
      process.env.AWS_S3_SECRET_ACCESS_KEY)) {
    console.warn(
        `
    Image uploading disabled. To enable, set the following environment variables: 
    AWS_S3_ACCESS_KEY_ID=<AWS access key ID>
    AWS_S3_SECRET_ACCESS_KEY=<AWS secret access key>
    `,
    );
  }
}
