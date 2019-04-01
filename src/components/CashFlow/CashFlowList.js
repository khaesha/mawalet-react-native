import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";

import { UIHeader } from "../../ui/header";
import CashFlowCard from "./CashFlowCard";
import { Loader } from "../Loading";

import mawalet from "../../apis/mawalet";
import { getDateAndTime } from "../../utils";

class CashFlowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      balance: 0,
      cashflows: []
    };
  }

  componentDidMount() {
    this.onFetchData();

    this.reRender = this.props.navigation.addListener("willFocus", () => {
      console.log("hit there");
      this.onFetchData();
    });
  }

  componentWillUnmount() {
    this.reRender;
  }

  onFetchData = async () => {
    const response = await mawalet.get("/cash-flow");

    this.setState({ cashflows: response.data.data, loading: false });
  };

  onGetBalance = async () => {
    const response = await mawalet.get("/summary/getBalance");

    this.setState({ balance: response.data.balance });
  };

  renderHeader() {
    return (
      <UIHeader
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => this.props.navigation.toggleDrawer()
        }}
        mainTitle="Cash Flow"
        rightComponent={{
          icon: "add",
          color: "#fff",
          onPress: () => this.props.navigation.navigate("CashFlowCreate")
        }}
      />
    );
  }

  renderList() {
    if (this.state.loading) {
      return <Loader size="large" />;
    } else {
      if (this.state.cashflows.length > 0) {
        return (
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.cashflows}
            renderItem={({ item }) => (
              <CashFlowCard
                date={getDateAndTime(item.date)}
                category={item.category}
                description={item.description}
                amount={item.amount}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text h4 style={{ color: "#333333" }}>
              No data available.
            </Text>
          </View>
        );
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderList()}
      </View>
    );
  }
}

export { CashFlowList };
