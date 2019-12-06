import React, { Component } from 'react';

// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

import CalculatorBody from './CalculatorBody';
import MainScreen from './MainScreen';
import HistoryScreen from './HistoryScreen';
import HistoryButton from './HistoryButton';
import NumberButton from './NumberButton';
import OperationButton from './OperationButton';
import ButtonPad from './ButtonPad';

var safeEval = require('safe-eval')


class App extends Component {
    // FIRST THING MADE WHEN APP IS RENDERED PERFECT PLACE FOR STATE
    constructor(props) {
        super(props);

        this.state = { wholeEquation: [''], 
                       currentExpression: '', 
                       lastInput: '', 
                       lastResult: '',
                       resultArray: [{
                        equation: '',
                        result: ''                           
                        }],
                       displayHistoryEquation: {
                           equation: '',
                           result: ''                           
                       },
                       historyIndex: 0,
                       historyViewIndex: 0
                    };
        this.numberPress = this.numberPress.bind(this);
        this.equalsPress = this.equalsPress.bind(this);
        this.lastInputSetter = this.lastInputSetter.bind(this);
        this.historyViewChange = this.historyViewChange.bind(this);
        this.historyScreenPress = this.historyScreenPress.bind(this);
        console.log(this.state)
    }

    historyViewChange(delta) {
        let newHistoryIndex = this.state.historyViewIndex;
        let historyLength = this.state.resultArray.length;
        if (delta === 'prev') {
            newHistoryIndex < historyLength ? (newHistoryIndex = parseInt(this.state.historyViewIndex) - 1) : console.log("end of history");
        } else {
            newHistoryIndex > 0 ? (newHistoryIndex = parseInt(this.state.historyViewIndex) + 1) : console.log("end of history");
        }
        
        console.log(newHistoryIndex)
        if ( newHistoryIndex > 0 && newHistoryIndex < this.state.resultArray.length) {
            this.setState({
                historyViewIndex: newHistoryIndex
            }, () => {
 
            })
        }
        else {
            console.log('end of history')
        }
    }

    lastInputSetter(lastInput) {
        // console.log(`lastInputFromSetter: ${lastInput}`)
        this.setState({
            
        }, () => {
            this.setState({

            })
        })
    }

    historyScreenPress(){
        this.setState({
                lastResult: `(${this.state.resultArray[parseInt(this.state.historyViewIndex)].result})`,
                lastInput: ')',
                currentExpression: `${this.state.resultArray[parseInt(this.state.historyViewIndex)].result}`,
                wholeEquation: `${[this.state.resultArray[parseInt(this.state.historyViewIndex)].equation].join('')}`,
                historyViewIndex: this.state.resultArray.length - 1,
        }, () => {
            this.setState({
                resultArray: [...this.state.resultArray, { equation: this.state.wholeEquation, result: safeEval(this.state.wholeEquation) }],
                historyIndex: this.state.historyIndex + 1
            })
        })
    }

