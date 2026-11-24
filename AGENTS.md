# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **Kalabawi**, a production-style AI-powered EdTech platform for Filipino public school teachers.

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

---

# 1. What you are building

Kalabawi is a SaaS platform designed to save teachers 15+ hours a week. Teachers input their MATATAG curriculum requirements, and the platform generates official, DepEd-compliant ILAW Lesson Plans (Word), Canva-level PowerPoint presentations, and TOS & Exams. 

The app features a "Weekly Bundle" pipeline, a native vector PPT engine with 3D icons, a strict Word-document viewer (A4 exact margins), and a credit-based subscription system. Build nothing beyond that. Do not overbuild.

---

# 2. How to work

Follow this loop for every request:

1. Read this file, then the skills the user named, then any supporting skills you clearly need.
2. Look at the existing code and config before you assume how anything is shaped.
3. Ask one focused question only if the task is genuinely ambiguous.
4. Write an implementation prompt in `prompts/` covering the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps.
5. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:
   - `What I did`: a few one-line bullets.
   - `Test`: numbered steps to run or see.
   - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
     Keep every line short. Put detail and rationale in the prompt file, not in this report.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

---

# 3. UI work

You do not design UI. The user gives you the design as desktop images plus a prompt. Reproduce them exactly: layout, spacing, typography, color, and states. There is no mobile reference, so make each page responsive down to mobile, adapting the layout sensibly while keeping the desktop exact. Do not restyle or improve beyond the reference. Reuse the components and Tailwind patterns already in the project before you add new ones. When there is a reference image, it is the source of truth.

---

# 4. Skills to lean on

Reach for these instead of guessing. Do not invent new ones.
- `react-best-practices`: For component architecture, state management, and hooks.
- `tailwind-conventions`: For strict adherence to the Kalabawi color palette and spacing.
- `gemini-api`: For prompt structuring, JSON schema enforcement, and token management.
- `pptxgenjs`: For rendering native vector shapes, big text layouts, and 3D icons into `.pptx` files.
- `docx-generation`: For rendering the strict ILAW tables, 0.5in margins, and exact Word styling.

---

# 5. How the app is structured

The app is a single React/Next.js workspace. Keep these responsibilities apart:
- **The UI Shell:** The Sidebar, Topbar, and Dashboard. Handles routing and display.
- **The Forms:** The Master Bundle Form and Individual Tool forms. They handle local state, validation, and warnings (e.g., competency mismatch).
- **The Data Pipeline (Server/API):** The endpoints that call Gemini to generate text, assemble the PPTX via `pptxgenjs`, and build the DOCX.
- **The Document Viewer:** A read-only, heavily styled React component that renders the generated data into a visual A4 replica of a Microsoft Word document (hard black borders, specific blue shading).
- **Auth & Credits:** Managed by Clerk/Supabase Auth. The browser never writes credit balances directly; it goes through a secure server route.

Never cross these boundaries. The browser holds no Gemini API keys, never generates the PPTX directly, and never writes database content or credits. The UI only shows stored data.

---

# 6. Tech stack

Use Next.js (App Router) or Vite, React, Tailwind CSS, `pptxgenjs` (for PowerPoint generation), `docx` or `html-to-docx` (for Word generation), Clerk (Auth), and Gemini 1.5 Flash (via the AI SDK for rapid JSON generation). Use `lucide-react` for icons and `react-hot-toast` or `sonner` for notifications. 

Do not use external image generation APIs for the PPT generator unless explicitly requested. Use native vector shapes and local 3D icon assets. Do not use standard HTML tables for the Document Viewer; use exact CSS grid/flexbox with hard black borders.

---

# 7. Decisions already made for you

Build to these unless the user changes them.
- **The Master Bundle:** One API call can generate the Lesson Plan, 5 PPTs, and TOS. 
- **Native Vector PPTs:** The PPT generator uses `pptxgenjs` to draw native, editable shapes (circles, rectangles, big text) combined with local 3D icon `.png` files. It does NOT use AI-generated background images.
- **Word Document Exactness:** The Document Viewer must simulate a Microsoft Word document exactly. It uses `border-collapse`, solid 1px black borders, `0.5in` margins, and specific Hex colors (like `#B4C6E7` for headers).
- **Teacher-First Typography:** Generated PPTs must prioritize massive, readable text (up to 54pt) for classroom projection. If a sentence is long, the AI splits it across multiple slides.
- **Strict Localization:** If the subject is GMRC, Filipino, or AP, the entire generated output (Plan, PPT, TOS) MUST be in deep, natural Tagalog/Filipino. Otherwise, it defaults to English.
- **AI Safety Net:** The AI must generate AI-usage declarations and include standard DepEd signature blocks at the end of the Word document.

