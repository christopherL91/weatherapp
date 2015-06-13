'use strict';

var React = require('react-native');
var {
  	StyleSheet,
  	Text,
  	View,
  	ListView
} = React;

var weatherView = React.createClass({
	componentDidMount: function() {
		console.log('Hello from weatherView');
	},
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2,
      		}),
			data: this.props.data
		};
	},
	render: function() {
		return (
			<View style={styles.scene}>
				<Text>
					Temp: {this.state.data.main.temp} C
				</Text>
			</View>
		);
	},
	getDataSource: function(movies) {
    	return this.state.dataSource.cloneWithRows(movies);
  },
});

var styles = StyleSheet.create({
	scene: {
		flex: 1,
        padding: 10,
        paddingTop: 74
    }
});

module.exports = weatherView;