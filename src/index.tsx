import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {SentenceInfo} from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import produce from "immer";
import {Provider} from "react-redux";
import {act} from "react-dom/test-utils";

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
} | {
  selection: string;
  sentenceId: string;
  type: "setVerb";
} | {
  selection: string;
  sentenceId: string;
  type: "setObject";
} | {
  selection: string;
  sentenceId: string;
  type: "setLocation";
} | {
  selection: string;
  sentenceId: string;
  type: "setTime";
} | {
  startIndex: number;
  endIndex: number;
  sentenceId: string;
  type: "reorderParts";
} | {
  part: string | undefined;
  sentenceId: string;
  type: "setHoveredPart";
}
| {
  pos: string;
  sentenceId: string;
  type: "addRequiredPart";
}

const reducer = (
  state: State = {sentenceMap: {
    "desuExample": { supportedParts: [], verb: "desu", id: "desuExample", requiredParts: ["topic", "noun", "verb"]},
    "desu": { supportedParts: [], verb: "desu", id: "desu", requiredParts: ["topic", "noun", "verb"]},
    "desuFormality": { supportedParts: [], verb: "desu", id: "desuFormality", topic: "watashi", noun: "Duo", requiredParts: ["topic", "noun", "verb"]},
    "eatDrink": { supportedParts: [], id: "eatDrink", requiredParts: ["topic", "object", "verb"]},
    "eatDrinkReorder": { supportedParts: [], id: "eatDrinkReorder", verb: "tabemasu", object: "gohan", topic: "neko", requiredParts: ["topic", "object", "verb"]},
    "moreParticles": { supportedParts: ["location", "time"], verb: "nomimasu", id: "moreParticles", topic: "Duo", object: "gohan", requiredParts: ["topic", "object", "verb"]},
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
    case "setObject":
      sentence.object = action.selection;
      break;
    case "setVerb":
      sentence.verb = action.selection;
      break;
    case "setLocation":
      sentence.location = action.selection;
      break;
    case "setTime":
      sentence.time = action.selection;
      break;
    case "reorderParts":
      const part = sentence.requiredParts[action.startIndex];
      sentence.requiredParts[action.startIndex] = sentence.requiredParts[action.endIndex];
      sentence.requiredParts[action.endIndex] = part;
      break;
    case "setHoveredPart":
      sentence.hoveredPart = action.part;
      break;
    case "addRequiredPart":
      sentence.requiredParts = [...sentence.requiredParts.slice(0, sentence.requiredParts.length - 1), action.pos, sentence.requiredParts[sentence.requiredParts.length - 1]];
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
