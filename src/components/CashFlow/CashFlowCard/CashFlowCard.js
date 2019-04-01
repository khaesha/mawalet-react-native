import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const CashFlowCard = props => {
  const { date, category, description, amount } = props;
  const priceColor = amount > 0 ? "green" : "red";

  return (
    <Card>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text>{description}</Text>
        </View>
        <Text style={{ ...styles.price }}>
          IDR <Text style={{ color: priceColor }}>{amount}</Text>
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    textAlignVertical: "top"
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333"
  },
  date: {
    fontSize: 12
  }
});

export default CashFlowCard;
