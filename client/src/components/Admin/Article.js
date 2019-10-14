
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Admin.less';
import { Modal, Button } from 'antd';

class Articles extends Component {
    constructor() {
        super();
        this.state = {
            type : '',
            title : "",
            content : ''
        }
    }

    handleChange = (e) => { 
        this.setState({ [e.target.name]: e.target.value }) 
    }

    handleChangeSelect = (e) => {
        let index = e.target.selectedIndex;
        let type = e.target.options[index].value;
        this.setState({ type }) 
    }

    showConfirm = () => {
        const that = this;
        const { confirm } = Modal;
        confirm({
            title: 'Do you want to add these items?',
            content: '添加至数据库中？',
            onOk() {
                that.props.dispatch({ type : 'articles/ADD_ARTICLE_ASYNC', payload : that.state })
            },
            onCancel() {},
        });
    }

    showHistoryTr = () => {
        this.props.dispatch({ type : "articles/GET_ALL_ARTICLES_ASYNC" })
    }

    render() {
        return(
            <div className={ styles.container }>
                <div className={ styles.article }>
                    <div className={ styles.addItem }>
                        <p>Type</p>
                        <select name="type" id="" onChange={ this.handleChangeSelect }>
                            <option value="">选择类型</option>
                            <option value="HTML">HTML</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="CSS">CSS</option>
                            <option value="React">React</option>
                            <option value="NodeJs">NodeJs</option>
                            <option value="Vue">Vue</option>
                            <option value="Others">Others</option>
                        </select>
                        <p>Title</p>
                        <div> <input type="text" name="title" onChange={ this.handleChange }/> </div>
                        <p>content</p>
                        <div> <textarea id="" rows="3" name="content" onChange={ this.handleChange }></textarea> </div>
                        <Button type="primary" onClick={ this.showConfirm }>添加</Button>
                    </div>
                
                    <div className={ styles.history }>
                        <Button type="primary" onClick={ this.showHistoryTr }>点击显示历史文章</Button>
                        <table>
                            <thead>
                                <tr>
                                    <th>type</th>
                                    <th>title</th>
                                    <th>content</th>
                                    <th>datePost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.articles.articles_array.map((val) => {
                                        return (
                                            <tr key={ val._id }>
                                                <td>{ val.type }</td>
                                                <td>{ val.title }</td>
                                                <td>{ val.content }</td>
                                                <td>{ val.datePost }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default connect( (props) => (props) )( Articles );