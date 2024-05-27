export const setItemToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key: string) => {
    const getItem = localStorage.getItem(key);
    console.log('getItem', getItem)
    if (getItem != undefined ) {
        return JSON.parse(getItem);
    }
    return getItem;
}