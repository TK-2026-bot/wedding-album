// Client-side image compression before upload, to keep Storage usage down.
// Video re-encoding isn't done here — that needs a heavy decoder (e.g.
// ffmpeg.wasm) this no-build vanilla app doesn't bundle; videos upload as-is.
const SKIP_TYPES = new Set(["image/svg+xml", "image/gif"]);

export async function compressImage(file, { maxDimension = 2000, quality = 0.82 } = {}) {
  if (!file.type.startsWith("image/") || SKIP_TYPES.has(file.type)) {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function isVideo(file) {
  return file.type.startsWith("video/");
}
