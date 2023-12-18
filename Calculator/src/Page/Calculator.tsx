import { useState, useEffect } from "react";
import "./Calculator.css";
import clickSound from "../sound/click.mp3";

export const Calculator = () => {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState(0);
  const [memory, setMemory] = useState(0);
  const [operator, setOperator] = useState("");
  const clickAudio = new Audio(clickSound);

  const playClickSound = () => {
    clickAudio.volume = 0.5;
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const isOperator = (char: string) => {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(char);
  };

  const handleNumberClick = (num: string) => {
    if (num === "." && display.toString().includes(".")) {
      return;
    }

    setInput((prevInput) => {
      const newInput =
        prevInput === "0" || isOperator(prevInput.slice(-1))
          ? num
          : num === "."
          ? prevInput.toString() + num
          : prevInput + num;

      return newInput;
    });

    setDisplay((prevDisplay) => {
      const newDisplay =
        prevDisplay === 0
          ? num
          : num === "."
          ? prevDisplay.toString() + num
          : Number(prevDisplay.toString() + num);

      return newDisplay as number;
    });

    playClickSound();
  };

  const handleOperatorClick = (op: string) => {
    setOperator(op);
    setMemory(Number(display));
    setInput((prevInput) => prevInput + " " + op + " ");
    setDisplay(0);
    playClickSound();
  };

  const handleEqualsClick = () => {
    let result = 0;

    if (operator === "+") {
      result = memory + Number(display);
    } else if (operator === "-") {
      result = memory - Number(display);
    } else if (operator === "*") {
      result = memory * Number(display);
    } else if (operator === "/") {
      result = memory / Number(display);
    }

    setInput((prevInput) => prevInput + " = \n" + result);
    setDisplay(result);
    setMemory(result);
    setOperator("");
    playClickSound();
  };

  const HandleClick = (op: string) => {
    if (op === "ac") {
      setInput("");
      setDisplay(0);
      setMemory(0);
      setOperator("");
      playClickSound();
    } else if (op === "<-") {
      setInput((prevInput) => prevInput.slice(0, -1));
      setDisplay(Number(display.toString().slice(0, -1)));
      playClickSound();
    } else if (op === "e") {
      setInput("Math.E");
      setDisplay(Math.E);
      playClickSound();
    } else if (op === "μ") {
      setInput((prevInput) => prevInput + " -" + memory);
      setDisplay(-memory);
      playClickSound();
    } else if (op === "sin") {
      setInput(`Math.sin(${memory})`);
      setDisplay(Math.sin(memory));
      playClickSound();
    } else if (op === "deg") {
      setInput((prevInput) => prevInput + ` ${memory} * (Math.PI / 180)`);
      setDisplay(memory * (Math.PI / 180));
      playClickSound();
    } else if (!isOperator(op)) {
      setInput((prevInput) => prevInput + op);
      playClickSound();
    }
  };

  useEffect(() => {
    return () => {
      clickAudio.pause();
    };
  }, []);

  return (
    <div className="Calculator">
      <div className="Calculator__display">
        <div className="Calculator__display__Memory">
          <div className="Calculator__display__Memory">
            {input.split("\n").pop()}
          </div>
        </div>
        <div className="Calculator__display__Result">{display}</div>
      </div>

      <div className="Calculator__buttons__Container">
        <div className="Calculator__Small__Container">
          <button
            className="Calculator__Buttons__Small"
            onClick={() => {
              HandleClick("e");
            }}
          >
            e
          </button>
          <button
            className="Calculator__Buttons__Small"
            onClick={() => {
              HandleClick("μ");
            }}
          >
            μ
          </button>
          <button
            className="Calculator__Buttons__Small"
            onClick={() => {
              HandleClick("sin");
            }}
          >
            sin
          </button>
          <button
            className="Calculator__Buttons__Small"
            onClick={() => {
              HandleClick("deg");
            }}
          >
            deg
          </button>
        </div>
        <div className="Calculator__Buttons__Top">
          <button
            className="Calculator__Buttons__DLT"
            onClick={() => {
              HandleClick("ac");
            }}
          >
            Ac
          </button>
          <button
            className="Calculator__Buttons__DLT"
            onClick={() => {
              HandleClick("<-");
            }}
          >
            <i className="bx bx-arrow-back"></i>
          </button>
          <button
            className="Calculator__Buttons__R1"
            onClick={() => handleOperatorClick("/")}
          >
            /
          </button>
          <button
            className="Calculator__Buttons__R1"
            onClick={() => handleOperatorClick("*")}
          >
            *
          </button>
          <button
            className="Calculator__Buttons"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="Calculator__Buttons"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="Calculator__Buttons"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
          <button
            className="Calculator__Buttons__R1"
            onClick={() => handleOperatorClick("-")}
          >
            -
          </button>
        </div>
        <div className="Calculator__Buttons__Section">
          <div className="Calculator__Section__Left">
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("4")}
            >
              4
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("5")}
            >
              5
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("6")}
            >
              6
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("1")}
            >
              1
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("2")}
            >
              2
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick("3")}
            >
              3
            </button>
            <button
              className="Calculator__Buttons__0"
              onClick={() => handleNumberClick("0")}
            >
              0
            </button>
            <button
              className="Calculator__Buttons"
              onClick={() => handleNumberClick(".")}
            >
              .
            </button>
          </div>
          <div className="Calculator__Section__Right">
            <button
              className="Calculator__Buttons__R2"
              onClick={() => handleOperatorClick("+")}
            >
              +
            </button>
            <button
              className="Calculator__Buttons__R3"
              onClick={() => handleEqualsClick()}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
