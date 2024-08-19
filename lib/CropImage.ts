export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Gagal mendapatkan konteks 2D");
  }

  // Setel dimensi canvas sesuai dengan dimensi area yang dipotong
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Gambarkan gambar yang dipotong ke dalam canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Konversi konten canvas ke blob
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  if (!blob) {
    throw new Error("Gagal mengonversi gambar ke blob");
  }

  // Buat objek File dari blob
  const file = new File([blob], "cropped-image.png", { type: "image/png" });

  return file;
}

