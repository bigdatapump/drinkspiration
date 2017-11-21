import React, { Component } from 'react';
import './App.css';
import Button from './Button.js';
import RecipeCard from './RecipeCard.js'
import content from './recipes.json';

const buttonNames = ['english','vodka','medium-strength','pink','classic','american','modern-classic','fresh','lime','sour','light','strong','citrus','gin','rum','sweet','fruity','trendy','bubbly','summer','sweet-sour'];

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedTags: []
    };
  }

  modifyTags(tag){
    if (!this.state.selectedTags.includes(tag))
      this.setState({selectedTags: [...this.state.selectedTags, tag]});
    else
      this.setState({selectedTags: this.state.selectedTags.filter((x) => !(x === tag)) });

  }

  processContent(selectedTags){
    let scored = content.map(x => {
      x.score = x.tags.filter(m => selectedTags.includes(m)).length;
      return x;
    });
    return scored.filter( x => x.score !== 0).sort((a, b) => b.score-a.score);
  }

  renderContentItem(contentItem){
    return (<RecipeCard key={contentItem.recipeLink} contentItem={contentItem}/>);
    }
  
  render() {
    return (
      <div className="flex-center">
      <div style={{margin: '18px'}}>
      {buttonNames.map((x) => <Button key={x} tag={x} modify={this.modifyTags.bind(this)}/>)}
      </div>
      {this.processContent(this.state.selectedTags).map(this.renderContentItem)}
      </div>
    );
  }
}

export default App;
