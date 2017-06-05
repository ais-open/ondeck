import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';


const AisDropdownList = ({name, label, onChange, value, valueField, displayField, options}) => {
    
    return (
        <div className="AisDropdownList">
            <label className="AisDropdownList__label" htmlFor={name}>{label}</label>
            <DropdownList
                name={name}
                data={options}
                valueField={valueField}
                textField={displayField}
                defaultValue={value}
                />
        </div>
    );
}

export default AisDropdownList;
