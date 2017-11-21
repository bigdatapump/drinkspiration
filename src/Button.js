import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    constructor(props){
        super(props);
        this.state = {active: false};
    }

    toggleTag(){
        
        this.setState({active: !this.state.active});

        this.props.modify(this.props.tag);

    }


    render(){
        return(<button className={this.state.active?'tag active':'tag'} onClick={this.toggleTag.bind(this)}>{this.props.tag}</button>);
    }
};

export default Button;