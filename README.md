# 🎮 Nexora - Premium Game Top-Up Platform

![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)

Nexora is a modern, enterprise-grade frontend application for game top-ups and digital transactions. Built with a strict focus on **Clean Architecture**, high performance, and exceptional User Experience (UX).

## ✨ Key Features

- **Domain-Driven Mock API:** Simulates network latency and relational databases for dynamic SKU packages per game (e.g., Mobile Legends, Valorant, Genshin Impact).
- **Advanced State Management:** Utilizes `Zustand` with local storage persistence to manage shopping carts and transaction histories across sessions.
- **Enterprise-Grade Validation:** Strict form validation using `React Hook Form` and `Zod` schemas to ensure type safety and data integrity before API submission.
- **Interactive Payment Gateway UI:** Dynamic invoice modals featuring real-time QR Code generation (QRIS API integration) and Virtual Account rendering based on user selection.
- **Defensive Programming & Resiliency:** Built-in safeguards against corrupted local cache and backward compatibility issues to prevent UI crashes (Blank Screen of Death).
- **Time-Based Logic:** Implements a 24-hour expiration timer for pending transactions with a dynamic status updater.
- **Modern UI/UX:** Responsive Glassmorphism design system using Tailwind CSS and Lucide React icons.

## 🏗️ Architecture & Project Structure

This project follows a feature-based **Clean Architecture** structure to ensure scalability, maintainability, and separation of concerns.

```text
src/
├── components/       # Reusable UI components (Buttons, Inputs, Cards)
├── constants/        # Application-wide configurations and routing maps
├── features/         # Domain-specific logic (e.g., checkout schemas)
├── layouts/          # Page wrappers (Sidebar, Navbar, MainLayout)
├── pages/            # Routable view components
├── services/         # Data Access Object (DAO) and Mock API endpoints
├── store/            # Global state definitions (Zustand)
├── types/            # TypeScript interfaces and type definitions
└── utils/            # Helper functions (e.g., Tailwind class merging)
```

## 🚀 Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`
- **State Management:** Zustand (with Persist Middleware)
- **Form Handling:** React Hook Form
- **Schema Validation:** Zod
- **Routing:** React Router DOM v6
- **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RizkiAllam/nexora-game-topupUI.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nexora-game-topupUI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`.

## 🛡️ Type Safety & Linting

This project is configured with strict ESLint rules and TypeScript strict mode to catch potential bugs during compile time, ensuring production-ready code quality.
