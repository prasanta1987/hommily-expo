import { Slot } from 'expo-router';
import { AuthProvider } from '../context/auth';

export default function Root() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
