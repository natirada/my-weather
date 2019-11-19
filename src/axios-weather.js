import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dataservice.accuweather.com/',
    params: {
        apikey: 'EDoXcIUtqNmGbRlLbqNReSUUtgmnUHt0'
    }
});


export default instance;