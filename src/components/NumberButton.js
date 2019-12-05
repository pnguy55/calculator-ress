import React from 'react';

class NumberButton extends React.Component {

    constructor(props){
        super(props)
        this.lastInputGetter = this.lastInputGetter.bind(this);
    }

    lastInputGetter(currentExpression){
        let currentCopy = currentExpression.split('');
        let lastInput = currentCopy.pop();
        // console.log(`lastInputFromNumberPress: ${lastInput}`)
        this.props.lastInputHandler(lastInput);
    };

    render(){
        return (
            <div className='col s3 number-button' 
                style={{
                        height: '100%',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        border: '5px solid #49494D',
                        borderRadius: '13px',
                        fontSize: '8vh',
                        fontWeight: '800'
                }}
                onClick={() => {this.lastInputGetter(this.props.currentExpression); this.props.numberPressHandler(this.props.number)}}>            
                <p>{this.props.number}</p>
            </div>
        );
    }
};

export default NumberButton;