import { Link } from "react-router-dom";
import logo from "../../assets/VFW_Icon.png";
import { useContent } from "../../hooks/useContent";
import { safeUrl, telHref, mailtoHref } from "../../utils/text";

function Footer() {
    const site = useContent("site");
    const mapLink = safeUrl(site.mapUrl);
    const phoneLink = telHref(site.phone);
    const emailLink = mailtoHref(site.email);

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
                    <p style={{ color: "#a2afce" }}>{site.footerTagline}</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h2 className="font-bold">Quick Links</h2>
                    <ul
                        className="flex flex-col items-center gap-2"
                        style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}
                    >
                        <li><Link to="/" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Home</Link></li>
                        <li><Link to="/gallery" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Gallery</Link></li>
                        <li><Link to="/donations" className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">Donations</Link></li>
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
                        {site.locationLabel && (
                            <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                                {mapLink ? (
                                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                                        {site.locationLabel}
                                    </a>
                                ) : (
                                    site.locationLabel
                                )}
                            </li>
                        )}
                        {phoneLink && (
                            <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                                <a href={phoneLink}>Phone: {site.phone}</a>
                            </li>
                        )}
                        {emailLink && (
                            <li className="text-sm text-[#a2afce] hover:text-[#c98b36] transition-colors">
                                <a href={emailLink}>Email: {site.email}</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
