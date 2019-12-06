import React from 'react';

const HistoryScreen = (props) => {
    return(
        <div className='col s6' 
             style={{height: '100%', 
                    backgroundColor: '#808080', 
                    border:'3px solid #939399', 
                    borderRadius: '13px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    fontSize: '6vh',
                    whiteSpace: 'nowrap',
                    overflow: 'scroll',
                    }}
             onClick = {() => {props.historyScreenPressHandler()}}>
        {props.displayHistoryEquation} = {props.resultFromHistory}
        

        </div>
    );
};

export default HistoryScreen;