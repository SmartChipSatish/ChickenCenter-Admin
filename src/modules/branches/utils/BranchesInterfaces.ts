export interface IBranch {
    address: { name: string, _id: string, city: string },
    createdAt: string;
    createdBy: string;
    id: string;
    name: string;
    updatedAt: string;
    updatedBy: string;
    _id: string;
    currentOrders: number;
}


export const BranchFields = {
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