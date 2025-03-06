import { useRef, useState } from "react";
import PropTypes from "prop-types";

function TypeCheck({ words }) {
  const checkWordRef = useRef([]);
  let letterIndex = useRef(0),
    wordIndex = useRef(-1);

  const [input, setInput] = useState([]);

  // if (event.key === "Backspace" || event.key === " ") {
  //   console.log(event.key);
  // } else {
  //   if (checkWordRef.current.length === letterIndex.current) {
  function logic() {
    wordIndex.current++;
    let copyWords = words[wordIndex.current].split("");
    checkWordRef.current = copyWords;
    letterIndex.current = -1;
  }

  //   }
  //   letterIndex.current++;
  // }

  function query(event) {
    setInput(event.target.value);

    checkWordRef.current.length === letterIndex.current
      ? logic()
      : console.log(checkWordRef.current);
    letterIndex.current++;

    // console.log(checkWordRef.current[letterIndex.current]);
  }

  return (
    <>
      <div className="word-container">
        <ul>
          <textarea autoFocus type="text" onChange={query} />{" "}
          {words.length > 0 ? (
            words
              .join(" ")
              .split("")
              .map((char, index) => {
                const isCurrent = index === letterIndex.current;
                const isWrong =
                  isCurrent &&
                  input[index] &&
                  input[index] !== checkWordRef.current[letterIndex.current];

                console.log(index);
                // console.log(checkWordRef.current[letterIndex.current]);

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
