import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/auth";
import { executeAction } from "@/lib/executeAction";
import { Label } from "../ui/label";
import { SiGmail } from "react-icons/si";



const EmailSignIn = () => {

   const credentialsAction = (formData: FormData) => {
      signIn("credentials", formData)
    }

  
  return (
    <form action={credentialsAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">email</Label>
        <Input type="email" id="email" placeholder="xxx@xxx.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full flex items-center gap-2">
        <SiGmail className="w-4 h-4" />
        email_sign_in
      </Button> 
      </form>
  );
};

export { EmailSignIn };