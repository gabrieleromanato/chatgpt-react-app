import axios from "axios";

const APIURL = 'http://localhost:8080/v1/';

export async function doLogin(data) {
    try {
        const resp = await axios.post(`${APIURL}login`, data);
        return resp.data;
    } catch(err) {
        return { error: err.message };
    }
}

export async function sendQuestion(text) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    const data = {
        question: text
    };
    try {
        const resp = await axios.post(`${APIURL}question`, data, config);
        return resp.data;
    } catch(err) {
        return { error: err.message };
    }
}