"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type formDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactUs() {
  const [formDatas, setFormDatas] = useState<formDataType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDatas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging...");

    const formData = new FormData(e.currentTarget);

    try {
      const response: any = await axios.post("/api/contact", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success(response?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="order-2 md:order-none col-span-1 flex justify-center items-center">
          <Image
            src="https://picsum.photos/id/866/600/700"
            width={400}
            height={400}
            alt="Contact Us Illustration"
            priority
            placeholder="blur"
            blurDataURL="https://picsum.photos/id/866/10/10"
            className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="order-none md:order-2 col-span-1">
          <Card className="shadow-lg rounded-lg border border-border bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formDatas.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={handleChange}
                    placeholder="Subject"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
