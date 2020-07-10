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
  const dispatch = useDispatch();

  const posToParticle: Record<string, string> = {
    "object": "o",
    "topic": "wa",
    "location": "de"
  };

  const makePart = (pos: string) => {
    const particle = posToParticle[pos];
    if (!particle) {
      return null;
    }

    // @ts-ignore
    const currValue = sentence[pos] ?? "...";
    const currValueDisplay = sentence.requiredParts.includes(pos)
      ? <span> {currValue} </span>
      : <button
        className={"bg-blue-500 hover:bg-blue-700 text-white text-base font-bold px-2 rounded"}
        onClick={() => dispatch({
          pos: pos,
          sentenceId: sentenceId,
          type: "addRequiredPart"
        })}
      >
        +
      </button>;

    return <div className={"pl-3 pr-3 pt-2 pb-2 flex flex-row justify-between" + (pos === sentence.hoveredPart ? " bg-gray-200" : "")}>
      <div>
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
  };

  const supportedNoDup = sentence.supportedParts.filter((part) => !sentence.requiredParts.includes(part));

  const parts = [...sentence.requiredParts, ...supportedNoDup].map(pos => {
    return makePart(pos)
  });

  return <div className="w-full border-2 rounded-md">
    <div className="w-full bg-gray-400 font-bold p-3">
      Particles
    </div>
    {parts}
  </div>

}