import { Col, Row } from "react-bootstrap"
import { CardComponent } from "../../components/CardComponent/CardComponent"
import { DashBoardEnum } from "../../../../shared/utils/appInterfaces";
import Card from 'react-bootstrap/Card';
import "./DashboardPage.scss"
import { useGetDashboardDataQuery } from "../../store/dashboardEndPoints";
import { AllOrdersListComponent } from "../../../../shared/components/AllOrdersList/AllOrdersListComponent";
import { useNavigate } from "react-router-dom";
import CanvasJS from '@canvasjs/charts';
import { useEffect, useRef } from "react";

const DashboardPage = () => {
    const { data } = useGetDashboardDataQuery(undefined);
    const navigation = useNavigate();
    const chartContainer = useRef(null);
    const pieChartContainer = useRef(null);
    useEffect(() => {
        if (!chartContainer.current) {
            return
        }
        var chart = new CanvasJS.Chart(chartContainer.current, {
            animationEnabled: true,
            data: [{
                type: "column",
                dataPoints: [
                    { label: "Jan", y: 5000 },
                    { label: "Feb", y: 2000 },
                    { label: "March", y: 7000 },
                    { label: "April", y: 1000 },
                    { label: "May", y: 500 },
                    { label: "June", y: 5000 },
                    { label: "July", y: 2000 },



                ]
            }]
        });
        chart.render();
    }, [chartContainer])

    useEffect(() => {
        if (!pieChartContainer.current) {
            return
        }
        var chart = new CanvasJS.Chart(pieChartContainer.current, {
            animationEnabled: true,
            data: [{
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: [
                    { y: 450, label: "Jan" },
                    { y: 414, label: "Feb" },
                    { y: 520, label: "March", indexLabel: "\u2191 highest", markerColor: "red", markerType: "triangle" },
                    { y: 410, indexLabel: "\u2193 lowest", markerColor: "DarkSlateGrey", markerType: "cross", label: "April" },
                    { y: 450, label: "May" },
                    { y: 500, label: "June" },
                    { y: 500, label: "July" },
                    { y: 480, label: "Aguest" },
                    { y: 510, label: "Sept" }

                ]
            }]
            // data: [{
            //     type: "pie",
            //     startAngle: 240,
            //     yValueFormatString: "##0.00\"%\"",
            //     indexLabel: "{label} {y}",
            //     dataPoints: [
            //         { y: 79.45, label: "Jan" },
            //         { y: 30.31, label: "Feb" },
            //         { y: 25.06, label: "March" },
            //         { y: 80.91, label: "April" },
            //         { y: 11.26, label: "May" }
            //     ]
            // }]
        });
        chart.render();
    }, [pieChartContainer])
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
                        <div id="chartContainer" className="h-100 w-100" ref={chartContainer}></div>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="dashboard-canvasChart">
                    <Card.Title className="dashboard-title">Total Orders</Card.Title>
                    <Card.Body className="dashboard-body">
                        <div id="piechartContainer" className="h-100 w-100" ref={pieChartContainer}></div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <br></br>

        <Card>
            <Card.Body >
                <div className="dashboard-reviews ">
                    <div className="dashboard-reviews-header">
                        <p className="dashboard-reviews-title" >Latest Orders</p>
                        <p className="dashboard-reviews-viewall primaryValue" onClick={() => {
                            navigation('/orders')
                        }}>View All</p>
                    </div>
                    <AllOrdersListComponent perPage={2} ></AllOrdersListComponent>

                </div>
            </Card.Body>
        </Card>
    </>)
}

export default DashboardPage;