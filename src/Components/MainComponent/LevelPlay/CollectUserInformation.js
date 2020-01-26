import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {isUserExist} from "../../../Others/firebase/database-utilities";

const CollectUserInformation = props => {

  const [inputPseudo, setInputPseudo] = useState('');
  const [inputName, setInputName] = useState('');

  const [errorInputPseudo, setErrorInputPseudo] = useState(false);
  const [errorInputName, setErrorInputName] = useState(false);

  const [isNewAccount, setIsNewAccount] = useState(false);
  const [displayCreateAccountBox, setDisplayCreateAccountBox] = useState(false);

  const [displayLoaderSave, setDisplayLoaderSave] = useState(false);
  const [displayLoaderCancel, setDisplayLoaderCancel] = useState(false);


  const inputHandler = (event, type) => {
    type === 'userName' ? setErrorInputName(false) : setErrorInputPseudo(false);

    if(event.target.value !== '') {
      type === 'userName' ? setInputName(event.target.value) : setInputPseudo(event.target.value);
    }
    else type === 'userName' ? setErrorInputName(false) : setErrorInputPseudo(false);
  };

  const formHandler = (type) => {
    const level = {levelNumber: props.levelNumber, levelScore: props.levelScore, time: props.spentTime};

    if(type === 'save') {
      if(inputName !== '' && inputPseudo !== '') {
        setDisplayLoaderSave(true);
        if(!isNewAccount) {
          isUserExist(inputPseudo).then(
              () => {
                props.updateUserSessionValue(inputPseudo, inputName, isNewAccount, level).then(
                    () => props.nextLevelFunc(true)
                );
                setDisplayLoaderSave(false);
              }
          ).catch(() => {
            setDisplayLoaderSave(false);
            setDisplayCreateAccountBox(true)
          })
        }
        else {
          props.updateUserSessionValue(inputPseudo, inputName, isNewAccount, level).then(
              () => props.nextLevelFunc(true)
          );
          setDisplayLoaderSave(false);
        }
      }
      else {
        if(inputName === '') setErrorInputName(true);
        if(inputPseudo === '') setErrorInputPseudo(true);
      }
    }
    else {
      setDisplayLoaderCancel(true);
      props.updateUserSessionValue(inputPseudo, inputName, isNewAccount, level).then(
          () => props.nextLevelFunc(true)
      );
      setDisplayLoaderCancel(false);
    }
  };

  return (
      <div id="contact" className="collect-user-information">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="jmc-title">
                <h2>Enter your name and pseudo to save your statistics</h2>
                <span></span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="form_main">
                <div className="row">
                  <div className="col-md-12">
                    {
                      errorInputName
                          ? <p style={{color: "red"}}>Please enter a valid name</p>
                          : ''
                    }
                    <input
                        onChange={(event) => inputHandler(event, 'userName')}
                        className="form_control"
                        placeholder={props.userName}
                        type="text"
                        name="Name"
                    />
                  </div>
                  <div className="col-md-12">
                    {
                      errorInputPseudo
                          ? <p style={{color: "red"}}>Please enter a valid pseudo</p>
                          : ''
                    }
                    <input
                        onChange={(event) => inputHandler(event, 'userPseudo')}
                        className="form_control"
                        placeholder={props.userPseudo}
                        type="text"
                        name="Pseudo"
                    />
                  </div>
                  {
                    displayCreateAccountBox
                      ? <div className="col-md-12 create-account">
                          <p>The information are not correct</p>
                          <input
                              onChange={(event) => setIsNewAccount(true)}
                              className="form_control"
                              type="checkbox"
                              name="isNewAccount"
                          />
                          <p className={"d-inline-block"}>Create an account instead?</p>
                        </div>
                      : null
                  }

                  <div className="col-md-12">
                    <div className="row justify-content-center">
                      <button
                          onClick={() => formHandler('save')}
                          className="send_btn"
                      >Save and continue
                        {
                          displayLoaderSave ? <i className="fa fa-refresh fa-spin fa-spinner ml-2"> </i> : null
                        }
                      </button>
                      <button
                          onClick={() => formHandler('cancel')}
                          className="send_btn cancel"
                      >Cancel and continue
                        {
                          displayLoaderCancel ? <i className="fa fa-refresh fa-spin fa-spinner ml-2"> </i> : null
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

CollectUserInformation.propTypes = {
  userName: PropTypes.string.isRequired,
  userPseudo: PropTypes.string.isRequired,
  spentTime: PropTypes.number.isRequired,
  levelScore: PropTypes.number.isRequired,
  levelNumber: PropTypes.number.isRequired,
  isUserGenerated: PropTypes.bool.isRequired,
  nextLevelFunc: PropTypes.func.isRequired,
  updateUserSessionValue: PropTypes.func.isRequired,
};

export default CollectUserInformation;