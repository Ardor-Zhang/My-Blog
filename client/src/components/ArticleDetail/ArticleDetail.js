// import React from 'react'
// import { connect } from 'dva'
// import ReactHtmlParser from 'react-html-parser'
// import styles from './ArticleDetail.less'

// const ArticleDetail = ({ match, articles, history}) => {

//     const detail = {...articles.articles_array.filter((val)=>{
//         return val._id === match.params.id
//     })}[0] 

//     const handleClose = () => {
//         history.goBack()
//     }
//     return (
//         <div className={styles.container__}>
//             <div className={styles.left} onClick={() => handleClose()}>
//                 <i className={'icon-fanhui iconfont'}></i>
//             </div>
//             <div className={styles.scollHidden}>
//                 <div className={styles.scrollContainer}>
//                     <div className={styles.contentWrapper} >
//                         {
//                             <div className={styles.contentWrapper__inner}>
//                                 <div className={styles.page}>
//                                     <div className={styles.info}>
//                                         <div>类型：{detail.type}</div>
//                                         <div>时间：{detail.datePost}</div>
//                                         <div>浏览：{1}</div>
//                                     </div>
//                                     <div className={styles.content}>
//                                         {/* {ReactHtmlParser(detail.summary.replace(/contenteditable="true"+|placeholder="Compose an epic..."+|<\/?br>/g, ''))} */}
//                                         { detail.content }
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )


// }

// export default connect()(ArticleDetail)

import React, { Component } from 'react'
import { connect } from 'dva'
import ReactHtmlParser from 'react-html-parser'
import styles from './ArticleDetail.less'

class ArticleDetail extends Component {
    constructor() {
        super();
        this.state = {
            detail : {
                type : '',
                datePost : '',
                content : ''
            }
        }
    }

    componentDidMount() {
        const { match, articles} = this.props
        let detail = {...articles.articles_array.filter((val)=>{
            return val._id === match.params.id
        })}[0]

        if(detail) sessionStorage.setItem("detail", JSON.stringify(detail));
        else detail = JSON.parse(sessionStorage.getItem("detail"));
        this.setState({ detail })
    }

    handleClose = () => {
        this.props.history.goBack()
    }
    render() {
        const { detail } = this.state;
        return (
            <div className={styles.container__}>
                <div className={styles.left} onClick={ this.handleClose }>
                    <i className={'icon-fanhui iconfont'}></i>
                </div>
                <div className={styles.scollHidden}>
                    <div className={styles.scrollContainer}>
                        <div className={styles.contentWrapper} >
                            {
                                <div className={styles.contentWrapper__inner}>
                                    <div className={styles.page}>
                                        <div className={styles.info}>
                                            <div>类型：{ detail.type }</div>
                                            <div>时间：{ detail.datePost }</div>
                                            <div>浏览：{ detail.times_of_view}</div>
                                        </div>
                                        <div className={styles.content}>
                                            {/* {ReactHtmlParser(detail.summary.replace(/contenteditable="true"+|placeholder="Compose an epic..."+|<\/?br>/g, ''))} */}
                                            { detail.content }
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

}

export default connect()(ArticleDetail)