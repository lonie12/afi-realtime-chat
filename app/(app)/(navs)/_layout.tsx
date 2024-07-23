import { Tabs } from "expo-router";


const ChatLayout = () => {

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="settings.page" />
        </Tabs>
    );
}

export default ChatLayout;