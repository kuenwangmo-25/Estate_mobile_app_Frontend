import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ navigation, onSearchPress }) => {
  return (
    <View style={styles.headerContainer}>
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
        <Icon name="arrow-back" size={20} color="#097969	rgb(9, 121, 105)" />
      </TouchableOpacity>

      <View style={{ flex: 1 }} /> 

      <TouchableOpacity onPress={onSearchPress} style={styles.circleButton}>
        <Icon name="search" size={20} color="#097969	rgb(9, 121, 105)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: "#097969	rgb(9, 121, 105)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Header;
