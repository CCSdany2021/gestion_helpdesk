# Guía de Estilo y Prompt UI Premium: Colegio Calasanz Suba

Esta guía define el lenguaje visual "Premium Institucional" desarrollado para la modernización del Portal Educador. Utiliza este documento como plantilla o prompt para replicar el diseño en futuros módulos o nuevas aplicaciones.

---

## 1. Paleta de Colores (Design Tokens)

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| **Azul Institucional** | `#002855` | Fondos de sidebar, textos de marca, botones primarios (hover). |
| **Azul Calasanz** | `#0460D9` | Títulos `<h1>`, acentos de iconos, botones de acción principal, estados activos. |
| **Amarillo Acero** | `#f2c144` | Contrastes, iconos de alerta, bordes de marca. |
| **Gris Fondo** | `#F1F3F5` | Color general de fondo de la aplicación (`body`). |
| **Gris Borde** | `#E2E8F0` | Líneas de división de 0.5px o 1px. |
| **Gris Texto Muted** | `#94A3B8` | Subtítulos pequeños, fechas y etiquetas secundarias. |

---

## 2. Tipografía y Jerarquía

*   **Fuentes recomendadas**: 'Inter', 'Outfit' o 'Public Sans' (deben ser limpias y geométricas).
*   **Títulos Principales (`h1`)**:
    *   Size: `24px` (text-2xl)
    *   Weight: `900` (font-black)
    *   Letter-spacing: `tracking-tight`
    *   Color: `#0460D9`
*   **Subtítulos de Sección**:
    *   Size: `10px` o `11px`
    *   Weight: `700` o `900`
    *   Case: `UPPERCASE`
    *   Letter-spacing: `tracking-[0.1em]` o `tracking-widest`
    *   Color: `Slate-500` o `Muted`
*   **Cuerpo de Texto**:
    *   Size: `12px` o `13px`
    *   Color: `Slate-700`

---

## 3. Estructura del Layout (The "Golden Setup")

### A. El Header Premium (Título y Breadcrumb)
```html
<div class="bg-white border-b border-slate-200">
    <div class="px-8 py-6 flex items-center justify-between flex-wrap gap-4">
        <div>
            <h1 class="text-2xl font-black text-[#0460D9] tracking-tight">Título del Módulo</h1>
            <p class="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">
                Descripción corta del proceso · Área Encargada
            </p>
        </div>
        <!-- Espacio para KPIs o botones de acción rápida -->
    </div>
</div>
```

### B. El Grid de Acciones (Filtros y Búsqueda)
*   **Fondo**: Blanco con borde `0.5px solid #E2E8F0`.
*   **Padding**: `p-2` (compacto).
*   **Tabs**: Bordes inferiores de 2px cuando están activos.
*   **Inputs**: Background `slate-50`, sin bordes redondeados (o `rounded-[5px]`), bordes de foco en `#0460D9`.

### C. El Contenedor de Datos (Tablas y Cards)
*   **Bordes**: `rounded-none` (estilo squared-off) o máximo `rounded-[5px]`.
*   **Sombras**: `shadow-sm` muy sutil.
*   **Headers de Tabla**:
    *   Background: `#FCFDFE` (casi blanco).
    *   Texto: `10px`, `font-black`, `uppercase`, `tracking-widest`.
    *   Color: `Slate-400`.

---

## 4. Diseño de Modales (Overlay)

| Propiedad | Configuración Premium |
| :--- | :--- |
| **Fondo (Overlay)** | `fixed inset-0 z-[9999] bg-[#001d3d]/60 backdrop-blur-md` |
| **Contenedor** | `bg-white rounded-none border-t-4 border-[#0460D9] shadow-2xl` |
| **Animación** | `animate-in fade-in zoom-in duration-300` |
| **Padding** | `p-8` o `p-10` (mucha respiración entre elementos). |

---

## 5. Prompt Sugerido para IA (Copiar y Pegar)

> "Actúa como un experto en UI/UX y crea un componente React usando Tailwind CSS con un diseño Premium Institucional bajo estas reglas: 
> 
> 1. **Colores**: Usa #0460D9 para títulos e iconos clave, #002855 para estados oscuros y #F1F3F5 para el fondo general.
> 2. **Tipografía**: Títulos en font-black (900), tracking-tight y color #0460D9. Subtítulos descriptivos en text-[10px], uppercase y font-bold.
> 3. **Estructura**: Un Header limpio con borde inferior de 0.5px, seguido de un área de filtros compacta. 
> 4. **Geometría**: Evita bordes muy redondeados; usa rounded-none o máximo rounded-[5px]. 
> 5. **Modales**: Deben tener un overlay con backdrop-blur y un borde superior grueso (border-t-4) en color #0460D9. 
> 6. **Tablas**: Headers en CASE UPPERCASE, fuente pequeña (10px), peso 900 y color gris slate-400. Las filas con hover sutil. 
> 7. **Iconografía**: Usa Bootstrap Icons (bi) con tamaños pequeños (text-sm/xs) pero colores vibrantes."

---
*Archivo generado para: Colegio Calasanz Suba - Portal Educador 2026*
