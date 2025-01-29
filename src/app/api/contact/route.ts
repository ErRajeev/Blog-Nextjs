
import { auth } from "@/app/auth"; 
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Invalid method!" }), {
      status: 405,
    });
  }
    const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized user" }), {
      status: 401,
    });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    // console.log("Form submitted by:", session.user);
    // console.log("Form data:", data);

  

    return new NextResponse(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    // console.error("Form submission error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error processing form submission." }),
      { status: 500 }
    );
  }
}