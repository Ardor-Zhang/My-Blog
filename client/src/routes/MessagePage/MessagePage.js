import React from 'react';

import styles from './MessagePage.less'

import Navbar from '../../components/Navbar/Navbar';
import Message from '../../components/Message/Message';
import Footer from '../../components/Footer/Footer';

const IndexPage = (props) => {

    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._Footer }>
                <Footer />
            </div>
           <div className={ styles._Message }>
               <Message/>
           </div>
        </div>
    );

    
        
}

export default IndexPage;