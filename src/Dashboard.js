import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from "react-plaid-link";
import "./App.css";
let etoken = null;
export default function Dashboard() {
    const [token, setToken] = useState(null);
    const [linked, setLinked] = useState(false);
    const [loading, setLoading] = useState(true);

    const onSuccess = useCallback(async (publicToken) => {
        setLoading(true);
        const res = await fetch("api/exchange_public_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_token: publicToken })
        });
        const data = await res.json();
        etoken = data.token;
        setLoading(false);
        setLinked(true);
        console.log("hi")
    }, [setLoading, setLinked]);

    /* Create the link token */
    const createLinkToken = useCallback(async ()=>{
        const response = await fetch("/api/create_link_token", {}).catch(err => console.log(err));
        const data = await response.json();
        setToken(data.link_token);
        localStorage.setItem("link_token", data.link_token);
    }, [setToken]);

    const config = {
        token,
        onSuccess
    };

    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        if (token==null)
            createLinkToken();
    }, [token]);

    const getBalance = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/balance/" + etoken,{});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    })

    const getTransactions = useCallback(async () => {
        setLoading(true);
        const res = await fetch("api/transactions/" + etoken, {});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    })

    return (
        <div>
            {
                !linked &&
                    <button onClick={() => open()} disabled={!ready}>
                        Link
                    </button>
            }
            {
                linked && !loading &&
                (
                <div> 
                    <button onClick={() => getBalance()} disabled={loading}>
                        Get Balance
                    </button>

                    <button onClick={() => getTransactions()} disabled={loading}>
                        Get Transactions
                    </button>
                </div>
                )


            }
            
        </div>
    )


}