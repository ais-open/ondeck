import React from 'react';
import PropTypes from 'prop-types';


const AisTextInput = ({name, label, showLabel, error, onChange, value}) => {

    return (
        <div className="AisTextInput">
            <label className="AisTextInput__label" htmlFor={name}>{label}</label>
            <input className="AisTextInput__input"
                type="text"
                name={name}
                onChange={onChange}
                value={value}
                />
            { error && <div className="error">{error}</div> }
        </div>
    );
};

AisTextInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default AisTextInput;
