import React from 'react';
import { connect } from 'dva'

import styles from './AdminPage.less'

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Admain from '../../components/Admin/Admin';


const IndexPage = (props) => {
    console.log(props)
    return (
        <div className={ styles.bgIndex }>
            <Navbar/>
            <div className={ styles._Footer }>
                <Footer />
            </div>
           <div className={ styles._Admin }>
               { props.users.userNow.username === 'arrow' ? <Admain/> : "抱歉，您没有权限管理！" }
           </div>
           
        </div>
    );

    
        
}

export default connect((props) => (props))(IndexPage);