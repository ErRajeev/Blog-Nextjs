// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/app/auth";

// type User = {
//   name: string;
//   email: string;

//   // Add other user properties as needed
// };

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const session = await auth();
//         const fetchedUser = session?.user || null;
//         setUser(fetchedUser);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = async () => {
//     // Implement login logic
//     router.push("/login"); // Example redirection
//   };

//   const logout = async () => {
//     setUser(null);
//     router.push("/login"); // Redirect to login
//   };

//   const isAuthenticated = user !== null;

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAuthenticated, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // this is custom hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// src/context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GetUserDetails } from "@/actions/GetUserDetails";

interface User {
  id: string;
  name: string;
  email: string;
  image: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  //   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | any>(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Simulate fetching user
  //     const fetchUser = async () => {
  //       // Replace this with your actual authentication logic
  //       const loggedInUser = await fakeAuthFetch();
  //       setUser(loggedInUser);
  //       setLoading(false);
  //     };

  //     fetchUser();
  //   }, []);

  useEffect(() => {
    const user = GetUserDetails();
    user.then((data) => {
      setUser(data.logedUser);
      setLoading(false);
    });
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
