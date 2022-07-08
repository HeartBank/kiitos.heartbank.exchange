import CoinbasePro from "coinbase-pro";
import { SANDBOX, PORTFOLIOS } from "./private/credentials.mjs";

export function getClient(portfolio=null, test=true) {
    if (portfolio) {
        const apiURI = test ? 'https://api-public.sandbox.pro.coinbase.com' : 'https://api.pro.coinbase.com';
        const credentials = test ? SANDBOX : PORTFOLIOS;
        const { key, secret, passphrase } = credentials[portfolio];
        return new CoinbasePro.AuthenticatedClient(key, secret, passphrase, apiURI);
    } else {
        return new CoinbasePro.PublicClient();
    }
}