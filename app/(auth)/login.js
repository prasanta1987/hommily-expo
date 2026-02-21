import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
            <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
