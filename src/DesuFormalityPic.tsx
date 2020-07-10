import React, {useEffect, useState} from 'react';
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

  const dispatch = useDispatch();

  const [sliderVal, setSliderVal] = useState("75");

  useEffect(() => {
    if (parseInt(sliderVal) > 50 && sentence.verb === "da") {
      dispatch({
        sentenceId: sentenceId,
        selection: "desu",
        type: "setVerb"
      })
    }
    if (parseInt(sliderVal) < 50 && sentence.verb === "desu") {
      dispatch({
        sentenceId: sentenceId,
        selection: "da",
        type: "setVerb"
      })
    }
  }, [sliderVal]);

    useEffect(() => {
    if (parseInt(sliderVal) > 50 && sentence.verb === "da") {
      setSliderVal("25")
    }
    if (parseInt(sliderVal) < 50 && sentence.verb === "desu") {
      setSliderVal("75")
    }
  }, [sentence.verb]);

  const verbPath = sentence.verb && illoMap[(sentence.verb ?? "")];

  return <div className={"w-full flex flex-col items-center"}>
    <div
      className={"flex flex-row justify-center items-end w-full border-solid border-2 pt-12 pb-12 h64 rounded-lg"}
    >
      {verbPath && <img className="w-32 mr-6" src={verbPath}/>}
    </div>
    <div className="mt-6 flex flex-row items-center space-x-3">
      <span> Less Formal </span>
      <input type="range" id="cowbell" name="cowbell"
             onChange={(event) => setSliderVal(event.target.value)}
             min="0" max="100" value={sliderVal} step="10">
      </input>
      <span> More Formal </span>
    </div>
  </div>
}