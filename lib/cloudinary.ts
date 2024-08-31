import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function destroyFromCloudinary(public_id: string) {
  try {
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    console.log(error);
  }
}
