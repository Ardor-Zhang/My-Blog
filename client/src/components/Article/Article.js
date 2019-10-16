import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import styles from './Article.less';
import 'braft-editor/dist/index.css';

const Article = props => {
    const hot = [
        {_id : 1, title: 111},
        {_id : 2, title: 222},
        {_id : 3, title: 333}
    ];

    const type = [
        'All','HTML', 'JavaScript', 'CSS', 'React', 'NodeJs', 'Vue', 'Others'
    ]
    
    type.push('')
    const color = [
        '#abd0bc',
        '#62cf8e',
        '#f46c3c',
        '#b2b2b2',
        '#ddc49c',
        '#62b78d',
        '#d1f9f1',
        '#c4c4c4',
        '#b89168',
        '#ff766e',
        '#1e89bd',
        '#d34694',
        '#c5d08d',
        '#4ae488'
    ]
    const random = () => (color[Math.floor(Math.random() * color.length)])  // 随机颜色

    const handleType = ({ nativeEvent: { target } }, item) => {  // 右侧点击时出现的动画
        const types = document.querySelectorAll('._articleTyle')
        const SLIDE_MARGIN = 50
        types[types.length - 1].style.transform = `translateX(${target.offsetLeft - SLIDE_MARGIN}px) translateY(${target.offsetTop - SLIDE_MARGIN}px)`
        types[types.length - 1].style.width = `${target.offsetWidth + 20}px`

        if (target.getAttribute('current') === 'true') return
        for (let _item = 0; _item < types.length; _item++) {
            if (_item < types.length - 1) {
                !!item && types[_item].setAttribute('current', 'false')
                !!item && (types[_item].style.cssText = 'color: white; cursor: pointer')
            }
        }
        props.dispatch({ type: "articles/FILTER_ARTICLE", payload : item })
    }

    const toDetail = (_id) => {
        props.dispatch({ type : "articles/ADD_VIEW_TIME", payload : { _id } })
        props.history.push('/detail/' + _id);
    }

    return (
        <div className={styles.articleContainer}>
            <div className={styles.articleWrap}>
                <ul className={styles.articleList}>
                    {
                        props.articles.articles_array_show.map(item => {
                            if (item.show || !item.hasOwnProperty('show'))
                                return (
                                    <li onClick={() => toDetail(item._id)} className={styles.articleItem} key={item._id}>
                                        <div className={styles.articleCircle} style={{ backgroundColor: random() }}>{item.type.slice(0, 1)}</div>
                                        <div className={styles.articleDate}><span>{ item.datePost }</span></div>
                                        <div className={styles.articleTitle}>
                                            {item.title}
                                        </div>
                                    </li>
                                )
                            else return ''
                        })
                    }
                </ul>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.articleFilter}>
                    {
                        type.map((item, i) => (
                            <div current={i === 0 ? 'true' : 'false'} className='_articleTyle' onClick={(e) => handleType(e, item)} key={item}>{item}</div>
                        )
                        )
                    }
                </div>
                <div className={styles.downContainer}>
                    <div className={styles.hotTitle}>Hot</div>
                    <ul className={styles.hotList}>
                        {
                            hot.map(item => (
                                <li onClick={() => toDetail(item._id)} className={styles.hotItem} key={item._id}>
                                    <div className={styles.hotFire}><i className="iconfont icon-aixin"></i></div>
                                    <div className={styles.hotTitle}>{item.title}</div>
                                </li>
                            )
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default connect((props)=>(props))(withRouter(Article))


























// import React, { Component } from 'react';
// import { connect } from 'dva';
// import { withRouter } from 'dva/router';
// import styles from './Article.less';
// import 'braft-editor/dist/index.css';

// class Article extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             hot : [{_id : 1, title: 111},{_id : 2, title: 222},{_id : 3, title: 333}],
//             articles_array_All : props.articles.articles_array,
//             articles_array_show : props.articles.articles_array,
//             type : [ 'All','HTML', 'JavaScript', 'CSS', 'React', 'NodeJs', 'Vue', 'Others', "" ],
//             color : ['#abd0bc','#62cf8e','#f46c3c','#b2b2b2','#ddc49c','#62b78d','#d1f9f1','#c4c4c4','#b89168','#ff766e','#1e89bd','#d34694','#c5d08d','#4ae488']
//         }
//     }
 
//     random = () => ( this.state.color[Math.floor(Math.random() * this.state.color.length)])  // 随机颜色

//     handleType = ({ nativeEvent: { target } }, item) => {  // 右侧点击时出现的动画
//         const types = document.querySelectorAll('._articleTyle')
//         const SLIDE_MARGIN = 50
//         types[types.length - 1].style.transform = `translateX(${target.offsetLeft - SLIDE_MARGIN}px) translateY(${target.offsetTop - SLIDE_MARGIN}px)`
//         types[types.length - 1].style.width = `${target.offsetWidth + 20}px`

//         if (target.getAttribute('current') === 'true') return
//         for (let _item = 0; _item < types.length; _item++) {
//             if (_item < types.length - 1) {
//                 !!item && types[_item].setAttribute('current', 'false')
//                 !!item && (types[_item].style.cssText = 'color: white; cursor: pointer')
//             }
//         }
//         this.setState({
//             articles_array_show : this.state.articles_array_All.filter((val) => { return val.type === item })
//         })   
//     }

//     toDetail = (_id) => {
//         this.props.dispatch({ type : "articles/ADD_VIEW_TIME", payload : {_id} })
//         this.props.history.push('/detail/' + _id);
//     }

//     render() {
//         const { articles_array_show, type, hot } = this.state
//         return (
//             <div className={styles.articleContainer}>
//                 <div className={styles.articleWrap}>
//                     <ul className={styles.articleList}>
//                         {
//                             articles_array_show.map(item => {
//                                 if (item.show || !item.hasOwnProperty('show'))
//                                     return (
//                                         <li onClick={() => this.toDetail(item._id)} className={styles.articleItem} key={item._id}>
//                                             <div className={styles.articleCircle} style={{ backgroundColor: this.random() }}>{item.type.slice(0, 1)}</div>
//                                             <div className={styles.articleDate}><span>{ item.datePost }</span></div>
//                                             <div className={styles.articleTitle}>
//                                                 {item.title}
//                                             </div>
//                                         </li>
//                                     )
//                                 else return ''
//                             })
//                         }
//                     </ul>
//                 </div>

//                 <div className={styles.rightContainer}>
//                     <div className={styles.articleFilter}>
//                         {
//                             type.map((item, i) => (
//                                 <div current={i === 0 ? 'true' : 'false'} className='_articleTyle' onClick={(e) => this.handleType(e, item)} key={item}>{item}</div>
//                             )
//                             )
//                         }
//                     </div>
//                     <div className={styles.downContainer}>
//                         <div className={styles.hotTitle}>Hot</div>
//                         <ul className={styles.hotList}>
//                             {
//                                 hot.map(item => (
//                                     <li onClick={() => this.toDetail(item._id)} className={styles.hotItem} key={item._id}>
//                                         <div className={styles.hotFire}><i className="iconfont icon-aixin"></i></div>
//                                         <div className={styles.hotTitle}>{item.title}</div>
//                                     </li>
//                                 )
//                                 )
//                             }
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     componentDidMount() {
//         console.log(this.props)
//     }
// }


// export default connect((props)=>(props))(withRouter(Article))