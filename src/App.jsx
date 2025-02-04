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

  return (
    <>
      <div className="word-container">
        <textarea type="text" />{" "}
        <ul>
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
