import { faBuilding, faCartPlus, faHouse, faStore, faUsers } from "@fortawesome/free-solid-svg-icons";

export const Admin = [
    { title: 'dashboard', icon: faHouse , tooltip:'Dashboard'},
    { title: 'orders', icon: faCartPlus ,tooltip:'Orders'},
    { title: 'branches', icon: faBuilding, tooltip:'Franchises' },
    { title: 'inventory', icon: faStore, tooltip:'Inventory' },
    { title: 'users', icon: faUsers, tooltip:'Users' }];
    
export const Franchies = [
    { title: 'dashboard', icon: faHouse , tooltip:'Dashboard'},
    { title: 'orders', icon: faCartPlus, tooltip:'Orders' },
    { title: 'inventory', icon: faStore,tooltip:'Inventory'  },
    { title: 'users', icon: faUsers , tooltip:'Users'}];

export const User = [
    { title: 'dashboard', icon: faHouse, tooltip:'Dashboard' },
    { title: 'orders', icon: faCartPlus, tooltip:'Orders' }]