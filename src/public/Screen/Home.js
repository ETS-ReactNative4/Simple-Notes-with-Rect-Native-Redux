import React, { Component } from 'react';
import { Container, Content, View, Card, CardItem, Body, Text, Thumbnail, Header, Title, Left, Right, Item, Icon, Button, Input } from 'native-base';
import { TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Fab from '../Components/FabBottom';
import Search from '../Components/Search';
import Navbar from '../Components/Navbar';

import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



import axios from 'axios';
import { connect } from 'react-redux';
import { getNotes } from '../Redux/Action/notes';
import { pageNotes } from '../Redux/Action/notes'; //page
import { getCategory } from '../Redux/Action/category';
import { deleteNotes } from '../Redux/Action/notes';
import { sortNotes } from '../Redux/Action/notes';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert:false,
      idNote:'',
      sort:'',
      page:1,
      // seed:1,
      refreshing:false,
      isLoading:true,
      search:'',

    };
  }

  handleNavigate = () => {
      const { navigation } = this.props;
      navigation.navigate('Create')
  }

  fetchDataNotes = () =>{ //ambil data dari action
    this.setState({
      page:1,
      refreshing: false,
    })
    this.props.dispatch(getNotes())
  }

  fetchDataCategory = () =>{ //ambil data dari action
    this.props.dispatch(getCategory())
  }
  
  componentDidMount = () => { //=> render tampilan, ambil data, render tampilan dan data
      this.fetchDataNotes();
      this.fetchDataCategory();
  }

  sendInput(id){
      this.props.dispatch(deleteNotes({id}));
  }

  // Alert
  showAlert = (id) => {
    this.setState({
      idNote:id,
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

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

  sortCard(sort, search){
    this.setState({
      search:search
    })
    this.props.dispatch(getNotes(sort, search));
    this._menu.hide();
  };


  handleLoadMore = ()=>{
    if (this.state.page!==this.props.notes.totalPage) {
          let page = this.state.page+1;
          this.setState({
            page: page
          })
          this.props.dispatch(pageNotes(page));
    }
  }

  search = ()=>{
    this.setState({
      search:search
    })
  }


  // FlatList
  ListEmpty = () => {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No Data Found</Text>
      </View>
    );
  };


  _keyExtractor = (item, index) =>index.toString();

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
        <Container>

          <Header style={{backgroundColor:"light"}}>
            <Left style={{flex:1}}>
              <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                <Thumbnail source={require('../profile.jpg')} style={styles.thumbnail}  /> 
              </TouchableOpacity>
            </Left>
            <Body style={{flex:1}}>
              <Title style={styles.title}> Notes App </Title>
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
                <MenuItem onPress={()=> this.sortCard('ASC', this.state.search)}>Ascending</MenuItem>
                <MenuItem onPress={()=> this.sortCard('DESC', this.state.search)}>Descending</MenuItem>
              </Menu>
            </Right>
          </Header>



          <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <View style={{marginTop:0}}>
              <Header searchBar style={{backgroundColor:"light", margin:20, borderRadius:50, height:40}}>
                <Item style={{height:38,borderRadius:50}}>
                  <Icon name="ios-search" />
                  <Input placeholder="Search" onChangeText={_.debounce((search)=> this.sortCard('DESC',search), 500)}/>
                </Item>
              </Header>
            </View>
    



              <FlatList
                    data={this.props.notes.data}
                    numColumns={2}
                    keyExtractor= {this._keyExtractor}
                    
                    refreshing={this.props.notes.isLoading}
                    onRefresh={this.fetchDataNotes}
                    
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.3}                    

                    ListEmptyComponent={this.ListEmpty}

                    renderItem={({item, index}) => {
                      let color = '';
                        {item.idCategory==1 ? color='#2FC2DF': item.idCategory=== 2 ? color = '#ff92A9' : item.idCategory===3 ? color='#C0EB6A' : item.idCategory===3 ? color='#fbdd63' : item.idCategory===4 ? color='#2f78df' : item.idCategory===5 ? color='#8a655f' :item.idCategory===6? color='#2fbd65' : color='#836191'  }

                      return(
                        <Card style={styles.card}>
                            <CardItem style={styles.cardItem,{ backgroundColor : [color], minHeight:200}}>
                              <TouchableOpacity 
                                delayLongPress={1500} 
                                onPress={()=>this.props.navigation.navigate('Edit', item)} 
                                onLongPress ={()=> this.showAlert(item.idNote)}
                                style={{flex:1}}
                              >
                                <Body >
                                  <View style={{alignSelf:'flex-end'}}>
                                    <Text style={styles.textDate}>
                                    {this.dateFormat(item.time)} 
                                    </Text>
                                  </View>
                                  <Text style={styles.textTitle} numberOfLines={1}> {item.title} </Text>
                                  <Text style={styles.textCategory} numberOfLines={1}> {item.idCategory==0 ? "------":item.category}</Text>
                                  <Text style={{color:'white'}} numberOfLines={5}> {item.note} </Text>
                                </Body>
                              </TouchableOpacity>
                            </CardItem>
                        </Card>
                        )
                      }
                    }
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    // ListFooterComponent={this.renderFooter.bind(this)}                      
                  >
                </FlatList>


            </View>

          <View>
              <Fab/>
          </View>


          <AwesomeAlert
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
                this.sendInput(this.state.idNote),
                this.hideAlert()
              }}
            />
        </Container>
    );
  }
}

const mapStateToProps = state =>{
  return {
    category : state.category,
    notes    : state.notes,
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  // Navbar
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
  },


  // CARD
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
  },

  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },


});
