// ===================== LANGUAGE SWITCH =====================
// Apply saved language immediately (before paint) to prevent flash
(function () {
  var saved = localStorage.getItem('bp-lang');
  if (saved === 'zh') {
    document.documentElement.setAttribute('data-lang', 'zh');
  } else {
    document.documentElement.setAttribute('data-lang', 'en');
    localStorage.setItem('bp-lang', 'en');
  }
})();

// ===================== TRANSLATIONS =====================
var TRANSLATIONS = {
  en: {
    // Navbar
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.pricing': 'Pricing',
    'nav.reviews': 'Reviews',
    'nav.book': 'Book a Lesson',

    // Hero (index)
    'hero.badge': 'Trusted by 500+ international students',
    'hero.title.1': 'Your Path to',
    'hero.title.2': 'English Fluency',
    'hero.title.3': 'Starts Here',
    'hero.subtitle': 'Personalised 1-on-1 English tutoring designed for international students. Build confidence, improve your grades, and achieve your goals — at your own pace.',
    'hero.btn.book': 'Book a Lesson — CA$30',
    'hero.btn.pricing': 'View Pricing',
    'hero.stat.students': 'Students Helped',
    'hero.stat.rating': 'Average Rating',
    'hero.stat.countries': 'Countries',

    // Session card
    'session.label': 'Live Tutoring Session',
    'session.topic.tag': 'Academic Writing',
    'session.topic.title': 'Essay Structure & Argumentation',
    'session.progress': 'Lesson progress',
    'session.tutor.role': 'Instructor',
    'session.student.role': 'Student',
    'session.speaking': 'Speaking now\u2026',
    'chip.1.sub': 'Score improved',
    'chip.2.sub': 'Student rating',
    'chip.3.title': '15+ Countries',
    'chip.3.sub': 'Worldwide',
    'scroll.text': 'Scroll',

    // Trust bar
    'trust.label.html': 'Trusted by students in <strong>15+ countries</strong> worldwide',

    // Services section
    'services.tag': 'What We Offer',
    'services.title.html': 'Tutoring Programmes<br />Built Around <em>You</em>',
    'services.subtitle': 'Whether you need help with everyday conversation or rigorous exam preparation, we have a programme tailored to your goals.',
    's1.title': 'Academic Writing',
    's1.desc': 'Master essays, reports, and research papers. Learn academic style, structure, and citation with expert guidance.',
    's1.f1': 'Essay structure & argumentation',
    's1.f2': 'Grammar & sentence variety',
    's1.f3': 'Referencing (APA, Harvard, MLA)',
    's1.badge': 'Most Popular',
    's2.title': 'Conversation & Fluency',
    's2.desc': 'Build confidence speaking English in everyday and professional situations through engaging, real-world practice.',
    's2.f1': 'Pronunciation coaching',
    's2.f2': 'Vocabulary expansion',
    's2.f3': 'Presentation skills',
    's3.title': 'IELTS / TOEFL Prep',
    's3.desc': 'Targeted exam preparation with proven strategies to maximise your score across all four skills.',
    's3.f1': 'Full practice tests',
    's3.f2': 'Examiner-style feedback',
    's3.f3': 'Score improvement guarantee*',
    's4.title': 'Business English',
    's4.desc': 'Communicate professionally in meetings, emails, and presentations. Ideal for students entering the workforce.',
    's4.f1': 'Professional email writing',
    's4.f2': 'Meeting & negotiation language',
    's4.f3': 'LinkedIn & resume writing',
    's5.title': 'General English',
    's5.desc': 'A flexible programme covering all aspects of English for students at any level, from beginner to advanced.',
    's5.f1': 'Reading & comprehension',
    's5.f2': 'Listening skills',
    's5.f3': 'Grammar foundations',
    's6.title': 'Assignment Feedback',
    's6.desc': 'Get detailed, constructive feedback on your submitted work to improve your understanding and grades.',
    's6.f1': 'Line-by-line editing',
    's6.f2': 'Structural suggestions',
    's6.f3': 'Turnaround within 48 hours',
    'services.cta': 'Get Started',
    'services.note': '*Score improvement guarantee applies after a minimum 10-session IELTS/TOEFL package.',

    // How it works
    'hiw.tag': 'Simple Process',
    'hiw.title.html': 'Getting Started is<br /><em>Easy</em>',
    'hiw.subtitle': 'From your first message to your first lesson \u2014 we make it simple to begin your English journey.',
    'hiw.s1.title': 'Book a Free Trial',
    'hiw.s1.desc': 'Fill in our short contact form and tell us about your goals. We\'ll match you with the best tutor for your needs and schedule.',
    'hiw.s2.title': 'Assessment & Plan',
    'hiw.s2.desc': 'In your free 30-minute trial lesson, your tutor will assess your current level and co-create a personalised learning plan with you.',
    'hiw.s3.title': 'Start Your Sessions',
    'hiw.s3.desc': 'Book sessions at times that suit you. All lessons are held online via Zoom or Google Meet \u2014 learn from anywhere in the world.',
    'hiw.s4.title': 'Track Your Progress',
    'hiw.s4.desc': 'Receive session summaries, progress reports, and homework after every lesson. See your improvement clearly over time.',

    // Curriculum
    'curr.tag': 'The Pomelo English Method',
    'curr.title.html': 'A structured curriculum,<br /><em>built for results.</em>',
    'curr.subtitle': 'Unlike general tutoring, Pomelo English follows a purpose-built curriculum designed to move students through clear, measurable stages \u2014 from foundational skills to confident, independent English use.',
    'curr.c1.title': 'Language Foundations',
    'curr.c1.desc': 'Grammar, sentence structure, and vocabulary built systematically \u2014 ensuring every student has a solid base before advancing.',
    'curr.c2.title': 'Academic Writing',
    'curr.c2.desc': 'Essay structure, argumentation, and academic style \u2014 the skills that directly impact grades in school and university.',
    'curr.c3.title': 'Reading & Analysis',
    'curr.c3.desc': 'Critical reading, comprehension strategies, and analytical thinking \u2014 so students can engage with complex texts confidently.',
    'curr.c4.title': 'Oral Communication',
    'curr.c4.desc': 'Pronunciation, spoken fluency, and presentation skills \u2014 building the confidence to speak clearly in any situation.',
    'curr.c5.title': 'Exam Preparation',
    'curr.c5.desc': 'Targeted IELTS and TOEFL strategies, timed practice, and examiner-aware feedback \u2014 built into the curriculum, not bolted on.',
    'curr.c6.title': 'Applied & Professional English',
    'curr.c6.desc': 'Business writing, professional communication, and real-world English \u2014 for students preparing to enter the workforce.',
    'curr.note': 'The Pomelo English curriculum is actively being developed and refined. Each student\'s programme is personalised to their level and goals within this framework.',

    // Instructor
    'inst.tag': 'Our Instructor',
    'inst.title.html': 'Who delivers <em>the curriculum</em>',
    'inst.tutor.role': 'Academic Writing & Essay Specialist',
    'inst.tutor.bio': 'Charlie is a high-achieving academic with a genuine passion for English writing. Known for exceptional essay work and deep knowledge of the humanities, he brings clarity and enthusiasm to every session \u2014 breaking down complex writing techniques into steps students can immediately use.',
    'inst.cta.text': 'Sessions follow the Pomelo English curriculum and are personalised to your level, goals, and timeline.',
    'inst.cta.btn': 'Book a Free Trial',

    // Testimonials
    'test.tag': 'Student Stories',
    'test.title.html': 'Real Results,<br /><em>Real Students</em>',
    'test.subtitle': 'Hear from international students who transformed their English with Pomelo English.',

    // Contact
    'contact.tag': 'Get in Touch',
    'contact.title.html': 'Book Your Free<br /><em>Trial Lesson</em>',
    'contact.desc': 'Your first 30-minute session is completely free \u2014 no credit card required. Just fill in the form and we\'ll be in touch within 24 hours to confirm your booking.',
    'contact.p1.title': 'Flexible Scheduling',
    'contact.p1.desc': 'Sessions available 7 days a week, including evenings and weekends (AEST).',
    'contact.p2.title': '100% Online',
    'contact.p2.desc': 'Learn from anywhere in the world via Zoom or Google Meet.',
    'contact.p3.title': 'Quick Response',
    'contact.p3.desc': 'We reply to all enquiries within 24 hours, usually much sooner.',
    'form.title': 'Book Your Free Trial',
    'form.firstName': 'First Name *',
    'form.lastName': 'Last Name *',
    'form.email': 'Email Address *',
    'form.country': 'Country of Origin',
    'form.country.ph': 'Select your country\u2026',
    'form.service': 'I\'m interested in\u2026 *',
    'form.service.ph': 'Choose a service\u2026',
    'form.message': 'Tell us about your goals',
    'form.message.ph': 'e.g. I\'m preparing for IELTS in 3 months and need to improve my writing score from 6.0 to 7.0\u2026',
    'form.submit': 'Book My Free Trial \u2192',
    'form.sending': 'Sending\u2026',
    'form.disclaimer': 'By submitting this form you agree to our Privacy Policy. We will never share your information with third parties.',
    'form.success.title': 'You\'re booked in!',
    'form.success.desc': 'Thank you for reaching out. We\'ll contact you within 24 hours to confirm your free trial lesson. We can\'t wait to meet you!',

    // Footer
    'footer.brand.desc': 'Personalised English tutoring for international students, wherever you are in the world.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.c.tutors': 'Meet Our Tutors',
    'footer.c.hiw': 'How It Works',
    'footer.c.stories': 'Student Stories',
    'footer.c.contact': 'Contact Us',
    'footer.contact': 'Contact',
    'footer.hours': 'Sessions available 7 days/week\n(AEST, UTC+10)',
    'footer.copy': '\u00a9 2026 Pomelo English. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // About page
    'about.hero.tag': 'Our Story',
    'about.hero.title.html': 'Built for students<br />who were <em>told their<br />English wasn\'t enough.</em>',
    'about.hero.sub': 'Pomelo English was founded on a simple belief \u2014 that language should never be a barrier to opportunity. We exist to give international students the tools, confidence, and expert support to thrive in English-speaking environments.',
    'about.stat.1': 'Students supported',
    'about.stat.2': 'Countries reached',
    'about.stat.3': 'Average rating',
    'mission.tag': 'Why We Exist',
    'mission.title.html': 'Language is a bridge,<br />not a <em>wall.</em>',
    'mission.p1': 'Too many brilliant international students arrive in countries like Canada, Australia, and the UK with sharp minds and big ambitions \u2014 only to be held back by language barriers in their academic work, their professional lives, and their everyday confidence.',
    'mission.p2': 'Pomelo English was built to close that gap. We don\'t offer generic lessons or one-size-fits-all programmes. We offer genuine, personalised mentorship from educators who understand exactly what it feels like to navigate an unfamiliar academic and cultural landscape.',
    'mission.p3.html': 'Every session we deliver is guided by one question: <strong>what does this student actually need to move forward?</strong>',
    'mission.c1.title': 'Student-first',
    'mission.c1.desc': 'Every programme is built around the individual student\'s goals, level, and timeline \u2014 never a generic curriculum.',
    'mission.c2.title': 'Globally minded',
    'mission.c2.desc': 'Our tutors understand the unique challenges of studying and working in a second language, from cultural nuance to academic conventions.',
    'mission.c3.title': 'Results driven',
    'mission.c3.desc': 'We measure our success by yours \u2014 improved grades, higher exam scores, and the confidence to communicate without hesitation.',
    'founder.tag': 'Meet the Founder',
    'founder.role': 'Founder, Pomelo English',
    'founder.quote': '"I started Pomelo English because I know what it\'s like to work hard and still feel like the system wasn\'t built for you. Every student deserves someone in their corner who actually gets it."',
    'founder.quote.attr': '\u2014 Sam Wang, Founder',
    'founder.bio.1': 'Sam Wang is a student, educator, and the founder of Pomelo English. Currently enrolled in the International Baccalaureate Diploma Programme \u2014 one of the most rigorous academic curricula in the world \u2014 Sam brings a rare perspective to tutoring: he knows exactly what it feels like to sit on the other side of the desk.',
    'founder.bio.2': 'Sam\'s passion for teaching started young. He has been teaching piano for several years, working with students of varying ages and skill levels. That experience taught him something that no textbook could: how to read a student\'s frustration, break a difficult concept into something manageable, and build the kind of trust that makes learning actually stick.',
    'founder.bio.3': 'Alongside his studies, Sam has volunteered and worked with tutoring-focused non-profit organisations, gaining hands-on experience supporting students who struggle to access quality academic help. Seeing how much of a difference the right guidance can make \u2014 and how little of it is available to those who need it most \u2014 is what drove him to build Pomelo English.',
    'founder.bio.4': 'Pomelo English was founded on a straightforward idea: students deserve support from someone who genuinely gets it. Sam isn\'t a distant expert \u2014 he\'s someone navigating high-level academics himself, who cares deeply about making sure language never stands between a capable student and their potential.',
    'founder.cred.1.title': 'IB Diploma Programme',
    'founder.cred.1.desc': 'International Baccalaureate \u2014 one of the world\'s most rigorous pre-university curricula',
    'founder.cred.2.title': 'Non-Profit Tutoring Experience',
    'founder.cred.2.desc': 'Hands-on work supporting students through educational non-profit organisations',
    'founder.cred.3.title': 'Piano Instructor',
    'founder.cred.3.desc': 'Years of experience teaching students of all ages and skill levels',
    'founder.cred.4.title': 'Student Perspective',
    'founder.cred.4.desc': 'Actively navigating high-level academics \u2014 bringing empathy and insight that only a fellow student can offer',
    'journey.tag': 'What to Expect',
    'journey.title.html': 'Your journey with <em>Pomelo English</em>',
    'journey.subtitle': 'From your very first message to reaching your goals \u2014 here\'s exactly what working with us looks like.',

    // Pricing page
    'pricing.hero.tag': 'Transparent Pricing',
    'pricing.hero.title.html': 'Simple pricing.<br /><em>No hidden fees.</em>',
    'pricing.hero.sub': 'Pay per session or save with a bundle. All sessions are 60 minutes, 1-on-1 with an expert tutor. Cancel or reschedule anytime.',
    'pricing.trial.html': '<strong>New to Pomelo English? Start completely free.</strong>',
    'pricing.trial.desc': 'Book a free 30-minute trial session \u2014 no payment, no commitment. Experience the quality before you spend a cent.',
    'pricing.trial.btn': 'Book Free Trial \u2192',
    'pricing.single.tag': 'Pay as you go',
    'pricing.single.name': 'Single Session',
    'pricing.single.period': '/ session',
    'pricing.single.desc': 'One focused 60-minute session. Great for targeted help with a specific assignment, exam, or topic.',
    'pricing.single.btn': 'Book a Single Session',
    'pricing.bundle.badge': 'Most Popular \u2014 Save CA$30',
    'pricing.bundle.tag': 'Bundle & save',
    'pricing.bundle.name': '5-Session Bundle',
    'pricing.bundle.period': '/ 5 sessions',
    'pricing.bundle.per': 'CA$34 per session \u2014 save CA$30',
    'pricing.bundle.desc': 'The most popular choice for students working consistently toward exams, assignments, or fluency goals.',
    'pricing.bundle.btn': 'Get the 5-Session Bundle',
    'pricing.bundle.note': 'Sessions valid for 3 months from purchase',
    'pricing.term.badge': 'Best Value \u2014 Full Term',
    'pricing.term.tag': 'Deep commitment',
    'pricing.term.name': 'Full Term Plan',
    'pricing.term.period': '/ 4 months',
    'pricing.term.per': 'Weekly sessions all term \u2014 transformational results',
    'pricing.term.desc': 'For students who want long-term, structured improvement across a full academic term.',
    'pricing.term.btn': 'Start the Term Plan',
    'pricing.term.note': 'Best for students with long-term goals',
    'pricing.note': 'All prices in Canadian dollars (CAD)\u00a0\u00b7\u00a0Secure payment via Stripe\u00a0\u00b7\u00a0Instant email confirmation',
    'compare.tag': 'Compare Plans',
    'compare.title.html': 'Everything side <em>by side</em>',
    'compare.subtitle': 'Not sure which plan is right for you? Here\'s a clear breakdown of what each includes.',
    'compare.booknow': 'Book Now',
    'compare.getbundle': 'Get Bundle',
    'compare.startterm': 'Start Term',

    // Comparison table rows
    'compare.th.feature': "What's included",
    'compare.th.single': 'Single',
    'compare.th.bundle': '5-Session Bundle',
    'compare.th.term': 'Full Term',
    'compare.row.1': '60-minute 1-on-1 sessions',
    'compare.row.2': 'Session notes emailed after',
    'compare.row.3': 'Homework & practice resources',
    'compare.row.4': 'Free reschedule (24h notice)',
    'compare.row.5': 'Personalised learning plan',
    'compare.row.6': 'Same dedicated tutor',
    'compare.row.7': 'Progress reports',
    'compare.row.8': 'Direct tutor messaging',
    'compare.row.9': 'Mid-term learning review',
    'compare.row.10': 'Priority scheduling',
    'compare.after5': 'After session 5',
    'compare.monthly': 'Monthly',

    // What's included section
    'included.tag': 'Every Session',
    'included.title.html': "What's always <em>included</em>",
    'included.subtitle': 'No matter which package you choose, every Pomelo English session comes fully equipped.',
    'included.c1.title': 'Personalised Focus',
    'included.c1.desc': "Every session is tailored to your goals, level, and the specific challenges you're working through \u2014 never a generic lesson.",
    'included.c2.title': 'Session Notes',
    'included.c2.desc': 'A written summary of what was covered, key corrections, and new vocabulary is emailed to you after every lesson.',
    'included.c3.title': 'Homework & Resources',
    'included.c3.desc': 'Practice materials and exercises sent after each session to reinforce your learning between lessons.',
    'included.c4.title': 'Tutor Support',
    'included.c4.desc': "Have a quick question between sessions? Your tutor is reachable. We don't disappear between lessons.",
    'included.c5.title': 'Flexible Rescheduling',
    'included.c5.desc': 'Life happens. Reschedule or cancel any session up to 24 hours in advance with no penalty or extra fees.',
    'included.c6.title': 'Secure Payments',
    'included.c6.desc': "All payments processed by Stripe. Your card details are never stored on our servers. 100% safe.",

    // FAQ
    'faq.tag': 'FAQ',
    'faq.title.html': 'Common <em>Questions</em>',
    'faq.q1': 'How do I schedule my session after paying?',
    'faq.a1': "After your payment is confirmed, you'll receive a confirmation email with a scheduling link. From there you can pick your preferred date and time directly from your tutor's availability calendar.",
    'faq.q2': 'Is there really a free trial?',
    'faq.a2': "Yes \u2014 completely free. Your first 30-minute session costs nothing. Just fill in the contact form, tell us your goals, and we'll match you with a tutor for a free introductory session. No card required.",
    'faq.q3': 'What happens if I need to cancel or reschedule?',
    'faq.a3': "You can reschedule or cancel any session up to 24 hours before your scheduled time at no charge. Cancellations within 24 hours may forfeit that session credit. We're always happy to work with you if something unexpected comes up \u2014 just reach out.",
    'faq.q4': 'Do sessions expire?',
    'faq.a4': '5-session bundles are valid for 3 months from the date of purchase. The Full Term Plan runs for 4 calendar months from your first session. If you need an extension for any reason, just contact us and we\'ll sort it out.',
    'faq.q5': "What's the difference between the Bundle and the Term Plan?",
    'faq.a5': 'The 5-Session Bundle gives you 5 flexible sessions to use across 3 months \u2014 great for targeted progress. The Full Term Plan is a structured 4-month commitment with weekly sessions, monthly progress reports, direct tutor messaging, and a mid-term review. It\'s for students who want deep, lasting improvement over a full semester.',
    'faq.q6': 'Can I choose my tutor?',
    'faq.a6': "Yes. After booking you'll see tutor availability and can choose who you'd like to work with. For the Bundle and Term Plan, we strongly recommend sticking with one tutor throughout for consistency, but switching is possible.",
    'faq.q7': 'What platform are sessions held on?',
    'faq.a7': 'Sessions are held via Zoom or Google Meet \u2014 your choice. A link is sent to your email before every session. All you need is a device with a camera and microphone.',
    'faq.q8': 'Is my payment secure?',
    'faq.a8': 'Absolutely. All payments are processed by Stripe \u2014 a world-leading payment platform trusted by millions of businesses. We never store your card details on our servers.',

    // Pricing CTA section
    'pricing.cta.title': 'Ready to start?',
    'pricing.cta.desc': "Try a free 30-minute trial first, or dive straight in. Either way, we're here.",
    'pricing.cta.btn.plans': 'View All Plans \u2014 From CA$40',
    'pricing.cta.btn.trial': 'Book Free Trial First',

    // Pricing page footer
    'pricing.footer.c.pricing': 'Pricing',
    'pricing.footer.c.book': 'Book a Lesson',
    'pricing.footer.c.tutors': 'Meet Our Tutors',

    // Book page
    'book.hero.tag': 'Book a Session',
    'book.hero.title.html': 'Choose your plan.<br /><em>Start learning today.</em>',
    'book.hero.sub': 'Select a package below and get in touch — we\'ll send you payment details and get your first session scheduled. Simple.',
    'book.step.1': 'Choose a package',
    'book.step.2': 'Get in touch',
    'book.step.3': 'Schedule your time',
    'book.step.4': 'Start learning',

    // Book page — trial banner
    'book.trial.banner.strong': 'Not sure yet? Start completely free.',
    'book.trial.banner.desc': 'Book a free 30-minute trial session — no payment, no commitment. Meet your tutor and experience Pomelo English before you spend a cent.',
    'book.trial.btn': 'Book Free Trial →',

    // Book page — single session card
    'book.single.name': 'Single Session',
    'book.single.per.label': 'per session',
    'book.single.desc': 'One focused 60-minute 1-on-1 session. Great for targeted help with an assignment, exam prep, or trying Pomelo English for the first time.',
    'book.single.f1': '1 × 60-minute live session',
    'book.single.f2': 'Any subject or skill area',
    'book.single.f3': 'Session notes emailed after',
    'book.single.f4': 'Free reschedule (24h notice)',
    'book.single.f5': 'Instant booking confirmation',
    'book.single.pay': 'View Plan Details →',

    // Book page — bundle card
    'book.bundle.badge': 'Most Popular · Save CA$30',
    'book.bundle.name': '5-Session Bundle',
    'book.bundle.per.label': 'for 5 sessions',
    'book.bundle.per.session': 'CA$34 per session — save CA$30',
    'book.bundle.desc': 'The ideal choice for students working steadily toward a goal — whether that\'s an exam, an assignment, or building real fluency over time.',
    'book.bundle.f1': '5 × 60-minute live sessions',
    'book.bundle.f2': 'Personalised learning plan',
    'book.bundle.f3': 'Same tutor every session',
    'book.bundle.f4': 'Session notes after every lesson',
    'book.bundle.f5': 'Progress report after session 5',
    'book.bundle.f6': 'Flexible scheduling — valid 3 months',
    'book.bundle.pay': 'View Plan Details →',

    // Book page — term plan card
    'book.term.badge': 'Best Value · Full Term',
    'book.term.name': 'Full Term Plan',
    'book.term.per.label': 'for 4 months',
    'book.term.per.session': 'Weekly sessions all term — the deepest results',
    'book.term.desc': 'Commit to a full academic term of consistent weekly sessions. Designed for students who want transformational, long-term improvement — not just a quick fix.',
    'book.term.f1': 'Weekly 60-minute sessions (4 months)',
    'book.term.f2': 'Dedicated tutor for the full term',
    'book.term.f3': 'Full personalised learning roadmap',
    'book.term.f4': 'Session notes + homework tasks',
    'book.term.f5': 'Monthly progress reports',
    'book.term.f6': 'Priority scheduling & rescheduling',
    'book.term.f7': 'Direct tutor messaging between sessions',
    'book.term.pay': 'View Plan Details →',

    // Book page — shared
    'book.secure': ' We\'ll respond within 24 hours',
    'book.reassurance.html': 'Payment via <strong>e-Transfer</strong> or <strong>WeChat Pay</strong> — details sent after you get in touch. All prices in CAD.',
    'book.pricing.link': 'View full pricing details →',

    // Payment modal
    'modal.intro': 'To book this plan, please send payment via <strong>Interac E-transfer</strong> or <strong>WeChat Pay</strong>.',
    'modal.etransfer.label': 'Interac E-transfer',
    'modal.wechat.label': 'WeChat Pay',
    'modal.wechat.placeholder': 'WeChat Pay QR Code — coming soon',
    'modal.copy.btn': 'Copy',
    'modal.notify.btn': 'I\'ve sent payment — notify me',
    'modal.form.heading': 'Let us know you\'ve paid',
    'modal.form.name': 'Your name',
    'modal.form.email': 'Your email',
    'modal.form.plan': 'Which plan did you pay for?',
    'modal.form.submit': 'Send Notification →',
    'modal.success': 'We\'ve got your details! We\'ll confirm your booking within 24 hours.',

    // Booking FAQ
    'bookfaq.tag': 'Booking Questions',
    'bookfaq.title.html': 'Everything you need <em>to know</em>',
    'bookfaq.q1': 'How do I confirm my booking?',
    'bookfaq.a1': 'Send payment first, then fill in the notification form. We\'ll confirm within 24 hours.',
    'bookfaq.q2': 'What if I need to cancel?',
    'bookfaq.a2': 'Cancellations with 24 hours notice receive a full refund.',
    'bookfaq.q3': 'Why e-transfer and WeChat Pay?',
    'bookfaq.a3': 'We keep things simple and fee-free so more of your money goes toward learning.',
  },

  zh: {
    // Navbar
    'nav.services': '服务',
    'nav.about': '关于我们',
    'nav.pricing': '价格',
    'nav.reviews': '学生评价',
    'nav.book': '预约课程',

    // Hero (index)
    'hero.badge': '超过500名国际学生的信赖之选',
    'hero.title.1': '开启你的',
    'hero.title.2': '英语流利之路',
    'hero.title.3': '从这里出发',
    'hero.subtitle': '专为国际学生设计的个性化一对一英语辅导。建立自信、提升成绩、实现目标——按照你自己的节奏前进。',
    'hero.btn.book': '预约课程 — CA$30',
    'hero.btn.pricing': '查看价格',
    'hero.stat.students': '帮助学生数',
    'hero.stat.rating': '平均评分',
    'hero.stat.countries': '覆盖国家',

    // Session card
    'session.label': '在线辅导课程',
    'session.topic.tag': '学术写作',
    'session.topic.title': '文章结构与论证技巧',
    'session.progress': '课程进度',
    'session.tutor.role': '讲师',
    'session.student.role': '学生',
    'session.speaking': '正在发言\u2026',
    'chip.1.sub': '分数提升',
    'chip.2.sub': '学生评分',
    'chip.3.title': '15+ 个国家',
    'chip.3.sub': '遍布全球',
    'scroll.text': '滚动',

    // Trust bar
    'trust.label.html': '来自全球<strong>15+个国家</strong>的学生信赖之选',

    // Services section
    'services.tag': '我们的服务',
    'services.title.html': '为<em>你</em>量身定制的<br />辅导课程',
    'services.subtitle': '无论你需要日常英语对话练习还是严格的考试备考，我们都有专为你目标设计的课程方案。',
    's1.title': '学术写作',
    's1.desc': '掌握论文、报告和研究论文的写作技巧。在专家指导下学习学术风格、结构和引用规范。',
    's1.f1': '文章结构与论证',
    's1.f2': '语法与句式多样性',
    's1.f3': '引用格式（APA、Harvard、MLA）',
    's1.badge': '最受欢迎',
    's2.title': '英语口语与流利度',
    's2.desc': '通过真实的日常和职业场景练习，在英语口语表达中建立自信。',
    's2.f1': '发音指导',
    's2.f2': '词汇扩展',
    's2.f3': '演讲与表达技巧',
    's3.title': '雅思 / 托福备考',
    's3.desc': '针对性的考试备考训练，运用经过验证的策略，全面提升四项技能分数。',
    's3.f1': '完整模拟测试',
    's3.f2': '考官式批改反馈',
    's3.f3': '分数提升保证*',
    's4.title': '商务英语',
    's4.desc': '在会议、邮件和演示中进行专业沟通。非常适合即将进入职场的学生。',
    's4.f1': '专业邮件写作',
    's4.f2': '会议与商务谈判用语',
    's4.f3': 'LinkedIn与简历写作',
    's5.title': '通用英语',
    's5.desc': '覆盖英语各方面的灵活课程，适合从初级到高级的各类学生。',
    's5.f1': '阅读与理解',
    's5.f2': '听力技巧',
    's5.f3': '语法基础',
    's6.title': '作业批改反馈',
    's6.desc': '获得对你提交作业的详细、建设性反馈，帮助提高理解能力和成绩。',
    's6.f1': '逐行修改',
    's6.f2': '结构优化建议',
    's6.f3': '48小时内完成',
    'services.cta': '立即开始',
    'services.note': '*分数提升保证适用于完成至少10节雅思/托福课程包之后。',

    // How it works
    'hiw.tag': '简单流程',
    'hiw.title.html': '开始学习<br /><em>轻松简单</em>',
    'hiw.subtitle': '从发送第一条消息到第一节课——我们让你的英语之旅轻松启航。',
    'hiw.s1.title': '预约免费试课',
    'hiw.s1.desc': '填写简短的联系表格，告诉我们你的目标。我们会为你匹配最适合你需求和日程的导师。',
    'hiw.s2.title': '评估与制定计划',
    'hiw.s2.desc': '在30分钟的免费试课中，你的导师将评估你目前的水平，并与你共同制定个性化学习计划。',
    'hiw.s3.title': '开始正式上课',
    'hiw.s3.desc': '在适合你的时间预约课程。所有课程均通过Zoom或Google Meet在线进行——在世界任何地方学习。',
    'hiw.s4.title': '跟踪学习进度',
    'hiw.s4.desc': '每节课后收到课程总结、进度报告和练习作业。随着时间推移清晰看到你的进步。',

    // Curriculum
    'curr.tag': 'Pomelo English 教学法',
    'curr.title.html': '结构化课程体系，<br /><em>以结果为导向。</em>',
    'curr.subtitle': '与一般辅导不同，Pomelo English遵循专门设计的课程体系，通过清晰可衡量的阶段推动学生进步——从语言基础到自信、独立地使用英语。',
    'curr.c1.title': '语言基础',
    'curr.c1.desc': '系统构建语法、句子结构和词汇——确保每位学生在进阶前具备坚实的语言基础。',
    'curr.c2.title': '学术写作',
    'curr.c2.desc': '文章结构、论证和学术风格——直接影响学校和大学成绩的核心技能。',
    'curr.c3.title': '阅读与分析',
    'curr.c3.desc': '批判性阅读、理解策略和分析思维——让学生能够自信地理解和分析复杂文本。',
    'curr.c4.title': '口头表达',
    'curr.c4.desc': '发音、口语流利度和演讲技巧——培养在任何场合清晰表达的信心。',
    'curr.c5.title': '考试备考',
    'curr.c5.desc': '针对性的雅思和托福策略、限时练习和考官式反馈——融入课程体系，而非附加内容。',
    'curr.c6.title': '应用与职业英语',
    'curr.c6.desc': '商务写作、专业沟通和真实英语应用——为准备进入职场的学生量身打造。',
    'curr.note': 'Pomelo English课程体系正在积极开发和完善中。每位学生的课程方案都在该框架内根据其水平和目标进行个性化定制。',

    // Instructor
    'inst.tag': '我们的导师',
    'inst.title.html': '课程由谁来<em>授课</em>',
    'inst.tutor.role': '学术写作与论文专家',
    'inst.tutor.bio': 'Charlie是一位成绩优异的学者，对英语写作充满热情。以出色的论文写作和对人文学科的深刻理解而著称，他为每节课带来清晰思路与充沛热情——将复杂的写作技巧分解成学生可以立即运用的实用步骤。',
    'inst.cta.text': '课程遵循Pomelo English课程体系，并根据你的水平、目标和时间表进行个性化调整。',
    'inst.cta.btn': '预约免费试课',

    // Testimonials
    'test.tag': '学生故事',
    'test.title.html': '真实成果，<br /><em>真实学生</em>',
    'test.subtitle': '听听来自世界各地的国际学生，讲述他们通过Pomelo English改变英语水平的真实经历。',

    // Contact
    'contact.tag': '联系我们',
    'contact.title.html': '预约你的免费<br /><em>试课</em>',
    'contact.desc': '第一节30分钟课程完全免费——无需信用卡。只需填写表格，我们将在24小时内与你联系确认预约。',
    'contact.p1.title': '灵活排课',
    'contact.p1.desc': '每周7天均可安排课程，包括工作日晚上和周末（澳大利亚东部时间）。',
    'contact.p2.title': '100% 在线',
    'contact.p2.desc': '通过Zoom或Google Meet在世界任何地方上课。',
    'contact.p3.title': '快速响应',
    'contact.p3.desc': '我们在24小时内回复所有咨询，通常更快。',
    'form.title': '预约免费试课',
    'form.firstName': '名字 *',
    'form.lastName': '姓氏 *',
    'form.email': '电子邮件地址 *',
    'form.country': '所在国家/地区',
    'form.country.ph': '选择你的国家\u2026',
    'form.service': '感兴趣的服务\u2026 *',
    'form.service.ph': '选择服务\u2026',
    'form.message': '告诉我们你的学习目标',
    'form.message.ph': '例如：我正在备考3个月后的雅思考试，需要将写作分数从6.0提高到7.0\u2026',
    'form.submit': '预约我的免费试课 \u2192',
    'form.sending': '发送中\u2026',
    'form.disclaimer': '提交此表格即表示你同意我们的隐私政策。我们绝不会与第三方共享你的信息。',
    'form.success.title': '预约成功！',
    'form.success.desc': '感谢你的联系！我们将在24小时内与你联系确认免费试课安排。期待与你相见！',

    // Footer
    'footer.brand.desc': '为世界各地的国际学生提供个性化英语辅导服务。',
    'footer.services': '服务项目',
    'footer.company': '关于公司',
    'footer.c.tutors': '认识我们的导师',
    'footer.c.hiw': '工作原理',
    'footer.c.stories': '学生故事',
    'footer.c.contact': '联系我们',
    'footer.contact': '联系方式',
    'footer.hours': '每周7天可预约课程\n（澳大利亚东部时间，UTC+10）',
    'footer.copy': '\u00a9 2026 Pomelo English. 版权所有。',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',

    // About page
    'about.hero.tag': '我们的故事',
    'about.hero.title.html': '为那些曾被告知<br /><em>英语不够好</em><br />的学生而建。',
    'about.hero.sub': 'Pomelo English建立在一个简单的信念上——语言永远不应该成为机会的障碍。我们的使命是为国际学生提供在英语环境中蓬勃发展所需的工具、信心和专业支持。',
    'about.stat.1': '帮助学生数',
    'about.stat.2': '覆盖国家数',
    'about.stat.3': '平均评分',
    'mission.tag': '我们存在的意义',
    'mission.title.html': '语言是一座桥梁，<br />而不是一堵<em>墙。</em>',
    'mission.p1': '太多优秀的国际学生带着敏锐的头脑和远大的抱负来到加拿大、澳大利亚和英国，却在学业、职业生涯和日常生活中因语言障碍而受到阻碍。',
    'mission.p2': 'Pomelo English就是为了弥合这一差距而建立的。我们不提供通用课程或一刀切的方案。我们提供真正个性化的指导，由真正理解在陌生学术和文化环境中摸索感受的教育者来授课。',
    'mission.p3.html': '我们每节课都围绕一个问题展开：<strong>这位学生真正需要什么才能向前迈进？</strong>',
    'mission.c1.title': '以学生为本',
    'mission.c1.desc': '每个课程方案都围绕学生个人的目标、水平和时间表制定——绝不套用通用模板。',
    'mission.c2.title': '全球视野',
    'mission.c2.desc': '我们的导师深刻理解用第二语言学习和工作的独特挑战，从文化差异到学术规范。',
    'mission.c3.title': '结果导向',
    'mission.c3.desc': '我们以你的成功来衡量我们的成功——成绩提升、考试分数提高，以及毫不犹豫地表达自己的信心。',
    'founder.tag': '认识创始人',
    'founder.role': '创始人，Pomelo English',
    'founder.quote': '"我创立Pomelo English，是因为我深知努力奋斗却仍感觉这个体系不是为你而建的滋味。每一位学生都应该有一个真正理解他们的人在背后支持。"',
    'founder.quote.attr': '\u2014 Sam Wang，创始人',
    'founder.bio.1': 'Sam Wang是一名学生、教育者，也是Pomelo English的创始人。目前就读于国际文凭大学预科课程（IB DP）——世界上最严格的学术课程之一——Sam为辅导带来了独特的视角：他深知坐在学生位置上是什么感受。',
    'founder.bio.2': 'Sam对教学的热情从很小就开始了。他教授钢琴多年，服务于不同年龄和技能水平的学生。那段经历教会了他教科书无法传授的东西：如何读懂学生的挫败感，将难懂的概念拆解成可以掌握的内容，并建立起让学习真正发生的信任关系。',
    'founder.bio.3': '在学业之余，Sam曾在以辅导为核心的非营利组织中志愿服务和工作，积累了支持难以获得优质学业帮助的学生的实际经验。亲眼见证正确指导所带来的巨大改变——以及这种帮助对最需要的人来说有多稀缺——正是驱使他创立Pomelo English的动力。',
    'founder.bio.4': 'Pomelo English建立在一个简单的理念上：学生应该得到真正理解他们的人的支持。Sam不是一个遥不可及的专家——他是一个亲身经历高强度学术压力的人，真诚地致力于确保语言不会成为有能力的学生与他们潜力之间的障碍。',
    'founder.cred.1.title': 'IB文凭课程',
    'founder.cred.1.desc': '国际文凭——世界上最严格的大学预科课程之一',
    'founder.cred.2.title': '非营利辅导经验',
    'founder.cred.2.desc': '通过教育类非营利组织支持学生的实践经验',
    'founder.cred.3.title': '钢琴教师',
    'founder.cred.3.desc': '多年教授不同年龄和技能水平学生的经验',
    'founder.cred.4.title': '学生视角',
    'founder.cred.4.desc': '正在亲历高强度学术压力——带来只有同为学生才能给予的同理心与洞察力',
    'journey.tag': '期待什么',
    'journey.title.html': '你与<em>Pomelo English</em>的旅程',
    'journey.subtitle': '从你发送第一条消息到实现目标——这就是与我们合作的完整过程。',

    // Pricing page
    'pricing.hero.tag': '透明定价',
    'pricing.hero.title.html': '简单定价。<br /><em>没有隐藏费用。</em>',
    'pricing.hero.sub': '按课次付费或购买套餐节省费用。所有课程均为60分钟，一对一专家辅导。随时取消或改期。',
    'pricing.trial.html': '<strong>初次了解Pomelo English？完全免费开始。</strong>',
    'pricing.trial.desc': '预约一节免费30分钟试课——无需付款，无需承诺。先体验质量，再决定是否付费。',
    'pricing.trial.btn': '预约免费试课 \u2192',
    'pricing.single.tag': '按需付费',
    'pricing.single.name': '单节课程',
    'pricing.single.period': '/ 节课',
    'pricing.single.desc': '一节专注的60分钟课程。非常适合针对特定作业、考试或主题的重点帮助。',
    'pricing.single.btn': '预约单节课程',
    'pricing.bundle.badge': '最受欢迎——节省 CA$30',
    'pricing.bundle.tag': '套餐优惠',
    'pricing.bundle.name': '5节课套餐',
    'pricing.bundle.period': '/ 5节课',
    'pricing.bundle.per': '每节课 CA$34——节省 CA$30',
    'pricing.bundle.desc': '最受学生欢迎的选择，适合持续备考、完成作业或提升流利度的学生。',
    'pricing.bundle.btn': '购买5节课套餐',
    'pricing.bundle.note': '课程自购买之日起3个月内有效',
    'pricing.term.badge': '最超值——完整学期',
    'pricing.term.tag': '深度学习',
    'pricing.term.name': '完整学期计划',
    'pricing.term.period': '/ 4个月',
    'pricing.term.per': '整学期每周上课——实现突破性进步',
    'pricing.term.desc': '适合希望在整个学期内实现长期、系统性进步的学生。',
    'pricing.term.btn': '开始学期计划',
    'pricing.term.note': '最适合有长期目标的学生',
    'pricing.note': '所有价格以加拿大元（CAD）计算\u00a0\u00b7\u00a0通过Stripe安全付款\u00a0\u00b7\u00a0即时邮件确认',
    'compare.tag': '方案对比',
    'compare.title.html': '一目了然地<em>对比所有方案</em>',
    'compare.subtitle': '不确定哪个方案适合你？这里是每个方案包含内容的清晰对比。',
    'compare.booknow': '立即预约',
    'compare.getbundle': '购买套餐',
    'compare.startterm': '开始学期',

    // Comparison table rows
    'compare.th.feature': '包含内容',
    'compare.th.single': '单节课',
    'compare.th.bundle': '5节课套餐',
    'compare.th.term': '完整学期',
    'compare.row.1': '60分钟一对一课程',
    'compare.row.2': '课后邮件发送课堂笔记',
    'compare.row.3': '作业与练习资料',
    'compare.row.4': '免费改期（提前24小时）',
    'compare.row.5': '个性化学习计划',
    'compare.row.6': '专属固定导师',
    'compare.row.7': '进度报告',
    'compare.row.8': '与导师直接沟通',
    'compare.row.9': '期中学习回顾',
    'compare.row.10': '优先排课',
    'compare.after5': '第5节后',
    'compare.monthly': '每月',

    // What's included section
    'included.tag': '每节课程',
    'included.title.html': '每节课<em>标配内容</em>',
    'included.subtitle': '无论选择哪个套餐，每节Pomelo English课程都配备完整资源。',
    'included.c1.title': '个性化专注',
    'included.c1.desc': '每节课都根据你的目标、水平和当前挑战量身定制——绝不是通用课程。',
    'included.c2.title': '课堂笔记',
    'included.c2.desc': '每节课后，你将收到一份书面总结，包括课程内容、关键纠错和新词汇。',
    'included.c3.title': '作业与学习资料',
    'included.c3.desc': '每节课后发送练习材料和习题，帮助你在课间巩固所学内容。',
    'included.c4.title': '导师支持',
    'included.c4.desc': '课间有疑问？你的导师随时可联系。我们不会在课程之间消失不见。',
    'included.c5.title': '灵活改期',
    'included.c5.desc': '生活总有意外。提前24小时取消或改期，无需支付任何违约金或额外费用。',
    'included.c6.title': '安全支付',
    'included.c6.desc': '所有付款通过Stripe处理。你的银行卡信息绝不存储在我们的服务器上。100%安全。',

    // FAQ
    'faq.tag': '常见问题',
    'faq.title.html': '常见<em>问题解答</em>',
    'faq.q1': '付款后如何预约课程时间？',
    'faq.a1': '付款确认后，你将收到一封包含预约链接的确认邮件。你可以直接从导师的可用时间日历中选择你偏好的日期和时间。',
    'faq.q2': '真的有免费试课吗？',
    'faq.a2': '是的——完全免费。你的第一节30分钟课程无需任何费用。只需填写联系表格，告诉我们你的目标，我们会为你匹配一位导师进行免费试课。无需银行卡。',
    'faq.q3': '如果我需要取消或改期怎么办？',
    'faq.a3': '你可以在预定时间前24小时免费取消或改期。24小时内取消可能会损失该节课的课时。如果遇到突发情况，请随时联系我们，我们会尽力配合。',
    'faq.q4': '课时会过期吗？',
    'faq.a4': '5节课套餐自购买之日起3个月内有效。完整学期计划从第一节课起持续4个日历月。如需延期，请联系我们，我们会妥善处理。',
    'faq.q5': '套餐和学期计划有什么区别？',
    'faq.a5': '5节课套餐让你在3个月内灵活使用5节课——非常适合针对性进步。完整学期计划是为期4个月的系统性承诺，包含每周课程、每月进度报告、与导师直接沟通以及期中回顾。适合希望在整个学期内实现深度、持久进步的学生。',
    'faq.q6': '我可以选择自己的导师吗？',
    'faq.a6': '可以。预约后你可以查看导师的空闲时间并选择你想合作的导师。对于套餐和学期计划，我们强烈建议全程固定一位导师以保持连贯性，但如需更换也是可以的。',
    'faq.q7': '课程在哪个平台上进行？',
    'faq.a7': '课程通过Zoom或Google Meet进行——由你选择。每节课前会将链接发送到你的邮箱。你只需要一台带摄像头和麦克风的设备即可。',
    'faq.q8': '我的付款安全吗？',
    'faq.a8': '绝对安全。所有付款均通过Stripe处理——这是一个受全球数百万企业信赖的领先支付平台。我们绝不将你的银行卡信息存储在我们的服务器上。',

    // Pricing CTA section
    'pricing.cta.title': '准备好开始了吗？',
    'pricing.cta.desc': '先体验免费30分钟试课，或直接开始学习。无论哪种方式，我们都在这里。',
    'pricing.cta.btn.plans': '查看所有方案 — 低至CA$40',
    'pricing.cta.btn.trial': '先预约免费试课',

    // Pricing page footer
    'pricing.footer.c.pricing': '价格',
    'pricing.footer.c.book': '预约课程',
    'pricing.footer.c.tutors': '认识我们的导师',

    // Book page
    'book.hero.tag': '预约课程',
    'book.hero.title.html': '选择你的方案。<br /><em>今天就开始学习。</em>',
    'book.hero.sub': '在下方选择套餐并联系我们——我们将发送付款方式并安排你的第一节课。简单快捷。',
    'book.step.1': '选择套餐',
    'book.step.2': '联系我们',
    'book.step.3': '预约时间',
    'book.step.4': '开始学习',

    // Book page — trial banner
    'book.trial.banner.strong': '不确定？完全免费开始体验。',
    'book.trial.banner.desc': '预约一节免费30分钟试课——无需付款，无需承诺。先认识你的导师，体验Pomelo English的教学质量。',
    'book.trial.btn': '预约免费试课 →',

    // Book page — single session card
    'book.single.name': '单节课程',
    'book.single.per.label': '/ 节课',
    'book.single.desc': '一节专注的60分钟一对一课程。非常适合针对特定作业、考试备考，或首次体验Pomelo English。',
    'book.single.f1': '1 × 60分钟在线直播课程',
    'book.single.f2': '任意科目或技能方向',
    'book.single.f3': '课后邮件发送课堂笔记',
    'book.single.f4': '免费改期（提前24小时）',
    'book.single.f5': '即时预约确认',
    'book.single.pay': '查看方案详情 →',

    // Book page — bundle card
    'book.bundle.badge': '最受欢迎 · 节省 CA$30',
    'book.bundle.name': '5节课套餐',
    'book.bundle.per.label': '/ 5节课',
    'book.bundle.per.session': '每节课 CA$34——节省 CA$30',
    'book.bundle.desc': '持续备考、完成作业或逐步提升流利度的学生的理想选择。',
    'book.bundle.f1': '5 × 60分钟在线直播课程',
    'book.bundle.f2': '个性化学习计划',
    'book.bundle.f3': '每节课固定同一导师',
    'book.bundle.f4': '每节课后发送课堂笔记',
    'book.bundle.f5': '第5节课后出具进度报告',
    'book.bundle.f6': '灵活排课——3个月内有效',
    'book.bundle.pay': '查看方案详情 →',

    // Book page — term plan card
    'book.term.badge': '最超值 · 完整学期',
    'book.term.name': '完整学期计划',
    'book.term.per.label': '/ 4个月',
    'book.term.per.session': '整学期每周上课——实现最深度进步',
    'book.term.desc': '承诺完整学期的每周课程。为追求深度、长期进步而非快速修复的学生而设计。',
    'book.term.f1': '每周60分钟课程（4个月）',
    'book.term.f2': '整学期专属固定导师',
    'book.term.f3': '完整个性化学习路线图',
    'book.term.f4': '课堂笔记＋课后作业',
    'book.term.f5': '每月进度报告',
    'book.term.f6': '优先排课及改期',
    'book.term.f7': '课程间可与导师直接沟通',
    'book.term.pay': '查看方案详情 →',

    // Book page — shared
    'book.secure': ' 我们将在24小时内回复',
    'book.reassurance.html': '支持<strong>电子转账</strong>或<strong>微信支付</strong>——联系后我们将发送付款详情。所有价格以加拿大元（CAD）计算。',
    'book.pricing.link': '查看完整价格详情 →',

    // Payment modal
    'modal.intro': '请通过<strong>Interac 电子转账</strong>或<strong>微信支付</strong>完成付款以预约本课程。',
    'modal.etransfer.label': 'Interac 电子转账',
    'modal.wechat.label': '微信支付',
    'modal.wechat.placeholder': '微信支付二维码——即将上线',
    'modal.copy.btn': '复制',
    'modal.notify.btn': '我已付款——通知我',
    'modal.form.heading': '告诉我们你已付款',
    'modal.form.name': '你的姓名',
    'modal.form.email': '你的邮箱',
    'modal.form.plan': '你支付了哪个方案？',
    'modal.form.submit': '发送通知 →',
    'modal.success': '我们已收到你的信息！将在24小时内确认你的预约。',

    // Booking FAQ
    'bookfaq.tag': '预约常见问题',
    'bookfaq.title.html': '你需要了解的<em>一切</em>',
    'bookfaq.q1': '如何确认我的预约？',
    'bookfaq.a1': '先完成付款，然后填写通知表格。我们将在24小时内确认。',
    'bookfaq.q2': '如果我需要取消怎么办？',
    'bookfaq.a2': '提前24小时取消可获得全额退款。',
    'bookfaq.q3': '为什么使用电子转账和微信支付？',
    'bookfaq.a3': '我们保持简单零手续费，让你的钱更多地用于学习。',
  }
};

