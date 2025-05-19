
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface EmailLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
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
      
      <div className="mt-6">
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
      </div>
    </form>
  );
};

export default EmailLoginForm;
