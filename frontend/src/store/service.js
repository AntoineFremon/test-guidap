import axios from 'axios';

export default {
    getActivities,
    getLeisures
};

async function getActivities() {
    const response = await axios.get(`${import.meta.env.VITE_API_ADDRESS}/activities`);
    return response.data.activities;
}

async function getLeisures(pageSize, offset, activityId, inputText) {
    let query = `${import.meta.env.VITE_API_ADDRESS}/leisures?pageSize=${pageSize}&offset=${offset}`;
    if (activityId) {
        query += `&activityId=${activityId}`;
    }

    if (inputText) {
        query += `&search=${inputText}`;
    }

    const response = await axios.get(query);
    return response.data.leisures;
}
