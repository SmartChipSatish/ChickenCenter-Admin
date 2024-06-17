import './OrderPage.scss'
import Card from "react-bootstrap/esm/Card";
import { useEffect, useState } from "react";
import { perPage } from "../../../../shared/utils/appConstants";
import { AllOrdersListComponent } from "../../../../shared/components/AllOrdersList/AllOrdersListComponent";

import Form from 'react-bootstrap/esm/Form';
import { ORDERSTATUS, PAYMENTSTATUS } from '../../util/ordersInterfaces';
import { addDays } from 'date-fns';
import { DateRangePickers } from '../../../../shared/components/DateRangePickers/DateRangePickers';
import dayjs from 'dayjs';
import Button from 'react-bootstrap/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const OrderPage = () => {
    const [queryParam, setQueryParams] = useState({});
    const [dateRange, setDateRange] = useState({ startDate: addDays(new Date(), -30), endDate: new Date() });
    const [search, SetSearch] = useState('');


    const selectedDate = (dateArray: any) => {
        setDateRange(dateArray)
    }

    useEffect(() => {
        try {
            const endDate = dayjs(dateRange?.endDate || '').add(23, 'hour').add(59, 'minutes').add(59, 'seconds')
            const startDate = dayjs(dateRange.startDate).format('ddd, MMM D, YYYY');
            setQueryParams({
                ...queryParam,
                ...{
                    'date[gte]': startDate,
                    'date[lte]': endDate
                },
                itemId: search
            })
        } catch (err) {
            console.log('err', err)
        }

    }, [dateRange, search])

    return (<>
        <div className="d-flex justify-content-between pageTitleSpace">
            <p className="pageTile">Orders </p>
        </div>
        <div className="Orderpage">
            <Card className="h-100">
                <div className='filters'>
                    <div>
                        <form className="d-flex" role="search">
                            <Form.Control className="me-2" type="search" placeholder="Search Order ID" aria-label="Search Order ID" onChange={(searchValue) => {
                                SetSearch(searchValue.target.value)
                            }} />
                            <Button variant="outline-primary" onClick={() => {
                            }}>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </Button>

                        </form>
                    </div>
                    <div className='d-flex'>
                        <Form.Group className="filterOption" style={{ width: '280px' }}>
                            <DateRangePickers selectedDate={selectedDate} dateArray={dateRange} />
                        </Form.Group>
                        <Form.Select aria-label="Default select example" className='filterOption' style={{ width: '250px' }}
                            onChange={(value) => {
                                setQueryParams({ ...queryParam, orderStatus: value?.target?.value })
                            }}>
                            <option value=''>Order Status(All)</option>

                            {Object.entries(ORDERSTATUS).map((key) => {
                                return <option value={key[1]}>{key[0]}</option>
                            })}

                        </Form.Select>
                        <Form.Select aria-label="Default select example" style={{ width: '250px' }}
                            onChange={(value) => {
                                setQueryParams({ ...queryParam, paymentStatus: value?.target?.value })
                            }}>
                            <option value=''>Payment Status(All)</option>
                            {Object.entries(PAYMENTSTATUS).map((key) => {
                                return <option value={key[1]}>{key[0]}</option>
                            })}
                        </Form.Select>
                    </div>
                </div>

                <Card.Body >
                    <AllOrdersListComponent perPage={perPage} isPagination={true} queryParams={queryParam}></AllOrdersListComponent>
                </Card.Body>
            </Card>

        </div>

    </>)

}

export default OrderPage;