import React from 'react'
import 'whatwg-fetch'

export default class LoginForm extends React.Component {

	onLogin()
	{
		var form = document.querySelector('form');
		// API kutsu Fetchillä
		fetch('/login', {
			credentials: 'same-origin',
			method: 'POST',
			body: new FormData(form)
		})
		//.then(checkStatus)
		.then(function(res) {
			console.log("Successia puskee: ", res);
		})
		.catch(function(err) {
			console.log("Erroria puskee: ", err);
		});
	}

	render()
	{
		return(
				<div className="login">
					<form action="/login" method="post">
							<div className="field-wrap">
								<input name="email" type="email" required placeholder="Sähköposti" autoComplete="off"/>
							</div>
							<div className="field-wrap">
								<input name="password" type="password" required placeholder="Salasana" autoComplete="off"/>
							</div>
							{/*<p className="forgot"><a href="#">Forgot Password?</a></p>*/}
							<button onClick={() => this.onLogin()} className="button button-lg button-block">Kirjaudu</button>
					</form>
				</div>
			);
	}
}