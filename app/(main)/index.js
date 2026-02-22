import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAuth, useRTDB } from '../../hooks/firebaseHooks';

export function Boards({ deviceName }) {

    return (
        <Text>{deviceName}</Text>
    );
}

export default function Home() {

    const { user, loading, error } = useAuth();
    const { data: dbData, loading: dataLoading, error: dataError } = useRTDB(
        user ? user.uid : null
    );



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                dbData &&
                Object.entries(dbData).map(([key, data]) => {
                    if (data == "display") return;
                    { console.log(data) }
                    return (
                        <Boards key={key} deviceName={data.deviceName} />
                    )
                })
            }
        </View>
    );
}

