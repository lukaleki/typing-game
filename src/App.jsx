import { useEffect, useState } from "react";

function App() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(
          "https://random-word-api.herokuapp.com/word?number=50"
        );
        const data = await res.json();
        setWords(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWords();
  }, []);

  let i = 1,
    j = 0;

  function typeCheck(event) {
    let checkWord = words;
    let input = event.target.value.split("");
    checkWord = checkWord[0].split("");
    console.log(checkWord.length);
    console.log(i);
    // input[i] == checkWord[i] ? console.log("true") : console.log("false");
    i++;
    // console.log(i);
    if (checkWord.length == i) {
      checkWord = words;
      checkWord.splice(j++);
      i = 0;
    }
  }

  return (
    <>
      <div className="word-container">
        <ul>
          <textarea type="text" onKeyUp={typeCheck} />{" "}
          {words.length > 0 ? (
            words.map((word) => <li key={Math.random()}>{word}</li>)
          ) : (
            <p>error</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
