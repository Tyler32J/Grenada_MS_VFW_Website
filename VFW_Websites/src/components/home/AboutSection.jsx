import { Link } from "react-router-dom";
import Photo from "../../assets/home/vfw_image_1.png";
import { useContent } from "../../hooks/useContent";
import { toParagraphs } from "../../utils/text";

function AboutSection() {
    const content = useContent("home");
    const paragraphs = toParagraphs(content.aboutText);

    return (
        <section className="py-16 bg-[#F5F1E8]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Photo, with an orange border box behind it */}
                    <div className="relative order-last lg:order-first">
                        <div className="absolute -bottom-3 -right-3 w-full h-full border-4 border-[#D4871A] rounded-xl" />
                        <img
                            src={content.aboutImage || Photo}
                            alt=""
                            className="relative w-full h-80 object-cover rounded-xl shadow-xl"
                        />
                    </div>

                    {/* Text content */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px w-8 bg-[#D4871A]" />
                            <span className="text-[#D4871A] text-sm font-semibold tracking-widest uppercase">
                                {content.aboutLabel}
                            </span>
                        </div>
                        <h2
                            className="text-4xl font-bold text-[#0B1E4A] mb-5"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.aboutTitle}
                        </h2>
                        {paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className={`text-gray-700 leading-relaxed ${
                                    index === paragraphs.length - 1 ? "mb-8" : "mb-4"
                                }`}
                            >
                                {paragraph}
                            </p>
                        ))}
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/applications"
                                className="bg-[#0B1E4A] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#162F5E] transition-colors"
                            >
                                Join Our Post
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-[#0B1E4A] text-[#0B1E4A] px-6 py-3 rounded-md font-semibold hover:bg-[#0B1E4A] hover:text-white transition-colors"
                            >
                                Meet the Team
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
