"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
  const resendAction = (formData: FormData) => {
    const email = formData.get("email");

    signIn("nodemailer", { email });
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
      <Button onClick={() => signIn("google")} variant="outline">
        Signin with Google
      </Button>
      <Button onClick={() => signIn("kakao")} variant="outline">
        Signin with Kakao
      </Button>
      {/* <Button onClick={() => signIn("naver")} variant="outline">
        Signin with Naver
      </Button> */}
    </>
  );
}
