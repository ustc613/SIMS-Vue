import http from "./http"

export const login = ({ role, username, password }) => {
    let url = '/manager/login'
    if (role === 'student') {
        url = '/student/login'
    }
    return http.post(url, {
        username,
        password,
    })
}


export const logout = ({ role }) => {
    let url = '/manager/logout'
    if (role === 'student') {
        url = '/student/logout'
    }
    return http.post(url)
}

export const getAllManagers = (data) => {
    const url = '/manager/getAllManagers'
    return http.post(url, data)
}

export const getAllSchool = () => {
    const url = '/manager/school'
    return http.post(url)
}

export const addSchool = (data) => {
    const url = '/manager/addSchool'
    return http.post(url, data)
}

export const getCourses = (data) => {
    const url = '/manager/getCourses'
    return http.post(url, data)
}

export const allStudent = () => {
    const url = '/manager/allStudent'
    return http.post(url)
}

export const allCourse = () => {
    const url = '/manager/allCourse'
    return http.post(url)
}

export const superManagerAllCourse = (data) => {
    const url = '/manager/getCourses'
    return http.post(url, data)
}

export const superManagerAllStudent = ({}) => {
    const url = '/student'
    return http.post(url, {})
}

export const deleteStudent = (data) => {
    const url = '/manager/deleteStudent'
    return http.post(url, data)
}

export const updateStudent = (data) => {
    const url = '/manager/updateStudent'
    return http.post(url, data)
}

export const addStudent = (data) => {
    const url = '/manager/addStudent'
    return http.post(url, data)
}


export const updateSchool = (data) => {
    const url = '/manager/updateSchool'
    return http.post(url, data)
}


export const addManager = (data) => {
    const url = '/manager/addManager'
    return http.post(url, data)
}

export const allManager = () => {
    const url = '/manager/allManager'
    return http.post(url)
}


export const updateManager = (data) => {
    const url = '/manager/updateManager'
    return http.post(url, data)
}


