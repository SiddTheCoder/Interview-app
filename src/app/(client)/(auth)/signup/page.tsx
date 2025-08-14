"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "@/schemas/signupSchema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import TabBacker from "@/components/TabBacker";
import { useDebounceCallback } from "usehooks-ts";
import axios from "axios";
import Lottie from "lottie-react";
import LoadingLoopAnimation from "@/../public/LottieFiles/Loading loop animation.json";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerForm = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    // mode: "onChange", // validate on every change
    reValidateMode: "onChange", // r evalidate immediately
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupValidationSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/auth/signup", data);
      console.log("Response:", response);
      toast.success(response.data.message);
      router.replace(`/verify/user/${data.username}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Backend error:", error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDebouncedUsername = useDebounceCallback(setUsername, 300);

  useEffect(() => {
    if (username === "") {
      setUsernameMessage("");
    }
    const checkUsernameUnique = async () => {
      if (username) {
        setIsUsernameChecking(true);
        setUsernameMessage("");

        try {
          const response = await axios.post(`/api/auth/check-username-unique`, {
            username,
          });
          console.log("Response from API:", response.data);
          setUsernameMessage(response.data.message);
        } catch (error) {
          console.error("Error checking username:", error);
          if (axios.isAxiosError(error) && error.response) {
            setUsernameMessage(
              error.response.data.message || "Error checking username"
            );
          } else {
            setUsernameMessage("Error checking username");
          }
        } finally {
          setIsUsernameChecking(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 px-4">
      <div className="flex flex-col md:flex-row dark:bg-white/5 bg-black/10 rounded-2xl shadow-lg overflow-hidden max-w-7xl w-full">
        <div className="absolute bottom-4 right-4">
          <ThemeToggle />
        </div>
        {/* Left - Form */}
        <div className="flex-1 p-8 md:px-12 md:py-10">
          <TabBacker />

          <div className="text-2xl font-bold mb-2 flex items-center gap-0">
            <Lottie
              className="w-10 h-10"
              loop={true}
              animationData={LoadingLoopAnimation}
            />
            <span className="mb-[2px]">Welcome</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Connect with us and get your interview journey started!
          </p>

          <Form {...registerForm}>
            <form
              className="space-y-4"
              onSubmit={registerForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setDebouncedUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {isUsernameChecking && (
                      <Loader2 className="animate-spin h-4 w-4 ml-2" />
                    )}
                    <p
                      className={`text-sm ${usernameMessage === "Username is available" ? "text-green-500" : "text-red-500"}`}
                    >
                      {usernameMessage}
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300 dark:bg-gray-800" />
            <span className="mx-4  text-sm">Continue with</span>
            <hr className="flex-grow border-gray-300 dark:bg-gray-700" />
          </div>

          <div className="space-y-3 flex gap-2 flex-col">
            <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
              <Image
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="GitHub"
                width={20} // match w-5 (5 * 4px = 20px)
                height={20} // match h-5
                className="mr-2"
              />
              Login with Google
            </Button>
            <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
              <Image
                src="/github-img.png"
                alt="GitHub"
                width={20} // match w-5 (5 * 4px = 20px)
                height={20} // match h-5
                className="mr-2"
              />
              Login with GitHub
            </Button>
          </div>

          {/* Register */}
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-indigo-600 dark:text-blue-300 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Right - Image */}
        <div className="flex-1 hidden md:block">photo</div>
      </div>
    </div>
  );
}

export default page;
