import { FRANCHISETYPE } from "./interfaces/appInterfaces";


export const isFranchiese = (userType: string) => {
    return userType === FRANCHISETYPE.FRANCHISE
}

export const isAdmin = (userType: string) => {
    return userType === FRANCHISETYPE.ADMIN
}

export const isUser = (userType: string) => {
    return userType === FRANCHISETYPE.DELIVERYAGENTS
}