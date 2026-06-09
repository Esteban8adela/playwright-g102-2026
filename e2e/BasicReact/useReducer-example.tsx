import React, { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  CHANGE_NAME: "CHANGE_NAME",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTIONS.CHANGE_NAME:
      return { ...state, name: "name changed" };
    default:
      return state;
  }
};

const initialState = { count: 0, name: "Sarah Sopia" };
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
    </div>
  );
};