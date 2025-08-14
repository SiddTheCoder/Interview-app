import dbConnect from "@/lib/db/dbConnect";
import User from "@/models/user/User";
import { IUser } from "@/models/user/User";
import { sendApiError } from "@/helper/custom/sendApiError";
import { withApiHandler } from "@/helper/custom/withApiHandler";
import { ApiError } from "@/helper/custom/apiError";
import { sendApiResponse } from "@/helper/custom/sendApiRespone";
import { sendGreetingEmail } from "@/helper/sendEmails/sendGreetingEmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const POST = withApiHandler(async (req: Request) => {
  await dbConnect();
  const {fullName } = await req.json();
  if(!fullName) {
    throw new ApiError("username and fullName are required", 400);
  }

  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    throw new ApiError("User not found", 404);
  }

  const user = await User.findOne<IUser>({ username: loggedInUser.username });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  user.fullName = fullName;
  await user.save();
  return sendApiResponse({ username: user.username, fullName: user.fullName }, `${user.username} updated successfully`, 200);
});