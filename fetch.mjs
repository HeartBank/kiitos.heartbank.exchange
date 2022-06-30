import { SANDBOX } from './private/credentials.mjs';

const TEST = true;
const domain = TEST ? "https://api-public.sandbox.exchange.coinbase.com" : "https://api.exchange.coinbase.com";

export async function getData(path='/', data={}) {
    const query = new URLSearchParams(data);

    return fetch(domain + path + '?' + query, {
        method: 'GET',
        headers: createHeaders('GET', path, query)
    }).then(response => response.json()).catch(error => console.error(error));    
}

export async function postData(path='/', data={}) {
    const body = JSON.stringify(data);

    const response = await fetch(domain + path, {
        method: 'POST', 
        headers: createHeaders('POST', path, body),
        body
    });
    
    return response.json();
}

function createHeaders(method, path, body) {
    const cb_access_timestamp = Date.now() / 1000;    
    const message = cb_access_timestamp + method + path + body;
    const cb_access_sign = btoa(CryptoJS.HmacSHA256(message, atob(SANDBOX.kiitos.secret)).toString());

    return {
        'Accept': 'application/json',
        'CB-ACCESS-KEY': SANDBOX.kiitos.key,
        'CB-ACCESS-SIGN': cb_access_sign,
        'CB-ACCESS-TIMESTAMP': cb_access_timestamp,
        'CB-ACCESS-PASSPHRASE': SANDBOX.kiitos.passphrase
    };
}