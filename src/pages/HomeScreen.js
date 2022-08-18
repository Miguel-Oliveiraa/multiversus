import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import api from "../services/axios";

export function HomeScreen({ navigation }) {
  const [users, setUser] = useState();

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      onPress={() => navigation.navigate("Profile", { userData: item })}
    >
      <Image source={require(`../../assets/imgs/3.png`)} />
      {/* <Text>{typeof item.id}</Text> */}
      <View style={{ marginLeft: 18 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.name}</Text>
        <Text style={{ fontWeight: "400", fontSize: 12 }}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {console.log(typeof users)}
      <Text style={{ fontWeight: "700", fontSize: 32, marginBottom: 20 }}>
        Friends
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingLeft: 20,
  },
});