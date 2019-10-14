import React from 'react';
import styles from './Share.less';
import { connect } from 'dva';

const Share = () => {
    const operations = [
        { url: 'https://blog.csdn.net/qq_41800366', text: '前往CSDN', icon: 'icon-wenti' },
        { url: 'https://github.com/OliverZhangBo', text: 'GitHub', icon: 'icon-github' },
        { url: "", text: '分享到微博', icon: 'icon-weibo' },
        { url: "", text: '分享QQ空间', icon: 'icon-qqkongjian' },
        { url: 'http://wpa.qq.com/msgrd?v=3&uin=921095267&site=qq&menu=yes', text: '随时打扰！共同进步！', icon: 'icon-weixin' }
    ]

    return ( 
            <ul className={ styles.share }>
                {
                    operations.map((item, index) => (
                        <li key={ index } >
                            <i className={ `iconfont  ${ item.icon }` }></i>
                            <a href={ item.url }>{ item.text }</a>
                        </li>
                    ))
                }
            </ul>
    )
}

export default connect()(Share)