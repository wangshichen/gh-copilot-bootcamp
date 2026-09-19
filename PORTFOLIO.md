![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
![Agent Mode](https://img.shields.io/badge/Agent_Mode-已實作-1E2761?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-已整合-1E2761?style=flat-square)
![Agentic Workflow](https://img.shields.io/badge/Agentic_Workflow-已建立-1E2761?style=flat-square)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，從基本的待辦管理功能開始，逐步加入深色模式、篩選與資料保存，展示使用 Copilot 進行前端開發與協作的實作成果。

## 線上展示

[GitHub Pages](https://wangshichen.github.io/gh-copilot-bootcamp/)


## 功能

- 新增待辦事項，輸入空白內容時不會建立項目。
- 勾選或取消勾選待辦事項，完成後會顯示刪除線並淡化文字。
- 刪除單筆待辦事項。
- 一鍵清除所有已完成的待辦事項。
- 顯示整體清單的未完成項目數量，不受目前篩選條件影響。
- 提供「全部」、「未完成」與「已完成」三種篩選模式。
- 篩選結果為空時，顯示對應的提示文字。
- 支援淺色與深色模式切換，並以按鈕文字與圖示提示目前可切換的模式。
- 記住使用者選擇的主題，重新整理後仍會保留。
- 使用者尚未手動選擇主題時，跟隨作業系統的深淺色設定。
- 將待辦事項與主題偏好保存於 `localStorage`，離線開啟頁面也能保留資料。
- 支援手機螢幕的響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用任何前端框架、套件或外部 CDN。
- 以 CSS 變數集中管理色彩，並透過媒體查詢與主題屬性切換配色。
- 使用 `localStorage` 保存待辦事項、完成狀態與主題偏好。
- 使用原生 DOM API 建立與更新待辦清單。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求逐步建立待辦清單介面、互動邏輯與響應式樣式。
- 使用 MCP 連接 Microsoft Learn，查詢 `prefers-color-scheme` 與深色模式色彩對比的官方文件，並據此檢視主題設計。
- 使用 GitHub MCP 查詢 repository 的 Issue，依 Issue 內容整理需求、提出修改計畫、建立分支、完成修正並建立 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義處理 GitHub Issue 的 agentic workflow，讓讀取 Issue、等待確認、修改、驗證、推送與建立 PR 有明確順序。

## 我學到什麼

- 如何用原生 JavaScript 管理 DOM、事件與 `localStorage`，完成不依賴框架的互動式網頁。
- 如何使用 CSS 變數與 `prefers-color-scheme` 建立可保存且能跟隨系統設定的主題切換。
- 如何從使用者體驗角度處理篩選後的空狀態，讓使用者理解資料沒有被刪除。
- 如何使用 MCP 查詢官方文件與 GitHub Issue，將外部需求轉換成可執行的修改計畫。
- 如何透過 Copilot Agent Mode 與 agentic workflow，完成從需求理解、程式修改到驗證與 Pull Request 的協作流程。
