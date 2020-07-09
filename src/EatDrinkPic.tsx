import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import TranslatedText, {Translation} from "./TranslatedText";
import {Sentence} from "./Sentence";

const illoMap: Record<string, string> = {
  "fukurō": "/duo.svg",
  "fukurōtabemasu": "/duoEat.svg",
  "fukurōnomimasu": "/duoDrink.svg",
  "neko": "/catEatDrink.svg",
  "nekotabemasu": "/catEat.svg",
  "nekonomimasu": "/catDrink.svg",
  "tabemasu": "/plate.svg",
  "tabemasugohan": "/plateRice.svg",
  "tabemasuocha": "/plateTea.svg",
  "nomimasu": "/cup.svg",
  "nomimasuocha": "/teaDrink.svg",
  "nomimasugohan": "/riceDrink.svg",
};

export default ({sentenceId}: {sentenceId: string}) => {
  const sentence = useSelector((state: State) =>
    state.sentenceMap[sentenceId]
  );

  const topicPath = sentence.topic && illoMap[(sentence.topic ?? "") + (sentence.verb ?? "")];
  const foodPath = illoMap[(sentence.verb ?? "") + (sentence.object ?? "")];

  return <div className={"w-full"}>
    <div
      className={"flex flex-row justify-center items-end w-full border-solid border-2 pt-12 pb-12 h64 rounded-lg"}
    >
      { topicPath && <img className="w-32 mr-6" src={topicPath}/> }
      { foodPath && <img className="h-24 w-24" src={foodPath}/> }
    </div>
  </div>
}