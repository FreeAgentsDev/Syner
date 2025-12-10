# Integración con Gemini para el Chat

Este documento explica cómo conectar el chat de ventas/asesorías con Google Gemini.

## Configuración

### 1. Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Guarda la key de forma segura

### 2. Instalar dependencias

```bash
npm install @google/generative-ai
```

### 3. Crear archivo de configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

**Importante:** Asegúrate de agregar `.env` al `.gitignore` para no subir tu API key al repositorio.

### 4. Modificar ChatWidget.astro

En el componente `ChatWidget.astro`, reemplaza la función `getSimulatedResponse` con una llamada real a Gemini:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function getGeminiResponse(message: string): Promise<string> {
  try {
    const prompt = `Eres un asistente de ventas de Synergrowth, una firma de consultoría especializada en ayudar a agencias de marketing a escalar de manera rentable y predecible. 
    
    Información sobre Synergrowth:
    - Calificación 4.8 en TrustPilot
    - 390+ socios activos
    - Tamaño promedio de acuerdos: $62,386
    - $14.24 millones generados en los últimos 12 meses
    - Fundada en 2022, sede en Londres
    - No requieren participación accionaria
    
    Servicios:
    1. Consultoría de Crecimiento
    2. Sistemas de Crecimiento
    3. Formación y Capacitación
    
    Responde de manera profesional, amigable y orientada a ayudar al cliente potencial. Si no sabes algo, ofrece conectar al cliente con un representante humano.
    
    Mensaje del cliente: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error al conectar con Gemini:', error);
    return 'Lo siento, estoy teniendo problemas técnicos. Por favor, contáctanos directamente por WhatsApp o LinkedIn.';
  }
}
```

### 5. Actualizar el handler del formulario

En el event listener del formulario, reemplaza:

```typescript
// Antes (simulado)
const response = getSimulatedResponse(message);
addMessage(response, 'bot');

// Después (con Gemini)
const response = await getGeminiResponse(message);
addMessage(response, 'bot');
```

### 6. Configurar variables de entorno en Astro

En `astro.config.mjs`, agrega:

```javascript
export default defineConfig({
  integrations: [tailwind()],
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});
```

## Notas de Seguridad

- **Nunca** expongas tu API key en el código del cliente
- Usa variables de entorno para todas las keys
- Considera usar un endpoint de API server-side para hacer las llamadas a Gemini
- Implementa rate limiting para prevenir abuso

## Alternativa: Endpoint Server-Side

Para mayor seguridad, puedes crear un endpoint API en Astro:

1. Crea `src/pages/api/chat.ts`:

```typescript
import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const POST: APIRoute = async ({ request }) => {
  const { message } = await request.json();
  
  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  // ... lógica de Gemini ...
  
  return new Response(JSON.stringify({ response: '...' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

2. En el cliente, haz una petición fetch a `/api/chat`

## Próximos Pasos

- [ ] Implementar historial de conversación
- [ ] Agregar persistencia de mensajes
- [ ] Implementar detección de intención de venta
- [ ] Conectar con CRM para seguimiento de leads

