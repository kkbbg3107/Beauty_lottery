// 抽獎系統 JavaScript

let currentBrand = '';
let currentQualification = 'all';
let eligibleEmployees = []; // 符合條件的員工
let winners = {}; // 已中獎者記錄 { 'brand-qualification': [employee names] }
let drawnPrizes = {}; // 已抽出的獎品記錄 { 'brand-qualification': [prize names] }
let currentPrizeToShow = null; // 當前要展示的獎品
let prizeOrder = {}; // 保存用戶調整的獎品順序 { 'brand-qualification': [prize names in order] }
let customPrizes = {}; // 自定義加碼獎 { 'brand-qualification': [{ name, quantity }] }

// 初始化抽獎系統
function initLottery(brandKey) {
    currentBrand = brandKey;
    loadWinnerHistory();
    updateQualificationOptions();
    updateEligibleEmployees();
    updatePrizeOptions();
    updateCustomPrizeSection();

    // 監聽資格選擇變化
    const qualificationSelect = document.getElementById('qualification');
    if (qualificationSelect) {
        qualificationSelect.addEventListener('change', function() {
            currentQualification = this.value;
            updateEligibleEmployees();
            updatePrizeOptions();
            updateCustomPrizeSection();
        });
    }
}

// 更新資格選項
function updateQualificationOptions() {
    const qualificationSelect = document.getElementById('qualification');
    if (!qualificationSelect || !QUALIFICATION_OPTIONS[currentBrand]) return;

    qualificationSelect.innerHTML = '';
    QUALIFICATION_OPTIONS[currentBrand].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        qualificationSelect.appendChild(optionElement);
    });
}

// 更新獎品選項
function updatePrizeOptions() {
    const prizeSelect = document.getElementById('prizeSelect');
    if (!prizeSelect) return;

    const prizes = PRIZES_DATA[currentBrand]?.[currentQualification] || [];
    const winnerKey = `${currentBrand}-${currentQualification}`;
    const alreadyDrawn = drawnPrizes[winnerKey] || [];

    prizeSelect.innerHTML = '';

    // 重置當前獎品和按鈕狀態
    currentPrizeToShow = null;
    const drawButton = document.getElementById('drawButton');
    if (drawButton) {
        drawButton.disabled = true;
    }

    // 重置獎品顯示狀態（隱藏列表，顯示提示文字）
    const prizeDisplayText = document.getElementById('prizeDisplayText');
    if (prizeDisplayText) {
        prizeDisplayText.textContent = '點擊選擇獎品';
        prizeDisplayText.style.display = 'block';
    }
    prizeSelect.style.display = 'none';

    if (prizes.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '無可用獎品';
        prizeSelect.appendChild(option);
        return;
    }

    // 準備可用獎品列表（包含原始獎品和自定義獎品）
    const availablePrizes = [];

    // 添加原始獎品
    prizes.forEach((prize, index) => {
        const drawnCount = alreadyDrawn.filter(p => p === prize.name).length;
        const remaining = prize.quantity - drawnCount;

        if (remaining > 0) {
            availablePrizes.push({
                index: index,
                name: prize.name,
                quantity: prize.quantity,
                remaining: remaining,
                isCustom: false
            });
        }
    });

    // 添加自定義加碼獎（僅在 'all' 資格時）
    if (currentQualification === 'all') {
        const customPrizeList = customPrizes[winnerKey] || [];
        customPrizeList.forEach((customPrize, index) => {
            const drawnCount = alreadyDrawn.filter(p => p === customPrize.name).length;
            const remaining = customPrize.quantity - drawnCount;

            if (remaining > 0) {
                availablePrizes.push({
                    index: `custom-${index}`,
                    name: customPrize.name,
                    quantity: customPrize.quantity,
                    remaining: remaining,
                    isCustom: true
                });
            }
        });
    }

    if (availablePrizes.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '所有獎品已抽完';
        prizeSelect.appendChild(option);
        return;
    }

    // 如果有保存的順序，按照保存的順序排列
    const savedOrder = prizeOrder[winnerKey];
    if (savedOrder && savedOrder.length > 0) {
        // 按照保存的順序重新排列
        const orderedPrizes = [];
        savedOrder.forEach(prizeName => {
            const prize = availablePrizes.find(p => p.name === prizeName);
            if (prize) {
                orderedPrizes.push(prize);
            }
        });
        // 添加新的（之前沒保存過的）獎品
        availablePrizes.forEach(prize => {
            if (!orderedPrizes.find(p => p.name === prize.name)) {
                orderedPrizes.push(prize);
            }
        });
        availablePrizes.length = 0;
        availablePrizes.push(...orderedPrizes);
    }

    // 添加選項
    availablePrizes.forEach(prize => {
        const option = document.createElement('option');
        option.value = prize.index;
        option.textContent = `${prize.name} (剩餘 ${prize.remaining}/${prize.quantity})`;
        option.dataset.prizeName = prize.name;
        option.dataset.quantity = prize.quantity;
        option.dataset.remaining = prize.remaining;
        prizeSelect.appendChild(option);
    });
}

