import { MongoClient } from "mongodb";

async function initDatabase() {
  const mongoClient = await MongoClient.connect(import.meta.env.DB_CONN_STRING, {
    appName: "findsomethingtodo",
  });

  return mongoClient;
}

export async function GET({ params, request }) {
  const mongo = await initDatabase();
  const todos = mongo.db("findsomethingtodo").collection("todos");
  const todosNotFlagged = await todos.find({ flagged: false }).sort({ date_created: -1 }).toArray();

  return new Response(
    JSON.stringify({
      todos: todosNotFlagged,
    }),
  );
}
