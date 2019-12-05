import React from 'react';

const ButtonPad = (props) => {
    return(
        <div className='container row'
             style={{width: '100%',
                     height: '65vh', 
                     backgroundColor: '#49494D', 
                     border: '3px solid #939399', 
                     borderRadius: '13px'}}>
            {props.children}
        </div>
    );
};

export default ButtonPad;