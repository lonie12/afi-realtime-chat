import { userCollection } from '@/helpers/constants';
import { useSession } from '@/helpers/ctx';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { utilsCreateChat } from '@/helpers/utils';

export default function SignIn() {
    const { signIn } = useSession();

    const login = async () => {
        try {
            var user = await signIn();
            if (user) {
                const userRef = userCollection.doc(user.user.email);
                await userRef.set(user.user, { merge: true });
                utilsCreateChat(user, user).then(() => {
                    router.replace('(navs)');
                });
            }
        } catch (error) { console.log(error); }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                onPress={login}>
                Google SignIn
            </Text>
        </View>
    );
}