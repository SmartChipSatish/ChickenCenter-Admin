import { Col, Row } from "react-bootstrap"
import { CardComponent } from "../../components/CardComponent/CardComponent"
import { DashBoardEnum } from "../../../../shared/utils/appInterfaces";
import Card from 'react-bootstrap/Card';
import "./DashboardPage.scss"
import { useGetDashboardDataQuery } from "../../store/dashboardEndPoints";
import { AllOrdersListComponent } from "../../../../shared/components/AllOrdersList/AllOrdersListComponent";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
    const { data } = useGetDashboardDataQuery(undefined);
    const navigation = useNavigate()
    return (<>
        <Row>
            <Col>
                <CardComponent type={DashBoardEnum.orders} count={data?.length > 0 && data[0]?.orderCount || 0} title="Total Orders"></CardComponent>
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
                <p className="dashboard-reviews-title" >Latest Orders</p>
                <p className="dashboard-reviews-viewall primaryValue" onClick={() => {
                    navigation('/orders')
                }}>View All</p>
            </div>
            <AllOrdersListComponent perPage={2} ></AllOrdersListComponent>

        </div>


    </>)
}

export default DashboardPage;