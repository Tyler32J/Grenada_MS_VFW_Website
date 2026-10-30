import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Flag from "../../assets/home/american_flag.jpg";
import vfw3 from "../../assets/home/vfw_3.jpg";
import vfw2 from "../../assets/home/vfw_2.webp";
import { useContent } from "../../hooks/useContent";
import { usePhotos } from "../../hooks/usePhotos";

// Shown until an admin marks uploaded photos as "Show in slideshow".
const defaultSlides = [
    { id: "default-1", url: Flag, caption: "Honoring our veterans at the Grenada post" },
    { id: "default-2", url: vfw3, caption: "Community members gather for our Memorial Day event" },
    { id: "default-3", url: vfw2, caption: "Members proudly display the colors" },
];

function Slideshow() {
    const content = useContent("home");
    const { photos, loading } = usePhotos();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideshowPhotos = photos.filter((photo) => photo.in_slideshow);
    const slides = slideshowPhotos.length > 0 ? slideshowPhotos : defaultSlides;

    // Auto-advance the slideshow every 5 seconds.
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((slide) => (slide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    function goToPreviousSlide() {
        setCurrentSlide((slide) => (slide - 1 + slides.length) % slides.length);
    }

    function goToNextSlide() {
        setCurrentSlide((slide) => (slide + 1) % slides.length);
    }

    const activePhoto = slides[currentSlide % slides.length];

    return (
        <section className="py-14 bg-[#F5F1E8]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2
                            className="text-3xl font-bold text-[#0B1E4A]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.slideshowTitle}
                        </h2>
                        <div className="w-12 h-1 bg-[#D4871A] mt-2 rounded" />
                    </div>
                    <Link
                        to="/gallery"
                        className="text-sm text-[#D4871A] font-semibold hover:underline flex items-center gap-1"
                    >
                        View Gallery <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="relative aspect-video bg-[#0B1E4A] rounded-xl overflow-hidden shadow-2xl">
                    {!loading && (
                        <>
                            <img
                                src={activePhoto.url}
                                alt={activePhoto.caption}
                                className="w-full h-full object-cover"
                            />

                            {activePhoto.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-6">
                                    <p className="text-white text-lg font-medium">{activePhoto.caption}</p>
                                </div>
                            )}
                        </>
                    )}

                    {slides.length > 1 && (
                        <>
                            <button
                                onClick={goToPreviousSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#D4871A]/90 hover:bg-[#D4871A] p-2 rounded-full shadow-lg transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="text-white" />
                            </button>
                            <button
                                onClick={goToNextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#D4871A]/90 hover:bg-[#D4871A] p-2 rounded-full shadow-lg transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="text-white" />
                            </button>

                            <div className="absolute bottom-5 right-6 flex gap-2">
                                {slides.map((photo, index) => (
                                    <button
                                        key={photo.id}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-1.5 rounded-full transition-all ${
                                            index === currentSlide % slides.length
                                                ? "bg-[#D4871A] w-6"
                                                : "bg-white/50 w-1.5"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Slideshow;
