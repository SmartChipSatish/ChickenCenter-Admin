import { useEffect, useState } from "react"
import { FRANCHISETYPE } from "../interfaces/appInterfaces"
import { useSelector } from "react-redux";

export const UserTypeHook = () => {
    const [type, SetType] = useState('')
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo);
    useEffect(() => {
        SetType(userInfo.userType)
    }, [userInfo.userType])
    return type
}