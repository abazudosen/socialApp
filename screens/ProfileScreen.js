import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import Fire from "../Fire";

export default function ProfileScreen({ uid, isFocused }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  async function getUser() {
    let unsubscribe = null;
    const userId = uid || Fire.shared.uid;

    unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });
    //console.tron.log(user);
  }

  LayoutAnimation.easeInEaseOut();

  function handleLogout() {
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 64, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../assets/tempAvatar.jpg")
            }
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>38</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>201</Text>
          <Text style={styles.statTitle}>Follows</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>12</Text>
          <Text style={styles.statTitle}>Following</Text>
        </View>
      </View>
      <Button
        onPress={() => {
          Fire.shared.signOut();
        }}
        title="Log out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 15,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566d",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#c3c5cd",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
