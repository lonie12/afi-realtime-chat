import { StatusBar } from "expo-status-bar";
import { InfoCircle } from "iconsax-react-native";
import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppBar = ({ children }: PropsWithChildren) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex flex-row justify-between items-center bg-tint px-[15] h-[90]"
            style={{ paddingTop: insets.top }}
        >
            <StatusBar style="light" translucent />
            {children}
        </View>
    )
}

export default AppBar;