import React, { Component } from 'react';
import DeckGL, { HexagonLayer } from 'deck.gl';


const LIGHT_SETTINGS = {
    lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

// const colorRangeBlue2Red = [
//     [1, 152, 189],
//     [73, 227, 206],
//     [216, 254, 181],
//     [254, 237, 177],
//     [254, 173, 84],
//     [209, 55, 78]
// ];

const colorRangeWhite2Red = [
    [255, 255, 178],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [240, 59, 32],
    [189, 0, 38]
];
const colorRange = colorRangeWhite2Red;

const elevationScale = {
    min: 1,
    max: 50
};

const defaultProps = {
    radius: 75, // 1000
    upperPercentile: 100,
    coverage: 1
};

export default class ODHexagonLayer extends Component {

    constructor(props) {
        super(props);

        this.startAnimationTimer = null;
        this.intervalTimer = null;
        this.state = {
            elevationScale: elevationScale.min
        };

        this._startAnimate = this._startAnimate.bind(this);
        this._animateHeight = this._animateHeight.bind(this);
    }

    componentDidMount() {
        this._animate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this._animate();
        }
    }

    componentWillUnmount() {
        this._stopAnimate();
    }

    _animate() {
        this._stopAnimate();

        // wait 1.5 secs to start animation so that all data are loaded
        this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateHeight, 20);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateHeight() {
        if (this.state.elevationScale === elevationScale.max) {
            this._stopAnimate();
        }
        else {
            this.setState({
                elevationScale: this.state.elevationScale + 1
            });
        }
    }

    _initialize(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    render() {
        const { viewport, width, height, data, radius, coverage, upperPercentile } = this.props;

        if (!data) {
            return null;
        }

        const layers = [
            new HexagonLayer({
                id: 'heatmap',
                colorRange,
                coverage,
                data,
                elevationRange: [0, 300],
                elevationScale: this.state.elevationScale,
                extruded: true,
                getPosition: d => d,
                lightSettings: LIGHT_SETTINGS,
                onHover: this.props.onHover,
                opacity: 1,
                pickable: Boolean(this.props.onHover),
                radius,
                upperPercentile
            })
        ];

        return (<DeckGL
            {...viewport}
            width={width}
            height={height}
            layers={layers}
            onWebGLInitialized={this._initialize}
        />);
    }
}

ODHexagonLayer.displayName = 'ODHexagonLayer';
ODHexagonLayer.defaultProps = defaultProps;
