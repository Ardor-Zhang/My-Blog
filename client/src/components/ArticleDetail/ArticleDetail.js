import React from 'react'
import { connect } from 'dva'
import ReactHtmlParser from 'react-html-parser'
import styles from './ArticleDetail.less'

const ArticleDetail = ({ history, detail, dispatch }) => {

    const handleClose = () => {
        dispatch({ type: 'article/filter', payload: 'All' }) && history.goBack()
    }
    return (
        <div className={styles.container__}>
            <div className={styles.left} onClick={() => handleClose()}>
                <i className={'icon-fanhui iconfont'}></i>
            </div>
            <div className={styles.scollHidden}>
                <div className={styles.scrollContainer}>
                    <div className={styles.contentWrapper} >
                        {
                            detail.visible &&
                            <div className={styles.contentWrapper__inner}>
                                <div className={styles.page}>
                                    <div className={styles.info}>
                                        <div>类型：{detail.type}</div>
                                        <div>时间：{detail.year} - {detail.date} - {detail.time}</div>
                                        <div>浏览：{detail.viewer}</div>
                                    </div>
                                    <div className={styles.content}>
                                        {ReactHtmlParser(detail.summary.replace(/contenteditable="true"+|placeholder="Compose an epic..."+|<\/?br>/g, ''))}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(({ article: { detail } }) => ({ detail }))(ArticleDetail)