import React from 'react';
import './App.css';
import TranslatedText from "./TranslatedText";
import DesuEquate from "./DesuEquate";

function App() {
  return (
    <div className="w-screen flex flex-col items-center mt-20">
      <div
        className="flex w-6/12 flex-col content-center items-center space-y-6"
      >
        <div className={"w-full"}>
          Let's learn to build our first sentence in Japanese!
          Like English, every sentence contains a main verb, but unlike English, every clause in Japanese <i>ends</i> with the main verb.
        </div>
        <div className="text-xl w-full flex flex-row justify-around">
          <div className="text-orange-600"> everything else</div>
          <div className="text-green-600"> verb</div>
        </div>
        <div className={"w-full"}>
          For our first sentence, the first verb we'll learn is "desu". This is similar to "is" in English, and can be used link one thing
          to a description. For example, "Duo is an owl".
        </div>
        <div className={"w-full"}>
          To use this verb, we'll need the topic ("Duo"), and something to describe that topic ("owl"). In Japanese,
          we can make something a topic by adding "wa" to the end.
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



export const Sentence = ({sentence}: {sentence: SentenceInfo}) => {
  const makePart = (text?: string, pos?: string) => {
    if (!text) {
      return null;
    }
    const colorToClass: Record<string, string> = {
      verb: "text-green-600",
      topic: "text-orange-600",
    };

    const posParticle: Record<string, string> = {
      topic: "wa"
    };

    return <div className="flex flex-col items-center">
      <div> {text + (posParticle[pos ?? ""] ? " " + posParticle[pos ?? ""] : "")} </div>
      <div className={"text-xs " + colorToClass[pos ?? ""] ?? ""}> {pos} </div>
    </div>
  };

  const parts = [
    makePart(sentence.topic, "topic"),
    makePart(sentence.noun, undefined),
    makePart(sentence.verb, "verb"),
  ];


  return <div className="text-xl w-full flex flex-row justify-center space-x-2">
    {parts}
    。
  </div>
};

interface SentenceInfo {
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
