import React from 'react';
import PropTypes from 'prop-types';
import JMCCard from "../../UIElements/JMCCard";

const CardItem = ({
                    id,
                    levelImageUrl,
                    imageUrl,
                    shouldDisplay,
                    active,
                    clickedOnCardItem,
                    ...props}) => {
    /*let style = {
      backgroundImage: `url("${levelImageUrl})"`
    };*/
    
    let classes = ["jmc-card-item p-2"];

    if(!shouldDisplay) {
      classes.push('hide');
    }
    // if(id === 2) console.log('item = ', props);

    if(active) {
      classes.push('active');
      // style.backgroundImage = `url("${imageUrl}")`;
    }

    return (
        <JMCCard
            imageUrl={classes.includes('active') ? imageUrl : levelImageUrl}
            withButton={false}
            colProperty={' '}
            addClass={classes.join(' ')}
            marginBottom={'mb-1'}
            paddingGameBox={"p-1"}
            onClick={() => clickedOnCardItem(id)}
        />
        /*<div
            className={classes.join(' ')}
            style={style}
            onClick={() => clickedOnCardItem(id)}
        >
        </div>*/
    );
};

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  levelImageUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  clickedOnCardItem: PropTypes.func.isRequired,
};

export default CardItem;


/*
class CardItem extends Component {
  constructor(props) {
    super(props);
    /!*state = {
      id: props.id,
      shouldDisplay: props.shouldDisplay,
      imageUrl: props.imageUrl,
      active: props.active,
    }*!/
  }


  /!*componentWillUpdate(prevProps, prevState) {
    console.log('[CardItem.JS] state.active = ',prevProps.active, ' active = ', props.active);
  }*!/


  render() {
    const theme = context;
    let style = {
      backgroundImage: theme.cardBackground
    };
    let classes = ["card-item"];

    if(!shouldDisplay) {
      classes.push('hide');
    }
    // if(props.id === 2) console.log('item = ', props);

    if(props.active) {
      classes.push('active');
      style.backgroundImage = `url("${props.imageUrl}")`;
    }

    return (
        <div
            className={classes.join(' ')}
            style={style}
            onClick={() => props.clicked(props.id)}
        >
        </div>
    );
  }
}

CardItem.contextType = ThemeContext;

export default CardItem;
*/


/*
import React, {Component} from 'react';
import './CardItem.scss';
import {ThemeContext} from "../../../Settings/config";

class CardItem extends Component {
  constructor(props) {
    super(props);
    state = {
      id: props.id,
      shouldDisplay: props.shouldDisplay,
      imageUrl: props.imageUrl,
      active: props.active,
    }
  }


  componentWillUpdate(prevProps, prevState) {
    console.log('[CardItem.JS] state.active = ',prevState.active, ' active = ', state.active);
  }


  render() {
    const theme = context;
    let style = theme.cardBackground;
    let classes = ["card-item"];

    if(!state.shouldDisplay) {
      classes.push('hide');
    }
    if(state.id === 2) console.log('item = ', state);

    if(state.active) {
      classes.push('active');
      style.backgroundImage = `url("${state.imageUrl}")`;
    }

    return (
        <div
            className={classes.join(' ')}
            style={style}
            onClick={() => props.clicked(state.id)}
        >
        </div>
    );
  }
}

CardItem.contextType = ThemeContext;

export default CardItem;

 */