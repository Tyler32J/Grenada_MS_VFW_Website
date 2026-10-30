import { Mail, Phone, MapPin, Award } from "lucide-react";
import Flag from "../assets/home/american_flag.jpg";
import Flag2 from "../assets/home/american_flag_2.jpg";
import { useContent } from "../hooks/useContent";
import { toParagraphs, telHref, mailtoHref } from "../utils/text";

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 3);
}

function Contact() {
    const content = useContent("contact");
    const site = useContent("site");
    const phoneLink = telHref(site.phone);
    const emailLink = mailtoHref(site.email);

    return (
        <div className="min-h-screen bg-[#F5F1E8]">
            {/* Banner */}
            <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1E4A]">
                    <img
                        src={Flag}
                        alt="American flag close up"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E4A]/80 to-[#0B1E4A]/70" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1
                        className="text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.bannerTitle}
                    </h1>
                    <div className="w-16 h-1 bg-[#D4871A] rounded mb-3" />
                    <p className="text-[#B8C8E8] text-lg">{content.bannerSubtitle}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4871A]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Contact cards */}
                <div className="grid lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center border-t-4 border-[#D4871A] hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="text-[#0B1E4A]" size={32} />
                        </div>
                        <h3
                            className="text-lg font-bold text-[#0B1E4A] mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Visit Us
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line">{content.address}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 text-center border-t-4 border-[#0B1E4A] hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-[#FFF5E8] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="text-[#D4871A]" size={32} />
                        </div>
                        <h3
                            className="text-lg font-bold text-[#0B1E4A] mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Call Us
                        </h3>
                        <p className="text-gray-600">
                            Main Line:<br />
                            {phoneLink ? (
                                <a href={phoneLink} className="text-[#D4871A] hover:underline font-semibold">
                                    {site.phone}
                                </a>
                            ) : (
                                site.phone
                            )}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 text-center border-t-4 border-[#9B1C2E] hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-[#FFF0F3] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-[#9B1C2E]" size={32} />
                        </div>
                        <h3
                            className="text-lg font-bold text-[#0B1E4A] mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Email Us
                        </h3>
                        <p className="text-gray-600">
                            General Inquiries:<br />
                            {emailLink ? (
                                <a href={emailLink} className="text-[#D4871A] hover:underline font-semibold">
                                    {site.email}
                                </a>
                            ) : (
                                site.email
                            )}
                        </p>
                    </div>
                </div>

                {/* Leadership team */}
                {content.leaders.length > 0 && (
                    <div className="mb-12">
                        <h2
                            className="text-3xl font-bold text-[#0B1E4A] mb-2 text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.leadershipTitle}
                        </h2>
                        <div className="w-16 h-1 bg-[#D4871A] mx-auto mb-8 rounded" />

                        <div className="grid md:grid-cols-2 gap-6">
                            {content.leaders.map((member, index) => {
                                const memberEmail = mailtoHref(member.email);
                                const memberPhone = telHref(member.phone);

                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-[#0B1E4A]"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="w-16 h-16 bg-gradient-to-br from-[#0B1E4A] to-[#162F5E] rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ border: "3px solid #D4871A" }}
                                            >
                                                <span className="text-white font-bold text-xl">
                                                    {getInitials(member.name)}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <h3
                                                    className="text-xl font-bold text-[#0B1E4A] mb-1"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                                >
                                                    {member.name}
                                                </h3>
                                                <p className="text-[#D4871A] font-semibold mb-3">
                                                    {member.position}
                                                </p>

                                                <div className="space-y-2">
                                                    {member.rank && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Award size={16} className="text-[#9B1C2E]" />
                                                            <span className="text-sm">{member.rank}</span>
                                                        </div>
                                                    )}
                                                    {memberEmail && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Mail size={16} className="text-gray-400" />
                                                            <a
                                                                href={memberEmail}
                                                                className="text-sm hover:text-[#D4871A] transition-colors"
                                                            >
                                                                {member.email}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {memberPhone && (
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Phone size={16} className="text-gray-400" />
                                                            <a
                                                                href={memberPhone}
                                                                className="text-sm hover:text-[#D4871A] transition-colors"
                                                            >
                                                                {member.phone}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Office hours */}
                <div className="relative rounded-lg shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#0B1E4A]">
                        <img
                            src={Flag2}
                            alt="American flag"
                            className="w-full h-full object-cover opacity-15"
                        />
                    </div>
                    <div className="relative p-8 text-white">
                        <h2
                            className="text-2xl font-bold mb-1 text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.hoursTitle}
                        </h2>
                        <div className="w-12 h-1 bg-[#D4871A] mx-auto mb-6 rounded" />

                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <div>
                                <h3 className="font-semibold mb-3 text-[#D4871A]">Regular Hours</h3>
                                <div className="space-y-2 text-blue-100">
                                    {content.hours.map((row, index) => (
                                        <div key={index} className="flex justify-between gap-4">
                                            <span>{row.days}:</span>
                                            <span className="font-semibold text-right">{row.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3 text-[#D4871A]">{content.meetingsTitle}</h3>
                                {toParagraphs(content.meetingsText).map((paragraph, index) => (
                                    <p key={index} className="text-blue-100 mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
