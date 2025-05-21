
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import EmailLoginForm from "./EmailLoginForm";
import PhoneLoginForm from "./PhoneLoginForm";
import PhoneVerificationForm from "./PhoneVerificationForm";
import GoogleAuthButton from "./GoogleAuthButton";
import LoginMethodToggle from "./LoginMethodToggle";
import OrDivider from "./OrDivider";
import SignupForm from "./SignupForm";
import DisclaimerText from "./DisclaimerText";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, you would connect to your auth provider here
      toast({
        title: "Login Attempted",
        description: `Attempted login with ${loginMethod}: ${loginMethod === "email" ? email : phone}`,
        duration: 3000,
      });
      
      setIsLoading(false);
      // Close the modal after login attempt
      setIsOpen(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, you would connect to Google Auth here
      toast({
        title: "Google Login Attempted",
        description: "Attempted login with Google",
        duration: 3000,
      });
      
      setIsLoading(false);
      setIsOpen(false);
    }, 1500);
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // In a real app, you would request a verification code here
      toast({
        title: "Verification Code Sent",
        description: `A verification code was sent to ${phone}`,
        duration: 3000,
      });
      
      setIsLoading(false);
      // Show verification code input
      setShowVerification(true);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, you would verify the code here
      if (verificationCode.length === 6) {
        toast({
          title: "Phone Number Verified",
          description: "You have successfully logged in",
          duration: 3000,
        });
        setIsOpen(false);
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid verification code",
          variant: "destructive",
          duration: 3000,
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to AniMan Watch</DialogTitle>
          <DialogDescription className="text-center">
            Log in to track your favorite anime and join the community!
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <div className="flex flex-col gap-4">
              <GoogleAuthButton 
                isLoading={isLoading} 
                onClick={handleGoogleLogin}
                variant="login"
              />

              <OrDivider />

              {!showVerification ? (
                <>
                  <LoginMethodToggle 
                    loginMethod={loginMethod}
                    setLoginMethod={setLoginMethod}
                  />
                  
                  {loginMethod === "email" ? (
                    <EmailLoginForm
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      isLoading={isLoading}
                      onSubmit={handleLogin}
                    />
                  ) : (
                    <PhoneLoginForm
                      phone={phone}
                      setPhone={setPhone}
                      isLoading={isLoading}
                      onSubmit={handlePhoneLogin}
                    />
                  )}
                </>
              ) : (
                <PhoneVerificationForm
                  verificationCode={verificationCode}
                  setVerificationCode={setVerificationCode}
                  isLoading={isLoading}
                  onSubmit={handleVerifyCode}
                  onGoBack={() => setShowVerification(false)}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <div className="flex flex-col gap-4">
              <GoogleAuthButton 
                isLoading={isLoading} 
                onClick={handleGoogleLogin}
                variant="signup"
              />

              <OrDivider />
              
              <SignupForm 
                isLoading={isLoading}
                onSubmit={handleLogin}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DisclaimerText />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
