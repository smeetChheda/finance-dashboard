import React, { useCallback } from 'react';
import "../App.css";

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';

import PieChartIcon from "../assets/svg-icons/graph-pie.svg";
import BarChartIcon from "../assets/svg-icons/graph-bar.svg";
import LineChartIcon from "../assets/svg-icons/graph-line.svg";
import GreenRightArrow from "../assets/svg-icons/right-arrow.svg";

export default function LandingPage() {
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

    const particlesInit = useCallback(async (engine) => {
        await loadLinksPreset(engine);
        await loadFull(engine);
    }, [])

    return (
        <div className="px-[40px]  h-screen flex flex-row flex-wrap justify-center items-center bg-transparent"> {/* page container */}
            <Particles options={tsParticlesOptions} init={particlesInit} />
            <div className="pl-2 flex-auto basis-2/3"> {/* Text */}
                <h1 className="text-9xl">
                    Welcome to your Finance Dashboard
                </h1>
                <h3 className="w-1/2 text-3xl">
                    This tool will extract your bank balance and transactions in real time
                    and display it in a meaningful way.
                </h3>
            </div>
            <div className="flex items-center flex-none basis-1/3">
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
                        <button className="group flex flex-row gap-6 items-center h-max w-full px-[50px] text-white-2 text-5xl py-5 rounded-full bg-black shadow-xl transition ease-in-out duration-150
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