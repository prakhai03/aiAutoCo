# AI AutoComplete 🚀

![AI AutoComplete](public/artificial-intelligence.png)

## 🌟 Overview
AI AutoComplete is a powerful **browser extension** that provides intelligent autocomplete suggestions as you type. Built with **JavaScript, TypeScript, and AI APIs**, it enhances the typing experience by predicting and suggesting relevant text completions in input fields and text areas.

## 🛠️ Features
- ✅ **Real-time autocomplete suggestions**
- 🔄 **API call cancellation** when switching inputs
- ⏳ **Debounced API calls** for efficient performance
- 🖱️ **Auto-abort when clicking outside an input box**
- ⚡ **Lightweight and fast integration**

## 📸 Demo
![Demo](public/demo.gif)

## 📂 Project Structure
```
aiAutoCo/
│── public/                 # Static assets (icons, manifest, etc.)
│── src/                    # Source code (React-based UI components)
│── index.html              # Main HTML file
│── content.js              # Main content script handling input events
│── autoCompleter.js        # Handles API requests and autocomplete logic
│── manifest.json           # Chrome extension manifest
│── vite.config.ts          # Build configuration
│── package.json            # Dependencies and scripts
└── README.md               # This file!
```

## 🚀 Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/prakhai03/aiAutoCo.git
   cd aiAutoCo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `public/` folder
   
## 🔧 Technologies Used
- **JavaScript & TypeScript** – Core logic & API handling
- **Vite** – Fast build tool
- **React (for UI components)** – Enhancing interactivity
- **Chrome Extensions API** – Injecting auto-complete functionality

## ⚡ Usage
1. Open any webpage with an input field or textarea.
2. Start typing and wait for AI-powered suggestions.
3. Press `Tab` or `→` to accept a suggestion, or `Esc` to dismiss it.
4. If you click outside the input box, any running API request will be **automatically aborted**.

## 🤝 Contributing
Contributions are welcome! Feel free to **fork** this repo, make changes, and submit a PR.

## 📜 License
This project is licensed under the **MIT License**.

---
Made with ❤️ by [Prakhar Khare](https://github.com/prakhai03) 🚀

