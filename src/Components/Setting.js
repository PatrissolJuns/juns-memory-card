import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCTitle from "./UIElements/JMCTitle";

const Setting = (props) => {
  return (
      <div className={"instructions"}>
        <JMCSection classStyle={"jmc-end-of-level"} marginTop={"mt-5"} {...props}>
          <div className="col-md-12 result-title">
            <JMCTitle title={"Settings"} />
          </div>
          <div className="col-md-10 my-5 py-5">
            {/*<div className="row justify-content-center">
              <div className="col-3">*/}
                <div className="test_box">
                  <p style={{fontSize: '20px', textAlign: 'center'}}>Not available yet but I am working on :)</p>
                </div>
              {/*</div>
            </div>*/}
          </div>
          <div className="col-12">
            <div className="row justify-content-center">
              <a href="/" className={"read_more"}>Go back </a>
            </div>
          </div>
        </JMCSection>
      </div>
  );
};

export default Setting;
