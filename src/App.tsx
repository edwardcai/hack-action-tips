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
      <Text text={
        "The first verb we'll learn is \"desu\". This is similar to \"is\" in English, and can be used to equate two things."}
      />
       <Text text={
        "Now, let's select what we want to equate!"}
      />
      <DesuEquate/>
      {/*<OwlPicture*/}
      {/*  text={"fukurō"}*/}
      {/*  translation={"owl"}*/}
      {/*/>*/}
    </div>
    </div>
  );
}

const Text = ({text}: {text: string}) => <div className={"w-full"}> {text} </div>

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
