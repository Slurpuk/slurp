import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";


const items = [
  { id: 1, title: 'Cappuccino' },
  { id: 2, title: 'Americano' },
  { id: 3, title: 'Latte' },
  { id: 4, title: 'Mocha' },
  { id: 5, title: 'sean' },
  { id: 6, title: 'seanfield' },
  { id: 6, title: 'seanfield' },
  { id: 6, title: 'seanfield' },
  { id: 6, title: 'seanfield' },
  { id: 6, title: 'seanfield' },
];
const screenWidth = Dimensions.get('window').width;

export default class MenuList extends Component {
  renderItems = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  render() {
    return (
      <View>
        <Text style={styles.coffeeTitle}>Coffee</Text>
        <View style={styles.container}>
          <FlatList
          data={items}
          renderItem={this.renderItems}
          keyExtractor={item => item.id}
          numColumns={2}
          />
        </View>
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

  coffeeTitle:{
    fontSize: 20,
  },
  item: {
    width: (screenWidth - 48) / 2,
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
