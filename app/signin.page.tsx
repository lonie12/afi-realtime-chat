import { userCollection } from '@/helpers/constants';
import { useSession } from '@/helpers/ctx';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { utilsCreateChat, utilsCreateUser, utilsIsUserExists } from '@/helpers/utils';

export default function SignIn() {
    const { signIn } = useSession();

    const navigateToPage = () => router.replace('(navs)');

    const login = async () => {
        try {
            var user = await signIn();
            if (user) {
                utilsCreateUser(user).then(navigateToPage);
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