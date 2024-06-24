import { faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge from "react-bootstrap/esm/Badge"
import { ORDERSTATUS, PAYMENTSTATUS, STATUSTYPES } from "../../../modules/orders/util/ordersInterfaces"
import './OrderStatusComponet.scss'

/**
 * 
 * @param type Status of Type (Order or Payment)
 * @param status Status of Order ( Success or Pending or Canceled)
 * @returns status class
 */
const getStatus = (type: string, status: string) => {
    switch (type) {
        case STATUSTYPES.Order: {
            if (status === ORDERSTATUS.Success) {
                return 'OrederCompleted';
            }
            if ([ORDERSTATUS.Cancelled, ORDERSTATUS.Canceled].includes(status as ORDERSTATUS)) {
                return 'OrderCanceled';
            }
            break;
        }

        case STATUSTYPES.Payment: {
            return status === PAYMENTSTATUS.Success ? 'OrederCompleted' : '';
            break;
        }

        default:
            return false;
            break;

    }
}

export const OrderStatus = ({
    label, status, type
}: { label: string, status: string, type: string }) => {
    return <>
        {label && <Badge className={`align-middle text-capitalize OrderPending ${(getStatus(type, status))}`}>
            <FontAwesomeIcon icon={faCircleDot} className="statusIcon"></FontAwesomeIcon>{label.toUpperCase()}
        </Badge>}
        {!label && '---'}
    </>
}