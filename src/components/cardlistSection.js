import React from 'react'
import Card from './Card'
import gift from '../images/landing/gift.svg';
import present from '../images/landing/present.svg';
import flat from '../images/landing/flat.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CardlistSection() {
    AOS.init({
        duration: 2000,
        
    })

    return (
        <section className='mt-5 mb-5' >
             <div className=' container cardTitle'>
                <h4>A whole new way to gift,</h4>
                <h4>when it matters</h4>
                <div assName='mt-5' data-aos="fade-left">
                    <p> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum</p>
                    <p> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem </p>
                    <p> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
                </div>
               <div className='row mt-4' data-aos="fade-left">
                    <div className='col-sm'>
                    <Card image={gift}
                            title='Easiet way'
                            content ='We take the guesswork out of registering with handy tools like our checklist and your registry advisor'
                            />
                    </div>
                    <div className='col-sm'>
                    <Card image={present} 
                    title='Our Store has it all'
                    content ='We are the only place with classic and unique wedding gifts,giftcards and Honeymoon funds all in one'
                    />
                    </div>
                    <div className='col-sm'>
                    <Card image={present} 
                    title='Smarter Exchanges'
                    content ='You can exchange gift before they ship to save ton of times (without guest finding out).'
                    />
                    </div>
                    <div className='col-sm'>
                    <Card image={flat} 
                    title='Smarter Exchanges'
                    content ='You can exchange gift before they ship to save ton of times (without guest finding out).'
                    />
                    </div>

               </div>
            </div>
        </section>
    )
}

export default CardlistSection
