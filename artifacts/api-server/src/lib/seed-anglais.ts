import { db, lessonsTable } from "@workspace/db";
import { eq, and, gte } from "drizzle-orm";
import { logger } from "./logger";

const ANGLAIS_SUBJECT_ID = 7;
const SEED_MARKER_ORDER_START = 5;

const anglaisLessons = [
  {
    title: "Leçon 1 : Talking about past habits",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 5,
    duration: 45,
    isPremium: false,
    summary:
      "Learn how to describe past habits and repeated actions using used to, would, and the simple past tense.",
    keyPoints: `"Used to + infinitive" expresses past habits AND past states that no longer exist
"Would + infinitive" expresses ONLY repeated past actions (not states)
Simple past + frequency adverb also expresses past habits
Negative of "used to": did not use to (NOT "didn't used to")
"Would" cannot replace "used to" for states (feelings, situations)`,
    content: `<h2>Talking About Past Habits</h2>
<p>In English, we use specific structures to talk about things we did regularly or habitually in the past but no longer do today. The three main ways are: <strong>used to + infinitive</strong>, <strong>would + infinitive</strong>, and the <strong>simple past</strong>.</p>
<h3>1. Used to + Infinitive</h3>
<p><em>Used to</em> expresses a past habit or a past state that no longer exists. It is used for both actions and states.</p>
<ul>
  <li><strong>Form:</strong> Subject + used to + base verb</li>
  <li><strong>Negative:</strong> Subject + did not (didn't) use to + base verb</li>
  <li><strong>Question:</strong> Did + subject + use to + base verb?</li>
</ul>
<p>Examples: She <em>used to walk</em> to school every day. They <em>used to live</em> in a small village. He <em>didn't use to like</em> vegetables.</p>
<h3>2. Would + Infinitive</h3>
<p><em>Would</em> can also express past habits, but it is only used for <strong>repeated actions</strong> — NOT for past states.</p>
<ul>
  <li>Every evening, my grandfather <em>would sit</em> by the fire and tell us stories.</li>
  <li>❌ She would be tall. (WRONG — use "used to be")</li>
</ul>
<h3>3. The Simple Past for Past Habits</h3>
<p>The simple past with adverbs like <em>always, often, sometimes, never, every day</em> also describes past habits.</p>
<ul><li>As a child, I <em>always played</em> outside after school.</li></ul>
<h3>Key Differences</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Structure</th><th>Past actions</th><th>Past states</th></tr>
  <tr><td>used to</td><td>✅ Yes</td><td>✅ Yes</td></tr>
  <tr><td>would</td><td>✅ Yes</td><td>❌ No</td></tr>
  <tr><td>Simple past + adverb</td><td>✅ Yes</td><td>✅ Yes</td></tr>
</table>`,
    examples: `<p><strong>Example 1 – Used to (habit):</strong> My father <em>used to work</em> as a teacher before he retired. He <em>used to wake up</em> very early every morning.</p>
<p><strong>Example 2 – Used to (state):</strong> There <em>used to be</em> a big mango tree in our compound. I <em>used to be</em> afraid of the dark.</p>
<p><strong>Example 3 – Would (repeated action):</strong> Every evening, we <em>would run</em> to the market and <em>would buy</em> mangoes and groundnuts.</p>
<p><strong>Example 4 – Comparison:</strong><br>❌ He would live in Abidjan. (state — wrong!)<br>✅ He used to live in Abidjan.</p>
<p><strong>Example 5 – Simple past + adverb:</strong> She <em>always brought</em> food for her classmates. They <em>sometimes stayed</em> late at school to study.</p>`,
  },
  {
    title: "Leçon 2 : Expressing possibility, ability, obligation and necessity",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 6,
    duration: 50,
    isPremium: false,
    summary:
      "Master modal verbs to express possibility, ability, obligation, necessity, prohibition and advice in English.",
    keyPoints: `"Can" expresses present ability; "could" expresses past ability
"May" expresses higher possibility (50%); "might" expresses lower possibility (30%)
"Must" expresses internal/personal obligation; "have to" expresses external rules
"Should / ought to" expresses advice or recommendations
"Must not" = prohibition (forbidden); "don't have to" = no obligation (a choice)
Modal verbs are always followed by a bare infinitive (base form)`,
    content: `<h2>Modal Verbs: Possibility, Ability, Obligation and Necessity</h2>
<p>Modal verbs are auxiliary verbs used to express degrees of certainty, ability, obligation, and necessity.</p>
<h3>1. Expressing Ability</h3>
<p><strong>Can</strong> (present) and <strong>could</strong> (past) express ability.</p>
<ul>
  <li>She <em>can speak</em> three languages. (present ability)</li>
  <li>When I was young, I <em>could swim</em> very well. (past ability)</li>
</ul>
<h3>2. Expressing Possibility</h3>
<p><strong>May</strong> (more certain ~50%) and <strong>might</strong> (less certain ~30%) express possibility.</p>
<ul>
  <li>It <em>may rain</em> tonight. / She <em>might come</em> to the party.</li>
</ul>
<h3>3. Expressing Obligation and Necessity</h3>
<p><strong>Must</strong> (internal obligation) vs <strong>have to</strong> (external rule):</p>
<ul>
  <li>I <em>must study</em> harder. (personal decision)</li>
  <li>Students <em>have to wear</em> uniforms. (school rule)</li>
</ul>
<h3>4. Expressing Advice</h3>
<p><strong>Should</strong> and <strong>ought to</strong> give advice:</p>
<ul><li>You <em>should eat</em> more vegetables. / She <em>ought to apologise</em>.</li></ul>
<h3>5. Prohibition vs No Obligation</h3>
<ul>
  <li><strong>Must not</strong> = forbidden: You <em>must not smoke</em> here.</li>
  <li><strong>Don't have to</strong> = optional: You <em>don't have to come</em>.</li>
</ul>
<h3>Summary Table</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Modal</th><th>Use</th></tr>
  <tr><td>can / could</td><td>Ability</td></tr>
  <tr><td>may / might</td><td>Possibility</td></tr>
  <tr><td>must</td><td>Strong obligation (internal)</td></tr>
  <tr><td>have to</td><td>Obligation (external rule)</td></tr>
  <tr><td>should / ought to</td><td>Advice</td></tr>
  <tr><td>must not</td><td>Prohibition</td></tr>
  <tr><td>don't have to</td><td>No obligation</td></tr>
</table>`,
    examples: `<p><strong>Ability:</strong> Kofi <em>can play</em> the guitar beautifully. When he was a child, he <em>could not read</em> music.</p>
<p><strong>Possibility:</strong> The results <em>may be</em> announced tomorrow. They <em>might be</em> delayed. There <em>could be</em> a problem.</p>
<p><strong>Obligation:</strong> All candidates <em>must bring</em> their ID card. Students <em>have to arrive</em> before 8 a.m.</p>
<p><strong>Advice:</strong> You look tired. You <em>should take</em> a break. You <em>ought to drink</em> more water.</p>
<p><strong>No obligation vs Prohibition:</strong><br>
You <em>don't have to wear</em> a tie — it is optional.<br>
You <em>must not bring</em> your phone into the exam room — it is strictly forbidden.</p>`,
  },
  {
    title:
      "Leçon 3 : The past simple and the past perfect simple + Indefinite relative pronouns",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 7,
    duration: 55,
    isPremium: false,
    summary:
      "Compare the past simple and past perfect simple for sequencing events, and master indefinite relative pronouns (whoever, whatever, wherever...).",
    keyPoints: `Past simple = completed action at a specific past time (verb + -ed or irregular form)
Past perfect = action completed BEFORE another past action (had + past participle)
Past perfect signals: already, just, never, after, before, by the time
Two past events: past perfect for the EARLIER one, past simple for the LATER one
Whoever = any person / Whatever = any thing / Wherever = any place
Whenever = any time / Whichever = any choice / However = in any way`,
    content: `<h2>Part A: The Past Simple and the Past Perfect Simple</h2>
<h3>1. The Past Simple</h3>
<p>The <strong>past simple</strong> is used for completed actions that happened at a specific time in the past.</p>
<ul>
  <li><strong>Regular verbs:</strong> verb + -ed → walked, studied, arrived</li>
  <li><strong>Irregular verbs:</strong> go → went, see → saw, write → wrote</li>
</ul>
<h3>2. The Past Perfect Simple</h3>
<p>The <strong>past perfect</strong> describes an action <strong>completed BEFORE another past action</strong>. Form: <em>had + past participle</em>.</p>
<ul>
  <li>Key signals: <em>after, before, when, already, just, never, by the time</em></li>
</ul>
<h3>3. Using Both Tenses Together</h3>
<p>Past perfect = earlier action → Past simple = more recent action</p>
<ul><li>When I <em>arrived</em>, the train <em>had already left</em>.</li></ul>
<h2>Part B: Indefinite Relative Pronouns</h2>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Pronoun</th><th>Meaning</th><th>Example</th></tr>
  <tr><td>whoever</td><td>any person who</td><td>Whoever arrives first wins.</td></tr>
  <tr><td>whatever</td><td>anything that</td><td>Do whatever you think is right.</td></tr>
  <tr><td>whichever</td><td>any one of a group</td><td>Choose whichever you prefer.</td></tr>
  <tr><td>wherever</td><td>any place where</td><td>Sit wherever you like.</td></tr>
  <tr><td>whenever</td><td>any time when</td><td>Call me whenever you need help.</td></tr>
  <tr><td>however</td><td>in any way</td><td>Do it however you like.</td></tr>
</table>`,
    examples: `<p><strong>Past Perfect vs Past Simple (1):</strong><br>
When I <em>arrived</em> at the station, the train <em>had already left</em>.<br>
→ First: the train left. Then: I arrived.</p>
<p><strong>(2):</strong> She <em>had studied</em> all night before she <em>sat</em> the exam.</p>
<p><strong>(3 – narrative):</strong> After he <em>had eaten</em>, he <em>washed</em> the dishes and <em>went</em> to bed.</p>
<p><strong>Indefinite relative pronouns:</strong><br>
<em>Whoever</em> finishes first can help the others.<br>
I will support you <em>whatever</em> decision you make.<br>
They followed him <em>wherever</em> he went.<br>
You may borrow <em>whichever</em> book interests you most.<br>
Come and visit us <em>whenever</em> you are in town.<br>
<em>However</em> difficult the exam is, do not give up.</p>`,
  },
  {
    title: "Leçon 4 : Past form of modal verbs",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 8,
    duration: 55,
    isPremium: false,
    summary:
      "Learn to use past modal forms (must have, could have, should have, might have...) to express certainty, regret, criticism and possibility about past situations.",
    keyPoints: `Past modals = modal + have + past participle
"Must have" = strong certainty about the past (almost sure it happened)
"Can't have / couldn't have" = certainty that something did NOT happen
"May have / might have" = past possibility (not sure)
"Should have" = regret or criticism (right thing not done)
"Shouldn't have" = past mistake (wrong thing that was done)
"Could have" = past possibility/ability that was not used
"Would have" = hypothetical past (used in the third conditional)`,
    content: `<h2>Past Form of Modal Verbs</h2>
<p>Past modals are formed with a modal verb + <strong>have + past participle</strong>. They express speculation, regret, or criticism about past situations.</p>
<h3>1. Must have + p.p. — Certainty</h3>
<p>Almost certain something happened: She <em>must have forgotten</em> her keys. You walked 10 km! You <em>must have been</em> exhausted.</p>
<h3>2. Can't have / Couldn't have + p.p. — Impossibility</h3>
<p>Almost certain it did NOT happen: He <em>can't have passed</em> — he never studied!</p>
<h3>3. May have / Might have + p.p. — Past possibility</h3>
<p>Possible but uncertain: They <em>may have missed</em> the bus. She <em>might have gone</em> home.</p>
<h3>4. Should have + p.p. — Regret / Criticism</h3>
<p>Right thing not done: You <em>should have studied</em> more. I <em>ought to have apologised</em> earlier.</p>
<h3>5. Shouldn't have + p.p. — Past mistake</h3>
<p>Wrong thing that was done: She <em>shouldn't have said</em> that.</p>
<h3>6. Could have + p.p. — Missed opportunity</h3>
<p>Possible but not used: I <em>could have won</em>, but I fell.</p>
<h3>7. Would have + p.p. — Hypothetical past</h3>
<p>Third conditional: If I had known, I <em>would have helped</em> you.</p>
<h3>Summary Table</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Structure</th><th>Meaning</th></tr>
  <tr><td>must have + p.p.</td><td>Almost certain it happened</td></tr>
  <tr><td>can't/couldn't have + p.p.</td><td>Almost certain it did NOT happen</td></tr>
  <tr><td>may/might have + p.p.</td><td>Possible, not sure</td></tr>
  <tr><td>should have + p.p.</td><td>Regret — right thing not done</td></tr>
  <tr><td>shouldn't have + p.p.</td><td>Mistake — wrong thing done</td></tr>
  <tr><td>could have + p.p.</td><td>Missed opportunity</td></tr>
  <tr><td>would have + p.p.</td><td>Hypothetical/unrealised past</td></tr>
</table>`,
    examples: `<p><strong>Certainty:</strong> The lights are off and her car is gone. She <em>must have left</em> already.</p>
<p><strong>Impossibility:</strong> He <em>can't have cheated</em>. The teacher was watching the whole time.</p>
<p><strong>Possibility:</strong> I don't see my pen. I <em>might have left</em> it at school, or I <em>may have dropped</em> it.</p>
<p><strong>Regret / Criticism:</strong> The accident was serious. You <em>should have driven</em> more carefully. I <em>should have warned</em> you earlier.</p>
<p><strong>Past mistake:</strong> You <em>shouldn't have told</em> him the secret. Now everyone knows!</p>
<p><strong>Missed opportunity:</strong> We arrived 10 minutes late. We <em>could have taken</em> a taxi instead of walking.</p>
<p><strong>Hypothetical past:</strong> If they had trained harder, they <em>would have won</em> the championship.</p>`,
  },
  {
    title: "Leçon 5 : A letter of complaint",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 9,
    duration: 50,
    isPremium: false,
    summary:
      "Learn how to write a formal letter of complaint: structure, formal language, useful phrases, and how to request a solution effectively.",
    keyPoints: `A letter of complaint is formal: no contractions, polite but firm tone
Layout: your address → date → recipient address → subject line → salutation
Para 1: Introduction and context (who you are, what you bought, when)
Para 2: Describe the problem clearly with facts and dates
Para 3: Explain the consequences/impact on you
Para 4: State the action expected and a deadline
Use "Yours faithfully" when salutation is "Dear Sir/Madam"
Use "Yours sincerely" when you addressed the person by name`,
    content: `<h2>How to Write a Letter of Complaint</h2>
<p>A letter of complaint is a <strong>formal letter</strong> written to express dissatisfaction and request a solution. It must be polite but firm, factual, and well-structured.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Formal tone: polite but firm</li>
  <li>No contractions (I am NOT I'm)</li>
  <li>Clear, factual language</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Your address</strong> (top right) → <strong>Date</strong> → <strong>Recipient's address</strong> (left)<br>
<strong>Subject:</strong> RE: Complaint about [issue]<br>
<strong>Salutation:</strong> Dear Sir/Madam (unknown) / Dear Mr/Mrs [Name] (known)<br>
<strong>Para 1:</strong> Purpose + background (where/when purchased, reference number)<br>
<strong>Para 2:</strong> Describe the problem with specific facts and dates<br>
<strong>Para 3:</strong> Consequences/impact on you<br>
<strong>Para 4:</strong> Action expected + deadline<br>
<strong>Closing:</strong> I look forward to hearing from you.<br>
<strong>Sign-off:</strong> Yours faithfully / Yours sincerely<br>
<strong>Full name (printed)</strong></p>
<h3>3. Useful Expressions</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Useful phrases</th></tr>
  <tr><td>Purpose</td><td>I am writing to complain about... / I am writing with regard to...</td></tr>
  <tr><td>Problem</td><td>I was disappointed to find that... / Unfortunately, the product was...</td></tr>
  <tr><td>Request</td><td>I would be grateful if you could... / I request that you...</td></tr>
  <tr><td>Deadline</td><td>I would appreciate a response within 14 days.</td></tr>
</table>`,
    examples: `<p><strong>Model letter:</strong></p>
<p>12, Rue des Fleurs, Abidjan, Cocody<br>9th April 2026</p>
<p>The Customer Service Manager<br>TeleConnect Mobile Services, Abidjan</p>
<p><strong>RE: Complaint about defective mobile phone</strong></p>
<p>Dear Sir/Madam,</p>
<p>I am writing to complain about a mobile phone (Model: Samsung Galaxy A15, Ref. TC-20456) purchased on 25th March 2026 for 85,000 CFA francs.</p>
<p>Unfortunately, after five days of use, the screen developed a serious fault: it displays a black line and frequently freezes. Despite following the user manual, the problem has persisted.</p>
<p>As a result, I have been unable to use the device for my studies, causing considerable inconvenience.</p>
<p>I would therefore be grateful if you could replace the phone or issue a full refund by 30th April 2026. I enclose a copy of my receipt as proof of purchase.</p>
<p>I look forward to hearing from you.</p>
<p>Yours faithfully,<br><strong>Kouamé Adama</strong></p>`,
  },
  {
    title: "Leçon 6 : An informal email",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 10,
    duration: 45,
    isPremium: false,
    summary:
      "Master the structure and language of informal emails: greetings, friendly expressions, sharing news, and appropriate sign-offs for friends and family.",
    keyPoints: `Informal emails are written to friends or family — use a warm, friendly tone
Contractions are acceptable: I'm, you're, don't, it's, can't
Opening: greet the person and re-establish contact (How are you? Long time no see!)
Body: share news, answer questions, use linking words (anyway, by the way, guess what!)
Closing: wrap up naturally and invite a reply (Write back soon! / Can't wait to hear from you!)
Sign-off: Love / Take care / Best wishes / Cheers + first name only
No formal address or subject line required in informal emails`,
    content: `<h2>How to Write an Informal Email</h2>
<p>An <strong>informal email</strong> is written to a friend or family member. The language is friendly, relaxed, and personal.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Friendly and warm tone</li>
  <li>Contractions are allowed: I'm, you're, it's, don't, can't</li>
  <li>Colloquial expressions are acceptable</li>
  <li>Personal questions and comments</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Subject:</strong> Short and catchy (e.g., "Great news!" / "Missing you!")<br>
<strong>Greeting:</strong> Hi [Name]! / Hello [Name]! / Hey [Name]!<br>
<strong>Opening:</strong> Re-establish contact — How are you? / It's been ages!<br>
<strong>Body:</strong> Share news, answer questions, use: anyway, by the way, guess what!<br>
<strong>Closing:</strong> Write back soon! / Can't wait to hear from you!<br>
<strong>Sign-off:</strong> Love, / Take care, / Best wishes, / Cheers,<br>
<strong>First name only</strong></p>
<h3>3. Useful Language</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Opening</td><td>Hope you're well! / How have you been? / Long time no see!</td></tr>
  <tr><td>Sharing news</td><td>Guess what! / You won't believe it! / I've got exciting news!</td></tr>
  <tr><td>Asking for news</td><td>How are things? / What have you been up to? / How's school?</td></tr>
  <tr><td>Closing</td><td>Write back soon! / Keep in touch! / Can't wait to see you!</td></tr>
</table>
<h3>4. Formal vs Informal</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Formal</th><th>Informal</th></tr>
  <tr><td>Dear Sir/Madam</td><td>Hi Kofi! / Hey Ama!</td></tr>
  <tr><td>I am writing to inform you</td><td>I just wanted to tell you</td></tr>
  <tr><td>Yours faithfully/sincerely</td><td>Love / Take care / Cheers</td></tr>
</table>`,
    examples: `<p><strong>Subject:</strong> Exciting news from Abidjan!</p>
<p>Hi Fatou!</p>
<p>How are you? I hope everything is going well. It's been such a long time since we last chatted — I've been meaning to write for weeks!</p>
<p>Anyway, I have some really exciting news. Guess what? I finally passed my pre-bac mock exams and got the highest score in my class! I'm so relieved and happy. All those late nights really paid off. My mum was so proud — she even made my favourite dish to celebrate!</p>
<p>By the way, I heard you're coming to Abidjan next month for the holidays. Is that true? I really hope so! We could visit the beach and catch up properly.</p>
<p>What have you been up to lately? How's school going? Drop me a message when you can — I can't wait to hear all your news!</p>
<p>Write back soon!</p>
<p>Lots of love,<br><strong>Aminata</strong></p>`,
  },
];

export async function seedAnglaisLessons(): Promise<void> {
  try {
    const existing = await db
      .select({ order: lessonsTable.order })
      .from(lessonsTable)
      .where(
        and(
          eq(lessonsTable.subjectId, ANGLAIS_SUBJECT_ID),
          gte(lessonsTable.order, SEED_MARKER_ORDER_START),
        ),
      );

    if (existing.length >= 6) {
      logger.info("Anglais seed lessons already present — skipping");
      return;
    }

    const existingOrders = new Set(existing.map((r) => r.order));

    for (const lesson of anglaisLessons) {
      if (existingOrders.has(lesson.order)) continue;
      await db.insert(lessonsTable).values({
        title: lesson.title,
        subjectId: lesson.subjectId,
        series: lesson.series,
        order: lesson.order,
        duration: lesson.duration,
        isPremium: lesson.isPremium,
        summary: lesson.summary,
        keyPoints: lesson.keyPoints,
        content: lesson.content,
        examples: lesson.examples,
      });
      logger.info({ title: lesson.title }, "Seeded Anglais lesson");
    }

    logger.info("Anglais lessons seed complete");
  } catch (err) {
    logger.error({ err }, "Failed to seed Anglais lessons");
  }
}
