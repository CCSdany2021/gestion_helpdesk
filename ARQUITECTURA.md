# Arquitectura del Proyecto - SPA Satélite PQRSF

Esta aplicación ha sido diseñada siguiendo un patrón desacoplado y modular, optimizada para consumir exclusivamente la API REST de **SGE (Sistema de Gestión Educativa)**.

## 1. Stack Tecnológico
- **Frontend Core**: React 18 con Vite (SWC) para máxima velocidad de desarrollo.
- **Estilos**: Tailwind CSS con una configuración de diseño premium (Colores HSL, sombras profundas, glassmorphism).
- **Animaciones**: Framer Motion para transiciones suaves entre estados y páginas.
- **Gráficos**: Recharts para visualización de datos (Dashboard).
- **Iconografía**: Lucide React.
- **Estado Global**: React Context (Auth) y hooks integrados de React.

## 2. Estructura de Carpetas Modular
El proyecto se organiza bajo el principio de **Diseño Orientado al Dominio (DDD)** simplificado:

```text
src/
├── components/          # Componentes transversales (UI Atoms)
│   └── ui/              # Botones, Inputs, Cards con diseño premium
├── layouts/             # DashboardLayout, AuthLayout
├── modules/
│   └── pqrsf/           # Dominio Principal
│       ├── components/  # Componentes específicos (Bandeja, Timeline)
│       ├── pages/       # Vistas (Dashboard, NuevaSolicitud, MisSolicitudes)
│       ├── services/    # Capa de consumo de API (Axios instance)
│       ├── hooks/       # Lógica reutilizable
│       └── store/       # Estado local del módulo
└── App.jsx               # Enrutamiento central
```

## 3. Estrategia de Consumo de API
Toda la lógica de red reside en `src/modules/pqrsf/services/`:
- **`api.js`**: Centraliza la configuración de Axios, inyectando automáticamente el JWT desde `localStorage` y manejando errores globales de red y sesión (401, 403).
- **`pqrsfService.js`**: Define los métodos específicos para interactuar con los endpoints `/api/v1/pqrsf/...` de SGE.

## 4. Roles y Seguridad
La aplicación soporta tres niveles de acceso condicional en el frontend:
1. **Usuario (Estudiante/Padre)**: Acceso a radicación y consulta personal.
2. **Dependencia**: Acceso a bandeja técnica, filtros avanzados y respuesta a radicados.
3. **Administrador**: Dashboard ejecutivo con métricas agregadas y reportes.

## 5. Mejores Prácticas Implementadas
- **Responsive Design**: Mobile-first architecture.
- **Loading States**: Feedback visual y skeletons integrados.
- **SEO Ready**: Meta-tags y estructura semántica (H1-H6).
- **UX**: Stepper para radicación, micro-interacciones en botones y cards.
