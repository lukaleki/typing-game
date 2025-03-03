import { useEffect, useRef, useState } from "react";

function App() {
  const [words, setWords] = useState([]);
  const checkWordRef = useRef([]);
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(
          "https://random-word-api.vercel.app/api?words=50"
        );
        const data = await res.json();
        setWords(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWords();
  }, []);

  let letterIndex = useRef(0),
    wordIndex = useRef(-1),
    check = false;

  function typeCheck(event) {
    if (event.key === "Backspace" || event.key === " ") {
      console.log(event.key);
    } else {
      if (checkWordRef.current.length === letterIndex.current) {
        wordIndex.current++;
        let copyWords = words[wordIndex.current].split("");
        checkWordRef.current = copyWords;
        // console.log(i);
        // console.log(checkWordRef.current);
        letterIndex.current = 0;
      }

      // console.log(checkWordRef.current);
      event.key === checkWordRef.current[letterIndex.current]
        ? (check = true)
        : (check = false);
      // console.log(event.key);
      // console.log(letterIndex.current);
      letterIndex.current++;
    }
  }

  return (
    <>
      <div className="word-container">
        <ul>
          <textarea autoFocus type="text" onKeyDown={typeCheck} />{" "}
          {words.length > 0 ? (
            words
              .join(" ")
              .split("")
              .map((char, index) => (
                <li key={index}>{char === " " ? "\u00A0" : char}</li>
              ))
          ) : (
            <p>error</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
