import { MongoClient } from "mongodb";

async function initDatabase() {
  const mongoClient = await MongoClient.connect(import.meta.env.DB_CONN_STRING, {
    appName: "findsomethingtodo",
  });

  return mongoClient;
}

export const POST = async ({ request, redirect }) => {
  const data = await request.formData();
  const user_id = data.get("user_id");
  const todo = data.get("todo");

  // add stuff to DB
  const newTodo = {
    description: todo,
    user_id: user_id,
    times_done: 0,
    date_created: new Date(),
    flagged: false,
  };

  const mongo = await initDatabase();
  const todos = mongo.db("findsomethingtodo").collection("todos");

  const response = await todos.insertOne(newTodo);

  if (response.acknowledged === true) {
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify({
      success: false,
    }),
    {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
