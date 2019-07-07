import React, { Component } from 'react';
import { Container, Header, Content, Body, Button, Icon, Left, Right, Title, Form, View, Item, Textarea, Input, Picker, Text } from 'native-base';
import Navbar from '../Components/NavbarIcon';
import FormEdit from '../Components/FormEdit';
import { withNavigation } from 'react-navigation';


import { connect } from 'react-redux';
import { getCategory } from '../Redux/Action/category';
import { updateNotes } from '../Redux/Action/notes';

import AwesomeAlert from 'react-native-awesome-alerts';


class EditNotes extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      idNote   : this.props.navigation.state.params.idNote,
      title    : this.props.navigation.state.params.title,
      note     : this.props.navigation.state.params.note,
      category : this.props.navigation.state.params.idCategory,
      selected : this.props.navigation.state.params.category == "Personal" ? "1" : this.props.navigation.state.params.category == "Learn" ? "2" : "3",
      showAlert: false,


    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  sendInput(title, note, category){
    const id = this.state.idNote

    if (title !== '' && note !== '' && title !== undefined && note !== undefined){ 
          this.props.dispatch(updateNotes({id}, {title, note, category}));
          this.handleNavigate();
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


  handleNavigate = () => {
      const { navigation } = this.props;
      navigation.navigate('Home')
  }



  render() {
    const {showAlert} = this.state;
    return (
      <Container>
        <Header style={{backgroundColor:"light"}} >
            <Left style={{flex:1}}>
              <Button transparent onPress={this.handleNavigate}>
                <Icon name='arrow-round-back' style={{color:"black"}}/>
              </Button>
            </Left>
            <Body style={{flex:1}}>
              <Title style={{color:"black", alignSelf:'center'}}> Edit Notes </Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress = {()=> {this.sendInput(this.state.title, this.state.note, this.state.selected)}}>
                <Icon name='ios-checkmark-circle-outline' style={{color:"green", fontSize:34, fontWeight:'bold'}}/>
              </Button>
            </Right>
        </Header>
        <Content>
          <Form>
            <View style={{padding:20}}>
              <Input
                style={{color:"gray", fontFamily:"Arial", height:200, fontSize:30, padding:5, marginTop:-60, color:'black'}}
                placeholderTextColor="gray"
                placeholder="ADD TITLE" 
                value={this.state.title}
                onChangeText={(title) => this.setState({ title }) }
              />
            </View>
            <Item>
              <Textarea 
                style={{fontSize:25, color:'black'}} 
                rowSpan={10} 
                placeholder="ADD DESCRIPTION" 
                borderColor='gray' 
                value={this.state.note} 
                onChangeText={(note) => this.setState({ note }) } 
              />
            </Item>
            <Text style={{marginTop:20, paddingLeft:10, fontWeight:'bold'}}>CATEGORY</Text>
            <View style={{width:190, paddingLeft:10, marginTop:10}}>
              <Item picker style={{elevation:1}}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.category}
                onValueChange={(selected) => {
                  this.setState({
                    selected: selected,
                    category: selected
                  });
                }}
                >
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
            message="Titile and Category can not be null !"
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

export default connect(mapStateToProps)(EditNotes);
