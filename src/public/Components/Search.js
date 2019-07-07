import React, { Component } from 'react';
import { Header, Item, Input, Icon, Button, Text, View } from 'native-base';
export default class Search extends Component {
  render() {
    return (
        <View style={{marginTop:0}}>
            <Header searchBar style={{backgroundColor:"light", margin:20, borderRadius:50, height:40}}>
              <Item style={{height:38,borderRadius:50}}>
                <Icon name="ios-search" />
                <Input placeholder="Search"/>
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
          </View>
    );
  }
}




