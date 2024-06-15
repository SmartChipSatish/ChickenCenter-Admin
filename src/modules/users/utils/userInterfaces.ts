export interface IUser {
    address: { name: string, _id: string, city: string , state:string},
    createdAt: string;
    createdBy: string;
    primaryNumber:number,
    id: string;
    name: string;
    updatedAt: string;
    updatedBy: string;
    franchiseId:string;
    _id: string;
}

export const UserForm = {
    Name: 'name',
    UserName: 'userName',
    Password: 'password',
    PrimaryNumber: 'primaryNumber',
    HouseNo: 'houseNo',
    StreetName: 'streetName',
    City: 'city',
    Pincode: 'pincode',
    Landmark: 'landmark',
    State: 'state'
}