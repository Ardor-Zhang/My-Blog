import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Admin.less'

import Moments from './Moments';
import Article from './Article';
import Life from './Life';


class Admin extends Component{
    constructor(){
        super()
        this.state = {
            key : 0
        }
    }

    changeKey = (key) => {
        this.setState({ key })
    }

    Moments_Article_Life = () => {
        switch(this.state.key) {
            case 0 : return(<Moments/>) 
            case 1 : return(<Article/>) 
            case 2 : return(<Life/>) 
            default : return(<Moments/>) 
        }
    }
    
    render() {
        return (
            <div className={ styles.admin }>
                <div className={ styles.menu }>
                    <div className={ `${ styles.item } ${ this.state.key === 0 && styles.active}` } onClick={ () => this.changeKey(0) }> Moments </div>
                    <div className={ `${ styles.item } ${ this.state.key === 1 && styles.active}` } onClick={ () => this.changeKey(1) }> Article </div>
                    <div className={ `${ styles.item } ${ this.state.key === 2 && styles.active}` } onClick={ () => this.changeKey(2) }> Life </div>
                </div>
                <div>
                    { this.Moments_Article_Life() }
                </div>
            </div>
        );
    }
    
};

export default connect(  )( Admin );

