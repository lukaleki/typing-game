import { useEffect, useState } from "react";
import TypeCheck from "../components/typeCheck";

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch(
          "https://random-word-api.vercel.app/api?words=70"
        );
        const data = await res.json();
        setWords(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWords();
  }, []);

  return <TypeCheck words={words} />;
}

export default App;
