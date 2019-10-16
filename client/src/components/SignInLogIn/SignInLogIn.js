import React from 'react';
import styles from './SignInLogIn.less';
import { connect } from 'dva';
import ReactHtmlParser from 'react-html-parser';
import request from '../../utils/request';

class SignInLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            passwordConfirm : '',
            verification : '',
            nowLogin: false,  // 代表目前是注册状态, 用来切换注册还是登陆页面
            svg : '',  // 这是后端传回来的验证图片
            isLoading : false // 是否是在加载状态，这个状态下 点击登陆注册按钮是无效的   避免在请求时多次请求  暂时先不做这个功能
        }
    }

    changeLogin(type) {  // 点击切换 登陆 和 注册页面
        type === "signUp" && this.props.dispatch({ type : "users/TIME_TO_LOGIN", payload : false })
        this.setState({
            nowLogin: type === 'login'
        })
    }

    handleSubmit = (type) => {
        const { username, password, passwordConfirm, verification } = this.state;
        if(type === 'register') { // 点击注册
            this.props.dispatch({ type : 'users/REGISTER_ASYNC', payload : { username, password, passwordConfirm, verification } }).then(
                () => { this.props.users.isRegister && this.setState({ username : "", password : "", passwordConfirm : "", verification : "" , nowLogin : true }) }
            )
            this.changeCaptcha()
        }else {  // 点击登陆
            this.props.dispatch({ type : 'users/LOGIN_ASYNC', payload : { username, password }}).then(
                () => { this.props.users.isAuthenticated && this.setState({ username : "", password : "" }) }
            )
        }
    }

    onBlur = () => {
        const { username } = this.state;
        this.props.dispatch({ type : 'users/CHECK_USERNAME', payload : { username} })
    }

    handleChange = (e) => {  // input onChange事件
        this.setState({ [e.target.name]: e.target.value });
    }

    changeCaptcha = () => {  // 获取 svg
        request("/api/user/captcha", "post", null).then(
            (res) => { this.setState({ svg : res }) }
        )
    }

    componentDidMount() {  //
        this.changeCaptcha()
    }

    logoutClick = () => {
        localStorage.removeItem('jwtToken');
        this.props.dispatch({ type : 'users/LOGOUT'})
    }

    submitProfile = () => {
        return false
    }

    autoSubmit = (e) => {
        this.submitProfile();
        e.target.parentElement.submit();
    }


    Sign_Login() {
        return(
            <div className={styles.indexContainer}>
                <div className={styles.rightContainer}>
                    <div className={styles.top}>
                        <div onClick={() => this.changeLogin('signUp')} className={`${styles.selectSignUp} ${!this.state.nowLogin && styles.current}`}>Sign up</div> 
                        <div onClick={() => this.changeLogin('login')} className={`${styles.selectLogin} ${this.state.nowLogin && styles.current}`}>Login</div>
                    </div>
                    <div className={styles.down} >
                        <ul className={`${ this.state.nowLogin && styles.currentType } ${ this.props.users.isRegister && styles.currentType }`}>
                            <li>
                                <form>
                                    <div className={styles.inputItem}>
                                        <span>Username</span>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='text' 
                                            name = "username"
                                            value = { this.state.username }
                                            onChange={  this.handleChange }
                                            onBlur={  this.onBlur }
                                        />
                                    </div>
                                    <div className={styles.inputItem}>
                                        <span>Password</span>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='password' 
                                            name = "password"
                                            value = { this.state.password }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className={styles.inputItem}>
                                        <span>Repeat Password</span>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='password' 
                                            name = "passwordConfirm"
                                            value = { this.state.passwordConfirm }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className={styles.inputItem}>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='text' 
                                            name = "verification"
                                            value = { this.state.verification }
                                            onChange={ this.handleChange }
                                        />
                                        <div className={styles.captcha} onClick={ this.changeCaptcha }>{ReactHtmlParser(this.state.svg)}</div>
                                    </div>
                                    <div className={styles.inputItem}>
                                        <div 
                                            onClick={() => this.handleSubmit('register')} 
                                            className={ `${styles.btn} ${this.state.isLoading && styles.noClick}` }
                                        >Sign up</div>
                                    </div>
                                </form>
                            </li>
                            <li>
                                <form>
                                    <div className={styles.inputItem}>
                                    <span>Username</span>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='text' 
                                            name = "username"
                                            value = { this.state.username }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className={styles.inputItem}>
                                    <span>Password</span>
                                        <input 
                                            autoComplete="off" 
                                            className='input' 
                                            type='password' 
                                            name = "password"
                                            value = { this.state.password }
                                            onChange={ this.handleChange }
                                        />
                                    </div>
                                    <div className={styles.inputItem}>
                                        <div 
                                            onClick={() => this.handleSubmit('login')} 
                                            className={`${styles.btn} ${this.state.isLoading && styles.noClick}`}
                                        >Login</div>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    Logout() {
        const { username } = this.props.users.userNow
        let profileUsername = username
        try {
            require(`../../assets/profile/${profileUsername}.jpg`)
        }
        catch(err) {
            profileUsername = "arrow"
        }
        return(
            <div className={ styles.Logout }>
                <div className={ styles.profile }>
                    <img src={ require(`../../assets/profile/${profileUsername}.jpg`) } alt=""/>                    
                </div>
                <div className={ styles.uploadProfile }>
                    点击上传头像
                    <form action={ `/api/user/profile?username=${username}`} method="post" encType="multipart/form-data" onSubmit={ (e)=>this.submitProfile(e) }>
                        <input type="file" name="profile" onChange={ this.autoSubmit } />
                    </form>
                </div>
                <div className={ styles.userNow }> 
                    { username }
                </div>
                <div className={ styles.operation }>
                    <div className={ styles.welcome }> WELCOME </div>
                    <div className={ styles.logoutbtn } onClick={ this.logoutClick }> LOGOUT </div>
                </div>
            </div>
        )
    }

    render() {
        return (
              this.props.users.isAuthenticated ? this.Logout() : this.Sign_Login() 
        )
    }
}

export default connect((props) => (props))(SignInLogIn)