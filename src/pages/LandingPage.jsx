import React, { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

import { usePlaidLink } from 'react-plaid-link';

import { UserContext } from '../components/UserContext';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';

import { TypeAnimation } from 'react-type-animation';

import PieChartIcon from "../assets/svg-icons/graph-pie.svg";
import BarChartIcon from "../assets/svg-icons/graph-bar.svg";
import LineChartIcon from "../assets/svg-icons/graph-line.svg";
import GreenRightArrow from "../assets/svg-icons/right-arrow.svg";

const tsParticlesOptions = {
    preset: "links",
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    background: {
        color: 'white'
    },
    particles: {
        color: ['#212529'],
        links: {
            enable: true,
            distance: 150,
            color: "#212529",
            opacity: 0.4,
            width: 1
        }
    },
    
};

export default function LandingPage() {
    const { token, setToken } = useContext(UserContext); /* Will contain plaid token as it evolves from link->access_token */
    const navigate = useNavigate();

    /* Initialize animated background */
    const particlesInit = useCallback(async (engine) => {
        await loadLinksPreset(engine);
        await loadFull(engine);
    }, [])

    /* Function executed when component mounted. Creates link token with plaid API */
    const createLinkToken = useCallback(async ()=> {
        const responseData = await (await fetch("/api/create_link_token", {})).json();
        setToken(responseData.link_token);
    }, [setToken]);

    /* Callback executed once link token exchanged for public token via bank creds. Exchanges public token for access_token */
    const onSuccess = useCallback(async (public_token) => {
        const response = await fetch("api/exchange_public_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_token: public_token })
        });
        const data = await response.json();
        setToken(data.token);
        navigate("/dashboard");
    }, [setToken, navigate]);

    const { open: openPlaidLogin } = usePlaidLink({ token, onSuccess });

    /* Create the link token if it doesn't exist yet. This will kick start login flow. */
    useEffect(() =>{
        if (token==null)
            createLinkToken();
    }, [token, createLinkToken]);

    return (
        <div className="px-[40px]  h-screen flex flex-row flex-wrap justify-center items-center bg-transparent"> {/* page container */}
            <Particles options={tsParticlesOptions} init={particlesInit} /> {/* Animated Background */}
            <div className="pl-2 flex-auto basis-2/3"> {/* Text Container */}
                <TypeAnimation 
                    sequence={['Welcome to your Finance Dashboard.']}
                    speed={80}
                    wrapper="h1"
                    className="text-9xl"
                    cursor={false}
                />
                <TypeAnimation 
                    sequence={['', 1000, 'This tool will extract your bank balance and transactions in real time and display it in a meaningful way.']}
                    speed={80}
                    wrapper="h3"
                    className="w-1/2 text-3xl"
                    cursor={true}
                />
            </div>
            <div className="flex items-center flex-none basis-1/3"> {/* Login Dialogue container */}
                <div className="h-[60vh] w-[30vw] px-[20px] py-[100px] bg-white rounded-3xl shadow-2xl flex flex-col"> {/* Login Dialogue */}
                    <h2 className="basis-1/4 text-5xl text-center">
                        Connect your bank account and get started.
                    </h2>
                    <div className="basis-1/4 flex flex-row flex-wrap justify-center py-[50px] gap-[50px]">
                        <img src={PieChartIcon} alt=""/>
                        <img src={BarChartIcon} alt=""/>
                        <img src={LineChartIcon} alt=""/>
                    </div>
                    <div className="basis-1/2 flex items-center justify-center px-6">
                        <button onClick={() => openPlaidLogin()} className="group flex flex-row gap-6 items-center h-max w-full px-[50px] text-white-2 text-5xl py-5 rounded-full bg-black shadow-xl transition ease-in-out duration-150
                        hover:scale-105 hover:shadow-2xl hover:bg-white-2 hover:text-gray-dark-3">
                            <span className="origin-center transition ease-in-out duration-700 group-hover:translate-x-3">Connect</span>
                            <img className="origin-center transition ease-in-out duration-700 group-hover:translate-x-[250%]" src={GreenRightArrow} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}