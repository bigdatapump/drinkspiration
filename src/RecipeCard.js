import React, { Component } from 'react';
import './RecipeCard.css';
import recipes from './recipes.json';
import similarDrinks from './similar-drinks.json';

class RecipeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {displayStyle: 'none'};
        this.state.contentItem = this.props.contentItem;
    }

    toggleRecipe() {
        if (this.state.displayStyle === 'none')
            this.setState({displayStyle: null});
        else
            this.setState({displayStyle: 'none'});;
    }

    getSimilarDrinks(recipeLink, ordinal) {
        const getDrinkName = link => {
            return(recipes.filter(x=>x.recipeLink === link)[0].name);
        };

        const filtered = similarDrinks.filter( x => x.recipeLink === recipeLink);
        if (ordinal === 1)
            return(getDrinkName(filtered[0].similarDrink1));
        else
        return(getDrinkName(filtered[0].similarDrink2));
    }

    render() {
        return (
        <div className='card'>
        <h4 className='card-title' onClick={this.toggleRecipe.bind(this)}>{this.state.contentItem.name}</h4>
        <div className='card-content' style={{display: this.state.displayStyle}}>
        <p>{this.state.contentItem.ingredients}</p>
        <p>{this.state.contentItem.instructions}</p>
        <hr/>
        <h4>Similar drinks</h4>
        <div className="similar">
        <button className="btn similar-button">{this.getSimilarDrinks(this.state.contentItem.recipeLink,1)}</button>
        <button className="btn similar-button">{this.getSimilarDrinks(this.state.contentItem.recipeLink,2)}</button>
        </div>
        <hr/>
        <h4>Rating</h4>
        <div style={{display: "inline"}}>
        <button className="btn"><i className="icon icon-thumbs-up"/></button>
        <button className="btn"><i className="icon icon-thumbs-down"/></button>
        </div>
        </div>
        
        </div>
        );
    }
}

export default RecipeCard;