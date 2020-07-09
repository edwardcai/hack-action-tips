import React, {useState} from 'react';
import './App.css';
import {SentenceInfo} from "./App";
import TranslatedText, {Translation} from "./TranslatedText";
import {useDispatch} from "react-redux";

export const Sentence = ({sentence}: { sentence: SentenceInfo }) => {
  const makePart = (pos: string, text?: string,) => {
    const colorToClass: Record<string, string> = {
      verb: "text-green-600",
      topic: "text-orange-600",
    };

    const posParticle: Record<string, string> = {
      topic: "wa"
    };

    const optionsMap: Record<string, Translation[]> = {
      noun: [
        {text: "fukurō", translation: "owl"},
        {text: "neko", translation: "cat"},
      ],
      topic: [
        {text: "Duo", translation: "Duo"},
        {text: "Misu", translation: "Misu"},
      ]
    };

    const editable = <Dropdown
      options={optionsMap[pos] ?? []}
      sentenceId={sentence.verb}
      sentencePart={pos}
      text={(text ?? "...") + (posParticle[pos ?? ""] ? (" " + posParticle[pos ?? ""]) : "")}
    />;

    const posLabel = colorToClass[pos ?? ""] &&
        <div className={"text-xs " + colorToClass[pos ?? ""] ?? ""}> {pos} </div>;

    return <div className="flex flex-col items-center">
      {editable}
      {posLabel}
    </div>
  };

  const parts = [
    makePart("topic", sentence.topic),
    makePart("noun", sentence.noun),
    makePart("verb", sentence.verb),
  ];


  return <div className="text-xl w-full flex flex-row justify-center space-x-2">
    {parts}
    。
  </div>
};

const Dropdown = ({
  options,
  sentenceId,
  sentencePart,
  text,
}: {
  options: Translation[];
  sentenceId: string;
  sentencePart: string;
  text: string;
}) => {
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(false);
  const optionsElement = options.map(option => <div
    className="text-base bg-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 p-2"
    onClick={(event => {
      setIsShowing(false);
      dispatch({
      sentenceId: sentenceId,
      selection: option.text,
      type: `set${sentencePart.charAt(0).toUpperCase() + sentencePart.slice(1)}`
      });
    })
    }
  >
    <TranslatedText
      text={option.text}
      translation={option.translation}
    />
  </div>);

  return <div>
    <div
      onClick={() => setIsShowing(true)}
    > {text} </div>
    {isShowing && <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg">
      {optionsElement}
    </div>
    }
  </div>
};
