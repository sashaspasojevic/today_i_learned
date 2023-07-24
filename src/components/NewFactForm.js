import React, { useState } from "react";
import supabase from "../supabase";
import { CATEGORIES } from "../data";

// check is url
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const NewFactForm = ({ setFacts, setShowForm }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);

    // check if data is valid.
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // upload facts to supabase and receive the new fac object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // console.log(newFact);

      // add the new fac to the UI
      if (!error) {
        setFacts((facts) => {
          return [newFact[0], ...facts];
        });
      }

      // reset input fields
      setText("");
      setSource("");
      setCategory("");

      // close the form
      setShowForm(false);
    }
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type='text'
        placeholder='Trustworthy source...'
        onChange={(e) => {
          setSource(e.target.value);
        }}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        disabled={isUploading}
      >
        --chose category--
        {CATEGORIES.map((cat) => {
          return (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          );
        })}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
