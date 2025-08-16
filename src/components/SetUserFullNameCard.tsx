"use client";
import React from "react";
import { motion } from "framer-motion";
import ManFlyingAnimation from "@/../public/LottieFiles/Man-flying.json";
import Lottie from "lottie-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

function SetUserFullNameCard() {
   const { data: session, update } = useSession();
  const [fullName, setFullName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submitFullName = async () => {
    if(!fullName) return;
    try {
      setIsSubmitting(true);
      const { data } = await axios.post("/api/update-user-credentials", {
        fullName,
      });
      toast.success(data.message);
      // Force session refresh with new fullName
      await update({ fullName });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center pb-14 px-4">
      <motion.div
        initial={{ scale: 0.8, y: -100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className="flex flex-col dark:bg-white/5 bg-black/20 rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full h-[70vh] items-center py-10 space-y-2"
      >
        <div className="w-full flex justify-center items-center">
          <span className="text-xl">
            Since, You get connected to{" "}
            <span className="highlight-tilt px-3 py-1 transition-all duration-200 ease-in">
              Interview App
            </span>{" "}
            Via Credentials !
          </span>
        </div>

        <div className="w-full flex justify-center items-start">
          <Lottie
            className="w-1/2"
            animationData={ManFlyingAnimation}
            loop={true}
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <span className="text-xl font-semibold">
            What Should We Call You?{" "}
          </span>
          <input
            max={20}
            placeholder="Your Name Boss !"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-2 outline-none focus:outline-none border-b-2 border-primary ml-3 text-2xl"
          />
        </div>

        <div className="w-full flex justify-end items-center mt-8 px-10">
          <Button onClick={submitFullName}>
            {isSubmitting ? "Calling..." : "Call Me"} {fullName}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default SetUserFullNameCard;
