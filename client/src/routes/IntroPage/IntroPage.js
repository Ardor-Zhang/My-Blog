import React from 'react';

import styles from './IntroPage.less'

import Navbar from '../../components/Navbar/Navbar';
import Intro from '../../components/Intro/Intro';

const IndexPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
           <div className={ styles._Intro }>
               <Intro/>
           </div>
        </div>
    );

    
        
}

export default IndexPage;