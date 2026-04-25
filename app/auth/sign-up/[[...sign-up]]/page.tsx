import { SignUp } from "@clerk/nextjs"

export default function SignUpPage(){
  return (
    <div className="flex justify-center mt-25">
      <SignUp />
    </div>
  );
}