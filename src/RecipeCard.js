import React, { Component } from 'react';
import './RecipeCard.css';

class RecipeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {displayStyle: 'none'};
    }

    toggleRecipe() {
        if (this.state.displayStyle === 'none')
            this.setState({displayStyle: null});
        else
            this.setState({displayStyle: 'none'});;
    }
    
    render() {
        return (
        <div className='card' onClick={this.toggleRecipe.bind(this)}>
        <h4 className='card-title'>{this.props.contentItem.name}</h4>
        <div className='card-content' style={{display: this.state.displayStyle}}>
        <p>{this.props.contentItem.ingredients}</p>
        <p>{this.props.contentItem.instructions}</p>
        </div>
        </div>
        );
    }
}

export default RecipeCard;