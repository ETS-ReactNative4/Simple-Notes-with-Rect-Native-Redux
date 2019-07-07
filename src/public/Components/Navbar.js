import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Thumbnail, Header, Title, Left, Right, Body } from 'native-base';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



class Navbar extends Component {

// modal sort
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  }; 



  render() {
    return (
      <Header style={{backgroundColor:"light"}}>
        <Left style={{flex:1}}>
          <TouchableOpacity onPress={()=>this.props.nav.openDrawer()}>
            <Thumbnail source={require('../profile.jpg')} style={styles.thumbnail}  /> 
          </TouchableOpacity>
        </Left>
        <Body style={{flex:1}}>
          <Title style={styles.title}> {this.props.Title} </Title>
        </Body>
        <Right style={{flex:1}}>
          <Menu
            ref={this.setMenuRef}
            button={
              <TouchableOpacity onPress={this.showMenu}>
                <Image source={require('../sort.png')} style={styles.imageSort} />
              </TouchableOpacity>
            }
          >
            <MenuItem onPress={this.hideMenu}>Ascending</MenuItem>
            <MenuItem onPress={this.hideMenu}>Descending</MenuItem>
          </Menu>
        </Right>
      </Header>
    );
  }
}

export default withNavigation(Navbar);


const styles = StyleSheet.create({
  thumbnail:{
    width : 40, 
    height : 40
  },

  title:{
    color : "black", 
    alignSelf : 'center'
  },

  imageSort:{
    width : 25, 
    height : 25
  }
}) 