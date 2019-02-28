import React, { Component } from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import { CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


import '../studentpage.css';

class studentpage extends Component {
	constructor() {
		super();
			this.state = {
				workers: [],
				num: -1,
				
			};
			this.onClickLike = this.onClickLike.bind(this);
			this.onClickPass = this.onClickPass.bind(this);
		};
	componentDidMount(){

	
		fetch('/studentpage/all')
			.then((res) =>{
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

	onClickLike(e){
		let index = this.state.num + 1;
		this.setState({num: index})
	}

	onClickPass(e){
		let index = this.state.num + 1;
		this.setState({num: index})
		let curWorker = this.state.workers[this.state.num];
		alert('worker contact:' + curWorker.email);
	}

	renderStudnets(){
		return this.state.workers.map((worker) =>
			<Card key={worker.name} 
		        onSwipeRight={this.onSwipeRight.bind(this)}
		        onSwipeLeft={this.onSwipeLeft.bind(this)}>

		        <CardBody>


		        		<img src={require('../img/profile.png')} className='card-image'/>
				        <CardTitle>Name: {worker.name}</CardTitle>
				        
				        <CardText> this is the information of {worker.name}
				        <ul>
				          <li>Location: {worker.location}</li>
				          <li>Company: {worker.company}</li>
				        </ul>
				        </CardText>
				        
		        	
			        
		        </CardBody>
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