// React Core
import React from 'react';
import PropTypes from 'prop-types';
// Libs
// import { Modal, Button } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';

const propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
};
const defaultProps = {
    show: false,
    onConfirm: () => {},
    onClose: () => {},
};


const ModalConfirm = ({
                          title,
                          message,
                          show,
                          onConfirm,
                          onClose,
                      }) => {

 
    return null;
    // return (
    //     <Modal
    //         show={show}
    //     >
    //         <Modal.Header closeButton>
    //             <Modal.Title>{title}</Modal.Title>
    //         </Modal.Header>

    //         <Modal.Body>
    //             <p>{message}</p>
    //         </Modal.Body>

    //         <Modal.Footer>
    //             <Button
    //                 variant="secondary"
    //                 onClick={onClose}
    //             >
    //                 Close
    //             </Button>
    //             <Button
    //                 variant="primary"
    //                 onClick={onConfirm}
    //             >
    //                 Okay
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>
    // )
};

ModalConfirm.propTypes = propTypes;
ModalConfirm.defaultProps = defaultProps;

export default ModalConfirm;