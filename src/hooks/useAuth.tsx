
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

// User type definition
interface User {
  id: string;
  email: string;
  name?: string;
}

// Stored user with password
interface StoredUser {
  id: string;
  email: string;
  name?: string;
  password: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const MOCK_USERS: StoredUser[] = [
  { id: "1", email: "user@example.com", password: "password123", name: "Demo User" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
];

// Storage keys
const STORAGE_KEYS = {
  USERS: "anime_watch_users",
  CURRENT_USER: "auth_user",
  OTP_EMAIL: "otp_email",
  OTP_CODE: "otp_code",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load stored users or use mock data
  const getStoredUsers = (): StoredUser[] => {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch (error) {
        console.error("Failed to parse stored users:", error);
      }
    }
    // Initialize with mock users if no stored users
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  };
  
  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
    
    // Ensure users are loaded from storage
    getStoredUsers();
  }, []);

  // Register a new user
  const register = async (email: string, password: string, name?: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();
      
      // Check if email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password,
        name: name || email.split('@')[0],
      };
      
      // Add to users and save
      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      // Log in the new user
      const { password: _, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to AniManga Watch, ${safeUser.name || safeUser.email}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const users = getStoredUsers();
      
      // Find user with matching credentials
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (matchedUser) {
        // Remove password before storing user
        const { password, ...safeUser } = matchedUser;
        setUser(safeUser);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const users = getStoredUsers();
      
      // Check if email exists
      const userExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      // In a real app, we would send a real OTP only if the user exists
      // For this demo, we'll always "send" an OTP but only allow verification if the email exists
      localStorage.setItem(STORAGE_KEYS.OTP_EMAIL, email);
      localStorage.setItem(STORAGE_KEYS.OTP_CODE, "123456"); // For demo purposes
      
      if (userExists) {
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your email. For this demo, the code is 123456.",
        });
      } else {
        // Don't reveal if user exists or not for security
        toast({
          title: "OTP Sent",
          description: "If an account with this email exists, a verification code has been sent. For this demo, try 123456.",
        });
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const storedEmail = localStorage.getItem(STORAGE_KEYS.OTP_EMAIL);
      const storedOTP = localStorage.getItem(STORAGE_KEYS.OTP_CODE);
      const users = getStoredUsers();
      
      if (email === storedEmail && otp === storedOTP) {
        // Find user by email
        const matchedUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (matchedUser) {
          // Remove password before storing user
          const { password, ...safeUser } = matchedUser;
          setUser(safeUser);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
          
          // Clean up OTP data
          localStorage.removeItem(STORAGE_KEYS.OTP_EMAIL);
          localStorage.removeItem(STORAGE_KEYS.OTP_CODE);
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${safeUser.name || safeUser.email}!`,
          });
        } else {
          throw new Error("No account found with this email");
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
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
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
        register,
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
