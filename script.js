// Enhanced Virtual Keyboard with advanced features
const VirtualKeyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    
    properties: {
        value: "",
        capsLock: false,
        currentLayout: "qwerty",
        currentTheme: "default",
        soundEnabled: false,
        vibrationEnabled: false
    },
    
    layouts: {
        qwerty: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ],
        dvorak: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "'", ",", ".", "p", "y", "f", "g", "c", "r", "l",
            "caps", "a", "o", "e", "u", "i", "d", "h", "t", "n", "enter",
            "done", ";", "q", "j", "k", "x", "b", "m", "w", "v", "z",
            "space"
        ],
        colemak: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "f", "p", "g", "j", "l", "u", "y", ";",
            "caps", "a", "r", "s", "t", "d", "h", "n", "e", "i", "enter",
            "done", "z", "x", "c", "v", "b", "k", "m", ",", ".", "?",
            "space"
        ],
        numeric: [
            "1", "2", "3", "backspace",
            "4", "5", "6", "clear",
            "7", "8", "9", "enter",
            "done", "0", ".", "space"
        ],
        symbols: [
            "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
            "~", "`", "-", "_", "=", "+", "[", "]", "{", "}",
            "caps", "\\", "|", ";", ":", "'", "\"", "<", ">", "/", "enter",
            "done", ",", ".", "?", "space"
        ]
    },
    
    init() {
        this.createKeyboard();
        this.setupEventListeners();
        this.loadSettings();
        this.updateStats();
    },
    
    createKeyboard() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        
        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        
        // Create keys based on current layout
        this.updateKeyboard();
        
        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        
        // Auto-focus behavior
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                    this.updateStats();
                });
            });
        });
    },
    
    updateKeyboard() {
        this.elements.keysContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        const keyLayout = this.layouts[this.properties.currentLayout];
        
        keyLayout.forEach((key, index) => {
            const keyElement = this.createKeyElement(key);
            fragment.appendChild(keyElement);
            
            // Add line breaks for better layout
            const breakAfter = this.getBreakPositions()[this.properties.currentLayout];
            if (breakAfter && breakAfter.includes(key)) {
                fragment.appendChild(document.createElement("br"));
            }
        });
        
        this.elements.keysContainer.appendChild(fragment);
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },
    
    createKeyElement(key) {
        const keyElement = document.createElement("button");
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
        
        switch (key) {
            case "backspace":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = this.createIconHTML("backspace");
                keyElement.addEventListener("click", () => this.handleBackspace());
                break;
                
            case "caps":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = this.createIconHTML("keyboard_capslock");
                keyElement.addEventListener("click", () => this.toggleCapsLock(keyElement));
                break;
                
            case "enter":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = this.createIconHTML("keyboard_return");
                keyElement.addEventListener("click", () => this.handleEnter());
                break;
                
            case "space":
                keyElement.classList.add("keyboard__key--extra-wide");
                keyElement.innerHTML = this.createIconHTML("space_bar");
                keyElement.addEventListener("click", () => this.handleSpace());
                break;
                
            case "done":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = this.createIconHTML("check_circle");
                keyElement.addEventListener("click", () => this.close());
                break;
                
            case "clear":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = this.createIconHTML("clear");
                keyElement.addEventListener("click", () => this.clearAll());
                break;
                
            default:
                keyElement.textContent = key.toLowerCase();
                keyElement.addEventListener("click", () => this.handleKeyPress(key));
                break;
        }
        
        return keyElement;
    },
    
    createIconHTML(iconName) {
        return `<i class="material-icons">${iconName}</i>`;
    },
    
    getBreakPositions() {
        return {
            qwerty: ["backspace", "p", "enter", "?"],
            dvorak: ["backspace", "l", "enter", "z"],
            colemak: ["backspace", ";", "enter", "?"],
            numeric: ["backspace", "clear", "enter"],
            symbols: ["backspace", "}", "enter"]
        };
    },
    
    handleBackspace() {
        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        this.triggerEvent("oninput");
        this.playSound("backspace");
        this.vibrate(50);
    },
    
    handleEnter() {
        this.properties.value += "\n";
        this.triggerEvent("oninput");
        this.playSound("enter");
        this.vibrate(100);
    },
    
    handleSpace() {
        this.properties.value += " ";
        this.triggerEvent("oninput");
        this.playSound("space");
        this.vibrate(30);
    },
    
    handleKeyPress(key) {
        const finalKey = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
        this.properties.value += finalKey;
        this.triggerEvent("oninput");
        this.playSound("key");
        this.vibrate(20);
    },
    
    clearAll() {
        this.properties.value = "";
        this.triggerEvent("oninput");
        this.playSound("clear");
        this.vibrate(100);
    },
    
    toggleCapsLock(keyElement) {
        this.properties.capsLock = !this.properties.capsLock;
        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
        
        // Update all letter keys
        this.elements.keys.forEach(key => {
            if (key.childElementCount === 0 && /^[a-z]$/.test(key.textContent)) {
                key.textContent = this.properties.capsLock ? 
                    key.textContent.toUpperCase() : 
                    key.textContent.toLowerCase();
            }
        });
        
        this.playSound("caps");
        this.vibrate(50);
    },
    
    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },
    
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.onclose = null;
        this.elements.main.classList.add("keyboard--hidden");
    },
    
    toggle() {
        if (this.elements.main.classList.contains("keyboard--hidden")) {
            const mainInput = document.getElementById("main-input");
            this.open(mainInput.value, currentValue => {
                mainInput.value = currentValue;
                this.updateStats();
            });
        } else {
            this.close();
        }
    },
    
    changeLayout(layout) {
        this.properties.currentLayout = layout;
        this.updateKeyboard();
        this.saveSettings();
    },
    
    changeTheme(theme) {
        document.body.className = theme !== "default" ? `theme-${theme}` : "";
        this.properties.currentTheme = theme;
        this.saveSettings();
    },
    
    toggleSound() {
        this.properties.soundEnabled = !this.properties.soundEnabled;
        this.saveSettings();
    },
    
    toggleVibration() {
        this.properties.vibrationEnabled = !this.properties.vibrationEnabled;
        this.saveSettings();
    },
    
    playSound(type) {
        if (!this.properties.soundEnabled) return;
        
        // Create audio context for sound generation
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different sounds for different key types
        const frequencies = {
            key: 800,
            backspace: 400,
            enter: 600,
            space: 300,
            caps: 1000,
            clear: 200
        };
        
        oscillator.frequency.value = frequencies[type] || 800;
        oscillator.type = "sine";
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    },
    
    vibrate(duration) {
        if (!this.properties.vibrationEnabled || !navigator.vibrate) return;
        navigator.vibrate(duration);
    },
    
    saveSettings() {
        const settings = {
            layout: this.properties.currentLayout,
            theme: this.properties.currentTheme,
            sound: this.properties.soundEnabled,
            vibration: this.properties.vibrationEnabled
        };
        localStorage.setItem("virtualKeyboardSettings", JSON.stringify(settings));
    },
    
    loadSettings() {
        const savedSettings = localStorage.getItem("virtualKeyboardSettings");
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.properties.currentLayout = settings.layout || "qwerty";
            this.properties.currentTheme = settings.theme || "default";
            this.properties.soundEnabled = settings.sound || false;
            this.properties.vibrationEnabled = settings.vibration || false;
            
            // Apply loaded settings
            this.changeTheme(this.properties.currentTheme);
            document.getElementById("layout-select").value = this.properties.currentLayout;
            document.getElementById("theme-select").value = this.properties.currentTheme;
            document.getElementById("sound-toggle").checked = this.properties.soundEnabled;
            document.getElementById("vibration-toggle").checked = this.properties.vibrationEnabled;
        }
    },
    
    resetSettings() {
        localStorage.removeItem("virtualKeyboardSettings");
        this.properties.currentLayout = "qwerty";
        this.properties.currentTheme = "default";
        this.properties.soundEnabled = false;
        this.properties.vibrationEnabled = false;
        
        this.changeTheme("default");
        this.changeLayout("qwerty");
        
        document.getElementById("layout-select").value = "qwerty";
        document.getElementById("theme-select").value = "default";
        document.getElementById("sound-toggle").checked = false;
        document.getElementById("vibration-toggle").checked = false;
    },
    
    updateStats() {
        const text = document.getElementById("main-input").value;
        document.getElementById("char-count").textContent = text.length;
        document.getElementById("word-count").textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
        document.getElementById("line-count").textContent = text.split('\n').length;
    },
    
    setupEventListeners() {
        // Layout selector
        document.getElementById("layout-select").addEventListener("change", (e) => {
            this.changeLayout(e.target.value);
        });
        
        // Theme selector
        document.getElementById("theme-select").addEventListener("change", (e) => {
            this.changeTheme(e.target.value);
        });
        
        // Sound toggle
        document.getElementById("sound-toggle").addEventListener("change", () => {
            this.toggleSound();
        });
        
        // Vibration toggle
        document.getElementById("vibration-toggle").addEventListener("change", () => {
            this.toggleVibration();
        });
        
        // Reset button
        document.getElementById("reset-btn").addEventListener("click", () => {
            this.resetSettings();
        });
        
        // Action buttons
        document.getElementById("clear-btn").addEventListener("click", () => {
            document.getElementById("main-input").value = "";
            this.updateStats();
        });
        
        document.getElementById("copy-btn").addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(document.getElementById("main-input").value);
                this.showNotification("Text copied to clipboard!");
            } catch (err) {
                this.showNotification("Failed to copy text");
            }
        });
        
        document.getElementById("paste-btn").addEventListener("click", async () => {
            try {
                const text = await navigator.clipboard.readText();
                document.getElementById("main-input").value += text;
                this.updateStats();
                this.showNotification("Text pasted!");
            } catch (err) {
                this.showNotification("Failed to paste text");
            }
        });
        
        document.getElementById("toggle-keyboard-btn").addEventListener("click", () => {
            this.toggle();
        });
        
        // Update stats on input
        document.getElementById("main-input").addEventListener("input", () => {
            this.updateStats();
        });
        
        // Keyboard shortcuts
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                this.toggle();
            }
        });
    },
    
    showNotification(message) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Roboto', sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    VirtualKeyboard.init();
});