// 更新符合條件的員工列表
function updateEligibleEmployees() {
    if (!EMPLOYEES_DATA[currentBrand]) {
        eligibleEmployees = [];
        return;
    }

    const winnerKey = `${currentBrand}-${currentQualification}`;
    const alreadyWon = winners[winnerKey] || [];

    // 篩選符合年資條件且未中獎的員工
    eligibleEmployees = EMPLOYEES_DATA[currentBrand].filter(employee => {
        // 檢查是否符合年資條件
        const qualificationKey = currentQualification;
        if (!employee[qualificationKey]) {
            return false;
        }

        // 檢查是否已中獎（同一資格不可重複）
        return !alreadyWon.includes(employee.name);
    });

    console.log(`符合條件的員工 (${currentBrand} - ${currentQualification}):`, eligibleEmployees.length);
    console.log('已中獎名單:', alreadyWon);
}

// 載入中獎歷史
function loadWinnerHistory() {
    const saved = localStorage.getItem('lottery-winners');
    if (saved) {
        winners = JSON.parse(saved);
    }

    const savedPrizes = localStorage.getItem('lottery-drawn-prizes');
    if (savedPrizes) {
        drawnPrizes = JSON.parse(savedPrizes);
    }

    const savedCustomPrizes = localStorage.getItem('lottery-custom-prizes');
    if (savedCustomPrizes) {
        customPrizes = JSON.parse(savedCustomPrizes);
    }
}

// 儲存中獎歷史
function saveWinnerHistory() {
    localStorage.setItem('lottery-winners', JSON.stringify(winners));
    localStorage.setItem('lottery-drawn-prizes', JSON.stringify(drawnPrizes));
    localStorage.setItem('lottery-custom-prizes', JSON.stringify(customPrizes));
}

// 計算剩餘獎品數量
function getRemainingPrizes() {
    const winnerKey = `${currentBrand}-${currentQualification}`;
    const alreadyDrawn = drawnPrizes[winnerKey] || [];

    const prizes = PRIZES_DATA[currentBrand][currentQualification] || [];
    let totalPrizes = 0;
    prizes.forEach(prize => {
        totalPrizes += prize.quantity;
    });

    return totalPrizes - alreadyDrawn.length;
}

