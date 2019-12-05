import React from 'react';

const CalculatorBody = (props) => {
    return (
        <div style={{backgroundColor:'#939399', minHeight: '250px',height: '100vh', maxHeight: '100vh'}}>
            {props.children}
        </div>
    );
}


export default CalculatorBody;