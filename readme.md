# Around Home

統整現今租屋網上都找不到的資訊，讓你快速獲取住家附近的環境品質及治安狀況！

## 網站介紹

### 基本功能

- 資訊類別
  - 環境指標：離住家最近的測站測到的 `空氣品質 AQI` 及 `紫外線指數`
  - 環保：住家周遭的 `環保店家` 與 `垃圾回收場域`
  - 治安：住家周遭的 `竊盜案` 及 `交通事故`
- 搜尋範圍
  - 距離：可選擇距離住家從 250 公尺至 2 公里的範圍
  - 時間：可選擇距今一個月至一年內的範圍
- 按下查詢後即可獲取你想知道的資訊！

### 一些貼心的小功能

- 環境指標資訊左側的燈號是對應到數值狀態的，有綠、黃、紅三種顏色，若兩項指標均顯示綠燈，恭喜你住在一個適居的地方！
- 若按下環保資訊左側的小圖針使它變成半透明，地圖上關於這一個子項目的圖針也會消失，這可以讓你更 focus 在你最關心的項目上
- 治安資訊也同上，不過只能點按上方的兩個小圖針，一次開啟或關閉竊盜及交通事故案件的顯示
- 地圖是可以縮放的，將滑鼠靠近圖針的話會出現該地標的詳細資訊，所有你想看到的都在地圖上一目了然！

### 團隊及分工

- 錢紫翎：網頁前端設計及開發
- 周敦翔：網頁後端開發
- 莊翔安：資料爬取及整理
- 李佳欣：資料正規化

## 若你想在本機啟動此網頁

### 啟動後端

1. 執行以下指令以設定環境

```
git clone https://github.com/moneychien19/Around-Home-local.git
cd Around-Home-local/backend

# 啟動虛擬環境
python -m venv env
env\Scripts\activate.bat  # or source env/bin/activate for iOS
cd around_home_backend

# 安裝所需的套件
pip install -r requirements.txt
```

2. 執行以下指令以啟動後端

```
python manage.py runserver
```

### 設定 Google Maps API 憑證

在 `frontend/src` 資料夾底下建立一個新的檔案 `key.js`，並將以下程式碼中的 `YOUR_GOOGLE_API_KEY` 填入自己的憑證，再放入檔案中

```
const API_KEY = {YOUR_GOOGLE_API_KEY};
export default API_KEY;
```

### 啟動前端

執行以下指令，

```
cd frontend
yarn
yarn start
```

網頁就會在 http://localhost:3000 上啟動
