import { Colors } from "@/helpers/Colors";
import { screenWidth } from "@/helpers/constants";
import { Text, View, ViewProps } from "react-native";


type StyledViewProps = ViewProps & {
    content: string;
    type: string;
    createdAt?: string;
}

const MessageItem = ({ type, content, createdAt }: StyledViewProps) => {

    return (
        <View
            className="my-3 p-3 rounded-xl border-[#F5F6F4]"
            style={{
                maxWidth: screenWidth / 1.2,
                alignSelf: type == "sended" ? "flex-end" : "flex-start",
                backgroundColor: type == "sended" ? Colors.light.tint : "white",
                borderWidth: 1,
            }}
        >
            <Text
                className="text-[14]"
                style={{ color: type == "sended" ? "white" : Colors.light.text }}
            >{content}</Text>
        </View>
    );
}

export default MessageItem;