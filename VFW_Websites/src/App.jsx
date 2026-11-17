import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donations from "./pages/Donations";
import Applications from "./pages/Application";
import { useContentReady } from "./hooks/useContent";

// Loaded only when someone opens /admin, so visitors download less.
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
    // Wait for edited content before showing pages, so visitors never see
    // the old default text flash in first.
    const contentReady = useContentReady();

    return (
        <BrowserRouter>
            <Navbar />
            {contentReady ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/applications" element={<Applications />} />
                    {/* Not linked in the menu; admins go to /admin directly. */}
                    <Route
                        path="/admin"
                        element={
                            <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
                                <AdminDashboard />
                            </Suspense>
                        }
                    />
                </Routes>
            ) : (
                <div className="min-h-screen bg-[#F5F1E8]" />
            )}
            {contentReady && <Footer />}
        </BrowserRouter>
    );
}

export default App;
