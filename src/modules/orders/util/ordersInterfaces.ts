import { AddItem } from "../../inventory/Utils/InventoryInterfaces";

export enum ORDERSTATUS {
    In_Progress = "In Process",
    Completed = 'Completed'
}
export interface Order {
    date: string,
    orderStatus: ORDERSTATUS,
    reviews: [],
    userId: {
        name: string,
        primaryNumber: number,
        primaryAddress: {
            name: string,
            houseNo: string,
            streetName: string,
        }
    }
    id: string,
    franchiseId:string
    // items: AddItem[
    //     // {
    //     //     "itemId": "66509e96f5b94b86a246d963",
    //     //     "_id": "66519544960c311b6a461f78"
    //     // }
    // ],
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