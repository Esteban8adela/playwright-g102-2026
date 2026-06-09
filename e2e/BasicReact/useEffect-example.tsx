import React, { useEffect, useState } from "react";

function CounterNoDependencies() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("useEffect has been trtiggered");
    document.title = `Clicked ${count} times`;
  });
  return (
    <div>
      <p>Click the button to increase count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

export const TimerEmptyDependency = () => {
  const [timer, setTimer] = useState<number>(0);
  // when theres is an empty dependency array, the side effect
  // will only run after the initial render of the component.
  useEffect(() => {
    // Set up subscription to a timer when component mounts
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // Clean up function: clears the subscription
    // when the component unmounts
    return() => {
        clearInterval(timerId);
    }
  }, []);
  return (
    <div>
      <p>Timer: {timer}</p>
    </div>
  );
};

export function CounterWithDependencies() {
    const [count, setCount] = useState<number>(0);
    // useEffect with dependencies: runs after initial render
    // and when the variables in dependency array change

  useEffect(() => {
    console.log("useEffect has been trtiggered");
    document.title = `Clicked ${count} times`;
  }, [count]);
  return (
    <div>
      <p>Click the button to increase count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};