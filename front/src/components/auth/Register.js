import React, { Component } from "react";




class Register extends Component {

	constructor() {
		super();
			this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			studentOrNot: false,
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
	}
  
  onSubmit(e){
  	e.preventDefault();

  	const newUser = {
  		name: this.state.name,
  		email: this.state.email,
  		password: this.state.password,
  		password2: this.state.password2,
  		studentOrNot: this.state.studentOrNot
  	}

  	

	let body = JSON.stringify(this.state);
    console.log(body);
    

  	fetch('/users/register', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      console.log(response);

      if(response.status === 200){
        window.location.replace('/Login') 

      }else{
        alert("wrong")
        window.location.replace('/Register') 

      }
    });
  }
  onChange(e){
  	this.setState({[e.target.name] : e.target.value });
  }

  onChangeAction(e){
  	this.setState({studentOrNot: !this.state.studentOrNot});
  }
  
  render() {
  	return (
      <div className="register">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign up</h1>
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
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange = {this.onChange}
                  
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange = {this.onChange}
                  
                />
              </div>
			  <div className="form-group">
			  		student?
					<input
					    type="checkbox"
					    value={this.state.studentOrNot}
					    onChange={this.onChangeAction.bind(this)}
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

export default Register;


///YHuangxu: I was not able to register successfully, and always got a "wrong" alert with no further instructions. I saw logic at the backend code, please show those on the screen as well.
