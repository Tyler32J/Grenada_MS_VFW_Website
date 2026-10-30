import { useEffect, useState } from "react";
import { Calendar, Clock, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteEvent, fetchAllEvents, saveEvent } from "../../services/api";
import { cardClass, inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./styles";

const emptyEvent = { title: "", event_date: "", event_time: "", description: "" };

function formatDate(dateString) {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function EventsTab() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(null);

    // Reloads the list after a change.
    async function loadEvents() {
        try {
            setEvents(await fetchAllEvents());
        } catch (loadError) {
            setError(`Couldn't load events: ${loadError.message}`);
        }
    }

    useEffect(() => {
        fetchAllEvents()
            .then(setEvents)
            .catch((loadError) => setError(`Couldn't load events: ${loadError.message}`))
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(event) {
        if (!window.confirm(`Delete "${event.title}"?`)) return;
        try {
            await deleteEvent(event.id);
            await loadEvents();
        } catch (deleteError) {
            setError(`Couldn't delete: ${deleteError.message}`);
        }
    }

    return (
        <div className="space-y-6">
            {editing ? (
                <EventForm
                    initialEvent={editing}
                    onCancel={() => setEditing(null)}
                    onSaved={async () => {
                        setEditing(null);
                        await loadEvents();
                    }}
                />
            ) : (
                <button onClick={() => setEditing(emptyEvent)} className={`${primaryButtonClass} inline-flex items-center gap-2`}>
                    <Plus size={18} /> Add event
                </button>
            )}

            {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}

            <div className={cardClass}>
                <h2
                    className="text-2xl font-bold text-[#0B1E4A] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Events
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                    Upcoming events show on the home page automatically. Past events are hidden from visitors.
                </p>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : events.length === 0 ? (
                    <p className="text-gray-500">No events yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {events.map((event) => (
                            <li key={event.id} className="py-4 flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-semibold text-[#0B1E4A]">{event.title}</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {formatDate(event.event_date)}
                                        </span>
                                        {event.event_time && (
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} /> {event.event_time}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => setEditing(event)}
                                        className="p-2 text-[#0B1E4A] hover:bg-[#F5F1E8] rounded"
                                        aria-label="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event)}
                                        className="p-2 text-[#9B1C2E] hover:bg-[#FFF0F3] rounded"
                                        aria-label="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function EventForm({ initialEvent, onCancel, onSaved }) {
    const [event, setEvent] = useState(initialEvent);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    function handleChange(changeEvent) {
        const { name, value } = changeEvent.target;
        setEvent({ ...event, [name]: value });
    }

    async function handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        setSaving(true);
        setError("");
        try {
            await saveEvent({ ...event, title: event.title.trim(), event_time: event.event_time.trim() });
            await onSaved();
        } catch (saveError) {
            setError(`Couldn't save: ${saveError.message}`);
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`${cardClass} space-y-4 border-t-4 border-[#D4871A]`}>
            <h2
                className="text-xl font-bold text-[#0B1E4A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                {event.id ? "Edit event" : "New event"}
            </h2>
            <div>
                <label className={labelClass}>Title *</label>
                <input name="title" required maxLength={200} value={event.title} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Date *</label>
                    <input type="date" name="event_date" required value={event.event_date} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Time</label>
                    <input
                        name="event_time"
                        maxLength={100}
                        value={event.event_time}
                        onChange={handleChange}
                        placeholder="e.g. 6:00 PM - 8:00 PM"
                        className={inputClass}
                    />
                </div>
            </div>
            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    name="description"
                    rows={4}
                    maxLength={2000}
                    value={event.description}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                />
            </div>
            {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}
            <div className="flex gap-3">
                <button type="submit" disabled={saving} className={primaryButtonClass}>
                    {saving ? "Saving..." : "Save event"}
                </button>
                <button type="button" onClick={onCancel} disabled={saving} className={secondaryButtonClass}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EventsTab;
