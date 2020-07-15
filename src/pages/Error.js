import React from 'react';
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';


export default function Error() {
    return (
        <Hero hero='defaultHero'>
           <h1 title=' 404' subtitle='Page not Found '>
            <Link to='/' className='btn btn-primary'> Return Home</Link>
            </h1>
        </Hero>
    )
}