---

# 8. The data you are modeling

Here is the shape of the data. The relationships and fields called out are fixed.
- **Weekly Bundle:** The core JSON object. Contains `intentions` (standards, competencies, per-session objectives), `learnerContext`, `sessionMatrix` (5 days of 4Es flows, assessments, reflections, homework), and `signatures`.
- **PPT Blueprint:** A JSON array of slide objects. Each has `layout_type` (e.g., "big_text", "hero"), `text_content`, `font_size`, and `icon_name`.
- **User/Credits:** Keyed by Clerk user ID. Tracks `bundleCredits` and `individualCredits`.
- **Custom Subject Cache:** Saved in `localStorage` so teachers don't lose custom subjects (e.g., "Robotics").
- **Toast State:** Global UI state for success, error, warning, info, and loading messages.

---

# 9. How documents get generated

The generation pipeline must be robust and fast.
1. **Text Generation:** Gemini returns structured JSON based on the strict Zod schema.
2. **Document Assembly:** The `docx` library maps the JSON to the ILAW tables. The parser strips out redundant labels (like "Title:" or "Items:") to make the output read naturally.
3. **PPT Assembly:** `pptxgenjs` reads the PPT blueprint and draws the shapes, texts, and 3D icons locally in the browser or server.
4. **Sanitization:** The parser must ensure no UI text bleeding (e.g., schema descriptions accidentally rendering in the table cells).

---

# 10. The AI Generation Config

The prompt engineering is handled in `src/lib/prompts/`. 
- `lessonPlanPrompt.ts` holds the System Prompt. It enforces the 4Es framework, the progressive 5-day roadmap, Tagalog localization, and the "Teacher Script" voice.
- `pptPrompt.ts` enforces the NotebookLM-style slide splitting (max 15 words per slide, massive font sizes).

---

# 11. How the UI must behave

- **The Form:** "Apple-style" validation. Warnings (like Grade Level mismatches) appear subtly inline, never as blocking popups. The "Generate" button sits in a split footer with micro-copy.
- **The Document Viewer:** Strictly replicates Microsoft Word. No rounded corners, no gray text. Hard black borders and the exact DepEd blue shading.
- **The Toasts:** Use the 5 defined states (Success, Error, Warning, Info, Loading) with the appropriate mascot reactions.
- **Loading States:** Use a progress stepper (e.g., "1. Writing Plan... 2. Designing Slides... 3. Building Exams...") during the Bundle generation.

---

# 12. Things that will trip you up

- **Word Pagination:** HTML tables do not split across pages well by default. You must use `break-inside: avoid` carefully, and allow table rows to split (`break-inside: auto`) so text doesn't jump or leave massive blank spaces at the bottom of pages.
- **Signature Blocks:** Always wrap the 4 signature blocks in a single container with `break-inside: avoid` so they never split across pages in the PDF/Word export.
- **Token Limits:** Generating a 5-day plan with detailed Teacher Scripts can hit the `maxOutputTokens` limit. The prompt must instruct the AI to be concise, and the API route must have `maxOutputTokens: 8192`.
- **PPTX Fonts:** `pptxgenjs` cannot use Google Fonts unless they are installed on the machine generating the file. Stick to standard system fonts (Arial, Times New Roman, Georgia) or bundle the font files.

---

# 13. Checks to run

Run these from the workspace and report the real output. Never claim a check passed without running it.
- `npm run build` and `npm run lint` to ensure no TypeScript errors.
- Generate a full 5-day lesson plan and verify the DOCX downloads and opens perfectly in Microsoft Word (checking the 0.5" margins and signatures).
- Generate a PPT and verify the text is huge, the 3D icons appear, and the shapes are editable.
- Verify the mobile view of the forms and sidebar.

---

# 14. When in doubt

Keep it small. Preserve the server and client boundaries and the private token rule. Match the provided UI exactly. Save a prompt and get approval before coding. Run the checks. Share exact test steps.
