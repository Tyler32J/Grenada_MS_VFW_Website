import { useEffect, useState } from "react";
import { fetchUpcomingEvents } from "../services/api";

// Upcoming events (today onward), soonest first.
export function useEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchUpcomingEvents()
            .then(setEvents)
            .catch((error) => console.error("Couldn't load events.", error));
    }, []);

    return events;
}
