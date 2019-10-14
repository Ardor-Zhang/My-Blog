import React from 'react';

import styles from './ArticlePage.less'

import Navbar from '../../components/Navbar/Navbar';
import Article from '../../components/Article/Article';
import Footer from '../../components/Footer/Footer';

const IndexPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._Footer }>
                <Footer />
            </div>
           <div className={ styles._Article }>
               <Article/>
           </div>
        </div>
    );

    
        
}

export default IndexPage;