# cn

Tiny utility to compose CSS class names with clsx and resolve Tailwind CSS conflicts with tailwind-merge.

This package exposes a single function, `cn`, inspired by the helper commonly used in shadcn/ui projects.

## Installation

```bash
npm install cn
```

## Why this package

- Combines plain class names
- Supports conditional values
- Supports arrays and object syntax through clsx
- Resolves conflicting Tailwind classes through tailwind-merge
- Ships ESM, CJS, and TypeScript declarations

## Usage

```ts
import { cn } from "cn";

const className = cn(
  "inline-flex items-center rounded-md",
  "px-3 py-2",
  isActive && "bg-slate-900 text-white",
  isDisabled && "pointer-events-none opacity-50",
  customClassName,
);
```

### Tailwind conflict resolution

```ts
import { cn } from "cn";

cn("p-2", "p-4");
// => "p-4"

cn("text-red-500", "text-blue-500");
// => "text-blue-500"

cn("hover:bg-red-500", "hover:bg-blue-500");
// => "hover:bg-blue-500"
```

### Object and array syntax

```ts
import { cn } from "cn";

cn("base", { active: true, disabled: false }, ["rounded", ["px-4"]]);
// => "base active rounded px-4"
```

## API

```ts
cn(...inputs: ClassValue[]): string
```

- `ClassValue` is re-exported from clsx
- `cn` returns a merged class name string

## Development

```bash
npm test
npm run typecheck
npm run build
```

## Build output

The package is published with:

- ESM output
- CommonJS output
- TypeScript declaration files

## License

MIT
