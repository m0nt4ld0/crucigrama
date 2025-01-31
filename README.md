# 📖 Crucigrama (Crossword Puzzle App) - React Version  

## 🚀 About the Project  
This project is a **crossword puzzle generator** that allows users to create **personalized crossword puzzles** dynamically. The app has been **completely rewritten in ReactJS**, improving its **security, reusability, and scalability** while maintaining the original UI and functionality.  

---

## 🎯 Features  
✅ **Create Custom Crosswords** – Users can generate puzzles manually or via JSON input.  
✅ **Dynamic Grid Rendering** – Crossword cells are rendered dynamically instead of using static tables.  
✅ **State Management with Context API** – Manages crossword logic, themes, and language settings globally.  
✅ **Preserved UI & Styling** – The existing HTML/CSS structure is retained, with future enhancements planned using TailwindCSS.  

---

## 🔧 Getting Started  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14 or later)  
- npm or yarn  

---

### **2️⃣ Installation**  

Clone the repository and install dependencies:  
```bash
git clone https://github.com/m0nt4ld0/crucigrama
cd Crucigrama  
npm install  
```

### **3️⃣ Running the App**
To start the development server:

```bash
npm run dev
```
The app will be available at http://localhost:5173/ or the link shown in the terminal.

### **4️⃣ Folder Structure**
```bash
/src  
  ├── assets
  ├── components  
  │   ├── CrosswordPuzzle.js  
  │   ├── PersonalizedPuzzleContainer.js  
  │   ├── ColorConfiguration.js  
  │   └── ...  
  ├── scripts
  │   ├── language-handler.js
  │   ├── timer-crossword.js
  ├── styles
  │   ├── main.css
  ├── App.jsx   
  ├── AppProvider.jsx  
  ├── index.css 
  └── main.jsx

```