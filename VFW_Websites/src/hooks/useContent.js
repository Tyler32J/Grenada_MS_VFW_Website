import { useEffect, useSyncExternalStore } from "react";
import { fetchAllContent } from "../services/api";
import { defaultContent } from "../data/defaultContent";

// All page content is loaded once, in a single request, and shared by every
// component. Saving from the Admin Dashboard updates it in place.
let store = { status: "idle", saved: {} };
const listeners = new Set();

function setStore(next) {
    store = next;
    listeners.forEach((listener) => listener());
}

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function loadContent() {
    if (store.status !== "idle") return;
    store = { ...store, status: "loading" };
    fetchAllContent()
        .then((saved) => setStore({ status: "ready", saved }))
        .catch((error) => {
            console.error("Couldn't load site content; showing defaults.", error);
            setStore({ ...store, status: "ready" });
        });
}

function useStore() {
    useEffect(loadContent, []);
    return useSyncExternalStore(subscribe, () => store);
}

// True once saved content has loaded (or failed and fallen back to defaults).
export function useContentReady() {
    return useStore().status === "ready";
}

// Content for one section ("home", "contact", ...): saved values over defaults.
export function useContent(key) {
    const { saved } = useStore();
    return { ...defaultContent[key], ...saved[key] };
}

export function setSavedContent(key, value) {
    setStore({ ...store, saved: { ...store.saved, [key]: value } });
}
