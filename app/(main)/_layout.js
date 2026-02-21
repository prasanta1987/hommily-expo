import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/auth'; // Custom hook from your AuthProvider
import { ActivityIndicator, View } from 'react-native';

export default function MainLayout() {
    const { user, loading } = useAuth();

    // Show a spinner while Firebase is checking the login status
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // If no user is logged in, redirect them to the login screen
    if (!user) {
        return <Redirect href="/login" />;
    }

    // If authenticated, show the app screens
    return <Stack />;
}
