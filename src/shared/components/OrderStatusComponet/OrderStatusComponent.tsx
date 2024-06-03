import { faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge from "react-bootstrap/esm/Badge"
import { ORDERSTATUS, PAYMENTSTATUS, STATUSTYPES } from "../../../modules/orders/util/ordersInterfaces"
import './OrderStatusComponet.scss'
const getStatus = (type: string, status: string) => {
    switch (type) {
        case STATUSTYPES.Order:
            return status === ORDERSTATUS.Success;
            break
        case STATUSTYPES.Payment:
            return status === PAYMENTSTATUS.Success
            break;
        default:
            return false;
            break;

    }
}
export const OrderStatus = ({
    label, status, type
}: { label: string, status: string, type: string }) => {
    return <>
        {label && <Badge className={`align-middle text-capitalize OrderPending ${(getStatus(type, status)) && 'OrederCompleted'}`}>
            <FontAwesomeIcon icon={faCircleDot} className="statusIcon"></FontAwesomeIcon>{label}
        </Badge>}
        {!label && '---'}
    </>
}