// ===================== APPLY TRANSLATIONS =====================
function applyTranslations(lang) {
  var t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // Text content elements
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // HTML content elements
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Load Chinese font on demand (avoids UA font-scaling side effects of setting lang attr)
  if (lang === 'zh' && !document.getElementById('noto-sans-sc')) {
    var link = document.createElement('link');
    link.id = 'noto-sans-sc';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap';
    document.head.appendChild(link);
  }
}

// Wire up the toggle button after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var currentLang = localStorage.getItem('bp-lang') || 'en';

  // Lock every nav link to the MAX of its EN and ZH pixel width so
  // switching language never shifts the navbar. Skips on mobile where nav
  // links are hidden (offsetWidth = 0). All work happens synchronously before
  // the first paint so there is no visible flash.
  (function lockNavWidths() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;

    applyTranslations('en');
    var enWidths = Array.prototype.map.call(links, function(l) { return l.offsetWidth; });
    // If all zero the nav is hidden (mobile) — skip locking
    if (enWidths.every(function(w) { return w === 0; })) return;

    applyTranslations('zh');
    links.forEach(function(link, i) {
      var maxW = Math.max(enWidths[i], link.offsetWidth);
      if (maxW > 0) {
        link.style.minWidth = maxW + 'px';
        link.style.textAlign = 'center';
      }
    });
  })();

  // Now apply the real saved language
  applyTranslations(currentLang);

  var btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var isZh = document.documentElement.getAttribute('data-lang') === 'zh';
    var next = isZh ? 'en' : 'zh';

    function doSwap() {
      document.documentElement.setAttribute('data-lang', next);
      localStorage.setItem('bp-lang', next);
      applyTranslations(next);
    }

    if (document.startViewTransition) {
      document.startViewTransition(doSwap);
    } else {
      doSwap();
    }
  });
});
