import React from 'react';
import { NavLink } from 'dva/router';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import styles from './Navbar.less'

const Navbar = ({dispatch}) => {
    const navData = [
        { text: 'Home', url: '/home' , id: 0},
        { text: 'Moments', url: '/moments', id: 1 },
        { text: 'Article', url: '/article', id: 2 },
        { text: 'Message', url: '/message', id: 3 },
        { text: 'Life', url: '/life', id: 4 },
        { text: 'Introduction', url: '/intro', id: 5 },
        { text: 'Admin', url: '/admin', id: 6 },
    ]

    const clikcRouter = (id) => {
        dispatch({ type:"where/WHERE", payload: id })
    }

    return (
        <nav>
            <h1 className={styles.logo}>Arrow - Blog</h1>
            <div className={styles.search}>
                <div className={styles.searchIcon} onClick={() => {  // 点击时对搜索框进行处理  清空 获取焦点
                    document.getElementsByClassName('_searchInput')[0].value = ''
                    document.getElementsByClassName('_searchInput')[0].focus()  // 仔细一看less文件就懂了
                }}>
                    <i className='icon-search iconfont'></i>
                </div>
                <input type='text' className='_searchInput' placeholder='SEARCH' /> 
            </div>
            <ul>
                {
                    navData.map( item => (
                        <li key={ item.id } onClick={ () => clikcRouter(item.id) }>
                            <NavLink activeClassName={ styles.active } to={ item.url }>{ item.text }</NavLink>
                        </li>
                        )
                    )
                }
            </ul>
        </nav>
    )
}

export default connect()(withRouter(Navbar))