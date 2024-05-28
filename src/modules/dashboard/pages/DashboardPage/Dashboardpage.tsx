import { Col, Row } from "react-bootstrap"
import { CardComponent } from "../../components/CardComponent/CardComponent"
import { DashBoardEnum } from "../../../../shared/utils/appInterfaces";
import Card from 'react-bootstrap/Card';
import "./DashboardPage.scss"
import { useGetDashboardDataQuery } from "../../store/dashboardEndPoints";


const DashboardPage = () => {
    const { data } = useGetDashboardDataQuery(undefined);

    return (<>
        <Row>
            <Col>
                <CardComponent type={DashBoardEnum.orders} count={ data?.length > 0 && data[0]?.orderCount || 0} title="Total Orders"></CardComponent>
            </Col>
            <Col>
                <CardComponent type={DashBoardEnum.deliverd} count={76} title="Total Deliverd"></CardComponent>
            </Col>
            <Col>
                <CardComponent type={DashBoardEnum.canceled} count={20} title="Total Canceled"></CardComponent>

            </Col>
            <Col>
                <CardComponent type={DashBoardEnum.revenue} count={data?.length > 0 && data[0]?.totalPayment || 0} title="Total Revenue"></CardComponent>
            </Col>

        </Row>
        <br></br>
        <Row className="dashboard">
            <Col>
                <Card className="dashboard-canvasChart">
                    <Card.Title className="dashboard-title">Total Revenue</Card.Title>
                    <Card.Body className="dashboard-body">
                        <Card.Text>
                            Pie Chart
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="dashboard-canvasChart">
                    <Card.Title className="dashboard-title">Total Orders</Card.Title>
                    <Card.Body className="dashboard-body">
                        <Card.Text>
                            Orders Chart
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <br></br>


        <div className="dashboard-reviews ">
            <div className="dashboard-reviews-header">
                <p className="dashboard-reviews-title" >Customer Reviews</p>
                <p className="dashboard-reviews-header-viewall">View All</p>
            </div>

            <Row>
                <Col>
                    <Card className="dashboard-reviews-card">
                        <div className="userInformation d-flex">
                            <Card.Img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></Card.Img>
                            <div>
                                <p className="dashboard-reviews-name">Vishnu</p>
                                <p className="dashboard-reviews-time"> 2 day ago</p>
                            </div>
                        </div>
                        <Card.Body >
                            <Card.Text className="dashboard-reviews-comment">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </Col>
                <Col>
                    <Card className="dashboard-reviews-card">
                        <div className="userInformation d-flex">
                            <Card.Img src="https://cdn.pixabay.com/photo/2019/09/24/16/58/woman-4501777_1280.jpg"></Card.Img>
                            <div>
                                <p className="dashboard-reviews-name">Siddam</p>
                                <p className="dashboard-reviews-time"> 1 day ago</p>
                            </div>
                        </div>
                        <Card.Body >
                            <Card.Text className="dashboard-reviews-comment">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="dashboard-reviews-card">
                        <div className="userInformation d-flex">
                            <Card.Img src="https://cdn.pixabay.com/photo/2016/07/27/17/56/woman-1545885_1280.jpg"></Card.Img>
                            <div>
                                <p className="dashboard-reviews-name">Satish</p>
                                <p className="dashboard-reviews-time"> 3 day ago</p>
                            </div>
                        </div>
                        <Card.Body >
                            <Card.Text className="dashboard-reviews-comment">
                                nice
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="dashboard-reviews-card">
                        <div className="userInformation d-flex">
                            <Card.Img src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg"></Card.Img>
                            <div>
                                <p className="dashboard-reviews-name">Mohan</p>
                                <p className="dashboard-reviews-time"> 4 day ago</p>
                            </div>
                        </div>
                        <Card.Body >
                            <Card.Text className="dashboard-reviews-comment">
                                Nice App , i got fresh meat.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col>
                </Col> */}

            </Row>
        </div>


    </>)
}

export default DashboardPage;