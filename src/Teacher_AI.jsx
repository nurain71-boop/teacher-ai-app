import React, { useState, useMemo } from "react";
import {
  Sparkles, Home, LayoutGrid, GraduationCap, FlaskConical, Award,
  Settings, Globe, ChevronRight, ChevronLeft, Search, CheckCircle2,
  Circle, Star, Lock, Users, ShieldCheck, ExternalLink, Plus, Pencil,
  Trash2, X, Flame, Trophy, BadgeCheck, AlertCircle, ArrowRight, ArrowLeft,
  BookOpen, Wand2, Menu, Bell
} from "lucide-react";

/* =========================================================================
   TEACHER_AI — "לומדים, מתרגלים ומלמדים חכם"
   MVP build: language screen, home, onboarding, dashboard, tools catalog,
   tool detail, basic learning track, prompt lab, progress system, admin.
   Hebrew + Arabic (RTL) and English (LTR), pastel palette, single file.
   ========================================================================= */

/* ---------- Design tokens ----------
   Colors: lilac #C9B6F2 · powder pink #F6C9DA · sky #B9E3F0 · mint #B9E9D6
   vanilla #FFE9A8 · cream bg #FBF8F3 · ink #4A4550
   Display: Rubik (700/600) — friendly geometric, reads well in HE/EN.
   Arabic: Cairo — warm, humanist, pairs visually with Rubik's roundness.
   Signature element: the "progress path" — a dotted, curving trail that
   connects lesson nodes like stepping stones, echoed in the sidebar,
   dashboard, and course pages, standing in for a literal learning journey.
*/

const FONT_LINK_HE_EN = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&family=Heebo:wght@400;500;700&display=swap";
const FONT_LINK_AR = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap";

function useFontLoader() {
  React.useEffect(() => {
    [FONT_LINK_HE_EN, FONT_LINK_AR].forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        document.head.appendChild(l);
      }
    });
  }, []);
}

/* ---------------------------- Translations ---------------------------- */

