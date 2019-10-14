import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

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