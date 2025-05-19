
import { Button } from "@/components/ui/button";
import { Mail, Loader } from "lucide-react";

interface GoogleAuthButtonProps {
  isLoading: boolean;
  onClick: () => void;
  variant?: "login" | "signup";
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ 
  isLoading, 
  onClick, 
  variant = "login" 
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <Loader size={16} className="animate-spin" />}
      <Mail size={16} className="text-red-500" />
      {variant === "login" ? "Sign In with Google" : "Sign Up with Google"}
    </Button>
  );
};

export default GoogleAuthButton;
