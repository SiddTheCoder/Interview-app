import dbConnect from "@/lib/db/dbConnect";
import User from "@/models/user/User";
import { IUser } from "@/models/user/User";
import { sendApiError } from "@/helper/custom/sendApiError";
import { withApiHandler } from "@/helper/custom/withApiHandler";
import { ApiError } from "@/helper/custom/apiError";
import { sendApiResponse } from "@/helper/custom/sendApiRespone";
import { sendGreetingEmail } from "@/helper/sendEmails/sendGreetingEmail";

export const POST = withApiHandler(async (request: Request, res: Response) => {
  await dbConnect();
  const { username, verificationToken } = await request.json();
  console.log("Request received for user verification:", {
    username,
    verificationToken,
  });

  const user = await User.findOne<IUser>({ username });
  if (!user) {
    throw new ApiError("User not found", 404, null);
  }
  console.log("User found:", user);
  if (user.verificationToken !== verificationToken) {
    throw new ApiError("Invalid verification token", 400, null);
  }

  const isVerificationTokenNotExpired = user.verificationTokenExpiresAt
    ? user.verificationTokenExpiresAt > new Date()
    : false;
  if (!isVerificationTokenNotExpired) {
    throw new ApiError("Verification token has expired", 400, null);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendGreetingEmail(
    user.email,
    user.fullName,
    "Welcome to Interview App! Your account has been successfully verified.",
    `https://${process.env.NEXT_PUBLIC_APP_URL}/signin`,
    "Thank you for joining us!"
  );

  return sendApiResponse(user, "User Verified Successfully", 200);
});
