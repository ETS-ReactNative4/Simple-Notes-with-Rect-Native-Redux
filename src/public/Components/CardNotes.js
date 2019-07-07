import React, { Component } from 'react';
import { Card, CardItem, Body, Text, View } from 'native-base';
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Data from './dummy';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
 
class CardNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert:false,
    };
  }


  // Alert
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };


  _keyExtractor = (item, index) =>index;

  dateFormat = (time)=>{
    monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const date = new Date(Date.parse(time))
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  render() {
    const {showAlert} = this.state;
    return (
            <FlatList
              data={this.props.notes.data}
              keyExtractor= {this._keyExtractor}
              numColumns={2}
              renderItem={({item, index}) => {
                let color = '';
                console.log(item.category);
                if(item.category=== "Personal"){ color = '#2FC2DF' }else if(item.category === "Learn"){ color = '#ff92A9'}else{color = '#C0EB6A'}

                return(
                  <Card style={styles.card}>
                      <CardItem style={styles.cardItem,{ backgroundColor : [color], minHeight:200}}>
                        <TouchableOpacity 
                          delayLongPress={800} 
                          onPress={()=>this.showAlert()} 
                          // onPress={()=>this.props.navigation.navigate('Edit', item)} 
                          // onLongPress ={()=> this.showAlert()}
                        >
                          <Body >
                            <View style={{alignSelf:'flex-end'}}>
                              <Text style={styles.textDate}>
                              {this.dateFormat(item.time)} 
                              </Text>
                            </View>
                            <Text style={styles.textTitle} numberOfLines={1}> {item.title} </Text>
                            <Text style={styles.textCategory} numberOfLines={1}> {item.category}</Text>
                            <Text style={{color:'white'}} numberOfLines={5}> {item.note} </Text>
                          </Body>
                        </TouchableOpacity>
                      </CardItem>
                  </Card>
                  )
                }
              }
            >
          
          </FlatList>
    );
  }
}


const styles = StyleSheet.create({
  card:{
    marginLeft   : 10, 
    marginRight  : 10, 
    marginBottom : 10, 
    borderRadius : 7,
    flexBasis    : 0,
    flexGrow     : 1,
    minHeight    : 200
  },

  cardItem:{
    borderRadius   : 7, 
  },

  itemEmpty: {
    backgroundColor : "transparent"
  },

  textDate:{
    color    : 'white', 
    fontSize : 12
  },

  textTitle:{
    fontSize:23,
    fontWeight:'bold',
    color:'white'
  },

  textCategory:{
    color : 'white',
    fontSize : 10,
    marginBottom : 10
  }
});

const mapStateToProps = state =>{
  return {
    notes : state.notes,
    category : state.category
  }
}

export default connect(mapStateToProps)(CardNotes);