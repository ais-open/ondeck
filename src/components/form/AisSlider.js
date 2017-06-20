import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';


const AisSlider = ({name, label, onChange, min=0, max=1000, step=1, value}) => {
    return (
        <div className="AisSlider">
            <label className="AisSlider__label" htmlFor={name}>{label} ({value})</label>
            <Slider name={name} 
                step={step} 
                min={min}
                max={max}
                defaultValue={value}
                tipTransitionName="rc-slider-tooltip-zoom-down"
                onChange={value => {
                    onChange({
                        target: {
                            name: name,
                            value: value
                        }
                    });
                }}
                />
        </div>
    );
}

AisSlider.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number
};

export default AisSlider;
