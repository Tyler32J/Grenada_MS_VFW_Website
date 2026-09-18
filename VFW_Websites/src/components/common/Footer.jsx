import { Link } from "react-router-dom";
import logo from "../../assets/VFW_Icon.png";

function Footer() {
    return (
        <footer
            className="py-12 px-6 text-white border-t-4"
            style={{ backgroundColor: "#070c1e", borderTopColor: "#c98b36", fontFamily: "'Playfair Display', serif" }}
        >
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="font-bold flex items-center gap-3 tracking-wide">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        VFW Grenada, MS
                    </h2>
                    <p style={{ color: "#a2afce" }}>
                        Supporting veterans and their families in our community since 1945.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h2 className="font-bold">Quick Links</h2>
                    <ul
                        className="flex flex-col items-center gap-2"
                        style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
                    >
                        <li><Link to="/" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Home</Link></li>
                        <li><Link to="/gallery" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Gallery</Link></li>
                        <li><Link to="/contact" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Contact</Link></li>
                        <li><Link to="/applications" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Join Us</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h2 className="font-bold">Contact</h2>
                    <ul
                        className="flex flex-col items-center gap-2"
                        style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
                    >
                        <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                            <a href="https://maps.app.goo.gl/C2iNEjx8fK6wDhAfA" target="_blank" rel="noopener noreferrer">
                                Grenada, Mississippi
                            </a>
                        </li>
                        <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                            <a href="">Phone: (662) 226-XXXX</a>
                        </li>
                        <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                            <a href="mailto:example@gmail.com">Email: info@grenadavfw.org</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
