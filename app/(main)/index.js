import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAuth, useRTDB } from '../../hooks/firebaseHooks';
import Boards from './components/Boards';

export default function Home() {



    const { user, loading, error } = useAuth();
    const { data: dbData, loading: dataLoading, error: dataError } = useRTDB(
        user ? user.uid : null
    );


    return (
        <View style={styles.container}>
            {
                dbData &&
                Object.entries(dbData).map(([key, data]) => {
                    if (data == "display") return;
                    return (
                        <Boards boardKey={key} uid={user.uid} boardData={data} />
                    )
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',             // Bootstrap .container-fluid width
        paddingHorizontal: 15,     // Standard Bootstrap gutter padding
        flexDirection: 'row',      // Allows items to sit side-by-side
        flexWrap: 'wrap',          // Necessary if items exceed screen width
        justifyContent: 'flex-start',
        marginBottom: 10,
        gap: 5,
    },
})
