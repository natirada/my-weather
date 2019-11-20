import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dataservice.accuweather.com/',
    params: {
        apikey: 'ItHczBnBAjcPcjRSCeS4AqcbLGDFAHvq'
    }
});


export default instance;
