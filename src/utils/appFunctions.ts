import { FRANCHISETYPE } from "./interfaces/appInterfaces";
import dayjs from 'dayjs';

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
            searchParams.append(param[0], param[1]);
        });
        return `${url}?${searchParams.toString()}`;
    } catch (err) {
        return `${url}`
    }
}

export const loadingState = (isLoading: boolean, isError: boolean, data: []) => {
    return isLoading || isError || data?.length === 0;
}