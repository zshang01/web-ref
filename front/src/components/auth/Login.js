import React, { Component } from "react";
class Login extends Component {

  constructor() {
    super();
      this.state = {
      email: "",
      password: "",
      firstTime: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    let body = JSON.stringify(this.state);
    console.log(body);

    fetch('/users/login', {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      if(json.success){

        if(this.state.firstTime){
          if(json.studnetBool){
            window.location.replace('/studentregister') 
          }else{
            window.location.replace('/workerregister') 
          }
        }else{
          if(json.studnetBool){
            window.location.replace('/studentpage') 
          }else{
            window.location.replace('/workerpage') 
          }
        }
      }else{
        alert("wrong")
        window.location.replace('/') 
      }
    });

    
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value });
  }


  onChangeAction(e){
    this.setState({firstTime: !this.state.firstTime});
  }
  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log in</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={this.onSubmit}>
              
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
                  Are you want to be be a member of the database?
                <input
                    type="checkbox"
                    value={this.state.firstTime}
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

export default Login;


//YHuangxu: I was not able to access the login page either by register or by clicking on "login",
// but I was able to access after clone the repo, might need some work to fix this issue?
