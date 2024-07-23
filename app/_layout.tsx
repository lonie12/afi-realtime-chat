import { SessionProvider } from '@/helpers/ctx';
import { Slot } from 'expo-router';

import "../global.css";

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}