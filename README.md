# envt

type-safe **client-side** environment variables with runtime validation

eliminate `process.env.UNDEFINED_VAR` runtime errors and get compile-time safety for your client-side environment variables.

> **⚠️ Client-side only**: This tool focuses on client-side environment variables (NEXT*PUBLIC*\_, PUBLIC\_\_, VITE*\*, REACT_APP*\*). For server-side variables, use Next.js API routes or server components.

## quick start

### **Installation**

```bash
# Option 1: Install locally (recommended)
npm install envt

# Option 2: Install globally
npm install -g envt

# Option 3: Use with npx (no installation needed)
npx envt init
```

### **Setup**

```bash
# Initialize config
npx envt init

# Generate validation files
npx envt generate
```

## basic usage

1. **create config** - define your environment variables once

```bash
npx envt init
```

2. **edit config** - customize your `env.config.ts`

```typescript
export const config = {
  // Client-side variables only (NEXT_PUBLIC_*, PUBLIC_*, VITE_*, REACT_APP_*)
  NEXT_PUBLIC_API_URL: {
    type: "string",
    required: true,
    description: "api base url for client requests",
  },
  NEXT_PUBLIC_APP_PORT: {
    type: "number",
    default: 3000,
    description: "application port",
  },
  NEXT_PUBLIC_NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    default: "development",
  },
};
```

3. **generate validation** - create runtime validation + types

```bash
npx envt generate
```

4. **use in your app** - get type safety + runtime validation

### **Next.js Example (Recommended)**

Create a `lib/env.ts` file to validate once and export:

```typescript
// lib/env.ts
import { validateEnv } from "../env-validation.js";

// Validate environment variables once at startup
export const env = validateEnv();

// Now you have type-safe access throughout your app
export default env;
```

Use in your providers or components:

```typescript
// app/providers.tsx
import { env } from '../lib/env';

export function Providers({ children }: { children: React.ReactNode }) {
  // Environment is already validated and typed
  console.log('API URL:', env.NEXT_PUBLIC_API_URL); // string
  console.log('Debug mode:', env.NEXT_PUBLIC_DEBUG_MODE); // boolean
  console.log('Environment:', env.NEXT_PUBLIC_NODE_ENV); // 'development' | 'production' | 'test'

  return (
    <div>
      {/* Your providers */}
      {children}
    </div>
  );
}
```

### **Direct Usage**

```typescript
import { validateEnv } from "./env-validation.js";

// this throws if environment is invalid
const env = validateEnv();

// now you have full type safety for client-side variables
console.log(env.NEXT_PUBLIC_API_URL); // string
console.log(env.NEXT_PUBLIC_APP_PORT); // number
console.log(env.NEXT_PUBLIC_NODE_ENV); // 'development' | 'production' | 'test'
```

## cli commands

- `npx envt init` - create config template
- `npx envt generate` - generate validation + types
- `npx envt validate` - validate current environment
- `npx envt check` - show environment status

## supported types

- `string` - basic string validation
- `number` - parse and validate numbers
- `boolean` - convert 'true'/'false' strings
- `enum` - validate against allowed values
- `json` - parse json strings into objects

## client-side vs server-side

### ✅ client-side variables (supported)

- `NEXT_PUBLIC_*` - Next.js public variables
- `PUBLIC_*` - SvelteKit public variables
- `VITE_*` - Vite public variables
- `REACT_APP_*` - Create React App variables

### ❌ server-side variables (not supported)

- `DATABASE_URL`, `API_SECRET`, `JWT_SECRET`, etc.
- These are not accessible on the client-side and will cause runtime errors
- Use Next.js API routes or server components for server-side variables

## license

MIT
