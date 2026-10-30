import { useContent } from "../../hooks/useContent";

// Stats are edited from the Admin Dashboard (Pages -> Home Page -> Stats bar).
function Stats() {
    const { stats } = useContent("home");

    if (stats.length === 0) return null;

    return (
        <section className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="grid divide-x divide-gray-100"
                    style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="py-6 text-center">
                            <div
                                className="text-3xl font-bold text-[#D4871A]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;
