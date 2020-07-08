import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import produce from "immer";
import {Provider} from "react-redux";

export interface State {
  desuState: {
    left?: string,
    right?: string
  }
}

export type Action = {
  selection: string;
  type: "desuSelectLeft";
} | {
  selection: string;
  type: "desuSelectRight";
}

const reducer = (
  state: State = {
    desuState: {}
  },
  action: Action
): State => produce(state, (draft: State) => {
  switch (action.type) {
    case "desuSelectLeft":
      draft.desuState.left = action.selection;
      break;
    case "desuSelectRight":
      draft.desuState.right = action.selection;
      break;
  }
  return draft;
});

const store = createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
