import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
const modal = props => {
    return (
        <Modal
        show={props.show}
        onHide={props.setShow}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <FontAwesomeIcon icon={faExclamationTriangle} /> <span style={{color: 'red'}}> Error</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.errorMessage}</p>
        </Modal.Body>
      </Modal>
    )
}

export default modal