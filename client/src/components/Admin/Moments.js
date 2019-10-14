import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Admin.less';
import { Modal, Button } from 'antd';

class Moments extends Component {
    constructor() {
        super();
        this.state = {
            title : "",
            content : '',
            picture : ''
        }
    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    showConfirm = () => {
        const that = this;
        const { confirm } = Modal;
        confirm({
            title: 'Do you want to add these items?',
            content: '添加至数据库中？',
            onOk() {
                that.props.dispatch({ type : 'moments/ADD_MOMENT_ASYNC', payload : that.state })
            },
            onCancel() {},
        });
    }

    showHistoryTr = () => {
        this.props.dispatch({ type : "moments/GET_ALL_MONENTS_ASYNC" })
    }

    render() {
        return(
            <div className={ styles.container }>
                <div className={ styles.moments }>
                    <div className={ styles.addItem }>
                        <p>Title</p>
                        <div> <input type="text" name="title" onChange={ this.handleChange }/> </div>
                        <p>content</p>
                        <div> <textarea id="" rows="3" name="content" onChange={ this.handleChange }></textarea> </div>
                        <p>picture</p>
                        <div> <input className={ styles.picture } type="file"/> </div>
                        <Button type="primary" onClick={ this.showConfirm }>添加</Button>
                    </div>
                
                    <div className={ styles.history }>
                        <Button type="primary" onClick={ this.showHistoryTr }>点击显示历史状态</Button>
                        <table>
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>content</th>
                                    <th>picture</th>
                                    <th>datePost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.moments.moments_array.map((val) => {
                                        return (
                                            <tr key={ val._id }>
                                                <td>{ val.title }</td>
                                                <td>{ val.content }</td>
                                                <td>{  }</td>
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

export default connect( (props) => (props) )( Moments );