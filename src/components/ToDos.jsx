import { useState, useEffect } from "react";
import { getSession } from "../utils/session.js";
import { ToDo } from "./ToDo.jsx";

export function ToDos({ todos, limit }) {
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // declare the data fetching function
    const filterTodos = async () => {
      const session = await getSession();
      const userId = session !== null ? session.user.id : "12345";
      setUserId(userId);

      const filtered = todos.filter((todo) => todo.user_id !== userId).splice(0, limit);
      setFilteredTodos(filtered);
    };

    filterTodos();
    return () => {};
  }, []);

  return (
    <ul>
      {filteredTodos.map((item) => (
        <li key={item._id}>
          <ToDo todo={item} client:load />
        </li>
      ))}
    </ul>
  );
}
