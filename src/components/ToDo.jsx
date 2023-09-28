import { useState } from "react";

export const ToDo = ({ id, numberOfTimesDone }) => {
  const [timesDone, setTimesDone] = useState(numberOfTimesDone);
  const [isLoading, setIsLoading] = useState(false);

  function markAsDone() {
    setIsLoading(true);
    // send a request to increment-todo?id=id

    // fake the API call time right now
    setTimeout(() => {
      const newTimesDone = parseInt(timesDone, 10) + 1;
      setTimesDone(newTimesDone); // add data from API call
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div>
      <p>Here is a to do with id: {id}</p>
      <p>Number of times done: {timesDone}</p>
      <button onClick={() => markAsDone()}>
        {isLoading ? "Loading..." : ""}
        {!isLoading ? "I did this" : ""}
      </button>
    </div>
  );
};
