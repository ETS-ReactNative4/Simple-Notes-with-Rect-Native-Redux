import React, { Component } from 'react';
import { StyleSheet,  ScrollView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Button, Text, View, Form, Item, Input, Right, Icon } from 'native-base';
import { DrawerItems } from 'react-navigation';
import DialogInput from 'react-native-dialog-input';



import axios from 'axios';
import { connect } from 'react-redux';
import { addCategory } from '../Redux/Action/category';
import { deleteCategory } from '../Redux/Action/category';
import { showNotesByCategory } from '../Redux/Action/notes'; //page

import AwesomeAlert from 'react-native-awesome-alerts';



class CustomDrawer extends Component{

	constructor(props){
    super(props);
    this.state = {
	    modalVisible: false,
      	showAlert:false,
      	idCategory:''

	  }
  }
  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  sendInput(category, icon){

  	if (category !== '' && icon !== '' ){	
  		this.props.dispatch(addCategory({category, icon}));
  	}else{
  		console.warn("fail")
  	}
  }

  deleteCategory(id){
      this.props.dispatch(deleteCategory(id));
  }


  // Alert
  showAlert = (id) => {
    this.setState({
      idCategory:id,
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };


  showNotes(idCategory){
  	// console.warn(idCategory)
  	this.props.dispatch(showNotesByCategory(idCategory));
  	this.props.navigation.closeDrawer()
  }



  _keyExtractor = (item, index) =>index.toString();

	render(){ 
    const {showAlert} = this.state;

		return(
				<ScrollView style={{backgroundColor:'#ffffff'}}>

						<View style={{backgroundColor:'#eeeeee'}}>
							<Image source={require('../profile.jpg')} style={styles.profile}/>
							<Text style={styles.name}>
								Shallom Razade
							</Text>
						</View>
						<View style={styles.category}>

							<FlatList
				              // data={createRows(this.state.notes, 10)}
				              data={this.props.category.data}
				              keyExtractor= {this._keyExtractor}
				              renderItem={({item, index}) => {
					                return(
					                  	<TouchableOpacity onPress={()=> this.showNotes(item.id)} onLongPress ={()=> this.showAlert(item.id)}>
											<View style={{flexDirection:'row', marginTop:30}}>
												<Icon name={item.icon} style={styles.icon}/>
												<Text style={styles.personal}>
													 {item.category}
												</Text>
											</View>
										</TouchableOpacity>
					                  )
					                }
					              }
					            >
				            </FlatList>
							<TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
								<View style={{flexDirection:'row', marginTop:40}}>
									<Icon name='add' style={styles.icon}/>
									<Text style={styles.personal}>
										Add Category
									</Text>
								</View>
							</TouchableOpacity>
						</View>

					<AwesomeAlert
					  style={{flex:1, backgroundColor:'black'}}
		              show={showAlert}
		              showProgress={false}
		              title="Warning !"
		              message="Are you sure delete this note?"
		              closeOnTouchOutside={false}
		              closeOnHardwareBackPress={false}
		              showCancelButton={true}
		              showConfirmButton={true}
		              cancelText="No, cancel"
		              confirmText="Yes, delete it"
		              confirmButtonColor="#DD6B55"
		              onCancelPressed={() => {
		                this.hideAlert();
		              }}
		              onConfirmPressed={() => {
		                this.deleteCategory(this.state.idCategory),
		                this.hideAlert()
		                // console.warn(this.state.idCategory)
		              }}
		            />





					<Modal
				        animationType="fade"
				        transparent
				        visible={this.state.modalVisible}
				        onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}
		            >
				      	<View style={{backgroundColor:'rgba(0,0,0,.5)', flex:1, alignItems:'center', justifyContent:'center'}}>
				          <View style={{ width:'80%', height:150, backgroundColor: 'rgba(100,100,100, 0.5)'}}>
				            <View style={{ padding:20, backgroundColor:'white'}}>
				              <Form>
						            <Item>
						              <Input placeholder="Add Category" onChangeText={(category) => this.setState({ category }) }/>
						            </Item>
						            <Item last>
						              <Input placeholder="Name of Icon" onChangeText={(icon) => this.setState({ icon }) }/>
						            </Item>
							          <View style={{flexDirection:'row'}}>
								          <Right>
								          	<View style={{flexDirection:'row'}}>
								              <Button transparent onPress = {()=> {this.sendInput(this.state.category, this.state.icon), this.setModalVisible(!this.state.modalVisible)} }>
										            <Text style={{fontSize:20}}>Add</Text>
										          </Button>
								              <Button onPress={() => { this.setModalVisible(!this.state.modalVisible);}} transparent>
										            <Text style={{fontSize:20, color:'gray'}}>Cancel</Text>
								              </Button>
								          	</View>
								          </Right>
							          </View>
						          </Form>
				            </View>
				          </View>
				      	</View>
			        </Modal>
				</ScrollView>
		)
	}
}


const mapStateToProps = state =>{
  return {
    category : state.category
  }
}

export default connect(mapStateToProps)(CustomDrawer);



const styles = StyleSheet.create({
  profile:{
  	alignSelf : 'center',
  	borderRadius: 100,
    height:100,
    width:100,
    marginTop:47,
    marginBottom:20
  },
  name: {
    flex         : 1,
    textAlign : 'center',
    color:'black',
    fontSize: 22,
    fontWeight:'bold', 
    paddingBottom:30

  },

  category: {
  	marginTop:13,
  	paddingLeft:30
  },

  personal:{
  	color:'black',
    fontSize: 22,
    fontFamily: 'Open sans',
    fontWeight: '600'
  },
  icon:{
  	// width:20,
  	// height:20,
  	marginTop:5,
  	marginRight:15,
  	fontSize:23
  }

  // icon:{
  //   color : 'black',
  //   fontWeight : 'bold'
  // }


});