import React, { Component } from 'react';
import { Container, Header, Content, Body, Button, Icon, Left, Right, Title, Form, View, Input, Item, Textarea, Text, Picker } from 'native-base';
import { StyleSheet, TouchableOpacity,  } from 'react-native';
import FormInput from '../Components/FormInput';

import { connect } from 'react-redux';
import { addNotes } from '../Redux/Action/notes';

import AwesomeAlert from 'react-native-awesome-alerts';

class NotesCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  handleNavigate = () => {
      const { navigation } = this.props;
      navigation.goBack()
  }

  sendInput(title, description, category){
    console.warn(title)
    if (title !== '' && description !== '' && category!=='' && title !== undefined && description !== undefined && category!==undefined ){ 
          this.props.dispatch(addNotes({title, description, category}));
          this.handleNavigate()
    }else{
      this.showAlert(),
      console.warn("fail")
    }
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


  render() {
    const {showAlert} = this.state;
    return (
      <Container>
        <Header style={{backgroundColor:"light"}}>
            <Left style={{flex:1}}>
              <Button transparent onPress={this.handleNavigate}>
                <Icon name='arrow-round-back' style={{color:"black"}}/>
              </Button>
            </Left>
            <Body style={{flex:1}}>
              <Title style={{color:"black", alignSelf:'center'}}> Add Notes </Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress = {()=> {this.sendInput(this.state.title, this.state.description, this.state.selected) }}>
                <Icon name='ios-checkmark-circle-outline' style={{color:"green", fontSize:34, fontWeight:'bold'}}/>
              </Button>
            </Right>
          </Header>
        <Content>

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
              <Textarea 
              style={styles.inputDescription} 
              rowSpan={10} 
              placeholder="ADD DESCRIPTION" 
              borderColor='gray' 
              onChangeText={(description) => this.setState({ description }) }
            />
            </Item>
            <Text style={styles.textCategory}>CATEGORY</Text>
            <View style={styles.viewPicker}>
              <Item picker style={styles.pickerShadow}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={(selected) => {
                  this.setState({
                    selected: selected,
                    idCategory: selected
                  });
                }}
              >
                  <Picker.Item label="Select category" value="" />
                {this.props.category.data.map(item=>(
                  <Picker.Item label={item.category} value={item.id} />
                ))}
                
                </Picker>
              </Item>
            </View>
          </Form>

          <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Error !"
          message="Titile, Description and Category can not be null !"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Error"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />

        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (state) =>{
  return {
    category : state.category,
    notes : state.notes
  }
}

export default connect(mapStateToProps)(NotesCreate);


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