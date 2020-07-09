import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {SentenceInfo} from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import produce from "immer";
import {Provider} from "react-redux";

export interface State {
  sentenceMap: Record<string, SentenceInfo>
}

export type Action = {
  selection: string;
  sentenceId: string;
  type: "setTopic";
} | {
  selection: string;
  sentenceId: string;
  type: "setNoun";
}

const reducer = (
  state: State = {sentenceMap: {
    "desu": { verb: "desu"}
    }},
  action: Action
): State => produce(state, (draft: State) => {
  const sentence = draft.sentenceMap[action.sentenceId];
  if (!sentence) {
    return draft;
  }
  switch (action.type) {
    case "setTopic":
      sentence.topic = action.selection;
      break;
    case "setNoun":
      sentence.noun = action.selection;
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
