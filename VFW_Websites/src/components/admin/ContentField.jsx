import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react";
import { uploadImage } from "../../services/storage";
import { safeUrl } from "../../utils/text";
import { inputClass, labelClass, dangerButtonClass, secondaryButtonClass } from "./styles";

// One editable field in the Pages tab. See data/contentSchema.js for the field types.
function ContentField({ field, value, onChange }) {
    return (
        <div>
            <label className={labelClass}>{field.label}</label>
            {field.help && <p className="text-xs text-gray-500 mb-2">{field.help}</p>}
            <FieldInput field={field} value={value} onChange={onChange} />
        </div>
    );
}

function FieldInput({ field, value, onChange }) {
    switch (field.type) {
        case "textarea":
            return (
                <textarea
                    rows={4}
                    value={value ?? ""}
                    onChange={(event) => onChange(event.target.value)}
                    className={`${inputClass} resize-y`}
                />
            );
        case "url":
            return <UrlInput field={field} value={value ?? ""} onChange={onChange} />;
        case "image":
            return <ImageInput value={value ?? ""} onChange={onChange} />;
        case "list":
            return <ListInput field={field} items={value ?? []} onChange={onChange} />;
        default:
            return (
                <input
                    type="text"
                    value={value ?? ""}
                    onChange={(event) => onChange(event.target.value)}
                    className={inputClass}
                />
            );
    }
}

function UrlInput({ field, value, onChange }) {
    let problem = null;
    if (value.trim()) {
        problem = field.validate
            ? field.validate(value)
            : safeUrl(value)
              ? null
              : "Links must start with https://";
    }

    return (
        <>
            <input
                type="url"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="https://"
                className={inputClass}
            />
            {problem && <p className="text-xs text-[#9B1C2E] mt-1">{problem}</p>}
        </>
    );
}

function ImageInput({ value, onChange }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleFile(event) {
        const file = event.target.files[0];
        event.target.value = "";
        if (!file) return;

        setUploading(true);
        setError("");
        try {
            const { url } = await uploadImage(file, "pages");
            onChange(url);
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="flex items-center gap-4 flex-wrap">
            <div className="w-40 h-24 rounded-lg bg-[#F5F1E8] overflow-hidden flex items-center justify-center text-xs text-gray-500 text-center">
                {value ? (
                    <img src={value} alt="" className="w-full h-full object-cover" />
                ) : (
                    "Using the built-in photo"
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className={`${secondaryButtonClass} inline-flex items-center gap-2 cursor-pointer text-sm`}>
                    <Upload size={16} />
                    {uploading ? "Uploading..." : "Upload new image"}
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFile}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
                {value && (
                    <button type="button" onClick={() => onChange("")} className={`${dangerButtonClass} text-sm`}>
                        Use built-in photo instead
                    </button>
                )}
                {error && <p className="text-xs text-[#9B1C2E]">{error}</p>}
            </div>
        </div>
    );
}

function ListInput({ field, items, onChange }) {
    function updateItem(index, name, newValue) {
        onChange(items.map((item, i) => (i === index ? { ...item, [name]: newValue } : item)));
    }

    function moveItem(index, direction) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
    }

    function removeItem(index) {
        onChange(items.filter((_, i) => i !== index));
    }

    function addItem() {
        const emptyItem = Object.fromEntries(field.itemFields.map((itemField) => [itemField.name, ""]));
        onChange([...items, emptyItem]);
    }

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-[#FAFAF7]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-500">
                            {field.itemLabel} {index + 1}
                        </span>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => moveItem(index, -1)}
                                disabled={index === 0}
                                className="p-1 text-gray-500 hover:text-[#0B1E4A] disabled:opacity-30"
                                aria-label="Move up"
                            >
                                <ArrowUp size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveItem(index, 1)}
                                disabled={index === items.length - 1}
                                className="p-1 text-gray-500 hover:text-[#0B1E4A] disabled:opacity-30"
                                aria-label="Move down"
                            >
                                <ArrowDown size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-1 text-[#9B1C2E] hover:bg-[#FFF0F3] rounded"
                                aria-label="Remove"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {field.itemFields.map((itemField) => (
                            <div key={itemField.name} className={itemField.type === "textarea" ? "sm:col-span-2" : ""}>
                                <ContentField
                                    field={itemField}
                                    value={item[itemField.name]}
                                    onChange={(newValue) => updateItem(index, itemField.name, newValue)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-2 text-sm text-[#D4871A] font-semibold hover:underline"
            >
                <Plus size={16} /> Add {field.itemLabel.toLowerCase()}
            </button>
        </div>
    );
}

export default ContentField;
