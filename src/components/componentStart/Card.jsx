import React from 'react'
import '../styles/MainPage.css'


export default function Card({ img }) {
    return (
        <>
            <div className="cardd">
                <div className="camisa">
                    <img src={img} />
                </div>
            </div>
        </>
    )
}