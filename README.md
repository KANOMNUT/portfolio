# Portfolio Website

A modern, responsive portfolio website showcasing professional experience and skills. Built with **Next.js 13**, **TypeScript**, **Tailwind CSS**, and **DaisyUI** with comprehensive testing and Docker support.

## 🚀 Features

- **Fully Responsive Design** - Mobile-first approach with seamless experience across all devices
- **Interactive Components** - Smooth animations and transitions using CSS and React
- **Type-Safe Development** - Full TypeScript support with strict type checking
- **Professional Showcase** - Display of work experience, skills, and contact information
- **Experience Timeline** - Interactive vertical timeline component displaying career progression
- **Contact Integration** - One-click copy functionality for contact information (email, phone)
- **Dark/Light Mode Support** - Theme switching capability with next-themes
- **Comprehensive Testing** - Jest and React Testing Library with 80% minimum coverage
- **SEO Optimized** - Next.js server-side rendering for better search engine indexing
- **Docker Ready** - Multi-stage Docker configuration for containerized deployment
- **Production Optimized** - Built-in performance monitoring with prom-client metrics

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 13.4.19 |
| **Language** | TypeScript 5.9+ |
| **Styling** | Tailwind CSS 3.3.3, DaisyUI 3.8.3, PostCSS |
| **UI Components** | React Icons, Flowbite React, React Vertical Timeline |
| **Theme Management** | next-themes |
| **Testing** | Jest 30.2.0, React Testing Library 16.3.0 |
| **Type Checking** | TypeScript (strict mode) |
| **Linting** | ESLint 9.37.0 |
| **Utilities** | clipboard.js (copy-to-clipboard), prom-client (Prometheus metrics) |
| **Containerization** | Docker (multi-stage build) |

## 📋 Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher
- **Docker** (optional, for containerized deployment)

## 🏃‍♂️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KANOMNUT/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:8080](http://localhost:8080)

### 4. Build for Production

```bash
npm run build
npm start
```

Production build will also run on [http://localhost:8080](http://localhost:8080)

## 🧪 Testing

This project includes comprehensive unit tests for all components with a minimum 80% code coverage requirement.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Coverage Requirements

- **Branches**: 80% minimum
- **Functions**: 80% minimum
- **Lines**: 80% minimum
- **Statements**: 80% minimum

### Test Files Location

All test files are located in `src/__tests__/` directory:
- `About.test.tsx` - About section component tests
- `BackToTop.test.tsx` - Back to top button tests
- `Experience.test.tsx` - Experience timeline component tests
- `Footer.test.tsx` - Footer component tests
- `Navbar.test.tsx` - Navigation bar tests
- `SectionDivider.test.tsx` - Section divider component tests
- `Skills.test.tsx` - Skills section tests

### Testing Features

- Unit tests for all React components
- Mocked browser APIs (DOM, window objects)
- Interactive element testing (clicks, inputs)
- Responsive design validation
- Accessibility testing
- Modal and dialog interaction tests

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                        # Next.js 13+ app directory
│   │   ├── layout.tsx              # Root layout wrapper
│   │   ├── page.tsx                # Main home page
│   │   └── globals.css             # Global styles
│   │
│   ├── components/                 # Reusable React components
│   │   ├── About.tsx               # About/Contact section with modals
│   │   ├── BackToTop.tsx           # Floating back-to-top button
│   │   ├── Experience.tsx          # Career timeline section
│   │   ├── Footer.tsx              # Footer with copyright and credits
│   │   ├── Navbar.tsx              # Navigation bar with mobile support
│   │   ├── SectionDivider.tsx      # Visual divider between sections
│   │   └── Skills.tsx              # Skills and interests showcase
│   │
│   ├── data/                       # Static content data
│   │   ├── contact.ts              # Contact information (email, phone, social)
│   │   ├── experience.ts           # Work experience entries
│   │   ├── skills.ts               # Technical skills and interests
│   │   └── index.ts                # Data exports
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── components.ts           # Component prop interfaces
│   │   ├── data.ts                 # Data structure types
│   │   └── index.ts                # Type exports
│   │
│   ├── constants/                  # Application constants
│   │   └── styles.ts               # Reusable Tailwind CSS class collections
│   │
│   ├── __tests__/                  # Jest test files
│   │   ├── About.test.tsx
│   │   ├── BackToTop.test.tsx
│   │   ├── Experience.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── Navbar.test.tsx
│   │   ├── SectionDivider.test.tsx
│   │   └── Skills.test.tsx
│   │
│   └── test/                       # Test configuration
│       └── setupTests.ts           # Jest setup and global test configuration
│
├── public/                         # Static assets (images, fonts, etc.)
├── coverage/                       # Test coverage reports (generated)
│   └── lcov-report/               # HTML coverage report
│
├── Dockerfile                      # Multi-stage Docker build configuration
├── jest.config.js                  # Jest test runner configuration
├── jest.setup.js                   # Jest environment setup
├── next.config.js                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── sonar-project.properties        # SonarQube code quality configuration
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
└── README.md                       # This file
```

## 📄 Component Documentation

### Navbar
- Sticky navigation bar with smooth scroll behavior
- Mobile-responsive hamburger menu
- Navigation links to About, Experience, Skills sections
- Resume download link
- Accessibility-compliant with ARIA labels

### About
- Personal introduction and contact section
- Interactive modals for displaying contact information
- Copy-to-clipboard functionality for email and phone
- Social media links (LinkedIn, GitLab)
- Resume download button

### Experience
- Vertical timeline displaying work history
- Shows job title, company, location, and period

### Skills
- **Technical Skills**
- **Interests**
- Icons and visual representation for each skill

### Footer
- Copyright information with current year
- Technology stack credits (Next.js, Tailwind CSS)
- Responsive design

## 🧰 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server on port 8080 |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server on port 8080 |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler without emitting output |
| `npm test` | Run all Jest tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate and display coverage report |

## 🐳 Docker Setup

### Build Docker Image

```bash
docker build -t portfolio:latest .
```

### Run Docker Container

```bash
docker run -p 8080:3000 portfolio:latest
```

The application will be available at [http://localhost:8080](http://localhost:8080)

### Docker Configuration

The Dockerfile uses a multi-stage build approach:
1. **Builder Stage**: Uses Node.js 18 to install dependencies and build the application
2. **Runner Stage**: Uses lightweight Node.js 18-alpine to serve the application
3. **Exposed Port**: 3000 (mapped to 8080 in examples)

## 📊 Code Quality

### Type Checking

```bash
npm run typecheck
```

Ensures strict TypeScript compliance with no implicit `any` types.

### Linting

```bash
npm run lint
```

Enforces code style and quality standards using ESLint with Next.js configuration.

### Test Coverage

The project maintains 80% minimum coverage across:
- **Statements**: Code lines executed
- **Branches**: Conditional paths tested
- **Functions**: Function calls covered
- **Lines**: Physical lines tested

View HTML coverage report at `coverage/lcov-report/index.html`
