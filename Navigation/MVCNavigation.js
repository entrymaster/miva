import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginPage from "../Screens/LoginPage";
import SignUpPage from "../Screens/SignUpPage";
import Dashboard from "../Screens/Dashboard";
import { LogoutButton } from "../Components/LogoutButton";
import Predictor from "../Screens/Predictor";
import Uploader from "../Screens/Uploader";

const Authnavigator = createStackNavigator();
export const Auth = () => {

  return (
    <Authnavigator.Navigator>
      
      <Authnavigator.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Authnavigator.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </Authnavigator.Navigator>
  );
};

const MainStackNavigator = createStackNavigator();
export const StackNav = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="BottomTab"
        component={TabNavigation}
        options={{ headerShown: false, title: "Home" }}
      />
    </MainStackNavigator.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
export const TabNavigation = (props) => {
  return (
    <BottomTab.Navigator
    initialRouteName="Predictor"
      screenOptions={({ route, navigation }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Uploader") {
            iconName = focused ? "account-arrow-up" : "account-arrow-up-outline";
          } else if (route.name === "Predictor") {
            iconName = focused ? "account-search" : "account-search-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={26}
              color={color}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#004e92",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: [
          {
            display: "flex"
          },]
      })}
     
    >
      <BottomTab.Screen
        name="Uploader"
        component={Uploader}
        options={{
          title: "Uploader",
          headerStyle: { backgroundColor: "#004e92" },
          headerTitleStyle: { color: "#fff" },
        }}
      />

      <BottomTab.Screen
        name="Predictor"
        component={Predictor}
        options={{
          title: "Predictor",
          headerStyle: { backgroundColor: "#004e92" },
          headerTitleStyle: { color: "#fff" },
        }}
      />

      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerStyle: { backgroundColor: "#004e92" },
          headerTitleStyle: { color: "#fff" },
          headerRight: () => (<LogoutButton />)
        }}
      />
    </BottomTab.Navigator>
  );
};
