import { MessageAdd1 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native";


const FloatingButton = () => {

    return (
        <TouchableOpacity
            className="flex absolute items-center justify-center w-[50] h-[50] rounded-[25] bg-tint bottom-2 right-3"
        >
            <MessageAdd1 color="white" />
        </TouchableOpacity>
    );
}

export default FloatingButton;