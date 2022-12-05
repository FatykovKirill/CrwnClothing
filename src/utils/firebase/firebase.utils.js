import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDYWwM5hDtlEJG2FhNG9cZE_yFLKqnelzQ",
    authDomain: "crwn-clothing-db-e38f3.firebaseapp.com",
    projectId: "crwn-clothing-db-e38f3",
    storageBucket: "crwn-clothing-db-e38f3.appspot.com",
    messagingSenderId: "408633815355",
    appId: "1:408633815355:web:b09d6cbc1e6db931bd071e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumnetFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }

        return userDocRef;
    };
}