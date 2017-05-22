import React from 'react';


const Spinner = () => {
    return (
        // #icon-spinner needs to be defined in the containing html file
        <svg className="spinner spinner__component"><use xlinkHref="#icon-spinner" /></svg>
    );
};

export default Spinner;
