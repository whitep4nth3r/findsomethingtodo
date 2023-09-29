import { useState } from "react";

export const ToDo = ({ todo }) => {
  const { _id, description, timesDone, flagged, date_created, user_id } = todo;

  const [timesDoneNo, setTimesDoneNo] = useState(timesDone);
  const [isLoading, setIsLoading] = useState(false);

  function markAsDone() {
    setIsLoading(true);
    // send a request to increment-todo?id=id

    // fake the API call time right now
    setTimeout(() => {
      const newTimesDone = parseInt(timesDoneNo, 10) + 1;
      setTimesDone(newTimesDone); // add data from API call
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div>
      <p>Here is a to do with id: {_id}</p>
      <p>{description}</p>
      <p>Number of times done: {timesDoneNo}</p>
      <button onClick={() => markAsDone()}>
        {isLoading ? "Loading..." : ""}
        {!isLoading ? "I did this" : ""}
      </button>
    </div>
  );
};
