import { io } from "socket.io-client";

export const socket = io("http://192.168.0.10:3000");