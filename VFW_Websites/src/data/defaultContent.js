// Default text for every editable part of the site. Anything saved from the
// Admin Dashboard's Pages tab replaces these values; anything never edited
// falls back to what's here. Image fields left blank use the photos bundled
// with the site.
export const defaultContent = {
    site: {
        footerTagline: "Supporting veterans and their families in our community since 1945.",
        locationLabel: "Grenada, Mississippi",
        mapUrl: "https://maps.app.goo.gl/C2iNEjx8fK6wDhAfA",
        phone: "(662) 226-0000",
        email: "info@vfwgrenada.org",
    },

    home: {
        heroTagline: "Grenada, Mississippi",
        heroTitle: "Veterans of\nForeign Wars",
        heroText:
            "Honoring those who served, serving those who came home. A cornerstone of the Grenada community since 1945.",
        heroImage: "",
        stats: [
            { value: "1945", label: "Serving Since" },
            { value: "200+", label: "Active Members" },
            { value: "$50K+", label: "Community Support" },
        ],
        slideshowTitle: "Recent Events",
        eventsTitle: "Upcoming Events",
        noEventsText: "No upcoming events scheduled at this time.",
        aboutLabel: "Our Story",
        aboutTitle: "About Our Post",
        aboutText:
            "The Veterans of Foreign Wars Post in Grenada, Mississippi has been a cornerstone of our community for over seven decades. We are dedicated to honoring the service and sacrifice of our nation's veterans while providing support to active military personnel and their families.\n\nThrough community events, charitable work, and fellowship, we continue our mission to serve those who have served our country with unwavering dedication and pride.",
        aboutImage: "",
        ctaTitle: "Ready to Make a Difference?",
        ctaText: "Support our veterans through membership or a generous donation to the VFW Grenada Post.",
    },

    gallery: {
        title: "Photo Gallery",
        subtitle: "Memories from our events, ceremonies, and community activities",
        emptyText: "Check back soon! Photos from recent events will appear here.",
    },

    contact: {
        bannerTitle: "Contact Us",
        bannerSubtitle: "Get in touch with our VFW leadership team",
        address: "VFW Post\nGrenada, Mississippi\n38901",
        leadershipTitle: "Leadership Team",
        leaders: [
            {
                name: "John Anderson",
                position: "Commander",
                rank: "SGT",
                email: "j.anderson@email.com",
                phone: "(662) 226-1234",
            },
            {
                name: "Robert Williams",
                position: "Senior Vice Commander",
                rank: "CPL",
                email: "r.williams@email.com",
                phone: "(662) 226-2345",
            },
            {
                name: "Michael Davis",
                position: "Junior Vice Commander",
                rank: "PFC",
                email: "m.davis@email.com",
                phone: "(662) 226-3456",
            },
            {
                name: "James Thompson",
                position: "Quartermaster",
                rank: "SPC",
                email: "j.thompson@email.com",
                phone: "(662) 226-4567",
            },
        ],
        hoursTitle: "Office Hours",
        hours: [
            { days: "Monday - Thursday", time: "10:00 AM - 6:00 PM" },
            { days: "Friday", time: "10:00 AM - 8:00 PM" },
            { days: "Saturday", time: "12:00 PM - 4:00 PM" },
            { days: "Sunday", time: "Closed" },
        ],
        meetingsTitle: "Monthly Meetings",
        meetingsText:
            "General membership meetings are held on the third Tuesday of each month at 6:00 PM.\n\nAll members are encouraged to attend. Light refreshments provided.",
    },

    donations: {
        bannerTitle: "Support Our Veterans",
        bannerText:
            "Your generous donations help us provide vital services and support to veterans and their families in the Grenada community.",
        formTitle: "Make a Donation",
        zeffyUrl: "",
        helpTitle: "How Your Donation Helps",
        helpItems: [
            {
                title: "Veteran Support Services",
                text: "Providing assistance with healthcare, housing, and essential needs",
            },
            {
                title: "Community Programs",
                text: "Supporting youth programs, scholarships, and community events",
            },
            {
                title: "Memorial Programs",
                text: "Honoring fallen heroes and maintaining memorial sites",
            },
        ],
        otherWaysTitle: "Other Ways to Give",
        otherWays: [
            { text: "Mail a check to our post office address" },
            { text: "Donate goods or services to our fundraising events" },
            { text: "Volunteer your time at our community programs" },
            { text: "Consider a planned gift or bequest" },
        ],
        taxTitle: "Tax Deductible",
        taxText:
            "VFW is a 501(c)(19) organization. Your donation may be tax-deductible. Consult your tax advisor for details.",
    },

    applications: {
        title: "Join VFW Grenada",
        subtitle: "Become part of our community dedicated to serving those who served",
        requirementsTitle: "Eligibility Requirements",
        requirements: [
            { text: "U.S. citizen or U.S. national" },
            { text: "Served in the Armed Forces of the United States" },
            { text: "Received a campaign medal for overseas service or served in a combat zone" },
            { text: "Honorable discharge or currently serving honorably" },
        ],
        certification:
            "By submitting this form, you certify that the information provided is accurate and that you meet the eligibility requirements for VFW membership. A member of our team will review your application and contact you within 5-7 business days.",
        successTitle: "Application Submitted!",
        successText: "Thank you for your interest in joining VFW Grenada. We will be in touch soon.",
    },
};
