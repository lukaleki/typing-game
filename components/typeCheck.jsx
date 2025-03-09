import { useRef, useState } from "react";
import PropTypes from "prop-types";

function TypeCheck({ words }) {
  const checkWordRef = useRef([]);
  let letterIndex = useRef(0),
    wordIndex = useRef(-1),
    charsPassed = useRef(0);

  const [input, setInput] = useState([]);

  function logic() {
    charsPassed.current += checkWordRef.current.length;
    wordIndex.current++;
    let copyWords = words[wordIndex.current].split("");
    checkWordRef.current = copyWords;
    letterIndex.current = 0;
  }

  function query(event) {
    if (event.key === "Backspace" || event.key === " ") {
      console.log(event.key);
      letterIndex.current++;
    } else {
      setInput(event.target.value);
      checkWordRef.current.length === letterIndex.current
        ? logic()
        : console.log(checkWordRef.current);
      letterIndex.current++;
    }
  }

  return (
    <>
      <div className="word-container">
        <ul>
          <textarea autoFocus type="text" onKeyDown={query} />{" "}
          {words.length > 0 ? (
            words
              .join(" ")
              .split("")
              .map((char, index) => {
                const isWrong =
                  index > charsPassed.current - 1 &&
                  input[index] &&
                  input[index] !== checkWordRef.current[index];

                console.log(charsPassed.current);
                console.log(index);

                return (
                  <li className={isWrong ? "wrong" : "correct"} key={index}>
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
