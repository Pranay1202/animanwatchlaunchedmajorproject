
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, Loader, Lock } from "lucide-react";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();
  const { login, register, sendOTP, verifyOTP, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(email, password);
      setIsOpen(false);
      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      // Error is already handled in the useAuth hook
      console.error("Login failed:", error);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, we'll just accept any phone number format
    // and use email OTP flow with a dummy email
    const dummyEmail = `${phone.replace(/\D/g, '')}@phone.demo`;
    setEmail(dummyEmail);
    
    try {
      await sendOTP(dummyEmail);
      setShowVerification(true);
    } catch (error) {
      console.error("Phone verification failed:", error);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await verifyOTP(email, verificationCode);
      setIsOpen(false);
      // Reset form
      setEmail("");
      setVerificationCode("");
      setShowVerification(false);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await register(email, password, name || undefined);
      setIsOpen(false);
      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to AniManga Watch</DialogTitle>
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
              {!showVerification ? (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="flex rounded-md overflow-hidden border">
                      <Button 
                        type="button"
                        variant={loginMethod === "email" ? "default" : "ghost"}
                        className={`rounded-none ${loginMethod === "email" ? "bg-anime-purple" : ""}`}
                        onClick={() => setLoginMethod("email")}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button 
                        type="button"
                        variant={loginMethod === "phone" ? "default" : "ghost"}
                        className={`rounded-none ${loginMethod === "phone" ? "bg-anime-purple" : ""}`}
                        onClick={() => setLoginMethod("phone")}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </Button>
                    </div>
                  </div>
                  
                  {loginMethod === "email" ? (
                    <form onSubmit={handleLogin}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <DialogFooter className="mt-6">
                        <Button 
                          type="submit" 
                          className="w-full bg-anime-purple hover:bg-anime-darkpurple"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader size={16} className="mr-2 animate-spin" />
                              Signing In...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <form onSubmit={handlePhoneLogin}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <DialogFooter className="mt-6">
                        <Button 
                          type="submit" 
                          className="w-full bg-anime-purple hover:bg-anime-darkpurple"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader size={16} className="mr-2 animate-spin" />
                              Sending Code...
                            </>
                          ) : (
                            "Send Verification Code"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </>
              ) : (
                <form onSubmit={handleVerifyCode} className="mt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="verification-code">Verification Code</Label>
                      <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your phone number
                      </p>
                      
                      <div className="flex justify-center my-4">
                        <InputOTP
                          maxLength={6}
                          value={verificationCode}
                          onChange={(value) => setVerificationCode(value)}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} index={index} {...slot} />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        For demo purposes, use code: 123456
                      </p>
                      
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm"
                        onClick={() => setShowVerification(false)}
                      >
                        Use a different phone number
                      </Button>
                    </div>
                  </div>
                  
                  <DialogFooter className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-anime-purple hover:bg-anime-darkpurple"
                      disabled={isLoading || verificationCode.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader size={16} className="mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify and Sign In"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSignup}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="signup-name">Name (Optional)</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-anime-purple hover:bg-anime-darkpurple"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader size={16} className="mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
