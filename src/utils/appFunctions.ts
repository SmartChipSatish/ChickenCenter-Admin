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

export const getOrderDate = (date:string) => {
    return date ? dayjs(date).format('MMMM D, YYYY h:mm A') : '---'
}