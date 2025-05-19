
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface PhoneLoginFormProps {
  phone: string;
  setPhone: (phone: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({
  phone,
  setPhone,
  isLoading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
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
      
      <div className="mt-6">
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
      </div>
    </form>
  );
};

export default PhoneLoginForm;
