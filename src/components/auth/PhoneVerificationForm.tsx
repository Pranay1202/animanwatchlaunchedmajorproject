
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PhoneVerificationFormProps {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoBack: () => void;
}

const PhoneVerificationForm: React.FC<PhoneVerificationFormProps> = ({
  verificationCode,
  setVerificationCode,
  isLoading,
  onSubmit,
  onGoBack
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-4">
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
          
          <Button
            type="button"
            variant="link"
            className="text-sm"
            onClick={onGoBack}
          >
            Use a different phone number
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
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
      </div>
    </form>
  );
};

export default PhoneVerificationForm;
