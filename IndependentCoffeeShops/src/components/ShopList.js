import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";


const items = [
  { id: 1, title: 'Eten Driken' },
  { id: 2, title: 'Pret' },
  { id: 3, title: 'StarBux' },
];
const screenWidth = Dimensions.get('window').width;

export default class ShopList extends Component {
  renderItems = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItems}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: 'center',
  },
  item: {
    width: (screenWidth - 48),
    backgroundColor: "white",
    height: 180,
    borderRadius: 16,
    shadowOpacity: 0.2,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
