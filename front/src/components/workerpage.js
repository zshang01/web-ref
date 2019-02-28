import React, { Component } from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import { CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../workerpage.css';

class workerpage extends Component {
	constructor() {
		super();
			this.state = {
				students: [],
				num: -1
			};
			
		};
	componentDidMount(){

		fetch('/workerpage/all')
			.then((res) =>{
				console.log(res);
				//console.log(res);
				return res.json();
			})
			.then((json) => this.setState({students: json}))
			.catch((err) => console.log(err));
	}


	onSwipeRight(student){
		let index = this.state.num + 1;
		this.setState({num: index})
		let curStudent = this.state.students[this.state.num];
		alert('student contact:' + curStudent.email);
	}

	onSwipeLeft(student){
		let index = this.state.num + 1;
		this.setState({num: index})
		
	}
	renderStudnets(){
		return this.state.students.map((student) =>
			<Card key={student.name} 
		        onSwipeRight={this.onSwipeRight.bind(this)}
		        onSwipeLeft={this.onSwipeLeft.bind(this)}>
				<img src={require('../img/profile.png')} className='card-image'/>
				<CardTitle>Name: {student.name}</CardTitle>
		        
		        <CardText> this is the information of {student.name}
		        <ul>
		          <li>Location: {student.location}</li>
		          <li>Skills: {student.skills}</li>
		          <li>Bio: {student.bio}</li>
		        </ul>
		        </CardText>
		        <div>
					
					<Button onClickPass={this.onClickPass}>Flip to See Bio</Button>
		        </div>

	      	</Card>
			)
	}
	render(){
		return (
			<div className='App'>
        		<h1>Students</h1>
        		<CardWrapper>{this.renderStudnets()}</CardWrapper>       
      		</div>
		);
	}
	
}

export default workerpage;