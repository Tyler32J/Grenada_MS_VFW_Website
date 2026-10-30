// Splits multi-line text from the Admin Dashboard into paragraphs.
// A blank line starts a new paragraph.
export function toParagraphs(text = "") {
    return text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

// Only allows http(s) links, so an edited link can never run JavaScript
// (e.g. "javascript:..."). Returns null for anything else.
export function safeUrl(url = "") {
    try {
        const parsed = new URL(url.trim());
        return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
    } catch {
        return null;
    }
}

// Turns a Zeffy share link into the embeddable form URL.
// Returns null if the link isn't a Zeffy form.
export function zeffyEmbedUrl(url = "") {
    const href = safeUrl(url);
    if (!href) return null;

    const parsed = new URL(href);
    if (parsed.hostname !== "www.zeffy.com" && parsed.hostname !== "zeffy.com") return null;

    // e.g. /en-US/donation-form/abc  or  /embed/donation-form/abc
    const match = parsed.pathname.match(
        /^\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?(?:embed\/)?((?:donation-form|ticketing|peer-to-peer)\/[\w-]+)/
    );
    return match ? `https://www.zeffy.com/embed/${match[1]}` : null;
}

export function telHref(phone = "") {
    const digits = phone.replace(/\D/g, "");
    return digits ? `tel:${digits}` : null;
}

export function mailtoHref(email = "") {
    const trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? `mailto:${trimmed}` : null;
}
