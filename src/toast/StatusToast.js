import React from 'react';

const StatusToast = (props) => {
    return (
        <div className="toast-content">
            <h3>{props.title}</h3>
            {props.message}
        </div>
    );
};

export default StatusToast;
