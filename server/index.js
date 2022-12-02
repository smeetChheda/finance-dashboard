/**
 * @file    index.js
 *          This is the entry point for the backend server
 * @author  Smeet Chheda
 * @date    November 2022
 */

const express = require('express');
const { Configuration, PlaidApi, PlaidEnvironments, Products } = require('plaid');

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const PORT = 4090;

/* Set up backend server */
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(process.env.PLAID_CLIENT_ID);
});

app.get("/", (req, res)=> {
    res.send("test")
})

/* Set up plaid config */
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
    ',',
);

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
    ',',
);

const config = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET
        }
    }
});

const client = new PlaidApi(config);

/* Create a link token and return it to client side */
app.get("/api/create_link_token", async (req, res, next) => {
    const tokenResponse = await client.linkTokenCreate({
        user: { client_user_id: '123-test-id' },
        client_name: "Smeet Chheda",
        language: "en",
        products: PLAID_PRODUCTS,
        country_codes: PLAID_COUNTRY_CODES,
    }).catch((e)=>console.error(e.response.data));
    res.json(tokenResponse.data);
});

/* Above returns public token, need to exchange for access token */
app.post("/api/exchange_public_token", async (req, res, next) => {
    const exchangeResponse = await client.itemPublicTokenExchange({
        public_token: req.body.public_token,
    });

    res.json({
        token: exchangeResponse.data.access_token,
    });
});

/* Fetches balance */
app.get(/^\/api\/balance\/.*$/, async (req, res, next) => {
    const access_token = (req.url.split("/"))[3]
    const balanceResponse = await client.accountsBalanceGet({ access_token }).catch((e) => {debugger;});
    res.json({
        Balance: balanceResponse.data,
    });
});

/* Fetches transactions */
app.get(/^\/api\/transactions\/.*$/, async (req, res, next) => {
    let cursor = null;
    let added = [];
    let modified = [];

    let removed = [];
    let hasMore = true;

    while (hasMore) {
        const request = {
            access_token: (req.url.split("/"))[3],
            cursor: cursor,
        }

        const response = await client.transactionsSync(request);
        const data = response.data;
        added = added.concat(data.added);
        modified = modified.concat(data.modified);
        removed = removed.concat(data.removed);

        hasMore = data.has_more;

        cursor = data.next_cursor;
    }

    const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
    // Return the 8 most recent transactions
    const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
    res.json({latest_transactions: recently_added});
})