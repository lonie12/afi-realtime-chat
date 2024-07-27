import AppBar from "@/components/AppBar";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import { ScrollView, Text, View } from "react-native";
import StyledInput from "@/components/StyledInput";
import { PrefixIcon, SendButton } from "@/components/Button";
import MessageItem from "@/components/message";
import CircularImage from "@/components/CircularImage";
import { useEffect, useState } from "react";
import { utilsGetChatMessages, utilsSendMessage } from "@/helpers/utils";
import { MessageInfo } from "@/helpers/types";
import { messageCollection } from "@/helpers/constants";


const ChatPage = () => {
    const { givenName, chatId, photo, senderId } = useLocalSearchParams();
    const [messages, setMessages] = useState<MessageInfo[]>([]);
    const [message, setMessage] = useState<string>("");

    const chatMessages = async () => {
        const msgs = await utilsGetChatMessages(chatId!.toString());
        if (msgs != undefined && msgs != null) {
            setMessages(msgs.reverse());
        }
    }

    const sendMessage = async () => {
        if (message.trim()) {
            setMessage("")
            utilsSendMessage(
                chatId!.toString(), senderId!.toString(), message
            );
        }
    }

    useEffect(() => {
        chatMessages();
    }, [])

    useEffect(() => {
        const query = messageCollection.where(
            'chatId', '==', chatId
        );

        query.onSnapshot(async querySnapshot => {
            const msgs: any[] = [];
            querySnapshot.docs.forEach((messageDoc) => {
                const messageData = messageDoc.data();
                msgs.push(messageData);
            })
            setMessages(msgs.reverse());
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }, [messages])

    return (
        <>
            {/* Header */}
            <AppBar>
                <View className="flex flex-row items-center">
                    <ArrowLeft2
                        color="white"
                        onPress={() => router.back()}
                    />
                    <CircularImage
                        className="w-[40] h-[40] rounded-[20]"
                        size={40}
                        source={{ uri: photo!.toString() }} />
                    <View className="flex items-start ml-3">
                        <Text className="text-base text-white font-semibold">{givenName}</Text>
                        <Text className="text-sm font-normal text-text2">Online</Text>
                    </View>
                </View>
            </AppBar>

            {/* Body */}
            <ScrollView
                className="bg-background px-[15]" style={{ flex: 1 }}
            >
                {messages.map((_, idx) => (
                    <MessageItem
                        key={idx}
                        type={_.senderId == senderId?.toString() ? "sended" : "received"}
                        content={_.content} />
                ))}
            </ScrollView>

            {/* Bottom: Message Input & Send Button */}
            <View className="flex flex-row p-4 bg-white">
                <StyledInput
                    style={{ flex: 1 }}
                    placeholder="Write your message..."
                    prefix={<PrefixIcon />}
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                />
                <SendButton onPress={sendMessage} />
            </View>
        </>
    );
}

export default ChatPage;