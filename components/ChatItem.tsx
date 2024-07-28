import { router } from "expo-router";
import { Text, View, Pressable, Image } from "react-native";
import CircularImage from "./CircularImage";
import { ChatInfo, UserInfo } from "@/helpers/types";
import { useSession } from "@/helpers/ctx";

const ChatItem = ({ chat }: { chat: ChatInfo }) => {
    const { session } = useSession();
    const currentUser = JSON.parse(session!) as UserInfo;
    const user = currentUser.id == chat.sender.id ? chat.receiver :
        currentUser.id == chat.receiver.id ? chat.sender : chat.sender


    return (
        <Pressable
            className="flex flex-row justify-between py-[15] border-[grey]"
            style={{ borderTopWidth: 0.3 }}
            onPress={() => router.navigate({
                pathname: "/chat.page",
                params: { ...chat.receiver, chatId: chat.id, currentUserId: currentUser.id }
            })}
        >
            <View className="flex flex-row">
                <CircularImage
                    className="w-[40] h-[40] rounded-[20]"
                    size={40}
                    source={{ uri: user.photo! }} />
                <View className="flex pl-[15]">
                    <Text className="text-text text-sm font-semibold">{user.name}</Text>
                    <Text className="text-text text-xs pt-1.5">User interface developer</Text>
                </View>
            </View>
            <Text className="text-text text-xs">Today, 6:41 pm</Text>
        </Pressable >
    );
}

export default ChatItem;