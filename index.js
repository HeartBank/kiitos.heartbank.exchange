import { getData, postData } from './fetch.mjs';
import { startWebSocket } from './websocket.mjs';

window.onload = async () => {
    // console.log(await postData('/orders', {
    //     price: '1.0',
    //     size: '1.0',
    //     side: 'buy',
    //     product_id: 'BTC-USD'
    // }));

    startWebSocket();
}