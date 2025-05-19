
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

interface LoginMethodToggleProps {
  loginMethod: "email" | "phone";
  setLoginMethod: (method: "email" | "phone") => void;
}

const LoginMethodToggle: React.FC<LoginMethodToggleProps> = ({ 
  loginMethod, 
  setLoginMethod 
}) => {
  return (
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
  );
};

export default LoginMethodToggle;
