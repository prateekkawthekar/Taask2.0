import { admin_firebase } from "../helper/firebase_admin.js";
import multer from "multer";

// Cloud storage
 export const bucket = admin_firebase.storage().bucket();

export const uploadImage = async (file, name) => {

    const imageExtension = file.mimetype.split('/')[1]
    await bucket.file(`${name}.${imageExtension}`).createWriteStream().end(file.buffer)
    return bucket.file(`${name}.${imageExtension}`)
        .getSignedUrl({ action: 'read', expires: '03-09-2491' })
        .then(res => { return res[0] })
        .catch(err => { throw ({ message: 'Error uploading image' }) })
}

export const upload = multer({
    storage: multer.memoryStorage()
});