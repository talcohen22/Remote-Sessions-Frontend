import axios from "axios"

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

export const codeService = {
    query,
    getById,
    edit
}

async function query() { //return all the codes from db
    try {
        const codes = await axios.get(`${BASE_URL}code`)
        return codes.data
    } catch (err) {
        console.log('Cannot get codes', err)
        throw err
    }
}

async function getById(codeId) { //return the relevant codes from db
    try {
        const code = await axios.get(`${BASE_URL}code/${codeId}`)
        return code.data
    } catch (err) {
        console.log('Cannot get code', err)
        throw err
    }
}

async function edit(code) { //update the relevant code in db and returns it
    try {
        const updateCode = await axios.put(`${BASE_URL}code/${code._id}`, code)
        return updateCode.data
    } catch (err) {
        console.log('Cannot update code', err)
        throw err
    }
}