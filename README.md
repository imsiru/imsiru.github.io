# SIRU's Personal Website - React Version

A React-based personal website for SIRU, the cutest dog! 🐾

## Features

- **Home Page**: Introduction with animated text and dog specifications
- **Diary Page**: Interactive calendar with diary entries from Google Sheets
- **Favorites Page**: Showcase of SIRU's favorite things
- **Gallery Page**: Photo gallery (placeholder)
- **Guestbook Page**: Interactive guestbook with localStorage persistence
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18.2.0**: Modern React with hooks
- **React Router 6.8.0**: Client-side routing
- **PapaParse 5.3.2**: CSV parsing for diary data
- **CSS3**: Custom styling with Korean web fonts

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sirupan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   └── Footer.js          # Footer component
├── pages/
│   ├── Home.js            # Home page with animated text
│   ├── Diary.js           # Calendar and diary functionality
│   ├── Favorites.js        # Favorites things showcase
│   ├── Gallery.js         # Photo gallery
│   └── Guestbook.js       # Interactive guestbook
├── App.js                 # Main app component with routing
├── index.js               # React entry point
└── index.css              # Global styles

public/
├── index.html             # HTML template
├── menu.ico               # Menu icon
└── images/                   # Image assets
    ├── arrow.png
    ├── home/
    │   └── 1.png
    └── fav/
        ├── food.jpg
        ├── toy.jpg
        └── play.jpg
```

## Key Features Explained

### Diary Integration
The diary page fetches data from a Google Sheets CSV export and displays it in an interactive calendar. Users can click on dates to view diary entries in a popup modal.

### Guestbook Persistence
The guestbook uses localStorage to persist messages between sessions. Form validation ensures all fields are completed before submission.

### Responsive Navigation
The navigation includes a hamburger menu for mobile devices and smooth transitions for a better user experience.

### Korean Web Fonts
The project uses various Korean web fonts for a more authentic Korean design aesthetic.

## Data Sources

- **Diary Data**: Google Sheets CSV export
- **Guestbook**: Browser localStorage
- **Images**: Local assets in public/images directory

## Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add a route in `src/App.js`
3. Add a navigation link in `src/components/Navbar.js`

### Styling
All styles are in `src/index.css`. The project uses CSS classes for styling with Korean web fonts.

### Diary Data
Update the `spreadsheetCsvUrl` in `src/pages/Diary.js` to point to your own Google Sheets CSV export.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

ISC License

## About SIRU

SIRU is a Maltipoo dog born on February 8, 2025, who joined the Ahn family on July 9, 2025. This website showcases SIRU's daily life and favorite things! 🐕 