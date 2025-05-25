import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Dummy auth logic, replace with DB check
        if (username === "admin" && password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
