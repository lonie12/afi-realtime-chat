import { Styles } from "@/helpers/Styles";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Loader = () => {

    return (
        <Text>Loading...</Text>
    );
};

const CircularLoader = () => {

    return (
        <View></View>
    );
};

export { Loader, CircularLoader }