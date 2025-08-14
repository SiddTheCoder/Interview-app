import dbConnect from "@/lib/db/dbConnect";
import User from "@/models/user/User";
import { withApiHandler } from "@/helper/custom/withApiHandler";
import { ApiError } from "@/helper/custom/apiError";
import { sendApiResponse } from "@/helper/custom/sendApiRespone";
import { usernameValidationSchema } from "@/schemas/signupSchema";

export const POST = withApiHandler(async (req: Request) => {
  await dbConnect();

  const { username } = await req.json();

  const validationResult = usernameValidationSchema.safeParse(username);

  if (!validationResult.success) {
    throw new ApiError("Invalid username", 400);
  }

  const user = await User.findOne({ username, isVerified: true });

  if (user) {
    let createdMessage = "";
    if (user.createdAt) {
      const createdAt = new Date(user.createdAt);
      const now = new Date();

      // Difference in milliseconds
      const diffMs = now.getTime() - createdAt.getTime();

      // Convert to minutes
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      createdMessage = `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    return sendApiResponse(
      { isUnique: false },
      `Username is already taken ${createdMessage}`,
      409
    );
  }

  return sendApiResponse({ isUnique: true }, "Username is available", 200);
})
