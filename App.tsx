import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import CreateFood from "./src/screens/CreateFood";
import EditFood from "./src/screens/EditFood";
import FoodDetails from "./src/screens/FoodDetails";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  FoodDetails: { id: string };
  CreateFood: undefined;
  EditFood: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";
          if (route.name === "Home") iconName = "home";
          if (route.name === "CreateFood") iconName = "add-circle";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CreateFood" component={CreateFood} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentication */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Create an Account" }}
        />

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        {/* Details/Edit Screens */}
        <Stack.Screen
          name="FoodDetails"
          component={FoodDetails}
          options={{ title: "Food Details" }}
        />
        <Stack.Screen name="EditFood" component={EditFood} options={{ title: "Edit Food" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
