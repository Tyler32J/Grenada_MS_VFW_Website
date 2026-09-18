import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/VFW_Icon.png";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-[#162F5E] hover:text-white ${
            isActive ? "text-white bg-[#c98b36]" : ""
        }`;

    return (
        <nav
            className="sticky top-0 z-50 border-b-4"
            style={{
                backgroundColor: "#051642",
                borderBottomColor: "#c98b36",
                fontFamily: "'Playfair Display', serif",
            }}
        >
            
            <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">

               
                <div className="flex items-center gap-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-14 w-14 md:h-16 md:w-16"
                    />

                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-white">
                            Veterans of Foreign Wars
                        </h1>

                        <p
                            className="text-sm font-bold"
                            style={{ color: "#B8C8E8" }}
                        >
                            Warren E. Campbell Post 4488
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div
                    className="hidden md:flex gap-6 text-lg"
                    style={{ color: "#B8C8E8" }}
                >
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/gallery" className={linkClass}>
                        Gallery
                    </NavLink>

                    <NavLink to="/donations" className={linkClass}>
                        Donations
                    </NavLink>

                    <NavLink to="/applications" className={linkClass}>
                        Join Us
                    </NavLink>

                    <NavLink to="/contact" className={linkClass}>
                        Contact
                    </NavLink>

                    <NavLink to="/admin" className={linkClass}>
                        Admin
                    </NavLink>
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white"
                >
                    {menuOpen ? <X size={34} /> : <Menu size={34} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div
                    className="flex flex-col px-4 pb-4 gap-2"
                    style={{ color: "#B8C8E8" }}
                >
                    <NavLink
                        to="/"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/gallery"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Gallery
                    </NavLink>

                    <NavLink
                        to="/donations"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Donations
                    </NavLink>

                    <NavLink
                        to="/applications"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Join Us
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </NavLink>

                    <NavLink
                        to="/admin"
                        className={linkClass}
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;





// import logo from "../../assets/VFW_Icon.png";
// import { NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";


// function Navbar() {
//     const linkClass = ({ isActive }) =>
//         `px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-[#162F5E] hover:text-white ${
//             isActive ? "text-white bg-[#c98b36]" : ""
//         }`;
//     const [open, setOpen] = useState(false);

//     return (
        
//         <div
//             className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 border-b-4 text-white"
//             style={{
//                 backgroundColor: "#051642",
//                 borderBottomColor: "#c98b36",
//                 fontFamily: "'Playfair Display', serif",
//             }}
//             >
//                 <div className=" flex items-center gap-6">
//                     <img src={logo} alt="Logo" className="h-16 w-16" />

//                     <h1 className="text-lg md:text-xl font-bold tracking-wide">
//                         Veterans of Foreign Wars
//                         {/* <p className="text-sm font-bold" style={{ color: "#B8C8E8" }}>
//                             Grenada, Mississippi
//                         </p> */}
//                         <p className="text-sm font-bold" style={{ color: "#B8C8E8" }}>
//                             Warren E. Campbell Post 4488
//                         </p>
//                     </h1>
//                 </div>

//                 <div className="hidden md:flex gap-6 text-lg" style={{ color: "#B8C8E8" }}>
//                     <NavLink to="/" className={linkClass} >Home</NavLink>
//                     <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
//                     <NavLink to="/contact" className={linkClass}>Contact</NavLink>
//                     <NavLink to="/donations" className={linkClass}>Donations</NavLink>
//                     <NavLink to="/admindashbord" className={linkClass}>Admin</NavLink>
//                     <button
//                         className="md:hidden"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <X size={32} /> : <Menu size={32} />}
//                     </button>
//                 </div>
//                 {open && (
//                     <div
//                         className="md:hidden flex flex-col gap-3 px-6 pb-6 text-lg"
//                         style={{ backgroundColor: "#051642" }}
//                     >
//                         <NavLink to="/" className={linkClass}>Home</NavLink>
//                         <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
//                         <NavLink to="/contact" className={linkClass}>Contact</NavLink>
//                         <NavLink to="/donations" className={linkClass}>Donations</NavLink>
//                         <NavLink to="/admindashbord" className={linkClass}>Admin</NavLink>
//                     </div>
//                 )}
//         </div>
//     );
// }

// export default Navbar;