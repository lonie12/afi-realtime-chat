import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";


type StyledTextInputProps = TextInputProps & {
    prefix?: ReactNode;
}

const StyledInput = ({ prefix, ...props }: StyledTextInputProps) => {

    return (
        <View
            className="items-center justify-center flex-row px-3 h-12 flex-1 border-[#E0E3DD] rounded-[100]"
            style={{ borderWidth: 1 }}
        >
            {prefix}
            <TextInput className="flex-1" {...props} />
        </View>
    );
}

export default StyledInput;