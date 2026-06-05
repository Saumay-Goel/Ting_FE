const STEPS = [
  {
    n: "STEP 01",
    icon: "☁️",
    title: "It detects",
    body: "Connect AWS in one click. When a CloudWatch alarm fires, Tinglr catches it instantly — securely, read-only.",
  },
  {
    n: "STEP 02",
    icon: "🔍",
    title: "It diagnoses",
    body: "Ting reads your real logs, pinpoints the likely root cause, and writes concrete fix steps in plain English.",
  },
  {
    n: "STEP 03",
    icon: "💬",
    title: "It pings you",
    body: "The diagnosis lands in your Telegram. Ask follow-ups, check history, or let the agent fix it for you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1280px] px-6 md:px-10">
      <div className="pb-3.5 pt-20 text-center">
        <span className="inline-block rounded-full border border-[#ECE4D5] bg-white px-[18px] py-2 text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#6B6357]">
          How it works
        </span>
        <h2 className="mx-auto my-6 max-w-[600px] font-[family-name:var(--font-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[52px]">
          From cryptic alarm to clear fix.
        </h2>
        <p className="mx-auto mb-10 max-w-[540px] text-[18.5px] leading-relaxed text-[#6B6357]">
          Tinglr sits between your AWS and your phone. Three steps, zero
          dashboard diving.
        </p>
      </div>

      <div className="grid gap-5 pb-24 md:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-[20px] border border-[#ECE4D5] bg-white p-8"
          >
            <div className="mb-[18px] text-[12.5px] font-extrabold tracking-[0.12em] text-[#E08E10]">
              {s.n}
            </div>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-[13px] bg-[#FCEBC9] text-[22px]">
              {s.icon}
            </div>
            <h3 className="mb-2 text-[21px] font-extrabold tracking-tight">
              {s.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-[#6B6357]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
