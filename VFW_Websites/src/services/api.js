import { supabase } from "./supabase";
import { uploadImage, deleteImage } from "./storage";

// Supabase returns { data, error } instead of throwing; this turns errors into exceptions.
function unwrap({ data, error }) {
    if (error) throw error;
    return data;
}

// Today's date as YYYY-MM-DD in the visitor's own time zone.
function todayString() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
}

// ---------- Page content ----------

// Returns everything saved from the Pages tab, keyed by section ("home", "contact", ...).
export async function fetchAllContent() {
    if (!supabase) return {};
    const rows = unwrap(await supabase.from("site_content").select("key, value"));
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export async function saveContent(key, value) {
    unwrap(
        await supabase
            .from("site_content")
            .upsert({ key, value, updated_at: new Date().toISOString() })
    );
}

// ---------- Events ----------

export async function fetchUpcomingEvents() {
    if (!supabase) return [];
    return unwrap(
        await supabase
            .from("events")
            .select("*")
            .gte("event_date", todayString())
            .order("event_date")
    );
}

export async function fetchAllEvents() {
    return unwrap(await supabase.from("events").select("*").order("event_date", { ascending: false }));
}

export async function saveEvent({ id, title, description, event_date, event_time }) {
    const fields = { title, description, event_date, event_time };
    if (id) {
        unwrap(await supabase.from("events").update(fields).eq("id", id));
    } else {
        unwrap(await supabase.from("events").insert(fields));
    }
}

export async function deleteEvent(id) {
    unwrap(await supabase.from("events").delete().eq("id", id));
}

// ---------- Photos ----------

export async function fetchPhotos() {
    if (!supabase) return [];
    return unwrap(await supabase.from("photos").select("*").order("created_at", { ascending: false }));
}

export async function addPhoto(file, caption, inSlideshow) {
    const { url, path } = await uploadImage(file, "gallery");
    try {
        unwrap(
            await supabase
                .from("photos")
                .insert({ url, storage_path: path, caption, in_slideshow: inSlideshow })
        );
    } catch (error) {
        await deleteImage(path).catch(() => {});
        throw error;
    }
}

export async function updatePhoto(id, fields) {
    unwrap(await supabase.from("photos").update(fields).eq("id", id));
}

export async function deletePhoto(photo) {
    unwrap(await supabase.from("photos").delete().eq("id", photo.id));
    await deleteImage(photo.storage_path);
}

// ---------- Membership applications ----------

export async function submitApplication(form) {
    // No .select() afterwards: visitors are allowed to insert but not to read applications.
    unwrap(
        await supabase.from("applications").insert({
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            state: form.state,
            zip: form.zip.trim(),
            military_rank: form.militaryRank.trim(),
            unit: form.unit.trim(),
        })
    );
}

export async function fetchApplications() {
    return unwrap(
        await supabase.from("applications").select("*").order("created_at", { ascending: false })
    );
}

export async function updateApplicationStatus(id, status) {
    unwrap(await supabase.from("applications").update({ status }).eq("id", id));
}

export async function deleteApplication(id) {
    unwrap(await supabase.from("applications").delete().eq("id", id));
}

// ---------- Admin sign-in ----------

export async function checkIsAdmin() {
    return unwrap(await supabase.rpc("is_admin")) === true;
}
