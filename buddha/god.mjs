/* TODO:
1. when safemoon is listed on coinbase: transfer all over and convert to eth or btc
- get coinbase data over weekend for monday trading of SQ ?
2. or just wait until tda allow crypto trading; then use the same app to do auto trading
- transfer all crypto to tda 
- good because it's all under the llc!

Market API
- public
- We throttle public endpoints by IP: 1
  0 requests per second, up to 15 requests per second in bursts. 
  Some endpoints may have custom rate limits.

Trade API
- private
- We throttle private endpoints by profile ID: 15 requests per second, up to 30 requests per second in bursts. 
  Some endpoints may have custom rate limits.
  The /fills endpoint has a custom rate limit of 10 requests per second, and up to 20 requests per second in bursts.
- Profiles are the equivalent of portfolios on the Coinbase Exchange website. The maximum number of profiles is 25.
- To access data or actions on a different profile, create a new API key on the Coinbase Exchange website.

FIX APIs: standardized rest for trading softwares
The FIX API throttles the number of incoming messages to 50 commands per second, and up to 100 messages per second in bursts. 
A maximum of 7 connections can be established per profile.

*/

import { sendMail } from "./mail.mjs";

export async function kiitos(client) {
  const date = new Date((await client.getTime()).iso).toLocaleString();
  console.info(date)
  sendMail("Hello World", date);
}