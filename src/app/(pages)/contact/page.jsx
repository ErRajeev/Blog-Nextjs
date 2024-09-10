import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Left Side: Image */}
        <div className="col-span-1">
          <Image
            src="https://picsum.photos/id/237/400/400"
            width={400}
            height={400}
            alt="Picture of the author"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Contact Us Form */}
        <div className="col-span-1">
          <Card className="h-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="text-center">
                  <Button>Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
