import { useEffect, useState } from "react";
import { Shield, FileText, Calendar, Image as ImageIcon, Users, LogOut, KeyRound } from "lucide-react";
import { supabase } from "../services/supabase";
import { checkIsAdmin } from "../services/api";
import PagesTab from "../components/admin/PagesTab";
import EventsTab from "../components/admin/EventsTab";
import PhotosTab from "../components/admin/PhotosTab";
import FormsTab from "../components/admin/FormsTab";

// Sign-in is handled by Supabase Auth: passwords are checked and stored (hashed)
// on Supabase's servers, never in this code. Being signed in is not enough to
// change anything: the database only accepts changes from accounts listed in
// the admins table (see supabase/schema.sql).

const MIN_PASSWORD_LENGTH = 12;

const tabs = [
    { key: "pages", label: "Pages", Icon: FileText, Component: PagesTab },
    { key: "events", label: "Events", Icon: Calendar, Component: EventsTab },
    { key: "photos", label: "Photos", Icon: ImageIcon, Component: PhotosTab },
    { key: "applications", label: "Applications", Icon: Users, Component: FormsTab },
];

const inputClass =
    "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4871A] focus:outline-none";

function AdminDashboard() {
    // undefined = still checking for an existing session, null = signed out.
    const [session, setSession] = useState(undefined);
    const [adminCheck, setAdminCheck] = useState({ userId: null, isAdmin: false });
    const [settingPassword, setSettingPassword] = useState(false);

    useEffect(() => {
        if (!supabase) return;
        const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
            // Fired when someone arrives from a "reset password" email link.
            if (event === "PASSWORD_RECOVERY") setSettingPassword(true);
            setSession(newSession);
        });
        return () => data.subscription.unsubscribe();
    }, []);

    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;
        let cancelled = false;
        checkIsAdmin()
            .catch(() => false)
            .then((isAdmin) => {
                if (!cancelled) setAdminCheck({ userId, isAdmin });
            });
        return () => {
            cancelled = true;
        };
    }, [userId]);

    if (!supabase) {
        return (
            <AuthCard title="Admin Unavailable">
                <p className="text-gray-600 text-center">
                    The site isn't connected to its database yet. See the setup steps in the README.
                </p>
            </AuthCard>
        );
    }

    if (session === undefined || (session && adminCheck.userId !== userId)) {
        return <AuthCard title="Admin Login"><p className="text-gray-500 text-center">Loading...</p></AuthCard>;
    }

    if (session && settingPassword) {
        return <SetPasswordForm onDone={() => setSettingPassword(false)} />;
    }

    if (!session) {
        return <LoginForm />;
    }

    if (!adminCheck.isAdmin) {
        return (
            <AuthCard title="No Admin Access">
                <p className="text-gray-600 text-center mb-6">
                    You're signed in as <strong>{session.user.email}</strong>, but this account isn't an admin.
                </p>
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full bg-[#D4871A] text-white py-3 rounded-lg font-semibold hover:bg-[#B8700F] transition-colors"
                >
                    Sign Out
                </button>
            </AuthCard>
        );
    }

    return <Dashboard email={session.user.email} onChangePassword={() => setSettingPassword(true)} />;
}

function Dashboard({ email, onChangePassword }) {
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const { Component } = tabs.find((tab) => tab.key === activeTab);

    return (
        <div className="min-h-screen bg-[#F5F1E8] py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                        <h1
                            className="text-3xl font-bold text-[#0B1E4A]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            VFW Grenada Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm">Signed in as {email}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onChangePassword}
                            className="inline-flex items-center gap-2 text-sm text-[#0B1E4A] px-3 py-2 rounded-md hover:bg-white transition-colors"
                        >
                            <KeyRound size={16} /> Change password
                        </button>
                        <button
                            onClick={() => supabase.auth.signOut()}
                            className="inline-flex items-center gap-2 border-2 border-[#0B1E4A] text-[#0B1E4A] px-4 py-2 rounded-md font-semibold hover:bg-[#0B1E4A] hover:text-white transition-colors"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto border-b-2 border-gray-200">
                    {tabs.map(({ key, label, Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`inline-flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap border-b-4 -mb-[2px] transition-colors ${
                                key === activeTab
                                    ? "border-[#D4871A] text-[#0B1E4A]"
                                    : "border-transparent text-gray-500 hover:text-[#0B1E4A]"
                            }`}
                        >
                            <Icon size={18} /> {label}
                        </button>
                    ))}
                </div>

                <Component />
            </div>
        </div>
    );
}

