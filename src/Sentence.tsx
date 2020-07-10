import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {SentenceInfo} from "./App";
import TranslatedText, {Translation} from "./TranslatedText";
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';


export const Sentence = (
  {sentenceId, sentenceOptions}: { sentenceId: string, sentenceOptions?: Record<string, Translation[]> }) => {
  const sentence = useSelector((state: State) => state.sentenceMap[sentenceId]);

  const dispatch = useDispatch();

  const makePart = (pos: string, index: number, text?: string) => {
    const colorToClass: Record<string, string> = {
      verb: "text-green-600",
      topic: "text-orange-600",
      object: "text-blue-600",
    };

    const posParticle: Record<string, string> = {
      topic: "wa",
      object: "o",
    };

    const editable = <Dropdown
      options={sentenceOptions?.[pos] ?? []}
      sentenceId={sentenceId}
      sentencePart={pos}
      text={(text ?? "...") + (posParticle[pos ?? ""] ? (" " + posParticle[pos ?? ""]) : "")}
    />;

    const posLabel = colorToClass[pos ?? ""] &&
        <div className={"text-xs " + colorToClass[pos ?? ""] ?? ""}> {pos} </div>;

    return <Draggable key={pos} draggableId={pos} index={index}>
      {provided => (
        <div
          className="flex flex-col items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editable}
          {posLabel}
        </div>
      )}
    </Draggable>
  };

  const parts = sentence.requiredParts.map((part, index) =>
    // @ts-ignore
    makePart(part, index, sentence[part])
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    dispatch({
      startIndex: result.source.index,
      endIndex: result.destination.index,
      sentenceId: sentenceId,
      type: "reorderParts"
    })
  };

  const getError = (): string | undefined => {
    if (sentence.requiredParts[sentence.requiredParts.length - 1] !== 'verb') {
      return "Clauses in Japanese must end with the main verb!"
    }
  };

  const error = getError();

  const errorSentence = error && <div className="text-red-600 text-sm mt-6 flex flex-row items-center">
    <span>
      <img className="w-10 mr-6" src="./redCircle.svg"/>
    </span>
      <span>
    {error}
    </span>
  </div>;

  // @ts-ignore
  const isFullSentence = sentence.requiredParts.every(part => sentence[part]);

  const translationDisplay = isFullSentence && <TranslationDisplay sentenceId={sentenceId}/>


  return <div className="text-xl">
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {provided => (
          <div ref={provided.innerRef} className={"flex flex-row justify-center space-x-2"} {...provided.droppableProps}>
          {parts}
          </div>
        )}
      </Droppable>
      {errorSentence}
    </DragDropContext>
    {/*。*/}
    {translationDisplay}
  </div>
};

const TranslationDisplay = ({
  sentenceId
}: {
  sentenceId: string
}) => {
  const sentence = useSelector((state: State) => state.sentenceMap[sentenceId]);
  const dispatch = useDispatch();

  const getTranslation =(text: string, sentence: SentenceInfo): string => {
    const translationMap: Record<string, string> = {
      "desu": "is ",
      "da": "is ",
      "Duo": "Duo ",
      "Misu": "Misu ",
      "neko": "a cat ",
      "fukurō": "an owl ",
      "ocha": "tea ",
      "tabemasu": "eats ",
      "nomimasu": "drinks ",
      "gohan": "rice ",
      "watashi": "I ",
    };

    if (text === "desu" || text === "da") {
      if (sentence.topic === 'watashi') {
        return "am "
      }
    }

    return translationMap[text ?? ""] ?? "";
  };

  console.log (sentence.topic);

  const parts = [sentence.topic, sentence.verb, sentence.noun, sentence.object].map(part =>
    part ? getTranslation(part, sentence) : ""
  );

  return <div className="w-full flex flex-row justify-center text-sm text-gray-600 mt-3 space-x-3">
    {parts}
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsShowing(false));

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

  return <div ref={wrapperRef}>
    <div
      className={options.length > 0 ? "hover:bg-yellow-300 cursor-pointer" : ""}
      onClick={() => setIsShowing(true)}
    > {text} </div>
    {isShowing && <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg">
      {optionsElement}
    </div>
    }
  </div>
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
// @ts-ignore
function useOutsideAlerter(ref, onClick: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        // @ts-ignore
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            onClick()
          }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

