import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
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
import DeleteButton from './DeleteButton';

var axios = require('axios');
var safeEval = require('safe-eval');


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
                       historyViewIndex: 1,
                       historyLength: 0,
                       pgArray: [{
                           equation: '',
                           result: ''
                       }]
                    };
        this.numberPress = this.numberPress.bind(this);
        this.equalsPress = this.equalsPress.bind(this);
        this.historyViewChange = this.historyViewChange.bind(this);
        this.historyScreenPress = this.historyScreenPress.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
    }
    // Update state on startup - Start
    componentDidMount() {
        //helper functions
        const set_pgArray_from_spring = (response) => {       
            this.setState({
                pgArray: response.data
            }, () => {
                // nested ajax for historyLength
                axios.get('https://calc-spring.herokuapp.com/postgres/equation/count', 
                            {
                                headers: {'Access-Control-Allow-Origin': '*'}
                            })
                .then(function (res) {
                    
                    set_historyLength_from_spring(res);

                })
                .catch(function (error) {
                    console.log(error);
                })
                // end of nested ajax for historyLength
            })
        }
        const set_historyLength_from_spring = (response) => {
            this.setState({
                historyLength: response.data
            }, () => {
                this.setState({
                    historyViewIndex: this.state.historyLength
                })
            })
        }
        // helper functions

        // Make a request for equation
        axios.get('https://calc-spring.herokuapp.com/postgres/equation/all', 
                    {
                        headers: {'Access-Control-Allow-Origin': '*'}
                    })
        .then(function (response) {
        // handle success
            set_pgArray_from_spring(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    // Update state on startup - End

    componentDidUpdate(){
        console.log(this.state)
    }

    deleteHistory(res){
        //helper functions
        const set_pgArray_from_spring = (response) => {
            this.setState({
                pgArray: response.data,
                historyViewIndex: 1
            }, () => {
                // nested ajax for historyLength
                axios.get('https://calc-spring.herokuapp.com/postgres/equation/count', 
                            {
                                headers: {'Access-Control-Allow-Origin': '*'}
                            })
                .then(function (res) {
                    
                    set_historyLength_from_spring(res);

                })
                .catch(function (error) {
                    console.log(error);
                })
                // end of nested ajax for historyLength
            })
        }
        const set_historyLength_from_spring = (response) => {
            this.setState({
                historyLength: response.data
            }, () => {
                this.setState({
                    historyViewIndex: this.state.historyLength
                }, () => this.setState({
                    currentExpression: '',
                    lastInput: '',
                    wholeEquation: ['']
                }))
            })
        }
        // helper functions



        axios.delete('https://calc-spring.herokuapp.com/postgres/equation/all', 
                {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
        .then(function (res) {
        // handle success
                axios.post('https://calc-spring.herokuapp.com/postgres/equation', { 
                        equation: '', 
                        result: ''
                    },
                    {
                        headers: {'Access-Control-Allow-Origin': '*'}
                    }
                    ).then(function (response) {
                        // Make a request for equations
                        axios.get('https://calc-spring.herokuapp.com/postgres/equation/all', 
                                    {
                                        headers: {'Access-Control-Allow-Origin': '*'}
                                    })
                        .then(function (res) {
                        // handle success
                            set_pgArray_from_spring(res);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })      
                
                })
                .catch(function (error) {
                console.log(error);
                });
        })
        .catch(function (error) {
        console.log(error);
        })   
    }

    historyViewChange(delta) {
        console.log("PrevHistoryViewIndex: " + this.state.historyViewIndex);
        let newHistoryIndex = this.state.historyViewIndex;
        let historyLength = this.state.historyLength;

        console.log("newHistoryIndex: " +newHistoryIndex + ", historyLength: " + historyLength)
        if (delta === 'prev') {
            newHistoryIndex > 0 ? (newHistoryIndex = parseInt(this.state.historyViewIndex) - 1) : console.log("end of history");
        }
        if (delta === 'next') {
            newHistoryIndex < historyLength ? (newHistoryIndex = parseInt(this.state.historyViewIndex) + 1) : console.log("end of history");
        }
        
        console.log(newHistoryIndex)
        if ( newHistoryIndex > 0 && newHistoryIndex <= historyLength) {
            this.setState({
                historyViewIndex: newHistoryIndex
            }, () => {
 
            })
        }
        else {
            console.log('end of history')
        }
    }
    // historyViewChange(delta) {
    //     let newHistoryIndex = this.state.historyViewIndex;
    //     let historyLength = this.state.resultArray.length;
    //     if (delta === 'prev') {
    //         newHistoryIndex < historyLength ? (newHistoryIndex = parseInt(this.state.historyViewIndex) - 1) : console.log("end of history");
    //     } else {
    //         newHistoryIndex > 0 ? (newHistoryIndex = parseInt(this.state.historyViewIndex) + 1) : console.log("end of history");
    //     }
        
    //     console.log(newHistoryIndex)
    //     if ( newHistoryIndex > 0 && newHistoryIndex < this.state.resultArray.length) {
    //         this.setState({
    //             historyViewIndex: newHistoryIndex
    //         }, () => {
 
    //         })
    //     }
    //     else {
    //         console.log('end of history')
    //     }
    // }

    historyScreenPress(){
        //helper functions
        const set_pgArray_from_spring = (response) => {
            this.setState({
                pgArray: response.data
            }, () => {
                // nested ajax for historyLength
                axios.get('https://calc-spring.herokuapp.com/postgres/equation/count', 
                            {
                                headers: {'Access-Control-Allow-Origin': '*'}
                            })
                .then(function (res) {
                    
                    set_historyLength_from_spring(res);

                })
                .catch(function (error) {
                    console.log(error);
                })
                // end of nested ajax for historyLength
            })
        }
        const set_historyLength_from_spring = (response) => {
            this.setState({
                historyLength: response.data
            }, () => {
                this.setState({
                    historyViewIndex: this.state.historyLength
                })
            })
        }
        // helper functions

        let equationFromHistory = this.state.pgArray[parseInt(this.state.historyViewIndex) - 1].equation;
        console.log(equationFromHistory)
        this.setState({
                lastResult: `(${this.state.pgArray[parseInt(this.state.historyViewIndex) - 1].result})`,
                lastInput: ')',
                currentExpression: `${this.state.pgArray[parseInt(this.state.historyViewIndex) - 1].result}`,
                wholeEquation: [''],
                historyViewIndex: this.state.pgArray.length - 1,
        }, () => {
            axios.post('https://calc-spring.herokuapp.com/postgres/equation', { 
                        equation: equationFromHistory, 
                        result: `${parseFloat(safeEval(equationFromHistory.toString().replace(/,/g,'')).toFixed(4).toString())}`
                    },
                    {
                        headers: {'Access-Control-Allow-Origin': '*'}
                    }
                    ).then(function (response) {
                        // Make a request for equations
                        axios.get('https://calc-spring.herokuapp.com/postgres/equation/all', 
                                    {
                                        headers: {'Access-Control-Allow-Origin': '*'}
                                    })
                        .then(function (res) {
                        // handle success
                            set_pgArray_from_spring(res);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })      
                
              })
              .catch(function (error) {
                console.log(error);
              });
        })
    }

    // historyScreenPress(){

    //     let equationFromHistory = this.state.resultArray[parseInt(this.state.historyViewIndex)].equation;

    //     this.setState({
    //             lastResult: `(${this.state.resultArray[parseInt(this.state.historyViewIndex)].result})`,
    //             lastInput: ')',
    //             currentExpression: `${this.state.resultArray[parseInt(this.state.historyViewIndex)].result}`,
    //             wholeEquation: [''],
    //             historyViewIndex: this.state.resultArray.length - 1,
    //     }, () => {

    //         this.setState({
    //             resultArray: [...this.state.resultArray, { equation: equationFromHistory, result: parseFloat(safeEval(equationFromHistory.toString().replace(/,/g,'')).toFixed(4).toString()) }],
    //             historyIndex: this.state.historyIndex + 1
    //         })
    //     })
    // }

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
                currentExpression: `(${this.state.lastResult})`,
                lastInput: ')'
            })
        }
        else if (this.state.lastInput === ')' && input>=0 && input<=9) {
            let multiplyParenthesis = '*' + input
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
        else if (input !== '=') {
            this.setState({
                currentExpression: this.state.currentExpression.concat(input),
                lastInput: input
            }, () => {
            });
        }
    }

    equalsPress(currentExpressionFromProps) {

        //helper functions
        const set_pgArray_from_spring = (response) => {
            this.setState({
                pgArray: response.data
            }, () => {
                // nested ajax for historyLength
                axios.get('https://calc-spring.herokuapp.com/postgres/equation/count', 
                            {
                                headers: {'Access-Control-Allow-Origin': '*'}
                            })
                .then(function (res) {
                    
                    set_historyLength_from_spring(res);

                })
                .catch(function (error) {
                    console.log(error);
                })
                // end of nested ajax for historyLength
            })
        }
        const set_historyLength_from_spring = (response) => {
            this.setState({
                historyLength: response.data
            }, () => {
                this.setState({
                    historyViewIndex: this.state.historyLength
                })
            })
        }
        // helper functions

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
            let result = parseFloat(safeEval(currentExpressionFromProps.replace(/,/g,'')).toFixed(4)).toString();
            console.log(parseFloat(this.state.currentExpression), parseFloat(this.state.wholeEquation[0]))
            if (this.state.wholeEquation.length === 1) {
                this.setState({
                    wholeEquation: parseFloat(this.state.currentExpression.toString().replace(/[()]/g,'')) === parseFloat(this.state.wholeEquation.toString().replace(/[()]/g,'')) ? this.state.wholeEquation : this.state.wholeEquation.concat(`(${currentExpressionFromProps})`),
                    currentExpression: `(${result})`,
                    lastInput: ')',
                    lastResult: `${result}`
                }, () => {

                    if (this.state.lastResult === "(Infinity)" || this.state.lastResult === "(NaN") {
                        this.setState({
                            currentExpression: "Invalid operation, please press 'AC'",
                            lastInput: '',
                            wholeEquation: ['']
                        })
                    } 
                    else {
                        console.log(this.state.wholeEquation.toString().replace(/,/g,''))
                        console.log("posted result: "+`${parseFloat(safeEval(this.state.wholeEquation.toString().replace(/,/g,'')).toFixed(4).toString())}`)
    
                        axios.post('https://calc-spring.herokuapp.com/postgres/equation', { 
                                        equation: this.state.wholeEquation.toString().replace(/,/g,''), 
                                        result: this.state.lastResult
                                    },
                                    {
                                        headers: {'Access-Control-Allow-Origin': '*'}
                                    }
                                    ).then(function (response) {
                                        // Make a request for equations
                                        axios.get('https://calc-spring.herokuapp.com/postgres/equation/all', 
                                                    {
                                                        headers: {'Access-Control-Allow-Origin': '*'}
                                                    })
                                        .then(function (res) {
                                        // handle success
                                            set_pgArray_from_spring(res);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })      
                                
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                    }
                });
            }
            else {
    
                let takeOffFirstNumber = currentExpressionFromProps.split(/(?=[-+/*()])/);
                
                console.log('pre-splice: ' + takeOffFirstNumber);
                takeOffFirstNumber.splice(0,2);

                
                console.log('firstNumber: '+ takeOffFirstNumber[0], 'WholeExpression: ' + takeOffFirstNumber)
                
                    
                let firstOperator; 
                
                if(takeOffFirstNumber[0] !== undefined) {
                    firstOperator= takeOffFirstNumber[0].split('');
                    firstOperator = firstOperator.shift();
                }
                else if(takeOffFirstNumber[0] === undefined) {
                    takeOffFirstNumber = currentExpressionFromProps.toString().replace(/[()]/g,'')
                }

                let currentExpressionArray;
                let currentExpressionJoined;

                if(takeOffFirstNumber.length > 2 && takeOffFirstNumber[0] !== undefined) {
                    currentExpressionArray= takeOffFirstNumber.join('').split('');
                    currentExpressionArray.splice(0,1);
                    currentExpressionJoined = currentExpressionArray.join('');
                }
                else{
                    currentExpressionJoined = takeOffFirstNumber;
                }

                if(firstOperator === ')') {
                    firstOperator = '+'
                }

                if(takeOffFirstNumber[1] === '*') {
                    takeOffFirstNumber[0] = ''
                    takeOffFirstNumber[1] = ''
                    firstOperator = '*'
                    currentExpressionJoined = takeOffFirstNumber.join('')
                }
                else if(takeOffFirstNumber[1] === '/') {
                    takeOffFirstNumber[0] = ''
                    takeOffFirstNumber[1] = ''
                    firstOperator = '/'
                    currentExpressionJoined = takeOffFirstNumber.join('')
                }
                else if(takeOffFirstNumber[1] === '+') {
                    takeOffFirstNumber[0] = ''
                    takeOffFirstNumber[1] = ''
                    firstOperator = '+'
                    currentExpressionJoined = takeOffFirstNumber.join('')
                }
                
                console.log('firstNumber: '+ takeOffFirstNumber[0], 'WholeExpression: ' + takeOffFirstNumber, "currentExpression: "+ currentExpressionJoined)
                currentExpressionJoined[0] === ')' ? currentExpressionJoined.splice(0,1).toString() : console.log('not closing paren');
                if( takeOffFirstNumber === currentExpressionJoined ) {
                        currentExpressionJoined = currentExpressionJoined[0].split('');
                        currentExpressionJoined[0]=''
                        currentExpressionJoined = currentExpressionJoined.join('');
                        console.log('fixed the undefined 1 number situation')

                }


                console.log('firstNumber: '+ takeOffFirstNumber[0], 'WholeExpression: ' + takeOffFirstNumber, "currentExpression: "+ currentExpressionJoined)
                
                if( currentExpressionJoined === '.') {
                    takeOffFirstNumber = takeOffFirstNumber[0].split('')
                    takeOffFirstNumber[0] = '';
                    currentExpressionJoined = takeOffFirstNumber.toString().replace(/,/g,'');
                }

                this.setState({
                    wholeEquation: firstOperator === undefined ? takeOffFirstNumber : firstOperator === currentExpressionJoined ? this.state.wholeEquation.concat(`${currentExpressionJoined}`) : this.state.wholeEquation.concat(`${firstOperator}(${currentExpressionJoined})`),
                    currentExpression: firstOperator === currentExpressionJoined ? result :`(${result})`,
                    lastInput: ')',
                    lastResult: `${result}`
                }, () => {
                    if(this.state.lastResult === "(Infinity)" || this.state.lastResult === "(NaN") {
                        this.setState({
                            currentExpression: "Invalid operation, please press 'C' or 'AC",
                            lastInput: '',
                            wholeEquation: ['']
                        })
                    }
                    else {
                        axios.post('https://calc-spring.herokuapp.com/postgres/equation', { 
                                        equation: this.state.wholeEquation.toString().replace(/,/g,''), 
                                        result: this.state.lastResult
                                    },
                                    {
                                        headers: {'Access-Control-Allow-Origin': '*'}
                                    }
                                    ).then(function (response) {
                                        // Make a request for equations
                                        axios.get('https://calc-spring.herokuapp.com/postgres/equation/all', 
                                                    {
                                                        headers: {'Access-Control-Allow-Origin': '*'}
                                                    })
                                        .then(function (res) {
                                        // handle success
                                            set_pgArray_from_spring(res);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })      
                                
                              })
                              .catch(function (error) {
                                console.log(error);
                              })
                    }
                });
            }
        }



        

    }
    
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
                                <HistoryScreen style={{margin: '0px'}} historyScreenIndex={this.state.pgArray.length} historyScreenPressHandler = {this.historyScreenPress} displayHistoryEquation = {this.state.pgArray[this.state.historyViewIndex-1].equation} resultFromHistory = {this.state.pgArray[this.state.historyViewIndex-1].result}/>
                                <HistoryButton delta='1' operation='next' style={{fontSize: '2vh'}} historyViewIndex = {this.state.historyViewIndex} historyViewIndexChangeHandler = {this.historyViewChange}/>
                            </div>
                            <ButtonPad style={{margin: '0px'}}>
                                <div className='row' style={{height: '18%', margin: '0px'}}>
                                    <OperationButton operation='(' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation=')' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}   lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='AC' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}   lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='C' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}   lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '18%', margin: '0px'}}>
                                    <NumberButton number='7' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='8' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='9' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <OperationButton operation='/' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '18%', margin: '0px'}}>
                                    <NumberButton number='4' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='5' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='6' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <OperationButton operation='*' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '18%', margin: '0px'}}>
                                    <NumberButton number='1' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='2' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <NumberButton number='3' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <OperationButton operation='-' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '18%', margin: '0px'}}>
                                    <NumberButton number='0' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} />
                                    <OperationButton operation='.' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='=' equalsHandler={this.equalsPress} numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                    <OperationButton operation='+' numberPressHandler={this.numberPress} currentExpression={this.state.currentExpression} wholeEquation={this.state.wholeEquation}  lastInput = {this.state.lastInput} lastResult = {this.state.lastResult}/>
                                </div>
                                <div className='row' style={{height: '10%', margin: '0px'}}>
                                    <DeleteButton operation='Delete History' deleteHistoryHandler={this.deleteHistory} ></DeleteButton>
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