const T = {
  he: {
    dir: "rtl",
    font: "'Rubik', 'Heebo', sans-serif",
    appName: "מרחב AI למורים",
    appTag: "למידה, תרגול ושיתוף למורים",
    chooseLangTitle: "בחרו את שפת האפליקציה",
    chooseLangSub: "ניתן לשנות את השפה בכל עת דרך התפריט העליון",
    langCardHe: "עברית", langCardHeSub: "למידה ותרגול בעברית",
    langCardAr: "العربية", langCardArSub: "التعلّم والتدرّب باللغة العربية",
    langCardEn: "English", langCardEnSub: "Learn and practice in English",
    continueBtn: "המשך לאפליקציה",
    heroTitle: "מרחב AI למורים",
  heroSub: "כלים נבחרים לשילוב בינה מלאכותית בהוראה, בתכנון וביצירת תוצרים",
    startTrack: "התחלת מסלול למידה",
    viewTools: "צפייה בכל הכלים",
    quickPractice: "תרגול מהיר",
    login: "כניסה לחשבון",
    nav_home: "בית", nav_catalog: "קטלוג כלים", nav_academy: "אקדמיה",
    nav_lab: "מעבדת פרומפטים", nav_achievements: "הישגים", nav_admin: "ניהול",
    onboardTitle: "כמה שאלות כדי להתאים לכם מסלול אישי",
    onboardRole: "מהו התפקיד שלך?",
    role_teacher: "מורה/ת", role_coach: "רכז/ת תקשוב", role_principal: "מנהל/ת",
    role_mentor: "מדריך/ה פדגוגי/ת", role_trainer: "מנחה השתלמות",
    onboardSubject: "מהו תחום הדעת שלך?",
    subj_math: "מתמטיקה", subj_lang: "שפות", subj_science: "מדעים",
    subj_social: "מדעי החברה", subj_art: "אמנות", subj_other: "אחר",
    onboardGrade: "באילו שכבות גיל את/ה מלמד/ת?",
    grade_low: "יסודי", grade_mid: "חטיבה", grade_high: "תיכון", grade_all: "כל השכבות",
    onboardLevel: "מהי רמת הניסיון שלך ב-AI?",
    level_new: "מתחיל/ה", level_some: "יש קצת ניסיון", level_pro: "משתמש/ת ותיק/ה",
    onboardGoal: "מה ברצונך ללמוד?",
    goal_prompts: "כתיבת פרומפטים", goal_lessons: "הכנת מערכי שיעור",
    goal_slides: "יצירת מצגות", goal_images: "יצירת תמונות",
    goal_tests: "בניית מבחנים ומשימות", goal_feedback: "הערכה ומשוב",
    goal_ethics: "עבודה אחראית ואתית", goal_time: "חיסכון בזמן",
    onboardTime: "כמה זמן פנוי יש לך בכל שבוע?",
    time_low: "עד 30 דק'", time_mid: "30–60 דק'", time_high: "שעה ומעלה",
    finishOnboard: "בניית מסלול אישי",
    dashHello: "שלום",
    dashProgress: "התקדמות במסלול",
    dashNext: "השיעור הבא",
    dashDaily: "משימה יומית",
    dashChallenge: "האתגר השבועי",
    dashChallengeText: "צרו פרומפט להכנת פעילות פתיחה לשיעור שלכם",
    dashContinue: "המשך מהמקום שבו עצרתי",
    dashFavTools: "כלים מועדפים",
    dashBadges: "תגים שנצברו",
    catalogTitle: "קטלוג כלי AI",
   catalogSub: "כלים נבחרים לשילוב בהוראה, בתכנון ובלמידה",
    catalogSourceNote: "המקור הרשמי: קטלוג משרד החינוך",
    searchPlaceholder: "חיפוש חכם — לדוגמה: \"כלי ליצירת מצגת\"",
    filterAll: "הכול",
    filterFree: "חינמי", filterPaid: "בתשלום",
    filterStudent: "מתאים לתלמידים", filterTeacher: "מתאים למורים",
    approved: "מאושר משרד החינוך",
    needsCheck: "יש לבדוק בקטלוג משרד החינוך",
    lastVerified: "נבדק לאחרונה",
    ages: "גילי שימוש",
    parentApproval: "נדרש אישור הורים",
    registrationReq: "נדרשת הרשמה",
    freePlan: "גרסה חינמית",
    langsSupported: "שפות נתמכות",
    learnMore: "למדו על הכלי",
    startPractice: "התחילו תרגול",
    officialPage: "לעמוד הרשמי בקטלוג",
    addFav: "הוספה למועדפים",
    removeFav: "הסרה מהמועדפים",
    demoBadge: "נתוני הדגמה — נדרש אימות מול הקטלוג הרשמי",
    toolAbout: "היכרות עם הכלי",
    toolStrengths: "יתרונות למורים",
    toolLimits: "מגבלות",
    toolStartGuide: "מדריך התחלה",
    toolPedagogy: "רעיונות לשימוש פדגוגי",
    toolChecklist: "נקודות לבדיקה לפני שימוש בכיתה",
    check1: "לבדוק את אמינות המידע",
    check2: "לא להזין פרטים אישיים או רגישים",
    check3: "לבדוק הטיות בתוצר",
    check4: "להתאים את התוצר לגיל התלמידים",
    check5: "לערוך את התוצר לפני השימוש",
    check6: "לציין שימוש ב-AI כאשר נדרש",
    check7: "לבדוק תנאי שימוש ואישור הורים",
    academyTitle: "אקדמיית AI למורים",
    academySub: "מסלול למידה קצר ומדורג, יחידה אחר יחידה",
    unitLocked: "יחידה תיפתח לאחר השלמת הקודמת",
    unitComplete: "הושלם",
    unitStart: "התחלה",
    unitContinue: "המשך",
    markComplete: "סימון כהושלם",
    labTitle: "מעבדת פרומפטים",
    labSub: "כתבו פרומפט וקבלו משוב מיידי לשיפורו",
    labSubjectField: "תחום דעת",
    labGradeField: "שכבת גיל",
    labGoalField: "מטרת הפרומפט",
    labOutputField: "שפת התוצר",
    labWrite: "כתבו כאן את הפרומפט שלכם...",
    labAnalyze: "בדיקת הפרומפט",
    labScore: "ציון כולל",
    labClarity: "בהירות",
    labGoalScore: "הגדרת מטרה",
    labAudience: "התאמה לקהל היעד",
    labFormat: "פורמט פלט",
    labSafety: "בטיחות ופרטיות",
    labSuggestions: "הצעות לשיפור",
    labImproved: "גרסה משופרת",
    labPrivacyWarn: "נא לא להזין מידע אישי, רגיש או מזהה על תלמידים, הורים או אנשי צוות",
    labSave: "שמירה לספרייה",
    labTryAgain: "עריכה וניסיון נוסף",
    achievementsTitle: "הישגים ותגים",
    achievementsSub: "כל תג מסמן צעד אמיתי בדרך לשימוש בטוח ובוגר ב-AI",
    pointsLabel: "נקודות",
    streakLabel: "רצף ימי למידה",
    tasksDone: "משימות שהושלמו",
    earned: "נצבר",
    locked: "טרם נצבר",
   adminTitle: "ניהול כלי AI",
   adminSub: "הוספה, עריכה ועדכון של כלי AI במאגר הבית ספרי",
    adminAddTool: "הוספת כלי חדש",
    adminEdit: "עריכה",
    adminDelete: "הסרה",
    adminActive: "פעיל",
    adminInactive: "לא פעיל",
    adminConfirmLabel: "אני מאשר/ת כי המידע נבדק מול הקטלוג החינוכי הרשמי של משרד החינוך",
    adminSaveChanges: "שמירת שינויים",
    adminCancel: "ביטול",
    adminName: "שם הכלי",
    adminDesc: "תיאור קצר",
    adminUrl: "קישור לעמוד הרשמי בקטלוג",
    adminAges: "גילי שימוש",
    adminLastVerified: "תאריך נבדק לאחרונה",
    footerResponsible: "שימוש אחראי ובטוח ב-AI",
    footerPrivacy: "מדיניות פרטיות",
    footerAccessibility: "הצהרת נגישות",
    footerNote: "הנחיות משרד החינוך ורשימת הכלים המאושרים עשויות להתעדכן. לפני פעילות עם תלמידים יש לבדוק את המידע העדכני בקטלוג החינוכי הרשמי.",
    responsibleLinkText: "לקטלוג הרשמי של משרד החינוך",
    encourage1: "בואו נתחיל",
    encourage2: "כל הכבוד, השלמתם את המשימה",
    langMenuLabel: "שפה",
  },
  ar: {
    dir: "rtl",
    font: "'Cairo', 'Rubik', sans-serif",
    appName: "TEACHER_AI",
    appTag: "التعلّم والتدرّب والتعليم بذكاء",
    chooseLangTitle: "اختاروا لغة التطبيق",
    chooseLangSub: "يمكن تغيير اللغة في أي وقت من القائمة العلوية",
    langCardHe: "עברית", langCardHeSub: "למידה ותרגול בעברית",
    langCardAr: "العربية", langCardArSub: "التعلّم والتدرّب باللغة العربية",
    langCardEn: "English", langCardEnSub: "Learn and practice in English",
    continueBtn: "الانتقال إلى التطبيق",
    heroTitle: "تعلّموا الذكاء الاصطناعي بوتيرتكم",
    heroSub: "تعرّفوا وتدرّبوا وادمجوا أدوات الذكاء الاصطناعي في عملكم التعليمي",
    startTrack: "بدء مسار التعلّم",
    viewTools: "عرض كل الأدوات",
    quickPractice: "تدريب سريع",
    login: "تسجيل الدخول",
    nav_home: "الرئيسية", nav_catalog: "دليل الأدوات", nav_academy: "الأكاديمية",
    nav_lab: "مختبر الأوامر", nav_achievements: "الإنجازات", nav_admin: "الإدارة",
    onboardTitle: "بضعة أسئلة لبناء مسار شخصي لك",
    onboardRole: "ما هو دورك؟",
    role_teacher: "معلّم/ة", role_coach: "منسّق/ة تكنولوجيا", role_principal: "مدير/ة",
    role_mentor: "مرشد/ة تربوي/ة", role_trainer: "مدرّب/ة دورة",
    onboardSubject: "ما هو مجال تخصصك؟",
    subj_math: "رياضيات", subj_lang: "لغات", subj_science: "علوم",
    subj_social: "علوم اجتماعية", subj_art: "فنون", subj_other: "أخرى",
    onboardGrade: "أي صفوف تُدرّس؟",
    grade_low: "ابتدائي", grade_mid: "إعدادي", grade_high: "ثانوي", grade_all: "كل المراحل",
    onboardLevel: "ما هو مستوى خبرتك في الذكاء الاصطناعي؟",
    level_new: "مبتدئ/ة", level_some: "لدي بعض الخبرة", level_pro: "مستخدم/ة متمرّس/ة",
    onboardGoal: "ماذا تريدون أن تتعلّموا؟",
    goal_prompts: "كتابة الأوامر (Prompts)", goal_lessons: "إعداد خطط الدروس",
    goal_slides: "إنشاء عروض تقديمية", goal_images: "إنشاء صور",
    goal_tests: "بناء اختبارات ومهام", goal_feedback: "تقييم وتغذية راجعة",
    goal_ethics: "استخدام مسؤول وأخلاقي", goal_time: "توفير الوقت",
    onboardTime: "كم من الوقت لديك أسبوعياً؟",
    time_low: "حتى 30 دقيقة", time_mid: "30–60 دقيقة", time_high: "ساعة فأكثر",
    finishOnboard: "بناء مسار شخصي",
    dashHello: "مرحباً",
    dashProgress: "التقدّم في المسار",
    dashNext: "الدرس التالي",
    dashDaily: "مهمة يومية",
    dashChallenge: "تحدّي الأسبوع",
    dashChallengeText: "أنشئوا أمراً لإعداد نشاط افتتاحي لدرسكم",
    dashContinue: "المتابعة من حيث توقفت",
    dashFavTools: "الأدوات المفضّلة",
    dashBadges: "الأوسمة المكتسبة",
    catalogTitle: "دليل أدوات الذكاء الاصطناعي",
    catalogSub: "أدوات واردة في الدليل التربوي الرسمي لوزارة التربية",
    catalogSourceNote: "المصدر الرسمي: دليل وزارة التربية",
    searchPlaceholder: "بحث ذكي — مثال: \"أداة لإنشاء عرض تقديمي\"",
    filterAll: "الكل",
    filterFree: "مجاني", filterPaid: "مدفوع",
    filterStudent: "مناسب للطلاب", filterTeacher: "مناسب للمعلمين",
    approved: "معتمد من وزارة التربية",
    needsCheck: "يجب التحقق في دليل وزارة التربية",
    lastVerified: "آخر تحقق",
    ages: "الأعمار المسموحة",
    parentApproval: "يتطلب موافقة الأهل",
    registrationReq: "يتطلب تسجيلاً",
    freePlan: "نسخة مجانية",
    langsSupported: "اللغات المدعومة",
    learnMore: "تعرّفوا على الأداة",
    startPractice: "ابدأوا التدريب",
    officialPage: "الصفحة الرسمية في الدليل",
    addFav: "إضافة للمفضلة",
    removeFav: "إزالة من المفضلة",
    demoBadge: "بيانات تجريبية — تتطلب التحقق من الدليل الرسمي",
    toolAbout: "تعرّف على الأداة",
    toolStrengths: "فوائد للمعلمين",
    toolLimits: "القيود",
    toolStartGuide: "دليل البدء",
    toolPedagogy: "أفكار للاستخدام التربوي",
    toolChecklist: "نقاط للتحقق قبل الاستخدام في الصف",
    check1: "التحقق من موثوقية المعلومة",
    check2: "عدم إدخال معلومات شخصية أو حساسة",
    check3: "التحقق من التحيّز في الناتج",
    check4: "تكييف الناتج مع عمر الطلاب",
    check5: "تحرير الناتج قبل الاستخدام",
    check6: "الإشارة لاستخدام الذكاء الاصطناعي عند الحاجة",
    check7: "التحقق من شروط الاستخدام وموافقة الأهل",
    academyTitle: "أكاديمية الذكاء الاصطناعي للمعلمين",
    academySub: "مسار تعلّم قصير ومتدرّج، وحدة تلو الأخرى",
    unitLocked: "تُفتح الوحدة بعد إتمام السابقة",
    unitComplete: "مكتملة",
    unitStart: "بدء",
    unitContinue: "متابعة",
    markComplete: "وضع علامة كمكتمل",
    labTitle: "مختبر الأوامر",
    labSub: "اكتبوا أمراً واحصلوا على تغذية راجعة فورية لتحسينه",
    labSubjectField: "المجال",
    labGradeField: "الصف",
    labGoalField: "هدف الأمر",
    labOutputField: "لغة الناتج",
    labWrite: "اكتبوا الأمر هنا...",
    labAnalyze: "تحليل الأمر",
    labScore: "الدرجة الإجمالية",
    labClarity: "الوضوح",
    labGoalScore: "تحديد الهدف",
    labAudience: "الملاءمة للجمهور",
    labFormat: "صيغة الناتج",
    labSafety: "السلامة والخصوصية",
    labSuggestions: "اقتراحات للتحسين",
    labImproved: "نسخة محسّنة",
    labPrivacyWarn: "الرجاء عدم إدخال معلومات شخصية أو حساسة عن الطلاب أو الأهل أو الطاقم",
    labSave: "حفظ في المكتبة",
    labTryAgain: "تعديل والمحاولة مجدداً",
    achievementsTitle: "الإنجازات والأوسمة",
    achievementsSub: "كل وسام يمثّل خطوة حقيقية نحو استخدام آمن وناضج للذكاء الاصطناعي",
    pointsLabel: "النقاط",
    streakLabel: "أيام التعلّم المتتالية",
    tasksDone: "المهام المكتملة",
    earned: "تم الحصول عليه",
    locked: "لم يُحصَّل بعد",
    adminTitle: "واجهة إدارة الأدوات",
    adminSub: "إضافة وتعديل وإزالة أدوات الذكاء الاصطناعي — وفقاً للدليل الرسمي",
    adminAddTool: "إضافة أداة جديدة",
    adminEdit: "تعديل",
    adminDelete: "إزالة",
    adminActive: "نشطة",
    adminInactive: "غير نشطة",
    adminConfirmLabel: "أؤكّد أن المعلومات تم التحقق منها مقابل الدليل التربوي الرسمي لوزارة التربية",
    adminSaveChanges: "حفظ التغييرات",
    adminCancel: "إلغاء",
    adminName: "اسم الأداة",
    adminDesc: "وصف موجز",
    adminUrl: "رابط الصفحة الرسمية في الدليل",
    adminAges: "الأعمار المسموحة",
    adminLastVerified: "تاريخ آخر تحقق",
    footerResponsible: "استخدام مسؤول وآمن للذكاء الاصطناعي",
    footerPrivacy: "سياسة الخصوصية",
    footerAccessibility: "بيان إمكانية الوصول",
    footerNote: "قد يتم تحديث إرشادات وزارة التربية وقائمة الأدوات المعتمدة. يُرجى التحقق من المعلومات المحدثة في الدليل الرسمي قبل أي نشاط مع الطلاب.",
    responsibleLinkText: "إلى الدليل الرسمي لوزارة التربية",
    encourage1: "لنبدأ",
    encourage2: "أحسنتم، أكملتم المهمة",
    langMenuLabel: "اللغة",
  },
  en: {
    dir: "ltr",
    font: "'Rubik', 'Heebo', sans-serif",
    appName: "TEACHER_AI",
    appTag: "Learn, practice, and teach smart",
    chooseLangTitle: "Choose your app language",
    chooseLangSub: "You can change the language anytime from the top menu",
    langCardHe: "עברית", langCardHeSub: "למידה ותרגול בעברית",
    langCardAr: "العربية", langCardArSub: "التعلّم والتدرّب باللغة العربية",
    langCardEn: "English", langCardEnSub: "Learn and practice in English",
    continueBtn: "Continue to app",
    heroTitle: "Learn AI at your own pace",
    heroSub: "Get to know, practice, and apply AI tools in your teaching",
    startTrack: "Start a learning track",
    viewTools: "Browse all tools",
    quickPractice: "Quick practice",
    login: "Sign in",
    nav_home: "Home", nav_catalog: "Tool Catalog", nav_academy: "Academy",
    nav_lab: "Prompt Lab", nav_achievements: "Achievements", nav_admin: "Admin",
    onboardTitle: "A few questions to build your personal track",
    onboardRole: "What's your role?",
    role_teacher: "Teacher", role_coach: "Tech Coordinator", role_principal: "Principal",
    role_mentor: "Pedagogical Mentor", role_trainer: "Course Facilitator",
    onboardSubject: "What's your subject area?",
    subj_math: "Math", subj_lang: "Languages", subj_science: "Science",
    subj_social: "Social Studies", subj_art: "Art", subj_other: "Other",
    onboardGrade: "Which grade levels do you teach?",
    grade_low: "Elementary", grade_mid: "Middle School", grade_high: "High School", grade_all: "All levels",
    onboardLevel: "What's your AI experience level?",
    level_new: "Just starting", level_some: "Some experience", level_pro: "Experienced user",
    onboardGoal: "What would you like to learn?",
    goal_prompts: "Writing prompts", goal_lessons: "Building lesson plans",
    goal_slides: "Creating presentations", goal_images: "Creating images",
    goal_tests: "Building tests & tasks", goal_feedback: "Assessment & feedback",
    goal_ethics: "Responsible & ethical use", goal_time: "Saving time",
    onboardTime: "How much free time do you have weekly?",
    time_low: "Up to 30 min", time_mid: "30–60 min", time_high: "1 hour+",
    finishOnboard: "Build my track",
    dashHello: "Hello",
    dashProgress: "Track progress",
    dashNext: "Next lesson",
    dashDaily: "Daily task",
    dashChallenge: "Weekly challenge",
    dashChallengeText: "Create a prompt for an opening activity for your lesson",
    dashContinue: "Continue where I left off",
    dashFavTools: "Favorite tools",
    dashBadges: "Badges earned",
    catalogTitle: "AI Tool Catalog",
    catalogSub: "Tools listed in the official Ministry of Education catalog",
    catalogSourceNote: "Official source: Ministry of Education catalog",
    searchPlaceholder: "Smart search — e.g. \"a tool for creating a presentation\"",
    filterAll: "All",
    filterFree: "Free", filterPaid: "Paid",
    filterStudent: "Suitable for students", filterTeacher: "Suitable for teachers",
    approved: "Ministry-approved",
    needsCheck: "Check the Ministry catalog",
    lastVerified: "Last verified",
    ages: "Allowed ages",
    parentApproval: "Parental approval required",
    registrationReq: "Registration required",
    freePlan: "Free plan available",
    langsSupported: "Supported languages",
    learnMore: "Learn about this tool",
    startPractice: "Start practicing",
    officialPage: "Official catalog page",
    addFav: "Add to favorites",
    removeFav: "Remove from favorites",
    demoBadge: "Demo data — requires verification against the official catalog",
    toolAbout: "About this tool",
    toolStrengths: "Benefits for teachers",
    toolLimits: "Limitations",
    toolStartGuide: "Getting started",
    toolPedagogy: "Pedagogical use ideas",
    toolChecklist: "Checklist before classroom use",
    check1: "Check the reliability of the information",
    check2: "Don't enter personal or sensitive details",
    check3: "Check the output for bias",
    check4: "Adapt the output to students' age",
    check5: "Edit the output before use",
    check6: "Disclose AI use when required",
    check7: "Check terms of use and parental approval",
    academyTitle: "AI Academy for Teachers",
    academySub: "A short, graded learning track, unit by unit",
    unitLocked: "Unlocks after completing the previous unit",
    unitComplete: "Completed",
    unitStart: "Start",
    unitContinue: "Continue",
    markComplete: "Mark as complete",
    labTitle: "Prompt Lab",
    labSub: "Write a prompt and get instant feedback to improve it",
    labSubjectField: "Subject",
    labGradeField: "Grade level",
    labGoalField: "Prompt goal",
    labOutputField: "Output language",
    labWrite: "Write your prompt here...",
    labAnalyze: "Analyze prompt",
    labScore: "Overall score",
    labClarity: "Clarity",
    labGoalScore: "Goal definition",
    labAudience: "Audience fit",
    labFormat: "Output format",
    labSafety: "Safety & privacy",
    labSuggestions: "Suggestions for improvement",
    labImproved: "Improved version",
    labPrivacyWarn: "Please don't enter personal, sensitive, or identifying information about students, parents, or staff",
    labSave: "Save to library",
    labTryAgain: "Edit and try again",
    achievementsTitle: "Achievements & Badges",
    achievementsSub: "Every badge marks a real step toward safe, mature AI use",
    pointsLabel: "Points",
    streakLabel: "Day streak",
    tasksDone: "Tasks completed",
    earned: "Earned",
    locked: "Not yet earned",
    adminTitle: "Tool Management",
    adminSub: "Add, edit, and remove AI tools in the catalog — per the official source",
    adminAddTool: "Add new tool",
    adminEdit: "Edit",
    adminDelete: "Remove",
    adminActive: "Active",
    adminInactive: "Inactive",
    adminConfirmLabel: "I confirm this information has been checked against the official Ministry of Education catalog",
    adminSaveChanges: "Save changes",
    adminCancel: "Cancel",
    adminName: "Tool name",
    adminDesc: "Short description",
    adminUrl: "Official catalog page link",
    adminAges: "Allowed ages",
    adminLastVerified: "Last verified date",
    footerResponsible: "Safe & Responsible AI Use",
    footerPrivacy: "Privacy Policy",
    footerAccessibility: "Accessibility Statement",
    footerNote: "Ministry of Education guidance and the list of approved tools may be updated. Check the official catalog for current information before any activity with students.",
    responsibleLinkText: "Go to the official Ministry of Education catalog",
    encourage1: "Let's get started",
    encourage2: "Well done, you completed the task",
    langMenuLabel: "Language",
  },
};

