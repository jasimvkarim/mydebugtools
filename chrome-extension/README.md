# debugtools Chrome Extension

A Chrome extension that provides quick access to common debugging tools like JSON Formatter, JWT Decoder, and Base64 Converter.

## Features

- 🚀 Quick access to debugging tools via popup
- 🔍 Right-click context menu for instant decoding
- 💾 Auto-saves input data
- 🔗 Link to full debugtools web app

## Installation

1. Clone this repository or download the `chrome-extension` directory
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `chrome-extension` directory

## Usage

### Popup Tools
1. Click the extension icon in your Chrome toolbar
2. Use any of the three tools:
   - JSON Formatter: Paste JSON and click "Format"
   - JWT Decoder: Paste JWT and click "Decode"
   - Base64 Converter: Enter text and encode/decode

### Context Menu
1. Select any text on a webpage
2. Right-click and choose from:
   - Decode JWT
   - Format JSON
   - Decode Base64

## Development

### File Structure
```
chrome-extension/
├── manifest.json      # Extension configuration
├── popup.html        # Popup UI
├── popup.css         # Popup styles
├── popup.js          # Popup functionality
├── background.js     # Background tasks
└── icons/            # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Testing Changes
1. Make your changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test the changes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this code for your own projects! 