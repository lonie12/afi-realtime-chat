

export type UserInfo = {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
};

export type ChatInfo = {
    id: string;
    sender: UserInfo;
    receiver: UserInfo;
}

export type MessageInfo = {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
}