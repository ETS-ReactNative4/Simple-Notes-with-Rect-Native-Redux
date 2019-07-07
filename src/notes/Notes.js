import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Hello extends Component {
  render() {
    return (
      <View >
        <Text style={styles.halo} > Hello, world!</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
	halo :{
		color:"red"
	}

})