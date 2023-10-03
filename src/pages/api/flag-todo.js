import { MongoClient, ObjectId } from "mongodb";

async function initDatabase() {
  const mongoClient = await MongoClient.connect(import.meta.env.DB_CONN_STRING, {
    appName: "findsomethingtodo",
  });

  return mongoClient;
}

export const POST = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const id = body.id;
    const objId = new ObjectId(id);

    const mongo = await initDatabase();
    const result = await mongo
      .db("findsomethingtodo")
      .collection("todos")
      .findOneAndUpdate(
        { _id: objId },
        {
          $set: {
            flagged: true,
          },
        },
        { returnDocument: "after" },
      );

    const { flagged } = result;

    return new Response(
      JSON.stringify({
        success: flagged === true,
      }),
    );
  }
};
