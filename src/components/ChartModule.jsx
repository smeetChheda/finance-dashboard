import React from 'react';

export default function ChartModule(props) {

    return(
        <div className={`${props.width ? props.width : 'w-[80%]'} h-full rounded-xl shadow-xl bg-white-2`}>
            {props.children}
        </div>
    )
}