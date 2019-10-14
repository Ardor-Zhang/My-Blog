import React from 'react';

import styles from './IndexPage.less'

import Navbar from '../../components/Navbar/Navbar';
import Share from '../../components/Share/Share';
import Footer from '../../components/Footer/Footer';
import SignInLogIn from '../../components/SignInLogIn/SignInLogIn';

const IndexPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._share }>
                <Share /> 
            </div>
            <div className={ styles._SignInLogIn }>
                <SignInLogIn/>
            </div>
            <div className={ styles._Footer }>
                <Footer />
            </div>
            <div className={ styles.fight }>
                <span className={ styles.hingle1 }>
                    <span>I</span>
                </span>
                <span className={ styles.hingle2 }>
                    <span>WILL</span>
                </span>
                <span className={ styles.hingle3 }>
                    <span>FIGHT</span>
                </span>
                <span className={ styles.hingle4 }>
                    <span>FOREVER!</span>
                </span>
            </div>
        </div>
    );

    
        
}

export default IndexPage;