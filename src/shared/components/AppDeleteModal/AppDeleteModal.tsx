import Button from "react-bootstrap/esm/Button"
import Modal from "react-bootstrap/esm/Modal"
import { IAppDeleteModalProps } from "../../utils/appInterfaces"

export const AppDeleteModal = ({ data:{show, id, name }, handleClose, title }: IAppDeleteModalProps) => {
    console.log('show, id, name', show, id, name)
    return <>
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{title}?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={() => handleClose(true, id)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></>
}