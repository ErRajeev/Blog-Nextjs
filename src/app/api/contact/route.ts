import { auth } from "@/app/auth"; 
import { NextResponse } from "next/server";
import { transporter } from "@/actions/transporter";
import dbConnect from "@/lib/DataBase/utils";
import Contact from "../models/contactFormModel";
interface ContactDataType {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Invalid method!" }), {
      status: 405,
    });
  }

  const session = await auth();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized user" }), {
      status: 401,
    });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const contactData: ContactDataType = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    const dbResponse = await storeContacts(contactData);
    
    if (!dbResponse.success) {
      console.log("efdfv");
      return new NextResponse(
        
        JSON.stringify({ message: "We will contact you soon." }),
        { status: 500 }
      );
    }
    
    const emailResponse = await handleSendMail(contactData);

    if (!emailResponse.ok) {
      return new NextResponse(
        JSON.stringify({ message: "Email sending failed" }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Form submission error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error processing form submission." }),
      { status: 500 }
    );
  }
}

async function handleSendMail(data: ContactDataType) {
  const mailOptions = {
    from: process.env.ADMIN_SENDER_EMAIL,
    to: data.email,
    subject: "Welcome to Blogy",
    html: `<html>
            <body>
              <h3>Contact Us From:</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Message:</strong> ${data.message}</p>
            </body>
          </html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { ok: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { ok: false };
  }
}

async function storeContacts(data: ContactDataType): Promise<{ success: boolean; error?: string }> {
  try {
    await dbConnect();
    await Contact.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return { success: true }; 
  } catch (error) {
    return { success: false, error: "Database error" };
  }
}