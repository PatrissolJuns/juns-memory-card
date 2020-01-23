import React from 'react';
import PropTypes from 'prop-types';

const JMCCard = ({
                   imageUrl,
                   buttonName,
                   alt,
                   withButton = false,
                   colProperty = 'col-md-4',
                   marginBottom = 'mb-5',
                   addClass,
                   textTop,
                   cardAddStyle,
                   paddingGameBox = '',
                   ...props}) => {

  let style = {
    backgroundImage: `url("${imageUrl})"`
  };

  return (
      <div
          {...props}
          className={`${colProperty} jmc-card ${marginBottom} ${addClass}`}
          style={cardAddStyle}
      >
        <div className={`game_box ${paddingGameBox}`}>
          <p className={"jmc-stage-item-name"}>{textTop}</p>
          <figure style={style}> </figure>
        </div>
        {
          withButton
            ? <div className="game">
                <h3>{buttonName}</h3>
              </div>
            : null
        }
      </div>
  );
};

JMCCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  withButton: PropTypes.bool,
  buttonName: PropTypes.string,
  alt: PropTypes.string,
  colProperty: PropTypes.string,
  marginBottom: PropTypes.string,
  addClass: PropTypes.string,
  textTop: PropTypes.string,
  cardAddStyle: PropTypes.object,
};

export default JMCCard;
