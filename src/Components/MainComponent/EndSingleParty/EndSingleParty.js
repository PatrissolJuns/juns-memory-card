import React, {useState} from 'react';
import { WON_IMG, LOST_IMG } from "../../../Others/config";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader,
  Card, CardImg, CardImgOverlay, CardText, CardTitle} from "reactstrap";

const EndSingleParty = ({modalShowDefault, result, ...props}) => {

  const [modal, setModal] = useState(modalShowDefault);
console.log('modalShowDefault = ',modalShowDefault);
  const resultView = () => {
    if(result) {
      return (
          <Card>
            <CardImg width="100%" src={`${WON_IMG}`} alt="Card image WON_IMG/100px180 cap" />
            <CardImgOverlay>
              <CardTitle>You Win</CardTitle>
            </CardImgOverlay>
          </Card>
      )
    } else {
      return (
          <Card>
            <CardImg width="100%" src={`${LOST_IMG}`} alt="Card image WON_IMG/100px180 cap" />
            <CardImgOverlay>
              <CardTitle>You Lost</CardTitle>
            </CardImgOverlay>
          </Card>
      )
    }
  };

  const toggle = () => setModal(false);

  return (
      <Modal
          isOpen={modal}
          toggle={toggle}
          size="lg"
      >
        <ModalHeader toggle={toggle}>Result</ModalHeader>
        <ModalBody>
          {resultView()}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>OK</Button>
        </ModalFooter>
      </Modal>
  );
};

export default EndSingleParty;

{/*<div className="end-single-party">
  { resultView }
  <h3>Scored: {props.scored}</h3>
  <h3>Clicked time: {props.clicked}</h3>
</div>*/}