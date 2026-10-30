import Flag from "../../assets/home/american_flag.jpg";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContent } from "../../hooks/useContent";

function Hero() {
    const content = useContent("home");

    return (
        <section className="relative overflow-hidden bg-[#0B1E4A]" style={{ minHeight: "520px" }}>
            {/* Flag image, positioned to cover the right half of the hero */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
                <img
                    src={content.heroImage || Flag}
                    alt=""
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E4A] via-[#0B1E4A]/30 to-transparent" />
            </div>

            {/* Text content sits on top of the flag image */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-px w-8 bg-[#D4871A]" />
                        <span className="text-[#D4871A] text-sm font-semibold tracking-widest uppercase">
                            {content.heroTagline}
                        </span>
                    </div>

                    <h1
                        className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight whitespace-pre-line"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.heroTitle}
                    </h1>

                    <p className="text-lg text-[#B8C8E8] mb-8 leading-relaxed">
                        {content.heroText}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/applications"
                            className="inline-flex items-center gap-2 bg-[#D4871A] text-white px-7 py-3 rounded-md font-semibold hover:bg-[#B8700F] transition-colors shadow-lg"
                        >
                            Become a Member
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            to="/donations"
                            className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
                        >
                            Donate
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4871A]" />
        </section>
    );
}

export default Hero;
