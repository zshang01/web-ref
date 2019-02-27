import React, { Component } from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import '../studentpage.css';

class studentpage extends Component {
	constructor() {
		super();
			this.state = {
				workers: [],
				num: -1
			};
			
		};

		
		
	componentDidMount(){

	
		fetch('/studentpage/all')
			.then((res) =>{
				//console.log(res);
				//console.log(res);
				return res.json();
			})
			.then((json) => this.setState({workers: json}))
			.catch((err) => console.log(err));
	}


	onSwipeRight(worker){
		let index = this.state.num + 1;
		this.setState({num: index})
		let curWorker = this.state.workers[this.state.num];
		alert('worker contact:' + curWorker.email);
	}

	onSwipeLeft(worker){
		let index = this.state.num + 1;
		this.setState({num: index})
		
	}

	
	renderStudnets(){
		return this.state.workers.map((worker) =>
			<Card key={worker.name} 
		        onSwipeRight={this.onSwipeRight.bind(this)}
		        onSwipeLeft={this.onSwipeLeft.bind(this)}>
		        <h1>{worker.name}</h1>
		        
		        
		        <ul>
		          <li> {worker.name}</li>
		          <li>Company: {worker.company}</li>
		          
		        </ul>
	      	</Card>
			)
	}

	render(){
		return (
			<div className='App'>
        		<h1>Workers</h1>
        		<CardWrapper>{this.renderStudnets()}</CardWrapper>       
      		</div>


		);
	}
	


}

export default studentpage;