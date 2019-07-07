import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, View, Picker, Icon,TouchableOpacity, Text, Button, Drawer } from 'native-base';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { getCategory } from '../Redux/Action/category';

class FormInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      // category:[]
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  sendInput(title, description, category){

    console.warn(title+" "+description+" "+category);

    // if (category !== '' && icon !== '' ){ 
    //       this.props.dispatch(addCategory({category, icon}));
    //   console.warn("sendInput (DialogInput#1): "+category+" "+icon);
    // }else{
    //   console.warn("fail")
    // }
  }

  render() {
    return (
          <Form>
            <View style={{padding:20}}>
              <Input
                style={styles.inputTitle}
                placeholderTextColor="gray"
                placeholder="ADD TITLE"
                onChangeText={(title) => this.setState({ title }) }
              ></Input>
            </View>
            <Item>
              <Textarea rowSpan={10} placeholder="ADD DESCRIPTION" borderColor='gray' style={styles.inputDescription} onChangeText={(description) => this.setState({ description }) }/>
            </Item>
            <Text style={styles.textCategory}>CATEGORY</Text>
            <View style={styles.viewPicker}>
              <Item picker style={styles.pickerShadow}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Select Category" value="" />
                {this.props.category.data.map(item=>(
                  <Picker.Item label={item.category} value={item.id} />

                ))}
                
                </Picker>
              </Item>
            </View>
          </Form>
    );
  }
}


const styles = StyleSheet.create({

  inputTitle:{
    color : "black",
    fontFamily : "Arial",
    height : 200,
    fontSize : 30,
    padding : 5,
    marginTop : -60
  },

  inputDescription:{
    fontSize : 25,
    color : 'black'
  },

  textCategory:{
    marginTop : 20,
    paddingLeft : 10,
    fontWeight : 'bold'
  },

  viewPicker:{
    width : 180,
    paddingLeft : 10,
    marginTop : 10
  },

  pickerShadow: {
    elevation:1
  },
  
})

const mapStateToProps = (state) =>{
  return {
    category : state.category
  }
}

export default connect(mapStateToProps)(FormInput);