import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";


type StyledTextInputProps = TextInputProps & {
    prefix?: ReactNode;
}

const StyledInput = ({ prefix, ...props }: StyledTextInputProps) => {

    return (
        <TextInput
            {...props}
            className="w-max items-center justify-center flex-row px-3 h-12 border-[#E0E3DD] rounded-[100]"
        />
    );
}

export default StyledInput;