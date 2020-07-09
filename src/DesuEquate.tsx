import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import TranslatedText, {Translation} from "./TranslatedText";
import {Sentence} from "./Sentence";

const illoMap: Record<string, string> = {
  "fukurō": "https://design.duolingo.com/images/guides/identity-imagery-illustration-duo-wave.svg",
  "neko": "/cat.svg",
};

export default () => {
  const desuState = useSelector((state: State) => state.sentenceMap["desu"] ?? {});

  const leftText = desuState.topic ?? "?";
  const rightText = desuState.noun ?? "?";

  return <div className={"w-full"}>
    <div className={"flex flex-row items-center justify-around w-full border-solid border-2 pt-12 pb-12 h64 rounded-lg"}>
      <div>
        {illoMap[leftText]
          ? <img className="w-12" src={illoMap[leftText]}/>
          : leftText
        }
      </div>
      <div>=</div>
            <div>
        {illoMap[rightText]
          ? <img className="w-12" src={illoMap[rightText]}/>
          : rightText
        }
      </div>
    </div>
    <div className="mt-3 text-center">
      <Sentence sentence={{
        verb: "desu",
        topic: desuState.topic,
        noun: desuState.noun,
      }}/>
    </div>
  </div>
}