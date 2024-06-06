import { faCalendar, faInr, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLazyGetOrderByIdQuery } from "../../Store/ordersEndpoints";
import { useEffect } from "react";
import AppLoader from "../../../../shared/components/loader/loader";
import { getOrderDate } from "../../../../utils/appFunctions";
import './OrderDetailsPage.scss'
import { ORDERSTATUS, Order, PAYMENTSTATUS, STATUSTYPES, IItem } from "../../util/ordersInterfaces";
import { OrderStatus } from "../../../../shared/components/OrderStatusComponet/OrderStatusComponent";

const OrderDetailPage = () => {
    const { id } = useParams();
    const [getOrderById, { data, isLoading, isError }] = useLazyGetOrderByIdQuery();
    useEffect(() => {
        getOrderById(id!)
    }, [id])

    useEffect(() => {
        console.log('data, isLoading, isError', data, isLoading, isError)
    }, [data, isLoading, isError])

    return (
        <>
            <div className="d-flex justify-content-between pageTitleSpace">
                <p className="pageTile">Order</p>
            </div>
            {isLoading && <div className="h-100 w-100 d-flex justify-content-center align-items-center"><AppLoader></AppLoader></div>}
            {isError && <div className="h-100 w-100 d-flex justify-content-center align-items-center"><p>Something went wrong!</p></div>}
            {data && <>
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Header className="d-flex appCardTitle justify-content-between"> <div className="d-flex">
                                Order details <span className="badge itemsCount  rounded-circle ms-1">{data?.items?.length}</span>
                            </div>  <div><OrderStatus label={data?.orderStatus} status={data?.orderStatus} type={STATUSTYPES.Order} /></div> </Card.Header>
                            <Card.Body>
                                {data.items && data?.items?.map((item: IItem) => {
                                    return <Row className="d-flex w-100  align-items-center orderItem subtotalBoarder">
                                        <Col md={2}><Image src={item.imageUrl} rounded className="h-100 orderImage" /></Col>
                                        <Col md={8}>
                                            <div className="d-flex">
                                                <div>
                                                    <p className="orderItemName">{item.itemName}</p>
                                                    <p className="orderPrice "><FontAwesomeIcon icon={faInr} className='priceSymbole' />{item.itemPrice}</p>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                                                    <p className="text-dark "><FontAwesomeIcon icon={faXmark} className="orderCrossIcon" />{item.itemQty}</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2}> <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice text-nowrap">{item.itemPrice}.00</span></p></Col>
                                    </Row>
                                })}
                                <Row className="d-flex w-100  align-items-center subTotal">
                                    <Col md={10}>
                                        <div className="d-flex">
                                            <p className="orderItemName text-right w-100 subTotal-details">Subtotal:</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice text-nowrap">{data?.totals?.amount}.00</span></p>
                                    </Col>
                                </Row>
                                <Row className="d-flex w-100  align-items-center subTotal ">
                                    <Col md={10}>
                                        <div className="d-flex">
                                            <p className="orderItemName text-right w-100 subTotal-details">Shipping fee:</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice text-nowrap">00.00</span></p>
                                    </Col>
                                </Row>
                                <Row className="d-flex w-100  align-items-center subTotal">
                                    <Col md={10}>
                                        <div className="d-flex">
                                            <p className="orderItemName text-right w-100 subTotal-details">Tax:</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice text-nowrap">00.00</span></p>
                                    </Col>
                                </Row>
                                <Row className="d-flex w-100  align-items-center subTotal">
                                    <Col md={10}>
                                        <div className="d-flex">
                                            <p className="orderItemName text-right w-100 subTotal-details">Total:</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice">{data?.totals?.amount}.00</span></p>
                                    </Col>
                                </Row>
                                <Row className="d-flex w-100  align-items-center subTotal">
                                    <Col md={10}>
                                        <div className="d-flex">
                                            <p className="orderItemName text-right w-100 subTotal-details">Amount paid:</p>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <p className="text-dark priceDetails text-nowrap"><FontAwesomeIcon icon={faInr} className="priceIcon" /> <span className="itemPrice">{data?.totals?.amount}.00</span></p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className="d-flex appCardTitle">Customer </Card.Header>
                            <Card.Body className="userCardBoady">
                                <Row className="userDetails">
                                    <Col className="d-flex align-items-center">
                                        <Image src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" roundedCircle /> <p className="userName userAddressValue">{data?.userId?.name || '----'}</p>
                                    </Col>
                                </Row>
                                <Row className="userAddress">
                                    <Col>
                                        <p className="userAddressField">Phone </p>
                                    </Col>
                                    <Col>
                                        <p className="userAddressValue">{data?.userId?.primaryNumber || '----'} </p>
                                    </Col>
                                </Row>

                                <Row className="userAddress">
                                    <Col>
                                        <p className="userAddressField">Payment Mode </p>
                                    </Col>
                                    <Col>
                                        <p className="userAddressValue">{"Cash" || '----'} </p>
                                    </Col>
                                </Row>
                                <Row className="userAddress">
                                    <Col>
                                        <p className="userAddressField">Payment Status </p>
                                    </Col>
                                    <Col>
                                        <p><OrderStatus label={data?.paymentStatus?.toLocaleLowerCase()} status={data?.paymentStatus} type={STATUSTYPES.Payment} /> </p>
                                    </Col>
                                </Row>
                                <Row className="userAddress">
                                    <Col>
                                        <p className="userAddressField">Address </p>
                                    </Col>
                                    <Col>
                                        <p className="userAddressValue">{"CWC8+RC Mountain View , Mountain View, California" || '----'} </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
            }

        </>
    )
}

export default OrderDetailPage;