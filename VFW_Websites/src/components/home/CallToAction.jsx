import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Flag from "../../assets/home/american_flag_2.jpg";
import { useContent } from "../../hooks/useContent";

function CallToAction() {
    const content = useContent("home");

    return (
        <section className="relative py-16 overflow-hidden">
            {/* Dark blue background with a faded flag photo */}
            <div className="absolute inset-0 bg-[#0B1E4A]">
                <img
                    src={Flag}
                    alt="American flag"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-2 mb-4">
                    <Star className="text-[#D4871A] fill-[#D4871A]" size={18} />
                    <Star className="text-[#D4871A] fill-[#D4871A]" size={18} />
                    <Star className="text-[#D4871A] fill-[#D4871A]" size={18} />
                </div>
                <h2
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {content.ctaTitle}
                </h2>
                <p className="text-[#B8C8E8] mb-8 text-lg">{content.ctaText}</p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                        to="/donations"
                        className="bg-[#D4871A] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#B8700F] transition-colors"
                    >
                        Donate Now
                    </Link>
                    <Link
                        to="/applications"
                        className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
                    >
                        Join Today
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;
