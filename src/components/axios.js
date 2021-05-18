import axios from 'axios';

const devHost = 'https://npiregistry.cms.hhs.gov/';

const baseURL = devHost + 'api' ;

const axiosInstance = axios.create({
	baseURL: 'https://npiregistry.cms.hhs.gov/',
    crossdomain: true ,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
        'Access-Control-Allow-Origin':'*',
        crossdomain: true ,
        'Access-Control-Allow-Methods':'GET'
	},
});

export default axiosInstance;