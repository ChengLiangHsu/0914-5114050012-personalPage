# 0914-5114050012-personalPage

這是 **Cheng-Liang Hsu (許丞諒)** 的個人作品集與履歷網站專案。

🔗 **線上展示網址 (GitHub Pages)**：[https://chenglianghsu.github.io/0914-5114050012-personalPage/](https://chenglianghsu.github.io/0914-5114050012-personalPage/)

## 專案簡介

本專案採用純原生技術（Vanilla HTML5、CSS3、JavaScript ES6+）打造，無須繁瑣框架與建置步驟即可快速預覽與部署。

### 核心功能與特色
- **現代化設計**：玻璃擬態 (Glassmorphism)、科技漸層光暈與微互動特效。
- **雙主題支援**：支援深色模式 (預設) 與淺色模式切換，並自動記憶使用者偏好。
- **打字機動態標語**：即時輪播多種全端與工程師定位。
- **作品分類篩選**：支援即時專案類別切換（全端、AI 工具、UI/UX）與彈跳詳情視窗 (Modal)。
- **無障礙與 RWD 響應式**：完整支援手機、平板與桌面瀏覽體驗。
- **一鍵複製與互動表單**：支援點擊複製 Email 及表單驗證反饋提示。

---

## 專案架構

```text
.
├── index.html       # 網頁主架構與語意化內容
├── style.css        # 樣式表、設計 Tokens 與 RWD 佈局
├── script.js        # 互動行為、主題切換與表單邏輯
├── assets/          # 形象頭像與專案成果展示圖檔
└── README.md        # 專案說明文件
```

---

## 本地開發與預覽

### 方法一：使用 Python 本地伺服器（推薦）
在專案根目錄開啟終端機，執行以下指令：
```bash
python -m http.server 5500
```
接著在瀏覽器打開：[http://localhost:5500](http://localhost:5500)

### 方法二：直接瀏覽器開啟
直接在檔案總管中雙擊 `index.html` 即可於瀏覽器檢視。
