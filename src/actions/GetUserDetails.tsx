"use server";

import { auth } from "@/app/auth";

const GetUserDetails = async () => {
  const session = await auth();
  const logedUser = session?.user;
  return { logedUser };
};

export { GetUserDetails };
