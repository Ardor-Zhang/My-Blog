import React, { Component } from 'react';
import { connect } from 'dva'
import styles from './Moments.less'

class Moments extends Component {
    constructor() {
        super();
        this.state = {
            show : false,
            item : {}
        }
    }

    showDetails = (item) => {
        this.setState({show: true, item })
    }

    detailsPage = () => {
        return (
            <div className={ styles.details }>
                <div>{ this.state.item.content } </div>  
            </div>
        )
    }

    render() {
        return (
            <div className={styles.momentsContainer}>
                <ul className={styles.container}>
                    {
                        this.props.moments.moments_array.map((item, index) => (
                            <li key={item._id}  className={styles.momentsItem }  onClick={ () => this.showDetails(item) }>
                                <div className={styles.momentsBg} style={{ backgroundImage: 'url(' + item.picture.data + ')' }}></div>
                                <div className={styles.momentsContent}>
                                    <div className={styles.momentsTitle}>{item.title}</div>
                                    <div className={styles.momentsSummary}>
                                        <div>{ item.content } </div>                                  
                                        <div className={styles.momentsDate}>{item.datePost}</div>
                                    </div>
                                </div>
                                
                            </li>
                        )
                        )
                    }
                </ul>
                {
                    this.state.show && this.detailsPage()
                }
            </div>
        )
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}


export default connect((props) => (props))(Moments)