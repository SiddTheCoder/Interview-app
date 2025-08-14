import dbConnect from "@/lib/db/dbConnect";
import User from "@/models/user/User";
import { IUser } from "@/models/user/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendApiError } from "@/helper/custom/sendApiError";
import { withApiHandler } from "@/helper/custom/withApiHandler";
import { ApiError } from "@/helper/custom/apiError";
import { sendApiResponse } from "@/helper/custom/sendApiRespone";
import { sendVerificationEmail } from "@/helper/sendEmails/sendVerificationEmail";

// Generate a random 6-digit OTP
function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

export const POST = withApiHandler(async (req: Request) => {
  await dbConnect();
  const verificationToken = generateOTP();
  const { username, email, password } = await req.json();
  if (!email || !password || !username) {
    throw new ApiError("Email and password and username are required", 400);
  }
  const existingUser = await User.findOne<IUser>({ email });
  if (existingUser) {
    if (existingUser.isVerified) {
      throw new ApiError("User already exists", 409);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          email: email,
          password: bcrypt.hashSync(password, 10),
          username: username,
          verificationToken: verificationToken,
          isVerified: false,
          verificationTokenExpiresAt: new Date(Date.now() + 3600000), // 1 hour
        },
        { new: true }
      );
      if (!updatedUser) {
        throw new ApiError("Failed to Create user", 500);
      }
      await sendVerificationEmail(
        updatedUser.email,
        verificationToken,
        updatedUser.fullName
      );
      const safeData = {
        ...updatedUser.toObject(),
        password: undefined,
        verificationCodeExpires: undefined,
      };
      return sendApiResponse(
        safeData,
        "User Created successfully | Verification email sent",
        200
      );
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateOTP();
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username: username,
      verificationToken,
      isVerified: false,
      verificationTokenExpiresAt: new Date(Date.now() + 3600000), // 1 hour
    });
    const safeData = {
      ...newUser.toObject(),
      password: undefined,
      verificationCodeExpires: undefined,
    };
    await sendVerificationEmail(
      newUser.email,
      verificationToken,
      newUser.fullName
    );
    return sendApiResponse(
      safeData,
      "User created successfully | Verification email sent",
      200
    );
  }
});
