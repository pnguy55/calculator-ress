import React from 'react';

class HistoryButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='col s3 operation-button' 
            style={{
                   height: '100%',
                   display: 'flex', 
                   justifyContent: 'center', 
                   alignItems: 'center',
                   backgroundColor: '#000000',
                   color: '#E69010',
                   border: '5px solid #49494D',
                   borderRadius: '13px',
                   fontSize: '6vh',
                   fontWeight: '800'
           }}
           onClick = {()=>{this.props.historyViewIndexChangeHandler(this.props.operation)}}>
                {this.props.operation}
            </div>
        );
    }
}

export default HistoryButton;