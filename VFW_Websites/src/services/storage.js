import { supabase } from "./supabase";

const BUCKET = "site-images";
const ALLOWED_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
};
const MAX_SIZE_MB = 10;

// Uploads an image and returns its public URL and storage path.
// The bucket enforces the same type and size limits on the server.
export async function uploadImage(file, folder) {
    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
        throw new Error("Please choose a JPG, PNG, WebP, or GIF image.");
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error(`Images must be ${MAX_SIZE_MB} MB or smaller.`);
    }

    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
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
