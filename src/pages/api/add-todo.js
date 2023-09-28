export const POST = async ({ request, redirect }) => {
  const data = await request.formData();
  const user_id = data.get("user_id");
  const todo = data.get("todo");

  // console.log(user_id);
  // console.log(todo);

  // Validate the data - you'll probably want to do more than this
  // if (!todo) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "Missing required fields",
  //     }),
  //     { status: 400 },
  //   );
  // }

  // add stuff to DB

  return redirect("/browse?success=true", 302);
};
