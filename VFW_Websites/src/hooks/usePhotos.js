import { useEffect, useState } from "react";
import { fetchPhotos } from "../services/api";

// Photos uploaded from the Admin Dashboard, newest first.
// `loading` lets callers avoid flashing placeholder photos before real ones arrive.
export function usePhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos()
            .then(setPhotos)
            .catch((error) => console.error("Couldn't load photos.", error))
            .finally(() => setLoading(false));
    }, []);

    return { photos, loading };
}
