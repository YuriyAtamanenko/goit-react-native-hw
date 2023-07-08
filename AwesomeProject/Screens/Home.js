import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity } from "react-native";
// import screens
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

// import icons
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingTop: 10,
          paddingBottom: 35,
          paddingHorizontal: 70,
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <SimpleLineIcons name="grid" size={24} color="#212121" />
          ),
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "R-Medium",
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              title="Log out"
              color="#fff"
            >
              <MaterialIcons
                style={styles.logoutBtn}
                name="logout"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={18} color="#FFF" />
          ),
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "R-Medium",
            fontSize: 17,
          },
          tabBarIconStyle: {
            border: 1,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            maxHeight: 40,
            width: 70,
          },
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color="#212121" />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginRight: 16,
  },
});
