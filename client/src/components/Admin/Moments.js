import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Admin.less';
import { Modal, Button } from 'antd';

class Moments extends Component {
    constructor() {
        super();
        this.state = {
            title : "",
            content : ''
        }
    }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    showConfirm = (e) => {
        const that = this;
        const { confirm } = Modal;
        e.preventDefault()
        confirm({
            title: 'Do you want to add these items?',
            content: '添加至数据库中？',
            onOk() {
                that.props.dispatch({ type : 'moments/ADD_MOMENT_ASYNC', payload : that.state })
                
                that.refs.formUploadPic.submit()
            },
            onCancel() {}
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
                        <div> 
                            <form action={ `/api/moment/picture?title=${this.state.title}`} method="post" encType="multipart/form-data" ref="formUploadPic" target="nm_iframe">
                                <input type="file" name="momentPicture" className={ styles.picture } />
                            </form>
                            <iframe id="id_iframe" name="nm_iframe" style={{"display":"none"}} title="id_iframe"></iframe>
                        </div>
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