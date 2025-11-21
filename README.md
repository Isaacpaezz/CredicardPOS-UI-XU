
# CredicardPOS - Plataforma SaaS de Recuperación Financiera

> **Versión:** 1.2.0 (Release Candidate)
> **Stack:** React 19, TypeScript, Tailwind CSS v4, Recharts
> **Licencia:** Privativa / Enterprise

**CredicardPOS** es una solución SaaS Enterprise ("Software as a Service") diseñada para instituciones financieras, bancos y agencias de cobranza. Su misión es orquestar el ciclo de vida de la recuperación de cartera vencida, monitorear el estado técnico de terminales de punto de venta (POS) y automatizar la comunicación masiva a través de canales digitales (WhatsApp/SMS).

---

## 📚 Tabla de Contenidos

1.  [Arquitectura Técnica](#-arquitectura-técnica)
2.  [Estructura del Proyecto](#-estructura-del-proyecto)
3.  [Sistema de Diseño (Design System)](#-sistema-de-diseño-design-system)
4.  [Módulos y Lógica de Negocio](#-módulos-y-lógica-de-negocio)
    *   [Autenticación y Onboarding](#41-autenticación-y-onboarding)
    *   [Dashboard y Analítica](#42-dashboard-y-analítica)
    *   [Gestión de Clientes (CRM)](#43-gestión-de-clientes-crm)
    *   [Motor de Campañas](#44-motor-de-campañas)
    *   [Configuración y Automatización](#45-configuración-y-automatización)
    *   [Perfil de Usuario](#46-perfil-de-usuario)
5.  [Integraciones Externas (Simuladas)](#-integraciones-externas-simuladas)
6.  [Modelo de Datos](#-modelo-de-datos)
7.  [Instalación y Despliegue](#-instalación-y-despliegue)

---

## 🏗 Arquitectura Técnica

La aplicación está construida como una **Single Page Application (SPA)** moderna, optimizada para rendimiento y mantenibilidad.

### Principios de Ingeniería
*   **React 19 Core:** Aprovechamos las últimas características del framework, incluyendo mejoras en el renderizado concurrente y gestión de estado eficiente.
*   **Enrutamiento Declarativo:** No utilizamos librerías externas de routing (como React Router) para este MVP. En su lugar, implementamos un gestor de estado ligero en `App.tsx` (`currentPage`) que renderiza vistas condicionalmente. Esto reduce el bundle size y simplifica la lógica de navegación.
*   **Estilizado Atómico:** Utilizamos **Tailwind CSS v4** con una configuración extendida para la paleta de colores corporativa (`indigo` como primario, `slate` como neutro).
*   **Responsive First:** Toda la interfaz se adapta fluidamente desde móviles (320px) hasta pantallas ultrawide (1920px+), cambiando patrones de UI (ej. Tablas -> Tarjetas) según el viewport.

---

## 📂 Estructura del Proyecto

La estructura de carpetas sigue un patrón de separación por dominios funcionales:

```text
/
├── components/
│   ├── Layout.tsx       # Shell principal: Sidebar (Colapsable), Header, Lógica de Menú Móvil.
│   └── UI.tsx           # UI Kit: Componentes atómicos (Button, Input, Sheet, Popover, etc.).
├── pages/
│   ├── Login.tsx        # Entrada: Autenticación de usuario.
│   ├── Register.tsx     # Entrada: Registro de nuevo Tenant/Empresa.
│   ├── Onboarding.tsx   # Entrada: Configuración inicial post-registro.
│   ├── Dashboard.tsx    # Core: KPIs y Gráficos de Embudo.
│   ├── Clients.tsx      # Core: CRM, Filtros Facetados y Perfil 360.
│   ├── Campaigns.tsx    # Core: Tablero Kanban de campañas.
│   ├── NewCampaign.tsx  # Core: Wizard (Máquina de estados) para crear campañas.
│   ├── CampaignDetail.tsx # Core: Analítica detallada de una campaña específica.
│   ├── Settings.tsx     # Admin: Gestión de equipo y reglas de automatización.
│   ├── Profile.tsx      # Usuario: Datos personales, seguridad y preferencias.
│   ├── ImportPage.tsx   # Utilidad: Carga masiva de datos.
│   └── ChatwootEmbed.tsx # Integración: Vista "headless" para iframes externos.
├── App.tsx              # Orquestador: Router y gestión de Layouts.
├── types.ts             # Definiciones TypeScript globales.
├── mockData.ts          # Capa de Datos: "Database in memory" para prototipado.
└── ...config files
```

---

## 🎨 Sistema de Diseño (Design System)

Hemos construido un UI Kit interno en `components/UI.tsx` para garantizar consistencia visual sin dependencias pesadas.

### Componentes Clave
*   **Layout Shell:**
    *   **Sidebar:** Soporta modo colapsado en escritorio (solo iconos) y modo overlay en móvil. Gestiona la visibilidad de textos mediante clases CSS condicionadas por breakpoints (`lg:`).
*   **Sheet (Drawer):** Panel lateral deslizante utilizado para detalles profundos (Perfil 360) sin perder el contexto de la lista principal.
*   **Popover:** Utilizado para filtros complejos, permitiendo mantener la interfaz limpia.
*   **Feedback Visual:**
    *   **Badges:** Indicadores de estado (Activo, Pendiente, Inactivo) con codificación de color semántica.
    *   **Loaders:** Estados de carga simulados en botones y transiciones de página.

---

## 🚀 Módulos y Lógica de Negocio

### 4.1. Autenticación y Onboarding
*   **Login (`/login`):** Diseño "Split Screen" (Marca a la izquierda, Formulario a la derecha).
*   **Registro (`/register`):** Flujo de 2 pasos (Datos Admin -> Datos Empresa) para crear un nuevo Tenant.
*   **Onboarding (`/onboarding`):**
    *   Bienvenida personalizada.
    *   Configuración de integración (Chatwoot).
    *   Invitación de equipo inicial.
    *   *Lógica:* Este módulo se ejecuta fuera del `Layout` principal (vista standalone).

### 4.2. Dashboard y Analítica (`/`)
*   **Embudo de Recuperación:** Gráfico de barras apiladas (`recharts`) que visualiza la conversión: `Contactados` -> `En Conversación` -> `Recuperados`.
*   **Controles de Granularidad:** Permite cambiar la vista de datos entre Día, Semana y Mes.
*   **KPIs:** Indicadores de tendencia calculados con comparativas porcentuales.

### 4.3. Gestión de Clientes (CRM) (`/clients`)
*   **Filtros Facetados:** Sistema avanzado de filtrado múltiple (Estado + Banco + Región) utilizando `Popovers` y `Checkboxes`.
*   **Adaptabilidad Móvil:**
    *   En Desktop: Renderiza una `<table>` rica en datos.
    *   En Móvil: Transforma los datos en una lista de Tarjetas (`Cards`) para mejor legibilidad táctil.
*   **Perfil 360:** Al hacer clic en un cliente, se despliega un `Sheet` con:
    *   Resumen de cuenta.
    *   Estado técnico de terminales (Online/Offline, Batería).
    *   Historial de interacciones (Timeline).

### 4.4. Motor de Campañas
*   **Tablero Kanban (`/campaigns`):** Gestión visual de campañas por estado (Borrador, Enviando, Completado) con barras de progreso en tiempo real.
*   **Wizard de Creación (`/campaigns/new`):**
    *   **Máquina de Estados:** Wizard de 4 pasos estrictos.
    *   **Simulación de Audiencia:** Al cambiar filtros (Banco/Inactividad), el sistema "calcula" y muestra un número estimado de receptores.
    *   **Vista Previa Móvil:** Un mockup de celular renderiza en tiempo real cómo se verá el mensaje de WhatsApp, sustituyendo variables (`{{nombre}}`) por datos de ejemplo.
*   **Detalle de Campaña (`/campaigns/detail`):**
    *   Analítica de envío (Enviados vs Leídos).
    *   Gestión de miembros (reintentar fallidos).
    *   Gráficos de "Mejor hora de respuesta".

### 4.5. Configuración y Automatización (`/settings`)
*   **Gestión de Equipo:** Tabla de usuarios con roles (Admin, Agente, Viewer) e invitación por modal.
*   **Integraciones:** Formulario de conexión con Chatwoot (URL, Token).
*   **Motor de Reglas (Automation):**
    *   Interfaz "If This Then That" para mapear etiquetas externas a estados internos.
    *   *Ejemplo:* Si Chatwoot etiqueta = "pago_promesa" -> Cambiar estado CredicardPOS a "Pendiente".

### 4.6. Perfil de Usuario (`/profile`)
*   **Gestión de Identidad:** Edición de datos básicos y previsualización de carga de avatar (blob local).
*   **Seguridad:** Cambio de contraseña y toggle para 2FA.
*   **Preferencias:** Selección de tema (Claro/Oscuro) y configuración granular de notificaciones.

---

## 🔌 Integraciones Externas (Simuladas)

Aunque este es un frontend MVP, la arquitectura está preparada para conectarse con APIs reales. Actualmente simulamos:

1.  **Chatwoot (WhatsApp/Omnicanal):**
    *   **Embed (`/chatwoot-embed`):** Una vista minimalista diseñada para cargarse dentro de un `<iframe>` en el sidebar de Chatwoot, permitiendo a los agentes ver datos del cliente sin salir del chat.
    *   **API Simulation:** Retrasos artificiales (`setTimeout`) al probar conexiones o enviar campañas.

2.  **Webhooks:**
    *   La lógica de automatización en `/settings` prepara la estructura de datos para recibir payloads JSON de eventos externos.

---

## 💾 Modelo de Datos

Las interfaces principales (`types.ts`) definen el contrato de datos:

```typescript
// Ejemplo de estructura de Cliente
interface Client {
  id: string;
  name: string;
  status: 'activo' | 'inactivo' | 'pendiente';
  bank: string; // Ej: Mercantil, Banesco
  terminals: number;
  // ...
}

// Ejemplo de Tarea de Campaña
interface CampaignTask {
  id: string;
  status: 'draft' | 'sending' | 'completed';
  progress?: number;
  audience: number;
  // ...
}
```

---

## 🛠 Instalación y Despliegue

Este proyecto utiliza **pnpm** para una gestión eficiente de dependencias.

### Requisitos
*   Node.js 18+
*   pnpm

### Pasos
1.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

2.  **Iniciar servidor de desarrollo:**
    ```bash
    pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o puerto disponible).

3.  **Construir para producción:**
    ```bash
    pnpm build
    ```
    Genera archivos estáticos optimizados en la carpeta `/dist`.

---

**CredicardPOS** - *Innovación en Gestión Financiera.*
