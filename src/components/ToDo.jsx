import { useState } from "react";
import Styles from "./ToDo.module.css";
import { getRandomEntry } from "@whitep4nth3r/get-random-entry";

const randomYays = [
  "Great job!",
  "Yes!",
  "Amazing!",
  "Well done!",
  "Awesome!",
  "Nice!",
  "Keep it up!",
  "Fantastic!",
  "Good job!",
  "You did it!",
  "You rock!",
  "Great!",
];

export const ToDo = ({ todo, showActions }) => {
  const { _id, description, times_done, date_created, user_id, flagged } = todo;

  const [timesDoneNo, setTimesDoneNo] = useState(times_done);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("I did this");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isFlagging, setIsFlagging] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

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
    setButtonText(getRandomEntry(randomYays));
    setButtonDisabled(true);
  }

  async function report() {
    setIsFlagging(true);

    const response = await fetch("/api/flag-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    });

    const data = await response.json();

    if (data.success === true) {
      setIsFlagged(true);
    }
  }

  return (
    !isFlagged && (
      <div className={`${Styles.todo} ${isFlagging ? Styles.isFlagging : ""}`}>
        <div className={Styles.topRow}>
          <p className={Styles.description}>{description}</p>
          <p className={Styles.completed}>
            Completed {timesDoneNo} {timesDoneNo === 1 ? "time" : "times"}
          </p>
          {showActions && (
            <button disabled={buttonDisabled} className={Styles.done} onClick={(e) => increment()}>
              {isLoading ? "Doing..." : ""}
              {!isLoading ? buttonText : ""}
            </button>
          )}
        </div>
        {/* <button onClick={(e) => report()} className={Styles.report}>
          Report
        </button> */}
      </div>
    )
  );
};
