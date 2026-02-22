import { Slot } from 'expo-router';
import { AuthProvider } from '../context/auth';
import { Text } from 'react-native-web';


export default function Root() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
