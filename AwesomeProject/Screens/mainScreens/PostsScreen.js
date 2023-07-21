import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import screens
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";

const NestedStack = createNativeStackNavigator();

export default function PostsScreen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        options={{ headerShown: false }}
        name="Список публікацій"
        component={DefaultPostsScreen}
      />
      <NestedStack.Screen
        options={{ headerShown: false }}
        name="Коментарі"
        component={CommentsScreen}
      />
      <NestedStack.Screen
        options={{ headerShown: false }}
        name="Карта"
        component={MapScreen}
      />
    </NestedStack.Navigator>
  );
}
