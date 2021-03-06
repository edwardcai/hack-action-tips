import React from 'react';
import './App.css';
import TranslatedText from "./TranslatedText";
import DesuEquate from "./DesuEquate";
import {Sentence} from "./Sentence";
import EatDrinkPic from "./EatDrinkPic";
import DesuFormalityPic from "./DesuFormalityPic";
import Particles from "./Particles";

function App() {
  return (
    <div className="w-screen flex flex-col items-center mt-20 mb-64">
      <div
        className="flex w-4/12 flex-col content-center items-center space-y-6"
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

        <div className={"w-full text-xl font-bold"}>
          Formality
        </div>
        <div className={"w-full"}>
          Japanese language changes greatly based on the level of formality that is being expressed. This can be based on age, social status, and many other factors.
          <br/><br/>
          These levels in formality can be expressed based on the verb. Try changing "desu" into a less formal version!
        </div>
        <DesuFormalityPic sentenceId={"desuFormality"}/>
        <Sentence
          sentenceId={"desuFormality"}
          sentenceOptions={{
            verb: [
              {text: "desu", translation: "is"},
              {text: "da", translation: "is"},
            ]
          }}
        />

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
              {text: "fukur??", translation: "owl"},
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
              {text: "fukur??", translation: "owl"},
              {text: "neko", translation: "cat"},
            ],
            verb: [
              {text: "tabemasu", translation: "eat"},
              {text: "nomimasu", translation: "drink"},
            ],
          }}
        />

        <div className={"w-full text-xl font-bold"}>
          More Particles!
        </div>
        <div className={"w-full"}>
          Previously, we learned that "wa" marks the topic of a sentence and that "o" marks the object of a sentence.
          These are examples of <b>particles</b>; and we can use other particles to add information to a sentence such
          as time, location, and more!
          <br/><br/>
          Try adding more details to the sentence with more particles!
        </div>
        <EatDrinkPic sentenceId={"moreParticles"}/>
        <Sentence
          sentenceId={"moreParticles"}
          sentenceOptions={{
            object: [
              {text: "gohan", translation: "rice"},
              {text: "ocha", translation: "tea"},
            ],
            topic: [
              {text: "Duo", translation: "Duo"},
              {text: "Misu", translation: "misu"},
            ],
            verb: [
              {text: "tabemasu", translation: "eat"},
              {text: "nomimasu", translation: "drink"},
            ],
            location: [
              {text: "Furansu", translation: "France"},
              {text: "Ejiputo", translation: "Egypt"},
            ],
            time: [
              {text: "1???", translation: "January"},
              {text: "8???", translation: "August"},
            ]
          }}
        />
        <Particles
          sentenceId={"moreParticles"}
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
  location?: string
  time?: string
  requiredParts: string[],
  supportedParts: string[],
  hoveredPart?: string
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
