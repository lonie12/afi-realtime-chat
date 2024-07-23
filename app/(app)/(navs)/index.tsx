import AppBar from "@/components/AppBar";
import ChatItem from "@/components/ChatItem";
import FloatingButton from "@/components/FloatingButton";
import { useSession } from "@/helpers/ctx";
import { ChatInfo, UserInfo } from "@/helpers/types";
import { utilsGetUserChats } from "@/helpers/utils";
import { InfoCircle } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";


const MessagesPage = () => {
    const { signOut, session } = useSession();
    const [chats, setChats] = useState<ChatInfo[]>([]);

    const userChats = async () => {
        const currentUser = JSON.parse(session!) as UserInfo;
        const chats = await utilsGetUserChats(currentUser.email);
        if (chats) return setChats(chats);
    }

    useEffect(() => {
        userChats();
    }, []);

    return (
        <View className="flex-1" >
            <AppBar>
                <Text className="text-xl text-white font-semibold">Messages</Text>
                <InfoCircle onPress={() => signOut()} color="white" />
            </AppBar>
            <ScrollView className="px-[15]">
                {chats.map((_, idx) => (
                    <ChatItem chat={_} key={idx} />
                ))}
            </ScrollView>
            <FloatingButton />
        </View>
    );
}

export default MessagesPage;