    numberPress(input) {
        // console.log(`lastInputFromState: ${this.state.lastInput} lastResult = {this.state.lastResult}, thisInput: ${input}`)
        if (input === 'AC') {
            this.setState({
                currentExpression: '',
                lastInput: '',
                wholeEquation: ['']
            })
        }
        else if (input === 'C' && this.state.wholeEquation.length === 1) {
            this.setState({
                currentExpression: '',
                lastInput: '',
            })
        }
        else if (input === 'C' && this.state.wholeEquation.length > 1) {
            // console.log(this.state.lastResult)
            this.setState({
                currentExpression: `(${this.state.lastResult.split(/[()]/)[1]})`,
                lastInput: ')'
            })
        }
        else if (this.state.lastInput === ')' && input>=0 && input<=9) {
            let multiplyParenthesis = '*'+input
            this.setState({
                currentExpression: this.state.currentExpression.concat(multiplyParenthesis),
                lastInput: input
            }, () => {
            });
        }   
        else if (input === '(' && this.state.lastInput === '') {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
        else if (input === '-' && this.state.lastInput === '') {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
        else if (input === '-' && this.state.lastInput === '(') {
            console.log('hi')
                let negativeParenthesis = input
                this.setState({
                    currentExpression: this.state.currentExpression.concat(negativeParenthesis),
                    lastInput: input
                }, () => {
                });
        }
        else if (input === '(' && (this.state.lastInput === '-' || this.state.lastInput === '+' || this.state.lastInput === '-' || this.state.lastInput === '/') ) {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
        else if (input === '(' && ((this.state.lastInput>=0 && this.state.lastInput<=9) || this.state.lastInput===')' || this.state.lastInput)) {
            let multiplyParenthesis = '*'+input
            this.setState({
                currentExpression: this.state.currentExpression.concat(multiplyParenthesis),
                lastInput: input
            }, () => {
            });
        }   
        else if (input === '(' && isNaN(this.state.lastInput)) {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
        else if (input === '-' && this.state.lastInput === '-') {
            let negativeParenthesis = '('+input;
            this.setState({
                currentExpression: this.state.currentExpression.concat(negativeParenthesis),
                lastInput: input
            }, () => {
            });
        }
        else {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
    }

    equalsPress(currentExpressionFromProps) {

        let currentExpressionParenCheck = currentExpressionFromProps.split('')
        let countParensLeft = 0;
        let countParensRight = 0;

        // if (currentExpressionParenCheck[0] && currentExpressionParenCheck[1] && currentExpressionParenCheck[currentExpressionParenCheck-1] && currentExpressionParenCheck[-2]) {
        //     console.log('hi')
        //     currentExpressionParenCheck.pop();
        //     currentExpressionParenCheck.shift();
        //     currentExpressionFromProps = currentExpressionParenCheck.join();
        // }

        for(let i=0; i < currentExpressionParenCheck.length; i++) {
            if (currentExpressionParenCheck[i] === '(') {
                countParensLeft++;
            }
            if (currentExpressionParenCheck[i] === ')') {
                countParensRight++;
            }
        }
        if (countParensLeft !== countParensRight) {
            this.setState({
                currentExpression: "Invalid operation, did not close expression, please press 'AC'",
                            lastInput: '',
                            wholeEquation: [''],

            })
        }   
        else {
            let result = parseFloat(safeEval(currentExpressionFromProps).toFixed(4)).toString();

            if (this.state.wholeEquation.length === 1) {
                this.setState({
                    wholeEquation: this.state.wholeEquation.concat(`(${currentExpressionFromProps})`),
                    currentExpression: `(${result})`,
                    lastInput: ')',
                    lastResult: `(${result})`
                }, () => {

                    if (this.state.lastResult === "(Infinity)" || this.state.lastResult === "(NaN") {
                        this.setState({
                            currentExpression: "Invalid operation, please press 'AC'",
                            lastInput: '',
                            wholeEquation: ['']
                        })
                    } 
                    else {

                        this.setState({
                            resultArray: [...this.state.resultArray, { equation: this.state.wholeEquation.join(''), result: this.state.lastResult }],
                            historyIndex: this.state.historyIndex + 1
                        }, () => {
                            this.setState({
                                historyViewIndex: this.state.historyIndex
                            })
                        })
                    }
                });
            }
            else {
    
                let takeOffFirstNumber = currentExpressionFromProps.split(/(?=[-+/*()])/);
                takeOffFirstNumber.splice(0,2);
                
                // console.log(takeOffFirstNumber[0])
                let firstOperator = takeOffFirstNumber[0].split('');
                firstOperator = firstOperator.shift();
                
                let currentExpressionArray = takeOffFirstNumber.join('').split('');
                currentExpressionArray.splice(0,1);
                let currentExpressionJoined = currentExpressionArray.join('');
    
                if(firstOperator === ')') {
                    firstOperator = '+'
                }
                this.setState({
                    wholeEquation: this.state.wholeEquation.concat(`${firstOperator}(${currentExpressionJoined})`),
                    currentExpression: `(${result})`,
                    lastInput: ')',
                    lastResult: `(${result})`
                }, () => {
                    if(this.state.lastResult === "(Infinity)" || this.state.lastResult === "(NaN") {
                        this.setState({
                            currentExpression: "Invalid operation, please press 'C' or 'AC",
                            lastInput: '',
                            wholeEquation: ['']
                        })
                    }
                    else (
                        this.setState({
                            resultArray: [...this.state.resultArray, { equation: this.state.wholeEquation, result: this.state.lastResult }],
                            historyIndex: this.state.historyIndex + 1
                        }, () => {
                            this.setState({
                                historyViewIndex: this.state.historyIndex-1
                            })
                        })
                    )
                });
            }
        }



        

    }
    // saveEquation() {
    //     this.setState({
    //         wholeEquation: currentExpression
    //     })
    //     get case where they try to press enter without closing parens
    // }

    render() {
        return (
            <div>
                {/* <BrowserRouter > */}
                    <div>
                        {/* the exact makes sure that it only shows up on that path */}
                        <CalculatorBody className='container'>
                            <MainScreen className='row' style={{margin: '0px'}} 
                                        wholeEquation= {this.state.wholeEquation} 
                                        currentExpression={this.state.currentExpression}/>

                            <div className='row container' style={{width: '100%',height: '10vh',marginTop: '0px', marginBottom: '0px'}}>
                                <HistoryButton delta='-1' operation='prev' style={{fontSize: '2vh'}} historyViewIndex = {this.state.historyViewIndex} historyViewIndexChangeHandler = {this.historyViewChange}/>
                                <HistoryScreen style={{margin: '0px'}} historyScreenIndex={this.state.resultArray.length} historyScreenPressHandler = {this.historyScreenPress} displayHistoryEquation = {this.state.resultArray[this.state.historyViewIndex].equation} resultFromHistory = {this.state.resultArray[this.state.historyViewIndex].result}/>
                                <HistoryButton delta='1' operation='next' style={{fontSize: '2vh'}} historyViewIndex = {this.state.historyViewIndex} historyViewIndexChangeHandler = {this.historyViewChange}/>
                            </div>
                            <ButtonPad style={{margin: '0px'}}>
                                <div className='row' style={{height: '20%', margin: '0px'}}>
                                    <OperationButton operation='(' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation=')' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='AC' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='C' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '20%', margin: '0px'}}>
                                    <NumberButton number='7' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='8' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='9' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <OperationButton operation='/' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '20%', margin: '0px'}}>
                                    <NumberButton number='4' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='5' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='6' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <OperationButton operation='*' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '20%', margin: '0px'}}>
                                    <NumberButton number='1' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='2' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <NumberButton number='3' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <OperationButton operation='-' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '20%', margin: '0px'}}>
                                    <NumberButton number='0' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} lastInputHandler={this.lastInputSetter}/>
                                    <OperationButton operation='.' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='=' equalsHandler={this.equalsPress} numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='+' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation} lastInputHandler={this.lastInputSetter} lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                            </ButtonPad>
                        </CalculatorBody>
                    </div>
                {/* </BrowserRouter> */}
            </div>
        );
    }
};

// export default connect(null, actions)(App);
export default App;