import React from 'react';

import styles from './MomentsPage.less'

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Moments from '../../components/Moments/Moments';


const MomentsPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._Footer }>
                <Footer />
            </div>
            <div className={ styles._Moments }>
                <Moments/>
            </div>
        </div>
    );

    
        
}

export default MomentsPage;