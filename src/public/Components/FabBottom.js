import React, { Component } from 'react';
import { Icon, Fab} from 'native-base';
import { withNavigation } from 'react-navigation';
import { StyleSheet } from 'react-native';

class FabBottom extends Component {
 
 handleNavigate = () => {
      const { navigation } = this.props;
      navigation.navigate('Create')
  }

  render(){
    return (  
      <Fab
        onPress={this.handleNavigate} 
        style={{ backgroundColor: '#eeeeee' }}
        position="bottomRight"
        bordered
        >
        <Icon name="add" style={styles.icon}/>
      </Fab>
    );
  }
}

export default withNavigation(FabBottom);

const styles = StyleSheet.create({

  icon:{
    color : 'black',
    fontWeight : 'bold'
  }

})