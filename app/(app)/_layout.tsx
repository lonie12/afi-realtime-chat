import { Redirect, Stack, Tabs } from 'expo-router';
import { useSession } from '@/helpers/ctx';
import { Loader } from '@/components/Loaders';
import { Styles } from '@/helpers/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return (
            <SafeAreaView style={Styles.centerAll}>
                <Loader />
            </SafeAreaView>
        );
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/signin.page" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(navs)' />
            <Stack.Screen name='(chat)/chat.page' />
        </Stack>
    );
}