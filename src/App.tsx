import { useState, useEffect, ChangeEvent } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { useTimer, format } from "./hooks";
import { getCurrentTime, Dayjs } from "./utils";

const Timer = ({ duration }: { duration: number }) => {
  const { time, start, pause, unpause } = useTimer(duration);

  const startTimer = () => {
    const startTime = getCurrentTime();
    start(startTime);
  };

  const restartTimer = () => {
    const startTime = getCurrentTime();
    unpause(startTime);
  };

  const stopTimer = () => {
    pause();
  };

  return (
    <>
      <h1>{format(time)}</h1>
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <button onClick={restartTimer}>restart</button>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState<number>(0);

  const setTimer = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value) * 1000);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="number" onChange={setTimer} />
      <Timer duration={duration} />
    </div>
  );
}

export default App;
