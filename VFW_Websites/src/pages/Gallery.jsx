import { useState } from "react";
import { Calendar, Image as ImageIcon, X } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { usePhotos } from "../hooks/usePhotos";

function Gallery() {
    const content = useContent("gallery");
    const { photos, loading } = usePhotos();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <div className="min-h-screen bg-[#F5F1E8]">
            {/* Banner */}
            <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1E4A]" />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                    <h1
                        className="text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.title}
                    </h1>
                    <div className="w-16 h-1 bg-[#D4871A] rounded mb-3" />
                    <p className="text-[#B8C8E8] text-lg">{content.subtitle}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4871A]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? null : photos.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#D4871A]">
                            <ImageIcon className="text-[#0B1E4A]" size={40} />
                        </div>
                        <h3
                            className="text-2xl font-bold text-[#0B1E4A] mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            No Photos Yet
                        </h3>
                        <p className="text-gray-500 mb-3">{content.emptyText}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {photos.map((photo) => (
                            <button
                                key={photo.id}
                                onClick={() => setSelectedPhoto(photo)}
                                className="group relative aspect-[4/3] bg-[#0B1E4A] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-white font-semibold">{photo.caption}</p>
                                        <div className="flex items-center gap-2 mt-1 text-[#D4C090] text-sm">
                                            <Calendar size={14} />
                                            <span>{new Date(photo.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox: shows the selected photo full-size */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 text-white hover:text-[#D4871A] transition-colors"
                        aria-label="Close"
                    >
                        <X size={32} />
                    </button>
                    <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedPhoto.url}
                            alt={selectedPhoto.caption}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                        />
                        <div className="bg-[#0B1E4A]/80 backdrop-blur-sm rounded-lg p-6 mt-4 border-l-4 border-[#D4871A]">
                            {selectedPhoto.caption && (
                                <p className="text-white text-lg font-semibold mb-2">{selectedPhoto.caption}</p>
                            )}
                            <div className="flex items-center gap-2 text-[#B8C8E8]">
                                <Calendar size={16} />
                                <span>
                                    {new Date(selectedPhoto.created_at).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
