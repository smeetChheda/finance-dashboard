import React, { useState, useContext, useCallback } from 'react';
import "../App.css";

import { UserContext } from '../components/UserContext';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const { token } = useContext(UserContext);

    const getBalance = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/balance/" + token,{});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    }, [token])

    const getTransactions = useCallback(async () => {
        setLoading(true);
        const res = await fetch("api/transactions/" + token, {});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    }, [token])

    return (
        <div>
            {token}
            <button onClick={() => getBalance()} disabled={loading}>
                Get Balance
            </button>
            <button onClick={() => getTransactions()} disabled={loading}>
                Get Transactions
            </button>
        </div>
    )


}