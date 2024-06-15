export const setItemToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key: string) => {
    const getItem = localStorage.getItem(key);
    console.log('getItem', getItem)
    if (getItem != undefined && getItem != '' && getItem != null) {
        return JSON.parse(getItem);
    }
    return getItem;
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const AppConstants = {
    userId: 'userId',
    accessToken: 'accessToken',
    userInfo: 'userInfo'
}