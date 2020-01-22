import React from 'react';

const JMCSection = ({
                      positionChildren = 'justify-content-center',
                      marginTop = '',
                      children,
                      ...props}) => {
  return (
      <div {...props} className={`jmc-section ${marginTop}`}>
        <div className="container">
          <div className="jmc-section-content">
            <div className={`row d_flex ${positionChildren}`}>
              {children}
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

export default JMCSection;
