import { useState } from "react";

export const ToDo = ({ id, numberOfTimesDone }) => {
  const [timesDone, setTimesDone] = useState(numberOfTimesDone);

  console.log(timesDone);

  function markAsDone() {
    // increment number in state
    setTimesDone(parseInt(timesDone, 10) + 1);

    // send a request to increment-todo?id=id
  }

  return (
    <div>
      <p>Here is a to do with id: {id}</p>
      <p>Number of times done: {timesDone}</p>
      <button onClick={() => markAsDone()}>I did this</button>
    </div>
  );
};
