import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import updateMyProfile from "./tools/update-my-profile";
import getMyRoles from "./tools/get-my-roles";
import listCourses from "./tools/list-courses";

// The OAuth issuer MUST be the direct supabase.co host (never the .lovable.cloud proxy).
// Build it from the project ref, which Vite inlines at build time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "cyberguard-academy-mcp",
  title: "CyberGuard Academy",
  version: "0.1.0",
  instructions:
    "Tools for CyberGuard Academy, a cybersecurity learning platform. Use `list_courses` to browse the catalog, `get_my_profile` / `update_my_profile` for the signed-in user's profile, and `get_my_roles` to check the user's role.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCourses, getMyProfile, updateMyProfile, getMyRoles],
});