function AuthCard({ title, children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1E4A] to-[#1B3A75] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border-t-4 border-[#D4871A] p-10">
                <div className="w-16 h-16 bg-[#0B1E4A] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#D4871A]">
                    <Shield className="text-white" size={28} />
                </div>
                <h1
                    className="text-3xl font-bold text-[#0B1E4A] text-center mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {title}
                </h1>
                <p className="text-gray-500 text-center mb-8">VFW Grenada Dashboard</p>
                {children}
            </div>
        </div>
    );
}

function LoginForm() {
    const [mode, setMode] = useState("signIn"); // signIn | forgot
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSignIn(event) {
        event.preventDefault();
        setSubmitting(true);
        setError("");
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        setSubmitting(false);
        if (signInError) {
            setPassword("");
            // Same message whether the email or the password was wrong, so the
            // form doesn't reveal which emails have accounts.
            setError(
                signInError.status === 429
                    ? "Too many attempts. Please wait a few minutes and try again."
                    : "Incorrect email or password."
            );
        }
    }

    async function handleForgot(event) {
        event.preventDefault();
        setSubmitting(true);
        setError("");
        await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${window.location.origin}/admin`,
        });
        setSubmitting(false);
        setNotice("If that email belongs to an admin account, a password reset link is on its way.");
    }

    if (mode === "forgot") {
        return (
            <AuthCard title="Reset Password">
                {notice ? (
                    <p className="text-green-700 text-center mb-6">{notice}</p>
                ) : (
                    <form onSubmit={handleForgot} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">Email</label>
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#D4871A] text-white py-3 rounded-lg font-semibold hover:bg-[#B8700F] transition-colors disabled:opacity-60"
                        >
                            {submitting ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}
                <button
                    onClick={() => {
                        setMode("signIn");
                        setNotice("");
                    }}
                    className="w-full text-sm text-gray-500 hover:underline mt-4"
                >
                    Back to sign in
                </button>
            </AuthCard>
        );
    }

    return (
        <AuthCard title="Admin Login">
            <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">Email</label>
                    <input
                        type="email"
                        required
                        autoComplete="username"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">Password</label>
                    <input
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        className={inputClass}
                    />
                </div>

                {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#D4871A] text-white py-3 rounded-lg font-semibold hover:bg-[#B8700F] transition-colors disabled:opacity-60"
                >
                    {submitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
            <button
                onClick={() => {
                    setMode("forgot");
                    setError("");
                }}
                className="w-full text-sm text-gray-500 hover:underline mt-4"
            >
                Forgot password?
            </button>
        </AuthCard>
    );
}

function SetPasswordForm({ onDone }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
            return;
        }
        if (password !== confirm) {
            setError("The passwords don't match.");
            return;
        }

        setSubmitting(true);
        setError("");
        const { error: updateError } = await supabase.auth.updateUser({ password });
        setSubmitting(false);
        if (updateError) {
            setError(updateError.message);
        } else {
            onDone();
        }
    }

    return (
        <AuthCard title="Set New Password">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">
                        New password (at least {MIN_PASSWORD_LENGTH} characters)
                    </label>
                    <input
                        type="password"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#0B1E4A] mb-2">Confirm new password</label>
                    <input
                        type="password"
                        required
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}
                        className={inputClass}
                    />
                </div>

                {error && <p className="text-sm text-[#9B1C2E]">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#D4871A] text-white py-3 rounded-lg font-semibold hover:bg-[#B8700F] transition-colors disabled:opacity-60"
                >
                    {submitting ? "Saving..." : "Save Password"}
                </button>
            </form>
            <button onClick={onDone} className="w-full text-sm text-gray-500 hover:underline mt-4">
                Cancel
            </button>
        </AuthCard>
    );
}

export default AdminDashboard;
