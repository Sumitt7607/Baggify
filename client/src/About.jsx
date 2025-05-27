import React from 'react'
import Footer from './Footer'
import myimage from "./assets/Ceo.jpg"
import {useGSAP} from '@gsap/react'

import gsap from 'gsap'
import {scrollTrigger} from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(scrollTrigger)
function About() {
    useGSAP(()=>{
        gsap.to('.image-ceo',{
            x:-400,
            duration:2,
            delay:1,
       
          scrollTrigger:{
            trigger: '.image-ceo',
  start: "top 80%", // Start animation when the element is 80% visible
  end: "bottom 20%", // End animation when the element is 20% visible
  scrub: 1, // Smooth scrolling effect
  markers: true

          }
          
        })
        gsap.to('.founder',{
            y:-350,
            x:200,
            duration:1,
            delay:3,
            
        })
    })
  return (
    <>
    <div>
      <center className='About-body' >
        <h1>ABOUT US</h1>
        <p>Welcome to BAGGIFY, where shopping meets convenience!
We are an innovative e-commerce platform dedicated to providing high-quality products at unbeatable prices. Our mission is to make online shopping effortless, enjoyable, and accessible to everyone. With a curated selection of top-tier brands and unique finds, we ensure that every purchase delivers satisfaction. Whether you're searching for fashion, electronics, home essentials, or gifts, we've got you covered!
At <b>#BAGGIFY</b>, customer experience is at the heart of everything we do. Our secure payment system, fast shipping, and responsive support team guarantee a hassle-free shopping journey. Join our growing community of shoppers and explore a world of possibilities, all from the comfort of your home.
Would you like to tailor this further to match your brand identity and values?
<p>Let me know how I can refine it! </p>
</p>

 <h1> UNIQUE SELLING PROPOSITION (USP)</h1>
 <h3>- Wide Product Selection: Thousands of brands and trending items.
</h3>
<h3>- Secure Transactions: Advanced encryption for safe shopping.
</h3>
<h3>   - Fast Shipping: Reliable delivery services.
</h3>
<h3>- Excellent Customer Support: Dedicated assistance for seamless shopping experiences.
</h3>
<br />
<br />
<h1>Company Overview</h1>
<img className='image-ceo' src={myimage} alt="" srcset="" />
<div className='founder'>
    
   <h3>We are committed to evolving, 
    introducing smarter shopping
    <h3>and maintaining our high standards.</h3>
    <h3> The journey continues, and we’re thrilled to have you with us!" </h3></h3>   
     Sumit kushwaha
   <p > (Founder)</p>
</div>
      </center>
    </div>
    <Footer></Footer>
    </>
  )
}

export default About