// 顯示下一個獎品
function showNextPrize() {
    const prizeSelect = document.getElementById('prizeSelect');
    const selectedOption = prizeSelect.options[prizeSelect.selectedIndex];

    if (!selectedOption || !selectedOption.value) {
        alert('沒有可抽的獎品！');
        return;
    }

    const prizeName = selectedOption.dataset.prizeName;
    const prizeQuantity = parseInt(selectedOption.dataset.quantity);

    if (eligibleEmployees.length === 0) {
        alert('沒有符合條件的員工可以抽獎！');
        return;
    }

    if (prizeQuantity > eligibleEmployees.length) {
        alert(`符合條件的員工不足！需要 ${prizeQuantity} 人，目前剩餘 ${eligibleEmployees.length} 人`);
        return;
    }

    // 保存當前獎品資訊
    currentPrizeToShow = {
        name: prizeName,
        quantity: prizeQuantity
    };

    // 顯示獎品名稱
    const prizeDisplay = document.getElementById('prizeDisplay');
    prizeDisplay.innerHTML = `
        <div style="font-size: 3em; font-weight: bold; text-align: center; color: #ffd700;">
            ${prizeName}
        </div>
        <div style="font-size: 1.2em; text-align: center; color: #aaa; margin-top: 20px;">
            抽取人數：${prizeQuantity}
        </div>
    `;

    // 清空下方名單
    document.getElementById('namesDisplay').innerHTML = '';

    // 啟用"開始抽獎"按鈕
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = false;
}

// 開始抽獎
function startLottery() {
    if (!currentPrizeToShow) {
        alert('請先點擊「下一個」按鈕選擇獎品！');
        return;
    }

    // 禁用按鈕防止重複點擊
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = true;

    // 直接開始抽獎
    performLotteryAnimation(currentPrizeToShow.quantity, currentPrizeToShow.name);
}

// 執行抽獎動畫
function performLotteryAnimation(count, prizeName) {
    const prizeDisplay = document.getElementById('prizeDisplay');
    const namesDisplay = document.getElementById('namesDisplay');

    if (!prizeDisplay) return;

    namesDisplay.innerHTML = '<div style="text-align: center; color: #ffd700; font-size: 1.5em;">抽獎中...</div>';

    // 模擬抽獎過程（顯示員工名字跳動）
    let counter = 0;
    const interval = setInterval(() => {
        if (eligibleEmployees.length > 0) {
            const randomIndex = Math.floor(Math.random() * eligibleEmployees.length);
            namesDisplay.innerHTML = `<div class="lottery-animation" style="font-size: 2em;">${eligibleEmployees[randomIndex].name}</div>`;
        }
        counter++;

        if (counter > 20) { // 跑20次後停止
            clearInterval(interval);
            drawWinners(count, prizeName);
        }
    }, 100);
}

// 抽取中獎者
function drawWinners(count, prizeName) {
    const drawnWinners = [];
    const winnerKey = `${currentBrand}-${currentQualification}`;

    // 複製一份符合條件的員工列表，避免修改原始列表
    const tempEmployees = [...eligibleEmployees];

    // 抽取中獎者
    for (let i = 0; i < count; i++) {
        if (tempEmployees.length > 0) {
            const randomIndex = Math.floor(Math.random() * tempEmployees.length);
            const winner = tempEmployees.splice(randomIndex, 1)[0];
            drawnWinners.push({ employee: winner, prize: prizeName });
        }
    }

    // 記錄中獎者和已抽獎品
    if (!winners[winnerKey]) {
        winners[winnerKey] = [];
    }
    if (!drawnPrizes[winnerKey]) {
        drawnPrizes[winnerKey] = [];
    }

    drawnWinners.forEach(item => {
        winners[winnerKey].push(item.employee.name);
        drawnPrizes[winnerKey].push(item.prize);
    });

    saveWinnerHistory();
    displayResults(drawnWinners, prizeName);
    updateEligibleEmployees(); // 更新可抽獎員工列表
    updatePrizeOptions(); // 更新獎品選項

    // 清除當前獎品
    currentPrizeToShow = null;

    // 檢查是否獎品已抽完
    if (getRemainingPrizes() === 0) {
        setTimeout(() => {
            document.getElementById('prizeDisplay').innerHTML = '<div style="font-size: 5em; font-weight: bold; text-align: center; color: #ff6b6b;">END</div>';
        }, 3000); // 3秒後顯示END
    }
}

