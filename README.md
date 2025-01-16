# KhatraEvents

A web-based event management and ticket selling platform for Nepal.

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

## Prerequisites

- Node.js 18+ 
- PostgreSQL
- pnpm (recommended) or npm

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd khatra_events
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
   or 

   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your values

4. Set up the database:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```
   or

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```
   or

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/      # Authentication routes
│   ├── (main)/      # Main application routes
│   └── api/         # API routes
├── components/       # React components
│   └── ui/          # UI components
├── lib/             # Library code
│   └── prisma/      # Prisma client
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Development Guidelines

1. Follow TypeScript best practices
2. Use ESLint and Prettier for code formatting
3. Write tests for critical functionality
4. Follow the feature branch workflow
5. Use conventional commits

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[MIT] - See LICENSE file for details 