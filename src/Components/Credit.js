import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCTitle from "./UIElements/JMCTitle";
import GITHUB_LOGO from './../assets/images/github.png';
import GMAIL_LOGO from './../assets/images/gmail.png';
import STACKOVERFLOW_LOGO from './../assets/images/stack-overflow.png';

const Credit = (props) => {
  return (
      <div className={"instructions"}>
        <JMCSection classStyle={"jmc-end-of-level"} marginTop={"mt-5"} {...props}>
          <div className="col-md-12 result-title">
            <JMCTitle title={"Credits"} />
          </div>
          <div className="col-md-10">
            {/*<div className="row justify-content-center">
              <div className="col-3">*/}
                <div className="test_box other-info">
                  <p>This game is entirely made by <strong>Patrissol KENFACK #juns </strong></p>
                  <h3 className={"my-3"} style={{textAlign: 'center'}}> Contact me </h3>
                  <div className="instructions-item">
                    <p>
                      <a href="https://github/PatrissolJuns">
                        <img className={"mr-2"} src={GITHUB_LOGO} alt="Gitbug"/> Github
                      </a></p>
                    <p>
                      <a href="https://stackoverflow.com/users/12458141/patrissol-kenfack">
                        <img className={"mr-2"} src={STACKOVERFLOW_LOGO} alt="Stack-overflow logo"/> Stack-OverFlow
                      </a></p>
                    <p>
                      <a href="mailto:patrissolkenfack@gmail.com">
                        <img className={"mr-2"} src={GMAIL_LOGO} alt="gmail logo"/> Mail
                      </a> </p>
                    <span> </span>
                  </div>

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

export default Credit;