// 陣列洗牌
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 顯示抽獎結果
function displayResults(drawnWinners, prizeName) {
    const prizeDisplay = document.getElementById('prizeDisplay');
    const namesDisplay = document.getElementById('namesDisplay');

    if (!prizeDisplay || !namesDisplay) return;

    // 顯示獎品（左上方框框）
    prizeDisplay.innerHTML = `
        <div style="font-size: 3em; font-weight: bold; text-align: center; color: #ffd700;">
            ${prizeName}
        </div>
    `;

    // 顯示本次中獎名單（只顯示本次抽中的人）
    namesDisplay.innerHTML = `
        <div style="text-align: center; color: #ffd700; font-size: 1.5em; margin-bottom: 20px;">
            🎉 恭喜以下中獎者！
        </div>
        <div style="font-size: 1.3em; line-height: 2.5; color: #fff;">
            ${drawnWinners.map((item, index) =>
                `<div style="padding: 8px; margin: 5px 0; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    ${index + 1}. ${item.employee.name}
                </div>`
            ).join('')}
        </div>
    `;
}

// 重置抽獎（清除該品牌該資格的中獎記錄）
function resetCurrentLottery() {
    const winnerKey = `${currentBrand}-${currentQualification}`;
    if (confirm(`確定要重置「${currentBrand} - ${currentQualification}」的抽獎記錄嗎？這將清除中獎記錄和自定義加碼獎。`)) {
        winners[winnerKey] = [];
        drawnPrizes[winnerKey] = [];
        customPrizes[winnerKey] = []; // 清除自定義加碼獎
        currentPrizeToShow = null;
        saveWinnerHistory();
        updateEligibleEmployees();
        updatePrizeOptions(); // 更新獎品選項
        document.getElementById('prizeDisplay').innerHTML = '';
        document.getElementById('namesDisplay').innerHTML = '';
        document.getElementById('drawButton').disabled = true;
        alert('抽獎記錄已重置！');
    }
}

// 清除所有資料
function clearAllData() {
    if (confirm('確定要清除所有品牌的所有抽獎資料嗎？此操作無法復原！')) {
        winners = {};
        drawnPrizes = {};
        customPrizes = {}; // 清除所有自定義加碼獎
        currentPrizeToShow = null;
        saveWinnerHistory();
        updateEligibleEmployees();
        updatePrizeOptions();
        document.getElementById('prizeDisplay').innerHTML = '';
        document.getElementById('namesDisplay').innerHTML = '';
        document.getElementById('drawButton').disabled = true;
        alert('已清除所有資料！');
    }
}

// 保存當前獎品順序
function savePrizeOrder() {
    const prizeSelect = document.getElementById('prizeSelect');
    const winnerKey = `${currentBrand}-${currentQualification}`;
    const order = [];

    for (let i = 0; i < prizeSelect.options.length; i++) {
        const option = prizeSelect.options[i];
        if (option.dataset.prizeName) {
            order.push(option.dataset.prizeName);
        }
    }

    prizeOrder[winnerKey] = order;
}

// 上移獎品
function movePrizeUp() {
    const prizeSelect = document.getElementById('prizeSelect');
    const selectedIndex = prizeSelect.selectedIndex;

    if (selectedIndex <= 0) {
        return; // 已經在最上面或沒有選擇
    }

    // 交換選項
    const options = prizeSelect.options;
    const temp = {
        text: options[selectedIndex].text,
        value: options[selectedIndex].value,
        dataset: {...options[selectedIndex].dataset}
    };

    options[selectedIndex].text = options[selectedIndex - 1].text;
    options[selectedIndex].value = options[selectedIndex - 1].value;
    Object.assign(options[selectedIndex].dataset, options[selectedIndex - 1].dataset);

    options[selectedIndex - 1].text = temp.text;
    options[selectedIndex - 1].value = temp.value;
    Object.assign(options[selectedIndex - 1].dataset, temp.dataset);

    prizeSelect.selectedIndex = selectedIndex - 1;

    // 保存順序
    savePrizeOrder();
}

