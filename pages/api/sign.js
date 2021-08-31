const cloudinary = require('cloudinary').v2;

export default async (req, res) => {
  // Get the timestamp in seconds
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Show the timestamp
  console.log('Timestamp: ', timestamp);

  // Get the signature
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
}
