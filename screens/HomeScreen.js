import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const posts = [
  {
    id: 1,
    name: "Janet Doe",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elitLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar1.jpg"),
  },
  {
    id: 2,
    name: "Finishia Ricke",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar7.jpeg"),
  },
  {
    id: 3,
    name: "Maria Andrea",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar2.jpg"),
  },
  {
    id: 4,
    name: "Kayker Shwein",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar3.jpg"),
  },
  {
    id: 5,
    name: "Waki Tim",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar4.jpeg"),
  },
  {
    id: 6,
    name: "Joan Den",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar5.jpeg"),
  },
  {
    id: 7,
    name: "Mari Ano",
    text:
      "Lorem ipsum dolor sit amet, consectetuer elit Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    timestamp: 1580866819516,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempAvatar6.jpeg"),
  },
];

export default class HomeScreen extends React.Component {
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efecf4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ebecf4",
    shadowColor: "#454d65",
    shadowRadius: 15,
    shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454d65",
  },
  timestamp: {
    fontSize: 15,
    color: "#c4c6ce",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
