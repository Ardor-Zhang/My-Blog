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
        const { title, content } = this.state.item
        return (
            <div className={ styles.details }>
                <div className={styles.picture}>
                    { this.profile_has_or_not(title) }
                </div>
                <div className={styles.content}>{ content } </div>  
            </div>
        )
    }

    profile_has_or_not = (title) => {
        try {
            return <img src={ require(`../../assets/momentPic/${ title }.jpg`) } alt=""/>
        }
        catch(err) {   
            return <img src={ require(`../../assets/momentPic/arrow.jpg`) } alt=""/>
        }
    }

    render() {
        return (
            <div className={styles.momentsContainer}>
                <div className={styles.container}>
                    <ul className={styles.allMoments}>
                        {
                            this.props.moments.moments_array.map((item, index) => (
                                <li key={item._id}  className={styles.momentsItem }  onClick={ () => this.showDetails(item) }>
                                    {/* { this.profile_has_or_not(item) } */}
                                    <div className={ styles.momentsBg } style={{ backgroundImage: `url(./src/assets/momentPic/${item.title}.jpg)` }}></div>
                                    {/* <div className={styles.momentsBg} style={{ backgroundImage: `${this.profile_has_or_not(item)}` }}></div> */}
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
                </div>
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