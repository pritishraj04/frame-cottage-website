import { auth, currentUser } from "@clerk/nextjs/server";

export interface ClerkAuthUser {
  userId: string;
  email: string;
  fullName: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

/**
 * Retrieves the currently authenticated user from Clerk if present,
 * or returns null if the visitor is anonymous or Clerk fails.
 */
export async function getOptionalAuthUser(): Promise<ClerkAuthUser | null> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    const user = await currentUser();
    if (!user) {
      return {
        userId,
        email: "",
        fullName: null,
      };
    }

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ||
      user.emailAddresses[0]?.emailAddress ||
      "";

    const fullName =
      user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      null;

    return {
      userId: user.id,
      email: primaryEmail,
      fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };
  } catch (err) {
    // Graceful fallback for environments without active Clerk context or in test mocks
    return null;
  }
}

/**
 * Retrieves the authenticated user, or throws an error if unauthenticated.
 */
export async function getCurrentAuthUser(): Promise<ClerkAuthUser> {
  const user = await getOptionalAuthUser();
  if (!user) {
    throw new Error("Unauthorized: Active atelier session required.");
  }
  return user;
}
