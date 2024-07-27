import { GoogleSignin } from "@/services/firebase.service";
import { User } from "@react-native-google-signin/google-signin";
import { ChatInfo, MessageInfo, UserInfo } from "./types";
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import { chatCollection, messageCollection, userCollection } from "./constants";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const utilsGoogleSignIn = async (): Promise<User | undefined> => {
    try {
        await GoogleSignin.hasPlayServices();
        return await GoogleSignin.signIn();
    } catch (error) {
        console.error(error);
    }
};

const utilsIsUserExists = async (
    email: string
): Promise<boolean> => {
    const userRef = userCollection.doc(email);
    const exists = (await userRef.get()).exists;
    if (exists) return true;
    return false;
}

const utilsCreateUser = async (user: User) => {
    const exists = await utilsIsUserExists(user.user.email);
    if (!exists) {
        const userRef = userCollection.doc(user.user.email);
        await userRef.set(user.user);
        await utilsCreateChat(user.user, user.user);
    }
}

const utilsSignUpCredential = async (
    { idToken }: { idToken: string }
): Promise<boolean> => {
    try {
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const utilsCreateChat = async (
    s: UserInfo,
    r: UserInfo
): Promise<boolean> => {
    let result = false;
    try {
        const chatData = {
            id: uuid.v4(), sender: s, receiver: r
        };
        await chatCollection.add(chatData);
        result = true;
    } catch (error) { console.log(error); }
    return result;
}

const utilsSendMessage = async (
    chatId: string,
    senderId: string,
    content: string
): Promise<boolean> => {
    let result = false;
    try {
        const messageData = { id: uuid.v4(), chatId, senderId, content };
        const message = await messageCollection.add(messageData);
        if (message) { result = true };
    } catch (error) { console.log(error); }
    return result;
}

const utilsGetUserChats = async (
    email: string
): Promise<ChatInfo[] | undefined> => {
    try {
        const snapshots = await chatCollection.where(
            'sender.email', '==', email
        ).get();
        const chats: any[] = [];
        snapshots.docs.forEach((chatDoc) => {
            const chatData = chatDoc.data();
            chats.push(chatData);
        });
        return chats;
    } catch (error) { console.log(error); return undefined }
}

const utilsGetChatMessages = async (
    chatId: string
): Promise<MessageInfo[] | undefined> => {
    try {
        const snapshots = await messageCollection.where(
            'chatId', '==', chatId
        ).get();
        const messages: any[] = [];
        snapshots.docs.forEach((messageDoc) => {
            const messageData = messageDoc.data();
            messages.push(messageData);
        });
        return messages;
    } catch (error) { console.log(error); return undefined }
}

export {
    utilsGoogleSignIn,
    utilsSignUpCredential,
    utilsCreateChat,
    utilsSendMessage,
    utilsGetUserChats,
    utilsGetChatMessages,
    utilsIsUserExists,
    utilsCreateUser,
}