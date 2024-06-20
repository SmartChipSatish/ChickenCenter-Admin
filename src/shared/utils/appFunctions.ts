import dayjs from "dayjs"
import { ApiUrl } from "../../ApiUrl/apiUrl"
import { FRANCHISETYPE } from "./appInterfaces"
import { ORDERSTATUS } from "../../modules/orders/util/ordersInterfaces"


export const isFranchiese = (userType: string) => {
    return userType === FRANCHISETYPE.FRANCHISE
}

export const isAdmin = (userType: string) => {
    return userType === FRANCHISETYPE.ADMIN
}

export const isUser = (userType: string) => {
    return userType === FRANCHISETYPE.DELIVERYAGENTS
}

export const getOrderDate = (date: string) => {
    return date ? dayjs(date).format('MMMM D, YYYY h:mm A') : '---'
}

export const prepairQueryParams = (url: string, params: Object = {}) => {
    try {
        console.log('params', params)
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach((param) => {
            if (!!param[1]) {
                searchParams.append(param[0], param[1]);
            }

        });
        return `${url}?${searchParams.toString()}`;
    } catch (err) {
        return `${url}`
    }
}

export const loadingState = (isLoading: boolean, isError: boolean, data: []) => {
    return isLoading || isError || data?.length === 0;
}

export const getOrderSmallId = (orderId: string, full = false) => {
    return !full ? orderId?.substr(orderId.length - 5) || '' : orderId || '';
}

export const hasKey = (formObj: Object, keyName: string) => {
    return Object.keys(formObj).some((key) => key === keyName);
}

export const makeSearchKey = (search: string = '', isDirectValue = false) => {
    return !!search && !isDirectValue ? `%${search}` : search;
}
export const isActiveOrder = (status: ORDERSTATUS) => {
    return [ORDERSTATUS.Cancelled, ORDERSTATUS.Canceled, ORDERSTATUS.Success].includes(status);
}

export const fileUpload = (photo: any) => {
    return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'cgvymfjn')
        data.append("cloud_name", "dnhbdmhp6")
        fetch(`${ApiUrl.FILEUPLOADURL}`, {
            method: "POST",
            body: data
        }).then(res => res.json()).
            then(data => {
                resolve(data.secure_url)
            }).catch(err => {
                reject("An Error Occured While Uploading")
            })
    })
}

