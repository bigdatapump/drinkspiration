import * as firebase from 'firebase';
import React, { Component } from 'react';
import './Rating.css';

class Rating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locked: false,
            active: [false, false],
        };

    }

    handleRateClick(voteType) {
        if (!this.state.locked) {

            const newState = (voteType === 'like')? [true, false]: [false, true]; 
                 
            this.setState({locked: true, active: newState});

            const listRef = firebase.database().ref('ratings');
            const postRef = listRef.push();
            postRef.set({
              user: 'User Name',
              drink: this.props.drinkName,
              vote: voteType
            });
        }
    }


    render() {
        return(
            <div>
                <button className={this.state.active[0]? 'btn rating-button is-clicked': 'btn rating-button'} onClick={() => this.handleRateClick('like')}><i className="icon icon-thumbs-up" /></button>
                <button className={this.state.active[1]? 'btn rating-button is-clicked': 'btn rating-button'} onClick={() => this.handleRateClick('dislike')}><i className="icon icon-thumbs-down" /></button>
            </div>
        );
    }
}

export default Rating;