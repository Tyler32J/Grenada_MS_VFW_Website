import { supabase } from "./supabase";

const BUCKET = "site-images";
const ALLOWED_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
};
const MAX_SIZE_MB = 10;

// Returns a message explaining why a file can't be uploaded, or null if it's fine.
export function checkImageFile(file) {
    if (!ALLOWED_TYPES[file.type]) {
        const isIphonePhoto = /\.(heic|heif)$/i.test(file.name);
        return isIphonePhoto
            ? "iPhone photos (HEIC) aren't supported. Please save or send the photo as a JPG first."
            : "Please choose a JPG, PNG, WebP, or GIF image.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        return `This image is ${(file.size / 1024 / 1024).toFixed(1)} MB. Images must be ${MAX_SIZE_MB} MB or smaller.`;
    }
    return null;
}

// Uploads an image and returns its public URL and storage path.
// The bucket enforces the same type and size limits on the server.
export async function uploadImage(file, folder) {
    const problem = checkImageFile(file);
    if (problem) throw new Error(problem);

    const path = `${folder}/${crypto.randomUUID()}.${ALLOWED_TYPES[file.type]}`;
    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { url: data.publicUrl, path };
}

export async function deleteImage(path) {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw error;
}
