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
  // ── Unité 3 ────────────────────────────────────────────────────────────────
  {
    title:
      "Leçon 1 (Unité 3) : Language function – Making causative sentences & Making comparisons",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 11,
    duration: 50,
    isPremium: false,
    summary:
      "Learn to form causative sentences using make, let, have, get and help, and make comparisons using comparative and superlative structures.",
    keyPoints: `Causative verbs arrange for others to do things: make / let / have / get / help
"Make" and "let" take object + bare infinitive (no "to")
"Get" takes object + to-infinitive
"Have" takes object + bare infinitive (professional services)
Comparative of short adjectives: add -er + than
Comparative of long adjectives: more + adjective + than
Superlative: the + -est (short) / the most + adjective (long)
Equality: as + adjective/adverb + as / Inequality: not as ... as
More/fewer with countable nouns; more/less with uncountable nouns`,
    content: `<h2>Part A: Making Causative Sentences</h2>
<p>A <strong>causative sentence</strong> expresses that someone arranges for another person to do something on their behalf.</p>
<h3>Causative Verbs</h3>
<ul>
  <li><strong>Make</strong> – force: <em>make + object + bare infinitive</em> → The teacher <em>made the students rewrite</em> their essays.</li>
  <li><strong>Let</strong> – allow: <em>let + object + bare infinitive</em> → Her parents <em>let her stay</em> out late.</li>
  <li><strong>Have</strong> – arrange (service): <em>have + object + bare infinitive</em> → She <em>had the mechanic check</em> her car.</li>
  <li><strong>Get</strong> – persuade: <em>get + object + to-infinitive</em> → He <em>got his brother to fix</em> his computer.</li>
  <li><strong>Help</strong> – assist: <em>help + object + bare/to-infinitive</em> → She <em>helped me carry</em> the boxes.</li>
</ul>
<h2>Part B: Making Comparisons</h2>
<h3>1. Comparative of Adjectives</h3>
<ul>
  <li>Short adjectives: add <strong>-er … than</strong> → taller than, faster than</li>
  <li>Long adjectives: <strong>more … than</strong> → more intelligent than</li>
  <li>Irregular: good → better / bad → worse / far → farther/further</li>
</ul>
<h3>2. Superlative</h3>
<ul>
  <li>Short: add <strong>-est</strong> → the tallest / Long: <strong>the most</strong> → the most intelligent</li>
  <li>Irregular: good → the best / bad → the worst</li>
</ul>
<h3>3. Equality and Inequality</h3>
<ul>
  <li>Equality: <strong>as + adjective + as</strong> → She is as tall as her sister.</li>
  <li>Inequality: <strong>not as … as</strong> → This is not as interesting as the other.</li>
</ul>
<h3>4. Quantities</h3>
<ul>
  <li><strong>more / fewer / less … than</strong> → He has more books than I do. There are fewer students than last year.</li>
</ul>`,
    examples: `<p><strong>Causative sentences:</strong><br>
The boss <em>made everyone work</em> overtime last Friday.<br>
The coach <em>let the players rest</em> after training.<br>
She <em>had a tailor make</em> her dress for the ceremony.<br>
I <em>got my friend to proofread</em> my application letter.</p>
<p><strong>Comparisons:</strong><br>
Kofi is <em>taller than</em> his classmate, but not <em>as fast as</em> him.<br>
This exercise is <em>more difficult than</em> the previous one.<br>
She is <em>the most hardworking student</em> in the class.<br>
We have <em>fewer resources</em> but <em>more determination</em> than anyone else.</p>`,
  },
  {
    title:
      'Leçon 2 (Unité 3) : Language corner – Causative structures with "have" and "get"',
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 12,
    duration: 50,
    isPremium: false,
    summary:
      'Master the causative structures "have/get something done" to talk about arranged services and experiences using past participles.',
    keyPoints: `"Have something done" = subject arranges for someone else to do it (professional service)
Structure: have + object + past participle
"Get something done" = similar to "have" but slightly informal or implies effort
Structure: get + object + past participle
"Have someone do" = have + person + bare infinitive
"Get someone to do" = get + person + to-infinitive
Experiential causative: have/get + object + past participle = unpleasant thing that happened to subject
Change the tense of "have/get" to place the action in time (past, future, perfect, etc.)`,
    content: `<h2>Causative Structures with "Have" and "Get"</h2>
<h3>1. Have something done (arranged service)</h3>
<p><strong>Structure:</strong> Subject + <em>have</em> + object + <strong>past participle</strong></p>
<ul>
  <li>She <em>had her hair cut</em> at the salon.</li>
  <li>They <em>had their house painted</em> last summer.</li>
</ul>
<h3>2. Get something done (informal)</h3>
<p><strong>Structure:</strong> Subject + <em>get</em> + object + <strong>past participle</strong></p>
<ul>
  <li>I must <em>get my passport renewed</em> before the trip.</li>
  <li>She finally <em>got her laptop fixed</em>.</li>
</ul>
<h3>3. Naming the agent</h3>
<ul>
  <li><em>Have + person + bare infinitive:</em> She <em>had the plumber fix</em> the pipes.</li>
  <li><em>Get + person + to-infinitive:</em> She <em>got the plumber to fix</em> the pipes.</li>
</ul>
<h3>4. Experiential Causative (Unpleasant events)</h3>
<p>The same structure describes something unpleasant that happened TO the subject:</p>
<ul>
  <li>He <em>had his wallet stolen</em> on the bus. (he didn't arrange this)</li>
  <li>They <em>got their house flooded</em> during the storm.</li>
</ul>
<h3>5. Tense Changes</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Tense</th><th>Example</th></tr>
  <tr><td>Present simple</td><td>She has her nails done every week.</td></tr>
  <tr><td>Past simple</td><td>He had his car serviced last month.</td></tr>
  <tr><td>Future with will</td><td>I will have my teeth checked tomorrow.</td></tr>
  <tr><td>Present perfect</td><td>They have had their roof repaired.</td></tr>
</table>`,
    examples: `<p><strong>Arranged service:</strong><br>
Aminata <em>had her dress made</em> by a talented seamstress for the graduation ceremony.<br>
I finally <em>got my bicycle fixed</em> after it broke down for the third time.</p>
<p><strong>Naming the agent:</strong><br>
She <em>had the doctor examine</em> her shoulder after the fall.<br>
He <em>got his classmate to explain</em> the maths problem to him.</p>
<p><strong>Experiential causative:</strong><br>
The student <em>had his assignment deleted</em> when the computer crashed.<br>
They <em>got their shop broken into</em> last night.</p>
<p><strong>Different tenses:</strong><br>
She <em>has her blood pressure checked</em> every month.<br>
They <em>will have their offices renovated</em> next year.</p>`,
  },
  {
    title: "Leçon 3 (Unité 3) : Writing skills – A newspaper article",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 13,
    duration: 50,
    isPremium: false,
    summary:
      "Learn to write a well-structured newspaper article using formal language, the five Ws, headlines, quotations, and a clear lead paragraph.",
    keyPoints: `Newspaper articles answer: Who, What, When, Where, Why (and How)
Written in third person; formal/semi-formal tone; no contractions
Headline: short, present tense, eye-catching and informative
Lead paragraph: summarises the whole story in 2-3 sentences
Body: develops the story with details, quotes, and context
Quotes add credibility: "According to...", "[Name] stated that..."
Conclusion: outcome or future developments
Linking words: Furthermore / Moreover / As a result / Subsequently`,
    content: `<h2>How to Write a Newspaper Article</h2>
<p>A <strong>newspaper article</strong> reports on a news event. It answers the five "W" questions: <strong>Who, What, When, Where, Why</strong> (and sometimes <strong>How</strong>).</p>
<h3>1. Key Features</h3>
<ul>
  <li>Written in the <strong>third person</strong> (he, she, they)</li>
  <li><strong>Past simple</strong> or <strong>present perfect</strong> for reported events</li>
  <li>Formal/semi-formal language — no slang or contractions</li>
  <li>Quotations from witnesses or experts add credibility</li>
  <li>Objective and factual tone</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Headline:</strong> Short, present tense, eye-catching → "School Student Wins National Science Prize"<br>
<strong>By-line:</strong> Journalist's name and date<br>
<strong>Lead paragraph:</strong> Answers Who, What, When, Where, Why in 2–3 sentences<br>
<strong>Body:</strong> Details, background, context, quotes<br>
<strong>Conclusion:</strong> Outcome or future developments</p>
<h3>3. Language Features</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Useful language</th></tr>
  <tr><td>Reporting</td><td>It is claimed that… / Sources confirm… / has been reported</td></tr>
  <tr><td>Quoting</td><td>According to… / [Name] stated that… / In the words of…</td></tr>
  <tr><td>Adding details</td><td>Furthermore, / Moreover, / In addition, / As a result,</td></tr>
</table>`,
    examples: `<p><strong>Headline:</strong> Fire Destroys Market in Bouaké; Hundreds Affected</p>
<p><strong>By-line:</strong> By Fatou Bamba | Staff Reporter | 9 April 2026</p>
<p><strong>Lead paragraph:</strong><br>
A devastating fire broke out in the Grand Marché of Bouaké on Tuesday night, destroying over 200 market stalls. The blaze began at approximately 11 p.m. and was brought under control by firefighters early the following morning.</p>
<p><strong>Body paragraph 1:</strong><br>
According to eyewitnesses, the fire started in the fabric section before spreading rapidly due to strong winds. "I heard a loud explosion and within minutes, everything was in flames," said Mamadou Traoré, a nearby resident.</p>
<p><strong>Body paragraph 2:</strong><br>
The cause of the fire has not yet been officially confirmed. The Regional Governor visited the site on Wednesday and promised emergency assistance. Moreover, a relief fund has been set up to help traders rebuild.</p>
<p><strong>Conclusion:</strong><br>
The full extent of the damage is still being assessed. Authorities have urged traders not to return until a full safety inspection is completed.</p>`,
  },
  // ── Unité 4 ────────────────────────────────────────────────────────────────
  {
    title:
      "Leçon 4 (Unité 4) : Language function – Expressing future actions & Expressing subjective judgments and general statements",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 14,
    duration: 55,
    isPremium: false,
    summary:
      "Master the different ways to express future actions (will, going to, present continuous, future perfect) and learn to distinguish subjective judgments from general statements.",
    keyPoints: `"Will" = predictions, spontaneous decisions, promises and offers
"Be going to" = planned intentions or predictions with visible evidence
Present continuous for future = fixed arrangements (meetings, travel)
Present simple for future = timetabled/scheduled events
Future continuous = action in progress at a specific future time (will be + -ing)
Future perfect = action completed before a future point (will have + past participle)
Subjective judgments = personal opinion: I think / I believe / In my opinion / It seems
General statements = universal truths: It is said that / Studies show / Generally speaking`,
    content: `<h2>Part A: Expressing Future Actions</h2>
<h3>1. Will + bare infinitive</h3>
<p>Predictions, spontaneous decisions, promises and offers.</p>
<ul>
  <li>It <em>will be</em> cold tomorrow. / I<em>'ll help</em> you! (spontaneous)</li>
</ul>
<h3>2. Be going to + bare infinitive</h3>
<p>Planned intentions and evidence-based predictions.</p>
<ul>
  <li>She <em>is going to study</em> medicine. / Look at those clouds — it <em>is going to rain</em>.</li>
</ul>
<h3>3. Present Continuous for Future</h3>
<p>Fixed arrangements with time/place.</p>
<ul><li>We <em>are meeting</em> the director at 10 a.m. tomorrow.</li></ul>
<h3>4. Present Simple for Future</h3>
<p>Timetabled/scheduled events.</p>
<ul><li>The exam <em>starts</em> at 8 a.m. on Thursday.</li></ul>
<h3>5. Future Continuous (will be + -ing)</h3>
<p>Action in progress at a future time.</p>
<ul><li>At this time tomorrow, I <em>will be sitting</em> the Baccalaureate exam.</li></ul>
<h3>6. Future Perfect (will have + past participle)</h3>
<p>Action completed before a future time.</p>
<ul><li>By next June, she <em>will have finished</em> her studies.</li></ul>
<h2>Part B: Subjective Judgments and General Statements</h2>
<h3>Subjective Judgments (personal opinions)</h3>
<ul>
  <li><strong>I think / I believe / I feel / In my opinion…</strong></li>
  <li>It + linking verb: <em>It seems that… / It appears that…</em></li>
</ul>
<h3>General Statements (universal truths)</h3>
<ul>
  <li><strong>It is said that… / It is known that… / It is believed that…</strong></li>
  <li>Adverbs: <em>generally, usually, often, typically</em></li>
  <li>Scientists claim that… / Studies show that…</li>
</ul>`,
    examples: `<p><strong>Will:</strong> "I'll call you as soon as I arrive," she promised.</p>
<p><strong>Going to:</strong> The government <em>is going to build</em> a new hospital. Watch out! That car <em>is going to hit</em> the wall!</p>
<p><strong>Present continuous:</strong> They <em>are presenting</em> their project to the board next Thursday.</p>
<p><strong>Future perfect:</strong> By the time you arrive, I <em>will have prepared</em> everything.</p>
<p><strong>Subjective judgment:</strong> In my opinion, students <em>should have access</em> to better study materials. I <em>feel that</em> the system could be improved.</p>
<p><strong>General statement:</strong> It <em>is widely believed that</em> regular reading improves academic performance. Studies <em>show that</em> exercise boosts concentration.</p>`,
  },
  {
    title:
      "Leçon 5 (Unité 4) : Language corner – Verb patterns with the infinitive or the gerund",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 15,
    duration: 55,
    isPremium: false,
    summary:
      "Learn which verbs take the to-infinitive, which take the gerund, and which take both with a change in meaning (remember, forget, stop, try).",
    keyPoints: `To-infinitive verbs: want, decide, hope, agree, refuse, manage, expect, plan, afford, choose
Gerund (-ing) verbs: enjoy, avoid, finish, suggest, mind, admit, deny, risk, keep, miss, practise
"Remember/forget + to-inf" = obligation/future duty; "+ gerund" = past memory
"Stop + to-inf" = stop in order to do; "+ gerund" = stop an activity
"Try + to-inf" = attempt; "+ gerund" = experiment with something
Verb + object + to-inf: tell, ask, advise, want, force, encourage, remind`,
    content: `<h2>Verb Patterns with the Infinitive or the Gerund</h2>
<h3>1. Verbs + TO-INFINITIVE</h3>
<p><em>want, decide, plan, hope, agree, refuse, promise, expect, manage, afford, fail, tend, offer, need, learn, choose, seem, appear, pretend, claim</em></p>
<ul>
  <li>She <em>decided to leave</em> early. / He <em>refused to answer</em>. / They <em>managed to finish</em> on time.</li>
</ul>
<h3>2. Verbs + GERUND (-ing)</h3>
<p><em>enjoy, avoid, finish, suggest, mind, consider, keep, admit, deny, risk, imagine, practise, miss, give up, look forward to, be used to</em></p>
<ul>
  <li>I <em>enjoy reading</em> English novels. / She <em>avoids making</em> mistakes. / He <em>denied stealing</em> the money.</li>
</ul>
<h3>3. Verbs + EITHER (change of meaning)</h3>
<h4>Remember</h4>
<ul>
  <li>+ to-inf = future duty: <em>Remember to lock</em> the door.</li>
  <li>+ gerund = past memory: I <em>remember locking</em> it.</li>
</ul>
<h4>Forget</h4>
<ul>
  <li>+ to-inf = not do: She <em>forgot to submit</em> her assignment.</li>
  <li>+ gerund = past memory: I'll never <em>forget visiting</em> the Basilica.</li>
</ul>
<h4>Stop</h4>
<ul>
  <li>+ to-inf = stop in order to: He <em>stopped to buy</em> water. (purpose)</li>
  <li>+ gerund = stop doing: She <em>stopped talking</em> when teacher entered.</li>
</ul>
<h4>Try</h4>
<ul>
  <li>+ to-inf = attempt: I <em>tried to open</em> the door but failed.</li>
  <li>+ gerund = experiment: <em>Try adding</em> more salt — it might taste better.</li>
</ul>
<h3>4. Verb + object + to-infinitive</h3>
<p><em>want, ask, tell, advise, remind, force, allow, encourage, expect, persuade, help</em></p>
<ul><li>The teacher <em>told the students to revise</em>. / She <em>encouraged her friend to apply</em>.</li></ul>`,
    examples: `<p><strong>To-infinitive:</strong><br>
She <em>decided to apply</em> for a scholarship abroad.<br>
He <em>managed to pass</em> all his exams despite the difficulties.<br>
They <em>refused to accept</em> the unfair conditions.</p>
<p><strong>Gerund:</strong><br>
I <em>enjoy writing</em> stories in English.<br>
You should <em>avoid making</em> the same mistakes repeatedly.<br>
He <em>admitted copying</em> from his classmate.</p>
<p><strong>Remember:</strong><br>
Please <em>remember to bring</em> your exercise book tomorrow. (future duty)<br>
I clearly <em>remember writing</em> my name on the paper. (past action)</p>
<p><strong>Stop:</strong><br>
He <em>stopped to buy</em> a newspaper on his way home. (in order to buy)<br>
She <em>stopped worrying</em> once she had done her best.</p>
<p><strong>Verb + object + to-inf:</strong><br>
The coach <em>encouraged the players to believe</em> in themselves.<br>
My parents <em>want me to become</em> a doctor.</p>`,
  },
  {
    title: "Leçon 6 (Unité 4) : Writing skills – A for and against essay",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 16,
    duration: 55,
    isPremium: false,
    summary:
      "Learn to write a balanced for and against essay using formal language, clear structure, strong arguments, and effective linking devices.",
    keyPoints: `A for-and-against essay presents both sides of a topic objectively
Introduction: state the issue clearly; do NOT give your opinion yet
Body 1: arguments FOR + supporting examples and details
Body 2: arguments AGAINST + supporting examples and details
Conclusion: balanced summary + your overall view or recommendation
Formal, impersonal tone: avoid "I think" in the body; use impersonal structures
No contractions; use formal vocabulary and academic linking words
Linking words: Furthermore / Moreover / However / On the other hand / Consequently`,
    content: `<h2>How to Write a For and Against Essay</h2>
<p>A <strong>for and against essay</strong> presents <strong>both sides</strong> of a topic before reaching a balanced conclusion. It is objective and impersonal.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Formal, impersonal tone (avoid "I think" in the main body)</li>
  <li>Arguments on BOTH sides</li>
  <li>Topic sentences and linking devices</li>
  <li>No contractions; academic vocabulary</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Introduction:</strong> State the topic clearly. Do NOT give your opinion yet.<br>
<strong>Body 1 — Arguments FOR:</strong> 2–3 arguments with details and examples.<br>
<strong>Body 2 — Arguments AGAINST:</strong> 2–3 counter-arguments with details.<br>
<strong>Conclusion:</strong> Summarise both sides + balanced view or recommendation.</p>
<h3>3. Linking Devices</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Adding (for)</td><td>Furthermore, / Moreover, / In addition, / Not only that…</td></tr>
  <tr><td>Contrasting (against)</td><td>However, / On the other hand, / Nevertheless, / Despite this,</td></tr>
  <tr><td>Examples</td><td>For example, / For instance, / To illustrate,</td></tr>
  <tr><td>Concluding</td><td>On the whole, / All things considered, / In conclusion, / To sum up,</td></tr>
  <tr><td>Cause and effect</td><td>As a result, / Therefore, / Consequently,</td></tr>
</table>`,
    examples: `<p><strong>Topic: Should mobile phones be banned in schools?</strong></p>
<p><strong>Introduction:</strong><br>
The question of whether mobile phones should be permitted in schools has sparked considerable debate in recent years. While some argue that they offer educational benefits, others believe they are a major distraction. Both sides deserve careful consideration.</p>
<p><strong>Body 1 (FOR — allowing phones):</strong><br>
On the one hand, mobile phones can be valuable educational tools. They give students instant access to information, dictionaries, and educational apps. Furthermore, they allow students to contact parents in emergencies. For instance, in schools that introduced technology programmes, academic performance reportedly improved.</p>
<p><strong>Body 2 (AGAINST):</strong><br>
On the other hand, mobile phones seriously disrupt learning. Students who use phones during lessons miss important information. Moreover, social media becomes addictive, reducing concentration. Cyberbullying is another concern linked to unrestricted phone use among young people.</p>
<p><strong>Conclusion:</strong><br>
On the whole, while mobile phones have educational benefits, their potential to distract outweighs these advantages without rules. The most sensible approach would be limited, supervised use for educational purposes only, with clear rules and consequences.</p>`,
  },
  // ── Unité 5 ────────────────────────────────────────────────────────────────
  {
    title:
      "Leçon 7 (Unité 5) : Language function – Expressing conditions & Making comparisons",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 17,
    duration: 55,
    isPremium: false,
    summary:
      "Master the four types of conditional sentences (0, 1, 2, 3) and advanced comparison structures including double comparatives and gradual change.",
    keyPoints: `Type 0: present simple + present simple → general truths
Type 1: if + present simple, will + infinitive → real/possible future condition
Type 2: if + past simple, would + infinitive → hypothetical present/future
Type 3: if + past perfect, would have + past participle → unreal past (regret)
Use "were" (not "was") for all persons in Type 2 formal English
Unless = if not / Provided that / As long as = conditional expressions
Double comparative: "the + comparative, the + comparative"
Progressive change: more and more + adjective / comparative + and + comparative`,
    content: `<h2>Part A: Conditional Sentences</h2>
<h3>Type 0 — General truths</h3>
<p>Both clauses: <strong>present simple</strong></p>
<ul><li>If you heat water to 100°C, it <em>boils</em>.</li></ul>
<h3>Type 1 — Real/possible (future)</h3>
<p>If + <strong>present simple</strong> → <strong>will + infinitive</strong></p>
<ul><li>If she <em>studies</em> hard, she <em>will pass</em> the exam.</li></ul>
<h3>Type 2 — Hypothetical (present/future)</h3>
<p>If + <strong>past simple</strong> → <strong>would + infinitive</strong></p>
<ul>
  <li>If I <em>had</em> more time, I <em>would travel</em> the world.</li>
  <li>Note: "were" for all persons in formal English: If I <em>were</em> you, I would accept.</li>
</ul>
<h3>Type 3 — Unreal past (regret)</h3>
<p>If + <strong>past perfect</strong> → <strong>would have + past participle</strong></p>
<ul><li>If he <em>had trained</em> harder, he <em>would have won</em> the race.</li></ul>
<h3>Other conditional words</h3>
<ul>
  <li><em>Unless</em> = if not: Unless you study, you will fail.</li>
  <li><em>Provided that / As long as</em>: Provided that you pay on time, you can borrow the money.</li>
</ul>
<h2>Part B: Advanced Comparisons</h2>
<h3>Double Comparatives</h3>
<p>Structure: <em>the + comparative, the + comparative</em></p>
<ul><li><em>The more you read, the better</em> your English becomes.</li></ul>
<h3>Progressive change</h3>
<ul><li>The city is becoming <em>more and more crowded</em>. / His results are getting <em>better and better</em>.</li></ul>`,
    examples: `<p><strong>Type 0:</strong> If you mix red and blue paint, you <em>get</em> purple.</p>
<p><strong>Type 1:</strong> If you <em>revise</em> all your lessons tonight, you <em>will do</em> well tomorrow.</p>
<p><strong>Type 2:</strong> If I <em>were</em> the head of state, I <em>would invest</em> more in education.</p>
<p><strong>Type 3:</strong> If she <em>had applied</em> earlier, she <em>would have received</em> the funding.</p>
<p><strong>Unless:</strong> You will not improve unless you practise speaking every day.</p>
<p><strong>Double comparative:</strong> The more students read in English, the more confident they become.</p>
<p><strong>Progressive:</strong> As the exam approaches, students are becoming more and more nervous.</p>`,
  },
  {
    title:
      "Leçon 8 (Unité 5) : Language corner – Relative clauses & Impersonal passive forms",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 18,
    duration: 55,
    isPremium: false,
    summary:
      "Master defining and non-defining relative clauses, relative pronouns (who, which, that, whose, where), and impersonal passive structures for formal writing.",
    keyPoints: `Defining relative clause: essential info, no commas, "that" is possible
Non-defining relative clause: extra info, USE commas, "that" is NOT used
"Who/whom" = people / "which" = things / "that" = people or things (defining only)
"Whose" = possession / "where" = place / "when" = time
Impersonal passive structure 1: It + is/was + past participle + that-clause
Impersonal passive structure 2: Subject + is/was + past participle + to-infinitive
Common verbs: said, believed, thought, reported, claimed, known, considered, expected
Use impersonal passive to give facts without naming the source (formal style)`,
    content: `<h2>Part A: Relative Clauses</h2>
<h3>1. Defining Relative Clauses</h3>
<p>Give <strong>essential</strong> information. No commas. "That" is possible.</p>
<ul>
  <li>The student <em>who won the prize</em> is from our school.</li>
  <li>This is the book <em>that changed my life</em>.</li>
  <li>The house <em>where she was born</em> is now a museum.</li>
</ul>
<h3>2. Non-Defining Relative Clauses</h3>
<p>Give <strong>extra</strong> information. USE commas. "That" is NOT used.</p>
<ul>
  <li>My teacher, <em>who has 20 years of experience</em>, is retiring.</li>
  <li>The Eiffel Tower, <em>which is in Paris</em>, attracts millions of tourists.</li>
</ul>
<h3>3. Relative Pronouns</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Pronoun</th><th>Refers to</th><th>Use</th></tr>
  <tr><td>who/whom</td><td>people</td><td>who = subject; whom = object (formal)</td></tr>
  <tr><td>which</td><td>things/animals</td><td>defining and non-defining</td></tr>
  <tr><td>that</td><td>people/things</td><td>defining clauses only</td></tr>
  <tr><td>whose</td><td>people/things</td><td>possession</td></tr>
  <tr><td>where</td><td>places</td><td>replaces "in which"</td></tr>
  <tr><td>when</td><td>time</td><td>replaces "at which"</td></tr>
</table>
<h2>Part B: Impersonal Passive Forms</h2>
<h3>Structure 1: It + passive + that-clause</h3>
<p><em>It is said / believed / thought / reported / claimed that…</em></p>
<ul><li><em>It is believed that</em> the ruins date back over 2,000 years.</li></ul>
<h3>Structure 2: Subject + passive + to-infinitive</h3>
<ul>
  <li>The ruins <em>are believed to date</em> back over 2,000 years.</li>
  <li>The suspect <em>is said to have fled</em> the country.</li>
</ul>`,
    examples: `<p><strong>Defining:</strong><br>
The candidate <em>who scores highest</em> will be awarded a full scholarship.<br>
This is the document <em>that was submitted</em> to the ministry last year.</p>
<p><strong>Non-defining:</strong><br>
Professor Adjoumani, <em>who has published over 40 papers</em>, will chair the conference.<br>
The new school library, <em>which was funded by an international organisation</em>, opens next month.</p>
<p><strong>"Whose":</strong><br>
The researcher <em>whose study revealed</em> the cure has been nominated for an international prize.</p>
<p><strong>Impersonal passive — Structure 1:</strong><br>
<em>It is widely believed that</em> regular exercise reduces the risk of chronic disease.<br>
<em>It has been confirmed that</em> the results will be published next week.</p>
<p><strong>Impersonal passive — Structure 2:</strong><br>
The economy <em>is reported to be growing</em> at 6% per year.<br>
The accused <em>is said to have escaped</em> through a back door.</p>`,
  },
  {
    title: "Leçon 9 (Unité 5) : Writing skills – A presentation",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 19,
    duration: 50,
    isPremium: false,
    summary:
      "Learn how to structure and write an effective presentation: engaging opening, signposting language, clear body paragraphs, and a strong conclusion.",
    keyPoints: `A presentation is addressed directly to an audience (use "you", "we", "let us")
Opening: greet audience, introduce topic, outline structure, engage with a hook
Body: 2-4 clear points supported by examples, statistics, or illustrations
Use signposting language to guide the audience through each section
Conclusion: signal end, recap key points, end with call to action or memorable line
Always thank the audience and invite questions at the end
Tone: formal or semi-formal depending on context; avoid slang
Rhetorical questions engage the audience: "Have you ever wondered why...?"`,
    content: `<h2>How to Write and Deliver a Presentation</h2>
<p>A <strong>presentation</strong> is a formal speech delivered to an audience on a specific topic.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Addressed directly to the audience (use "you", "we", "let us")</li>
  <li>Clear structure: introduction, body, conclusion</li>
  <li>Engaging opening; rhetorical questions; statistics</li>
  <li>Short, clear sentences</li>
  <li>Strong, memorable conclusion</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Opening:</strong> Greet audience → introduce yourself → state topic → outline structure → hook<br>
<strong>Body:</strong> 2–4 clear points + signposting + examples/stats<br>
<strong>Conclusion:</strong> Signal end → recap → call to action → thank audience → invite questions</p>
<h3>3. Signposting Language</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Introducing topic</td><td>Today I would like to discuss… / The purpose of my presentation is to…</td></tr>
  <tr><td>Moving on</td><td>Let us now turn to… / Moving on to… / My next point is…</td></tr>
  <tr><td>Giving examples</td><td>For example, / To illustrate, / A good example of this is…</td></tr>
  <tr><td>Concluding</td><td>In conclusion, / To sum up, / I would like to end by…</td></tr>
</table>`,
    examples: `<p><strong>Opening:</strong><br>
Good morning, ladies and gentlemen. My name is Sébastien Kouamé. Today, I would like to talk to you about the impact of social media on students' academic performance.</p>
<p>Let me begin with a striking fact: the average teenager spends over four hours per day on social media. Have you ever wondered what this means for their studies?</p>
<p>I will cover three points: first, the educational benefits; second, the negative effects on concentration; and finally, practical recommendations.</p>
<p><strong>Signposting (body):</strong><br>
Let us now turn to my first point: the potential benefits. To illustrate, platforms like YouTube allow students to access tutorials at any time...</p>
<p>Moving on to my second point — the negative effects. Research shows students who spend more than three hours daily on social media score lower in examinations...</p>
<p><strong>Conclusion:</strong><br>
In conclusion, social media is a double-edged sword. I would strongly encourage every student to set clear boundaries for their screen time. Thank you very much for your attention. I am happy to take any questions.</p>`,
  },
  // ── Unité 6 ────────────────────────────────────────────────────────────────
  {
    title: `Leçon 1 (Unité 6) : Language function – Emphasizing with "not only ... but also"`,
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 20,
    duration: 50,
    isPremium: false,
    summary:
      `Master the emphatic structure "not only ... but also", its inverted form, and related structures: both/and, neither/nor, cleft sentences.`,
    keyPoints: `"Not only ... but also" emphasizes that two things are true
When "not only" starts the sentence, use inverted word order (auxiliary + subject)
Inverted form: Not only did/is/has/was + subject + verb
"Both ... and" joins two positive things equally
"Neither ... nor" joins two negative things
"Either ... or" presents a choice between two things
Cleft sentences "It is/was ... that/who" emphasize one element of a sentence
Used in formal/written English for rhetorical and emphatic effect`,
    content: `<h2>Emphasizing with "Not only … but also"</h2>
<p>The structure <strong>not only … but also</strong> emphasizes that two things are true, with the second point adding extra weight to the first.</p>
<h3>1. Basic Structure</h3>
<p><strong>Not only + [first point] + but also + [second point]</strong></p>
<ul>
  <li>She is <em>not only intelligent but also</em> very hardworking.</li>
  <li>This plan will <em>not only save time but also</em> reduce costs.</li>
</ul>
<h3>2. Inverted Word Order (Formal)</h3>
<p>When <em>not only</em> starts the sentence, subject and auxiliary verb are <strong>inverted</strong>.</p>
<ul>
  <li><em>Not only did she pass</em> the exam, but she also achieved the highest score.</li>
  <li><em>Not only is he</em> a talented musician, but he is also a gifted writer.</li>
  <li><em>Not only have they completed</em> the project, but they have also exceeded all expectations.</li>
</ul>
<h3>3. Related Emphatic Structures</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Structure</th><th>Example</th></tr>
  <tr><td>Both … and</td><td>Both the teacher and the students were surprised.</td></tr>
  <tr><td>Neither … nor</td><td>Neither the president nor the minister attended.</td></tr>
  <tr><td>Either … or</td><td>Either you study now or you will regret it.</td></tr>
</table>
<h3>4. Cleft Sentences for Emphasis</h3>
<p><em>It is/was … that/who</em> highlights a specific part of a sentence.</p>
<ul>
  <li><em>It was the teacher who</em> noticed the error first.</li>
  <li><em>It is dedication that</em> separates good students from great ones.</li>
</ul>`,
    examples: `<p><strong>Basic (mid-sentence):</strong><br>
Regular exercise is <em>not only good for the body but also</em> beneficial for mental health.<br>
The new library will <em>not only provide books but also</em> offer free internet access to students.</p>
<p><strong>Emphatic (inverted):</strong><br>
<em>Not only did the candidate win</em> the election, but she also broke the record for the most votes ever recorded.<br>
<em>Not only is water essential</em> for survival, but it also regulates body temperature.</p>
<p><strong>Related structures:</strong><br>
<em>Both the government and</em> the private sector must invest in education.<br>
<em>Neither the student nor</em> his parents had been informed of the examination change.<br>
<em>It is through consistent effort that</em> great results are achieved, not through luck alone.</p>`,
  },
  {
    title: "Leçon 1 (Unité 6) : Language corner – Negative adverbs",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 21,
    duration: 50,
    isPremium: false,
    summary:
      "Learn how negative adverbs (never, rarely, hardly, scarcely, no sooner) trigger subject-auxiliary inversion for emphasis in formal English.",
    keyPoints: `Negative adverbs (never, rarely, hardly, scarcely) cause subject-auxiliary inversion when at sentence start
Inversion structure: Negative adverb + auxiliary verb + subject + main verb
"Never had I seen..." / "Rarely does she..." / "Scarcely had he arrived when..."
"No sooner ... than" = immediately after (past perfect + than)
"Hardly/Scarcely ... when" = almost immediately (past perfect + when)
"Under no circumstances" / "On no account" / "In no way" = absolute negative (inversion required)
Inversion is used in formal/written English for dramatic or emphatic effect`,
    content: `<h2>Negative Adverbs</h2>
<p><strong>Negative adverbs</strong> carry a negative meaning. When placed at the <strong>beginning of a sentence</strong>, the subject and auxiliary verb are <strong>inverted</strong>, creating a formal, emphatic effect.</p>
<h3>1. Common Negative Adverbs and Phrases</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Adverb/Phrase</th><th>Meaning</th></tr>
  <tr><td>Never</td><td>at no time</td></tr>
  <tr><td>Rarely / Seldom</td><td>almost never</td></tr>
  <tr><td>Hardly / Scarcely / Barely</td><td>almost not</td></tr>
  <tr><td>No sooner … than</td><td>immediately after</td></tr>
  <tr><td>Not until / Not till</td><td>only after a specific time</td></tr>
  <tr><td>Under no circumstances</td><td>absolutely never</td></tr>
  <tr><td>On no account</td><td>for no reason / absolutely not</td></tr>
  <tr><td>In no way</td><td>not at all</td></tr>
</table>
<h3>2. Inversion Rule</h3>
<p><strong>Negative adverb + auxiliary + subject + main verb</strong></p>
<ul>
  <li>Never had she seen such a beautiful sunset.</li>
  <li>Rarely does he speak in public.</li>
  <li>Scarcely had I arrived when it started raining.</li>
</ul>
<h3>3. "No sooner … than" and "Hardly/Scarcely … when"</h3>
<ul>
  <li><em>No sooner had</em> she left <em>than</em> the phone rang.</li>
  <li><em>Hardly had</em> he sat down <em>when</em> the alarm went off.</li>
  <li>Note: use past perfect + when/than.</li>
</ul>
<h3>4. Absolute Prohibitions</h3>
<ul>
  <li><em>Under no circumstances should</em> you leave without permission.</li>
  <li><em>On no account must</em> students use phones during the test.</li>
  <li><em>In no way does</em> this reflect the views of the committee.</li>
</ul>`,
    examples: `<p><strong>Never (inversion):</strong><br>
<em>Never have I encountered</em> such dedication in a young student.<br>
<em>Never before had</em> the school produced so many scholarship winners in a single year.</p>
<p><strong>Rarely / Seldom:</strong><br>
<em>Rarely does</em> a student of his age demonstrate such maturity and intellectual depth.</p>
<p><strong>Hardly … when:</strong><br>
<em>Hardly had</em> the minister finished his speech <em>when</em> protesters began chanting outside.</p>
<p><strong>No sooner … than:</strong><br>
<em>No sooner had</em> the new policy been announced <em>than</em> criticism began pouring in from all sides.</p>
<p><strong>Under no circumstances / On no account:</strong><br>
<em>Under no circumstances should</em> candidates communicate with one another during the examination.<br>
<em>On no account must</em> you submit work that has not been checked for errors.</p>`,
  },
  {
    title: "Leçon 1 (Unité 6) : Writing skills – An argumentative essay",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 22,
    duration: 55,
    isPremium: false,
    summary:
      "Learn to write a persuasive argumentative essay: clear thesis, logical arguments, counter-argument refutation, and a strong conclusion.",
    keyPoints: `An argumentative essay takes a CLEAR POSITION and defends it throughout
Introduction includes a hook, background context, and a clear thesis statement
Body para 1 & 2: your strongest arguments + evidence and examples
Body para 3: acknowledge the counter-argument, then refute it confidently
Conclusion: restate thesis in new words + call to action or recommendation
Persuasive tone: logical, confident, formal; no contractions
Use: "This essay argues that..." / "Research shows..." / "While it may be argued..."
Differs from for-and-against: you take sides; opinion is stated from the start`,
    content: `<h2>How to Write an Argumentative Essay</h2>
<p>An <strong>argumentative essay</strong> takes a clear <strong>position</strong> on an issue and defends it with logical arguments. Unlike a for-and-against essay, it has a <strong>clear, sustained opinion</strong> throughout.</p>
<h3>1. Key Differences</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>For and Against</th><th>Argumentative</th></tr>
  <tr><td>Balanced — both sides equally</td><td>Takes a clear position</td></tr>
  <tr><td>Opinion only in conclusion</td><td>Position stated from introduction</td></tr>
  <tr><td>Objective tone</td><td>Persuasive, logical, confident tone</td></tr>
</table>
<h3>2. Structure</h3>
<p><strong>Introduction:</strong> Hook (fact, statistic, or question) + background + thesis: "This essay argues that…"</p>
<p><strong>Body Para 1 — Strongest argument:</strong> Claim + evidence/examples + link to thesis.</p>
<p><strong>Body Para 2 — Second argument:</strong> Additional evidence.</p>
<p><strong>Body Para 3 — Counter-argument + refutation:</strong> Acknowledge opposing view, then refute strongly: "While some argue that… / Although it is true that…"</p>
<p><strong>Conclusion:</strong> Restate thesis in different words + summarise + recommendation or call to action.</p>
<h3>3. Useful Language</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Stating position</td><td>This essay argues that… / I strongly believe that…</td></tr>
  <tr><td>Supporting</td><td>Research shows that… / Evidence suggests… / A compelling example is…</td></tr>
  <tr><td>Counter-argument</td><td>While it may be argued that… / Admittedly, … However,…</td></tr>
  <tr><td>Concluding</td><td>In conclusion, / Therefore, I urge… / It is clear that…</td></tr>
</table>`,
    examples: `<p><strong>Topic: Education should be free at all levels.</strong></p>
<p><strong>Introduction:</strong><br>
Over 258 million children worldwide are out of school. This essay firmly argues that free education at all levels is not only a fundamental human right but also an economic necessity for any developing nation.</p>
<p><strong>Body paragraph 1:</strong><br>
First and foremost, free education eliminates financial barriers. In Côte d'Ivoire, many gifted students abandon their studies due to high fees. Research shows that nations with free education produce more graduates, driving economic growth and reducing poverty.</p>
<p><strong>Counter-argument + refutation:</strong><br>
Admittedly, critics argue that free education is an unsustainable burden on public finances. While this is valid, it ignores the long-term economic returns of an educated workforce. The initial cost is vastly outweighed by long-term benefits.</p>
<p><strong>Conclusion:</strong><br>
In conclusion, free education is not a luxury — it is a foundation for social justice. Governments must recognise education as their most powerful investment and work to eliminate all financial barriers to learning.</p>`,
  },
  // ── Unité 7 ────────────────────────────────────────────────────────────────
  {
    title: "Leçon 2 (Unité 7) : Language function – Giving orders and requests",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 23,
    duration: 50,
    isPremium: false,
    summary:
      "Master the full spectrum of giving orders and requests: direct imperatives, polite modal forms, and reported orders with the correct infinitive structure.",
    keyPoints: `The imperative (base verb) gives direct orders: "Sit down / Don't touch that"
"Do + imperative" adds emphasis or politeness: "Do come in!"
Polite requests use modals: Can you / Could you / Would you / Will you
"Would you mind + -ing?" is very polite; answer "No" = you agree
Reported orders: tell/order/command + object + to-infinitive
Reported requests: ask/beg/request + object + to-infinitive
Reported negative: warn/advise/forbid + object + NOT to-infinitive
"Would you mind + -ing?" expects "No, not at all" (agreement) or "Yes, I would" (refusal)`,
    content: `<h2>Giving Orders and Requests</h2>
<p>Orders and requests range from direct commands to polite, indirect forms. Choosing the right form depends on context and formality.</p>
<h3>1. Direct Orders (Imperative)</h3>
<ul>
  <li>Positive: <em>Sit down. / Open your books. / Listen carefully.</em></li>
  <li>Negative: <em>Don't touch that. / Do not leave without permission.</em></li>
  <li>With "do" for emphasis: <em>Do come in! / Do be quiet!</em></li>
</ul>
<h3>2. Polite Requests</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Structure</th><th>Formality</th><th>Example</th></tr>
  <tr><td>Can you…?</td><td>Informal</td><td>Can you close the window?</td></tr>
  <tr><td>Could you…?</td><td>Neutral/polite</td><td>Could you pass me the file?</td></tr>
  <tr><td>Would you…?</td><td>Formal and polite</td><td>Would you mind signing this?</td></tr>
  <tr><td>Would you mind + -ing?</td><td>Very polite</td><td>Would you mind waiting a moment?</td></tr>
  <tr><td>I would be grateful if…</td><td>Very formal/written</td><td>I would be grateful if you could send the report.</td></tr>
</table>
<h3>3. Reported Orders and Requests</h3>
<ul>
  <li><strong>Tell, order, command + object + to-inf:</strong> The teacher <em>told the students to sit</em> down.</li>
  <li><strong>Ask, request, beg + object + to-inf:</strong> She <em>asked him to wait</em> outside.</li>
  <li><strong>Warn, advise + object + not to-inf:</strong> The doctor <em>warned him not to smoke</em>.</li>
  <li><strong>Forbid + object + to-inf:</strong> The director <em>forbade anyone to enter</em>.</li>
</ul>
<h3>4. Permission and Prohibition</h3>
<ul>
  <li>Permission: <em>You may / can / are allowed to + base verb</em></li>
  <li>Prohibition: <em>You must not / cannot / are not allowed to + base verb</em></li>
</ul>`,
    examples: `<p><strong>Direct orders:</strong><br>
<em>Open</em> your exam booklets when told to do so. <em>Do not</em> write anything until the invigilator signals.</p>
<p><strong>Polite requests (escalating formality):</strong><br>
"<em>Can you</em> lend me your pen?" (informal)<br>
"<em>Could you please</em> check this paragraph?" (polite)<br>
"<em>Would you mind</em> moving your bag?" (very polite)<br>
"<em>I would be grateful if you could</em> submit your report by Friday." (formal)</p>
<p><strong>Reported orders:</strong><br>
The examiner <em>told all candidates to switch off</em> their phones.<br>
She <em>asked her teacher not to mark</em> her late.<br>
Parents <em>were reminded to collect</em> their children by 5 p.m.</p>
<p><strong>"Would you mind":</strong><br>
"Would you mind closing the door?" — "No, not at all." ✅ (agreement)<br>
"Would you mind helping me?" — "Yes, I would, I am rather busy." ❌ (refusal)</p>`,
  },
  {
    title: "Leçon 2 (Unité 7) : Language corner – Prepositions & Reported speech",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 24,
    duration: 55,
    isPremium: false,
    summary:
      "Master prepositions of time and place, common fixed expressions, and the full rules of reported speech including tense backshift and question reporting.",
    keyPoints: `Prepositions of time: at (specific times) / on (days, dates) / in (months, years, seasons)
"For" = duration / "since" = starting point to now / "by" = deadline
Prepositions of place: at (a point) / in (inside) / on (surface)
Fixed expressions: on time, in time, on purpose, by mistake, in spite of
Reported speech: tenses shift back one step (present → past / past → past perfect)
Time expressions change: now → then / today → that day / tomorrow → the next day
Pronouns change to match the new speaker's perspective
Reported questions: use if/whether (yes/no) or wh-word + normal word order (no inversion)`,
    content: `<h2>Part A: Prepositions</h2>
<h3>1. Prepositions of Time</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Preposition</th><th>Use</th><th>Example</th></tr>
  <tr><td>at</td><td>specific times; holidays</td><td>at 8 a.m. / at Christmas</td></tr>
  <tr><td>on</td><td>days and dates</td><td>on Monday / on 15th April</td></tr>
  <tr><td>in</td><td>months, years, seasons</td><td>in April / in 2026 / in winter</td></tr>
  <tr><td>for</td><td>duration</td><td>for three hours</td></tr>
  <tr><td>since</td><td>starting point up to now</td><td>since 2020</td></tr>
  <tr><td>by</td><td>deadline (not later than)</td><td>by Friday / by 6 p.m.</td></tr>
  <tr><td>during</td><td>within a period</td><td>during the holidays</td></tr>
  <tr><td>until/till</td><td>up to a point in time</td><td>until midnight</td></tr>
</table>
<h3>2. Prepositions of Place</h3>
<ul>
  <li><strong>at</strong> = a point: at the door / at school</li>
  <li><strong>in</strong> = inside: in the room / in Abidjan</li>
  <li><strong>on</strong> = on a surface: on the table / on the wall</li>
  <li><strong>to</strong> = movement towards: go to school</li>
</ul>
<h3>3. Fixed Prepositional Phrases</h3>
<p><em>by mistake, on purpose, in a hurry, on time, in time, in spite of, on behalf of, according to, instead of</em></p>
<h2>Part B: Reported Speech</h2>
<h3>Tense Backshift</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Direct speech</th><th>Reported speech</th></tr>
  <tr><td>"I study"</td><td>said he studied</td></tr>
  <tr><td>"I am working"</td><td>said she was working</td></tr>
  <tr><td>"I have finished"</td><td>said he had finished</td></tr>
  <tr><td>"I went"</td><td>said she had gone</td></tr>
  <tr><td>"I will help"</td><td>said he would help</td></tr>
  <tr><td>"I can come"</td><td>said she could come</td></tr>
  <tr><td>"I must leave"</td><td>said he had to leave</td></tr>
</table>
<h3>Time/Place Changes</h3>
<ul>
  <li>now → then / today → that day / tomorrow → the next day / here → there</li>
</ul>
<h3>Reporting Questions</h3>
<ul>
  <li>Yes/No: <em>ask + if/whether</em> → She asked <em>if I was ready</em>.</li>
  <li>Wh-: <em>ask + wh-word + subject + verb</em> → He asked <em>where I lived</em>.</li>
</ul>`,
    examples: `<p><strong>Prepositions of time:</strong><br>
The ceremony begins <em>at</em> 10 a.m. <em>on</em> Saturday, <em>in</em> May.<br>
She has been studying <em>since</em> 7 a.m. and will continue <em>until</em> midday.<br>
Please submit your assignment <em>by</em> Friday at the latest.</p>
<p><strong>Fixed phrases:</strong><br>
He arrived <em>on time</em>. <em>In spite of</em> the difficulty, she passed.</p>
<p><strong>Reported speech — statements:</strong><br>
Direct: "I am preparing for the Baccalaureate," she said.<br>
Reported: She said she <em>was preparing</em> for the Baccalaureate.</p>
<p>Direct: "I have already submitted my project," he told the teacher.<br>
Reported: He told the teacher he <em>had already submitted</em> his project.</p>
<p><strong>Reported questions:</strong><br>
Direct: "Do you understand the lesson?"<br>
Reported: The teacher asked <em>whether I understood</em> the lesson.</p>
<p>Direct: "Where did you go after school?"<br>
Reported: She asked <em>where I had gone</em> after school.</p>`,
  },
  {
    title: "Leçon 2 (Unité 7) : Writing skills – An opinion essay",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 25,
    duration: 55,
    isPremium: false,
    summary:
      "Learn to write a well-structured opinion essay: stating your position clearly, developing reasons with evidence, acknowledging other views, and concluding persuasively.",
    keyPoints: `An opinion essay states the writer's clear personal view from the introduction
Introduction: hook + background + clear statement of opinion ("In my view...")
Body paragraphs: each focuses on ONE reason/argument + evidence + example
Optional concession paragraph: briefly acknowledge opposite view, then return to your position
Conclusion: restate opinion in new words + leave a strong closing thought
Formal and persuasive tone; no contractions; structured topic sentences
Use emphatic language: clearly, undoubtedly, there is no doubt that
Use hedging where appropriate: it seems, may, appear, tend to`,
    content: `<h2>How to Write an Opinion Essay</h2>
<p>An <strong>opinion essay</strong> presents the writer's personal viewpoint on a controversial topic. The goal is to persuade the reader using well-structured arguments and formal language.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Writer's opinion clearly stated from the beginning</li>
  <li>Formal, persuasive tone throughout</li>
  <li>Uses hedging (may, might, seems) and emphatic language (clearly, undoubtedly)</li>
  <li>No contractions; structured paragraphs with topic sentences</li>
  <li>Ends with a strong conclusion reaffirming the position</li>
</ul>
<h3>2. Structure</h3>
<p><strong>Introduction:</strong> Hook → state your opinion: <em>"In my view…" / "I firmly believe that…"</em></p>
<p><strong>Body Para 1:</strong> First reason + explanation + example.</p>
<p><strong>Body Para 2:</strong> Second reason + development.</p>
<p><strong>Body Para 3 (Optional — Concession):</strong> <em>"Admittedly, some argue that…"</em> — then return to your position.</p>
<p><strong>Conclusion:</strong> Restate opinion in new words + summarise + thought-provoking final statement.</p>
<h3>3. Useful Language</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Stating opinion</td><td>In my view, / I am convinced that… / Personally, I believe…</td></tr>
  <tr><td>Adding reasons</td><td>First of all, / Furthermore, / What is more,</td></tr>
  <tr><td>Concession</td><td>Admittedly, / It is true that… / Although…</td></tr>
  <tr><td>Emphasising</td><td>Clearly, / Undoubtedly, / There is no doubt that…</td></tr>
  <tr><td>Concluding</td><td>In conclusion, / Ultimately, / All in all,</td></tr>
</table>`,
    examples: `<p><strong>Topic: Young people today are too dependent on technology.</strong></p>
<p><strong>Introduction:</strong><br>
Have you ever seen a teenager look up from their phone long enough to have a meaningful conversation? In my view, the over-reliance of young people on technology is a serious problem that undermines their social skills, creativity, and independence.</p>
<p><strong>Body para 1:</strong><br>
First of all, excessive technology use significantly damages young people's ability to communicate face to face. Studies show that those spending more than four hours a day on screens struggle with eye contact and empathy.</p>
<p><strong>Concession:</strong><br>
Admittedly, technology offers remarkable learning opportunities. However, access to information is only beneficial when young people develop the discipline to use it wisely — a skill clearly lacking among many today.</p>
<p><strong>Conclusion:</strong><br>
In conclusion, while technology is a powerful tool, it must not become a crutch. I firmly believe young people need digital discipline from an early age. Ultimately, the measure of a generation is not how many apps it uses, but how well it thinks, creates, and connects.</p>`,
  },
  // ── Unité 8 ────────────────────────────────────────────────────────────────
  {
    title: "Leçon 3 (Unité 8) : Language function – Verb patterns",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 26,
    duration: 55,
    isPremium: false,
    summary:
      "Master key verb patterns in English: verb + that-clause, verb + wh-clause, verb + to-infinitive, verb + gerund, and impersonal constructions.",
    keyPoints: `Verb + that-clause: say/think/believe/know/feel/admit/claim + (that) + subject + verb
"That" is optional in informal English but required in formal writing
Verb + wh-clause (embedded questions): use statement word order (NOT question order)
"I don't know where she is" NOT "I don't know where is she"
Verb + to-infinitive: decide, seem, appear, hope, manage, refuse, expect
Verb + gerund (-ing): enjoy, avoid, admit, deny, finish, keep, risk, suggest
Verb + object + complement: consider (him talented) / call (it a success) / make (them work)
Impersonal constructions: "It seems that..." / "It is important that..." / "It was reported that..."`,
    content: `<h2>Referring to What Follows a Verb Using Verb Patterns</h2>
<p>In English, many verbs are followed by a specific complement — a <strong>that-clause</strong>, a <strong>wh-clause</strong>, a <strong>to-infinitive</strong>, or a <strong>gerund</strong>.</p>
<h3>1. Verb + That-Clause</h3>
<p>Common verbs: <em>say, think, believe, know, feel, hope, expect, suggest, admit, claim, confirm, deny, realise, understand, agree, decide</em></p>
<ul>
  <li>She <em>believes (that) education</em> is the key to success.</li>
  <li>He <em>admitted (that) he had made</em> a mistake.</li>
  <li>Scientists <em>confirm that climate change</em> is accelerating.</li>
</ul>
<h3>2. Verb + Wh-Clause (Embedded Questions)</h3>
<p>Use <em>wh-word + subject + verb</em> (NOT question word order).</p>
<p>Common verbs: <em>know, wonder, ask, tell, show, explain, decide, understand, forget, remember</em></p>
<ul>
  <li>I don't know <em>where she has gone</em>. (NOT: where has she gone)</li>
  <li>Could you explain <em>how this works</em>?</li>
</ul>
<h3>3. Verb + to-Infinitive</h3>
<ul>
  <li>She <em>decided to apply</em> for the position.</li>
  <li>They <em>appear to have completed</em> the project early.</li>
</ul>
<h3>4. Verb + -ing (Gerund)</h3>
<ul>
  <li>She <em>enjoys writing</em> poetry. / He <em>avoids making</em> eye contact.</li>
</ul>
<h3>5. Verb + Object + Complement</h3>
<ul>
  <li>Object + adjective: They <em>consider him talented</em>.</li>
  <li>Object + noun: She <em>called it a masterpiece</em>.</li>
  <li>Object + bare infinitive: She <em>made the students rewrite</em> the essay.</li>
</ul>
<h3>6. Impersonal Constructions</h3>
<ul>
  <li><em>It seems that</em> the situation is improving.</li>
  <li><em>It is important that</em> students revise regularly.</li>
  <li><em>It was reported that</em> the results were outstanding.</li>
</ul>`,
    examples: `<p><strong>Verb + that-clause:</strong><br>
The committee <em>agreed that</em> the new curriculum was beneficial to all students.<br>
Research <em>confirms that</em> reading regularly improves vocabulary and comprehension.</p>
<p><strong>Verb + wh-clause:</strong><br>
Many students do not <em>understand how</em> the grading system works.<br>
Could you <em>explain what</em> is expected of us in the final examination?</p>
<p><strong>Verb + object + complement:</strong><br>
The judges <em>declared her the winner</em> of the national essay competition.<br>
The school director <em>made all students attend</em> the compulsory orientation session.</p>
<p><strong>Impersonal constructions:</strong><br>
<em>It is widely believed that</em> a strong foundation in literacy determines long-term academic success.<br>
<em>It appears that</em> the number of students choosing science subjects is steadily increasing.</p>`,
  },
  {
    title: "Leçon 3 (Unité 8) : Language corner – Question types in English",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 27,
    duration: 50,
    isPremium: false,
    summary:
      "Master all English question types: yes/no, wh-questions, tag questions, indirect questions, and rhetorical questions — with correct word order for each.",
    keyPoints: `Yes/No questions: invert subject and auxiliary (be, have, do, modal)
Use do/does/did when there is no auxiliary verb in the statement
Wh-questions: wh-word + auxiliary + subject + verb
Exception: when wh-word IS the subject, no inversion ("Who called you?")
Tag questions: positive statement → negative tag; negative statement → positive tag
Irregular tags: "I am right, aren't I?" / "Let's go, shall we?"
Indirect questions: question word + normal word order (NO inversion, NO do/does/did)
Rhetorical questions are not genuine — they make a point or persuade`,
    content: `<h2>Question Types in English</h2>
<h3>1. Yes/No Questions</h3>
<p>Formed by inverting subject and auxiliary verb.</p>
<ul>
  <li><em>Is</em> she a student? / <em>Have</em> you seen the film? / <em>Does</em> he study here?</li>
  <li>If no auxiliary verb exists, use <strong>do/does/did</strong>: <em>Does</em> she speak English?</li>
</ul>
<h3>2. Wh- Questions</h3>
<p>Begin with: <strong>who, what, when, where, why, which, how, how long, how many, how much</strong></p>
<p>Structure: <strong>Wh-word + auxiliary + subject + main verb</strong></p>
<ul>
  <li><em>What do</em> you study? / <em>Where does</em> she live?</li>
  <li>When wh-word IS the subject — no inversion: <em>Who called you? / What happened?</em></li>
</ul>
<h3>3. Tag Questions</h3>
<ul>
  <li>Positive statement → Negative tag: She is a doctor, <em>isn't she</em>?</li>
  <li>Negative statement → Positive tag: He doesn't like it, <em>does he</em>?</li>
  <li>Irregular: I am right, <em>aren't I</em>? / Let's go, <em>shall we</em>? / Don't be late, <em>will you</em>?</li>
</ul>
<h3>4. Indirect / Embedded Questions</h3>
<p>Used to ask politely. <strong>No inversion — use normal word order.</strong></p>
<ul>
  <li>Direct: Where is the station? → Indirect: <em>Could you tell me where the station is</em>?</li>
  <li>Direct: Is she available? → Indirect: <em>I was wondering if she is available</em>.</li>
</ul>
<h3>5. Rhetorical Questions</h3>
<p>Used for emphasis or persuasion — the speaker does not expect an answer.</p>
<ul>
  <li><em>Is there anyone who does not want a better future?</em></li>
  <li><em>What is the point of studying if you don't apply what you learn?</em></li>
</ul>
<h3>6. Choice Questions (Either/Or)</h3>
<ul>
  <li><em>Would you prefer tea or coffee? / Are you going by bus or by taxi?</em></li>
</ul>`,
    examples: `<p><strong>Yes/No questions:</strong><br>
<em>Has she submitted</em> her application yet? <em>Did you attend</em> the ceremony yesterday?</p>
<p><strong>Wh-questions:</strong><br>
<em>What subjects does</em> she study at Terminale?<br>
<em>Who discovered</em> the problem first? (subject — no inversion)<br>
<em>How many students have passed</em> the Baccalaureate this year?</p>
<p><strong>Tag questions:</strong><br>
The exam results were excellent, <em>weren't they</em>?<br>
She hasn't revised yet, <em>has she</em>?<br>
Let's celebrate our success, <em>shall we</em>?</p>
<p><strong>Indirect questions:</strong><br>
Direct: "Where does the headmaster's office?" →<br>
Indirect: <em>Could you tell me where the headmaster's office is</em>? (no inversion)<br>
Direct: "Is the school open on Saturday?" →<br>
Indirect: <em>I would like to know whether the school is open on Saturday</em>.</p>
<p><strong>Rhetorical question:</strong><br>
<em>Can we truly claim to be developing</em> if half our children have no access to quality education?</p>`,
  },
  {
    title: "Leçon 3 (Unité 8) : Writing skills – A covering letter",
    subjectId: ANGLAIS_SUBJECT_ID,
    series: "ALL",
    order: 28,
    duration: 50,
    isPremium: false,
    summary:
      "Learn to write a compelling covering letter for a job or scholarship application: formal layout, confident language, tailored motivation, and a professional closing.",
    keyPoints: `A covering letter accompanies a CV when applying for a job, scholarship, or programme
Formal register: no contractions, no slang; professional and confident tone
Layout: your address → date → recipient address → subject line → salutation
Para 1: state the position you are applying for, where you saw it, and your interest
Para 2: highlight relevant qualifications, skills, and experience with specific examples
Para 3: show you know the organisation and explain why you want THIS specific role
Para 4: request an interview, mention enclosed CV, thank the reader
"Yours sincerely" if you used their name; "Yours faithfully" if "Dear Sir/Madam"
Tailor each letter to the specific role — never send a generic letter`,
    content: `<h2>How to Write a Covering Letter (Cover Letter)</h2>
<p>A <strong>covering letter</strong> is a formal letter sent alongside a CV when applying for a job, scholarship, or programme. Its purpose is to introduce yourself, explain your interest and suitability, and persuade the recruiter to read your full application.</p>
<h3>1. Key Features</h3>
<ul>
  <li>Formal register — no contractions, no slang</li>
  <li>Confident, professional, and concise (ideally one page)</li>
  <li>Tailored to the specific role or programme</li>
  <li>Highlights your most relevant skills and experience</li>
</ul>
<h3>2. Structure / Layout</h3>
<p><strong>Your full name and address</strong> (top right)<br>
<strong>Date</strong><br>
<strong>Recipient's name/title and address</strong> (left-aligned)<br>
<strong>Subject line:</strong> RE: Application for [Position / Scholarship]</p>
<p><strong>Salutation:</strong> Dear Mr/Mrs/Ms [Surname], — OR — Dear Sir/Madam</p>
<p><strong>Para 1 — Introduction:</strong> State the position you are applying for, where you saw it, and express genuine interest.</p>
<p><strong>Para 2 — Qualifications and skills:</strong> Highlight relevant qualifications and experience. Use specific examples — connect them to the role.</p>
<p><strong>Para 3 — Your motivation:</strong> Show you have researched the organisation. Explain why you want THIS specific role.</p>
<p><strong>Para 4 — Closing:</strong> Express eagerness for an interview. Mention your CV is enclosed. Thank the reader.</p>
<p><strong>Sign-off:</strong> Yours sincerely (if name used) / Yours faithfully (if Dear Sir/Madam)</p>
<h3>3. Useful Expressions</h3>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
  <tr><th>Function</th><th>Expressions</th></tr>
  <tr><td>Applying</td><td>I am writing to apply for… / I wish to apply for the position of…</td></tr>
  <tr><td>Qualifications</td><td>I hold a Baccalaureate in… / I have experience in… / I am proficient in…</td></tr>
  <tr><td>Motivation</td><td>I am particularly drawn to… / Your organisation is renowned for…</td></tr>
  <tr><td>Interview</td><td>I would welcome the opportunity to discuss… / I am available at your convenience.</td></tr>
  <tr><td>Closing</td><td>I look forward to hearing from you. / Please find my CV enclosed.</td></tr>
</table>`,
    examples: `<p>Kouassi Ama Bénédicte<br>25, Rue des Jardins, Cocody, Abidjan<br>9th April 2026</p>
<p>The Scholarship Committee<br>Foundation for African Excellence, Abidjan</p>
<p><strong>RE: Application for the Excellence Scholarship in Sciences</strong></p>
<p>Dear Sir/Madam,</p>
<p>I am writing to apply for the Excellence Scholarship in Sciences, which I came across on your official website. I am deeply inspired by your commitment to developing the next generation of African scientists.</p>
<p>I am currently a Terminale D student at Lycée Moderne de Bingerville, where I have consistently ranked first in Mathematics, Physics, and Chemistry. Last year, I represented my school in the national science olympiad, where my team placed second. I aspire to study biomedical engineering.</p>
<p>Your foundation is renowned for the mentorship programmes it offers alongside financial support — a combination I consider invaluable. I am confident this scholarship will enable me to pursue my studies at the highest level.</p>
<p>I would welcome the opportunity to discuss my application at your convenience. Please find my academic records enclosed. I thank you sincerely for taking the time to consider my application.</p>
<p>Yours faithfully,<br><strong>Kouassi Ama Bénédicte</strong></p>`,
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

    if (existing.length >= 24) {
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
