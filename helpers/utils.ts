import { database, GoogleSignin } from "@/services/firebase.service";
import { User } from "@react-native-google-signin/google-signin";
import { ChatInfo, MessageInfo, UserInfo } from "./types";
import uuid from 'react-native-uuid';
import { chatCollection, messageCollection, userCollection } from "./constants";
import { Filter } from "@react-native-firebase/firestore";

const utilsGoogleSignIn = async (): Promise<User | undefined> => {
    try {
        await GoogleSignin.hasPlayServices();
        return await GoogleSignin.signIn();
    } catch (error) {
        console.error(error);
    }
};

const utilsIsUserExists = async (email: string): Promise<boolean> => {
    const userExists = await userCollection.doc(email).get();
    if (userExists.exists) return true;
    return false;
}

const utilsCreateUser = async (user: UserInfo) => {
    try {
        const userExists = await utilsIsUserExists(user.email);
        if (!userExists) {
            await userCollection.doc(user.email).set(user);
            await utilsCreateChat(user, user);
        }
    } catch (error) { console.log(error) }
}

const utilsCreateChat = async (
    sender: UserInfo,
    receiver: UserInfo
): Promise<boolean> => {
    let result = false;
    try {
        const chatData = { sender, receiver };
        await chatCollection.add({ ...chatData, id: uuid.v4() });
        result = true;
    } catch (error) { console.log(error); }
    return result;
}

const utilsGetUserChats = async (
    email: string
): Promise<ChatInfo[] | undefined> => {
    try {
        const snapshots = await chatCollection.where(
            // 'sender.email', '==', email
            Filter.or(
                Filter('sender.email', '==', email),
                Filter('receiver.email', '==', email),
            )
        ).get();
        const chats: any[] = [];
        snapshots.docs.forEach((chatDoc) => {
            const chatData = chatDoc.data();
            chats.push(chatData);
        });
        return chats;
    } catch (error) { console.log(error); return undefined }
}

const utilsSendMessage = async (
    chatId: string,
    senderId: string,
    content: string
) => {
    try {
        const refId = `messages/${chatId}`;
        const newReference = database().ref(refId).push();
        newReference.set({
            id: uuid.v4(), chatId, senderId, content
        })
    } catch (error) { console.log(error); }
}

const utilsGetChatMessages = async (
    chatId: string
): Promise<MessageInfo[] | undefined> => {
    try {
        let messages: any[] = [];
        const snapshots = await database().ref(`messages/${chatId}`).once('value');
        (snapshots as unknown as any[])
            .forEach((e) => { messages.push(e.val()); });
        return messages;
    } catch (error) { console.log(error); return undefined }
}

export {
    utilsGoogleSignIn,
    utilsCreateChat,
    utilsSendMessage,
    utilsGetUserChats,
    utilsGetChatMessages,
    utilsIsUserExists,
    utilsCreateUser,
}