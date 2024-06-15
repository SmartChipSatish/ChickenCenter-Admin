
export enum ORDERSTATUS {
    In_Progress = "In Process",
    Success = 'Success',
    Canceled = "Canceled"
}
export enum PAYMENTSTATUS {
    In_Progress = "In Process",
    Success = 'SUCCESS',

}

export enum STATUSTYPES {
    Order = 'Order',
    Payment = 'Payment'
}
export interface IItem {
    amount: number,
    imageUrl: string,
    itemId: string,
    itemName: string,
    itemPrice: number,
    itemQty: number,
    _id: string
}
export interface Order {
    date: string,
    orderStatus: ORDERSTATUS,
    paymentStatus: PAYMENTSTATUS
    reviews: [],
    userId: {
        name: string,
        primaryNumber: number,
        primaryAddress: {
            name: string,
            houseNo: string,
            streetName: string,
        }
    },
    items: IItem[]
    id: string,
    franchiseId: {
        id: string,
        name: string
    },
    deliveryAgentId?: string,
    totals: {
        amount: number,
        quantity: number
    }

}





// {
//     "_id": "66519544960c311b6a461f77",
//         "userId": {
//         "favouriteItems": [],
//             "_id": "664de740835b08b634646081",
//                 "userName": "satish",
//                     "userType": "admin",
//                         "name": "K V Satish Kumar",
//                             "password": "Testing",
//                                 "primaryNumber": 9848115574,
//                                     "email": "satish.cards@gmail.com",
//                                         "walletBalance": 0,
//                                             "secondaryAddress": [
//                                                 {
//                                                     "name": "Office2",
//                                                     "houseNo": "F4",
//                                                     "streetName": "Daivasadan",
//                                                     "_id": "664e09063de2799462266317"
//                                                 },
//                                                 {
//                                                     "name": "Office1",
//                                                     "houseNo": "F4",
//                                                     "streetName": "Daivasadan",
//                                                     "_id": "664e08a4e505f0c6fdf70c48"
//                                                 }
//                                             ],
//                                                 "__v": 0,
//                                                     "status": false,
//                                                         "primaryAddress": {
//             "name": "primaryAddress 1",
//                 "houseNo": "F.No:8",
//                     "_id": "664e2bb28182701e064f597a"
//         },
//         "id": "664de740835b08b634646081"
//     },