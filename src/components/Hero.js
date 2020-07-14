import React from 'react'
import Banner from './Banner'

export default function Hero({hero}) {
    return <header className={hero}>
        <Banner/>
    </header>
}
Hero.defaultProps = {
    hero : 'defaultHero'
}

