export const uploadToCloudinary = async (images: File[]) => {
  let imgArr = [];

  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);

    formData.append("upload_preset", "wzzcd2we");
    formData.append("cloud_name", "dis16svjq");
    formData.append("folder", "posts");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dis16svjq/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ publicId: data.public_id, imageUrl: data.secure_url });
  }

  return imgArr;
};
