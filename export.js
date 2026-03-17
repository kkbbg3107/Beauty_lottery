// 匯出中獎名單功能

// 品牌名稱對應
const BRAND_NAMES = {
    'only-beauty': '微e美肌膚管理中心',
    'weilai-beauty': '微依美精品醫美診所',
    'skin-bar': 'Skin Bar'
};

// 資格名稱對應
const QUALIFICATION_NAMES = {
    'all': '全部人的抽獎',
    '1year': '1年以上的抽獎',
    '3year': '3年以上的抽獎'
};

// 匯出中獎名單到 Excel
function exportWinnersList() {
    try {
        // 從 localStorage 讀取資料
        const winnersData = localStorage.getItem('lottery-winners');
        const drawnPrizesData = localStorage.getItem('lottery-drawn-prizes');

        if (!winnersData || !drawnPrizesData) {
            alert('目前沒有中獎記錄可以匯出！');
            return;
        }

        const winners = JSON.parse(winnersData);
        const drawnPrizes = JSON.parse(drawnPrizesData);

        // 準備匯出資料
        const exportData = prepareExportData(winners, drawnPrizes);

        if (exportData.length === 0) {
            alert('目前沒有中獎記錄可以匯出！');
            return;
        }

        // 使用 SheetJS 產生 Excel
        generateExcel(exportData);

    } catch (error) {
        console.error('匯出失敗:', error);
        alert('匯出失敗，請查看控制台了解詳情。');
    }
}

// 準備匯出資料（依品牌分類）
function prepareExportData(winners, drawnPrizes) {
    const exportData = [];

    // 遍歷所有 winner key
    Object.keys(winners).forEach(winnerKey => {
        if (!winners[winnerKey] || winners[winnerKey].length === 0) {
            return; // 跳過空記錄
        }

        // 解析 winnerKey (格式: 'brand-qualification')
        // 例如: 'only-beauty-all', 'skin-bar-1year', 'weilai-beauty-3year'
        const parts = winnerKey.split('-');
        const qualification = parts.pop(); // 取最後一個元素作為資格
        const brand = parts.join('-'); // 剩下的組合起來作為品牌

        const brandName = BRAND_NAMES[brand] || brand;
        const qualificationName = QUALIFICATION_NAMES[qualification] || qualification;

        // 獲取該品牌資格的中獎者和獎品
        const winnerNames = winners[winnerKey];
        const prizes = drawnPrizes[winnerKey] || [];

        // 配對中獎者和獎品
        winnerNames.forEach((winnerName, index) => {
            const prizeName = prizes[index] || '未知獎品';

            // 獲取員工資訊（部門等）
            const employeeInfo = getEmployeeInfo(brand, winnerName);

            exportData.push({
                '品牌': brandName,
                '資格類別': qualificationName,
                '中獎者': winnerName,
                '部門': employeeInfo.department || '-',
                '獎品': prizeName,
                '抽獎時間': new Date().toLocaleDateString('zh-TW')
            });
        });
    });

    // 依品牌、資格、中獎順序排序
    exportData.sort((a, b) => {
        if (a.品牌 !== b.品牌) {
            return a.品牌.localeCompare(b.品牌, 'zh-TW');
        }
        if (a.資格類別 !== b.資格類別) {
            return a.資格類別.localeCompare(b.資格類別, 'zh-TW');
        }
        return 0;
    });

    return exportData;
}

// 獲取員工資訊
function getEmployeeInfo(brand, employeeName) {
    if (!EMPLOYEES_DATA || !EMPLOYEES_DATA[brand]) {
        return { department: '-' };
    }

    const employee = EMPLOYEES_DATA[brand].find(emp => emp.name === employeeName);
    return employee || { department: '-' };
}

// 使用 SheetJS 產生 Excel
function generateExcel(data) {
    try {
        // 動態載入 SheetJS 函式庫（使用 CDN）
        if (typeof XLSX === 'undefined') {
            loadSheetJS().then(() => {
                createAndDownloadExcel(data);
            });
        } else {
            createAndDownloadExcel(data);
        }
    } catch (error) {
        console.error('產生 Excel 失敗:', error);
        alert('產生 Excel 失敗，請確認 SheetJS 函式庫已載入。');
    }
}

// 載入 SheetJS 函式庫
function loadSheetJS() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 創建並下載 Excel
function createAndDownloadExcel(data) {
    try {
        // 創建工作簿
        const wb = XLSX.utils.book_new();

        // 按品牌分類建立工作表
        const brandGroups = {};

        data.forEach(row => {
            const brand = row['品牌'];
            if (!brandGroups[brand]) {
                brandGroups[brand] = [];
            }
            brandGroups[brand].push(row);
        });

        // 為每個品牌創建一個工作表
        Object.keys(brandGroups).forEach(brand => {
            const sheetData = brandGroups[brand];
            const ws = XLSX.utils.json_to_sheet(sheetData);

            // 設置列寬
            ws['!cols'] = [
                { wch: 25 }, // 品牌
                { wch: 20 }, // 資格類別
                { wch: 20 }, // 中獎者
                { wch: 20 }, // 部門
                { wch: 30 }, // 獎品
                { wch: 15 }  // 抽獎時間
            ];

            XLSX.utils.book_append_sheet(wb, ws, brand);
        });

        // 也創建一個總表
        const wsAll = XLSX.utils.json_to_sheet(data);
        wsAll['!cols'] = [
            { wch: 25 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 30 },
            { wch: 15 }
        ];
        XLSX.utils.book_append_sheet(wb, wsAll, '總表');

        // 產生檔案名稱
        const date = new Date();
        const fileName = `中獎名單_${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}.xlsx`;

        // 下載
        XLSX.writeFile(wb, fileName);

        console.log('Excel 匯出成功！');
    } catch (error) {
        console.error('創建 Excel 失敗:', error);
        alert('創建 Excel 失敗：' + error.message);
    }
}
