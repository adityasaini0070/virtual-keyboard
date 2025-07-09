# 🎹 Virtual Keyboard

A full-fledged, feature-rich virtual keyboard web application with multiple layouts, themes, and advanced functionality.

![Virtual Keyboard Pro](https://img.shields.io/badge/Virtual%20Keyboard-Pro-blue)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## 🚀 Features

### Core Functionality
- **Virtual On-Screen Keyboard**: Fully functional QWERTY keyboard with all standard keys
- **Multiple Input Support**: Works with any text input or textarea
- **Responsive Design**: Adapts to different screen sizes and devices
- **Professional UI**: Modern glassmorphism design with smooth animations

### Advanced Features
- **Multiple Keyboard Layouts**:
  - QWERTY (Standard)
  - Dvorak
  - Colemak
  - Numeric keypad
  - Symbols layout

- **Theme System**:
  - Default theme
  - Dark mode
  - Neon theme
  - Retro theme
  - Minimal theme

- **Enhanced Functionality**:
  - Sound effects for key presses
  - Vibration feedback (mobile devices)
  - Caps Lock toggle with visual indicator
  - Settings persistence using localStorage
  - Real-time text statistics (characters, words, lines)

### User Experience
- **Copy/Paste Support**: Clipboard integration for text operations
- **Keyboard Shortcuts**: Ctrl+K to toggle keyboard visibility
- **Auto-focus**: Keyboard appears automatically when focusing on input fields
- **Smooth Animations**: Fluid transitions and hover effects
- **Visual Feedback**: Key press animations and state indicators

## 🎯 Demo

Visit the live application at: `http://localhost:8080`

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Quick Start
1. Clone the repository:
```bash
git clone <repository-url>
cd virtual-keyboard-pro
```

2. Start the development server:
```bash
python3 -m http.server 8080
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## 📁 Project Structure

```
virtual-keyboard-pro/
├── index.html          # Main HTML file with modern UI
├── script.js           # Enhanced JavaScript with all features
├── styles.css          # Professional styling with themes
├── Keyboard.css        # Original keyboard styling (legacy)
├── README.md           # This file
└── backend_test.py     # Backend functionality tests
```

## 🎨 Themes

### Default Theme
- Clean, modern interface with glassmorphism effects
- Purple gradient background
- White keyboard with subtle shadows

### Dark Mode
- Dark background with contrasting elements
- Perfect for low-light environments
- Maintains readability and accessibility

### Neon Theme
- Futuristic cyberpunk aesthetic
- Glowing cyan accents
- Dark background with neon highlights

### Retro Theme
- Vintage computing feel
- Brown and beige color scheme
- Classic monospace font styling

### Minimal Theme
- Clean, distraction-free interface
- Simple white background
- Minimal visual elements

## ⌨️ Keyboard Layouts

### QWERTY (Default)
Standard English keyboard layout with familiar key positioning.

### Dvorak
Optimized layout for typing efficiency and reduced finger movement.

### Colemak
Modern alternative layout balancing efficiency with QWERTY familiarity.

### Numeric
Dedicated number pad for numerical input and calculations.

### Symbols
Special characters and symbols for programming and special text.

## 🔧 Configuration

### Settings Panel
Access the settings through the left control panel:
- **Keyboard Layout**: Switch between different layouts
- **Theme**: Change visual appearance
- **Sound Effects**: Enable/disable key press sounds
- **Vibration**: Enable/disable haptic feedback (mobile)
- **Reset Settings**: Return to default configuration

### Keyboard Shortcuts
- `Ctrl + K`: Toggle keyboard visibility
- Click on input fields to auto-show keyboard
- Use "Toggle Keyboard" button for manual control

## 📊 Statistics

Real-time text analysis includes:
- **Character Count**: Total characters including spaces
- **Word Count**: Number of words separated by spaces
- **Line Count**: Number of lines in the text

## 🧪 Testing

The application includes comprehensive testing:

### Backend Tests
```bash
python3 backend_test.py
```

### Features Tested
- Server response and static file serving
- JavaScript functionality loading
- CSS styling application
- All keyboard layouts
- Theme switching
- Sound and vibration toggles
- Settings persistence
- Text statistics accuracy

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support

- Responsive design adapts to mobile screens
- Touch-friendly keyboard keys
- Vibration feedback support
- Optimized keyboard sizing for mobile devices

## 🔄 Version History

### v2.0.0 (Current) - Enhanced Edition
- Multiple keyboard layouts (QWERTY, Dvorak, Colemak, Numeric, Symbols)
- Advanced theme system with 5 themes
- Sound effects and vibration feedback
- Settings persistence with localStorage
- Real-time text statistics
- Copy/paste functionality
- Keyboard shortcuts
- Professional UI with glassmorphism design
- Comprehensive testing suite
- Mobile optimization

### v1.0.0 - Basic Edition
- Basic QWERTY virtual keyboard
- Simple CSS styling
- Basic functionality

## 🛡️ Features Security

- No external dependencies for core functionality
- Client-side only - no data sent to servers
- LocalStorage for settings persistence
- Clipboard API integration with permission handling

## 🎯 Use Cases

- **Accessibility**: For users with physical keyboard limitations
- **Touch Devices**: Tablets and touch-screen computers
- **Kiosks**: Public terminals and information systems
- **Gaming**: Virtual keyboards for gaming applications
- **Educational**: Learning different keyboard layouts
- **International**: Using different language layouts

## 🔧 Development

### Adding New Themes
1. Add theme option to the theme selector in `index.html`
2. Create CSS classes in `styles.css` following the pattern:
```css
body.theme-newtheme .keyboard {
    /* Your theme styles */
}
```

### Adding New Layouts
1. Add layout to the `layouts` object in `script.js`
2. Add corresponding break positions in `getBreakPositions()`
3. Add option to layout selector in `index.html`

### Customization
- Modify `styles.css` for visual changes
- Update `script.js` for functionality enhancements
- Edit `index.html` for structure modifications

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 🙏 Acknowledgments

- Material Icons for beautiful iconography
- Google Fonts for typography
- Modern web standards for functionality

---

**Virtual Keyboard Pro** - Transforming the way you type on the web! 🎹✨
