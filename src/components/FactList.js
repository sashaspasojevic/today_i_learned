import React from "react";
import Fact from "./Fact";

const FactList = ({ facts, setFacts }) => {
  if (facts.length === 0) {
    return (
      <p className='message'>
        No facts for this category yet! Crate the first one 😉
      </p>
    );
  }

  return (
    <section className='sectionList'>
      <ul className='facts-list'>
        {facts.map((fact) => {
          return <Fact fact={fact} key={fact.id} setFacts={setFacts} />;
        })}
      </ul>
      <p>There are {facts.length} facts in the database. Add you own!</p>
    </section>
  );
};

export default FactList;
