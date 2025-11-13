# GitHub Explorer Dashboard

A modern, responsive web application for searching, filtering, sorting, and exploring public GitHub repositories. Built with React, Vite, and Tailwind CSS, featuring debounced search, advanced filters, and optimized performance.

## 🚀 Features

### Core Functionality

- **🔍 Search**: Debounced search input with GitHub REST API integration
- **🎯 Advanced Filters**: Filter by language, license, and star count ranges
- **📊 Sorting**: Sort by stars, forks, or last updated date (ascending/descending)
- **📄 Pagination**: Navigate through results with active page highlighting
- **⚡ Performance Optimized**: Uses `useMemo`, `useCallback`, and skeleton loaders

### Technical Highlights

- **State Management**: Custom `useReducer` hook for immutable filter state
- **Reusable Components**: Modular architecture with separation of concerns
- **Error Handling**: Comprehensive error states and retry mechanisms
- **Responsive Design**: Mobile-first design that works on all devices
- **Loading States**: Skeleton loaders for better user experience
- **API Rate Limiting**: Proper handling of GitHub API rate limits

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API**: GitHub REST API
- **State Management**: React useReducer
- **Performance**: useMemo, useCallback, React.memo

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/github-explorer-dashboard.git
   cd github-explorer-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🏗️ Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist` directory, ready for deployment.

## 🧪 Testing

```bash
# Run tests (if you add test files)
npm run test
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SearchBar.jsx    # Debounced search input
│   ├── Filters.jsx      # Language, license, stars filters
│   ├── Sort.jsx         # Sorting controls
│   ├── Pagination.jsx   # Page navigation
│   └── RepositoryList.jsx # Repository cards and skeleton loaders
├── hooks/               # Custom React hooks
│   ├── useFilters.js    # Filter state management with useReducer
│   ├── useGitHubApi.js  # GitHub API integration
│   └── useDebounce.js   # Debounce utility hook
├── utils/               # Utility functions
│   └── index.js         # Helper functions and constants
├── types/               # Type definitions (JSDoc)
│   └── index.js         # Interface definitions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind components
```

## 🎨 Design System

The application uses a consistent design system with the primary color `#161616` and follows these principles:

- **Color Scheme**: Primary dark (`#161616`) with light gray backgrounds
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable card-based layout with consistent shadows and borders
- **Interactive Elements**: Smooth transitions and hover states

## 🔧 Configuration

### Environment Variables

No environment variables are required as the application uses the public GitHub API.

### API Configuration

The application uses the GitHub REST API endpoint:

```
https://api.github.com/search/repositories
```

Rate limits are handled automatically with proper error messages.

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)
- **Large screens** (1280px and up)

## ⚡ Performance Optimizations

### React Optimizations

- **React.memo**: All components are memoized to prevent unnecessary re-renders
- **useCallback**: Event handlers are memoized to maintain referential equality
- **useMemo**: Expensive computations and derived state are memoized
- **Code Splitting**: Components are optimized for lazy loading

### Loading Performance

- **Skeleton Loaders**: Provide immediate visual feedback while data loads
- **Debounced Search**: Reduces API calls by waiting for user to stop typing
- **Pagination**: Loads data in chunks to reduce initial load time

### Network Optimizations

- **Error Boundaries**: Graceful error handling for network failures
- **Retry Mechanism**: Allows users to retry failed requests
- **Rate Limit Handling**: Proper messaging when API limits are exceeded

## 🚦 API Usage

The application interacts with the GitHub Search API with the following parameters:

```javascript
// Example API call
https://api.github.com/search/repositories?q=react+language:javascript&sort=stars&order=desc&page=1&per_page=10
```

### Supported Filters

- **Query**: Text search across repository name and description
- **Language**: Filter by programming language
- **License**: Filter by repository license
- **Stars**: Filter by star count ranges
- **Sort**: stars, forks, updated
- **Order**: asc, desc

## 🔍 Search Query Syntax

The application supports GitHub's search syntax:

- `react` - Search for "react"
- `language:javascript` - Repositories in JavaScript
- `license:mit` - Repositories with MIT license
- `stars:>1000` - Repositories with more than 1000 stars
- `stars:100..1000` - Repositories with 100-1000 stars

## 🎯 Component Testing Example

Here's an example test for the SearchBar component:

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("SearchBar calls onChange after debounce delay", async () => {
  const mockOnChange = jest.fn();
  render(<SearchBar value="" onChange={mockOnChange} />);

  const input = screen.getByPlaceholderText(/search repositories/i);
  fireEvent.change(input, { target: { value: "react" } });

  // Wait for debounce delay
  await waitFor(
    () => {
      expect(mockOnChange).toHaveBeenCalledWith("react");
    },
    { timeout: 1000 }
  );
});
```

## 🚀 Deployment

### Vercel

```bash
npm run build
# Deploy to Vercel
```

### Netlify

```bash
npm run build
# Deploy dist folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy dist folder to GitHub Pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) for providing repository data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component library
- [Vite](https://vitejs.dev/) for the fast build tool

## 📧 Contact

For questions or suggestions, please open an issue or contact [your-email@example.com](mailto:your-email@example.com).

---

**Built with ❤️ for meCash Frontend Assessment**
