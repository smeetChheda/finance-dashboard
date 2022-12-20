import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';

import ExitIcon from "../assets/svg-icons/exit.svg";

import { UserContext } from '../components/UserContext';
import Sidebar from '../components/Sidebar';
import ChartModule from '../components/ChartModule';

const tsParticlesOptions = {
    preset: "links",
    fullScreen: {
        enable: true,
        zIndex: -10,
    },
    background: {
        color: 'white'
    },
    particles: {
        color: ['#212529', '#468faf'],
        links: {
            enable: true,
            distance: 150,
            color: ["#212529", '#468faf'],
            opacity: 0.4,
            width: 2
        }
    },
    
};

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const { token, user, balance, setBalance, setUser, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    if (localStorage.getItem('access') === 'null' || !localStorage.getItem('access'))
        localStorage.setItem('access', token);


     /* Initialize animated background */
    const particlesInit = useCallback(async (engine) => {
        await loadLinksPreset(engine);
        await loadFull(engine);
    }, [])

    const getBalance = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/balance/" + token,{});

        const data = await res.json();
        console.log(data.Balance);
        setBalance(data);
        setLoading(false);
    }, [token, setBalance])
    
    const getIdentity = useCallback(async ()=> {
        const res = await fetch("/api/identity/" + token, {});

        const accountsArray = await res.json();
        
        setUser(accountsArray[0].owners[0].names[0]);
        setLoading(false);
    }, [token, setUser, setLoading]);

    useEffect(() => {
        if (!user) {
            setLoading(true);
            getIdentity();
        }

        if (!token) {
            setToken(localStorage.getItem('access'));
        }

    }, [user, setLoading, getIdentity, token, setToken]);

    const getTransactions = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/transactions/" + token, {});

        const data = await res.json();
        console.log(data);
        setLoading(false);
    }, [token, setLoading])

    return (
        <div className="flex flex-row flex-nowrap bg-transparent">
            <Particles options={tsParticlesOptions} init={particlesInit} />
            <Sidebar />
            <div className="flex flex-col grow">
                <div className="h-min m-8 pt-3 border-solid border-b-2 border-gray-light-2 bg-white rounded-xl shadow-xl flex flex-row justify-between items-center">
                    <h1 className="text-5xl leading-[0px] font-[550] text-blue-1 text-opacity-60  pl-6 w-min">
                        Home 
                    </h1>
                    <button onClick={() => navigate("/")} disabled = {loading} className="w-[50px] h-[40px] flex justify-center items-center bg-gradient-to-b from-white to-gray-light font-semibold mr-6 mb-4 rounded-full border-1 text-gray-dark border-blue-1 shadow-lg text-gray-dark-2 hover:scale-110 duration-200">
                        <img src={ExitIcon} className="h-5 w-auto absolute" alt=""></img>
                    </button>
                </div>
                <div className="flex grow m-8 border-solid border-y-2 border-gray-light-2 rounded-xl shadow-xl rotate-180">
                    <div className="rotate-180 bg-gradient-to-b from-white via-white-2 to-transparent grow grid divide-white grid-rows-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2">
                        <div className="p-6 flex flex-col flex-nowrap">
                            <h1 className="h-min font-anek text-4xl text-wrap shrink font-semibold text-blue-1 text-opacity-60 mb-2 ">
                                Welcome, {user}
                            </h1>
                            <p className="text-xl max-width-full text-wrap text-gray-dark-2">
                                Take a look at all your balance overview. You currently have XXXX in your XXXX account, and XXXX in your XXXX acount.
                            </p>
                            <div className="flex grow flex-row gap-3 justify-center items-center">
                                <ChartModule>
                                    
                                </ChartModule>
                                <ChartModule>
                                    
                                </ChartModule>
                            </div>
                             <button onClick={() => getBalance()} disabled = {loading} className="w-[160px] h-[40px] my-2 bg-white mr-6 rounded-full border-2 border-gray-light shadow-lg text-gray-dark-2 hover:scale-110 duration-200">
                                Get Balance
                            </button>
                            {/*{balance.accounts} */}

                        </div>
                        <div className="p-6 flex flex-col flex-nowrap">
                            <h1 className="h-min font-anek text-4xl text-wrap shrink font-semibold text-blue-1 text-opacity-60 mb-2 ">
                                Recent Transactions
                            </h1> 
                            <button onClick={() => getTransactions()} disabled = {loading} className="w-[160px] h-[40px] bg-white mr-6 rounded-full border-2 border-gray-light shadow-lg text-gray-dark-2 hover:scale-110 duration-200">
                                Refresh
                            </button>
                        </div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}