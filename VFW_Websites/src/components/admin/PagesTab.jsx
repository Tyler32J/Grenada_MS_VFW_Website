import { useEffect, useState } from "react";
import { contentSections } from "../../data/contentSchema";
import { defaultContent } from "../../data/defaultContent";
import { useContent, setSavedContent } from "../../hooks/useContent";
import { saveContent } from "../../services/api";
import ContentField from "./ContentField";
import { cardClass, primaryButtonClass, secondaryButtonClass } from "./styles";

function PagesTab() {
    const [sectionKey, setSectionKey] = useState(contentSections[0].key);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const section = contentSections.find((s) => s.key === sectionKey);

    function selectSection(key) {
        if (key === sectionKey) return;
        if (hasUnsavedChanges && !window.confirm("You have unsaved changes. Leave without saving?")) return;
        setHasUnsavedChanges(false);
        setSectionKey(key);
    }

    return (
        <div className="grid lg:grid-cols-4 gap-6 items-start">
            <nav className={`${cardClass} p-3 flex lg:flex-col gap-1 overflow-x-auto`}>
                {contentSections.map((s) => (
                    <button
                        key={s.key}
                        onClick={() => selectSection(s.key)}
                        className={`text-left px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                            s.key === sectionKey
                                ? "bg-[#0B1E4A] text-white"
                                : "text-[#0B1E4A] hover:bg-[#F5F1E8]"
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
            </nav>

            <div className="lg:col-span-3">
                {/* key resets the editor when switching sections */}
                <SectionEditor key={section.key} section={section} onDirtyChange={setHasUnsavedChanges} />
            </div>
        </div>
    );
}

function SectionEditor({ section, onDirtyChange }) {
    const saved = useContent(section.key);
    const [draft, setDraft] = useState(saved);
    const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(saved));
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const isDirty = JSON.stringify(draft) !== savedSnapshot;

    useEffect(() => {
        onDirtyChange(isDirty);
    }, [isDirty, onDirtyChange]);

    // Warn before closing the tab with unsaved changes.
    useEffect(() => {
        if (!isDirty) return;
        const warn = (event) => event.preventDefault();
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [isDirty]);

    function updateField(name, value) {
        setDraft({ ...draft, [name]: value });
        setMessage(null);
    }

    async function handleSave() {
        setSaving(true);
        setMessage(null);
        try {
            await saveContent(section.key, draft);
            setSavedContent(section.key, draft);
            setSavedSnapshot(JSON.stringify(draft));
            setMessage({ type: "success", text: "Saved! The live site is updated." });
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: `Couldn't save: ${error.message}` });
        } finally {
            setSaving(false);
        }
    }

    function handleRestoreDefaults() {
        if (!window.confirm(`Replace everything in "${section.label}" with the original text? You'll still need to click Save.`)) {
            return;
        }
        setDraft(defaultContent[section.key]);
        setMessage(null);
    }

    return (
        <div className={cardClass}>
            <div className="mb-6">
                <h2
                    className="text-2xl font-bold text-[#0B1E4A]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {section.label}
                </h2>
                {section.description && <p className="text-gray-500 text-sm mt-1">{section.description}</p>}
            </div>

            <div className="space-y-6">
                {section.fields.map((field) => (
                    <ContentField
                        key={field.name}
                        field={field}
                        value={draft[field.name]}
                        onChange={(value) => updateField(field.name, value)}
                    />
                ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-8 pt-4 pb-1 flex flex-wrap items-center gap-3">
                <button onClick={handleSave} disabled={saving || !isDirty} className={primaryButtonClass}>
                    {saving ? "Saving..." : "Save changes"}
                </button>
                <button
                    onClick={() => setDraft(JSON.parse(savedSnapshot))}
                    disabled={saving || !isDirty}
                    className={secondaryButtonClass}
                >
                    Undo changes
                </button>
                <button
                    onClick={handleRestoreDefaults}
                    disabled={saving}
                    className="text-sm text-gray-500 hover:underline ml-auto"
                >
                    Restore original text
                </button>
                {message && (
                    <p className={`w-full text-sm ${message.type === "error" ? "text-[#9B1C2E]" : "text-green-700"}`}>
                        {message.text}
                    </p>
                )}
                {!message && isDirty && <p className="w-full text-sm text-gray-500">You have unsaved changes.</p>}
            </div>
        </div>
    );
}

export default PagesTab;
