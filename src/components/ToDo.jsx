import { useState } from "react";

export const ToDo = ({ id }) => {
  const [timesDone, setTimesDone] = useState(getTimesDone(id));

  function getTimesDone(id) {
    // get the number of times done
    // call get-todo?id=id
  }

  function markAsDone(id) {
    // send a request to increment-todo?id=id
    // update the number of times done with response
    setTimesDone("new number of times done");
  }

  return (
    <div>
      <p>Here is a to do with id: {id}</p>
      <p>Number of times done: {timesDone}</p>
      <button onClick={(id) => markAsDone(id)}>Delete</button>
    </div>
  );
};
