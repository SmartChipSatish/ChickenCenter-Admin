import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

const OrderDetailPage = () => {
    return (
        <><Card >
            <Card.Body>
                <p>Order #32543</p>
                <p className="mb-2 text-muted">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Aug 17, 2020, 5:48 (ET)
                </p>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card></>
    )
}

export default OrderDetailPage;