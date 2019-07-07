import React, { Component } from 'react';
import { Form, Item, Input, Textarea, View, Picker, Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';


class FormEdit extends Component {

 constructor(props) {
    super(props);
    this.state = {
      selected: this.props.navigation.state.params.category == "Learn" ? "key0" : this.props.navigation.state.params.category == "Personal" ? "key1" : "key2",
      note: this.props.navigation.state.params.note
    }
  }


  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }


  render() {
  const note=this.props.navigation.state.params.note;
    return (
          <Form>
            <View style={{padding:20}}>
              <Input
                style={{color:"gray", fontFamily:"Arial", height:200, fontSize:30, padding:5, marginTop:-60, color:'black'}}
                placeholderTextColor="gray"
                placeholder="ADD TITLE"
                
              >{this.props.navigation.state.params.title}</Input>
            </View>
            <Item>
              <Textarea rowSpan={10} placeholder="ADD DESCRIPTION" borderColor='gray' style={{fontSize:25, color:'black'}} value={this.state.note} onChangeText={(note)=>this.setState({note})} />
            </Item>
            <Text style={{marginTop:20, paddingLeft:10, fontWeight:'bold'}}>CATEGORY</Text>
            <View style={{width:150, paddingLeft:10, marginTop:10}}>
              <Item picker style={{elevation:1}}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                  <Picker.Item label="Learn" value="key0" />
                  <Picker.Item label="Personal" value="key1"/>
                  <Picker.Item label="Work" value="key2" />
                </Picker>
              </Item>
            </View>
          </Form>
    );
  }
}


export default withNavigation(FormEdit);
