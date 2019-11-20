import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dataservice.accuweather.com/',
    params: {
        apikey: 'Z4KPevJp0MDfG0b5GDxnJPnda24ExpSS'
    }
});


export default instance;