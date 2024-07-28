import AppBar from "@/components/AppBar";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-native";
import { ScrollView, Text, View, FlatList } from "react-native";
import StyledInput from "@/components/StyledInput";
import { PrefixIcon, SendButton } from "@/components/Button";
import MessageItem from "@/components/message";
import CircularImage from "@/components/CircularImage";
import { useEffect, useRef, useState } from "react";
import { utilsGetChatMessages, utilsSendMessage } from "@/helpers/utils";
import { MessageInfo } from "@/helpers/types";
import { database } from "@/services/firebase.service";


const ChatPage = () => {
    const { name, chatId, photo, currentUserId } = useLocalSearchParams();
    const [messages, setMessages] = useState<MessageInfo[]>([]);
    const [message, setMessage] = useState<string>("");
    const flatListRef = useRef<FlatList>(null);

    const chatMessages = async () => {
        const msgs = await utilsGetChatMessages(chatId!.toString());
        console.log(msgs);
        if (msgs != undefined && msgs != null) {
            setMessages(msgs);
        }
    }

    const sendMessage = async () => {
        if (message.trim()) {
            setMessage("")
            utilsSendMessage(
                chatId!.toString(), currentUserId!.toString(), message
            );
        }
    }

    useEffect(() => {
        const messagesRef = database().ref(`messages/${chatId}`);

        const handleNewMessage = (e) => {
            const newMessage = e.val();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        messagesRef.on('child_added', handleNewMessage);

        // Cleanup on unmount
        return () => {
            messagesRef.off('child_added', handleNewMessage);
        };
    }, [chatId]);

    useEffect(() => {
        chatMessages();
    }, [])

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd();
        }
    }, [messages]);

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
                        <Text className="text-base text-white font-semibold">{name}</Text>
                        <Text className="text-sm font-normal text-text2">Online</Text>
                    </View>
                </View>
            </AppBar>

            {/* Body */}
            <FlatList
                className="px-[15]"
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <MessageItem
                        type={item.senderId == currentUserId?.toString() ? "sended" : "received"}
                        content={item.content}
                    />
                )}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                onLayout={() => flatListRef.current?.scrollToEnd()}
            />

            {/* Bottom: Message Input & Send Button */}
            <View className="flex flex-row p-4 bg-white">
                <StyledInput
                    style={{ borderWidth: 1, flex: 1 }}
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