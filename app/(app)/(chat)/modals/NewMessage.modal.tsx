import { StyledButton } from "@/components/Button";
import StyledInput from "@/components/StyledInput";
import { userCollection } from "@/helpers/constants";
import { useSession } from "@/helpers/ctx";
import { UserInfo } from "@/helpers/types";
import { utilsCreateChat, utilsIsUserExists } from "@/helpers/utils";
import { User } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Modal, ModalProps, Text, View } from "react-native";

type NewMessageModalProps = ModalProps & {
    isVisible: boolean;
    dismiss: () => void;
};

const NewMessageModal = ({ dismiss, isVisible }: NewMessageModalProps) => {
    const { session } = useSession();
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userWithEmail = async () => {
        setIsLoading(true);
        const exists = await utilsIsUserExists(email);
        if (exists) {
            const sender = JSON.parse(session!) as UserInfo;
            const document = await userCollection.doc(email).get();
            const receiver = document.data() as unknown as UserInfo;
            utilsCreateChat(sender, receiver).then((value) => {
                if (value) { dismiss() }
            });
        }
        setIsLoading(false);
    }

    return (
        <Modal
            onRequestClose={() => dismiss()}
            onDismiss={() => dismiss()}
            className="w-[25%]"
            visible={isVisible} animationType="slide"
        >
            <View
                className="flex-1 px-[15] justify-center"
            >
                <Text className="pb-4 text-lg font-bold text-text">Nouveau chat</Text>
                <StyledInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Rechercher un utilisateur"
                />
                <StyledButton
                    loading={isLoading}
                    onPress={() => userWithEmail()}
                    title="Rechercher"
                />
            </View>
        </Modal>
    );
}

export default NewMessageModal;