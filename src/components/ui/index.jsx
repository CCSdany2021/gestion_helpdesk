import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function Button({ className, variant = "primary", size = "md", isLoading = false, children, ...props }) {
  const variants = {
    primary: "bg-[#0460D9] text-white hover:bg-[#002855] shadow-sm",
    secondary: "bg-[#002855] text-white hover:bg-black shadow-sm",
    outline: "border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-[10px] tracking-wider",
    md: "px-4 py-2 text-[11px] tracking-widest",
    lg: "px-8 py-3 text-[12px] tracking-[0.15em] font-black",
    icon: "p-2",
  }

  return (
    <button
      disabled={isLoading || props.disabled}
      className={cn(
        "btn",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export function Card({ children, className, ...props }) {
  return (
    <div className={cn("card bg-white", className)} {...props}>
      {children}
    </div>
  )
}

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="subtitle-premium block mb-1">{label}</label>}
      <input
        className={cn(
          "input-field",
          error ? "border-red-500 focus:ring-red-500/20" : "",
          className
        )}
        {...props}
      />
      {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</span>}
    </div>
  )
}

export function Badge({ children, className, variant = "neutral" }) {
  const variants = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    error: "bg-red-50 text-red-700 border border-red-100",
    info: "bg-blue-50 text-[#0460D9] border border-blue-100",
  }

  return (
    <span className={cn("px-2 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest inline-block border border-transparent", variants[variant], className)}>
      {children}
    </span>
  )
}
