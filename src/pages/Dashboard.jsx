import React, { useState, useContext, useCallback, useEffect } from 'react';
import "../App.css";

import { UserContext } from '../components/UserContext';
import Sidebar from '../components/Sidebar';
import PlaidHandle from '../components/PlaidHandle';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const { token, user, balance } = useContext(UserContext);

    var plaid;

    const getBalance = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/balance/" + token,{});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    }, [token])

    const getTransactions = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/transactions/" + token, {});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    }, [token])

    useEffect(() => {
        if (!plaid)
            plaid = new PlaidHandle();
    }, [plaid, PlaidHandle]);

    return (
        <div className="flex flex-row flex-wrap bg-white-2">
            <Sidebar />
            <div className="flex flex-col grow">
                <div className="h-min m-8 border-solid border-b-2 border-gray-light-2 rounded-xl shadow-xl flex flex-row justify-between items-center">
                    <h1 className="text-6xl font-[550] text-gray-dark-2 pb-6 pl-6 w-min">
                        Home
                    </h1>
                    <button onClick={() => plaid.getBalance()}className="w-[160px] h-[40px] dropdown-toggle bg-white-3 mr-6 rounded-full border-2 border-gray-light shadow-lg text-gray-dark-2 hover:scale-110 duration-200">
                        Logout
                    </button>
                </div>
                <div className="flex grow m-8 border-solid border-y-2 border-gray-light-2 rounded-xl shadow-xl rotate-180">
                    <div className="rotate-180 grow grid divide-y divide-x divide-white grid-rows-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2">
                        <div className="p-6">
                            <h1 className="h-min text-7xl text-wrap shrink font-semibold text-gray-dark-2">
                                Welcome, {user || 'Smeet'}.
                            </h1>
                            {balance}
                        </div>
                        <div>
                            test
                        </div>
                        <div>
                            test
                        </div>
                        <div>
                            test
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}