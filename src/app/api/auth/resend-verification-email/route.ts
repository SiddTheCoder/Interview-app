import dbConnect from "@/lib/db/dbConnect";
import User from "@/models/user/User";
import { withApiHandler } from "@/helper/custom/withApiHandler";
import { ApiError } from "@/helper/custom/apiError";
import { sendApiResponse } from "@/helper/custom/sendApiRespone";
import { sendVerificationEmail } from "@/helper/sendEmails/sendVerificationEmail";
import crypto from "crypto";

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

export const POST = withApiHandler(async (request: Request) => { 
  await dbConnect();
  const { username } = await request.json();

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // Generate a new verification code
  const newVerificationToken = generateOTP();
  user.verificationToken = newVerificationToken;
  user.verificationTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  await sendVerificationEmail(user.email, newVerificationToken, user.username);

  return sendApiResponse(
    { username: user.username, email: user.email },
    "Verification email resent",
    200
  );

})