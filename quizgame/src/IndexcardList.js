import React from "react";
import Indexcard from "./Indexcard";

export default function IndexcardList({ indexcards }) {
  return (
    <div className="indexcard-layout">
      {indexcards.map((indexcard) => {
        return <Indexcard indexcard={indexcard} key={indexcard.id} />;
      })}
    </div>
  );
}
