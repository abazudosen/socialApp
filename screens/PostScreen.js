import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermission";

const firebase = require("firebase");
require("firebase/firestore");

export default function PostScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [text, setText] = useState("");
  const [imagestate, setImageState] = useState();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    let unsubscribe = null;
    const userId = Fire.shared.uid;

    unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });
    // console.tron.log(user);
  }

  useEffect(() => {
    UserPermissions.getCameraPermission();
  }, []);

  function handlePost() {
    // setLoading(true);

    Fire.shared
      .addPost({
        name: user.name,
        text: text.trim(),
        localUri: imagestate,
        uri: user.avatar,
      })
      .then((ref) => {
        setText();
        setImageState();
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
    // setLoading(false);
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setImageState(result.uri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainter}>
        <Image
          source={require("../assets/tempAvatar.jpg")}
          style={styles.avatar}
        ></Image>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share something?"
          onChangeText={setText}
          value={text}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image
          source={{ uri: imagestate }}
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainter: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
