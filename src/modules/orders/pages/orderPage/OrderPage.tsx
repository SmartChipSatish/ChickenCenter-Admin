import './OrderPage.scss'
import Card from "react-bootstrap/esm/Card";
import {  useState } from "react";
import { perPage } from "../../../../shared/utils/appConstants";
import { useGetAllOrders } from "../../../../shared/hooks/OrdersHook/OrdersHook";
import { AllOrdersListComponent } from "../../../../shared/components/AllOrdersList/AllOrdersListComponent";
import { loadingState } from '../../../../shared/utils/appFunctions';

const OrderPage = () => {
    const [page] = useState(1);

    const { data, isError, isLoading } = useGetAllOrders({
        perPage, page
    })
    

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Orders</p>
        </div>
        <div className="Orderpage">
            <Card className="h-100">
                <Card.Body className={`${!loadingState(isLoading, isError, data?.orders) && 'appCard'}`}>
                    <AllOrdersListComponent perPage={perPage} isPagination={true}></AllOrdersListComponent>
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;