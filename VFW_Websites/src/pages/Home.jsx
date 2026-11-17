import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Slideshow from "../components/home/Slideshow";
import UpcomingEvents from "../components/home/UpcomingEvents";
import AboutSection from "../components/home/AboutSection";
import CallToAction from "../components/home/CallToAction";
import { usePageMeta } from "../hooks/usePageMeta";

function Home() {
    usePageMeta({ path: "/", description: "Veterans of Foreign Wars Warren E. Campbell Post 4488 in Grenada, Mississippi. Supporting veterans and their families since 1945. Join the VFW, donate, and see upcoming events." });
    return (
        <>
            <Hero />
            <Stats />
            <Slideshow />
            <UpcomingEvents />
            <AboutSection />
            <CallToAction />
        </>
    );
}

export default Home;
