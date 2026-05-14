import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Send, 
  ListTodo, 
  BarChart3, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  ClipboardCheck,
  Settings,
  HelpCircle,
  Ticket
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/modules/pqrsf/store/AuthContext'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const SidebarLink = ({ to, icon: Icon, children, collapsed }) => {
  const location = useLocation()
  const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-white/15 text-white shadow-lg shadow-blue-500/20" 
          : "text-blue-100 hover:bg-white/10 hover:text-white",
        collapsed && "justify-center px-3"
      )}
    >
      <Icon size={20} className={cn("flex-shrink-0", isActive ? "text-white" : "text-blue-300")} />
      {!collapsed && (
        <span>{children}</span>
      )}
    </Link>
  )
}

const MenuSection = ({ title, children, collapsed }) => (
  <div className="mb-6">
    {!collapsed && (
      <div className="mb-3 px-3">
        <span className="text-[11px] font-semibold text-blue-300/70 uppercase tracking-wider">{title}</span>
      </div>
    )}
    <div className="space-y-1">
      {children}
    </div>
  </div>
)

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const routeTitles = {
    '/dashboard': { title: 'Dashboard', sub: 'Resumen ejecutivo de PQRSF' },
    '/pqrsf/mis-solicitudes': { title: 'Mis Solicitudes', sub: 'Historial de tickets personales' },
    '/pqrsf/gestion': { title: 'Bandeja de Gestión', sub: 'Administración de dependencias' },
    '/pqrsf/calidad': { title: 'Gestión de Calidad', sub: 'Auditoría y mejora continua' },
    '/pqrsf/analisis': { title: 'Análisis de Datos', sub: 'Métricas y reportes ejecutivos' },
  }
  
  const currentPath = Object.keys(routeTitles).find(path => location.pathname.startsWith(path)) || '/dashboard'
  const { title, sub } = routeTitles[currentPath]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
    { to: '/pqrsf/mis-solicitudes', icon: Ticket, label: 'Mis Tickets' },
    { to: '/pqrsf/nueva-solicitud', icon: Send, label: 'Nueva Solicitud' },
    { to: '/pqrsf/gestion', icon: ListTodo, label: 'Bandeja' },
    { to: '/pqrsf/calidad', icon: ClipboardCheck, label: 'Calidad' },
    { to: '/pqrsf/analisis', icon: BarChart3, label: 'Análisis' },
  ]

  const userInitials = user?.nombre?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AD'
  const userColor = 'bg-indigo-500'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-[#023E73] transition-all duration-300 fixed h-full z-30",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Area */}
        <div className="p-5 border-b border-white/10">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg tracking-tight">PQRSF</span>
                <span className="font-medium text-blue-200 text-xs block">Calasanz Suba</span>
              </div>
            </div>
          ) : (
            <div className="h-11 w-11 bg-white/10 rounded-xl flex items-center justify-center mx-auto cursor-pointer hover:scale-105 transition-transform border border-white/20">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <MenuSection title="Principal" collapsed={collapsed}>
            {menuItems.slice(0, 3).map((item) => (
              <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={collapsed}>
                {item.label}
              </SidebarLink>
            ))}
          </MenuSection>

          <MenuSection title="Gestión" collapsed={collapsed}>
            {menuItems.slice(3).map((item) => (
              <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={collapsed}>
                {item.label}
              </SidebarLink>
            ))}
          </MenuSection>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2.5 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 transition-all"
          >
            {collapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
          </button>
          {!collapsed && (
            <p className="text-[10px] text-center text-blue-400/50 mt-3">© 2026 Calasanz Suba</p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        "md:ml-64", 
        collapsed && "md:ml-20"
      )}>
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60",
          scrolled && "shadow-sm"
        )}>
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                onClick={() => {
                   if (window.innerWidth < 768) setMobileOpen(true);
                   else setCollapsed(!collapsed);
                }}
              >
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                <p className="text-sm text-slate-500">{sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden lg:flex relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar radicado..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg relative transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Help */}
              <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors hidden sm:block">
                <HelpCircle size={20} />
              </button>

              <div className="h-8 w-px bg-slate-200 mx-1"></div>

              {/* User Menu */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{user?.nombre || 'Usuario'}</p>
                  <p className="text-xs text-slate-500">{user?.rol || 'Administrador'}</p>
                </div>
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold", userColor)}>
                  {userInitials}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-6 w-full animate-in">
          <Outlet />
        </section>
      </main>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="w-80 h-full bg-[#023E73] animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="h-11 w-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <div>
                    <span className="font-bold text-white text-lg">PQRSF</span>
                    <span className="font-medium text-blue-200 text-xs block">Calasanz Suba</span>
                  </div>
               </div>
               <button onClick={() => setMobileOpen(false)} className="text-blue-200 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">
                 <X size={22} />
               </button>
            </div>
            
            <nav className="flex flex-col p-4">
              {menuItems.map((item) => (
                <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={false}>
                  {item.label}
                </SidebarLink>
              ))}
            </nav>
            
            <div className="absolute bottom-6 left-0 right-0 px-6">
                <button 
                  onClick={() => { logout(); setMobileOpen(false); }} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-300 hover:bg-red-500/20 rounded-xl font-medium transition-all text-sm"
                >
                 <LogOut size={18} /> Cerrar Sesión
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout