import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCTitle from "./UIElements/JMCTitle";

const OfflineMode = (props) => {
  return (
      <div className={"instructions network"}>
        <JMCSection classStyle={"jmc-end-of-level"} marginTop={"mt-5"} {...props}>
          <div className="col-md-12 result-title">
            <JMCTitle title={"No Network"} />
          </div>
          <div className="col-md-10">
            {/*<div className="row justify-content-center">
              <div className="col-3">*/}
            <div className="test_box">
              <p>You are currently offline. Please check your internet connexion</p>
            </div>

            <div className="test_box mt-3">
              <p><strong>Note:</strong> This box will disappear as soon as the network will be back</p>
            </div>
              {/*</div>
            </div>*/}
          </div>
          {/*<div className="col-12">
            <div className="row justify-content-center">
              <a href="/" className={"read_more"}>Got it! </a>
            </div>
          </div>*/}
        </JMCSection>
      </div>
  );
};

export default OfflineMode;
