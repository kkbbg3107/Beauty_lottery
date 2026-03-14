# 2026 鑽爆晏后之夜 - 抽獎系統

新百媞集團春酒晚宴抽獎系統

## 功能特色

- 支援三個品牌獨立抽獎
  - 微E美肌膚管理中心 (ONLY BEAUTY)
  - 微徠美精品醫美診所
  - Skin Bar
- 可自訂參加人員名單
- 支援多人同時抽獎
- 抽獎動畫效果
- 自動儲存參加者名單與中獎記錄
- 響應式設計，支援手機、平板、電腦

## 使用方法

### 1. 選擇品牌
在主頁面點擊要抽獎的品牌，進入該品牌的抽獎頁面

### 2. 輸入參加人員
在「參加人員名單」區域輸入參加者名字，每行一個名字，例如：
```
王小明
李小華
陳大同
```
輸入完成後點擊「儲存名單」按鈕

### 3. 設定抽取人數
在「抽獎設定」區域設定要抽取的人數

### 4. 開始抽獎
點擊「開始抽獎」按鈕，系統會顯示動畫並抽出中獎者

### 5. 查看結果
中獎名單會顯示在下方，可以選擇「重新抽獎」重置參加者

## 部署方式

### 方案一：GitHub Pages（推薦，完全免費）

1. 在 GitHub 建立新的儲存庫（Repository）
2. 將所有檔案上傳到儲存庫
3. 到儲存庫設定 > Pages
4. 選擇 main 分支作為來源
5. 儲存後會得到一個網址，例如：`https://你的帳號.github.io/lottery-system`

**詳細步驟：**
```bash
# 在 lottery-system 資料夾中執行
cd /Users/ben_kuo/lottery-system
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/lottery-system.git
git push -u origin main
```

### 方案二：Netlify（簡單拖放）

1. 到 [Netlify](https://www.netlify.com/) 註冊免費帳號
2. 點擊「Add new site」> 「Deploy manually」
3. 將整個 `lottery-system` 資料夾拖放到網頁
4. 等待部署完成，會得到一個網址

### 方案三：Vercel

1. 到 [Vercel](https://vercel.com/) 註冊免費帳號
2. 點擊「New Project」
3. 導入你的 GitHub 儲存庫或拖放資料夾
4. 點擊 Deploy

### 方案四：本地測試

如果只想在電腦上使用：
1. 直接用瀏覽器開啟 `index.html` 檔案
2. 或使用本地伺服器：
```bash
# 使用 Python 3
cd /Users/ben_kuo/lottery-system
python3 -m http.server 8000
# 然後在瀏覽器開啟 http://localhost:8000
```

## 檔案結構

```
lottery-system/
├── index.html           # 主頁面
├── only-beauty.html     # 微E美肌膚管理中心抽獎頁
├── weilai-beauty.html   # 微徠美精品醫美診所抽獎頁
├── skin-bar.html        # Skin Bar 抽獎頁
├── lottery.js           # 抽獎邏輯
├── style.css            # 樣式檔案
└── README.md            # 說明文件
```

## 資料儲存

- 使用瀏覽器的 localStorage 儲存資料
- 每個品牌的參加者名單和中獎記錄分別儲存
- 資料保存在本地瀏覽器，不會上傳到伺服器
- 清除瀏覽器資料會同時清除抽獎記錄

## 注意事項

- 建議在抽獎前先測試一次
- 確保網路連線穩定
- 建議使用 Chrome、Edge、Safari 等現代瀏覽器
- 手機使用時建議橫向顯示以獲得最佳體驗

## 自訂修改

如果想修改樣式或功能：
- 修改 `style.css` 可以調整顏色、字體、動畫等視覺效果
- 修改 `lottery.js` 可以調整抽獎邏輯、動畫時間等
- 修改各 HTML 檔案可以調整文字內容

## 技術支援

如有問題或需要協助，請聯繫技術人員。

---

**今日就爆！今年賺爆！** 🎉
# Beauty_lottery
