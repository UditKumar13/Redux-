import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
                <hr/>
                <button onClick={this.props.onStoreResult}>Store Results</button>
                <ul>

                    {this.props.StoredResults.map(strResult=>(
                           <li key={strResult.id} onClick={() =>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                 
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter:()=>dispatch({type:actionTypes.INCREMENT}),
        onDecrementCounter:()=>dispatch({type:actionTypes.DECREMENT}),
        onAddCounter:()=>dispatch({type:actionTypes.ADD,val:10}),
        onSubtractCounter:()=>dispatch({type:actionTypes.SUBTRACT,val:15}),
        onStoreResult:()=>dispatch({type:actionTypes.STORE_RESULT}),
        onDeleteResult:(id)=>dispatch({type:actionTypes.DELETE_RESULT,resultElId:id})

    };
};
const mapStateToProps = state =>{
    return{
        ctr:state.counter,
        StoredResults:state.results

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Counter);