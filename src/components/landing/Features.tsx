const FEATURES = [
  {
    icon: "🔍",
    title: "Reads your logs",
    body: "Pulls the real CloudWatch logs around an incident to diagnose the actual cause — not just the symptom.",
  },
  {
    icon: "💡",
    title: "Plain-English fixes",
    body: "Turns cryptic alarms into a clear root cause and concrete steps to resolve it.",
  },
  {
    icon: "💬",
    title: "In your chat",
    body: "Delivered to Telegram. Ask follow-ups, check history — all conversationally.",
  },
  {
    icon: "⚡",
    title: "1-click setup",
    body: "Connect AWS securely and read-only in one click. No access keys, no hassle.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-[1280px] px-6 py-16 md:px-10"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex min-h-[230px] flex-col rounded-[20px] border border-[#ECE4D5] bg-white p-[30px] transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(26,23,20,0.07)]"
          >
            <div className="mb-5 grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-[#FCEBC9] text-[23px]">
              {f.icon}
            </div>
            <h3 className="mb-2 text-[19px] font-extrabold tracking-tight">
              {f.title}
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[#6B6357]">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
