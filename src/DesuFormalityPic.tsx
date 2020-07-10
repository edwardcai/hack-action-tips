import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import TranslatedText, {Translation} from "./TranslatedText";
import {Sentence} from "./Sentence";

const illoMap: Record<string, string> = {
  "desu": "/duo.svg",
  "da": "/duoInformal.svg",
};

export default ({sentenceId}: {sentenceId: string}) => {
  const sentence = useSelector((state: State) =>
    state.sentenceMap[sentenceId]
  );

  const verbPath = sentence.verb && illoMap[(sentence.verb ?? "")];

  return <div className={"w-full"}>
    <div
      className={"flex flex-row justify-center items-end w-full border-solid border-2 pt-12 pb-12 h64 rounded-lg"}
    >
      { verbPath && <img className="w-32 mr-6" src={verbPath}/> }
    </div>
  </div>
}