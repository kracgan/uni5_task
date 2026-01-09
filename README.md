# LexCorp Attendance Management Dashboard

A React.js implementation of the LexCorp HR attendance management dashboard.

## Features

- **Sidebar Navigation**: Quick access to different sections (Dashboard, Org., Calendar, Parkings, Recruit, Messages, Help, Settings)
- **Header**: Main navigation tabs, search functionality, and user profile
- **Dashboard Cards**: 
  - Today's attendance status with progress indicator
  - Average hours and check-in/check-out times
  - Attendance statistics with visual progress rings
- **Data Tables**:
  - My Team: View team members' attendance for multiple dates
  - Working History: Track daily arrival, departure, and effective working hours

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
  ├── components/
  │   ├── Sidebar.js
  │   ├── Sidebar.css
  │   ├── Header.js
  │   ├── Header.css
  │   ├── Dashboard.js
  │   └── Dashboard.css
  ├── App.js
  ├── App.css
  ├── index.js
  └── index.css
```

## Technologies Used

- React 18.2.0
- CSS3 (Custom styling)
- React Scripts 5.0.1

## Customization

The dashboard uses a clean, modern design with:
- Light grey background (#f5f5f5)
- White cards with subtle shadows
- Green accent color for LexCorp branding (#22c55e)
- Blue accent for active states (#3b82f6)
- Responsive grid layout

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
