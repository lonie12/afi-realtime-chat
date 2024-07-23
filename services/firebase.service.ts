import {
    GoogleSignin
} from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore";


GoogleSignin.configure({
    webClientId: '764584036975-6gt66gedmrd0kjtlu8p1h3qkmf31dj4b.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});

export { GoogleSignin, firestore };