import { AlertTriangle } from "lucide-react";

export function POHDisclaimer() {
  return (
    <div className="bg-warning/5 border border-warning/20 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      <p className="text-xs text-muted leading-relaxed">
        <strong className="text-warning">Always refer to your aircraft&apos;s POH first.</strong>{" "}
        The data here is for study and reference only — it may not match your specific aircraft&apos;s
        serial number, equipment, or modifications. Use your Pilot&apos;s Operating Handbook as the
        final authority for all V-speeds, weight &amp; balance, and procedures.
      </p>
    </div>
  );
}
