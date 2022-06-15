import { useEffect, useState } from "react";

import "./App.css";
import ButtonArea from "./components/ButtonArea";
import { Display } from "./components/Display";
import a from "./a.mp3";

const operators = ["+", "-", "%", "="];

function App() {
  const [str, setStr] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false);

  const [audio] = useState(new Audio(a));
  // for audio test
  // useEffect(()=>{
  // const audio = new audio()
  // }, [])

  const handleOnClick = (value) => {
    isPrank && setIsPrank(false);
    if (value === "AC") {
      setStr("");
      return;
    }

    if (value === "=") {
      return onTotal();
    }

    if (value === "C") {
      const temStr = str.slice(0, -1);
      setStr(temStr);
      return;
    }

    if (operators.includes(value)) {
      setLastOperator(value);
      const lastchar = str.slice(-1);
      if (operators.includes(lastchar)) {
        // replace the last operator with the new one

        const strWithoutLastChar = str.slice(0, -1);
        setStr(strWithoutLastChar + value);
        return;
      }
    }

    if (value === ".") {
      if (lastOperator) {
        const positionOfLastOperator = str.lastIndexOf(lastOperator);
        const afterLastOperator = str.slice(positionOfLastOperator + 1);

        if (afterLastOperator.includes(".")) {
          return;
        }
      } else {
        if (str.includes(".")) {
          return;
        }
      }
    }
    setStr(str + value);
  };
  const onTotal = () => {
    const prankVal = randomNumber();
    prankVal > 0 && audio.play() && setIsPrank(true);
    const ttl = eval(str) + prankVal;
    setStr(ttl.toFixed(2).toString());
  };

  const randomNumber = () => {
    const num = Math.ceil(Math.random() * 10);

    return num > 3 ? 0 : num;
  };

  return (
    <div className="wrapper">
      <Display str={str} isPrank={isPrank} />

      <ButtonArea handleOnClick={handleOnClick} />

      {/* <!-- correct way is to give different div to input and all the buttons --> */}
    </div>
  );
}
export default App;
