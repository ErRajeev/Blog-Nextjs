"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const [contactData, setContactData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { data }: { data: Session | null } = useSession();

  useEffect(() => {
    if (data?.user) {
      setContactData((prev) => ({
        ...prev,
        name: data?.user?.name || "",
        email: data?.user?.email || "",
      }));
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Sending...");

    try {
      const response = await axios.post("/api/contact", contactData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success(response.data.message, { id: toastId });
        setContactData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!", {
          id: toastId,
        });
      } else if (error.request) {
        toast.error("No response from server. Please try again later.", {
          id: toastId,
        });
      } else {
        toast.error("An unexpected error occurred.", { id: toastId });
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={contactData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="mt-2"
          required
          disabled={!!data?.user?.name} // Disable if name comes from session
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={contactData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="mt-2"
          required
          disabled={!!data?.user?.email} // Disable if email comes from session
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={contactData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="mt-2"
          required
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          onChange={handleChange}
          value={contactData.message}
          placeholder="Your Message"
          className="mt-2"
          rows={5}
        />
      </div>
      <div className="text-center">
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </div>
    </form>
  );
}
