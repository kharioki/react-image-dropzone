const cloudinary = require('cloudinary').v2;

export default async (req, res) => {
  //TODO: Check if the user is authenticated

  // Get the timestamp in seconds
  const timestamp = Math.round(new Date().getTime() / 1000);

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
