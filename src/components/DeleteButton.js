import React from 'react';
import axios from 'axios'

class DeleteButton extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='col s6 offset-s3'
                style={{
                        height: '100%',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        border: '5px solid #49494D',
                        borderRadius: '13px',
                        fontWeight: '800',
                        fontSize: '4vh'
                }}
                onClick={() => {this.props.deleteHistoryHandler();}}>            
                <p>{this.props.operation}</p>
            </div>
        );
    }
};

export default DeleteButton;