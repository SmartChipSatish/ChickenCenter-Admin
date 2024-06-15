import Button from "react-bootstrap/esm/Button"
import Modal from "react-bootstrap/esm/Modal"
import { IAppDeleteModalProps } from "../../utils/appInterfaces"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"

export const AppDeleteModal = forwardRef(({ accept, title }: IAppDeleteModalProps, ref) => {
    const [show, SetShow] = useState(false);
    const data = useRef<any | null>(null);

    const close = (status: boolean) => {
        SetShow(false)
        if (status) {
            accept(status, data.current)
        }

        data.current = null
    };

    /**
     * 
     * @param modalData pass Modal Data
     */
    const open = (modalData: any) => {
        if (modalData) {
            data.current = modalData
        }
        SetShow(true)
    }

    useImperativeHandle(ref, () => {
        return {
            open,
            close,
        }
    }, []);

    return <>
        <Modal show={show} onHide={() => close(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{title}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => close(false)}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={() => close(true)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal></>
})