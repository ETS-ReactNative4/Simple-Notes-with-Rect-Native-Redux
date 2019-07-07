import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {  Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';


handleNavigate = () => {
    const { navigation } = this.props;
    navigation.goBack()
}


class NavbarIcon extends Component {
  render() {
    return (
          <Header style={{backgroundColor:"light"}}>
            <Left style={{flex:1}}>
              <Button transparent onPress={()=>this.props.nav.handleNavigate}>
                <Icon name={this.props.iconLeft} style={styles.leftIcon}/>
              </Button>
            </Left>
            <Body style={{flex:1}}>
              <Title style={{color:"black", alignSelf:'center'}}> {this.props.Title} </Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent>
                <Icon name={this.props.iconRight} style={{color:"black"}}/>
              </Button>
            </Right>
          </Header>
    );
  }
}

export default withNavigation(NavbarIcon);


const styles = StyleSheet.create({

  leftIcon:{
    color:"black"
  }


})