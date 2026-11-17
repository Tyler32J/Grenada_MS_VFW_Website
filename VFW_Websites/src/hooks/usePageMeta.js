import { useEffect } from "react";

const SITE_NAME = "VFW Post 4488 – Grenada, MS";

function setMeta(selector, attribute, value) {
    const element = document.head.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
}

// Sets the browser tab title, search result description, and canonical link
// for the current page. Search engines read these when they index each page.
export function usePageMeta({ title, description, path }) {
    useEffect(() => {
        document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Veterans of Foreign Wars`;
        if (description) setMeta('meta[name="description"]', "content", description);
        if (path) setMeta('link[rel="canonical"]', "href", `https://vfwgrenada.org${path}`);
    }, [title, description, path]);
}

// Asks search engines not to list a page (used for the admin login).
export function useNoIndex() {
    useEffect(() => {
        const tag = document.createElement("meta");
        tag.name = "robots";
        tag.content = "noindex, nofollow";
        document.head.appendChild(tag);
        return () => tag.remove();
    }, []);
}
