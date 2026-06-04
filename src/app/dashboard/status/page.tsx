"use client";

const STAGES = [
{
  id: 1,
  label: "Account Created",
  desc: "Your account has been successfully created.",
  icon: "✅",
  status: "done",
},
{
  id: 2,
  label: "Documents Submitted",
  desc: "Upload all required documents to proceed.",
  icon: "📋",
  status: "active",
},
{
  id: 3,
  label: "Document Review",
  desc: "Our team reviews your documents (3–5 business days).",
  icon: "🔍",
  status: "pending",
},
{
  id: 4,
  label: "University Application",
  desc: "We submit your application to matched universities.",
  icon: "🏫",
  status: "pending",
},
{
  id: 5,
  label: "Admission Decision",
  desc: "Receive acceptance letters from universities.",
  icon: "🎉",
  status: "pending",
},
{
  id: 6,
  label: "Visa & Enrollment",
  desc: "Apply for student visa and complete enrollment.",
  icon: "✈️",
  status: "pending",
},
];

const STATUS_STYLES = {
done: {
  circle: "bg-green-500 text-white",
  line: "bg-green-400",
  card: "border-green-200 bg-green-50",
  badge: "bg-green-100 text-green-700",
  badgeLabel: "Completed",
},
active: {
  circle: "bg-[#1a3a6b] text-white ring-4 ring-blue-100",
  line: "bg-gray-200",
  card: "border-[#1a3a6b] bg-blue-50",
  badge: "bg-blue-100 text-[#1a3a6b]",
  badgeLabel: "In Progress",
},
pending: {
  circle: "bg-gray-200 text-gray-400",
  line: "bg-gray-200",
  card: "border-gray-200 bg-white",
  badge: "bg-gray-100 text-gray-500",
  badgeLabel: "Pending",
},
};

export default function StatusPage() {
const currentStage = STAGES.find((s) => s.status === "active");

return (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
      <p className="text-gray-500 mt-1">
        Track every step of your application journey.
      </p>
    </div>

    {/* Current status banner */}
    {currentStage && (
      <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2a5298] rounded-2xl p-6 text-white mb-8 flex items-center gap-4">
        <div className="text-4xl">{currentStage.icon}</div>
        <div>
          <p className="text-blue-200 text-sm font-medium">Current Stage</p>
          <p className="text-xl font-bold">{currentStage.label}</p>
          <p className="text-blue-200 text-sm mt-0.5">{currentStage.desc}</p>
        </div>
      </div>
    )}

    {/* Timeline */}
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-6">Application Timeline</h2>
      <div className="space-y-0">
        {STAGES.map((stage, index) => {
          const styles = STATUS_STYLES[stage.status as keyof typeof STATUS_STYLES];
          const isLast = index === STAGES.length - 1;

          return (
            <div key={stage.id} className="flex gap-4">
              {/* Left: circle + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${styles.circle}`}
                >
                  {stage.status === "done" ? "✓" : stage.id}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 my-1 min-h-[2rem] ${styles.line}`} />
                )}
              </div>

              {/* Right: card */}
              <div className={`flex-1 mb-4 border-2 rounded-xl p-4 ${styles.card}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stage.icon}</span>
                      <p className="font-semibold text-gray-900 text-sm">{stage.label}</p>
                    </div>
                    <p className="text-xs text-gray-600">{stage.desc}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${styles.badge}`}
                  >
                    {styles.badgeLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Help box */}
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
      <p className="font-semibold text-amber-800 text-sm mb-1">💬 Need help?</p>
      <p className="text-xs text-amber-700">
        If your application has been stuck at the same stage for more than 7 business days,
        contact our support team at{" "}
        <a href="mailto:support@chinauni.com" className="underline font-medium">
          support@chinauni.com
        </a>
      </p>
    </div>
  </div>
);
}
