# Activity Picker - Desktop App

A minimal desktop application built with **Electron** and **Angular** for Windows, designed to help you decide what to do in your free time.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F?logo=electron)
![Angular](https://img.shields.io/badge/Angular-21.0.0-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)

---

## Summary

In my daily software development work, I have been actively using Windows Forms applications for a long time. While these applications functionally meet most requirements quite well, as is known, they are not as flexible and powerful in terms of design as modern frontend frameworks.

On the frontend side, especially in web projects, since I am accustomed to working with Angular, I wanted to establish a more modern, clean, and manageable structure on the desktop side as well. At this point, the Electron + Angular combination became a natural choice for me.

This project emerged with the aim of developing a simple and minimal desktop application running on Windows using Electron and Angular together. As a starting point, I deliberately chose a very simple application.

The application is designed as a small and lightweight helper that saves activities that can be done in free time and randomly selects one of them when you're indecisive. Data is simply stored in a JSON-based text file, without using any backend or database.

This project was developed for me to:
- See Electron + Angular integration
- Try modern frontend approach in desktop applications
- Create a simple but complete product

---

## Features

- ✅ **Add Activities**: Save your favorite activities
- ✅ **Edit Activities**: Update existing activities with smooth UX
- ✅ **Delete Activities**: Remove activities you no longer want
- ✅ **Random Selection**: Let the app decide what to do
- ✅ **Persistent Storage**: Data saved in local JSON file
- ✅ **Portable**: No installation required, works anywhere
- ✅ **Minimalist Design**: Clean black & white interface
- ✅ **No Backend**: Completely offline, no server needed
- ✅ **No Database**: Simple JSON file storage

---

## Technologies Used

### Core
- **[Electron](https://www.electronjs.org/)** `v28.0.0` - Desktop application framework
- **[Angular](https://angular.io/)** `v21.0.0` - Frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** `v5.9.2` - Type-safe development

### UI Framework
- **[Angular Material](https://material.angular.io/)** `v21.0.0` - Material Design components
- **Material Icons** - Icon library

### State Management
- **Angular Signals** - Reactive state management (Angular 21 best practice)

### Architecture
- **Standalone Components** - Modern Angular architecture
- **IPC Communication** - Secure Electron-Angular bridge
- **Context Isolation** - Security-first approach

---

## Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v10 or higher)

### Clone the Repository
```bash
git clone https://github.com/yourusername/angular-electron-desktop.git
cd angular-electron-desktop
```

### Install Dependencies
```bash
npm install
```

---

## How to Use

### Development Mode

#### 1. Build Angular Application
```bash
npm run build
```

#### 2. Run Electron
```bash
npm run electron
```

#### Or, Build and Run in One Command
```bash
npm run electron-build
```

### Production Build

Create a portable Windows executable:
```bash
npm run package
```

The executable will be created in the `release/` folder.

---


## Project Structure

```
angular-electron-desktop/
├── src/                          # Angular source code
│   ├── app/
│   │   ├── app.ts               # Main app component
│   │   ├── app.html             # App template
│   │   ├── home.component.ts    # Home page (random selection)
│   │   ├── manage.component.ts  # Management page (CRUD)
│   │   └── activity.service.ts  # Activity service (Signal-based)
│   ├── electron.d.ts            # Electron API type definitions
│   ├── main.ts                  # Angular bootstrap
│   ├── index.html               # HTML shell
│   └── styles.css               # Global styles
├── main.js                      # Electron main process
├── preload.js                   # Electron preload script
├── package.json                 # Dependencies and scripts
├── angular.json                 # Angular configuration
└── activities.json              # Data file (auto-created)
```

---

## Data Storage

### File Location
Data is stored in `activities.json` in the application directory.

**Development Mode**:
```
C:\path\to\angular-electron-desktop\activities.json
```

**Production Mode** (portable .exe):
```
[Application Directory]\activities.json
```

### File Format
```json
[
  "Read a book",
  "Go for a walk",
  "Watch a movie",
  "Listen to music"
]
```

**Features**:
- UTF-8 encoding (supports all characters)
- Pretty-printed JSON (human-readable)
- Portable (moves with the application)
- Easy to backup and transfer

---

## Design Philosophy

### Minimalist Black & White Theme
- Clean and professional appearance
- High contrast for readability
- No distractions, focus on functionality

### User Experience
- **Smooth Animations**: Scroll and transition effects
- **Visual Feedback**: Spinners during operations
- **Optimistic Updates**: UI updates immediately
- **Auto-focus**: Quick editing workflow

### Modern Architecture
- **Signal-based Reactivity**: Angular 21 best practices
- **Standalone Components**: No NgModules
- **Type-safe**: Full TypeScript support
- **Security-first**: Context isolation enabled

---

## Security

- ✅ **Context Isolation**: Enabled
- ✅ **Node Integration**: Disabled
- ✅ **Preload Script**: Secure API bridge
- ✅ **IPC Handlers**: Controlled file access
- ✅ **No Remote Code**: All code is local

---


## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build Angular application |
| `npm run electron` | Start Electron (requires build) |
| `npm run electron-build` | Build Angular and start Electron |
| `npm run package` | Create portable Windows executable |

---

## Key Learnings

This project demonstrates:

1. **Electron + Angular Integration**
   - IPC communication between processes
   - Secure preload script implementation
   - Type-safe API bridge

2. **Modern Angular Patterns**
   - Signal-based state management
   - Standalone components
   - Computed values
   - Optimistic updates

3. **Desktop Development**
   - File system operations
   - Relative path management
   - Menu customization
   - Window management

4. **Clean Architecture**
   - Separation of concerns
   - Component-based navigation
   - Service layer for business logic
   - Event-driven communication

---

## Future Enhancements (Optional)

- [ ] Activity categories
- [ ] Favorite marking
- [ ] Search and filter
- [ ] Statistics (most selected)
- [ ] Dark/Light theme toggle
- [ ] Activity notes
- [ ] Export/Import functionality
- [ ] Multiple language support

---

## Known Limitations

- Single user (no multi-user support)
- Single device (no cloud sync)
- No activity categories
- No search functionality

**Note**: These limitations are intentional to keep the project minimal and focused.

---

## License

ISC

---

## Author

Developed as a learning project to explore Electron + Angular integration for desktop applications.

---

## Acknowledgments

- **Angular Team** - For the amazing framework
- **Electron Team** - For making desktop apps with web technologies possible
- **Material Design** - For the beautiful UI components

---


## Star This Repository

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ using Electron and Angular**
