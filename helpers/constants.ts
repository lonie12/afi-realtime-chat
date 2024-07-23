import { Dimensions } from "react-native";
import { firestore } from '@/services/firebase.service';

const dimensions = Dimensions.get("screen");

export const screenWidth = dimensions.width;

export const screenHeight = dimensions.height;


export const userCollection = firestore().collection("users");

export const chatCollection = firestore().collection("chats");

export const messageCollection = firestore().collection("messages");
