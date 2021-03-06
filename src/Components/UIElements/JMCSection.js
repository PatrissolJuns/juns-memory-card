import React from 'react';
import PropTypes from 'prop-types';

const JMCSection = ({
                      classStyle = '',
                      positionChildren = 'justify-content-center',
                      marginTop = '',
                      ...props}) => {
  return (
      <div {...props} className={`jmc-section ${marginTop} ${classStyle}`}>
        <div className="container">
          <div className="jmc-section-content">
            <div className={`row d_flex ${positionChildren}`}>
              {props.children}
              {/*<div className="col-md-6">
                <div className="test_box">
                  <div className="jons">
                    <h4>{props.title}</h4>
                  </div>
                  <p>{props.paragraph}</p>
                  <a className="read_more" href="Javascript:void(0)">Play Online</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="test_box">
                  <div className="jons">
                    <figure><img src="images/jons_img1.png" alt="#"/></figure>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
  );
};

JMCSection.propTypes = {
  positionChildren: PropTypes.string,
  marginTop: PropTypes.string,
};

export default JMCSection;
