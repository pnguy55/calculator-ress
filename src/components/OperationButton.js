import React from 'react';

class OperationButton extends React.Component {

    constructor(props){
        super(props)
        this.operatorPress = this.operatorPress.bind(this);
    }
    
    operatorPress(operator, currentExpression) {
        let currentCopy = currentExpression.split('');
        let lastInput = currentCopy.pop();
        
        // console.log(`lastInputFromOperator: ${lastInput}`)
        if (lastInput === undefined && operator==="(") {
            return true;
        }
        if (isNaN(lastInput) && operator==="(") {
            return true;
        }
        if (isNaN(lastInput) &&  operator==="-") {
            return true;
        }
        if (operator === 'AC' || operator === 'C') {
            return true;
        }
        if (operator === '.') {
            if (isNaN(lastInput) && lastInput !== '.' && this.props.lastInput !== ')') {
                return true;
            }
            else if (lastInput === '.' || this.props.lastInput === ')') {
                return false;
            }
            let decimalCheckArray = currentCopy + lastInput;
            decimalCheckArray.split('')


            for(let i = decimalCheckArray.length; i > 0; i--){
                if (decimalCheckArray[i-1] === '.') {
                    return false;
                }
                else if (isNaN(decimalCheckArray[i-1])) {
                    return true;
                }
            }
            
        }

        if (operator === ')') {
            let flag = false;
            if (this.props.lastInput === ')'){
                return false;
            }
            for(let i = 0; i < currentCopy.length; i++) {
                if (currentCopy[i]==='('){
                    flag = true;
                }
                if (currentCopy[i]===')'){
                    flag = false;
                }
            }
            if (flag === false){
                return false;
            }
            
        }
        // if (operator === '(') {
        //     let flag = false;
        //     console.log(currentCopy)
        //     if (this.props.lastInput === '('){
        //         return false;
        //     }
        //     for(let i = 0; i < currentCopy.length; i++) {
        //         if (currentCopy[i]===')'){
        //             flag = true;
        //         }
        //         if (currentCopy[i]==='('){
        //             flag = false;
        //         }
        //         console.log(flag)
        //     }
        //     if (flag === false){
        //         return false;
        //     }
            
        // }

        if (lastInput>=0 && lastInput<=9){
            return true;
        } 
        else if (lastInput === ')' && operator !== '=') {
            return true;
        }
        else if (operator === '=') {
            
            if (lastInput === '=') {
                return false;
            } 
            else if (currentExpression === this.props.lastResult) {
                return false;
            }
            else if (lastInput === ')') {
                return true;
            }
        }
        else {
            return false;
        }
    }
    
    render() {
    return (
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
            onClick={() => {
                if (this.operatorPress(this.props.operation, this.props.currentExpression)) {
                    this.props.numberPressHandler(this.props.operation);
                }
                if (this.props.operation === '=' && this.operatorPress(this.props.operation, this.props.currentExpression)) {
                    this.props.equalsHandler(this.props.currentExpression);
                }
             }}>      
            <p>{this.props.operation}</p>
        </div>
    );}
};

export default OperationButton;