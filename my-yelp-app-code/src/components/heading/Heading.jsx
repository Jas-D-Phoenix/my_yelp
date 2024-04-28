import React from 'react';
import NavBar from '../Header/NavBar';
import "./HeadingStyle.scss";

const Heading = ({signOut}) => {
  return (
    <section className='heading'>
        <div><NavBar signOut={signOut} /></div>
       <div className='heading-content'>
        <div>
        <h1>MY YELP RESTAURANT</h1>
        </div>
       </div>
    </section>
  )
}

export default Heading