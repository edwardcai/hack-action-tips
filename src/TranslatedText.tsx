import React from 'react';
import './App.css';

export interface Translation {
  text: string,
  translation: string;
}

export default ({
  text,
  translation
}: {
  text: string;
  translation?: string;
}) => {
  return <div className={"flex flex-col items-center"}>
    <div> {text} </div>
    { translation && <div className={"text-gray-500"}> {translation} </div> }
  </div>
}
