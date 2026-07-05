import type { Message } from "../../../types/chat";

export const longChatMessages: Message[] = [
  {
    id: "long-1",
    role: "user",
    text: "We're launching an AI team chat app in six weeks. I need a full go-to-market plan — positioning, messaging, visual direction, and a week-by-week rollout.",
  },
  {
    id: "long-2",
    role: "agent",
    agentId: "strategist",
    text: "Six weeks is tight but workable if we scope ruthlessly. I'd structure this in three phases:\n\n1. **Pre-launch (weeks 1–2)** — nail ICP, core narrative, and a waitlist.\n2. **Launch week (weeks 3–4)** — coordinated push across product, social, and email.\n3. **Post-launch (weeks 5–6)** — activation loops, case studies, and retention hooks.\n\nWho is the primary buyer — individual creators, small teams, or enterprise?",
  },
  {
    id: "long-3",
    role: "user",
    text: "Small product teams — 3 to 15 people. Mostly startups and agencies shipping client work fast.",
  },
  {
    id: "long-4",
    role: "agent",
    agentId: "strategist",
    text: "Perfect. Your ICP is \"lean teams that treat speed as a competitive advantage.\" The wedge is not \"another chat app\" — it's \"a strategist, designer, and writer in one thread, aligned on your goal.\"\n\nKey differentiators to anchor everything:\n- Multi-agent collaboration in a single conversation\n- Role-specific expertise without context switching\n- Final plan export for stakeholders\n\nI'll draft a positioning statement next unless you want to jump to timeline first.",
  },
  {
    id: "long-5",
    role: "user",
    text: "Give me the positioning statement and a tagline we can test.",
  },
  {
    id: "long-6",
    role: "agent",
    agentId: "writer",
    text: "**Positioning:** For product teams who ship under pressure, [Product] is the AI team chat that keeps strategy, design, and copy in one aligned thread — so you move from idea to launch-ready plan without juggling tools or losing context.\n\n**Tagline options:**\n1. \"Your AI team, one conversation.\"\n2. \"Plan, design, and write — together.\"\n3. \"Ship faster with a team that never drops the thread.\"\n\nI'd A/B test 1 and 3 on the waitlist page. Both are short enough for mobile hero copy.",
  },
  {
    id: "long-7",
    role: "user",
    text: "I like option 1 for the hero. What should the waitlist page say below the fold?",
  },
  {
    id: "long-8",
    role: "agent",
    agentId: "writer",
    text: "Below the fold, use a three-block structure:\n\n**Block 1 — The problem**\n\"Most AI tools give you one voice. Real product work needs strategy, design, and copy working in sync.\"\n\n**Block 2 — How it works**\nThree short steps: pick your agents → describe the project → get a aligned plan you can share.\n\n**Block 3 — Social proof placeholder**\n\"Built for teams who ship weekly, not quarterly.\" Add logos or a quote once you have beta users.\n\nKeep paragraphs to two lines max on mobile.",
  },
  {
    id: "long-9",
    role: "user",
    text: "What about visual direction for the app and marketing site? We want it to feel premium but approachable — not another generic purple-gradient AI product.",
  },
  {
    id: "long-10",
    role: "agent",
    agentId: "designer",
    text: "I'd steer away from the default \"AI slop\" aesthetic. Direction:\n\n- **Palette:** warm neutrals for surfaces, one confident accent (your brand purple is fine if we pair it with cream/off-white instead of cold gray).\n- **Typography:** a humanist sans for UI, slightly editorial weight for hero headlines.\n- **Motion:** subtle enter transitions on messages — enough polish to feel alive, not distracting.\n- **Agent identity:** distinct color chips per role (strategist / designer / writer) so the thread scans instantly.\n\nFor marketing, reuse the in-app message bubble shapes so the product and site feel like one system.",
  },
  {
    id: "long-11",
    role: "user",
    text: "Can you be more specific about the chat UI? That's the core experience.",
  },
  {
    id: "long-12",
    role: "agent",
    agentId: "designer",
    text: "Chat UI priorities:\n\n1. **Readable thread** — generous line height, clear user vs. agent alignment, agent badge on every agent message.\n2. **Input dock** — fixed bottom bar with agent selector visible before send; users should always know who's in the room.\n3. **Empty state** — hero prompt centered, minimal chrome so first-time users aren't overwhelmed.\n4. **History drawer** — push-style drawer from the left; session titles from first user message.\n\nAvoid cramming features into the header. History + new chat is enough for v1.",
  },
  {
    id: "long-13",
    role: "user",
    text: "Back to GTM — what should we do in week 1 specifically?",
  },
  {
    id: "long-14",
    role: "agent",
    agentId: "strategist",
    text: "**Week 1 checklist:**\n\n- Finalize ICP doc (1 pager)\n- Lock hero tagline + waitlist copy\n- Set up waitlist with UTM tracking\n- Record a 60s loom demo of the core loop\n- Identify 10 design-partner teams for private beta\n- Create a lightweight content calendar (3 posts/week)\n\nDon't build more product features this week unless they block the demo. Marketing assets and beta recruitment are the bottleneck.",
  },
  {
    id: "long-15",
    role: "user",
    text: "Week 2?",
  },
  {
    id: "long-16",
    role: "agent",
    agentId: "strategist",
    text: "**Week 2:**\n\n- Onboard first 5 beta teams; schedule 30-min feedback calls\n- Ship waitlist referral hook (\"invite your team\")\n- Publish founder story post on LinkedIn + X\n- Draft launch email sequence (3 emails: teaser, launch, recap)\n- QA the full flow on iOS and Android\n\nSuccess metric: 200 waitlist signups and 5 teams actively using the app daily.",
  },
  {
    id: "long-17",
    role: "user",
    text: "Write the teaser email for week 2 — short, no fluff.",
  },
  {
    id: "long-18",
    role: "agent",
    agentId: "writer",
    text: "**Subject:** Your AI team fits in one thread\n\n**Body:**\n\nHi —\n\nWe're building something for teams who are tired of copying strategy docs into design tools into doc drafts.\n\n[Product] puts a strategist, designer, and writer in one chat — aligned on your project from the first message.\n\nWe're opening a small beta soon. You're on the list.\n\n— [Founder name]\n\nP.S. Reply with what you're shipping next week. We read every note.",
  },
  {
    id: "long-19",
    role: "user",
    text: "What about launch week itself — weeks 3 and 4?",
  },
  {
    id: "long-20",
    role: "agent",
    agentId: "strategist",
    text: "**Week 3 (soft launch):**\n- Open beta to full waitlist in batches\n- Product Hunt prep: gallery, maker comment, hunter outreach\n- Publish 2 customer use-case threads (even if anonymized)\n\n**Week 4 (public launch):**\n- Product Hunt + coordinated social blast\n- Launch email to full list\n- Enable self-serve signup if stable\n- Host a 30-min live demo on X or LinkedIn\n\nHave a \"launch war room\" Slack channel with fixed roles: one person on support, one on social, one on metrics.",
  },
  {
    id: "long-21",
    role: "user",
    text: "Give me three social posts for launch day — different angles.",
  },
  {
    id: "long-22",
    role: "agent",
    agentId: "writer",
    text: "**Post 1 (problem/solution):**\n\"Copying context between ChatGPT tabs isn't a workflow. We built [Product] so your strategist, designer, and writer stay in one thread. Launching today.\"\n\n**Post 2 (demo-led):**\n\"60 seconds from 'help me launch a feature' to a shareable plan. Here's what that looks like in [Product] 👇\" [attach loom]\n\n**Post 3 (team-focused):**\n\"Built for 3–15 person teams who ship every week. If that's you, we'd love your take.\" [link]",
  },
  {
    id: "long-23",
    role: "user",
    text: "Weeks 5 and 6 — how do we keep momentum after the spike?",
  },
  {
    id: "long-24",
    role: "agent",
    agentId: "strategist",
    text: "**Week 5 — Activation:**\n- Email users who signed up but sent < 3 messages\n- Ship one \"aha\" improvement from beta feedback\n- Publish a comparison piece: [Product] vs. single-agent chat\n\n**Week 6 — Retention:**\n- Launch starred chats + export if not already live\n- Collect 3 short video testimonials\n- Set weekly active teams as your north-star metric\n\nThe launch spike fades. Weekly active teams is what tells you if positioning landed.",
  },
  {
    id: "long-25",
    role: "user",
    text: "Can you pull this all together into a final plan I can share with the team?",
  },
  {
    id: "long-26",
    role: "agent",
    agentId: "strategist",
    text: "Final Plan\n\n## Overview\nLaunch [Product] — an AI team chat for 3–15 person product teams — in six weeks with a waitlist-led GTM.\n\n## Positioning\n\"Your AI team, one conversation.\" Multi-agent alignment beats single-agent chat for launch-ready output.\n\n## Timeline\n- **Weeks 1–2:** ICP, waitlist, beta recruitment, demo assets\n- **Weeks 3–4:** Soft launch → public launch (Product Hunt, email, live demo)\n- **Weeks 5–6:** Activation emails, retention features, testimonial collection\n\n## Owners (fill in names)\n- GTM / strategy\n- Design system + app polish\n- Copy + email + social\n\n## Success metrics\n- 200+ waitlist signups by end of week 2\n- 5 daily active beta teams before public launch\n- Weekly active teams trending up by week 6\n\nShare this in Notion and assign one owner per section by EOD tomorrow.",
  },
];