const OFFICIAL_CATALOG_URL = "https://ecat.education.gov.il/toolsandgames";

/* ------------------------------ Demo data ------------------------------ */
/* All demo tools are explicitly flagged as requiring verification against
   the official Ministry of Education catalog — per the brief, no tool is
   ever presented as approved based on demo data alone. */

const DEMO_TOOLS = [
  {
    id: "t1",
    name: "Gemini",
    category: "lessons",
    free: true,
    teacher: true,
    student: true,
    parentApproval: false,
    registration: true,
    ages: "12+",
    langs: ["he", "en", "ar"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי ליצירת רעיונות, כתיבה, תכנון שיעורים, ניסוח פרומפטים ובניית תכנים לימודיים.",
      ar: "أداة لتوليد الأفكار، الكتابة، تخطيط الدروس، صياغة البرومبتات وبناء محتوى تعليمي.",
      en: "A tool for idea generation, writing, lesson planning, prompt design, and educational content creation."
    }
  },
  {
    id: "t2",
    name: "NotebookLM",
    category: "lessons",
    free: true,
    teacher: true,
    student: true,
    parentApproval: false,
    registration: true,
    ages: "12+",
    langs: ["he", "en", "ar"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי לעבודה עם מקורות מידע, סיכום מסמכים, השוואת טקסטים, בניית שאלות ותוצרי למידה.",
      ar: "أداة للعمل مع مصادر المعلومات، تلخيص المستندات، مقارنة النصوص، وبناء أسئلة ومنتجات تعلم.",
      en: "A tool for working with sources, summarizing documents, comparing texts, and generating learning materials."
    }
  },
  {
    id: "t3",
    name: "Nano Banana",
    category: "images",
    free: true,
    teacher: true,
    student: false,
    parentApproval: false,
    registration: true,
    ages: "מורים בלבד",
    langs: ["he", "en", "ar"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי ליצירת תמונות, המחשות חזותיות ועיצוב חומרים לימודיים בצורה יצירתית ומהירה.",
      ar: "أداة لإنشاء الصور، الشروحات البصرية وتصميم مواد تعليمية بشكل إبداعي وسريع.",
      en: "A tool for creating images, visual explanations, and educational designs quickly and creatively."
    }
  },
  {
    id: "t4",
    name: "Gems",
    category: "lessons",
    free: true,
    teacher: true,
    student: false,
    parentApproval: false,
    registration: true,
    ages: "מורים בלבד",
    langs: ["he", "en", "ar"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי ליצירת עוזרי AI מותאמים אישית לצרכים פדגוגיים, מקצועיים וארגוניים.",
      ar: "أداة لإنشاء مساعدين مخصصين بالذكاء الاصطناعي وفق احتياجات تربوية ومهنية وتنظيمية.",
      en: "A tool for creating custom AI assistants for pedagogical, professional, and organizational needs."
    }
  },
  {
    id: "t5",
    name: "MagicSchool",
    category: "lessons",
    free: true,
    teacher: true,
    student: false,
    parentApproval: false,
    registration: true,
    ages: "מורים בלבד",
    langs: ["en"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי ליצירת משימות, מערכי שיעור, רעיונות להוראה, משוב וחומרי למידה למורים.",
      ar: "أداة لإنتاج مهام، خطط دروس، أفكار تعليمية، تغذية راجعة ومواد تعليمية للمعلمين.",
      en: "A tool for generating assignments, lesson plans, teaching ideas, feedback, and teacher materials."
    }
  },
  {
    id: "t6",
    name: "Canva",
    category: "slides",
    free: true,
    teacher: true,
    student: true,
    parentApproval: false,
    registration: true,
    ages: "12+",
    langs: ["he", "en", "ar"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי לעיצוב מצגות, דפי עבודה, פוסטרים, סרטונים ותוצרים חזותיים ללמידה.",
      ar: "أداة لتصميم عروض، أوراق عمل، ملصقات، فيديوهات ومنتجات بصرية للتعلم.",
      en: "A tool for designing presentations, worksheets, posters, videos, and visual learning products."
    }
  },
  {
    id: "t7",
    name: "Gamma",
    category: "slides",
    free: true,
    teacher: true,
    student: false,
    parentApproval: false,
    registration: true,
    ages: "מורים בלבד",
    langs: ["en"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי ליצירת מצגות ודפי תוכן באופן מהיר, חזותי ואינטראקטיבי.",
      ar: "أداة لإنشاء عروض وصفحات محتوى بسرعة وبشكل بصري وتفاعلي.",
      en: "A tool for creating presentations and visual interactive content quickly."
    }
  },
  {
    id: "t8",
    name: "Brisk Teaching",
    category: "feedback",
    free: true,
    teacher: true,
    student: false,
    parentApproval: false,
    registration: true,
    ages: "מורים בלבד",
    langs: ["en"],
    lastVerified: "2026-07-15",
    desc: {
      he: "כלי לסיוע במשוב, התאמת טקסטים, יצירת שאלות, תכנון והנגשת חומרים.",
      ar: "أداة للمساعدة في التغذية الراجعة، تكييف النصوص، إنشاء الأسئلة وتخطيط المواد.",
      en: "A tool for feedback, adapting texts, generating questions, planning, and scaffolding materials."
    }
  }
];



