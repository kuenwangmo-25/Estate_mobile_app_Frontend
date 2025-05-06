import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../Shared/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import AuthGlobal from "../Context/store/AuthGlobal"; // make sure the path is correct
import { logoutUser } from "../Context/actions/auth.actions";
import baseURL from "../assets/common/baseUrl";

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);

  const [showResetFields, setShowResetFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const context = useContext(AuthGlobal);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        if (context?.stateUser?.user?.id) {
          axios
            .get(`${baseURL}/me`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));

    return () => setUserProfile(null);
  }, [context?.stateUser?.isAuthenticated]);



  const handleResetClick = () => {
    setShowResetFields(true);
  };

  const handleSubmit = () => {
    console.log("Old:", oldPassword, "New:", newPassword, "Confirm:", confirmPassword);
    setShowResetFields(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/Images/ProfileBackground.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />

        <ScrollView contentContainerStyle={styles.profileCard}>
          <Text style={styles.profileTitle}>
            <View style={styles.line} />
            <Text style={styles.profileTitle}>  Profile </Text>
            <View style={styles.line} />
          </Text>

          <Text style={styles.info}>
            <Text style={styles.label}>Name: </Text>{userProfile?.data?.name}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Email: </Text>{userProfile?.data?.email}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Member Type: </Text>{userProfile?.data?.role}
          </Text>

          {!showResetFields ? (
            <TouchableOpacity onPress={handleResetClick}>
              <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.inputSection}>
              <TextInput
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
                style={styles.input}
              />
              <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  profileCard: {
    width: "100%",
    height: "50%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    bottom: 0,
  },
  profileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E67E00",
    marginBottom: 20,
  },
  line: {
    width: '20%',
    height: 3,
    backgroundColor: '#097969	rgb(9, 121, 105)',
    marginHorizontal: 10,
  },
  info: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  resetText: {
    color: "#E67E00",
    marginTop: 15,
    fontWeight: "bold",
  },
  inputSection: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  submitBtn: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E67E00',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
