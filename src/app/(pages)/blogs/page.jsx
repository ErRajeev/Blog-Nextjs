// "use client";
import axios from "axios";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
// import { useState } from "react";
// import { useEffect } from "react";

export default async function Page() {
  // const [blog, setBlog] = useState("");

  // const cook = cookies().get("authjs.session-token");
  // console.log(cook.value);
  // console.log(
  //   await decode({
  //     token: cook?.value,
  //     salt: cook?.name,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   })
  // );

  const getBlog = async () => {
    // Fetch blog data from API
    // Set data to state
    const response = await axios.get("/api/blog", {
      // headers: {
      //   Authorization: `Bearer ${cook.value}`,
      // },
    });
    // setBlog(response.data.message);
    // console.log(response.data);
  };

  return (
    <>
      <h1>Blog Page</h1>
      {/* <h2>{blog}</h2> */}
    </>
  );
}
