import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";

import { UIHeader } from "../../ui/header";

import mawalet from "../../apis/mawalet";
import { monthNames } from "../../utils";

const YEAR = new Date().getFullYear();

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      startDate: `01-01-${YEAR}`,
      endDate: "",
      summaries: []
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData = async () => {
    const response = await mawalet.get("/summary/report", {
      params: {
        start_date: this.state.startDate
      }
    });
    console.log("[Summary][onFetchData] response", response);
    this.setState({ summaries: response.data.data });
  };

  renderHeader() {
    return (
      <UIHeader
        mainTitle="Summary"
        leftComponent={{
          icon: "chevron-left",
          color: "#fff",
          onPress: () => this.props.navigation.goBack()
        }}
      />
    );
  }

  renderData() {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={this.state.summaries}
        renderItem={({ item }) => {
          const balanceColor = item.balance > 0 ? "green" : "red";

          return (
            <Card>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {monthNames[item.month - 1]}
                </Text>
                <Text style={{ fontWeight: "bold", color: balanceColor }}>
                  {item.balance}
                </Text>
              </View>
            </Card>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderData()}
      </View>
    );
  }
}

export { Summary };
