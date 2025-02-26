# Guidance of Grace
https://guidanceofgrace.com

A web-based tool to help *Elden Ring* players navigate the game world efficiently by calculating optimal paths between locations, items, and bosses.

## Project Overview

This application allows players to:
- Select an item they want to obtain
- Configure preferences (glitch usage, boss fights, owned items, quest progress)
- Receive an optimal route based on their preferences

## Project Structure

```
elden-router-next/
├── apps/
│   └── web/                        # Main Next.js web application
│       ├── actions/                # Server actions
│       ├── app/                    # App router components
│       ├── components/             # React components
│       ├── hooks/                  # Custom React hooks
│       ├── lib/                    # Utility functions
│       └── state/                  # State management
│
└── packages/
    ├── data/                       # Game data used in routing
    │   └── src/
    │       ├── enemies.ts          # Enemy data
    │       ├── flags.ts            # Game flags/triggers
    │       ├── glitches.ts         # Available glitches
    │       ├── items.ts            # Item data
    │       ├── locations.ts        # Game locations
    │       └── quests.ts           # Quest data
    │
    ├── routing/                    # Pathfinding algorithm and graph structure
    │   └── src/
    │       ├── edges/              # Graph connections
    │       │   ├── items/          # Item-related edges
    │       │   └── locations/      # Location-related edges
    │       │
    │       └── utils/              # Routing utilities
    │           ├── edge-utils.ts
    │           ├── graph-utils.ts
    │           ├── graph.ts        # Graph implementation
    │           └── types.ts        # TypeScript types
    │
    └── ui/                         # UI components (shadcn/ui)
        └── src/
            ├── components/         # Reusable shadcn/ui components
            ├── hooks/              # UI-related hooks
            ├── lib/                # UI utilities
            └── styles/             # Styling (Tailwind)
```

## Key Technologies

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing Algorithm**: Custom graph-based pathfinding
- **Data Management**: TypeScript type-safe game data

## Development

### Prerequisites

- Node.js 18+
- pnpm (preferred package manager)

### Setup

```bash
# Clone the repository
git clone https://github.com/yeager-j/elden-router.git
cd elden-router

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### Project Structure Details

#### Apps

- **web**: The main Next.js application that users interact with.

#### Packages

- **data**: Contains game data used for routing:
    - Enemies, items, locations, quests, flags, and available glitches

- **routing**: Implements the pathfinding algorithm:
    - Graph structure with nodes (locations, items) and edges (connections)
    - Edge definitions for items and locations
    - Utility functions for traversing the graph

- **ui**: Shared UI components built with shadcn/ui:
    - Reusable components for consistent styling
    - Hooks for UI functionality
    - Tailwind CSS configuration

## Features

- **Route Calculation**: Find the optimal path between any two points in the game
- **Quest Tracking**: Adjust routes based on quest progress
- **Preference Configuration**: Customize routing based on player preferences
- **Item Tracking**: Account for key items that unlock alternate paths
- **Glitch Support**: Optionally include glitches for speedrun strategies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
