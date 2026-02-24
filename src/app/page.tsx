"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { Menu, X, ArrowRight, BookOpen, Code, Lightbulb, Layers, Zap, ChevronUp } from "lucide-react";

const navLinks = [
  { label: "Table of contents", href: "#toc" },
  { label: "Function types", href: "#functions" },
  { label: "Summary", href: "#summary" },
];

const functionTypes = [
  {
    id: "built-in",
    title: "Built-in Functions",
    emoji: "🛠️",
    description: "Pre-made tools that come with Python, ready to use.",
    explanation: "Python ships with dozens of built-in functions. You don't install anything — they're always available. Use them for I/O (print, input), math (abs, round, min, max, sum), type checking (type, isinstance), working with collections (len, sorted, reversed, enumerate, zip), and more. They're optimized and well-tested, so prefer them over writing your own when they fit.",
    kidExplanation: "Like tools in a toolbox that comes with your house. print(), len(), max() are ready whenever you need them.",
    examples: [
      { title: "Output and collection size", code: `# Display text and get collection length\nprint("Hello!")                    # Hello!\nitems = ["apple", "banana", "cherry"]\nprint(len(items))                 # 3\nprint(len("python"))              # 6` },
      { title: "Math and aggregation", code: `# Min, max, sum — no loops needed\nscores = [85, 92, 78, 95, 88]\nprint(min(scores))                # 78\nprint(max(scores))                # 95\nprint(sum(scores))                # 438\nprint(round(3.14159, 2))          # 3.14\nprint(abs(-10))                   # 10` },
      { title: "Type and conversion", code: `# Inspect types and convert between them\nx = 42\nprint(type(x))                    # <class 'int'>\nprint(isinstance(x, int))         # True\nprint(str(42))                    # "42"\nprint(int("100"))                # 100\nprint(list("hi"))                 # ['h', 'i']` },
      { title: "Sorting, enumerating, zipping", code: `# Sort and iterate with index or multiple lists\nnames = ["Zoe", "Alice", "Bob"]\nprint(sorted(names))              # ['Alice', 'Bob', 'Zoe']\nfor i, name in enumerate(names):\n    print(i, name)                 # 0 Zoe, 1 Alice, 2 Bob\nids = [1, 2, 3]\nfor id, name in zip(ids, names):\n    print(id, name)                # 1 Zoe, 2 Alice, 3 Bob` },
    ],
  },
  {
    id: "user-defined",
    title: "User-defined Functions",
    emoji: "✨",
    description: "Functions you create yourself to structure and reuse logic.",
    explanation: "You define them with def. They can take no arguments or many, have default values, return one value or many (as a tuple), and include docstrings. Use them to avoid repeating code, to name a logical step, and to make programs easier to read and test. They're the main way you organize behavior in Python.",
    kidExplanation: "Your own recipe: you decide inputs, steps, and output. Write once, use again and again.",
    examples: [
      { title: "Basic function with parameters and return", code: `def greet(name):\n    """Return a greeting string."""\n    return f"Hello, {name}!"\n\nprint(greet("Alex"))               # Hello, Alex!` },
      { title: "Default arguments and multiple returns", code: `def describe(thing, uppercase=False):\n    text = f"It is: {thing}"\n    return text.upper() if uppercase else text\n\nprint(describe("a box"))         # It is: a box\nprint(describe("a box", True))   # IT IS: A BOX\n\ndef min_max(nums):\n    return min(nums), max(nums)\nlo, hi = min_max([3, 1, 4, 1, 5])\nprint(lo, hi)                     # 1 5` },
      { title: "Variable-length args: *args and **kwargs", code: `def sum_all(*numbers):\n    return sum(numbers)\nprint(sum_all(1, 2, 3, 4))        # 10\n\ndef make_profile(**info):\n    return info\nprint(make_profile(name="Sam", age=20))  # {'name': 'Sam', 'age': 20}` },
      { title: "Reusable validation and formatting", code: `def is_valid_email(s):\n    return "@" in s and "." in s and len(s) > 5\n\ndef format_price(amount):\n    return f"\${amount:.2f}"\n\nprint(is_valid_email("a@b.co"))   # True\nprint(format_price(19.5))         # $19.50` },
    ],
  },
  {
    id: "lambda",
    title: "Lambda Functions",
    emoji: "⚡",
    description: "Anonymous one-line functions for simple expressions.",
    explanation: "A lambda is a small function defined with a single expression. It can only contain that expression (no statements, no docstring). Use lambdas where you need a short callback: sorting (key=), map, filter, or passing a quick transformation. For anything longer or clearer with a name, use a normal def instead.",
    kidExplanation: "A quick note instead of a full letter. Perfect for simple one-line jobs.",
    examples: [
      { title: "Basic lambda: assign or pass inline", code: `square = lambda x: x ** 2\nadd = lambda a, b: a + b\nprint(square(5))                   # 25\nprint(add(3, 7))                 # 10` },
      { title: "Sorting with a key", code: `# Sort by length, then by last letter\nwords = ["apple", "pie", "banana", "cat"]\nby_length = sorted(words, key=lambda w: len(w))\nprint(by_length)                 # ['pie', 'cat', 'apple', 'banana']\nby_last = sorted(words, key=lambda w: w[-1])\nprint(by_last)                   # ['apple', 'pie', 'banana', 'cat']` },
      { title: "map and filter with lambda", code: `nums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, nums))\nprint(doubled)                   # [2, 4, 6, 8, 10]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)                    # [2, 4]` },
      { title: "Conditional expression in lambda", code: `# One-line if/else\nclassify = lambda n: "even" if n % 2 == 0 else "odd"\nprint(classify(4))               # even\nprint(classify(7))               # odd` },
    ],
  },
  {
    id: "recursive",
    title: "Recursive Functions",
    emoji: "🔄",
    description: "Functions that call themselves with a smaller problem until a base case.",
    explanation: "Recursion means the function calls itself. You must have a base case (when to stop) and a recursive case (call with a smaller or simpler input). Good for problems that are naturally self-similar: tree/graph traversal, factorials, Fibonacci, divide-and-conquer. Watch out for deep recursion (stack overflow) and consider iteration or tail recursion where it matters.",
    kidExplanation: "Like climbing stairs: take one step, then ask yourself to climb the rest until you reach the top.",
    examples: [
      { title: "Factorial", code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))              # 120  (5*4*3*2*1)` },
      { title: "Sum of a list recursively", code: `def sum_list(nums):\n    if not nums:\n        return 0\n    return nums[0] + sum_list(nums[1:])\n\nprint(sum_list([1, 2, 3, 4, 5])) # 15` },
      { title: "Countdown and tree-like thinking", code: `def countdown(n):\n    if n <= 0:\n        print("Go!")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)  # 3, 2, 1, Go!` },
      { title: "Fibonacci (nth number)", code: `def fib(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nprint([fib(i) for i in range(10)])  # [0,1,1,2,3,5,8,13,21,34]` },
    ],
  },
  {
    id: "higher-order",
    title: "Higher-Order Functions",
    emoji: "🎯",
    description: "Functions that take other functions as arguments or return functions.",
    explanation: "Higher-order functions treat functions as values. They might apply a function to every element (map), keep only elements that pass a test (filter), or combine a sequence into one value (reduce). You can also write functions that return new functions (e.g. decorators or factories). This style keeps code flexible and avoids duplication.",
    kidExplanation: "Managers that tell other functions what to do. They can receive or create functions.",
    examples: [
      { title: "map, filter, and a custom apply", code: `nums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(doubled)                   # [2, 4, 6, 8, 10]\nprint(evens)                    # [2, 4]\n\nfrom functools import reduce\nproduct = reduce(lambda a, b: a * b, nums)\nprint(product)                  # 120` },
      { title: "Function that takes a function", code: `def apply_twice(f, x):\n    return f(f(x))\n\ndouble = lambda x: x * 2\nprint(apply_twice(double, 5))    # 20  (5 -> 10 -> 20)` },
      { title: "Function that returns a function (factory)", code: `def make_multiplier(n):\n    def mul(x):\n        return x * n\n    return mul\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5))                 # 10\nprint(triple(5))                 # 15` },
      { title: "sorted with key function", code: `students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]\nby_score = sorted(students, key=lambda s: s[1], reverse=True)\nprint(by_score)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]` },
    ],
  },
  {
    id: "generator",
    title: "Generator Functions",
    emoji: "🔋",
    description: "Functions that yield values one at a time; they're lazy and memory-efficient.",
    explanation: "A generator function uses yield instead of return. Each yield produces one value and pauses; when you ask for the next value, it resumes. So you don't build a huge list in memory — you stream items. Use generators for large or infinite sequences, pipelines, or when you might stop early (e.g. search).",
    kidExplanation: "A bag that gives one candy at a time instead of dumping all. Great for big data.",
    examples: [
      { title: "Basic yield and iteration", code: `def count_up_to(n):\n    for i in range(n):\n        yield i\n\nfor x in count_up_to(3):\n    print(x)                      # 0, 1, 2` },
      { title: "Infinite sequence (no list in memory)", code: `def natural_numbers():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\ngen = natural_numbers()\nprint(next(gen), next(gen), next(gen))  # 0 1 2` },
      { title: "Fibonacci as a generator", code: `def fib_gen(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fib_gen(8)))          # [0, 1, 1, 2, 3, 5, 8, 13]` },
      { title: "Reading large file line by line", code: `def read_lines(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()\n\n# Use: for line in read_lines("big.txt"): ...` },
    ],
  },
  {
    id: "nested",
    title: "Nested Functions",
    emoji: "📦",
    description: "Functions defined inside another function; they're only visible there.",
    explanation: "You can put a def inside another def. The inner function can read the outer function's variables (closure). Use nested functions to hide helpers that only one outer function needs, or to build a function that returns another function (e.g. a configured callback).",
    kidExplanation: "Like nesting dolls: a function inside another. The inner one is hidden from the outside.",
    examples: [
      { title: "Inner function using outer variable", code: `def outer(msg):\n    def inner():\n        print(msg)\n    inner()\n\nouter("Hi!")                     # Hi!` },
      { title: "Helper only used inside one function", code: `def process(items):\n    def clean(s):\n        return s.strip().lower()\n    return [clean(x) for x in items]\n\nprint(process(["  HELLO  ", "  World  "]))  # ['hello', 'world']` },
      { title: "Returning the inner function", code: `def make_greeter(greeting):\n    def greet(name):\n        return f"{greeting}, {name}!"\n    return greet\n\nsay_hi = make_greeter("Hello")\nprint(say_hi("Alex"))            # Hello, Alex!` },
      { title: "Validation helpers inside one function", code: `def register(username, age):\n    def valid_name(s):\n        return len(s) >= 3 and s.isalpha()\n    def valid_age(a):\n        return 0 < a < 150\n    if not valid_name(username):\n        return "Invalid name"\n    if not valid_age(age):\n        return "Invalid age"\n    return "OK"\n\nprint(register("Ab", 25))       # Invalid name\nprint(register("Alice", 25))   # OK` },
    ],
  },
  {
    id: "closure",
    title: "Closure Functions",
    emoji: "🔐",
    description: "Inner functions that \"remember\" variables from the outer scope after it has finished.",
    explanation: "A closure is an inner function that captures variables from its enclosing function. When the outer function returns the inner function, that inner function still has access to those variables. Use closures for stateful callbacks, counters, configuration (e.g. greeters with a fixed greeting), or to encapsulate private state without classes.",
    kidExplanation: "A backpack the function carries: it remembers variables even after the outer function finishes.",
    examples: [
      { title: "Counter that remembers state", code: `def make_counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\n\nc = make_counter()\nprint(c(), c(), c())              # 1 2 3` },
      { title: "Configurable greeter", code: `def make_greeter(greeting, punctuation="!"):\n    def greet(name):\n        return f"{greeting}, {name}{punctuation}"\n    return greet\n\nhello = make_greeter("Hello")\nprint(hello("Sam"))               # Hello, Sam!` },
      { title: "Private state (no one else can change it)", code: `def make_bank_account(initial=0):\n    balance = initial\n    def deposit(amount):\n        nonlocal balance\n        balance += amount\n        return balance\n    def get_balance():\n        return balance\n    return deposit, get_balance\n\ndep, get = make_bank_account(100)\ndep(50)\nprint(get())                    # 150` },
      { title: "Event handler with captured config", code: `def make_click_handler(button_id):\n    count = 0\n    def on_click():\n        nonlocal count\n        count += 1\n        print(f"Button {button_id} clicked {count} times")\n    return on_click\n\nhandler = make_click_handler("submit")\nhandler()  # Button submit clicked 1 times\nhandler()  # Button submit clicked 2 times` },
    ],
  },
  {
    id: "methods",
    title: "Methods (Class Functions)",
    emoji: "👥",
    description: "Functions defined on a class; they operate on the instance (self) or the class.",
    explanation: "Methods are functions attached to a class. Instance methods take self and work on one object; class methods take cls and work on the class; static methods take neither. Use them to encapsulate behavior that belongs to an object (e.g. .save(), .validate()) or to the class (e.g. factory methods).",
    kidExplanation: "Special abilities of objects. A dog has bark() and fetch(). They know which object they belong to.",
    examples: [
      { title: "Instance methods (self)", code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says Woof!"\n    def sit(self):\n        return f"{self.name} is sitting."\n\nbuddy = Dog("Buddy")\nprint(buddy.bark())               # Buddy says Woof!\nprint(buddy.sit())               # Buddy is sitting.` },
      { title: "Class method and static method", code: `class Calculator:\n    count = 0\n    def add(self, a, b):\n        Calculator.count += 1\n        return a + b\n    @classmethod\n    def get_count(cls):\n        return cls.count\n    @staticmethod\n    def multiply(a, b):\n        return a * b\n\nc = Calculator()\nc.add(2, 3)\nprint(Calculator.get_count())   # 1\nprint(Calculator.multiply(4, 5)) # 20` },
      { title: "String and list methods (built-in)", code: `s = "  Hello World  "\nprint(s.strip())                 # "Hello World"\nprint(s.upper())                 # "  HELLO WORLD  "\nprint(s.split())                 # ['Hello', 'World']\n\nnums = [3, 1, 4, 1, 5]\nnums.append(9)\nnums.sort()\nprint(nums)                      # [1, 1, 3, 4, 5, 9]` },
      { title: "Chaining and encapsulation", code: `class Counter:\n    def __init__(self):\n        self.value = 0\n    def inc(self):\n        self.value += 1\n        return self  # allow chaining\n    def get(self):\n        return self.value\n\nc = Counter()\nc.inc().inc().inc()\nprint(c.get())                   # 3` },
    ],
  },
  {
    id: "async",
    title: "Async Functions",
    emoji: "⏱️",
    description: "Coroutines that can pause (await) without blocking the whole program.",
    explanation: "Async functions are defined with async def and use await inside them. They don't run until you schedule them (e.g. with asyncio.run or by awaiting them). Use them for I/O-bound work (network, files, databases) so that while one task waits, others can run. You need an event loop (asyncio) to run them.",
    kidExplanation: "A chef who starts several dishes at once. While water boils, they chop. No need to wait for one thing to finish.",
    examples: [
      { title: "Basic async and await", code: `import asyncio\n\nasync def say_hi(name):\n    await asyncio.sleep(0.5)\n    print(f"Hi, {name}!")\n\nasync def main():\n    await say_hi("Alice")\n\nasyncio.run(main())             # Hi, Alice!` },
      { title: "Run several async tasks concurrently", code: `import asyncio\n\nasync def fetch(id, delay):\n    await asyncio.sleep(delay)\n    return f"Result-{id}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch(1, 0.3),\n        fetch(2, 0.1),\n        fetch(3, 0.2)\n    )\n    print(results)  # ['Result-1', 'Result-2', 'Result-3']\n\nasyncio.run(main())` },
      { title: "Async for I/O (simulated)", code: `import asyncio\n\nasync def read_data(source):\n    await asyncio.sleep(0.2)  # simulate network delay\n    return f"Data from {source}"\n\nasync def main():\n    a = asyncio.create_task(read_data("A"))\n    b = asyncio.create_task(read_data("B"))\n    print(await a, await b)\n\nasyncio.run(main())` },
      { title: "Sequential vs concurrent timing", code: `import asyncio\nimport time\n\nasync def slow_task(name, sec):\n    await asyncio.sleep(sec)\n    return name\n\nasync def concurrent():\n    start = time.perf_counter()\n    await asyncio.gather(slow_task("A", 0.5), slow_task("B", 0.5))\n    print(f"Concurrent: {time.perf_counter() - start:.2f}s")  # ~0.5s\n\nasyncio.run(concurrent())` },
    ],
  },
];

