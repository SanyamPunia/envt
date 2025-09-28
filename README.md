# env-safe

type-safe environment variables with runtime validation

eliminate `process.env.UNDEFINED_VAR` runtime errors and get compile-time safety for all your environment variables.

## quick start

```bash
# install globally
npm install -g env-safe

# or use with npx
npx env-safe init
```

## basic usage

1. **create config** - define your environment variables once

```bash
npx env-safe init
```

2. **edit config** - customize your `env.config.ts`

```typescript
import { EnvConfig } from "env-safe/types";

export const config: EnvConfig = {
  DATABASE_URL: {
    type: "string",
    required: true,
    description: "postgresql connection string",
  },
  PORT: {
    type: "number",
    default: 3000,
    description: "server port",
  },
  NODE_ENV: {
    type: "enum",
    values: ["development", "production", "test"],
    default: "development",
  },
};
```

3. **generate validation** - create runtime validation + types

```bash
npx env-safe generate
```

4. **use in your app** - get type safety + runtime validation

```typescript
import { validateEnv } from "./env-validation.js";

// this throws if environment is invalid
const env = validateEnv();

// now you have full type safety
console.log(env.DATABASE_URL); // string
console.log(env.PORT); // number
console.log(env.NODE_ENV); // 'development' | 'production' | 'test'
```

## cli commands

- `npx env-safe init` - create config template
- `npx env-safe generate` - generate validation + types
- `npx env-safe validate` - validate current environment
- `npx env-safe check` - show environment status

## supported types

- `string` - basic string validation
- `number` - parse and validate numbers
- `boolean` - convert 'true'/'false' strings
- `enum` - validate against allowed values
- `json` - parse json strings into objects

## license

MIT
