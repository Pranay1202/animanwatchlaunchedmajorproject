
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

// User type definition
interface User {
  id: string;
  email: string;
  name?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const MOCK_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "Demo User" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user with matching credentials
      const matchedUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (matchedUser) {
        // Remove password before storing user
        const { password, ...safeUser } = matchedUser;
        setUser(safeUser);
        localStorage.setItem("auth_user", JSON.stringify(safeUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${safeUser.name || safeUser.email}!`,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if email exists
      const userExists = MOCK_USERS.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (userExists) {
        // In a real app, we would send an actual OTP
        localStorage.setItem("mock_otp_email", email);
        localStorage.setItem("mock_otp_code", "123456"); // For demo purposes
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your email. For this demo, the code is 123456.",
        });
      } else {
        throw new Error("No account found with this email");
      }
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const storedEmail = localStorage.getItem("mock_otp_email");
      const storedOTP = localStorage.getItem("mock_otp_code");
      
      if (email === storedEmail && otp === storedOTP) {
        // Find user by email
        const matchedUser = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (matchedUser) {
          // Remove password before storing user
          const { password, ...safeUser } = matchedUser;
          setUser(safeUser);
          localStorage.setItem("auth_user", JSON.stringify(safeUser));
          
          // Clean up OTP data
          localStorage.removeItem("mock_otp_email");
          localStorage.removeItem("mock_otp_code");
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${safeUser.name || safeUser.email}!`,
          });
        }
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        sendOTP,
        verifyOTP,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
