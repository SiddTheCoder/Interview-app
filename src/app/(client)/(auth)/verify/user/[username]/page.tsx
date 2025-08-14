"use client";

import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function page() {
  const [isOTPChecking, setIsOTPChecking] = React.useState(false);
  const [otpResetCount, setOtpResetCount] = React.useState(0);
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const username = params.username as string;
  console.log("Username:", username);

  const verifySchema = z.object({
    verificationToken: z.string().length(6),
  });

  const otpForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationToken: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setIsOTPChecking(true);
      console.log("Subbmiting ", data);
      toast.success(
        `You submitted the following values: ${data.verificationToken}`
      );
      const response = await axios.post("/api/auth/verify-user", {
        verificationToken: data.verificationToken,
        username: username,
      });
      console.log("Response:", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.replace("/signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data
        : error;
      console.error("Error submitting form", errorMessage);
      toast.error(`Error verifying OTP: ${errorMessage}`);
    } finally {
      setIsOTPChecking(false);
    }
  };

  const resendOTP = async () => {
    try {
      setOtpResetCount(30); // Reset the countdown to 30 seconds
      const response = await axios.post("/api/resend-verification-code", {
        username: username,
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpResetCount > 0) {
      timer = setInterval(() => {
        setOtpResetCount((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [otpResetCount]);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 px-4">
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col md:flex-row dark:bg-white/5 bg-black/10 rounded-2xl shadow-lg overflow-hidden max-w-7xl w-full h-[90vh]">
        <div className="w-[50%] md:flex hidden h-full bg-amber-500"></div>
        <div className="lg:w-[50%] w-full flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center w-full p-8">
            <h1 className="text-3xl font-semibold mb-4 dark:text-white">
              <span className="highlight-tilt px-3 py-1">Account</span>{" "}
              Verification
            </h1>
            <p className="text-lg dark:text-white">
              Please check your email to verify your account.
            </p>
          </div>
          {/* OTP Form */}
          <div className="w-full p-6 md:px-20 md:py-12">
            <Form {...otpForm}>
              <form
                className="space-y-4"
                onSubmit={otpForm.handleSubmit(onSubmit)}
              >
                <FormField
                  control={otpForm.control}
                  name="verificationToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {isOTPChecking ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          {/* Resend text */}
          <div className="flex items-center justify-center w-full p-8">
            <div className="text-sm dark:text-white text-gray-900 flex gap-1">
              If you didn't receive the email, please check your spam folder or
              {otpResetCount > 0 ? (
                <span className="text-blue-500">
                  {otpResetCount} seconds to resend
                </span>
              ) : (
                <p
                  className="hover:underline cursor-pointer text-blue-500"
                  onClick={resendOTP}
                >
                  resend email
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
