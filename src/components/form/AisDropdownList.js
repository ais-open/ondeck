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
                onChange={selected => {
                    let newVal = selected;
                    if (valueField) {
                        newVal = selected[valueField]
                    }
                    onChange({
                        target: {
                            name: name,
                            value: newVal
                        }
                    });
                }}
                />
        </div>
    );
}

AisDropdownList.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    valueField: PropTypes.string,
    displayField: PropTypes.string,
    options: PropTypes.array
};

export default AisDropdownList;
