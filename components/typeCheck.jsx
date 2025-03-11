import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function TypeCheck({ words }) {
  let letterIndex = useRef(0),
    wordIndex = useRef(0);
  const activeLetterRef = useRef(null);
  const [input, setInput] = useState([]);
  const [splitWords, setSplitWords] = useState([]);

  useEffect(() => {
    if (activeLetterRef.current) {
      activeLetterRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [letterIndex]);

  useEffect(() => {
    if (words.length > 0) {
      setSplitWords(words.join(" ").split(""));
    }
  }, [words]);

  function query(event) {
    if (event.key === "Backspace" || event.key === " ") {
      console.log(event.key);
      letterIndex.current--;
    } else if (event.key === "Enter") {
      letterIndex.current++;
    } else {
      setInput(event.target.value);
      if (words[wordIndex.current].length === letterIndex.current) {
        wordIndex.current++;
        letterIndex.current = 0;
      }
      letterIndex.current++;
    }
  }

  return (
    <>
      <div className="word-container">
        <ul>
          <textarea spellCheck={false} autoFocus type="text" onKeyUp={query} />{" "}
          {words.length > 0 ? (
            splitWords.map((char, index) => {
              const isWrong =
                input[index] && input[index] !== splitWords[index];

              return (
                <li
                  ref={index === letterIndex ? activeLetterRef : null}
                  className={isWrong ? "wrong" : "correct"}
                  key={index}
                >
                  {char === " " ? "\u00A0" : char}
                </li>
              );
            })
          ) : (
            <p>error</p>
          )}
        </ul>
      </div>
    </>
  );
}

TypeCheck.propTypes = {
  words: PropTypes.array.isRequired, // `array`, `number`, etc.
};

export default TypeCheck;
