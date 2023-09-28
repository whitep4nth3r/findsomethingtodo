import Clerk from "@clerk/clerk-js";

// Change this if you deploy your own!
const CLERK_FRONTEND_API = "pk_test_dW5iaWFzZWQtY2hpY2tlbi03NS5jbGVyay5hY2NvdW50cy5kZXYk";

export async function getSession() {
  const clerk = new Clerk(CLERK_FRONTEND_API);
  await clerk.load({});

  return clerk.session;
}

export function initClerk() {
  return new Clerk(CLERK_FRONTEND_API);
}