function AifaLogo() {
  const [imgError, setImgError] = useState(false);
  return (
    <span className="font-bold text-xl tracking-tight inline-flex items-center">
      {!imgError ? (
        <Image
          src="/aifa-logo.png"
          alt="aifa"
          width={100}
          height={32}
          className="h-8 w-auto object-contain"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <span className="text-[#2563eb]">ai</span>
          <span className="text-neutral-800">fa</span>
        </>
      )}
    </span>
  );
}

export default function LearnersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center" aria-label="aifa home">
            <AifaLogo />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-neutral-50" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
            Learner&apos;s track
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Different Types of Functions in Python
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            A clear path through built-in, user-defined, lambda, recursive, and more — with examples you can try.
          </p>
          <Button size="lg" className="mt-8 gap-2" onClick={() => scrollTo("#toc")}>
            Start learning
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Table of contents */}
      <section id="toc" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="mb-3 bg-blue-100 text-blue-700 border-0">
              <BookOpen className="w-3 h-3 mr-1" />
              Table of contents
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Pick a topic
            </h2>
            <p className="mt-3 text-neutral-600">
              Jump to any function type. Each has a short explanation and code examples.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {functionTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => scrollTo(`#${type.id}`)}
                className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 text-left transition-all hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/30"
              >
                <span className="text-3xl block mb-3">{type.emoji}</span>
                <h3 className="font-semibold text-neutral-900">{type.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Function types */}
      <section id="functions" className="py-16 sm:py-20 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {functionTypes.map((type, index) => (
            <div key={type.id} id={type.id} className="scroll-mt-24 pb-16 last:pb-8">
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{type.emoji}</span>
                  <div>
                    <Badge variant="secondary" className="mb-1">
                      {index + 1} of {functionTypes.length}
                    </Badge>
                    <h2 className="text-2xl font-bold text-neutral-900">{type.title}</h2>
                  </div>
                </div>
                <p className="text-neutral-700 mb-4">{type.description}</p>
                {"explanation" in type && (
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {type.explanation}
                  </p>
                )}
                <Card className="mb-6 border-blue-100 bg-blue-50/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      In plain words
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 text-sm">{type.kidExplanation}</p>
                  </CardContent>
                </Card>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Use cases and examples
                  </h3>
                  {type.examples.map((ex, i) => (
                    <CodeBlock
                      key={i}
                      code={ex.code}
                      language="python"
                      filename={`${type.id}-${i + 1}.py`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-blue-100 text-blue-700 border-0">
              <Layers className="w-3 h-3 mr-1" />
              Quick reference
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Function types at a glance
            </h2>
            <p className="mt-3 text-neutral-600">
              When to use which.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-neutral-900">Type</th>
                  <th className="px-4 py-3 font-semibold text-neutral-900">Use when</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {functionTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <span className="mr-2">{type.emoji}</span>
                      <span className="font-medium">{type.title}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{type.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" className="gap-2" onClick={() => scrollTo("#toc")}>
              Back to table of contents
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center" aria-label="aifa">
            <AifaLogo />
          </button>
          <p className="text-sm text-neutral-500">
            Learner&apos;s track · Python functions
          </p>
        </div>
      </footer>

      {scrolled && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-lg z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
