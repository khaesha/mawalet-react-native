import { Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import SideMenu from "../components/SideMenu";
import Login from "../components/Login";
import { CashFlowList, CashFlowAdd } from "../components/CashFlow";
import { Welcome } from "../components/Loading";
import { Summary } from "../components/Summary";

const appStack = createDrawerNavigator(
  {
    Home: { screen: CashFlowList },
    CashFlowCreate: { screen: CashFlowAdd },
    Summary: { screen: Summary }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 120
  }
);

const authStack = createStackNavigator(
  { Login: Login },
  {
    headerMode: "none"
  }
);

const switchScreen = createSwitchNavigator(
  {
    Welcome: Welcome,
    App: appStack,
    Auth: authStack
  },
  { initialRouteName: "Welcome" }
);

const app = createAppContainer(switchScreen);

export default app;
