import admin from "firebase-admin";
import serviceAccount from "../ezzey-31e57-firebase-adminsdk-8q37l-d5e14cac98.json";
 

export const admin_firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ezzey-31e57.appspot.com/"
});
