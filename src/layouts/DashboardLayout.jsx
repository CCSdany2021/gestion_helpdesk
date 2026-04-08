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
  UserCircle,
  ClipboardCheck
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
        "flex items-center gap-3 px-4 py-3 transition-all duration-300 group relative rounded-md",
        isActive 
          ? "bg-[#0460D9]/20 text-white border-l-4 border-[#0460D9]" 
          : "text-slate-400 hover:bg-[#003875]/30 hover:text-white"
      )}
    >
      <Icon size={18} className={cn("flex-shrink-0", isActive ? "text-[#FFB800]" : "group-hover:text-[#FFB800] transition-colors")} />
      {!collapsed && <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">{children}</span>}
      {collapsed && (
        <div className="absolute left-16 bg-[#001D3D] border border-[#0460D9] text-white px-2 py-1 text-[10px] uppercase font-black tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
          {children}
        </div>
      )}
    </Link>
  )
}

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Mapeo automático de títulos según ruta
  const routeTitles = {
    '/dashboard': { title: 'Dashboard de Análisis', sub: 'Estadísticas e Indicadores · Calasanz Suba' },
    '/pqrsf/mis-solicitudes': { title: 'Mis Tickets', sub: 'Historial de Radicados Personales' },
    '/pqrsf/gestion': { title: 'Bandeja Técnica', sub: 'Gestión de Dependencias · Administrativo' },
    '/pqrsf/calidad': { title: 'Gestión de Calidad', sub: 'Auditoría Institucional · Calasanz Suba' },
    '/pqrsf/analisis': { title: 'Análisis de Datos', sub: 'Métricas de Gestión PQRSF' },
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
    { to: '/pqrsf/mis-solicitudes', icon: ListTodo, label: 'Mis Tickets' },
    { to: '/pqrsf/gestion', icon: BarChart3, label: 'Bandeja' },
    { to: '/pqrsf/calidad', icon: ClipboardCheck, label: 'Calidad' },
    { to: '/pqrsf/analisis', icon: BarChart3, label: 'Análisis' },
  ]

  return (
    <div className="min-h-screen bg-app-bg flex">
      {/* Sidebar Desktop: Azul Institucional Extremo */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-[#001D3D] transition-all duration-500 fixed h-full z-30 shadow-2xl border-r border-white/5",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="py-8 px-6 flex flex-col gap-6 border-b border-white/5">
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#FFB800] text-[#001D3D] flex items-center justify-center font-black rounded-lg text-xl shadow-lg shadow-yellow-500/10">C</div>
                <div className="flex flex-col">
                  <span className="font-black text-[12px] text-white tracking-widest leading-none uppercase">SISTEMA PQRSF</span>
                  <span className="font-black text-[9px] text-[#FFB800]/70 tracking-[0.2em] leading-none uppercase mt-1">Calasanz Suba</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="h-9 w-9 bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center font-black border border-[#FFB800]/30 rounded-full text-xs">C</div>
                <div className="flex flex-col">
                  <span className="font-bold text-[10px] text-white leading-none truncate w-32">{user?.email || 'admin@calasanz.edu.co'}</span>
                  <span className="font-bold text-[8px] text-blue-400 uppercase tracking-widest mt-1">Administrador</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-10 w-10 bg-[#FFB800] mx-auto flex items-center justify-center font-black rounded-lg text-xl">C</div>
          )}
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto scrollbar-hide px-3 space-y-8">
           {/* Section Administración */}
           <div>
              {!collapsed && (
                <div className="flex items-center gap-2 mb-4 px-2">
                   <div className="h-3 w-3 grid grid-cols-2 gap-0.5">
                      <div className="bg-[#FFB800] h-full w-full"></div>
                      <div className="bg-[#FFB800] h-full w-full"></div>
                      <div className="bg-[#FFB800] h-full w-full"></div>
                      <div className="bg-[#FFB800] h-full w-full"></div>
                   </div>
                   <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-[0.2em]">Administración</span>
                </div>
              )}
              <div className="space-y-1">
                {menuItems.slice(0, 3).map((item) => (
                  <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={collapsed}>
                    {item.label}
                  </SidebarLink>
                ))}
              </div>
           </div>

           {/* Section Análisis */}
           <div>
              {!collapsed && (
                <div className="flex items-center gap-2 mb-4 px-2">
                   <BarChart3 size={14} className="text-[#FFB800]" />
                   <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-[0.2em]">Métricas & Calidad</span>
                </div>
              )}
              <div className="space-y-1">
                {menuItems.slice(3).map((item) => (
                  <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={collapsed}>
                    {item.label}
                  </SidebarLink>
                ))}
              </div>
           </div>
        </nav>

        <div className="p-6 border-t border-white/5 flex flex-col gap-4">
          <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] text-center">© 2026 Calasanz Suba</p>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-none text-white/50 hover:text-white transition-colors"
            title={collapsed ? "Expandir menú" : "Retraer menú"}
          >
            {collapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-500 min-w-0",
        "md:ml-64", 
        collapsed && "md:ml-20"
      )}>
        {/* Topbar / Header Premium */}
        <header className={cn(
          "sticky top-0 z-20 w-full bg-white border-b border-[#E2E8F0] shadow-sm",
        )}>
          <div className="px-8 py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                className="p-2 text-[#0460D9] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => {
                   if (window.innerWidth < 768) setMobileOpen(true);
                   else setCollapsed(!collapsed);
                }}
                title="Alternar Menú Lateral"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="title-premium">{title}</h1>
                <p className="subtitle-premium">{sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="BUSCAR RADICADO..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 text-[10px] font-black uppercase tracking-widest border-none focus:ring-1 focus:ring-[#0460D9] outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-[#0460D9] relative transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                </button>
                
                <div className="h-8 w-[0.5px] bg-slate-200 mx-1 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-slate-900 leading-none group-hover:text-[#0460D9] transition-colors">{user?.nombre?.toUpperCase()}</p>
                    <p className="subtitle-premium !mt-1">{user?.rol}</p>
                  </div>
                  <div className="h-10 w-10 border border-slate-100 bg-slate-50 flex items-center justify-center group-hover:border-[#0460D9] transition-all">
                    <UserCircle size={28} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="px-8 py-8 w-full animate-in fade-in duration-700">
          <Outlet />
        </section>
      </main>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-[#001d3d]/60 backdrop-blur-md z-[9999] md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="w-72 h-full bg-[#002855] border-r-4 border-[#0460D9] transition-transform duration-300 ease-out p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-[#003875] flex items-center justify-between">
               <span className="font-black text-xl text-white italic tracking-tighter">CALASANZ</span>
               <button onClick={() => setMobileOpen(false)} className="text-white"><X size={24} /></button>
            </div>
            
            <nav className="flex flex-col mt-4">
              {menuItems.map((item) => (
                <SidebarLink key={item.to} to={item.to} icon={item.icon} collapsed={false}>
                  {item.label}
                </SidebarLink>
              ))}
            </nav>
            
            <div className="absolute bottom-10 left-0 right-0 px-6">
               <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest">
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
