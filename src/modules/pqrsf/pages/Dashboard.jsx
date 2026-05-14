import React from 'react'
import { Card, Badge, Button, Avatar } from '@/components/ui'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileSearch,
  ArrowRight,
  Download,
  Calendar,
  Users,
  Ticket,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const dataMonthly = [
  { name: 'Ene', qty: 21, peticion: 12, queja: 4, reclamo: 3, sugerencia: 2 },
  { name: 'Feb', qty: 15, peticion: 8, queja: 3, reclamo: 2, sugerencia: 2 },
  { name: 'Mar', qty: 18, peticion: 10, queja: 4, reclamo: 2, sugerencia: 2 },
  { name: 'Abr', qty: 25, peticion: 14, queja: 5, reclamo: 3, sugerencia: 3 },
  { name: 'May', qty: 22, peticion: 13, queja: 4, reclamo: 3, sugerencia: 2 },
  { name: 'Jun', qty: 19, peticion: 11, culpa: 3, reclamo: 3, sugerencia: 2 },
]

const dataPie = [
  { name: 'Petición', value: 45, color: '#6366F1' },
  { name: 'Queja', value: 25, color: '#F59E0B' },
  { name: 'Reclamo', value: 18, color: '#EF4444' },
  { name: 'Sugerencia', value: 8, color: '#10B981' },
  { name: 'Felicitaciones', value: 4, color: '#8B5CF6' },
]

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, trendDirection, borderColor }) => (
  <Card className="p-6 hover:shadow-md transition-all duration-300 group" style={{ borderTop: `4px solid ${borderColor}` }}>
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
          {trend && (
            <span className={`text-sm font-medium flex items-center gap-1 ${
              trendDirection === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {trendDirection === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {trend}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
      <div className={cn(
        "h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-300",
        color
      )}>
        <Icon size={24} />
      </div>
    </div>
  </Card>
)

function cn(...args) {
  return args.filter(Boolean).join(' ')
}

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Radicados" 
          value="54" 
          subtitle="Este mes"
          icon={Ticket} 
          color="bg-indigo-50 text-indigo-600" 
          trend="15" 
          trendDirection="up"
          borderColor="#6366F1"
        />
        <StatCard 
          title="En Proceso" 
          value="8" 
          subtitle="Pendientes"
          icon={Clock} 
          color="bg-amber-50 text-amber-600" 
          trend="3" 
          trendDirection="down"
          borderColor="#F59E0B"
        />
        <StatCard 
          title="Atendidos" 
          value="46" 
          subtitle="Este mes"
          icon={CheckCircle} 
          color="bg-emerald-50 text-emerald-600" 
          trend="12" 
          trendDirection="up"
          borderColor="#10B981"
        />
        <StatCard 
          title="Vencidos" 
          value="2" 
          subtitle="Requieren atención"
          icon={AlertCircle} 
          color="bg-red-50 text-red-600" 
          borderColor="#EF4444"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Radicación por Mes</h3>
              <p className="text-sm text-slate-500">Distribución mensual 2026</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                Total
              </span>
              <span className="flex items-center gap-1.5 ml-3">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Peticiones
              </span>
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataMonthly}>
                <defs>
                  <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPeticion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: '1px solid #E2E8F0', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="qty" name="Total" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorQty)" />
                <Area type="monotone" dataKey="peticion" name="Peticiones" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorPeticion)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-800">Tipos de Solicitud</h3>
            <p className="text-sm text-slate-500">Distribución porcentual</p>
          </div>
          
          <div className="h-[180px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPie}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-800">54</span>
              <span className="text-xs text-slate-500">Total</span>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
             {dataPie.map((item) => (
               <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: item.color}}></div>
                   <span className="text-sm text-slate-600">{item.name}</span>
                 </div>
                 <span className="text-sm font-semibold text-slate-800">{item.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Actividad Reciente</h3>
              <p className="text-sm text-slate-500">Últimas actualizaciones</p>
            </div>
            <Button variant="outline" size="sm">
              Ver Todo
            </Button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { id: 'PQRS-1378', type: 'Petición', dependencia: 'Tesorería', estado: 'En Proceso', time: '2 horas ago', initials: 'JP' },
              { id: 'PQRS-1377', type: 'Queja', dependencia: 'Sección Jardín', estado: 'Atendido', time: '5 horas ago', initials: 'MR' },
              { id: 'PQRS-1376', type: 'Reclamo', dependencia: 'Secretaría', estado: 'Atendido', time: '1 día ago', initials: 'AC' },
              { id: 'PQRS-1375', type: 'Sugerencia', dependencia: 'Rectoría', estado: 'En Proceso', time: '2 días ago', initials: 'LB' },
            ].map((item, idx) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
                     {item.initials}
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                       <h5 className="text-sm font-semibold text-slate-800">{item.id}</h5>
                       <Badge variant={item.estado === 'Atendido' ? 'success' : 'warning'} size="sm">
                         {item.estado}
                       </Badge>
                     </div>
                     <p className="text-xs text-slate-500 mt-0.5">
                       {item.dependencia} · {item.type} · {item.time}
                     </p>
                   </div>
                 </div>
                 <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100">
                  <Ticket size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800">Nueva Solicitud</p>
                  <p className="text-xs text-slate-500">Crear radicado nuevo</p>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100">
                  <Download size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800">Exportar Reportes</p>
                  <p className="text-xs text-slate-500">PDF o Excel</p>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group">
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100">
                  <Calendar size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800">Programar Informe</p>
                  <p className="text-xs text-slate-500">Generación automática</p>
                </div>
              </button>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">SLA Promedio</h3>
              <TrendingUp size={20} className="text-white/70" />
            </div>
            <div className="text-4xl font-bold mb-1">92%</div>
            <p className="text-sm text-white/80">Cumplimiento de tiempo de respuesta</p>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-white rounded-full"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard