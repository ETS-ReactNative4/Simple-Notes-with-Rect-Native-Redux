import React, { Component } from 'react';
import { Container, Text, View, Content, Footer, Button, Body, Header } from 'native-base';

export default class SideBar extends Component {
	render(){
		return (
			<Container>
				<Header>
					<Text>Header</Text>
				</Header>
				<Content padder>
					<Text>This is a Sidebar</Text>
				</Content>
			</Container>
		)
	}
}