import React from 'react';
import * as Scroll from 'react-scroll'
const { Element } = Scroll;
import Card from './Card'
import '../styles/MainPage.css'



export default function MainPage({ camisetas }) {

    return (
        <>
            <Element name='inicio'>
                <section className='bk'>
                    <h1>TUFCLASICAS</h1>
                    <div className="containerMP">
                        {camisetas.map(({ id, img }) => (
                            <Card key={id} img={img} />
                        ))}
                    </div>
                </section>
            </Element>
        </>
    )
}