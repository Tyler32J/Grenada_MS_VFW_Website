import { Heart, Users, Award, ExternalLink } from "lucide-react";
import Flag from "../assets/home/vfw_3.jpg";
import Flag2 from "../assets/home/american_flag_2.jpg";
import { useContent } from "../hooks/useContent";
import { mailtoHref, safeUrl, zeffyEmbedUrl } from "../utils/text";
import { usePageMeta } from "../hooks/usePageMeta";

// Icons for the "How your donation helps" items, repeated in order if there are more items.
const helpIcons = [
    { Icon: Heart, background: "bg-[#FFF5E8]", color: "text-[#D4871A]" },
    { Icon: Users, background: "bg-[#EEF4FF]", color: "text-[#0B1E4A]" },
    { Icon: Award, background: "bg-[#FFF0F3]", color: "text-[#9B1C2E]" },
];

function Donations() {
    usePageMeta({ title: "Donate", path: "/donations", description: "Donate to VFW Post 4488 in Grenada, MS to support local veterans, their families, and community programs." });
    const content = useContent("donations");
    const site = useContent("site");
    const embedUrl = zeffyEmbedUrl(content.zeffyUrl);
    const emailLink = mailtoHref(site.email);

    return (
        <div className="min-h-screen bg-[#F5F1E8]">
            {/* Banner */}
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1E4A]">
                    <img
                        src={Flag}
                        alt="Soldiers holding American flag"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E4A]/90 to-[#0B1E4A]/70" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1
                        className="text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.bannerTitle}
                    </h1>
                    <div className="w-16 h-1 bg-[#D4871A] rounded mb-3" />
                    <p className="text-[#B8C8E8] text-lg max-w-2xl">{content.bannerText}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4871A]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Donation form, hosted by Zeffy. Card details go straight to Zeffy and never touch this site. */}
                    <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#D4871A]">
                        <h2
                            className="text-2xl font-bold text-[#0B1E4A] mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.formTitle}
                        </h2>

                        {embedUrl ? (
                            <>
                                <div className="relative w-full overflow-hidden rounded-md" style={{ height: "900px" }}>
                                    <iframe
                                        title="Donation form powered by Zeffy"
                                        src={embedUrl}
                                        className="absolute inset-0 w-full h-full border-0"
                                        allow="payment"
                                        loading="lazy"
                                    />
                                </div>
                                <a
                                    href={safeUrl(content.zeffyUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex items-center justify-center gap-2 text-sm text-[#D4871A] font-semibold hover:underline"
                                >
                                    Open the donation form in a new tab <ExternalLink size={14} />
                                </a>
                            </>
                        ) : (
                            <div className="text-center py-12 bg-[#F5F1E8] rounded-md px-6">
                                <p className="text-gray-700 mb-2 font-semibold">Online donations are coming soon.</p>
                                <p className="text-gray-500 text-sm">
                                    In the meantime, please contact us
                                    {emailLink && (
                                        <>
                                            {" "}at{" "}
                                            <a href={emailLink} className="text-[#D4871A] hover:underline">
                                                {site.email}
                                            </a>
                                        </>
                                    )}{" "}
                                    to make a gift.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        {content.helpItems.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[#0B1E4A]">
                                <h3
                                    className="text-xl font-bold text-[#0B1E4A] mb-5"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {content.helpTitle}
                                </h3>
                                <div className="space-y-5">
                                    {content.helpItems.map((item, index) => {
                                        const { Icon, background, color } = helpIcons[index % helpIcons.length];
                                        return (
                                            <div key={index} className="flex gap-4">
                                                <div className={`w-12 h-12 ${background} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className={color} size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#0B1E4A] mb-1">{item.title}</h4>
                                                    <p className="text-gray-600 text-sm">{item.text}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {content.otherWays.length > 0 && (
                            <div className="relative rounded-lg shadow-md overflow-hidden">
                                <div className="absolute inset-0 bg-[#0B1E4A]">
                                    <img
                                        src={Flag2}
                                        alt="American flag"
                                        className="w-full h-full object-cover opacity-20"
                                    />
                                </div>
                                <div className="relative p-8">
                                    <h3
                                        className="text-xl font-bold text-white mb-4"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {content.otherWaysTitle}
                                    </h3>
                                    <ul className="space-y-3 text-[#B8C8E8]">
                                        {content.otherWays.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-[#D4871A] mt-1 font-bold">•</span>
                                                <span>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border-l-4 border-[#D4871A] rounded-md p-6 shadow-sm">
                            <p className="text-[#0B1E4A] font-semibold mb-2">{content.taxTitle}</p>
                            <p className="text-gray-600 text-sm">{content.taxText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donations;
