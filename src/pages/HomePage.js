import React from 'react';

import MapComponent from '../components/map';


class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <MapComponent />
        );
    }
}

export default HomePage;
