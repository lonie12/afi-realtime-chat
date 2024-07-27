import { GalleryAdd, Send2, MessageAdd1 } from "iconsax-react-native";
import {
    TouchableOpacity, Pressable, PressableProps, Text, View, ViewProps,
    TouchableOpacityProps
} from "react-native";

type SendButtonProps = ViewProps & {
    onPress: () => void
}

type StyledButtonProps = PressableProps & {
    title: string,
    loading: boolean,
}

const SendButton = ({ onPress, ...props }: SendButtonProps) => {
    return (
        <View
            className="ml-3 items-center justify-center w-12 h-12 bg-tint rounded-3xl"
            {...props}
        >
            <Pressable onPress={onPress}>
                <Send2 className="self-center" color="white" />
            </Pressable>
        </View>
    );
}

const StyledButton = ({ title, loading, ...props }: StyledButtonProps) => {
    return (
        <Pressable
            className="bg-tint rounded-[100] h-12 justify-center mt-4"
            {...props}
        >
            {
                loading ? <Text>Loading ...</Text> : (
                    <Text className="text-white self-center"> {title} </Text>
                )
            }
        </Pressable>
    );
}


const PrefixIcon = () => {

    return (
        <View className="mr-2 items-center justify-center w-[34] h-[34] rounded-[17] bg-[#F5F6F4]">
            <GalleryAdd color="#373F47" size={18} />
        </View>
    );
}


const FloatingButton = ({ ...props }: TouchableOpacityProps) => {

    return (
        <TouchableOpacity
            {...props}
            className="flex absolute items-center justify-center w-[50] h-[50] rounded-[25] bg-tint bottom-2 right-3"
        >
            <MessageAdd1 color="white" />
        </TouchableOpacity>
    );
}

export default FloatingButton;

export {
    SendButton,
    StyledButton,
    PrefixIcon,
    FloatingButton,
}