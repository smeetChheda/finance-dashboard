import React, { useState } from 'react';
import RightArrowIcon from "../assets/svg-icons/right-arrow-plain.svg";
import LineChartIcon from "../assets/svg-icons/graph-line.svg";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className = {`${sidebarOpen ? 'w-72': 'w-20'} p-[20px] duration-300 h-screen relative bg-gray-light shadow-2xl flex justify-start items-start`}>
            <img alt="" src={RightArrowIcon} onClick={()=>setSidebarOpen(!sidebarOpen) } className = {`${sidebarOpen ? 'rotate-180 -right-4' : '-right-6'} w-10 h-10 z-10 absolute 
                    top-8 duration-200 hover:cursor-pointer hover:scale-110 ${sidebarOpen ? 'hover:-translate-x-3' : 'hover:translate-x-3'}`} />
            {SidebarItem(LineChartIcon, 'FINANCE DASHBOARD', "/dashboard", sidebarOpen)}
        </div>
    )
}

function SidebarItem(icon, label, redirect, sidebarOpen) {
    return (
        <div className="flex flex-row flex-wrap items-center gap-3 py-6 w-full ease-in-out duration-200 hover:scale-110 hover:cursor-pointer hover:bg-white-3">
            <img src={icon} alt="" className="h-8 w-8"/>
            <span className = {`font-extrabold w-min text-left duration-100 ${sidebarOpen ? '' : 'scale-0 h-0'}`}>{label}</span>
        </div>
    )
}