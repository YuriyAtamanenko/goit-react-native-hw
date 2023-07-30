import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
// import screens
import PostsScreen from "./mainScreens/PostsScreen";
import CreatePostsScreen from "./mainScreens/CreatePostsScreen";
import ProfileScreen from "./mainScreens/ProfileScreen";

import { LogOutDB } from "./../redux/auth/authOperation";

// import icons
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export default function Home() {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(LogOutDB());
  };

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
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          tabBarInactiveTintColor: "#212121",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "R-Medium",
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogOut}
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
            <Entypo name="plus" size={20} color={color} />
          ),
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#212121",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "R-Medium",
            fontSize: 17,
          },
          tabBarIconStyle: {
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
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          tabBarInactiveTintColor: "#212121",
          headerShown: false,
        }}
        name="Профіль"
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
