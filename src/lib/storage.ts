export function getSavedCode(localStorage: Storage) {
    const item = localStorage.getItem("authCode")

    if (item) return item
    return ""
}

export function saveCode(code: string, localStorage: Storage) {
    localStorage.setItem("authCode", code)
}
