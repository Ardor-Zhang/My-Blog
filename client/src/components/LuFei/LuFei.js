import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { withRouter } from 'dva/router'

import styles from './LuFei.less'

const LuFei = ({ where }) => {
    return (
        <div className={ styles.lufei }>
            <a href="https://blog.csdn.net/qq_41800366">
                <img src={ require(`../../assets/img/lufei_0${where+1}.jpg`) } alt=""/>
            </a>
        </div>
    );
};

LuFei.propTypes = {
    where : PropTypes.number.isRequired
};

export default connect( ({where} ) => ( where ) )( withRouter(LuFei) );