import { zeffyEmbedUrl } from "../utils/text";

// Describes the fields shown in the Admin Dashboard's Pages tab.
// Each section's `key` matches a key in defaultContent.js.
//
// Field types:
//   text     - one line
//   textarea - multiple lines (a blank line starts a new paragraph)
//   url      - a web link (must start with https://)
//   image    - an uploaded photo (leave empty to use the built-in photo)
//   list     - repeatable items, each made of `itemFields`
export const contentSections = [
    {
        key: "site",
        label: "Contact Info & Footer",
        description: "Shown in the footer on every page and on the Contact page.",
        fields: [
            { name: "phone", label: "Main phone number", type: "text" },
            { name: "email", label: "Main email address", type: "text" },
            { name: "locationLabel", label: "Location text", type: "text" },
            { name: "mapUrl", label: "Google Maps link", type: "url" },
            { name: "footerTagline", label: "Footer tagline", type: "textarea" },
        ],
    },
    {
        key: "home",
        label: "Home Page",
        fields: [
            { name: "heroTagline", label: "Banner tagline (small orange text)", type: "text" },
            { name: "heroTitle", label: "Banner headline", type: "textarea" },
            { name: "heroText", label: "Banner text", type: "textarea" },
            { name: "heroImage", label: "Banner image", type: "image" },
            {
                name: "stats",
                label: "Stats bar",
                type: "list",
                itemLabel: "Stat",
                itemFields: [
                    { name: "value", label: "Number", type: "text" },
                    { name: "label", label: "Label", type: "text" },
                ],
            },
            { name: "slideshowTitle", label: "Slideshow heading", type: "text" },
            { name: "eventsTitle", label: "Events heading", type: "text" },
            { name: "noEventsText", label: "Text when there are no upcoming events", type: "text" },
            { name: "aboutLabel", label: "About section label (small orange text)", type: "text" },
            { name: "aboutTitle", label: "About section heading", type: "text" },
            { name: "aboutText", label: "About section text", type: "textarea" },
            { name: "aboutImage", label: "About section image", type: "image" },
            { name: "ctaTitle", label: "Bottom banner heading", type: "text" },
            { name: "ctaText", label: "Bottom banner text", type: "textarea" },
        ],
    },
    {
        key: "gallery",
        label: "Gallery Page",
        description: "Photos themselves are managed in the Photos tab.",
        fields: [
            { name: "title", label: "Page title", type: "text" },
            { name: "subtitle", label: "Subtitle", type: "text" },
            { name: "emptyText", label: "Text when there are no photos", type: "text" },
        ],
    },
    {
        key: "contact",
        label: "Contact Page",
        description: "The main phone and email are edited under Contact Info & Footer.",
        fields: [
            { name: "bannerTitle", label: "Page title", type: "text" },
            { name: "bannerSubtitle", label: "Subtitle", type: "text" },
            { name: "address", label: "Address (one line per row)", type: "textarea" },
            { name: "leadershipTitle", label: "Leadership heading", type: "text" },
            {
                name: "leaders",
                label: "Leadership team",
                type: "list",
                itemLabel: "Officer",
                itemFields: [
                    { name: "name", label: "Name", type: "text" },
                    { name: "position", label: "Position", type: "text" },
                    { name: "rank", label: "Rank", type: "text" },
                    { name: "email", label: "Email (optional)", type: "text" },
                    { name: "phone", label: "Phone (optional)", type: "text" },
                ],
            },
            { name: "hoursTitle", label: "Hours heading", type: "text" },
            {
                name: "hours",
                label: "Regular hours",
                type: "list",
                itemLabel: "Row",
                itemFields: [
                    { name: "days", label: "Days", type: "text" },
                    { name: "time", label: "Hours", type: "text" },
                ],
            },
            { name: "meetingsTitle", label: "Meetings heading", type: "text" },
            { name: "meetingsText", label: "Meetings text", type: "textarea" },
        ],
    },
    {
        key: "donations",
        label: "Donations Page",
        fields: [
            { name: "bannerTitle", label: "Page title", type: "text" },
            { name: "bannerText", label: "Banner text", type: "textarea" },
            { name: "formTitle", label: "Donation box heading", type: "text" },
            {
                name: "zeffyUrl",
                label: "Zeffy donation form link",
                type: "url",
                help: "In Zeffy, open your donation form, click Share, and copy the link. It looks like https://www.zeffy.com/en-US/donation-form/...",
                validate: (value) =>
                    zeffyEmbedUrl(value) ? null : "This doesn't look like a Zeffy form link, so it won't be shown.",
            },
            { name: "helpTitle", label: "\"How your donation helps\" heading", type: "text" },
            {
                name: "helpItems",
                label: "How your donation helps",
                type: "list",
                itemLabel: "Item",
                itemFields: [
                    { name: "title", label: "Title", type: "text" },
                    { name: "text", label: "Description", type: "textarea" },
                ],
            },
            { name: "otherWaysTitle", label: "\"Other ways to give\" heading", type: "text" },
            {
                name: "otherWays",
                label: "Other ways to give",
                type: "list",
                itemLabel: "Item",
                itemFields: [{ name: "text", label: "Text", type: "text" }],
            },
            { name: "taxTitle", label: "Tax note heading", type: "text" },
            { name: "taxText", label: "Tax note text", type: "textarea" },
        ],
    },
    {
        key: "applications",
        label: "Join Us Page",
        description: "Submitted applications appear in the Applications tab.",
        fields: [
            { name: "title", label: "Page title", type: "text" },
            { name: "subtitle", label: "Subtitle", type: "text" },
            { name: "requirementsTitle", label: "Requirements heading", type: "text" },
            {
                name: "requirements",
                label: "Eligibility requirements",
                type: "list",
                itemLabel: "Requirement",
                itemFields: [{ name: "text", label: "Text", type: "text" }],
            },
            { name: "certification", label: "Text above the submit button", type: "textarea" },
            { name: "successTitle", label: "Heading after submitting", type: "text" },
            { name: "successText", label: "Message after submitting", type: "textarea" },
        ],
    },
];
