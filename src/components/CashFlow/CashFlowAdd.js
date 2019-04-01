import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Picker,
  Switch,
  Text,
  Alert
} from "react-native";

import { UIHeader } from "../../ui/header";
import { UIInput, UITextarea } from "../../ui/input";
import { UIButton } from "../../ui/button";

import mawalet from "../../apis/mawalet";

class CashFlowAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      categories: [],
      form: {
        is_expense: false,
        amount: "",
        category: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    this.onFetchCategories();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onFetchCategories = async () => {
    const response = await mawalet.get("/category");

    this.setState({ categories: response.data.data });
  };

  renderHeader() {
    return (
      <UIHeader
        mainTitle="Create Cash Flow"
        leftComponent={{
          icon: "chevron-left",
          color: "#fff",
          onPress: () => this.props.navigation.goBack()
        }}
      />
    );
  }

  onSubmit = async () => {
    this.setState({ loading: true });
    const response = await mawalet.post("/cash-flow", this.state.form);

    if (response.data.err_no == 0) {
      // navigate back after finish submit
      // this.props.navigation.navigate("Home");
      this.props.navigation.goBack();
    } else {
      Alert.alert("Error", response.data.message);
    }
  };

  pickerHandler = value => {
    const form = { ...this.state.form, category: value };
    this.setState({ form });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          {this.renderHeader()}
          <View style={styles.content}>
            <View style={styles.switchContainer}>
              <Text style={{ marginLeft: 10, textAlignVertical: "center" }}>
                Expense
              </Text>
              <Switch
                onValueChange={value => {
                  const form = { ...this.state.form, is_expense: value };
                  this.setState({ form });
                }}
                value={this.state.form.is_expense}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={this.state.form.category}
                style={{ height: 45 }}
                onValueChange={this.pickerHandler}
                itemStyle={{ width: "100%" }}
              >
                {this.state.categories.map(category => {
                  return (
                    <Picker.Item
                      key={category._id}
                      label={category.category_name}
                      value={category.category_name}
                    />
                  );
                })}
              </Picker>
            </View>
            <UIInput
              placeholder="Amount"
              inputStyle={{ marginLeft: 0 }}
              keyboardType="numeric"
              onChangeText={amount => {
                const form = { ...this.state.form, amount: amount };
                this.setState({ form });
              }}
              value={this.state.form.amount}
            />
            <UITextarea
              placeholder="Description"
              onChangeText={description => {
                const form = { ...this.state.form, description: description };
                this.setState({ form });
              }}
              value={this.state.form.description}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomView}>
          <UIButton
            title="SAVE"
            onPress={this.onSubmit}
            containerStyle={{ marginBottom: 10 }}
            loading={this.state.loading}
            disabled={this.state.loading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: 5
  },
  switchContainer: {
    display: "flex",
    borderWidth: 0.8,
    flexDirection: "row",
    borderColor: "rgba(110, 120, 170, 1)",
    justifyContent: "space-between",
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5
  },
  pickerContainer: {
    borderWidth: 0.8,
    borderColor: "rgba(110, 120, 170, 1)",
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5
  },
  bottomView: {
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  }
});

export { CashFlowAdd };
