import AppBar from "@/components/AppBar";
import ChatItem from "@/components/ChatItem";
import { useSession } from "@/helpers/ctx";
import { ChatInfo, UserInfo } from "@/helpers/types";
import { utilsGetUserChats } from "@/helpers/utils";
import { InfoCircle } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import NewMessageModal from "../(chat)/modals/NewMessage.modal";
import FloatingButton from "@/components/Button";


const MessagesPage = () => {
    const { signOut, session } = useSession();
    const [chats, setChats] = useState<ChatInfo[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const userChats = async () => {
        const currentUser = JSON.parse(session!) as UserInfo;
        const chats = await utilsGetUserChats(currentUser.email);
        if (chats) return setChats(chats);
    }

    const dismissModal = async () => {
        await userChats();
        setIsModalVisible(!isModalVisible);
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
            <NewMessageModal dismiss={dismissModal} isVisible={isModalVisible} />
            <FloatingButton onPress={dismissModal} />
        </View>
    );
}

export default MessagesPage;