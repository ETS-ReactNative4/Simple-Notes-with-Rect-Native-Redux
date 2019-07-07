import React, { Component } from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation";
import Home from './src/public/Screen/Home';
import Create from './src/public/Screen/NotesCreate';
import Edit from './src/public/Screen/EditNotes';
import CustomDrawerComponent from './src/public/Components/CustomDrawer';

import { Provider } from 'react-redux'; //import to wrap component in redux

import store from './src/public/Redux/store';

const HomeDrawer = createDrawerNavigator({

  Home:{
    screen:Home
  }
},{
   contentComponent: CustomDrawerComponent
})


const AppNavigator = createStackNavigator({
  Try:{
    screen:HomeDrawer
  },
  Home: {
    screen:HomeDrawer
  },
  Create: {
    screen:Create
  },
  Edit: {
    screen:Edit
  },

},{
  headerMode: 'none',
  defaultNavigationOptions: {
    title:'Note'
  }
});

const AppContainer = createAppContainer(AppNavigator);
// export default AppContainer;

export default class App extends Component {
	render(){
		return(
			<Provider store ={ store }>
				<AppContainer/>
			</Provider>
		)
	}
}