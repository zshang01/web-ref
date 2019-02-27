import React, { Component } from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
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

		/*
	{
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())

		*/
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
		        <h1>{student.name}</h1>
		        
		        
		        <ul>
		          <li> {student.location}</li>
		          <li>Skills: {student.skills}</li>
		          
		        </ul>
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