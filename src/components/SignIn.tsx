"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
  //   const credentialsAction = (formData: FormData) => {
  //     signIn("credentials", {
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //     });
  //   };

  return (
    <>
      {/* <form action={credentialsAction}>
        <label className="flex gap-2 h-10 " htmlFor="credentials-email">
          <span className="w-20">Email</span>
          <input type="email" id="credentials-email" name="email" />
        </label>
        <label className="flex gap-2 h-10 " htmlFor="credentials-password">
          <span className="w-20">Password</span>
          <input type="password" id="credentials-password" name="password" />
        </label>
      </form> */}
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
