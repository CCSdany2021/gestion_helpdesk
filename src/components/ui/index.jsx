import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function Button({ className, variant = "primary", size = "md", isLoading = false, children, ...props }) {
  const variants = {
    primary: "bg-[#023E73] text-white hover:bg-[#024B82] shadow-md hover:shadow-lg",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-md",
    outline: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2.5",
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
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div 
      className={cn(
        "card", 
        hover && "hover:shadow-md transition-all duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

export function Input({ label, error, className, icon, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "input-field",
            icon && "pl-10",
            error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "",
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  )
}

export function Badge({ children, className, variant = "neutral", size = "md" }) {
  const variants = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    error: "bg-red-50 text-red-700 border border-red-100",
    info: "bg-[#023E73]/10 text-[#023E73] border border-[#023E73]/20",
    primary: "bg-[#023E73]/10 text-[#023E73] border border-[#023E73]/20",
  }

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  }

  return (
    <span className={cn("badge font-medium", variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}

export function Avatar({ name, size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
  const colors = [
    'bg-[#023E73]', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 
    'bg-cyan-500', 'bg-violet-500', 'bg-orange-500', 'bg-pink-500'
  ]
  const colorIndex = name?.charCodeAt(0) % colors.length || 0

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-semibold text-white",
      sizes[size],
      colors[colorIndex],
      className
    )}>
      {initials}
    </div>
  )
}

export function Skeleton({ className }) {
  return (
    <div className={cn(
      "animate-pulse bg-slate-200 rounded-lg",
      className
    )} />
  )
}

export function Divider({ className }) {
  return <div className={cn("h-px bg-slate-100", className)} />
}