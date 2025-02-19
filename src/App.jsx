import { useEffect, useState } from "react";

function App() {
  const [words, setWords] = useState([]);
  const [checkWord, setCheckWord] = useState([]);
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

  let i = 0,
    j = 0;

  function typeCheck(event) {
    setCheckWord(words);
    console.log(checkWord);
    setCheckWord(checkWord.splice(j));
    setCheckWord(checkWord[0].split(""));
    // let input = event.target.value.split("");

    // console.log(checkWord);
    // console.log(i);
    // input[i] == checkWord[i] ? console.log("true") : console.log("false");
    i++;
    checkWord.length == i ? j++ : console.log();
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
