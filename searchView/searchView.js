'use strict';

var React = require('react-native');
var weatherView = require('.././weatherView/weatherView');
var {
  	StyleSheet,
  	Text,
  	View,
  	TextInput,
  	AlertIOS,
  	Image,
  	ActivityIndicatorIOS
} = React;

var searchView = React.createClass({
	componentDidMount: function() {
		console.log('Hello from searchView');
	},
	getInitialState: function() {
		return {
			loading: false,
			url: this.props.url
		};
	},
	render: function() {
		return (
			<View style={styles.scene}>
				<View>
					<Image style={styles.picture} 
						source={require('image!logo')}/>
					<TextInput style={styles.inputText}
							   onSubmitEditing={(event) => this.searchCity(event.nativeEvent.text)}
							   returnKeyType={'search'}
							   placeholder={'Search for city'}
							   autoCapitalize={'none'}
                 clearButtonMode="always"
							   autoCorrect={false}/>
				</View>
				<ActivityIndicatorIOS
        			animating={this.state.loading}
        			style={[styles.centering, {height: 80}]}
        			size="large"/>
			</View>
		);
	},
	getWeatherURL: function(city) {
		// Return the weather URL for a given city.
  		return this.state.url + encodeURIComponent(city) + '&units=metric';
  	},
  	capitalizeFirstLetter: function(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	},
	searchCity: function(text) {
  		if(text !== '') {
  			// Get data from server. Inform user that something is happening.
  			this.setState({loading: true});
	  		fetch(this.getWeatherURL(text))
	  			.then((response) => response.json())
	  			.then((responseData) => {
	  				// Because the backend guys were stupid...
	  				if(responseData.cod === '404') {
						throw new Error('Could not find city\nPlease try again');
	  				}
	  				// Finished loading content
	  				this.setState({loading: false});
  				  	this.props.navigator.push({
	  					title: 'Weather data for ' + this.capitalizeFirstLetter(text),
            			component: weatherView,
        				passProps: {
        					data: responseData
        				}
        			});
	  			})
				.catch((err) => {
					this.setState({loading: false});
					this.showAlert('City not found',err.toString());
				});
		}
  	},
  	showAlert: function(title,msg) {
  		console.log('About to show alert');
  		return AlertIOS.alert(
            title,
            msg
        );
  	}
});

var styles = StyleSheet.create({
	scene: {
		flex: 1,
    	alignItems: 'center',
        paddingTop: 74
    },
    centering: {
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
  	picture: {
  		width: 250,
  		height: 200,
  	},
  	inputText: {
  		height: 30,
  		width: 290,
    	borderWidth: 1,
    	borderColor: 'grey',
    	fontSize: 15,
    	padding: 4,
  	}
});

module.exports = searchView;