# Next.js Application Template

Welcome to your Next.js Application Template! This repository provides a comprehensive starting point for building modern web applications with Next.js, featuring integrations with Tailwind CSS, NextAuth, NextUI, and Leaflet. The template includes useful utilities for managing environment variables and decoding Google Cloud JSON files.

## Table of Contents

- [Next.js Application Template](#nextjs-application-template)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Directory Structure](#directory-structure)
  - [Detailed Component Breakdown](#detailed-component-breakdown)
    - [Tailwind CSS](#tailwind-css)
    - [NextAuth Authentication](#nextauth-authentication)
    - [NextUI Integration](#nextui-integration)
    - [Leaflet Map Integration](#leaflet-map-integration)
    - [Python Utilities](#python-utilities)
    - [Custom Pages and Components](#custom-pages-and-components)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Next.js**: Powerful React framework for server-side rendering, static site generation, and more.
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.
- **NextAuth**: Full-featured authentication for Next.js applications.
- **NextUI**: Modern, beautiful, and fully customizable UI components for React.
- **Leaflet**: Interactive map integration for your application.
- **Python Utilities**: Handy scripts for generating secure secrets and decoding Google Cloud credentials.
- **Pre-configured Pages**: Ready-to-use Home and User pages, along with Navbar and Footer components.
- **Easy Customization**: Manage constants like page titles, social media links, and more in `src/utils/constants.js`.

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [Git](https://git-scm.com/)
- [Python](https://www.python.org/) (for running utility scripts)

### Installation

Clone the repository and set up your environment by following these steps:

```bash
git clone https://github.com/aquilesbailo123/basic-nextjs ./
copy .env.local.template .env.local
npm install
npm run dev
```

### Configuration

1. **Environment Variables**:
   - Rename `.env.local.template` to `.env.local` to configure environment variables necessary for the application.
   - Generate secure secrets for environment variables using `generate_secrets.py`.

   Example `.env.local` file:

   ```env
   NEXTAUTH_SECRET=your_generated_secret_here
   VERCEL=your_generated_vercel_secret_here
   ```

2. **Python Utilities**:
   - **`encode_json.py`**: Encode Google Cloud JSON credentials.
   - **`generate_secrets.py`**: Generate random secrets for environment variables.

   Run these utilities as needed:

   ```bash
   python3 encode_json.py
   python3 generate_secrets.py
   ```

## Directory Structure

Here’s an overview of the project structure:

```plaintext
├── .next/
├── node_modules/
├── public/
│   ├── logo.png
│   ├── ...
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── providers.js
│   ├── components/
│   │   ├── miniPages/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── lib/
│   │   ├── db.js
│   │   ├── gcs.js
│   │   └── multer.js
│   ├── pages/
│   │   ├── api/auth/
│   │   ├── home.js
│   │   ├── user.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── constants.js
├── .env.local
├── tailwind.config.js
├── next.config.mjs
├── package.json
└── README.md
```

## Detailed Component Breakdown

### Tailwind CSS

- **Description**: Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. This project is pre-configured with Tailwind CSS, providing a robust foundation for styling your application.
- **Configuration**: The Tailwind CSS configuration is located in `tailwind.config.js`. It is extended with NextUI integration for enhanced theme customization.

  ```javascript
  import { nextui } from "@nextui-org/react";
  
  module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          work: ['Work Sans', 'sans-serif'],
        },
      },
    },
    plugins: [nextui({ defaultTheme: "light" })],
  };
  ```

- **Documentation**: [Tailwind CSS Documentation](https://tailwindcss.com/docs).

### NextAuth Authentication

- **Description**: NextAuth.js is a complete open-source authentication solution for Next.js applications. It is pre-configured in this template for easy setup with multiple authentication providers.
- **Location**: Authentication logic is handled in `src/pages/api/auth/[...nextauth].js`.

- **Configuration**:
  - Update your `.env.local` with `NEXTAUTH_SECRET` and other provider-specific environment variables.
  - Modify `[...]nextauth.js` to customize providers and session handling.

- **Documentation**: [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction).

### NextUI Integration

- **Description**: NextUI provides a sleek and modern set of UI components that are highly customizable and easy to integrate with Tailwind CSS. This template includes NextUI for building responsive and visually appealing interfaces.
- **Location**: The NextUI integration is set up in `tailwind.config.js` and used across various components like Navbar and Footer.

- **Getting Started**:
  - Explore the components provided by NextUI and integrate them into your pages and components.
  - Customize the theme in `tailwind.config.js` if needed.

- **Documentation**: [NextUI Documentation](https://nextui.org/docs/guide/introduction).

### Leaflet Map Integration

- **Description**: Leaflet is an open-source JavaScript library for mobile-friendly interactive maps. It’s integrated into this template to allow you to easily add map functionalities to your application.
- **Location**: Leaflet configuration is found in `src/lib/gcs.js`.

- **Usage**:
  - Import and use Leaflet in your pages or components where map functionality is required.
  - Customize the map's appearance and behavior according to your needs.

- **Documentation**: [Leaflet Documentation](https://leafletjs.com/).

### Python Utilities

- **encode_json.py**: This script is used to encode your Google Cloud JSON credentials, making it easier to manage them in your application.
- **generate_secrets.py**: A utility to generate random strings used as secrets in environment variables. Use this script to generate `NEXTAUTH_SECRET`, `VERCEL`, and other sensitive keys.

  Example usage:

  ```bash
  python3 generate_secrets.py
  ```

  This will print a random string that can be used for secure environment variables.

### Custom Pages and Components

- **Home and User Pages**:
  - The `/home` and `/user` pages are pre-configured with essential components such as Navbar and Footer.
  - Customize these pages in `src/pages/home.js` and `src/pages/user.js`.

- **Reusable Components**:
  - **Navbar and Footer**: Located in `src/components/`, these components are designed to be reusable across different pages.
  - **Constants**: All constants like page titles, social media links, and more can be managed in `src/utils/constants.js`.

- **Global Styles**:
  - Global styles are handled in `src/styles/globals.css`, which includes Tailwind's base styles and customizations.

## Running the Application

To start the development server, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Contributing

We welcome contributions to this template! Feel free to fork the repository, create issues, and submit pull requests. Contributions are crucial for the growth and improvement of this template.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.