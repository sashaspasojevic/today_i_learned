import React, { useState } from "react";
import supabase from "../supabase";
import { CATEGORIES } from "../data";

const Fact = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  const handleVote = async (columnName) => {
    setIsUpdating(true);
    const { data: updateFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error) {
      setFacts((facts) => {
        return facts.map((f) => {
          return f.id === fact.id ? updateFact[0] : f;
        });
      });
    }
  };

  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>⛔️[DISPUTED]</span> : null}
        {fact.text}
        <a className='source' href={fact.source} target='_blank'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{
          backgroundColor:
            CATEGORIES.find((cat) => cat.name === fact.category).color ||
            "history",
        }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button
          onClick={() => {
            handleVote("votesInteresting");
          }}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => {
            handleVote("votesMindblowing");
          }}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => {
            handleVote("votesFalse");
          }}
          disabled={isUpdating}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};

export default Fact;
