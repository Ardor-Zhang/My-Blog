import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './Message.less'
import Infos from "../Infos/Infos";

class Message extends Component {
    constructor() {
        super();
        this.state = {
            placeholder : "来来来，随便聊！",
            messageInput : "",
        }
    }

    change = (e) => { this.setState({ [e.target.name]: e.target.value }) }

    submitMessage = () => {
        const { username, profile } = this.props.users.userNow
        if(username){
            if( this.state.messageInput ){
                this.props.dispatch({ type : "messages/ADD_MESSAGE_ASYNC", payload : { username, profile, content : this.state.messageInput } }).then(
                    () => { this.setState({ placeholder : "要不要再来一条？哈哈！", messageInput : '' }) }
                )
                let datePost = new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
                this.props.dispatch({ type : "messages/MESSAGES_ARRAY", payload : { username, content : this.state.messageInput, datePost } })
            }
        }else {
            Infos({ type : "warning", content : "Please login first!" })
        }
        
    }

    profile_has_or_not = (item) => {
        try {
            require(`../../assets/profile/${item.username}.jpg`)
            return <div className={ styles.profile } style={{ backgroundImage: `url(./src/assets/profile/${item.username}.jpg)` }}></div>
        }
        catch(err) {
            return <div className={ styles.profile } style={{ backgroundImage: `url(./src/assets/profile/arrow.jpg)` }}></div>
        }
    }

    render() {
        return (
            <div className={ styles.containerMessage }>
                <ul className={styles.message}>
                    {
                        this.props.messages.messages_array.map(item => {
                            return (
                                <li key={item._id} className={styles.listItem}>
                                    { this.profile_has_or_not(item) }
                                    {/* <div className={ styles.profile } style={{ backgroundImage: `${this.profile_has_or_not(item)}` }}></div> */}
                                    <div className={ styles.details }>
                                        <div className={styles.name}>{item.username} </div>
                                        <div className={styles.date}>{item.datePost}</div>
                                        <div className={styles.content}>{item.content}</div>
                                    </div>
                                    
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={ styles.giveMeMessage }>
                    <div className={ styles.comeon } > 
                        Come on ! <br/>留个言呗！
                    </div>
                    <div className={ styles.inputMessage }>
                        <textarea 
                            name="messageInput" 
                            id="" 
                            cols="24" 
                            rows="15" 
                            onChange={ this.change } 
                            placeholder={ this.state.placeholder }
                            value ={ this.state.messageInput }
                        ></textarea>
                    </div>
                    <div className={ styles.submit } onClick={ this.submitMessage }>
                        点击提交
                    </div>
                </div> 
            </div>
        )
    }
}

export default connect( (props) => (props) )(Message)