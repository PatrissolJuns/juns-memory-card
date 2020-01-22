import React from 'react';

const JMCCard = (props) => {
  return (
      <div className="col-md-4 jmc-card mb-5">
        <div className="game_box">
          <figure><img src={props.imageUrl} alt={props.alt}/></figure>
        </div>
        {
          props.withButton
            ? <div className="game">
                <h3>{props.buttonName}</h3>
              </div>
            : null
        }
      </div>
  );
};

export default JMCCard;