// 下移獎品
function movePrizeDown() {
    const prizeSelect = document.getElementById('prizeSelect');
    const selectedIndex = prizeSelect.selectedIndex;

    if (selectedIndex < 0 || selectedIndex >= prizeSelect.options.length - 1) {
        return; // 已經在最下面或沒有選擇
    }

    // 交換選項
    const options = prizeSelect.options;
    const temp = {
        text: options[selectedIndex].text,
        value: options[selectedIndex].value,
        dataset: {...options[selectedIndex].dataset}
    };

    options[selectedIndex].text = options[selectedIndex + 1].text;
    options[selectedIndex].value = options[selectedIndex + 1].value;
    Object.assign(options[selectedIndex].dataset, options[selectedIndex + 1].dataset);

    options[selectedIndex + 1].text = temp.text;
    options[selectedIndex + 1].value = temp.value;
    Object.assign(options[selectedIndex + 1].dataset, temp.dataset);

    prizeSelect.selectedIndex = selectedIndex + 1;

    // 保存順序
    savePrizeOrder();
}

// 處理獎品選擇
function handlePrizeSelection() {
    const prizeSelect = document.getElementById('prizeSelect');
    const prizeDisplayText = document.getElementById('prizeDisplayText');

    if (prizeSelect.selectedIndex < 0) {
        return; // 沒有選擇
    }

    // 顯示獎品
    showNextPrize();

    // 折疊獎品列表，只顯示當前獎品
    const selectedOption = prizeSelect.options[prizeSelect.selectedIndex];
    if (selectedOption && selectedOption.value) {
        prizeDisplayText.textContent = selectedOption.text;
        prizeDisplayText.style.display = 'block';
        prizeSelect.style.display = 'none';
    }
}

// 展開獎品列表
function expandPrizeList() {
    const prizeSelect = document.getElementById('prizeSelect');
    const prizeDisplayText = document.getElementById('prizeDisplayText');

    prizeDisplayText.style.display = 'none';
    prizeSelect.style.display = 'block';
}

// 更新自定義加碼獎區域顯示狀態
function updateCustomPrizeSection() {
    const customPrizeSection = document.getElementById('customPrizeSection');
    if (!customPrizeSection) return;

    // 只在「全部人抽獎」時顯示
    if (currentQualification === 'all') {
        customPrizeSection.style.display = 'block';
    } else {
        customPrizeSection.style.display = 'none';
    }
}

// 添加自定義加碼獎
function addCustomPrize() {
    const nameInput = document.getElementById('customPrizeName');
    const quantityInput = document.getElementById('customPrizeQuantity');

    const prizeName = nameInput.value.trim();
    const prizeQuantity = parseInt(quantityInput.value);

    if (!prizeName) {
        alert('請輸入獎品名稱！');
        return;
    }

    if (!prizeQuantity || prizeQuantity < 1) {
        alert('請輸入有效的數量（至少為 1）！');
        return;
    }

    const winnerKey = `${currentBrand}-${currentQualification}`;

    // 初始化自定義獎品列表（如果不存在）
    if (!customPrizes[winnerKey]) {
        customPrizes[winnerKey] = [];
    }

    // 添加自定義獎品
    customPrizes[winnerKey].push({
        name: prizeName,
        quantity: prizeQuantity
    });

    // 保存到 localStorage
    saveWinnerHistory();

    // 清空輸入框
    nameInput.value = '';
    quantityInput.value = '';

    // 更新獎品選項
    updatePrizeOptions();

    alert(`已成功添加加碼獎：${prizeName} x ${prizeQuantity}`);
}
