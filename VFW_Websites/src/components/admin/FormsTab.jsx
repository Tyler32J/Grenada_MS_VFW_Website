import { useEffect, useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import { deleteApplication, fetchApplications, updateApplicationStatus } from "../../services/api";
import { mailtoHref, telHref } from "../../utils/text";
import { cardClass, inputClass } from "./styles";

const statuses = [
    { value: "new", label: "New", color: "bg-[#FFF5E8] text-[#A86010]" },
    { value: "contacted", label: "Contacted", color: "bg-[#EEF4FF] text-[#0B1E4A]" },
    { value: "approved", label: "Approved", color: "bg-green-50 text-green-700" },
    { value: "declined", label: "Declined", color: "bg-gray-100 text-gray-600" },
];

// Membership applications submitted from the Join Us page.
function FormsTab() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    // Reloads the list after a change.
    async function loadApplications() {
        try {
            setApplications(await fetchApplications());
        } catch (loadError) {
            setError(`Couldn't load applications: ${loadError.message}`);
        }
    }

    useEffect(() => {
        fetchApplications()
            .then(setApplications)
            .catch((loadError) => setError(`Couldn't load applications: ${loadError.message}`))
            .finally(() => setLoading(false));
    }, []);

    async function handleStatusChange(application, status) {
        try {
            await updateApplicationStatus(application.id, status);
            await loadApplications();
        } catch (updateError) {
            setError(`Couldn't update: ${updateError.message}`);
        }
    }

    async function handleDelete(application) {
        const name = `${application.first_name} ${application.last_name}`;
        if (!window.confirm(`Permanently delete the application from ${name}?`)) return;
        try {
            await deleteApplication(application.id);
            await loadApplications();
        } catch (deleteError) {
            setError(`Couldn't delete: ${deleteError.message}`);
        }
    }

    const visible = filter === "all" ? applications : applications.filter((a) => a.status === filter);

    return (
        <div className={cardClass}>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                <div>
                    <h2
                        className="text-2xl font-bold text-[#0B1E4A]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Membership Applications
                    </h2>
                    <p className="text-gray-500 text-sm">
                        These contain applicants' personal information. Only admins can see them.
                    </p>
                </div>
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className={`${inputClass} w-auto`}>
                    <option value="all">All ({applications.length})</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label} ({applications.filter((a) => a.status === status.value).length})
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-sm text-[#9B1C2E] mb-4">{error}</p>}

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : visible.length === 0 ? (
                <p className="text-gray-500">No applications here.</p>
            ) : (
                <ul className="space-y-4">
                    {visible.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                            onStatusChange={(status) => handleStatusChange(application, status)}
                            onDelete={() => handleDelete(application)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

function ApplicationCard({ application, onStatusChange, onDelete }) {
    const status = statuses.find((s) => s.value === application.status) ?? statuses[0];
    const emailLink = mailtoHref(application.email);
    const phoneLink = telHref(application.phone);

    return (
        <li className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                    <p className="font-semibold text-lg text-[#0B1E4A]">
                        {application.first_name} {application.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                        Submitted {new Date(application.created_at).toLocaleString("en-US")}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.color}`}>{status.label}</span>
                    <select
                        value={application.status}
                        onChange={(event) => onStatusChange(event.target.value)}
                        className={`${inputClass} w-auto text-sm py-1`}
                        aria-label="Change status"
                    >
                        {statuses.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                    <button onClick={onDelete} className="p-2 text-[#9B1C2E] hover:bg-[#FFF0F3] rounded" aria-label="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    {emailLink ? (
                        <a href={emailLink} className="hover:text-[#D4871A]">{application.email}</a>
                    ) : (
                        application.email
                    )}
                </p>
                <p className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {phoneLink ? (
                        <a href={phoneLink} className="hover:text-[#D4871A]">{application.phone}</a>
                    ) : (
                        application.phone
                    )}
                </p>
                <p className="sm:col-span-2">
                    {application.address}, {application.city}, {application.state} {application.zip}
                </p>
                {(application.military_rank || application.unit) && (
                    <p className="sm:col-span-2 text-gray-500">
                        Service: {[application.military_rank, application.unit].filter(Boolean).join(" — ")}
                    </p>
                )}
            </div>
        </li>
    );
}

export default FormsTab;
