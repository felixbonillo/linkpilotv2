# 🚀 LinkPilot Mobile — React Native + Expo  
**Gestor de enlaces moderno, rápido y persistente.**  
Guarda, organiza y comparte tus enlaces desde una interfaz limpia construida con una arquitectura modular.

---

## 🧠 Resumen del Proyecto

**LinkPilot Mobile** es una aplicación creada con **React Native + Expo**, enfocada en demostrar buenas prácticas de arquitectura, gestión de estado global, navegación nativa y persistencia offline.

Incluye:

- Creación de enlaces (con título opcional)  
- Abrir enlaces directamente en el navegador  
- Compartir enlaces usando la API nativa (`Share`)  
- Persistencia local con **AsyncStorage**  
- Eliminación individual o general  
- Pantalla de carga mientras se hidrata el estado  
- Arquitectura profesional basada en módulos (“feature-based”)  

Es un proyecto ideal para portafolios y entrevistas técnicas.

---

## 🏗️ Tech Stack

| Tecnología | Uso |
|-----------|-----|
| **Expo** | Entorno y build |
| **React Native** | Desarrollo nativo |
| **React Navigation (Native Stack)** | Navegación entre pantallas |
| **Context API** | Estado global |
| **AsyncStorage** | Persistencia local |
| **react-native-safe-area-context** | Manejo de área segura |
| **uuid (react-native-uuid)** | Generación de IDs |
| **TypeScript (opcional)** | Tipado avanzado |

---

## 📂 Estructura del Proyecto

linkpilot-mobile/
App.tsx
src/
core/
navigation/
RootStack.tsx
modules/
links/
components/
LinkCard.tsx
context/
LinkContext.tsx
screens/
HomeScreen.tsx
AddLinkScreen.tsx
types/
link.types.ts


**Arquitectura modular por features**, fácil de escalar y mantener.

---

## ✨ Funcionalidades

### 🔗 Gestión de enlaces
- Guardar nuevos enlaces  
- Título opcional  
- Validación de URLs  
- Fecha de creación  

### 💾 Persistencia offline
- Guardado automático en AsyncStorage  
- Rehidratación al abrir la app  
- Protección para evitar sobrescrituras mientras carga  

### 📤 Compartir enlace (API nativa)
- WhatsApp  
- Telegram  
- Email  
- Apps instaladas  

### 🗑️ Acciones rápidas
- Borrar enlace individual  
- Limpiar todos los enlaces  

### 🎨 UI limpia y funcional
- `LinkCard` reutilizable  
- Componentes desacoplados  
- Estilos consistentes  

---

## 🚦 Cómo correr el proyecto

### 1. Instalación de dependencias

```bash
npm install

npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context
npm install react-native-uuid


npx expo start


npx eas build --platform android

🧠 Aprendizajes técnicos aplicados

Arquitectura modular (feature-based)

Context API con persistencia asincrónica

Hidratar estado desde AsyncStorage (patrón offline-first básico)

Navegación con NativeStackNavigator

Uso de APIs nativas: Share, Linking

Manejo de SafeAreaView y UI responsiva

Optimización básica con useMemo

🤝 Contribución

Sugerencias, issues y PRs son bienvenidos.
Posibles mejoras futuras:

Almacenamiento con SQLite

Sincronización remota (offline-first completo)

Búsqueda global y filtros

Carpetas / etiquetas por categoría

📄 Licencia

MIT License — libre para usar y modificar.

👨‍💻 Autor

Félix Bonillo
Desarrollador React / React Native
GitHub: https://github.com/felixbonillo