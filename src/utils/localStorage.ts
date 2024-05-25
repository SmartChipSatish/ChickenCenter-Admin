export const setItemToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItemFromLocalStorage = (key: string) => {
    const getItem = localStorage.getItem(key);
    if (getItem) {
        return JSON.parse(getItem);
    }
    return null;
}