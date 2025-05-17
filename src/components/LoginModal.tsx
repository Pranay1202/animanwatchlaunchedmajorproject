
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

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would connect to your auth provider here
    toast({
      title: "Login Attempted",
      description: `Attempted login with ${loginMethod}: ${loginMethod === "email" ? email : phone}`,
      duration: 3000,
    });
    
    // Close the modal after login attempt
    setIsOpen(false);
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
            <form onSubmit={handleLogin}>
              <div className="flex justify-center mb-4">
                <div className="flex rounded-md overflow-hidden border">
                  <Button 
                    type="button"
                    variant={loginMethod === "email" ? "default" : "ghost"}
                    className={`rounded-none ${loginMethod === "email" ? "bg-anime-purple" : ""}`}
                    onClick={() => setLoginMethod("email")}
                  >
                    Email
                  </Button>
                  <Button 
                    type="button"
                    variant={loginMethod === "phone" ? "default" : "ghost"}
                    className={`rounded-none ${loginMethod === "phone" ? "bg-anime-purple" : ""}`}
                    onClick={() => setLoginMethod("phone")}
                  >
                    Phone
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {loginMethod === "email" ? (
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
                ) : (
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
                )}
                
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
                <Button type="submit" className="w-full bg-anime-purple hover:bg-anime-darkpurple">
                  Sign In
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-anime-purple hover:bg-anime-darkpurple">
                  Create Account
                </Button>
              </DialogFooter>
            </form>
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
