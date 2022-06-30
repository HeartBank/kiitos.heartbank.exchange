import { SANDBOX } from './private/credentials.mjs';

let socket;

export function startWebSocket() {
    socket = new WebSocket("wss://ws-feed.exchange.coinbase.com");
    socket.onopen = event => subscribe();
    socket.onmessage = event => console.log(event);
    socket.onclose = event => console.log('closed');
    socket.onerror = event => console.error(event);
}

function subscribe() {
    socket.send({
        "type": "subscribe",
        "product_ids": [
            "ETH-USD",
            "ETH-EUR"
        ],
        "channels": [
            "level2",
            "heartbeat",
            {
                "name": "ticker",
                "product_ids": [
                    "ETH-BTC",
                    "ETH-USD"
                ]
            }
        ]
    });
}

function login() {
    const cb_access_timestamp = Date.now() / 1000;    
    const message = cb_access_timestamp + method + path + body;
    const cb_access_sign = btoa(CryptoJS.HmacSHA256(message, atob(SANDBOX.kiitos.secret)).toString());

    socket.send({
        "type": "subscribe",
        "product_ids": [
            "BTC-USD"
        ],
        "channels": [
            "full"
        ],
        "signature": cb_access_sign,
        "key": SANDBOX.kiitos.key,
        "passphrase": SANDBOX.kiitos.passphrase,
        "timestamp": cb_access_timestamp
    });
}