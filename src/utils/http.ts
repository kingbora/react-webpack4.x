/**
 * Created by wenbo.kuang on 2018/9/5
 */
import axios from 'axios';

const defaultConfig = {
    timeout: 3000,
};

let instance: any = axios;

class Axios {
    constructor(props?: any) {
        if (props && typeof props === 'object') {
            instance = axios.create(props);
        } else {
            instance = axios.create(defaultConfig);
        }

        //拦截request
        instance.interceptors.request.use((config: any) => {
            return config;
        }, (error: any) => {
            console.log(error);
            return Promise.reject(error);
        });

        //响应结果
        instance.interceptors.response.use((response: any) => {
            return response;
        }, (error: any) => {
            console.log(error);
            return Promise.reject(error);
        });

    }

    async send(config: any) {
        try {
            return await instance.request(config);
        } catch (e) {
            throw new Error(e);
        }
    }

    getRequest(url: string, method = 'GET', param: any, config = {}) {
        return Object.assign(config, {
            method: method,
            withCredentials: true,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            params: method.toUpperCase() === "POST" ? null : param,
            data: method.toUpperCase() === "GET" ? null : param,
            url: url
        });
    }
}

const Instance = new Axios();
export default Instance;