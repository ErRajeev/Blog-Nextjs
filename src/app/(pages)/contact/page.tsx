import ContactForm from "@/components/contact/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="order-first md:order-none col-span-1 flex justify-center items-center">
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
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
