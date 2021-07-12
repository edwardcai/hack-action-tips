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
  "Duo": "/duo.svg",
  "Duotabemasu": "/duoEat.svg",
  "Duonomimasu": "/duoDrink.svg",
  "Misu": "/catEatDrink.svg",
  "Misutabemasu": "/catEat.svg",
  "Misunomimasu": "/catDrink.svg",
  "neko": "/catEatDrink.svg",
  "nekotabemasu": "/catEat.svg",
  "nekonomimasu": "/catDrink.svg",
  "tabemasu": "/plate.svg",
  "tabemasugohan": "/plateRice.svg",
  "tabemasuocha": "/plateTea.svg",
  "nomimasu": "/cup.svg",
  "nomimasuocha": "/teaDrink.svg",
  "nomimasugohan": "/riceDrink.svg",
  "Ejiputo": "/egypt.svg",
  "Furansu": "/france.svg",
  "1月": "/snow.svg",
  "8月": "/sun.svg",
};

export default ({sentenceId}: {sentenceId: string}) => {
  const sentence = useSelector((state: State) =>
    state.sentenceMap[sentenceId]
  );

  const topicPath = sentence.topic && illoMap[(sentence.topic ?? "") + (sentence.verb ?? "")];
  const foodPath = illoMap[(sentence.verb ?? "") + (sentence.object ?? "")];
  const locationPath = illoMap[(sentence.location ?? "")];
  const timePath = illoMap[(sentence.time ?? "")];

  return <div className={"w-full relative"}>
    <div
      className={"flex flex-row justify-center items-end w-full border-solid border-2 pt-12 pb-12 h64 rounded-lg z-20 relative"}
    >
      { topicPath && <img className="w-32 mr-6" src={topicPath}/> }
      { foodPath && <img className="h-24 w-24" src={foodPath}/> }
    </div>
    {locationPath &&
    <div className={"absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-25"}>
        <img className={"w-32 z-0 relative"} src={locationPath}/>
    </div>
    }
    {timePath &&
    <div className={"absolute top-0 left-0 mt-6 ml-6 flex"}>
        <img className={"w-16 z-0 relative"} src={timePath}/>
    </div>
    }
  </div>
}