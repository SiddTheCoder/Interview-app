"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidationSchema } from "@/schemas/signinSchema";
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
import Lottie from "lottie-react";
import LoadingLoopAnimation from "@/../public/LottieFiles/Loading loop animation.json";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<z.infer<typeof signinValidationSchema>>({
    resolver: zodResolver(signinValidationSchema),
    // mode: "onChange", // validate on every change
    reValidateMode: "onChange", // revalidate immediately
    defaultValues: {
      identifier: "", // either username or email
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinValidationSchema>) => {
    const res = await signIn("credentials", {
      redirect: false, // important!
      identifier: data.identifier,
      password: data.password,
    });

    console.log("Sign In Response:", res);
    if (res?.error === "CredentialsSignin") {
      toast.error("Invalid email/username or password");
    } else if (res?.error) {
      toast.error("An unexpected error occurred. Please try again.");
    } else if (res?.ok) {
      toast.success("Successfully signed in!");
    }

    if (res?.error) {
      toast.error(res.error);
    }

    if (res?.url) {
      router.replace("/");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 px-4">
      <div className="flex flex-col md:flex-row dark:bg-white/5 bg-black/10 rounded-2xl shadow-lg overflow-hidden max-w-7xl w-full">
        <div className="absolute bottom-4 right-4">
          <ThemeToggle />
        </div>
        {/* Left - Image */}
        <div className="flex-1 hidden md:block">photo</div>

        {/* Right - Form */}
        <div className="flex-1 p-8 md:px-12 md:py-10">
          <TabBacker />

          <div className="text-2xl font-bold mb-2 flex items-center gap-0">
            <Lottie
              className="w-10 h-10"
              loop={true}
              animationData={LoadingLoopAnimation}
            />
            <span className="mb-[2px]">Welcome Back</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Connect with us and get your interview journey started!
          </p>

          <Form {...loginForm}>
            <form
              className="space-y-4"
              onSubmit={loginForm.handleSubmit(onSubmit)}
            >
              <FormField
                control={loginForm.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address or username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={loginForm.control}
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
                {isSubmitting ? "Signing In..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 dark:text-blue-300 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
