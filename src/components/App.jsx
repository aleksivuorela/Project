import React from 'react'
import GraphComponent from './GraphComponent.jsx'
import DevicesComponent from './DevicesComponent.jsx'
import CalendarComponent from './CalendarComponent.jsx'
import { Col, Button, Panel } from 'react-bootstrap'
import 'whatwg-fetch'

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { activeDevice: '', startTime: new Date().getTime()-86400000, endTime: new Date().getTime() } // Oletuksena näyttää viim. 24h
		this.onDeviceChange = this.onDeviceChange.bind(this)
		this.onStartTimeChange = this.onStartTimeChange.bind(this)
		this.onEndTimeChange = this.onEndTimeChange.bind(this)
		this.onButtonPress = this.onButtonPress.bind(this)
	}

	onDeviceChange (activeDevice) {
		this.setState({ activeDevice }) 
	}

	onStartTimeChange (time) {
		this.setState({ startTime: time})
	}

	onEndTimeChange (time) {
		this.setState({ endTime: time})
	}

	onButtonPress () {
		// API kutsu Fetchillä
		fetch('/feed/', {
			method: 'POST',
			headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			mac: this.state.activeDevice.value,
		})
		})
		.then(function(res) {
			console.log("Success: ", res);
		})
		.catch(function(err) {
			console.log("Error: ", err);
		});
	}

	render() {
		return (
			<div>
				<Col xs={12} md={3}>
					<DevicesComponent onUpdate={this.onDeviceChange} />
				</Col>
				<Col xs={12} md={9}>
					<br />
					<Button onClick={this.onButtonPress} bsStyle="primary">Pötyä pöytään!</Button>
					<GraphComponent activeDevice={this.state.activeDevice} startTime={this.state.startTime} endTime={this.state.endTime} />
					<Panel header="Näytä ruokailu ajalta">
						<CalendarComponent onUpdate={this.onStartTimeChange} labelText="Mistä:" />
						<CalendarComponent onUpdate={this.onEndTimeChange} labelText="Mihin:" />
					</Panel>
				</Col>
			</div>
		);
	}

}
