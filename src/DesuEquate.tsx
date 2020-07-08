import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "./index";
import TranslatedText, {Translation} from "./TranslatedText";

const illoMap: Record<string, string> = {
  "fukurō": "https://design.duolingo.com/images/guides/identity-imagery-illustration-duo-wave.svg",
  "neko": "/cat.svg",
};

export default () => {
  const desuState = useSelector((state: State) => state.desuState);

  const desuSentence = `${desuState.left ?? "?"} ${desuState.right ?? "?"} desu`;

  const leftOptions = [{ text: "Duo", translation: "Duo"}];

  const rightOptions = [
    { text: "fukurō", translation: "owl"},
    { text: "neko", translation: "cat"},
  ];

  return <div className={"w-full"}>
    <div className={"flex flex-row items-center justify-around w-full"}>
      <Dropdown options={leftOptions} desuPart={"Left"} text={desuState.left ?? "?"}/>
      <div> =</div>
      <Dropdown options={rightOptions} desuPart={"Right"} text={desuState.right ?? "?"}/>
    </div>
    <div className="mt-3 text-center">
      { desuSentence }
    </div>
  </div>
}

const Dropdown = ({
  options,
  desuPart,
  text,
}: {
  options: Translation[];
  desuPart: string;
  text: string;
}) => {
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(false);
  const optionsElement = options.map(option => <div
    className="bg-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 p-2"
    onClick={(event => {
      setIsShowing(false);
      dispatch({
      selection: option.text,
      type: `desuSelect${desuPart}`
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
      onBlur={() => setIsShowing(false)}
    >
      {illoMap[text]
        ? <img className="w-12" src={illoMap[text]}/>
        : text
      }
    </div>
    {isShowing && <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg">
      {optionsElement}
    </div>
    }
  </div>
};
