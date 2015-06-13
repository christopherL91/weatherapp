'use strict';

// API data
var WEATHER_APP_DATA = [
	{
  		name: 'openweathermap',
  		url: 'http://api.openweathermap.org/data/2.5/weather?q='
  	}
];

var React = require('react-native');
var searchView = require('./searchView/searchView');
var {
  	AppRegistry,
  	StyleSheet,
  	AlertIOS,
  	NavigatorIOS
} = React;

// Main component
var weatherApp = React.createClass({
  	render: function() {
		return (
				<NavigatorIOS 
					style={styles.container}
					initialRoute={{
		            	component: searchView,
		                title: 'Weather',
		                leftButtonTitle: 'About',
              			onLeftButtonPress: () => {
              				return AlertIOS.alert(
            					'About',
            					'Made by Chrisopher Lillthors'
        					);
              			},
		                passProps: {
		                	url: WEATHER_APP_DATA[0].url
		                }
		            }}/>
		);
  	},
  	componentDidMount: function() {
  		console.log('App started');
  	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1
	  }
});

AppRegistry.registerComponent('weatherApp', () => weatherApp);
