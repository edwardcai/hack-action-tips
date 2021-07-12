import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {SentenceInfo} from "./App";
import TranslatedText, {Translation} from "./TranslatedText";
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';


export default ({
                  sentenceId
                }: {
  sentenceId: string,
  sentenceOptions?: Record<string, Translation[]>
}) => {

  const sentence = useSelector((state: State) => state.sentenceMap[sentenceId]);

  const supportedNoDup = sentence.supportedParts.filter((part) => !sentence.requiredParts.includes(part));

  const parts = [...sentence.requiredParts, ...supportedNoDup].map(pos => {
    return <ParticleRow pos={pos} sentence={sentence}/>
  });

  return <div className="w-full border-2 rounded-md">
    <div className="w-full bg-gray-400 font-bold p-3">
      Particles
    </div>
    {parts}
  </div>
}

const ParticleRow = ({
  sentence,
  pos
}: {
  sentence: SentenceInfo,
  pos: string
}) => {
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);

  const posToParticle: Record<string, string> = {
    "object": "o",
    "topic": "wa",
    "location": "de",
    "time": "ni"
  };

  const particle = posToParticle[pos];
  if (!particle) {
    return null;
  }

  // @ts-ignore
  const currValue = sentence[pos] ?? "...";
  const currValueDisplay = sentence.requiredParts.includes(pos)
    ? <span> {currValue} <span className={"font-bold"}>{" " + particle}</span> </span>
    : <button
      className={"bg-blue-500 hover:bg-blue-700 text-white text-base font-bold px-2 rounded"}
      onClick={() => dispatch({
        pos: pos,
        sentenceId: sentence.id,
        type: "addRequiredPart"
      })}
    >
      +
    </button>;

  const topicActionMap: Record<string, string> = {
    "nomimasu": "drinking",
    "tabemasu": "eating",
  };
  const action = topicActionMap[sentence.verb ?? ""];

  const topicMap: Record<string, string> = {
    "Duo": "Duo",
    "Misu": "Misu",
  };
  const topic = topicMap[sentence.topic ?? ""];

  const actionObjectMap: Record<string, string> = {
    "nomimasu": "drunk",
    "tabemasu": "eaten",
  };
  const actionObject = actionObjectMap[sentence.verb ?? ""];

  const objectMap: Record<string, string> = {
    "gohan": "The rice",
    "ocha": "The tea",
  };
  const object = objectMap[sentence.object ?? ""];

  const locationMap: Record<string, string> = {
    "Furansu": "France",
    "Ejiputo": "Egypt",
  };
  const location = locationMap[sentence.location ?? ""];

    const timeMap: Record<string, string> = {
    "1月": "January",
    "8月": "August",
  };
  const time = timeMap[sentence.time ?? ""];

  const getExplanation = (): string => {
    if (pos === "topic") {
      return `What is doing the action of ${action}? ${topic} is!`
    }

    if (pos === "object") {
      return `What is being ${actionObject}? ${object} is being ${actionObject}!`
    }

    if (pos === "location") {
      return `Where is ${topic} ${action}? In ${location}!`
    }

    if (pos === "time") {
      return `When is ${topic} ${action}? In ${time}!`
    }

    return ""
  };

  // @ts-ignore
  const explanation = isExpanded && sentence[pos] && <div className="text-sm text-gray-600 mt-2">
        {getExplanation()}
    </div>;

  return <div className={"pl-3 pr-3 pt-2 pb-2 " + (pos === sentence.hoveredPart ? " bg-gray-200" : "")}>
    <div
      className={"flex flex-row justify-between"}>
      <div onClick={() => setIsExpanded(!isExpanded)}>
      <span className="text-gray-600 text-sm mr-3">
        {isExpanded ? "▲" : "▼"}
      </span>
        <span className="font-bold">
        {pos}
      </span>
        <span>
        {` (${particle})`}
      </span>
      </div>
      <div>
        {currValueDisplay}
      </div>
    </div>
    {explanation}
  </div>
};