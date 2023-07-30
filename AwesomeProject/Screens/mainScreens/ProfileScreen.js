import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { db, storage } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import BGIMG from "../../assets/images/BG.jpg";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LogOutDB, addAvatar } from "../../redux/auth/authOperation";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const avatar = useSelector((state) => state.avatar);

  const getUserPosts = async () => {
    const q = query(
      collection(db, "Posts"),
      where("userName", "==", `${userName}`)
    );
    onSnapshot(q, (querySnapshot) => {
      setPosts([]);
      querySnapshot.forEach((doc) => {
        setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
      });
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const handleLogOut = () => {
    dispatch(LogOutDB());
  };

  const handleAddAvatar = async () => {
    const uploadedAvatar = await ImagePicker.launchImageLibraryAsync();

    const userAvatar = await uploadAvatarToStorage(
      uploadedAvatar.assets[0].uri
    );

    dispatch(addAvatar({ avatar: userAvatar }));
  };

  const uploadAvatarToStorage = async (uploadedAvatar) => {
    if (!uploadedAvatar) return null;

    const response = await fetch(uploadedAvatar);
    const file = await response.blob();

    const avatarId = Date.now().toString();

    const storageRef = ref(storage, `usersAvatar/${avatarId}`);
    await uploadBytes(storageRef, file);

    const precessedPhoto = await getDownloadURL(
      ref(storage, `usersAvatar/${avatarId}`)
    );

    return precessedPhoto;
  };

  console.log(avatar);

  return (
    <ImageBackground source={BGIMG} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.photoBox}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addPhotoBtn}
            onPress={handleAddAvatar}
          >
            <Text style={styles.addPhotoText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={handleLogOut}
            color="#fff"
          >
            <MaterialIcons name="logout" size={28} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{userName}</Text>
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
                  <Text style={styles.comments}> {item.commentsNumber}</Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    paddingTop: 150,
  },
  container: {
    flex: 1,

    backgroundColor: "#fff",

    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  photoBox: {
    position: "relative",

    display: "flex",
    alignSelf: "center",
    width: 120,
    maxHeight: 120,
    marginTop: -60,
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addPhotoBtn: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    maxHeight: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 12.5,
    backgroundColor: "#FFF",
    bottom: 14,
    right: -12.5,
  },
  logOutBtn: {
    position: "absolute",
    bottom: 12,
    right: -120,
  },
  addPhotoText: {
    color: "#FF6C00",
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "R-Medium",
    fontSize: 30,
    color: "#212121",
  },
  photoView: {
    marginBottom: 32,
    width: "100%",
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
