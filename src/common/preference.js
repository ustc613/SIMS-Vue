const preference = {
    set (key, value, expired = 3600) {
        const data = {
            value,
            expired,
            createAt: new Date().getTime() / 1000,
        }
        localStorage.setItem(key, JSON.stringify(data))
    },
    get (key) {
        const data = JSON.parse(localStorage.getItem(key))
        if (data && data.expired) {
            const now = new Date().getTime() / 1000
            if (now <= data.createAt + data.expired) {
                return data.value
            }
        }
        return null
    },
}

export default preference