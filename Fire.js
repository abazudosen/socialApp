import FirebaseKeys from "./config";
import firebase from "firebase";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
    }
  }

  addPost = async ({ text, localUri, uri, name }) => {
    // const id = uuid.v4();
    const remoteUri = await this.uploadPhotoAsync(
      localUri,
      `photos/${this.uid}/${Date.now()}`
    );
    const avatarUri = await this.uploadPhotoAsync(uri, `avatars/${this.uid}`);
    firestore
      .collection("posts")
      .set({
        // id: id,
        name,
        avatar: avatarUri,
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        image: remoteUri,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(filename).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    }).catch((error) => {
      console.error(error);
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
