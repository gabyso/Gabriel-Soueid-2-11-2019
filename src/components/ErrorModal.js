import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ErrorModal extends React.Component {
    state = { show: true };
  
    handleClose = () => this.setState({ show: false });
  
    failsMessages = () => {
        return this.props.errors;
    }

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{`Failed receiving: ${this.failsMessages()} from API`}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
          );
    }
  }

  export default ErrorModal;