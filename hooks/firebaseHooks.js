import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebaseConfig';

export function useRTDB(path) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!path) return;

        // Create the reference inside the hook
        const dbRef = ref(db, path);

        const unsubscribe = onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
            setLoading(false);
        }, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [path]); // Re-runs if the path string changes

    return { data, loading, error };
}


export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (user) => {
                setUser(user);
                setLoading(false);
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { user, loading, error };
}