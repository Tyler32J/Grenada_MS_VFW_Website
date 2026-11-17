import { useEffect, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { addPhoto, deletePhoto, fetchPhotos, updatePhoto } from "../../services/api";
import { checkImageFile } from "../../services/storage";
import { cardClass, inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./styles";

function PhotosTab() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Reloads the list after a change.
    async function loadPhotos() {
        try {
            setPhotos(await fetchPhotos());
        } catch (loadError) {
            setError(`Couldn't load photos: ${loadError.message}`);
        }
    }

    useEffect(() => {
        fetchPhotos()
            .then(setPhotos)
            .catch((loadError) => setError(`Couldn't load photos: ${loadError.message}`))
            .finally(() => setLoading(false));
    }, []);

    async function handleToggleSlideshow(photo) {
        try {
            await updatePhoto(photo.id, { in_slideshow: !photo.in_slideshow });
            await loadPhotos();
        } catch (updateError) {
            setError(`Couldn't update: ${updateError.message}`);
        }
    }

    async function handleDelete(photo) {
        if (!window.confirm("Delete this photo? This can't be undone.")) return;
        try {
            await deletePhoto(photo);
            await loadPhotos();
        } catch (deleteError) {
            setError(`Couldn't delete: ${deleteError.message}`);
        }
    }

    return (
        <div className="space-y-6">
            <UploadForm onUploaded={loadPhotos} />

            {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}

            <div className={cardClass}>
                <h2
                    className="text-2xl font-bold text-[#0B1E4A] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Photos
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                    All photos appear in the Gallery. Check "Home slideshow" to also show a photo on the home
                    page (if none are checked, the built-in photos are shown).
                </p>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : photos.length === 0 ? (
                    <p className="text-gray-500">No photos yet.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {photos.map((photo) => (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onToggleSlideshow={() => handleToggleSlideshow(photo)}
                                onDelete={() => handleDelete(photo)}
                                onError={setError}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function UploadForm({ onUploaded }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [inSlideshow, setInSlideshow] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    function chooseFile(newFile) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(newFile);
        setPreviewUrl(newFile ? URL.createObjectURL(newFile) : "");
    }

    function handleFileChange(event) {
        const chosen = event.target.files[0];
        event.target.value = "";
        if (!chosen) return;

        const problem = checkImageFile(chosen);
        setError(problem ?? "");
        chooseFile(problem ? null : chosen);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!file) return;

        setUploading(true);
        setError("");
        try {
            await addPhoto(file, caption.trim(), inSlideshow);
            chooseFile(null);
            setCaption("");
            setInSlideshow(false);
            await onUploaded();
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`${cardClass} space-y-4 border-t-4 border-[#D4871A]`}>
            <h2
                className="text-xl font-bold text-[#0B1E4A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                Upload a photo
            </h2>
            <div>
                <p className={labelClass}>Step 1: Choose a photo (JPG, PNG, WebP, or GIF, up to 10 MB)</p>
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="w-40 h-28 rounded-lg bg-[#F5F1E8] border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center text-xs text-gray-500 text-center px-2">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Selected photo preview" className="w-full h-full object-cover" />
                        ) : (
                            "No photo chosen yet"
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className={`${secondaryButtonClass} inline-flex items-center gap-2 cursor-pointer`}>
                            <ImagePlus size={18} />
                            {file ? "Choose a different photo" : "Choose photo"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                        {file && <p className="text-xs text-gray-500 max-w-xs truncate">{file.name}</p>}
                    </div>
                </div>
            </div>
            <div>
                <label className={labelClass}>Caption</label>
                <input
                    value={caption}
                    maxLength={300}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="e.g. Veterans Day ceremony, 2026"
                    className={inputClass}
                />
            </div>
            <label className="flex items-center gap-2 text-sm text-[#0B1E4A]">
                <input type="checkbox" checked={inSlideshow} onChange={(event) => setInSlideshow(event.target.checked)} />
                Also show in the home page slideshow
            </label>
            {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}
            <div className="flex items-center gap-3 flex-wrap">
                <button type="submit" disabled={uploading || !file} className={`${primaryButtonClass} inline-flex items-center gap-2`}>
                    <Upload size={18} /> {uploading ? "Uploading..." : "Step 2: Upload"}
                </button>
                {!file && !uploading && <p className="text-sm text-gray-500">Choose a photo first.</p>}
            </div>
        </form>
    );
}

function PhotoCard({ photo, onToggleSlideshow, onDelete, onError }) {
    const [caption, setCaption] = useState(photo.caption);
    const [saving, setSaving] = useState(false);

    async function saveCaption() {
        if (caption.trim() === photo.caption) return;
        setSaving(true);
        try {
            await updatePhoto(photo.id, { caption: caption.trim() });
        } catch (saveError) {
            onError(`Couldn't save caption: ${saveError.message}`);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <img src={photo.url} alt={photo.caption} loading="lazy" className="w-full aspect-[4/3] object-cover" />
            <div className="p-3 space-y-2">
                <input
                    value={caption}
                    maxLength={300}
                    onChange={(event) => setCaption(event.target.value)}
                    onBlur={saveCaption}
                    placeholder="Add a caption"
                    className={`${inputClass} text-sm`}
                />
                {saving && <p className="text-xs text-gray-500">Saving...</p>}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#0B1E4A]">
                        <input type="checkbox" checked={photo.in_slideshow} onChange={onToggleSlideshow} />
                        Home slideshow
                    </label>
                    <button
                        onClick={onDelete}
                        className="p-2 text-[#9B1C2E] hover:bg-[#FFF0F3] rounded"
                        aria-label="Delete photo"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PhotosTab;
