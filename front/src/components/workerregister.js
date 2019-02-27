import React, { Component } from "react";
import axios from 'axios';
class workerregister extends Component {
	constructor() {
		super();
			this.state = {
			name: "",
			email: "",
			location: "",
			company: "",
			refer: []
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
		
onSubmit(e){
  	e.preventDefault();

  	const newWorker = {
  		name: this.state.name,
  		email: this.state.email,
  		location: this.state.location,
  		company: this.state.company
  	}

	let body = JSON.stringify(this.state);
    console.log(body);
    

  	fetch('/workerpage/register', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      console.log(response);
      if(response.status === 200){
        window.location.replace('/workerpage')
      }else{
        alert("wrong")
        window.location.replace('/')
      }
    });
  }
  onChange(e){
  	this.setState({[e.target.name] : e.target.value });
  }
  
  render() {
  	return (
      <div className="register">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Register Worker Profile</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange = {this.onChange}
                  
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="email address"
                  name="email"
                  value={this.state.email}
                  onChange = {this.onChange}
                  
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange = {this.onChange}
                  
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="company"
                  name="company"
                  value={this.state.company}
                  onChange = {this.onChange}
                  
                />
              </div>

              
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }


}

export default workerregister;