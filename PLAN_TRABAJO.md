# Plan de Trabajo - Aplicación Satélite PQRSF

Este documento detalla la hoja de ruta para la construcción de la SPA de gestión de PQRSF, integrada con el sistema SGE mediante API REST.

## 1. Configuración Inicial y Arquitectura (Día 1)
- [ ] Inicialización del proyecto con **Vite + React (SWC)**.
- [ ] Configuración completa de **Tailwind CSS** con paleta de colores premium.
- [ ] Implementación de la estructura de carpetas modular por dominios (`src/modules/pqrsf/...`).
- [ ] Instalación de dependencias core:
  - `axios` (Consumo API)
  - `react-router-dom` (Navegación)
  - `lucide-react` (Iconografía)
  - `recharts` o `chart.js` (Métricas)
  - `framer-motion` (Animaciones suaves)
  - `react-hook-form` & `zod` (Formularios y validación)

## 2. Capa de Servicios y Autenticación (Día 1)
- [ ] Configuración de instancia global de **Axios** con interceptores para:
  - Inyectar JWT/API Keys.
  - Manejo global de errores (401, 403, 500).
- [ ] Implementación de `authService`:
  - Login integrado con Microsoft Entra ID / Local setup.
  - Gestión de persistencia de sesión (Secure Context).
- [ ] Creación de `pqrsfService` y `coreService` (usuarios/dependencias).

## 3. UI/UX Base y Layouts (Día 1-2)
- [ ] Creación del **Dashboard Layout**:
  - Sidebar colapsable y barra de navegación superior.
  - Gestión de perfil de usuario.
- [ ] Desarrollo de componentes Atómicos (Diseño Atómico):
  - Botones, inputs, modales, alertas y estados de carga (skeletons).
- [ ] Implementación del sistema de rutas según roles.

## 4. Módulo de Usuario (Solicitante) (Día 2)
- [ ] **Página: Nueva Solicitud**: 
  - Formulario dinámico con tipos de PQRSF.
  - Sistema de adjunto de archivos.
- [ ] **Página: Mis Solicitudes**: 
  - Listado con badges de estado y búsqueda.
- [ ] **Página: Detalle de Solicitud**:
  - Línea de tiempo de la solicitud.
  - Hilo de comentarios/respuestas.

## 5. Módulo de Dependencia (Gestión) (Día 2-3)
- [ ] **Bandeja de Entrada**:
  - Filtros avanzados por estado, periodo y tipo.
- [ ] **Funcionalidad de Respuesta**:
  - Modal de atención y cambio de estado.
  - Asignación interna.

## 6. Dashboard Administrativo y Reportes (Día 3)
- [ ] **Admin Dashboard Interno**:
  - Implementación de gráficos con Recharts.
  - Métricas clave: Tiempo medio de respuesta, volumen por tipo.
- [ ] **Funciones de Reportes**:
  - Exportación básica de datos a Excel/CSV.

## 7. Pulido Final y Entrega (Día 3)
- [ ] Optimización de rendimiento y SEO.
- [ ] Manejo de logs en frontend.
- [ ] Documentación de la arquitectura y guía de integración API.
