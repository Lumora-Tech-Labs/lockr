import { SignIn } from "@clerk/nextjs"

export default function SignUpPage(){
  return (
    <div className="flex justify-center mt-25">
      <SignIn />
    </div>
  );
}