const UNITS = [
  { id: "u1", title: { he: "מהי בינה מלאכותית?", ar: "ما هو الذكاء الاصطناعي؟", en: "What is AI?" },
    desc: { he: "הסבר פשוט על AI יוצר, והבדלים מול מנוע חיפוש רגיל.", ar: "شرح مبسّط للذكاء الاصطناعي التوليدي والفرق عن محرك بحث عادي.", en: "A simple explanation of generative AI and how it differs from a search engine." } },
  { id: "u2", title: { he: "כתיבת פרומפטים", ar: "كتابة الأوامر", en: "Writing prompts" },
    desc: { he: "המבנה: תפקיד + מטרה + הקשר + קהל יעד + דרישות + פורמט.", ar: "البنية: الدور + الهدف + السياق + الجمهور + المتطلبات + الصيغة.", en: "The structure: role + goal + context + audience + requirements + format." } },
  { id: "u3", title: { he: "שיפור פרומפט", ar: "تحسين الأمر", en: "Improving a prompt" },
    desc: { he: "תרגול הפיכת פרומפט חלש לפרומפט מדויק ומועיל.", ar: "تدريب على تحويل أمر ضعيف إلى أمر دقيق ومفيد.", en: "Practice turning a weak prompt into a precise, useful one." } },
  { id: "u4", title: { he: "AI לתכנון שיעור", ar: "الذكاء الاصطناعي لتخطيط الدرس", en: "AI for lesson planning" },
    desc: { he: "מטרות, פתיחה, גוף שיעור, סיכום והתאמות לרמות שונות.", ar: "أهداف، افتتاحية، متن الدرس، خاتمة، وتكييفات لمستويات مختلفة.", en: "Goals, opening, lesson body, wrap-up, and adaptations for different levels." } },
  { id: "u5", title: { he: "AI ליצירת תכנים", ar: "الذكاء الاصطناعي لإنشاء المحتوى", en: "AI for content creation" },
    desc: { he: "דפי עבודה, מצגות, תמונות, סיפורים ומשחקים.", ar: "أوراق عمل، عروض تقديمية، صور، قصص وألعاب.", en: "Worksheets, presentations, images, stories, and games." } },
  { id: "u6", title: { he: "אתיקה, פרטיות ואחריות", ar: "الأخلاقيات والخصوصية والمسؤولية", en: "Ethics, privacy & responsibility" },
    desc: { he: "מידע אישי, זכויות יוצרים, הטיות, הזיות AI ושקיפות.", ar: "المعلومات الشخصية، حقوق النشر، التحيّز، هلوسات الذكاء الاصطناعي، والشفافية.", en: "Personal data, copyright, bias, AI hallucinations, and transparency." } },
];

const BADGES = [
  { id: "b1", name: { he: "הצעד הראשון ב-AI", ar: "الخطوة الأولى في الذكاء الاصطناعي", en: "First step in AI" }, icon: Sparkles },
  { id: "b2", name: { he: "כותב/ת פרומפטים", ar: "كاتب/ة أوامر", en: "Prompt writer" }, icon: Wand2 },
  { id: "b3", name: { he: "שומר/ת פרטיות", ar: "حارس/ة الخصوصية", en: "Privacy guardian" }, icon: ShieldCheck },
  { id: "b4", name: { he: "יוצר/ת שיעורים", ar: "منشئ/ة دروس", en: "Lesson creator" }, icon: BookOpen },
  { id: "b5", name: { he: "אלוף/ת האתיקה", ar: "بطل/ة الأخلاقيات", en: "Ethics champion" }, icon: Award },
  { id: "b6", name: { he: "מוביל/ת חדשנות", ar: "رائد/ة الابتكار", en: "Innovation leader" }, icon: Trophy },
];

/* -------------------------------- Helpers ------------------------------- */

function cx(...a) { return a.filter(Boolean).join(" "); }

function scorePrompt(text) {
  const len = text.trim().length;
  const hasAudience = /תלמיד|כיתה|שכבה|صف|طلاب|student|grade|class/i.test(text);
  const hasFormat = /טבלה|רשימה|פורמט|جدول|قائمة|format|table|list/i.test(text);
  const hasGoal = /מטרה|כדי|هدف|من أجل|goal|so that|in order/i.test(text);
  const clarity = Math.min(100, 30 + Math.floor(len / 3));
  const goal = hasGoal ? 90 : 45;
  const audience = hasAudience ? 90 : 40;
  const format = hasFormat ? 85 : 50;
  const safety = /שם|ת.ז|תעודת זהות|اسم|هوية|name:|id:/i.test(text) ? 30 : 95;
  const overall = Math.round((clarity + goal + audience + format + safety) / 5);
  return { overall, clarity, goal, audience, format, safety };
}

/* ------------------------------ UI atoms ------------------------------- */

