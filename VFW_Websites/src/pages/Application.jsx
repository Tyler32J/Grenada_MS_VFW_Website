import { useState } from "react";
import { Shield, CheckCircle, ChevronDown } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { submitApplication } from "../services/api";
import { supabase } from "../services/supabase";

// Full names for the 50 US states. Mississippi is listed first
// since that's where this post is located.
const usStates = [
    "Mississippi",
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
];

const emptyFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Mississippi",
    zip: "",
    militaryRank: "",
    unit: "",
    // Hidden from people; spam bots tend to fill in every field.
    website: "",
};

const inputClass =
    "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4871A] focus:outline-none";

function Application() {
    const content = useContent("applications");
    const [formData, setFormData] = useState(emptyFormData);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formData.website) {
            // Bot submission: pretend it worked and save nothing.
            setSubmitted(true);
            return;
        }

        if (!supabase) {
            setError("Online applications aren't available yet. Please contact the post directly.");
            return;
        }

        setSubmitting(true);
        setError("");
        try {
            await submitApplication(formData);
            setSubmitted(true);
        } catch (submitError) {
            console.error(submitError);
            setError("Something went wrong sending your application. Please check your details and try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#F5F1E8] py-12 flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="bg-white rounded-xl shadow-lg p-12 border-t-4 border-[#D4871A]">
                        <div className="w-20 h-20 bg-[#FFF5E8] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#D4871A]">
                            <CheckCircle className="text-[#D4871A]" size={48} />
                        </div>
                        <h2
                            className="text-3xl font-bold text-[#0B1E4A] mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.successTitle}
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">{content.successText}</p>
                        <p className="text-gray-500">
                            We'll contact you at <strong>{formData.email}</strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F1E8] py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-[#0B1E4A] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#D4871A]">
                        <Shield className="text-white" size={32} />
                    </div>
                    <h1
                        className="text-4xl font-bold text-[#0B1E4A] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.title}
                    </h1>
                    <p className="text-xl text-gray-600">{content.subtitle}</p>
                </div>

                {content.requirements.length > 0 && (
                    <div className="bg-[#EEF4FF] border-l-4 border-[#0B1E4A] p-6 mb-8 rounded-r-lg">
                        <h3 className="font-semibold text-[#0B1E4A] mb-2">{content.requirementsTitle}</h3>
                        <ul className="text-[#162F5E] space-y-1 text-sm">
                            {content.requirements.map((requirement, index) => (
                                <li key={index}>• {requirement.text}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-md p-8 space-y-6 border-t-4 border-[#D4871A]"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                maxLength={100}
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                maxLength={100}
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                maxLength={254}
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                minLength={7}
                                maxLength={30}
                                autoComplete="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(662) 555-0123"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                            Street Address *
                        </label>
                        <input
                            type="text"
                            name="address"
                            required
                            maxLength={200}
                            autoComplete="street-address"
                            value={formData.address}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                required
                                maxLength={100}
                                autoComplete="address-level2"
                                value={formData.city}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                State *
                            </label>
                            <div className="relative">
                                <select
                                    name="state"
                                    required
                                    value={formData.state}
                                    onChange={handleChange}
                                    className={`${inputClass} appearance-none bg-white`}
                                >
                                    {usStates.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Zip Code *
                            </label>
                            <input
                                type="text"
                                name="zip"
                                required
                                inputMode="numeric"
                                pattern="[0-9]{5}(-[0-9]{4})?"
                                title="5-digit zip code"
                                autoComplete="postal-code"
                                value={formData.zip}
                                onChange={handleChange}
                                placeholder="38901"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Honeypot: hidden from people, left blank by real applicants. */}
                    <div className="hidden" aria-hidden="true">
                        <label>
                            Website
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <hr className="border-gray-200" />

                    <h3
                        className="text-lg font-bold text-[#0B1E4A]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Military Service Information (Optional)
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Military Rank
                            </label>
                            <input
                                type="text"
                                name="militaryRank"
                                maxLength={100}
                                value={formData.militaryRank}
                                onChange={handleChange}
                                placeholder="e.g., SGT, CPL, PFC"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                                Unit/Division
                            </label>
                            <input
                                type="text"
                                name="unit"
                                maxLength={200}
                                value={formData.unit}
                                onChange={handleChange}
                                placeholder="e.g., 101st Airborne Division"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
                        {content.certification}
                    </div>

                    {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#D4871A] text-white py-4 rounded-lg font-semibold hover:bg-[#B8700F] transition-colors shadow-lg disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Application;
