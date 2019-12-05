import React from 'react';

const MainScreen = (props) => {
    return (
        <div className='main-screen container' style={{backgroundColor: '#E6E6E6', width: '100%', height: '25vh',border: '3px solid #939399', borderRadius: '13px'}}>
            <div className='row' 
                 style={{display: 'flex', 
                         justifyContent:'flex-end',
                         fontSize: '4vh',
                         fontWeight: '600'}}>
                <div>{props.wholeEquation}</div>
            </div>
            <div className='row' 
                 style={{display: 'flex', 
                         justifyContent:'flex-end',
                         fontSize: '7vh',
                         fontWeight: '600'}}>
                {props.currentExpression}
            </div>
        </div>
    );
};

export default MainScreen;