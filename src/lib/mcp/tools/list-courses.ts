import { defineTool } from "@lovable.dev/mcp-js";

const COURSES = [
  { id: "1", title: "Cybersecurity Fundamentals", level: "Beginner", modules: 8,
    description: "Core concepts and principles of cybersecurity." },
  { id: "2", title: "Network Security", level: "Intermediate", modules: 12,
    description: "Protect computer networks from intrusion and attacks." },
  { id: "3", title: "Ethical Hacking", level: "Advanced", modules: 15,
    description: "Techniques used by hackers to identify vulnerabilities." },
  { id: "4", title: "Web Application Security", level: "Intermediate", modules: 10,
    description: "Secure web applications from common attacks (OWASP Top 10)." },
  { id: "5", title: "Database Security", level: "Intermediate", modules: 9,
    description: "Protect sensitive data and secure database systems." },
  { id: "6", title: "Threat Intelligence", level: "Advanced", modules: 14,
    description: "Identify and respond to security threats effectively." },
];

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description: "Return the full catalog of CyberGuard Academy cybersecurity courses.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(COURSES, null, 2) }],
    structuredContent: { courses: COURSES },
  }),
});
