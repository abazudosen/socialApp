import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import Fire from "../Fire";
import UserPermissions from "../utilities/UserPermission";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: false,
  };

  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },
    errorMessage: null,
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  handleSignup = () => {
    Fire.shared.createUser(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Image
          source={require("../assets/authHeader.png")}
          style={{ marginTop: -230, marginLeft: -90 }}
        ></Image>

        <Image
          source={require("../assets/authHeader.png")}
          style={{ position: "absolute", bottom: -265, right: -195 }}
        ></Image>

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={styles.greetings}
          >{`Hello!\nSign up to get started.`}</Text>
          <TouchableOpacity
            style={styles.avatarPlaceholder}
            onPress={this.handlePickAvatar}
          >
            <Image
              source={{ uri: this.state.user.avatar }}
              style={styles.avatar}
            />
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.forms}>
          <View style={{ margin: 32 }}>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) =>
                this.setState({ user: { ...this.state.user, name } })
              }
              value={this.state.user.name}
            ></TextInput>
          </View>

          <View style={{ margin: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              value={this.state.user.email}
            ></TextInput>
          </View>

          <View style={{ margin: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              value={this.state.user.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Sign in now{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    //marginTop: -15,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8a8f9e",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161f3d",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 78,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
  },
});
