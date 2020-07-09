import React from 'react';
import './App.css';
import TranslatedText from "./TranslatedText";
import DesuEquate from "./DesuEquate";
import {Sentence} from "./Sentence";
import EatDrinkPic from "./EatDrinkPic";

function App() {
  return (
    <div className="w-screen flex flex-col items-center mt-20 mb-64">
      <div
        className="flex w-6/12 flex-col content-center items-center space-y-6"
      >
        <div className={"w-full text-xl font-bold"}>
          Desu
        </div>
        <div className={"w-full"}>
          Let's learn to build our first sentence in Japanese!
          Like English, every sentence contains a main verb, but unlike English, every clause in
          Japanese <i>ends</i> with the main verb.
        </div>
        <div className="text-xl w-full flex flex-row justify-around">
          <div className="text-orange-600"> everything else</div>
          <div className="text-green-600"> verb</div>
        </div>
        <div className={"w-full"}>
          For our first sentence, the first verb we'll learn is "desu". This is similar to "is" in English, and can be
          used link a noun
          to a description. For example, "Duo is an owl".
        </div>
        <div className={"w-full"}>
          To use this verb, we'll usually need a topic ("Duo"), and something to describe that topic ("owl"). In
          Japanese,
          we can mark a noun as the topic by adding "wa" after the noun.
        </div>
        <Sentence sentenceId={"desuExample"}/>

        <div className={"w-full"}>
          Try creating a sentence using "desu" by clicking on the blanks in the sentence below!
        </div>
        <DesuEquate/>

        <div className={"w-full text-xl font-bold mt-12"}>
          More Verbs
        </div>
        <div className={"w-full"}>
          Now let's learn some verbs associated with actions! Like "desu", these verbs usually require a topic (what is
          performing the action).
          In addition, we can include an <span className="text-blue-600">object</span> (what the action is being
          performed on).
          <br/><br/>
          We can mark a noun as the object by adding "o" after the noun.
          <br/><br/>
          Try building a sentence below with an action verb!
        </div>
        <EatDrinkPic sentenceId={"eatDrink"}/>
        <Sentence
          sentenceId={"eatDrink"}
          sentenceOptions={{
            object: [
              {text: "gohan", translation: "rice"},
              {text: "ocha", translation: "tea"},
            ],
            topic: [
              {text: "fukurō", translation: "owl"},
              {text: "neko", translation: "cat"},
            ],
            verb: [
              {text: "tabemasu", translation: "eat"},
              {text: "nomimasu", translation: "drink"},
            ]
          }}
        />
        <div className={"w-full"}>
          In English, the subject and object of the verb is decided based on the word order. For example, "Edward
          finished the self evaluation",
          and "The self evaluation finished Edward" have subtle differences in meaning.
          However, since the topic and object in Japanese are decided by "o" and "wa", you can place the object <i>in
          front</i> of the topic!
          <br/><br/>
          Drag the words in the sentence to try out different word orders!
        </div>
        <EatDrinkPic sentenceId={"eatDrinkReorder"}/>
        <Sentence
          sentenceId={"eatDrinkReorder"}
          sentenceOptions={{
            object: [
              {text: "gohan", translation: "rice"},
              {text: "ocha", translation: "tea"},
            ],
            topic: [
              {text: "fukurō", translation: "owl"},
              {text: "neko", translation: "cat"},
            ],
            verb: [
              {text: "tabemasu", translation: "eat"},
              {text: "nomimasu", translation: "drink"},
            ]
          }}
        />
      </div>
    </div>
  );
}

export interface SentenceInfo {
  id: string
  verb?: string
  topic?: string
  noun?: string
  object?: string
  requiredParts: string[]
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
