import React from 'react';
import { connect } from 'dva';

import styles from './ArticleDetailPage.less';

import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';

const ArticleDetailPage = (props) => {
    return (
        <div className={ styles.bgIndex }>
           <ArticleDetail {...props}/>  
        </div>
    );
}

export default connect((props) => (props))(ArticleDetailPage);