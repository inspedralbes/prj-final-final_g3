import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

let env = process.env.NEXT_PUBLIC_ENV.toLowerCase();

if(env === 'development'){
    axios.baseURL = process.env.NEXT_PUBLIC_API_DEV_URL;
}else if(env === 'production'){
    axios.baseURL = process.env.NEXT_PUBLIC_API_PROD_URL;
}




const comManager = {

}

export default comManager;