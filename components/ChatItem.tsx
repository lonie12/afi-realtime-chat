import { router } from "expo-router";
import { Text, View, Pressable, Image } from "react-native";
import CircularImage from "./CircularImage";
import { ChatInfo } from "@/helpers/types";

const ChatItem = ({ chat }: { chat: ChatInfo }) => {

    return (
        <Pressable
            className="flex flex-row justify-between py-[15] border-[grey]"
            style={{ borderTopWidth: 0.3 }}
            onPress={() => router.navigate({
                pathname: "/chat.page",
                params: {
                    ...chat.sender, chatId: chat.id, senderId: chat.sender.id
                }
            })}
        >
            <View className="flex flex-row">
                <CircularImage
                    className="w-[40] h-[40] rounded-[20]"
                    size={40}
                    source={{ uri: chat.receiver.photo! }} />
                <View className="flex pl-[15]">
                    <Text className="text-text text-sm font-semibold">{chat.receiver.givenName}</Text>
                    <Text className="text-text text-xs pt-1.5">User interface developer</Text>
                </View>
            </View>
            <Text className="text-text text-xs">Today, 6:41 pm</Text>
        </Pressable >
    );
}

export default ChatItem;