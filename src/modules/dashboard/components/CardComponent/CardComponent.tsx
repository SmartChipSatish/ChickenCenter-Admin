import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DashBoardEnum } from '../../../../shared/utils/appInterfaces'
// FontAwesomeIcon
import './CardComponent.scss'
import { faInr, faRupee } from '@fortawesome/free-solid-svg-icons'
interface ICardData {
    type: DashBoardEnum,
    count: number,
    title: string
}
const getImage = (type: DashBoardEnum) => {
    if (type === DashBoardEnum.orders)
        return 'https://cdn.iconscout.com/icon/premium/png-512-thumb/complete-order-2914848-2412925.png?f=webp&w=256'
    if (type === DashBoardEnum.deliverd)
        return 'https://i.pinimg.com/736x/ea/cf/bf/eacfbf90f37681325053cd0c30351ab1.jpg'
    if (type === DashBoardEnum.canceled)
        return 'https://www.iconbunny.com/media/catalog/product/1/0/1036.10-cancel-order-icon-iconbunny.jpg?width=600&height=600&store=icons&image-type=image'
    if (type === DashBoardEnum.revenue)
        return 'https://e7.pngegg.com/pngimages/72/531/png-clipart-profit-sales-computer-icons-revenue-customs-text-service.png'
    return '';
}
export const CardComponent = ({ type, count, title }: ICardData) => {
    return (<>
        <div className="card" >
            <div className="card-body cardComponent">
                <img src={getImage(type)} />
                <div className="cardComponent-details">
                    {count && <p className="cardComponent-details-count">{type === DashBoardEnum.revenue && <FontAwesomeIcon icon={faInr} className='cardComponent-details-icon'></FontAwesomeIcon>}{count}</p>}
                    {title && <p className='cardComponent-details-title'>{title}</p>}
                </div>
               
            </div>
        </div>
    </>)
}