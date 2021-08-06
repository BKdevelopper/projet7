export function removeItem(itemRemove){
    localStorage.removeItem(itemRemove)
}

export function getItem(item){
    return localStorage.getItem(item)
}

export function setItem(localStorageName, newItem){
    localStorage.setItem(localStorageName, newItem)
}