import React, { Component } from 'react';
import { connect } from 'dva';

import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

class Token extends Component {

    render() {
        return(
            <div>
                
            </div>
        )
    }

    test = () => {
        const token = localStorage.jwtToken;
        if(token) { 
            setAuthorizationToken(token);
            this.props.dispatch({ type : "users/SETCURRENTUSER", payload : jwtDecode(token)})
        }
    }

    componentDidMount() {
        this.props.dispatch({ type : "articles/GET_ALL_ARTICLES_ASYNC" })
        this.props.dispatch({ type : "messages/GET_ALL_MESSAGES_ASYNC" })
        this.props.dispatch({ type : "moments/GET_ALL_MONENTS_ASYNC" })
        this.test();
        // window.onbeforeunload = function (e) {  // 加不加呢，这是个问题！
        //     localStorage.removeItem('jwtToken')
        // }   
    }

}


export default connect(  )( Token );