import * as React from "react";
import {CounterState} from "./module";
import {ActionDispatcher} from "./Container";

interface Props {
  value: CounterState;
  actions: ActionDispatcher;
  param?: string;
}

export class Counter extends React.Component<Props, {}> {

  render() {
    return (
      <div>
        {(this.props.param === undefined) ? null : <div>{this.props.param}</div>}
        {(this.props.value.loadingCount === 0) ? null : <p>loading</p>}
        <p>{`score: ${this.props.value.num}`}</p>
        <button onClick={() => this.props.actions.increment(3)}>Increment 3</button>
        <button onClick={() => this.props.actions.decrement(2)}>Decrement 2</button>
        <button onClick={() => this.props.actions.asyncIncrement()}>async Increment 100</button>
      </div>
    )
  }
}