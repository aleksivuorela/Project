import React from 'react'
import Select from 'react-select'
import { Alert, Button } from 'react-bootstrap'
import CalendarComponent from './CalendarComponent.jsx'

export default class CreateScheduleComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = { days: '', date: new Date().toISOString(), feedingType: 'recurring', showError: false }
	}

	render() {
		var options = [
			{ value: '1', label: 'Ma' },
			{ value: '2', label: 'Ti' },
			{ value: '4', label: 'Ke' },
			{ value: '8', label: 'To' },
			{ value: '16', label: 'Pe' },
			{ value: '32', label: 'La' },
			{ value: '64', label: 'Su' },
		];

		let error = null;
		if (this.state.showError) {
			error = <Alert bsStyle="danger">Syötä kellonaika (HH:MM) ja päivämäärä!</Alert>;
		}

		let recurring = null;
		let nonrecurring = null;
		if (this.state.feedingType === 'recurring')
		{
			recurring = <Select value={this.state.days} options={options} onChange={this.handleSelectChange.bind(this)} multi={true} placeholder="Valitse viikonpäivät ruokinnan toistamiselle" />
		}
		else if (this.state.feedingType === 'nonrecurring')
		{
			nonrecurring = <CalendarComponent onUpdate={this.handleDateChange.bind(this)} />
		}

		return (
			<div>
			{console.log(this.state.feedingType)}
			{console.log(this.state.date)}
			{error}
			<form>
					<label style={{marginLeft: "0px", marginRight: "10px"}} className="radio-inline">
						<input type="radio" value="recurring" 
						checked={this.state.feedingType === 'recurring'} 
						onChange={this.handleOptionChange.bind(this)} />
						Toistuva ruokinta
					</label>
					<label style={{marginLeft: "0px", marginRight: "10px"}} className="radio-inline">
						<input type="radio" value="nonrecurring" 
						checked={this.state.feedingType === 'nonrecurring'} 
						onChange={this.handleOptionChange.bind(this)} />
						Kertaluontoinen ruokinta
	  				</label>
			</form><br/>
			<form onSubmit={this.handleCreate.bind(this)} className="form-inline">			
				<div className="input-group col-xs-3">
					<input type="text" ref="timeInput" className="form-control" placeholder="Kellonaika (HH:MM)" />
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-time"></span>
					</span>
				</div>
				<div className="input-group col-xs-6">
					{recurring}
					{nonrecurring}
				</div>
				<button type="submit" className="btn btn-default">Luo</button>
			</form>
			</div>
		);
	}

	handleOptionChange(changeEvent) {
		this.setState({ feedingType: changeEvent.target.value })
	}

	handleSelectChange(days) {
		this.setState({ days: days });
	}

	handleDateChange(date) {
		this.setState({ date: date });
	}

	handleCreate(event) {
		event.preventDefault();
		this.setState({ showError: false });
		const timeInput = this.refs.timeInput;
		const time = timeInput.value;
		var re = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"); // HH:MM

		if (this.state.feedingType === 'recurring')
		{
			const rep = _.map(this.state.days, "value");
			if (re.test(time) && rep.length > 0) {
				var sum = rep.reduce(function(a, b) { return parseInt(a) + parseInt(b); })
				this.props.createSchedule(time, sum);
				this.refs.timeInput.value = '';
				this.state.days = '';
			}
			else {
				this.setState({ showError: true });
			}
		}

		else if (this.state.feedingType === 'nonrecurring') 
		{
			if (re.test(time) && this.state.date) {
				this.props.createSchedule(time, this.state.date);
				this.refs.timeInput.value = '';
				this.state.days = '';
			}
			else {
				this.setState({ showError: true });
			}
		}
	}
}