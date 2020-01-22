import React, {Component} from 'react';
import './CardItem.scss';
import {ThemeContext} from "../../../Settings/config";

class CardItem extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      id: props.id,
      shouldDisplay: props.shouldDisplay,
      imageUrl: props.imageUrl,
      active: props.active,
    }*/
  }


  /*componentWillUpdate(prevProps, prevState) {
    console.log('[CardItem.JS] this.state.active = ',prevProps.active, ' active = ', this.props.active);
  }*/


  render() {
    const theme = this.context;
    let style = {
      backgroundImage: theme.cardBackground
    };
    let classes = ["card-item"];

    if(!this.props.shouldDisplay) {
      classes.push('hide');
    }
    // if(this.props.id === 2) console.log('item = ', this.props);

    if(this.props.active) {
      classes.push('active');
      style.backgroundImage = `url("${this.props.imageUrl}")`;
    }

    return (
        <div
            className={classes.join(' ')}
            style={style}
            onClick={() => this.props.clicked(this.props.id)}
        >
        </div>
    );
  }
}

CardItem.contextType = ThemeContext;

export default CardItem;


/*
import React, {Component} from 'react';
import './CardItem.scss';
import {ThemeContext} from "../../../Settings/config";

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      shouldDisplay: props.shouldDisplay,
      imageUrl: props.imageUrl,
      active: props.active,
    }
  }


  componentWillUpdate(prevProps, prevState) {
    console.log('[CardItem.JS] this.state.active = ',prevState.active, ' active = ', this.state.active);
  }


  render() {
    const theme = this.context;
    let style = theme.cardBackground;
    let classes = ["card-item"];

    if(!this.state.shouldDisplay) {
      classes.push('hide');
    }
    if(this.state.id === 2) console.log('item = ', this.state);

    if(this.state.active) {
      classes.push('active');
      style.backgroundImage = `url("${this.state.imageUrl}")`;
    }

    return (
        <div
            className={classes.join(' ')}
            style={style}
            onClick={() => this.props.clicked(this.state.id)}
        >
        </div>
    );
  }
}

CardItem.contextType = ThemeContext;

export default CardItem;

 */