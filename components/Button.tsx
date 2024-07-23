import { GalleryAdd, Send2 } from "iconsax-react-native";
import { Pressable, View, ViewProps } from "react-native";

type SendButtonProps = ViewProps & {
    onPress: () => void
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

const StyledButton = ({ ...props }) => {
    return (<View></View>);
}


const PrefixIcon = () => {

    return (
        <View className="mr-2 items-center justify-center w-[34] h-[34] rounded-[17] bg-[#F5F6F4]">
            <GalleryAdd color="#373F47" size={18} />
        </View>
    );
}

export {
    SendButton,
    StyledButton,
    PrefixIcon,
}