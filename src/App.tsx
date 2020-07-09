import React from 'react';
import './App.css';
import TranslatedText from "./TranslatedText";
import DesuEquate from "./DesuEquate";
import {Sentence} from "./Sentence";

function App() {
  return (
    <div className="w-screen flex flex-col items-center mt-20">
      <div
        className="flex w-6/12 flex-col content-center items-center space-y-6"
      >
        <div className={"w-full text-xl font-bold"}>
          Desu
        </div>
        <div className={"w-full"}>
          Let's learn to build our first sentence in Japanese!
          Like English, every sentence contains a main verb, but unlike English, every clause in Japanese <i>ends</i> with the main verb.
        </div>
        <div className="text-xl w-full flex flex-row justify-around">
          <div className="text-orange-600"> everything else</div>
          <div className="text-green-600"> verb</div>
        </div>
        <div className={"w-full"}>
          For our first sentence, the first verb we'll learn is "desu". This is similar to "is" in English, and can be used link a noun
          to a description. For example, "Duo is an owl".
        </div>
        <div className={"w-full"}>
          To use this verb, we'll need a topic ("Duo"), and something to describe that topic ("owl"). In Japanese,
          we can mark a noun as the topic by adding "wa" to the end of the noun.
        </div>
        <Sentence sentence={{
          verb: "desu",
          topic: "...",
          noun: "...",
        }}/>

        <div className={"w-full"}>
          Try creating a sentence using "desu"!
        </div>
        <DesuEquate/>
      </div>
    </div>
  );
}



export interface SentenceInfo {
  verb: string
  topic?: string
  noun?: string
  object?: string
}

const OwlPicture = ({
  text,
  translation
}: {
  text: string;
  translation: string;
}) => {

  return (
    <div className={"w-1/4"}>
      <img
        className={"mb-6"}
        src={"https://design.duolingo.com/images/guides/identity-imagery-illustration-duo-wave.svg"}
      />
      <TranslatedText
        text={text}
        translation={translation}
      />
    </div>
  )
};

export default App;
