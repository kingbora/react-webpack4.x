/**
 * Created by wenbo.kuang on 2018/9/5
 */
export module UTIL {
    export function getRequest(options: any) {
        const _default = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            timeout: 20000
        };
    }
}