import { useState } from "react";

export const ToDo = ({ todo, showActions }) => {
  const { _id, description, times_done, date_created, user_id } = todo;

  const [timesDoneNo, setTimesDoneNo] = useState(times_done);
  const [isLoading, setIsLoading] = useState(false);

  async function increment() {
    setIsLoading(true);

    const response = await fetch("/api/increment-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    });

    const data = await response.json();
    setTimesDoneNo(data.times_done);
    setIsLoading(false);
  }

  return (
    <div>
      <p>{description}</p>
      <p>Completed {timesDoneNo} times</p>
      {showActions && (
        <>
          <button onClick={(e) => increment()}>
            {isLoading ? "Loading..." : ""}
            {!isLoading ? "I did this" : ""}
          </button>
          <button>Report</button>
        </>
      )}
    </div>
  );
};
