import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Subjects
  const python = await prisma.subject.upsert({
    where: { slug: "python" },
    update: {},
    create: { slug: "python", name: "Python", description: "Master Python from fundamentals to OOP.", icon: "Code", color: "#EAB308", order: 1 },
  });

  const javascript = await prisma.subject.upsert({
    where: { slug: "javascript" },
    update: {},
    create: { slug: "javascript", name: "JavaScript", description: "Learn JavaScript: variables, functions, DOM, async.", icon: "FileCode", color: "#F59E0B", order: 2 },
  });

  const htmlcss = await prisma.subject.upsert({
    where: { slug: "html-css" },
    update: {},
    create: { slug: "html-css", name: "HTML / CSS", description: "Build web pages with HTML and CSS.", icon: "Globe", color: "#F97316", order: 3 },
  });

  const sql = await prisma.subject.upsert({
    where: { slug: "sql" },
    update: {},
    create: { slug: "sql", name: "SQL", description: "Query databases with SQL.", icon: "Database", color: "#3B82F6", order: 4 },
  });

  const git = await prisma.subject.upsert({
    where: { slug: "git" },
    update: {},
    create: { slug: "git", name: "Git", description: "Version control with Git.", icon: "GitBranch", color: "#EF4444", order: 5 },
  });

  // Python Topics
  const pyTopics = [
    { slug: "data-types", title: "Data Types", emoji: "🔢", order: 1, difficulty: "beginner", description: "int, float, str, bool, None, bytes" },
    { slug: "collections", title: "Collections", emoji: "📋", order: 2, difficulty: "beginner", description: "list, tuple, set, dict, range" },
    { slug: "operators", title: "Operators", emoji: "+", order: 3, difficulty: "beginner", description: "Arithmetic, comparison, logical, bitwise" },
    { slug: "conditions", title: "Conditions", emoji: "🔀", order: 4, difficulty: "beginner", description: "if/elif/else, ternary, match/case" },
    { slug: "loops", title: "Loops", emoji: "🔄", order: 5, difficulty: "beginner", description: "for, while, break, continue" },
    { slug: "built-in-functions", title: "Built-in Functions", emoji: "🛠️", order: 6, difficulty: "beginner", description: "print, len, range, sorted, enumerate" },
    { slug: "user-defined-functions", title: "User-defined Functions", emoji: "✨", order: 7, difficulty: "beginner", description: "def, parameters, return, *args, **kwargs" },
    { slug: "lambda-functions", title: "Lambda Functions", emoji: "⚡", order: 8, difficulty: "intermediate", description: "Anonymous one-line functions" },
    { slug: "recursive-functions", title: "Recursive Functions", emoji: "🔄", order: 9, difficulty: "intermediate", description: "Functions that call themselves" },
    { slug: "higher-order-functions", title: "Higher-Order Functions", emoji: "🎯", order: 10, difficulty: "intermediate", description: "map, filter, reduce, decorators" },
    { slug: "generator-functions", title: "Generator Functions", emoji: "🔋", order: 11, difficulty: "intermediate", description: "yield, lazy sequences" },
    { slug: "closures", title: "Closures", emoji: "🔐", order: 12, difficulty: "advanced", description: "Inner functions with captured state" },
    { slug: "classes", title: "Classes & Instances", emoji: "🏗️", order: 13, difficulty: "intermediate", description: "class, __init__, self" },
    { slug: "inheritance", title: "Inheritance", emoji: "🧬", order: 14, difficulty: "intermediate", description: "super(), MRO, ABCs" },
    { slug: "magic-methods", title: "Magic Methods", emoji: "✨", order: 15, difficulty: "advanced", description: "__str__, __eq__, __len__" },
    { slug: "dataclasses", title: "Dataclasses", emoji: "📦", order: 16, difficulty: "advanced", description: "@dataclass, frozen, fields" },
  ];

  for (const t of pyTopics) {
    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: python.id, slug: t.slug } },
      update: {},
      create: { ...t, subjectId: python.id },
    });
  }

  // JavaScript Topics
  const jsTopics = [
    { slug: "variables", title: "Variables & Types", emoji: "📦", order: 1, difficulty: "beginner", description: "let, const, var, primitives" },
    { slug: "functions", title: "Functions", emoji: "⚡", order: 2, difficulty: "beginner", description: "Declaration, expressions, arrow" },
    { slug: "arrays-objects", title: "Arrays & Objects", emoji: "📋", order: 3, difficulty: "beginner", description: "Array methods, object destructuring" },
    { slug: "control-flow", title: "Control Flow", emoji: "🔀", order: 4, difficulty: "beginner", description: "if/else, switch, loops" },
    { slug: "dom", title: "DOM Manipulation", emoji: "🌐", order: 5, difficulty: "intermediate", description: "querySelector, events, attributes" },
    { slug: "events", title: "Events", emoji: "🎯", order: 6, difficulty: "intermediate", description: "addEventListener, delegation, bubbling" },
    { slug: "promises", title: "Promises", emoji: "🤝", order: 7, difficulty: "intermediate", description: "then, catch, Promise.all" },
    { slug: "async-await", title: "Async/Await", emoji: "⏱️", order: 8, difficulty: "advanced", description: "async functions, error handling" },
    { slug: "es6-features", title: "ES6+ Features", emoji: "🚀", order: 9, difficulty: "intermediate", description: "Destructuring, spread, template literals" },
    { slug: "modules", title: "Modules", emoji: "📦", order: 10, difficulty: "intermediate", description: "import, export, dynamic import" },
  ];

  for (const t of jsTopics) {
    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: javascript.id, slug: t.slug } },
      update: {},
      create: { ...t, subjectId: javascript.id },
    });
  }

  // HTML/CSS Topics
  const htmlTopics = [
    { slug: "elements", title: "Elements & Structure", emoji: "🏗️", order: 1, difficulty: "beginner", description: "Tags, attributes, semantic HTML" },
    { slug: "forms", title: "Forms & Inputs", emoji: "📝", order: 2, difficulty: "beginner", description: "input, select, textarea, validation" },
    { slug: "semantic", title: "Semantic HTML", emoji: "🏷️", order: 3, difficulty: "beginner", description: "header, nav, main, article, section" },
    { slug: "selectors", title: "CSS Selectors", emoji: "🎨", order: 4, difficulty: "beginner", description: "Class, ID, pseudo-classes, combinators" },
    { slug: "box-model", title: "Box Model", emoji: "📦", order: 5, difficulty: "beginner", description: "margin, padding, border, sizing" },
    { slug: "flexbox", title: "Flexbox", emoji: "📐", order: 6, difficulty: "intermediate", description: "Flex container, items, alignment" },
    { slug: "grid", title: "CSS Grid", emoji: "🔲", order: 7, difficulty: "intermediate", description: "Grid template, areas, responsive" },
    { slug: "responsive", title: "Responsive Design", emoji: "📱", order: 8, difficulty: "intermediate", description: "Media queries, mobile-first, units" },
  ];

  for (const t of htmlTopics) {
    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: htmlcss.id, slug: t.slug } },
      update: {},
      create: { ...t, subjectId: htmlcss.id },
    });
  }

  // SQL Topics
  const sqlTopics = [
    { slug: "select", title: "SELECT Queries", emoji: "🔍", order: 1, difficulty: "beginner", description: "SELECT, FROM, LIMIT, ORDER BY" },
    { slug: "where", title: "WHERE & Filtering", emoji: "🎯", order: 2, difficulty: "beginner", description: "WHERE, AND, OR, IN, BETWEEN, LIKE" },
    { slug: "joins", title: "JOINs", emoji: "🔗", order: 3, difficulty: "intermediate", description: "INNER, LEFT, RIGHT, FULL, CROSS" },
    { slug: "aggregation", title: "Aggregation", emoji: "📊", order: 4, difficulty: "intermediate", description: "GROUP BY, HAVING, COUNT, SUM, AVG" },
    { slug: "subqueries", title: "Subqueries", emoji: "📦", order: 5, difficulty: "advanced", description: "Nested queries, EXISTS, ANY, ALL" },
    { slug: "indexes", title: "Indexes & Performance", emoji: "⚡", order: 6, difficulty: "advanced", description: "CREATE INDEX, EXPLAIN, optimization" },
  ];

  for (const t of sqlTopics) {
    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: sql.id, slug: t.slug } },
      update: {},
      create: { ...t, subjectId: sql.id },
    });
  }

  // Git Topics
  const gitTopics = [
    { slug: "init-commits", title: "Init & Commits", emoji: "📝", order: 1, difficulty: "beginner", description: "git init, add, commit, status, log" },
    { slug: "branching", title: "Branching", emoji: "🌿", order: 2, difficulty: "beginner", description: "branch, checkout, switch" },
    { slug: "merging", title: "Merging", emoji: "🔀", order: 3, difficulty: "intermediate", description: "merge, conflicts, fast-forward" },
    { slug: "rebasing", title: "Rebasing", emoji: "📏", order: 4, difficulty: "advanced", description: "rebase, interactive, squash" },
    { slug: "workflows", title: "Workflows", emoji: "🔄", order: 5, difficulty: "advanced", description: "Git flow, trunk-based, PRs" },
  ];

  for (const t of gitTopics) {
    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: git.id, slug: t.slug } },
      update: {},
      create: { ...t, subjectId: git.id },
    });
  }

  // Badges
  const badgeData = [
    { slug: "first-lesson", name: "First Step", description: "Complete your first lesson", icon: "🎯", category: "milestone", criteria: { type: "lessons_completed", value: 1 }, xpBonus: 10 },
    { slug: "10-lessons", name: "Getting Started", description: "Complete 10 lessons", icon: "📚", category: "milestone", criteria: { type: "lessons_completed", value: 10 }, xpBonus: 25 },
    { slug: "50-lessons", name: "Scholar", description: "Complete 50 lessons", icon: "🎓", category: "milestone", criteria: { type: "lessons_completed", value: 50 }, xpBonus: 100 },
    { slug: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", category: "streak", criteria: { type: "streak", value: 7 }, xpBonus: 50 },
    { slug: "streak-14", name: "Fortnight Focus", description: "Maintain a 14-day streak", icon: "🔥", category: "streak", criteria: { type: "streak", value: 14 }, xpBonus: 100 },
    { slug: "streak-30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "🏆", category: "streak", criteria: { type: "streak", value: 30 }, xpBonus: 200 },
    { slug: "xp-1000", name: "XP Hunter", description: "Earn 1,000 total XP", icon: "⚡", category: "xp", criteria: { type: "xp", value: 1000 }, xpBonus: 50 },
    { slug: "xp-5000", name: "XP Legend", description: "Earn 5,000 total XP", icon: "💎", category: "xp", criteria: { type: "xp", value: 5000 }, xpBonus: 200 },
    { slug: "explorer", name: "Explorer", description: "Start 3 different subjects", icon: "🗺️", category: "milestone", criteria: { type: "subjects_started", value: 3 }, xpBonus: 30 },
    { slug: "polyglot", name: "Polyglot", description: "Start all 5 subjects", icon: "🌟", category: "milestone", criteria: { type: "subjects_started", value: 5 }, xpBonus: 100 },
    { slug: "python-10", name: "Python Apprentice", description: "Complete 10 Python lessons", icon: "🐍", category: "subject", criteria: { type: "subject_lessons", value: 10, subject: "python" }, xpBonus: 50 },
    { slug: "js-10", name: "JS Apprentice", description: "Complete 10 JavaScript lessons", icon: "🟨", category: "subject", criteria: { type: "subject_lessons", value: 10, subject: "javascript" }, xpBonus: 50 },
  ];

  for (const b of badgeData) {
    await prisma.badge.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        slug: b.slug,
        name: b.name,
        description: b.description,
        icon: b.icon,
        category: b.category,
        criteria: b.criteria,
        xpBonus: b.xpBonus,
      },
    });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
