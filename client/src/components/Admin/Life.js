import React, { Component } from 'react';
import { connect } from 'dva';

class Life extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return(
            <div>
                Life
            </div>
        )
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

Life.propTypes = {

};

export default connect(  )( Life );