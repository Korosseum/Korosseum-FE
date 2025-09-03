"use client";

// import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
  const resendAction = (formData: FormData) => {
    const email = formData.get("email");

    // signIn("nodemailer", { email });
  };

  const socialSignIn = (provider: string) => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`,
      "_blank"
    );
  };

  return (
    <>
      <form action={resendAction}>
        <label htmlFor="email-resend">
          Email
          <input type="email" id="email-resend" name="email" />
        </label>
        <Button type="submit" value="Signin with email">
          SignIn With Email
        </Button>
      </form>
      <Button onClick={() => socialSignIn("google")} variant="outline">
        Signin with Google
      </Button>
      <Button onClick={() => socialSignIn("kakao")} variant="outline">
        Signin with Kakao
      </Button>
      {/* <Button onClick={() => signIn("naver")} variant="outline">
        Signin with Naver
      </Button> */}
    </>
  );
}
