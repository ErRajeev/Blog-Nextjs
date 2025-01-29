import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET(requests: Request) {
    // Handle GET requests

    // console.log('===============>',requests.headers.get('cookie'));



    
// const cook = requests.headers.get('cookie')?.split('; ')?.find((c) => c.startsWith('authjs.session-token='))?.split('=')[1];
//     console.log(cook);
//   console.log(decode({
//     token : cook,
//     salt: "authjs.session-token=",
//     secret : process.env.NEXTAUTH_SECRET!
//   }));
  


    

    return new Response(JSON.stringify({ message: 'Hello, App Router API!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  