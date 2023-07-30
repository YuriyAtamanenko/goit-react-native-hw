import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { db } from "./../../firebase/config";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const userName = useSelector((state) => state.userName);

  const { photo, id } = route.params.item;

  const sendComment = async () => {
    setComment("");

    const commentTime = new Date().toLocaleDateString("uk-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    await addDoc(collection(db, "Posts", `${id}`, "Comments"), {
      comment,
      userName,
      commentTime,
    });
  };

  const getAllComments = async () => {
    const q = query(collection(db, "Posts", `${id}`, "Comments"));
    onSnapshot(q, (querySnapshot) => {
      setAllComments([]);
      querySnapshot.forEach((doc) => {
        setAllComments((prevState) => [...prevState, { ...doc.data() }]);
      });
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />

      <FlatList
        style={styles.allComments}
        data={allComments}
        renderItem={({ item }) => (
          <View
            style={
              userName === item.userName
                ? styles.userComment
                : styles.guestComment
            }
            key={item.commentTime}
          >
            <Text
              style={
                userName === item.userName ? styles.userName : styles.guestName
              }
            >
              {item.userName}
            </Text>
            <Text style={styles.userText}>{item.comment}</Text>
            <Text
              style={
                userName === item.userName ? styles.userDate : styles.guestDate
              }
            >
              {item.commentTime}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput
        style={[styles.input]}
        placeholder="Коментувати..."
        placeholderTextColor={"#BDBDBD"}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.submit,
          { backgroundColor: comment ? "#FF6C00" : "#E8E8E8" },
        ]}
        onPress={photo && sendComment}
      >
        <AntDesign name="arrowup" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    position: "relative",
  },
  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    fontFamily: "R-Medium",
    fontSize: 16,
    color: "#212121",
    padding: 16,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    width: "100%",
    height: 50,
    marginTop: "auto",
  },
  submit: {
    position: "absolute",
    right: 24,
    bottom: 24,
    borderRadius: 50,
    height: 34,
    width: 34,

    alignItems: "center",
    justifyContent: "center",
  },
  allComments: {
    marginBottom: 16,
  },
  userComment: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#F6F6F6",
    width: 300,
    borderRadius: 6,
  },
  guestComment: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#F6F6F6",
    width: 300,
    borderRadius: 6,
    marginLeft: "auto",
  },
  userName: {
    fontFamily: "R-Bold",
    fontSize: 13,
    color: "#212121",
  },
  guestName: {
    fontFamily: "R-Bold",
    fontSize: 13,
    color: "#212121",
    marginLeft: "auto",
  },
  userText: {
    fontFamily: "R-Regular",
    fontSize: 13,
    color: "#212121",
  },
  userDate: {
    fontFamily: "R-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  guestDate: {
    fontFamily: "R-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    marginLeft: "auto",
  },
});
