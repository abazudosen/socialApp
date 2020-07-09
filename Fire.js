import FirebaseKeys from "./config";
import firebase from "firebase";
import "@firebase/firestore";

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

    //const avatarUri = await this.uploadPhotoAsync(uri, `avatars/${this.uid}`);
    return new Promise(async (res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          // id: id,
          //name,
          //avatar: avatarUri,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", res(docRef));
        })
        .catch((error) => {
          console.error("Error adding document: ", rej(error));
        });
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

  createUser = async (user) => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null,
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );
        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error: ", error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
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
