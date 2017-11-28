import React, { Component } from 'react';
import './RecipeCard.css';
import recipes from './recipes.json';
import similarDrinks from './similar-drinks.json';

class RecipeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {displayStyle: 'none'};
        this.state.contentItem = this.props.contentItem;
        this.state.displayContent = this.props.contentItem;
   
    }

    toggleRecipe() {
        this.setState({displayContent: this.state.contentItem});
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

    changeContent(ordinal){
        const getSimilarDrinkContent = (recipeLink, ordinal) => {
            const getDrinkContent = link => {
                return(recipes.filter(x=>x.recipeLink === link)[0]);
            };
    
            const filtered = similarDrinks.filter( x => x.recipeLink === recipeLink);
            if (ordinal === 1)
                return(getDrinkContent(filtered[0].similarDrink1));
            else
            return(getDrinkContent(filtered[0].similarDrink2));
        }

        const recipeLink = this.state.contentItem.recipeLink;

        this.setState({displayContent: getSimilarDrinkContent(recipeLink, ordinal)});
    }

    

    render() {
        return (
        <div className='card'>
        <h4 className='card-title' onClick={this.toggleRecipe.bind(this)}>{this.state.displayContent.name}</h4>
        <div className='card-content' style={{display: this.state.displayStyle}}>
        <p>{this.state.displayContent.ingredients}</p>
        <p>{this.state.displayContent.instructions}</p>
        <hr/>
        <h4>Similar drinks</h4>
        <div className="similar">
        <button className="btn similar-button" onClick={() => this.changeContent(1)}>{this.getSimilarDrinks(this.state.contentItem.recipeLink,1)}</button>
        <button className="btn similar-button" onClick={() => this.changeContent(2)}>{this.getSimilarDrinks(this.state.contentItem.recipeLink,2)}</button>
        </div>
        <hr/>
        <h4>Rating</h4>
        <div style={{display: "inline"}}>
        <button className="btn similar-button"><i className="icon icon-thumbs-up"/></button>
        <button className="btn similar-button"><i className="icon icon-thumbs-down"/></button>
        </div>
        </div>
        
        </div>
        );
    }
}

export default RecipeCard;