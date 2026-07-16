import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "update_my_profile",
  title: "Update my profile",
  description: "Update the signed-in user's full name and/or bio on their CyberGuard Academy profile.",
  inputSchema: {
    full_name: z.string().trim().min(1).max(120).optional().describe("New display name"),
    bio: z.string().trim().max(1000).optional().describe("Short bio / about text"),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  handler: async ({ full_name, bio }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const patch: Record<string, unknown> = {};
    if (full_name !== undefined) patch.full_name = full_name;
    if (bio !== undefined) patch.bio = bio;
    if (Object.keys(patch).length === 0) {
      return { content: [{ type: "text", text: "No fields provided to update." }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("profiles")
      .update(patch)
      .eq("id", ctx.getUserId())
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Profile updated: ${JSON.stringify(data)}` }],
      structuredContent: { profile: data },
    };
  },
});
