import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Web-Referral</h1>
                <p className="lead">
                  {' '}
                  Help Student or Ask Referral</p>
                  <hr />
                <Link to="/Register" className='btn btn-lg btn-info mr-2'>Sign up</Link>
                <Link to="/Login" className='btn btn-lg btn-info mr-2'>Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
