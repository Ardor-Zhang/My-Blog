import React from 'react';

import styles from './LifePage.less'

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Life from '../../components/Life/Life';


const IndexPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._Footer }>
                <Footer />
            </div>
           <div className={ styles._Admin }>
               <Life/>
           </div>
        </div>
    );

    
        
}

export default IndexPage;