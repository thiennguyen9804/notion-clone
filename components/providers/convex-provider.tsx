"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
const publisableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const convex = new ConvexReactClient(convexUrl);
export function ConvextClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={publisableKey}

    >
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