function Pill({ children, tone = "lilac" }) {
  const tones = {
    lilac: "bg-[#EFE6FC] text-[#6B4FA0]",
    pink: "bg-[#FCE4EE] text-[#B0507E]",
    mint: "bg-[#DEF5EA] text-[#2F8F63]",
    sky: "bg-[#E1F3FA] text-[#2C86A6]",
    vanilla: "bg-[#FFF3D0] text-[#9C7A17]",
    gray: "bg-[#F0EDEA] text-[#6B6570]",
  };
  return <span className={cx("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-[28px] bg-white border border-[#EEE8F7] shadow-[0_8px_30px_rgba(120,100,150,0.08)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(120,100,150,0.12)] hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#CDBCF6] to-[#CBEAF6] text-[#4A4550] hover:opacity-95 shadow-sm",
    secondary:
      "bg-white border border-[#E7DFF4] text-[#6B4FA0] hover:bg-[#F8F5FE]",
    ghost:
      "bg-transparent text-[#6B6570] hover:bg-[#F5F2FA]",
    mint:
      "bg-[#CFEFE1] text-[#2F6E4E] hover:opacity-95",
  };

  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:-translate-y-[1px]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full rounded-full bg-[#F0EBF8] overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#C9B6F2] via-[#F6C9DA] to-[#B9E9D6] transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ------------------------------- Screens -------------------------------- */

function LangSelectScreen({ onPick }) {
  const cards = [
    { code: "he", title: T.he.langCardHe, sub: T.he.langCardHeSub },
    { code: "ar", title: T.he.langCardAr, sub: T.he.langCardArSub },
    { code: "en", title: T.he.langCardEn, sub: T.he.langCardEnSub },
  ];
  const [sel, setSel] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#F7EFFF,transparent_28%),radial-gradient(circle_at_80%_15%,#EAF7FF,transparent_28%),radial-gradient(circle_at_50%_85%,#EEF9F1,transparent_24%),linear-gradient(180deg,#FCFAFF_0%,#F7F4FB_100%)] px-4">
      <div className="w-full max-w-5xl">
        <div className="mx-auto max-w-3xl">
          <Card className="rounded-[36px] border border-[#EEE8F7] bg-white/90 backdrop-blur-sm shadow-[0_18px_60px_rgba(120,100,150,0.10)] px-6 py-8 md:px-10 md:py-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#CDBCF6] via-[#CBEAF6] to-[#CFEFE1] shadow-[0_10px_30px_rgba(120,100,150,0.16)]">
              <Sparkles className="text-white" size={34} />
            </div>

            <div className="text-center">
              <h1
                className="text-3xl md:text-5xl font-extrabold text-[#453A5C] leading-tight"
                style={{ fontFamily: "Rubik, Heebo, sans-serif" }}
              >
                בחרו את שפת האפליקציה
              </h1>

              <p className="mt-4 text-base md:text-xl text-[#7E738E] leading-relaxed">
                ניתן לשנות את השפה בכל עת דרך התפריט העליון
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {cards.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSel(c.code)}
                  className={cx(
                    "group rounded-[28px] border-2 bg-white p-6 text-center transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(120,100,150,0.12)]",
                    sel === c.code
                      ? "border-[#CDBCF6] bg-[#FAF7FF] shadow-[0_12px_30px_rgba(120,100,150,0.10)]"
                      : "border-[#EFE8F6] hover:border-[#DCCFF7]"
                  )}
                >
                  <div
                    className={cx(
                      "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
                      c.code === "he" && "bg-[#F3ECFF] text-[#7A5BC2]",
                      c.code === "ar" && "bg-[#EAF7FF] text-[#3F8DB1]",
                      c.code === "en" && "bg-[#EEF9F1] text-[#4C9A72]"
                    )}
                  >
                    <Globe size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div
                    className={cx(
                      "font-bold text-xl mb-2",
                      c.code === "he" && "text-[#5D4692]",
                      c.code === "ar" && "text-[#346F8E]",
                      c.code === "en" && "text-[#3D7B5A]"
                    )}
                    dir={c.code === "en" ? "ltr" : "rtl"}
                  >
                    {c.title}
                  </div>

                  <div
                    className="text-sm md:text-base text-[#7E738E] leading-relaxed"
                    dir={c.code === "en" ? "ltr" : "rtl"}
                  >
                    {c.sub}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                variant="primary"
                onClick={() => sel && onPick(sel)}
                className={cx(
                  "min-w-[220px] text-base md:text-lg px-8 py-3.5 shadow-[0_10px_24px_rgba(120,100,150,0.12)]",
                  !sel && "opacity-50 cursor-not-allowed hover:translate-y-0"
                )}
                disabled={!sel}
              >
                המשך לאפליקציה
                <ArrowLeft size={18} />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TopNav({ lang, setLang, screen, setScreen, t, dir }) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { id: "home", label: t.nav_home, icon: Home },
    { id: "catalog", label: t.nav_catalog, icon: LayoutGrid },
    { id: "academy", label: t.nav_academy, icon: GraduationCap },
    { id: "lab", label: t.nav_lab, icon: FlaskConical },
    { id: "achievements", label: t.nav_achievements, icon: Award },
    { id: "admin", label: t.nav_admin, icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#EEE8F7] bg-white/85 backdrop-blur-md shadow-[0_6px_24px_rgba(120,100,150,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <button
          onClick={() => setScreen("home")}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CDBCF6] via-[#CBEAF6] to-[#CFEFE1] shadow-[0_8px_24px_rgba(120,100,150,0.14)]">
            <Sparkles size={20} className="text-white" />
          </div>

          <div className="hidden sm:block text-start">
            <div className="text-base font-extrabold text-[#453A5C] leading-tight">
              {t.appName}
            </div>
            <div className="text-xs text-[#8A8097] leading-tight">
              {t.appTag}
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1 rounded-2xl border border-[#EEE8F7] bg-[#FCFAFF] p-1 shadow-sm">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => setScreen(it.id)}
              className={cx(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                screen === it.id
                  ? "bg-[#EFE6FC] text-[#654A9E] shadow-sm"
                  : "text-[#7B7189] hover:bg-[#F7F3FC] hover:text-[#5E4B82]"
              )}
            >
              <it.icon size={16} />
              <span>{it.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9E2F4] bg-white text-[#6B4FA0] transition-colors hover:bg-[#F8F5FE]"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DFF4] bg-[#F3ECFF] text-sm font-bold text-[#6B4FA0] shadow-sm">
            N
          </div>

          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E7DFF4] bg-white px-3 py-2 text-sm font-medium text-[#654A9E] transition-colors hover:bg-[#F8F4FE]"
            >
              <Globe size={16} />
              <span>
                {lang === "he" ? "עברית" : lang === "ar" ? "العربية" : "English"}
              </span>
            </button>

            {langOpen && (
              <div
                className={cx(
                  "absolute mt-2 min-w-[150px] rounded-2xl border border-[#EEE8F7] bg-white p-1 shadow-[0_12px_30px_rgba(120,100,150,0.14)]",
                  dir === "rtl" ? "left-0" : "right-0"
                )}
              >
                {["he", "ar", "en"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-start text-sm text-[#453A5C] transition-colors hover:bg-[#F5F2FA]"
                    dir={l === "en" ? "ltr" : "rtl"}
                  >
                    {l === "he" ? "עברית" : l === "ar" ? "العربية" : "English"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9E2F4] bg-white text-[#6B4FA0] transition-colors hover:bg-[#F8F5FE] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[#F0EBF8] bg-white px-4 pb-4 pt-3 lg:hidden">
          <div className="flex flex-col gap-2">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => {
                  setScreen(it.id);
                  setMenuOpen(false);
                }}
                className={cx(
                  "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-all",
                  screen === it.id
                    ? "border-[#DCCFF7] bg-[#EFE6FC] text-[#654A9E]"
                    : "border-[#EFE8F6] bg-white text-[#7B7189] hover:bg-[#F8F5FE]"
                )}
              >
                <it.icon size={17} />
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HomeScreen({ t, dir, setScreen, loggedIn, setLoggedIn }) {
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const highlights = [
    {
      title: "היכרות עם כלים",
      text: "גישה מהירה לכלים נבחרים לשילוב בהוראה, תכנון ויצירת תוצרים.",
      tone: "from-[#F3ECFF] to-[#EAF7FF]",
    },
    {
      title: "תרגול מעשי",
      text: "מעבר מהיכרות להתנסות באמצעות פעילויות, מעבדה ומשימות קצרות.",
      tone: "from-[#EEF9F1] to-[#F7FCEB]",
    },
    {
      title: "שימוש פדגוגי",
      text: "התאמת הכלים לצורכי מורים, מקצועות לימוד ושכבות גיל שונות.",
      tone: "from-[#FFF4E8] to-[#FDEAF1]",
    },
  ];

  return (
    <div className="pb-16">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-10 md:grid-cols-2 md:px-6 lg:pt-16">
        <div>
          <Pill tone="mint">
            <Sparkles size={14} />
            {t.appTag}
          </Pill>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#453A5C] md:text-6xl">
            {t.heroTitle}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#7A7386] md:text-xl">
            {t.heroSub}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => setScreen(loggedIn ? "dashboard" : "onboarding")}>
              {t.startTrack}
              <Arrow size={18} />
            </Button>

            <Button variant="secondary" onClick={() => setScreen("catalog")}>
              {t.viewTools}
            </Button>

            <Button variant="mint" onClick={() => setScreen("lab")}>
              {t.quickPractice}
            </Button>

            {!loggedIn && (
              <Button variant="ghost" onClick={() => setLoggedIn(true)}>
                {t.login}
              </Button>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, idx) => (
              <Card
                key={idx}
                className={`rounded-[28px] border border-[#EEE8F7] bg-gradient-to-br ${item.tone} p-5 shadow-[0_10px_28px_rgba(120,100,150,0.08)]`}
              >
                <div className="text-base font-bold text-[#453A5C]">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-[#6F6880]">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-4 h-24 w-24 rounded-full bg-[#EFDFFF] blur-2xl opacity-70" />
          <div className="absolute -bottom-8 right-0 h-24 w-24 rounded-full bg-[#DDF2FF] blur-2xl opacity-70" />

          <Card className="relative overflow-hidden rounded-[36px] border border-[#EEE8F7] bg-white/90 p-6 md:p-8 shadow-[0_20px_50px_rgba(120,100,150,0.12)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[#8A8097]">
                  מרחב AI למורים
                </div>
                <div className="mt-1 text-2xl font-extrabold text-[#453A5C]">
                  למידה, תרגול ושיתוף
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CDBCF6] via-[#CBEAF6] to-[#CFEFE1] shadow-[0_10px_24px_rgba(120,100,150,0.14)]">
                <Sparkles size={26} className="text-white" />
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl border border-[#EEE8F7] bg-[#FCFAFF] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#8A8097]">כלים מובילים</div>
                    <div className="mt-1 text-lg font-bold text-[#453A5C]">
                      Gemini · NotebookLM · Nano Banana · Gems
                    </div>
                  </div>
                  <div className="rounded-full bg-[#EEF9F1] px-3 py-1 text-xs font-semibold text-[#4B8A67]">
                    פעיל
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#EEE8F7] bg-[#F8F4FE] p-5">
                  <div className="text-sm text-[#8A8097]">קטלוג כלים</div>
                  <div className="mt-2 text-3xl font-extrabold text-[#654A9E]">
                    8
                  </div>
                  <div className="mt-2 text-sm text-[#6F6880]">
                    כלים נבחרים להוראה, תכנון ויצירת תוצרים
                  </div>
                </div>

                <div className="rounded-3xl border border-[#EEE8F7] bg-[#EEF9F1] p-5">
                  <div className="text-sm text-[#6E8B78]">מוקדי שימוש</div>
                  <div className="mt-2 text-3xl font-extrabold text-[#4B8A67]">
                    4
                  </div>
                  <div className="mt-2 text-sm text-[#6F6880]">
                    תכנון, כתיבה, תמונות, תרגול והערכה
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-[#DCCFF7] bg-white p-5">
                <div className="text-sm text-[#8A8097]">המלצה להתחלה</div>
                <div className="mt-2 text-base font-bold text-[#453A5C]">
                  התחילי מהקטלוג, שמרי כלים למועדפים, ואז עברי למעבדת הפרומפטים.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

const ROLE_KEYS = ["role_teacher", "role_coach", "role_principal", "role_mentor", "role_trainer"];
const SUBJ_KEYS = ["subj_math", "subj_lang", "subj_science", "subj_social", "subj_art", "subj_other"];
const GRADE_KEYS = ["grade_low", "grade_mid", "grade_high", "grade_all"];
const LEVEL_KEYS = ["level_new", "level_some", "level_pro"];
const GOAL_KEYS = ["goal_prompts", "goal_lessons", "goal_slides", "goal_images", "goal_tests", "goal_feedback", "goal_ethics", "goal_time"];
const TIME_KEYS = ["time_low", "time_mid", "time_high"];

function OnboardingScreen({ t, dir, onFinish }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({ role: "", subject: "", grade: "", level: "", goals: [], time: "" });
  const steps = [
    { key: "role", q: t.onboardRole, opts: ROLE_KEYS, multi: false },
    { key: "subject", q: t.onboardSubject, opts: SUBJ_KEYS, multi: false },
    { key: "grade", q: t.onboardGrade, opts: GRADE_KEYS, multi: false },
    { key: "level", q: t.onboardLevel, opts: LEVEL_KEYS, multi: false },
    { key: "goals", q: t.onboardGoal, opts: GOAL_KEYS, multi: true },
    { key: "time", q: t.onboardTime, opts: TIME_KEYS, multi: false },
  ];
  const cur = steps[step];
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  function toggle(key, val, multi) {
    setAns((a) => {
      if (multi) {
        const arr = a[key] || [];
        return { ...a, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
      }
      return { ...a, [key]: val };
    });
  }

  const isSelected = (key, val) => (Array.isArray(ans[key]) ? ans[key].includes(val) : ans[key] === val);
  const canNext = cur.multi ? (ans[cur.key] || []).length > 0 : !!ans[cur.key];

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-extrabold text-[#453A5C] mb-2 text-center">{t.onboardTitle}</h2>
      <div className="mb-8"><ProgressBar value={((step + 1) / steps.length) * 100} /></div>
      <Card className="p-8">
        <div className="font-bold text-lg text-[#453A5C] mb-5">{cur.q}</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {cur.opts.map((k) => (
            <button
              key={k}
              onClick={() => toggle(cur.key, k, cur.multi)}
              className={cx(
                "flex items-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-medium text-start transition-colors",
                isSelected(cur.key, k) ? "border-[#B9A0E8] bg-[#F8F4FE] text-[#6B4FA0]" : "border-[#F0EBF8] text-[#5C5568] hover:bg-[#FAF8FD]"
              )}
            >
              {isSelected(cur.key, k) ? <CheckCircle2 size={18} className="shrink-0" /> : <Circle size={18} className="shrink-0 text-[#D8D0E8]" />}
              {t[k]}
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled={step === 0} style={{ opacity: step === 0 ? 0.3 : 1 }} onClick={() => setStep((s) => Math.max(0, s - 1))}>
            {dir === "rtl" ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
          {step < steps.length - 1 ? (
            <Button disabled={!canNext} style={{ opacity: canNext ? 1 : 0.4 }} onClick={() => setStep((s) => s + 1)}>
              <Arrow size={16} />
            </Button>
          ) : (
            <Button disabled={!canNext} style={{ opacity: canNext ? 1 : 0.4 }} onClick={() => onFinish(ans)}>
              {t.finishOnboard} <Arrow size={16} />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function DashboardScreen({ t, dir, profile, progress, favorites, setScreen, openTool }) {
  const overallPct = Math.round((progress.completedUnits.length / UNITS.length) * 100);
  const nextUnit = UNITS.find((u) => !progress.completedUnits.includes(u.id)) || UNITS[UNITS.length - 1];
  const favTools = DEMO_TOOLS.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="text-sm text-[#8B849A]">{t.dashHello}{profile?.role ? `, ${t[profile.role]}` : ""} 👋</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-[#453A5C]">{t.dashProgress}</span>
            <span className="text-sm font-semibold text-[#6B4FA0]">{overallPct}%</span>
          </div>
          <div className="mt-2"><ProgressBar value={overallPct} /></div>
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#FAF8FD] p-4">
            <div>
              <div className="text-xs text-[#8B849A] mb-1">{t.dashNext}</div>
              <div className="font-semibold text-[#453A5C]">{nextUnit.title[dashLang(dir)]}</div>
            </div>
            <Button onClick={() => setScreen("academy")}>{t.dashContinue}</Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#FFF3D0] to-[#FCE4EE] border-none">
          <div className="flex items-center gap-2 mb-2 font-bold text-[#7A5A1E]"><Flame size={18} /> {t.dashChallenge}</div>
          <p className="text-sm text-[#7A5A1E]">{t.dashChallengeText}</p>
          <Button variant="secondary" className="mt-4" onClick={() => setScreen("lab")}>{t.quickPractice}</Button>
        </Card>

        <Card className="p-6">
          <div className="font-bold text-[#453A5C] mb-4">{t.dashFavTools}</div>
          {favTools.length === 0 ? (
            <div className="text-sm text-[#8B849A]">—</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {favTools.map((tool) => (
                <button key={tool.id} onClick={() => openTool(tool.id)} className="text-start rounded-2xl border border-[#F0EBF8] p-4 hover:bg-[#FAF8FD]">
                  <div className="font-semibold text-[#453A5C]">{tool.name}</div>
                  <div className="text-xs text-[#8B849A] mt-1">{tool.desc[dashLang(dir)]}</div>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6 text-center">
          <div className="text-xs text-[#8B849A] mb-1">{t.pointsLabel}</div>
          <div className="text-3xl font-extrabold text-[#6B4FA0]">{progress.points}</div>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div>
              <div className="font-bold text-[#453A5C]">{progress.streak}</div>
              <div className="text-xs text-[#8B849A]">{t.streakLabel}</div>
            </div>
            <div>
              <div className="font-bold text-[#453A5C]">{progress.completedUnits.length}</div>
              <div className="text-xs text-[#8B849A]">{t.tasksDone}</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="font-bold text-[#453A5C] mb-3">{t.dashBadges}</div>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((b) => {
              const earned = progress.badges.includes(b.id);
              return (
                <div key={b.id} className={cx("flex flex-col items-center gap-1 rounded-2xl p-3 text-center", earned ? "bg-[#F8F4FE]" : "opacity-40")}>
                  <b.icon size={20} className={earned ? "text-[#6B4FA0]" : "text-[#B5AEC4]"} />
                  <div className="text-[10px] leading-tight text-[#5C5568]">{b.name[dashLang(dir)]}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
// small helper to map dir->lang key for demo copy (he/ar both rtl, distinguish via lang passed separately in real code paths)
function dashLang(dir) { return dir === "rtl" ? "he" : "en"; }

const CATEGORY_LABEL = {
  slides: { he: "מצגות", ar: "عروض تقديمية", en: "Presentations" },
  lessons: { he: "תכנון הוראה", ar: "تخطيط تعليمي", en: "Teaching Planning" },
  images: { he: "תמונות והמחשות", ar: "صور وتوضيحات", en: "Images & Visuals" },
  tests: { he: "מבחנים והערכה", ar: "اختبارات وتقييم", en: "Tests & Assessment" },
  video: { he: "וידאו", ar: "فيديو", en: "Video" },
  feedback: { he: "משוב", ar: "تغذية راجعة", en: "Feedback" },
  worksheets: { he: "דפי עבודה", ar: "أوراق عمل", en: "Worksheets" },
  games: { he: "משחקים לימודיים", ar: "ألعاب تعليمية", en: "Learning Games" },
};

function ToolCard({ tool, t, lang, isFav, onToggleFav, onOpen })
 {  const iconTone =
    tool.name === "Gemini"
      ? "bg-[#F3ECFF] text-[#7557B8]"
      : tool.name === "NotebookLM"
      ? "bg-[#EAF7FF] text-[#4E88B7]"
      : tool.name === "Nano Banana"
      ? "bg-[#EEF9F1] text-[#4F916C]"
      : tool.name === "Gems"
      ? "bg-[#FFF4D8] text-[#B08A2A]"
      : tool.name === "MagicSchool"
      ? "bg-[#FDEAF1] text-[#B85F85]"
      : tool.name === "Canva"
      ? "bg-[#EAF4FF] text-[#4D7BB8]"
      : tool.name === "Gamma"
      ? "bg-[#F7EDFF] text-[#8B5FB6]"
      : "bg-[#F4F1FA] text-[#6E5A91]";

  return (
    <Card className="group overflow-hidden rounded-[30px] border border-[#EEE8F7] bg-white p-5 shadow-[0_10px_28px_rgba(120,100,150,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(120,100,150,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold shadow-sm ${iconTone}`}
        >
          {tool.name.charAt(0)}
        </div>

        <button
          onClick={() => onToggleFav(tool.id)}
          title={isFav ? t.removeFav : t.addFav}
          className="rounded-2xl border border-[#E9E2F4] bg-white p-2.5 transition-colors hover:bg-[#F8F5FE]"
        >
          <Star
            size={18}
            className={isFav ? "fill-[#FFD27A] text-[#FFD27A]" : "text-[#B8A7D8]"}
          />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-extrabold text-[#453A5C]">
          {tool.name}
        </h3>

        <p className="mt-2 min-h-[72px] text-sm leading-7 text-[#7E738E]">
          {tool.desc?.[lang] || tool.desc?.he || tool.desc?.en}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill tone="lilac">
          {CATEGORY_LABEL[tool.category]?.[lang] || tool.category}
        </Pill>

        {tool.free ? (
          <Pill tone="mint">{t.freePlan}</Pill>
        ) : (
          <Pill tone="gray">{t.filterPaid}</Pill>
        )}

        {tool.teacher && <Pill tone="sky">מתאים למורים</Pill>}

        {tool.parentApproval && <Pill tone="pink">{t.parentApproval}</Pill>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#F8F4FE] px-3 py-1 text-xs font-medium text-[#6F5B91]">
          גיל: {tool.ages}
        </span>

        <span className="rounded-full bg-[#F5FAFF] px-3 py-1 text-xs font-medium text-[#5E88A8]">
          {t.lastVerified}: {tool.lastVerified}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Button className="flex-1" onClick={() => onOpen(tool.id)}>
          {t.learnMore}
        </Button>
      </div>
    </Card>
  );
}

function CatalogScreen({ t, lang, favorites, toggleFav, openTool, tools }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      if (!tool.active && tool.active !== undefined) return false;
      if (filter === "free" && !tool.free) return false;
      if (filter === "paid" && tool.free) return false;
      if (filter === "student" && !tool.student) return false;
      if (filter === "teacher" && !tool.teacher) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = (
          tool.name +
          " " +
          ((tool.desc && (tool.desc[lang] || tool.desc.he || tool.desc.en)) || "") +
          " " +
          tool.category
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tools, filter, query, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-[#453A5C]">{t.catalogTitle}</h1>
          <p className="text-sm text-[#8B849A]">{t.catalogSub}</p>
        </div>
        <a href={OFFICIAL_CATALOG_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-[#6B4FA0] hover:underline">
          <ExternalLink size={15} /> {t.catalogSourceNote}
        </a>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-4 text-[#B5AEC4]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-2xl border-2 border-[#F0EBF8] bg-white ps-11 pe-4 py-3 text-sm focus:outline-none focus:border-[#C9B6F2]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ["all", t.filterAll], ["free", t.filterFree], ["paid", t.filterPaid],
            ["student", t.filterStudent], ["teacher", t.filterTeacher],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={cx("px-4 py-2 rounded-xl text-sm font-medium border-2", filter === k ? "border-[#B9A0E8] bg-[#F8F4FE] text-[#6B4FA0]" : "border-[#F0EBF8] bg-white text-[#8B849A]")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-[#A79FB5]">
        <AlertCircle size={13} /> {t.demoBadge}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
       {filtered.map((tool) => (
  <ToolCard
    key={tool.id}
    tool={tool}
    t={t}
    lang={lang}
    isFav={favorites.includes(tool.id)}
    onToggleFav={toggleFav}
    onOpen={openTool}
  />
))}
      </div>
    </div>
  );
}

function ToolDetailScreen({ t, lang, tool, isFav, toggleFav, setScreen }) {
  if (!tool) return null;

  const checklist = [t.check1, t.check2, t.check3, t.check4, t.check5, t.check6, t.check7];
  const pedagogyIdeas = {
    he: [
      "הכנת פעילות פתיחה",
      "יצירת שאלות הבנה",
      "התאמת טקסט לרמות שונות",
      "בניית מחוון הערכה",
      "יצירת דפי עבודה",
    ],
    ar: [
      "إعداد نشاط افتتاحي",
      "إنشاء أسئلة فهم",
      "تكييف النص لمستويات مختلفة",
      "بناء معيار تقييم",
      "إعداد أوراق عمل",
    ],
    en: [
      "Creating an opening activity",
      "Generating comprehension questions",
      "Adapting text to different levels",
      "Building an assessment rubric",
      "Creating worksheets",
    ],
  };

  const iconTone =
    tool.name === "Gemini"
      ? "bg-[#F3ECFF] text-[#7557B8]"
      : tool.name === "NotebookLM"
      ? "bg-[#EAF7FF] text-[#4E88B7]"
      : tool.name === "Nano Banana"
      ? "bg-[#EEF9F1] text-[#4F916C]"
      : tool.name === "Gems"
      ? "bg-[#FFF4D8] text-[#B08A2A]"
      : tool.name === "MagicSchool"
      ? "bg-[#FDEAF1] text-[#B85F85]"
      : tool.name === "Canva"
      ? "bg-[#EAF4FF] text-[#4D7BB8]"
      : tool.name === "Gamma"
      ? "bg-[#F7EDFF] text-[#8B5FB6]"
      : "bg-[#F4F1FA] text-[#6E5A91]";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <button
        onClick={() => setScreen("catalog")}
        className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-[#E8E1F2] bg-white px-4 py-2 text-sm font-medium text-[#6B4FA0] transition-colors hover:bg-[#F8F5FE]"
      >
        {lang === "en" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        {t.catalogTitle}
      </button>

      <Card className="overflow-hidden rounded-[34px] border border-[#EEE8F7] bg-white p-6 shadow-[0_18px_50px_rgba(120,100,150,0.10)] md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] text-3xl font-bold shadow-sm ${iconTone}`}
            >
              {tool.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#453A5C] md:text-4xl">
                {tool.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="lilac">
                  {CATEGORY_LABEL[tool.category]?.[lang] || tool.category}
                </Pill>

                {tool.free ? (
                  <Pill tone="mint">{t.freePlan}</Pill>
                ) : (
                  <Pill tone="gray">{t.filterPaid}</Pill>
                )}

                {tool.teacher && <Pill tone="sky">מתאים למורים</Pill>}

                {tool.parentApproval && <Pill tone="pink">{t.parentApproval}</Pill>}
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleFav(tool.id)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E9E2F4] bg-white transition-colors hover:bg-[#F8F5FE]"
            title={isFav ? t.removeFav : t.addFav}
          >
            <Star
              size={22}
              className={isFav ? "fill-[#FFD27A] text-[#FFD27A]" : "text-[#B8A7D8]"}
            />
          </button>
        </div>

        <p className="mt-8 max-w-4xl text-base leading-8 text-[#6F6880] md:text-lg">
          {tool.desc?.[lang] || tool.desc?.he || tool.desc?.en}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-[#FAF8FD] px-4 py-3">
            <div className="text-xs font-medium text-[#8B849A]">גיל יעד</div>
            <div className="mt-1 text-sm font-bold text-[#453A5C]">{tool.ages}</div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FD] px-4 py-3">
            <div className="text-xs font-medium text-[#8B849A]">נבדק לאחרונה</div>
            <div className="mt-1 text-sm font-bold text-[#453A5C]">{tool.lastVerified}</div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FD] px-4 py-3">
            <div className="text-xs font-medium text-[#8B849A]">שפות</div>
            <div className="mt-1 text-sm font-bold text-[#453A5C]">
              {tool.langs?.join(" · ")}
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAF8FD] px-4 py-3">
            <div className="text-xs font-medium text-[#8B849A]">הרשמה</div>
            <div className="mt-1 text-sm font-bold text-[#453A5C]">
              {tool.registration ? "נדרש" : "לא נדרש"}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#EEE8F7] bg-[#FCFAFF] p-6">
            <h3 className="text-lg font-extrabold text-[#453A5C]">{t.toolPedagogy}</h3>
            <ul className="mt-4 space-y-3">
              {(pedagogyIdeas[lang] || pedagogyIdeas.en).map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#6F6880]">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#69A47F]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#EEE8F7] bg-[#FCFAFF] p-6">
            <h3 className="text-lg font-extrabold text-[#453A5C]">{t.toolChecklist}</h3>
            <ul className="mt-4 space-y-3">
              {checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#6F6880]">
                  <ShieldCheck size={18} className="mt-1 shrink-0 text-[#7A5BC2]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={() => setScreen("lab")}>{t.startPractice}</Button>

          <a href={OFFICIAL_CATALOG_URL} target="_blank" rel="noreferrer">
            <Button variant="secondary">
              <ExternalLink size={15} />
              {t.officialPage}
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}

function AcademyScreen({ t, lang, dir, progress, completeUnit }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#453A5C]">{t.academyTitle}</h1>
      <p className="text-sm text-[#8B849A]">{t.academySub}</p>

      <div className="mt-8 relative">
        <div className={cx("absolute top-0 bottom-0 w-0.5 border-s-2 border-dashed border-[#E4DAF7]", dir === "rtl" ? "start-[27px]" : "start-[27px]")} />
        <div className="space-y-5">
          {UNITS.map((u, idx) => {
            const done = progress.completedUnits.includes(u.id);
            const prevDone = idx === 0 || progress.completedUnits.includes(UNITS[idx - 1].id);
            const locked = !prevDone && !done;
            return (
              <div key={u.id} className="flex gap-4 items-start relative">
                <div className={cx("h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center font-bold z-10",
                  done ? "bg-[#B9E9D6] text-[#2F6E4E]" : locked ? "bg-[#F0EDEA] text-[#B5AEC4]" : "bg-[#EFE6FC] text-[#6B4FA0]")}>
                  {done ? <CheckCircle2 size={22} /> : locked ? <Lock size={18} /> : idx + 1}
                </div>
                <Card className={cx("flex-1 p-5", locked && "opacity-60")}>
                  <div className="font-bold text-[#453A5C]">{u.title[lang]}</div>
                  <div className="text-sm text-[#8B849A] mt-1">{u.desc[lang]}</div>
                  <div className="mt-3">
                    {locked ? (
                      <span className="text-xs text-[#A79FB5] flex items-center gap-1"><Lock size={12} /> {t.unitLocked}</span>
                    ) : done ? (
                      <Pill tone="mint"><CheckCircle2 size={12} /> {t.unitComplete}</Pill>
                    ) : (
                      <Button variant="secondary" onClick={() => completeUnit(u.id)}>{t.markComplete}</Button>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PromptLabScreen({ t, lang }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [subject, setSubject] = useState(SUBJ_KEYS[0]);
  const [grade, setGrade] = useState(GRADE_KEYS[0]);
  const [goal, setGoal] = useState(GOAL_KEYS[0]);
  const [outLang, setOutLang] = useState(lang);

  function analyze() {
    if (!text.trim()) return;
    setResult(scorePrompt(text));
  }

  const improved = useMemo(() => {
    if (!result) return "";
    const subj = t[subject], gr = t[grade];
    if (lang === "he") return `שמש/י בתפקיד מורה ל${subj}, כתוב/כתבי פעילות פתיחה קצרה עבור תלמידי ${gr}, במטרה לעורר עניין בנושא השיעור. הצג/י את הפלט כרשימה של 3 שלבים, בשפה פשוטה ומעודדת, ללא פרטים אישיים על תלמידים.`;
    if (lang === "ar") return `بصفتك معلّم/ة ${subj}، اكتب/ي نشاطاً افتتاحياً قصيراً لطلاب ${gr}، بهدف إثارة الاهتمام بموضوع الدرس. اعرض/ي الناتج كقائمة من 3 خطوات، بلغة بسيطة ومشجعة، دون أي معلومات شخصية عن الطلاب.`;
    return `As a ${subj} teacher, write a short opening activity for ${gr} students, aiming to spark interest in the lesson topic. Present the output as a 3-step list, in simple, encouraging language, with no personal student details.`;
  }, [result, subject, grade, lang, t]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#453A5C]">{t.labTitle}</h1>
      <p className="text-sm text-[#8B849A]">{t.labSub}</p>

      <Card className="p-6 mt-6">
        <div className="grid sm:grid-cols-4 gap-3 mb-4">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl border-2 border-[#F0EBF8] px-3 py-2 text-sm">
            {SUBJ_KEYS.map((k) => <option key={k} value={k}>{t[k]}</option>)}
          </select>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="rounded-xl border-2 border-[#F0EBF8] px-3 py-2 text-sm">
            {GRADE_KEYS.map((k) => <option key={k} value={k}>{t[k]}</option>)}
          </select>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="rounded-xl border-2 border-[#F0EBF8] px-3 py-2 text-sm">
            {GOAL_KEYS.map((k) => <option key={k} value={k}>{t[k]}</option>)}
          </select>
          <select value={outLang} onChange={(e) => setOutLang(e.target.value)} className="rounded-xl border-2 border-[#F0EBF8] px-3 py-2 text-sm">
            <option value="he">עברית</option><option value="ar">العربية</option><option value="en">English</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#B0507E] bg-[#FCE4EE] rounded-xl px-3 py-2 mb-3">
          <AlertCircle size={13} /> {t.labPrivacyWarn}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.labWrite}
          rows={5}
          className="w-full rounded-2xl border-2 border-[#F0EBF8] p-4 text-sm focus:outline-none focus:border-[#C9B6F2]"
        />
        <Button className="mt-4" onClick={analyze}>{t.labAnalyze}</Button>

        {result && (
          <div className="mt-6 border-t border-[#F0EBF8] pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#C9B6F2] to-[#B9E9D6] flex items-center justify-center text-white font-extrabold text-lg">
                {result.overall}
              </div>
              <div className="font-bold text-[#453A5C]">{t.labScore}</div>
            </div>
            <div className="grid sm:grid-cols-5 gap-3 text-center text-xs">
              {[["labClarity", result.clarity], ["labGoalScore", result.goal], ["labAudience", result.audience], ["labFormat", result.format], ["labSafety", result.safety]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#FAF8FD] p-3">
                  <div className="font-bold text-[#453A5C]">{v}</div>
                  <div className="text-[#8B849A] mt-1">{t[k]}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-bold text-[#453A5C] mb-2">{t.labImproved}</div>
              <div className="rounded-2xl bg-[#F8F4FE] p-4 text-sm text-[#453A5C]">{improved}</div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="mint">{t.labSave}</Button>
              <Button variant="secondary" onClick={() => setResult(null)}>{t.labTryAgain}</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function AchievementsScreen({ t, lang, progress }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#453A5C]">{t.achievementsTitle}</h1>
      <p className="text-sm text-[#8B849A]">{t.achievementsSub}</p>

      <div className="grid sm:grid-cols-3 gap-5 mt-6">
        <Card className="p-6 text-center"><div className="text-3xl font-extrabold text-[#6B4FA0]">{progress.points}</div><div className="text-xs text-[#8B849A] mt-1">{t.pointsLabel}</div></Card>
        <Card className="p-6 text-center"><div className="text-3xl font-extrabold text-[#6B4FA0] flex items-center justify-center gap-1"><Flame size={22} className="text-[#F0A868]" />{progress.streak}</div><div className="text-xs text-[#8B849A] mt-1">{t.streakLabel}</div></Card>
        <Card className="p-6 text-center"><div className="text-3xl font-extrabold text-[#6B4FA0]">{progress.completedUnits.length}</div><div className="text-xs text-[#8B849A] mt-1">{t.tasksDone}</div></Card>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {BADGES.map((b) => {
          const earned = progress.badges.includes(b.id);
          return (
            <Card key={b.id} className={cx("p-5 flex items-center gap-3", !earned && "opacity-50")}>
              <div className={cx("h-12 w-12 rounded-2xl flex items-center justify-center", earned ? "bg-[#EFE6FC]" : "bg-[#F0EDEA]")}>
                <b.icon size={20} className={earned ? "text-[#6B4FA0]" : "text-[#B5AEC4]"} />
              </div>
              <div>
                <div className="font-semibold text-[#453A5C] text-sm">{b.name[lang]}</div>
                <div className="text-xs text-[#A79FB5]">{earned ? t.earned : t.locked}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AdminScreen({ t, lang, tools, setTools }) {
  const [editing, setEditing] = useState(null); // tool object or "new"
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [form, setForm] = useState({ name: "", descEn: "", url: "", ages: "", lastVerified: "" });

  function startEdit(tool) {
    setEditing(tool);
    setForm({
      name: tool.name, descEn: tool.desc.en, url: OFFICIAL_CATALOG_URL,
      ages: tool.ages, lastVerified: tool.lastVerified,
    });
    setConfirmChecked(false);
  }
  function startNew() {
    setEditing("new");
    setForm({ name: "", descEn: "", url: "", ages: "", lastVerified: new Date().toISOString().slice(0, 10) });
    setConfirmChecked(false);
  }
  function save() {
    if (!confirmChecked) return;
    if (editing === "new") {
      const id = "t" + (tools.length + 1) + "_" + Date.now();
      setTools([...tools, {
        id, name: form.name || "New Tool", category: "lessons", free: true, teacher: true, student: false,
        parentApproval: false, registration: false, ages: form.ages || "—", langs: ["he", "en"],
        lastVerified: form.lastVerified || new Date().toISOString().slice(0, 10),
        desc: { he: form.descEn, ar: form.descEn, en: form.descEn }, active: true,
      }]);
    } else {
      setTools(tools.map((tl) => tl.id === editing.id ? {
        ...tl, name: form.name, ages: form.ages, lastVerified: form.lastVerified,
        desc: { ...tl.desc, en: form.descEn },
      } : tl));
    }
    setEditing(null);
  }
  function toggleActive(id) {
    setTools(tools.map((tl) => tl.id === id ? { ...tl, active: tl.active === false ? true : false } : tl));
  }
  function remove(id) {
    setTools(tools.filter((tl) => tl.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#453A5C]">{t.adminTitle}</h1>
          <p className="text-sm text-[#8B849A]">{t.adminSub}</p>
        </div>
        <Button onClick={startNew}><Plus size={16} /> {t.adminAddTool}</Button>
      </div>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-start text-[#8B849A] border-b border-[#F0EBF8]">
              <th className="p-4 text-start">{t.adminName}</th>
              <th className="p-4 text-start">{t.lastVerified}</th>
              <th className="p-4 text-start">{t.adminActive}</th>
              <th className="p-4 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tl) => (
              <tr key={tl.id} className="border-b border-[#F7F4FB]">
                <td className="p-4 font-medium text-[#453A5C]">{tl.name}</td>
                <td className="p-4 text-[#8B849A]">{tl.lastVerified}</td>
                <td className="p-4">
                  <button onClick={() => toggleActive(tl.id)}>
                    <Pill tone={tl.active === false ? "gray" : "mint"}>{tl.active === false ? t.adminInactive : t.adminActive}</Pill>
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(tl)} className="p-2 rounded-lg hover:bg-[#F5F2FA]"><Pencil size={15} className="text-[#6B4FA0]" /></button>
                    <button onClick={() => remove(tl.id)} className="p-2 rounded-lg hover:bg-[#FCE4EE]"><Trash2 size={15} className="text-[#B0507E]" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg text-[#453A5C]">{editing === "new" ? t.adminAddTool : t.adminEdit}</div>
              <button onClick={() => setEditing(null)}><X size={18} className="text-[#8B849A]" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#8B849A]">{t.adminName}</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border-2 border-[#F0EBF8] px-3 py-2 mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs text-[#8B849A]">{t.adminDesc}</label>
                <textarea value={form.descEn} onChange={(e) => setForm({ ...form, descEn: e.target.value })} rows={3} className="w-full rounded-xl border-2 border-[#F0EBF8] px-3 py-2 mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs text-[#8B849A]">{t.adminUrl}</label>
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder={OFFICIAL_CATALOG_URL} className="w-full rounded-xl border-2 border-[#F0EBF8] px-3 py-2 mt-1 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#8B849A]">{t.adminAges}</label>
                  <input value={form.ages} onChange={(e) => setForm({ ...form, ages: e.target.value })} className="w-full rounded-xl border-2 border-[#F0EBF8] px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#8B849A]">{t.adminLastVerified}</label>
                  <input type="date" value={form.lastVerified} onChange={(e) => setForm({ ...form, lastVerified: e.target.value })} className="w-full rounded-xl border-2 border-[#F0EBF8] px-3 py-2 mt-1 text-sm" />
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm text-[#5C5568] bg-[#FAF8FD] rounded-xl p-3 mt-2">
                <input type="checkbox" checked={confirmChecked} onChange={(e) => setConfirmChecked(e.target.checked)} className="mt-1" />
                {t.adminConfirmLabel}
              </label>
            </div>
            <div className="mt-5 flex gap-3">
              <Button disabled={!confirmChecked} style={{ opacity: confirmChecked ? 1 : 0.4 }} onClick={save}>{t.adminSaveChanges}</Button>
              <Button variant="secondary" onClick={() => setEditing(null)}>{t.adminCancel}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-[#F0EBF8] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-[#8B849A]">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          <span className="hover:text-[#6B4FA0] cursor-pointer">{t.footerResponsible}</span>
          <span className="hover:text-[#6B4FA0] cursor-pointer">{t.footerPrivacy}</span>
          <span className="hover:text-[#6B4FA0] cursor-pointer">{t.footerAccessibility}</span>
          <a href={OFFICIAL_CATALOG_URL} target="_blank" rel="noreferrer" className="text-[#6B4FA0] font-medium hover:underline flex items-center gap-1">
            <ExternalLink size={13} /> {t.responsibleLinkText}
          </a>
        </div>
        <p className="text-xs text-[#B0A9BE] max-w-3xl leading-relaxed">{t.footerNote}</p>
      </div>
    </footer>
  );
}

/* -------------------------------- Root App ------------------------------- */

export default function App() {
  useFontLoader();
  const [lang, setLang] = useState(null); // null until chosen
  const [screen, setScreen] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState(["t1", "t4"]);
  const [tools, setTools] = useState(DEMO_TOOLS.map((tl) => ({ ...tl, active: true })));
  const [activeToolId, setActiveToolId] = useState(null);
  const [progress, setProgress] = useState({ points: 120, streak: 3, completedUnits: ["u1"], badges: ["b1"] });

  const t = lang ? T[lang] : T.he;
  const dir = lang ? T[lang].dir : "rtl";

  function toggleFav(id) {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }
  function openTool(id) { setActiveToolId(id); setScreen("tool"); }
  function completeUnit(id) {
    setProgress((p) => {
      if (p.completedUnits.includes(id)) return p;
      const newBadges = [...p.badges];
      if (id === "u2" && !newBadges.includes("b2")) newBadges.push("b2");
      if (id === "u6" && !newBadges.includes("b5")) newBadges.push("b5");
      return { ...p, completedUnits: [...p.completedUnits, id], points: p.points + 20, badges: newBadges };
    });
  }
  function finishOnboarding(ans) {
    setProfile(ans);
    setLoggedIn(true);
    setScreen("dashboard");
  }

  if (!lang) {
    return <LangSelectScreen onPick={(l) => { setLang(l); setScreen("home"); }} />;
  }

  const activeTool = tools.find((tl) => tl.id === activeToolId);

  return (
    <div dir={dir} style={{ fontFamily: t.font }} className="min-h-screen bg-[#FBF8F3] text-[#453A5C]">
      <TopNav lang={lang} setLang={setLang} screen={screen} setScreen={setScreen} t={t} dir={dir} />

      {screen === "home" && <HomeScreen t={t} dir={dir} setScreen={setScreen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {screen === "onboarding" && <OnboardingScreen t={t} dir={dir} onFinish={finishOnboarding} />}
      {screen === "dashboard" && (
        loggedIn
          ? <DashboardScreen t={t} dir={dir} profile={profile} progress={progress} favorites={favorites} setScreen={setScreen} openTool={openTool} />
          : <OnboardingScreen t={t} dir={dir} onFinish={finishOnboarding} />
      )}
      {screen === "catalog" && <CatalogScreen t={t} lang={lang} favorites={favorites} toggleFav={toggleFav} openTool={openTool} tools={tools.filter(tl => tl.active !== false)} />}
      {screen === "tool" && <ToolDetailScreen t={t} lang={lang} tool={activeTool} isFav={favorites.includes(activeToolId)} toggleFav={toggleFav} setScreen={setScreen} />}
      {screen === "academy" && <AcademyScreen t={t} lang={lang} dir={dir} progress={progress} completeUnit={completeUnit} />}
      {screen === "lab" && <PromptLabScreen t={t} lang={lang} />}
      {screen === "achievements" && <AchievementsScreen t={t} lang={lang} progress={progress} />}
      {screen === "admin" && <AdminScreen t={t} lang={lang} tools={tools} setTools={setTools} />}

      <Footer t={t} />
    </div>
  );
}
