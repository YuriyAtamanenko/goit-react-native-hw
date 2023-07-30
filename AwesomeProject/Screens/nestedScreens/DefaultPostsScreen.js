import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { db } from "./../../firebase/config";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const userName = useSelector((state) => state.userName);
  const email = useSelector((state) => state.email);
  const avatar = useSelector((state) => state.avatar);

  getAllPosts = async () => {
    const q = query(collection(db, "Posts"));

    onSnapshot(q, (querySnapshot) => {
      setPosts([]);
      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: avatar }} style={styles.profilePhoto} />
        <View style={styles.profileDesription}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.photoView} key={item.photo}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.description}>
              {item.inputValues.description}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.commentsBtn}
                onPress={() => navigation.navigate("Коментарі", { item })}
              >
                <Feather name="message-circle" size={18} color="#BDBDBD" />
                <Text style={styles.comments}> 0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationBtn}
                onPress={() => navigation.navigate("Карта", { item })}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.location}>
                  {" "}
                  {item.inputValues.location}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  profile: {
    marginVertical: 32,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  profilePhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#cacaca",
    borderRadius: 16,
  },
  profileName: {
    fontFamily: "R-Bold",
    fontSize: 13,
    color: "#212121",
  },

  profileEmail: {
    fontFamily: "R-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  photoView: {
    marginBottom: 32,
  },

  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  description: {
    marginVertical: 8,
    fontFamily: "R-Medium",
    fontSize: 16,
    color: "#212121",
  },
  commentsBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 40,
  },
  comments: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
