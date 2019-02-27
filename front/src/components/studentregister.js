import React, { Component } from "react";

class studentregister extends Component {
	constructor() {
		super();
			this.state = {
			name: "",
			email: "",
			location: "",
			bio: "",
      skills: "",
			asked: [],
      applied: []
		};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}
		
onSubmit(e){
  	e.preventDefault();

  	const newStudent = {
  		name: this.state.name,
  		email: this.state.email,
  		location: this.state.location,
      bio: this.state.bio,
      skills: this.state.skills,
      asked: this.state.asked,
      applied: this.state.applied
  	}

	let body = JSON.stringify(this.state);
    console.log(body);
    

  	fetch('/studentpage/register', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      console.log(response);
      if(response.status === 200){
        window.location.replace('/studentpage')
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
            <h1 className="display-4 text-center">Register Student Profile</h1>
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
                  placeholder="skills"
                  name="skills"
                  value={this.state.skills}
                  onChange = {this.onChange}
                  
                />
              </div>


              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="bio"
                  name="bio"
                  value={this.state.bio}
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

export default studentregister;