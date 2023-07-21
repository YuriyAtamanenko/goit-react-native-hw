import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
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
                onPress={() => navigation.navigate("Коментарі")}
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
  photoView: {
    marginTop: 32,
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
