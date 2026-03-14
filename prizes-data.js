// 員工資料
const EMPLOYEES_DATA = {
    'only-beauty': [
        { name: '詹念蓁 Jessica', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '李怡靚 debby', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '劉宜亭 Kitty', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '黃妤庭 YY', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '謝淑亭 Celine', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '郭素玲 Zora', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '劉亭汝 Betty', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '蘇郁婷 CC', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '高以柔 Helen', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '黃雅茹 Mina', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '黃美綺 maggie', department: '關新', all: true, '1year': true, '3year': true },
        { name: '徐郁雯 popo', department: '關新', all: true, '1year': true, '3year': true },
        { name: '張紡祐 Fannie', department: '關新', all: true, '1year': false, '3year': false },
        { name: '馬孝明 Mindy', department: '關新', all: true, '1year': true, '3year': false },
        { name: '呂亭蓉 vicky', department: '關新', all: true, '1year': true, '3year': false },
        { name: '許瑄祐 Kelly', department: '關新', all: true, '1year': true, '3year': false },
        { name: '林孟瑩 Aurelia', department: '關新', all: true, '1year': true, '3year': false },
        { name: '王藝臻 joyce', department: '關新', all: true, '1year': false, '3year': false },
        { name: '劉秋蓮 Reina', department: '關新', all: true, '1year': false, '3year': false },
        { name: '劉巧潔 Joanne', department: '關新', all: true, '1year': false, '3year': false },
        { name: '謝語霏 Tiffany', department: '關新', all: true, '1year': false, '3year': false },
        { name: '蔡欣妏 Cindy', department: '東大', all: true, '1year': true, '3year': true },
        { name: '劉雅綸 Ellen', department: '東大', all: true, '1year': true, '3year': true },
        { name: '謝佳軒 Sherry', department: '東大', all: true, '1year': true, '3year': true },
        { name: '楊佳瑀 Nora', department: '東大', all: true, '1year': true, '3year': true },
        { name: '林姿杏 Liz', department: '東大', all: true, '1year': true, '3year': false },
        { name: '陳柔君 Mia', department: '東大', all: true, '1year': true, '3year': false },
        { name: '張芳瑜 Dongdong', department: '東大', all: true, '1year': true, '3year': false },
        { name: '陳宥臻 Oreo', department: '東大', all: true, '1year': false, '3year': false },
        { name: '溫義葶', department: '東大', all: true, '1year': false, '3year': false },
        { name: '于洳雪 Sharon', department: '東大', all: true, '1year': false, '3year': false },
        { name: '陳怡安 Aileen', department: '藝文', all: true, '1year': true, '3year': true },
        { name: '陳渝涵 Cindy', department: '藝文', all: true, '1year': false, '3year': false }
    ],
    'weilai-beauty': [
        { name: '蔡恬恬 Luna', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '張嘉如 Tina', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '廖政翔 KK', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '施宜廷 KARA', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '蕭茹心 YOYO', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '邱文萱 WINNI', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '張筠妮 NIKKI', department: '竹北', all: true, '1year': true, '3year': false },
        { name: '黃唯茹 MICO', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '張姿萍 CC', department: '竹北', all: true, '1year': true, '3year': false },
        { name: '陳敏鈴 REMI', department: '竹北', all: true, '1year': true, '3year': true },
        { name: '黃姿敏 Mina', department: '竹北', all: true, '1year': true, '3year': false },
        { name: '蔡詠琳', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '陳玟彤', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '黃墨涵', department: '竹北', all: true, '1year': false, '3year': false },
        { name: '吳翊菱 JENNIE', department: '新竹', all: true, '1year': true, '3year': true },
        { name: '劉芸芸 MITA', department: '新竹', all: true, '1year': true, '3year': true },
        { name: '邱圓圓 Daisy', department: '新竹', all: true, '1year': true, '3year': false },
        { name: '黃怡萍 Bubu', department: '新竹', all: true, '1year': true, '3year': true },
        { name: '絲葦芯 SUNNY', department: '新竹', all: true, '1year': true, '3year': false },
        { name: '張詠珺 Maggie', department: '新竹', all: true, '1year': true, '3year': true },
        { name: '楊欣汝 Ruby', department: '新竹', all: true, '1year': true, '3year': true },
        { name: '田昀冉', department: '新竹', all: true, '1year': false, '3year': false },
        { name: '楊瑛騏', department: '新竹', all: true, '1year': false, '3year': false },
        { name: '姚瑋寧 Winnie', department: '新竹', all: true, '1year': false, '3year': false },
        { name: '黃湘淳 Sandy', department: '行銷', all: true, '1year': true, '3year': true },
        { name: '魏庭瑄 CoCo', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '林庭廣 Roger', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '余彩妏 Lauren', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '王薪雅 Vicky', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '沈容玉 Kyubi', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '葉思鈺 Elaine', department: '行銷', all: true, '1year': true, '3year': false },
        { name: '林映燁 Chloe', department: '行銷', all: true, '1year': false, '3year': false },
        { name: '范馨文 Luna', department: '行銷', all: true, '1year': false, '3year': false },
        { name: '溫文菱 Tiffany', department: '行銷', all: true, '1year': false, '3year': false },
        { name: '陳芊妤 Qian', department: '行銷', all: true, '1year': false, '3year': false }
    ],
    'skin-bar': [
        { name: '林欣儀 Mumu', department: '1.文中店', all: true, '1year': true},
        { name: '陳妤亭 Yuki', department: '1.文中店', all: true, '1year': true },
        { name: '簡欣柔 Remi', department: '1.文中店', all: true, '1year': false },
        { name: '張語潔 Lia', department: '1.文中店', all: true, '1year': false },
        { name: '翁于嵐 Nico', department: '1.文中店', all: true, '1year': false },
        { name: '柯珦學 Carrie', department: '2.環西店', all: true, '1year': true },
        { name: '李恬葳 Vivi', department: '2.環西店', all: true, '1year': false },
        { name: '李瑜庭 Vicky', department: '2.環西店', all: true, '1year': false },
        { name: '邱雨薇 Vivian', department: '2.環西店', all: true, '1year': false },
        { name: '粘維新 Bella', department: '2.環西店', all: true, '1year': false },
        { name: '簡筱芸 Jenny', department: '3.八德店', all: true, '1year': true },
        { name: '盧宥妏 BoBo', department: '3.八德店', all: true, '1year': true },
        { name: '柯莎莉 Sally', department: '3.八德店', all: true, '1year': true },
        { name: '呂心如 Luna', department: '3.八德店', all: true, '1year': false },
        { name: '陳玟伶 Anna', department: '4.華江店', all: true, '1year': true },
        { name: '王麗玟 Wen', department: '4.華江店', all: true, '1year': true },
        { name: '陳沛琪 Hana', department: '4.華江店', all: true, '1year': true },
        { name: '陳采翎 Ling', department: '4.華江店', all: true, '1year': false },
        { name: '鄭羽真 Lucida', department: '5.一中店', all: true, '1year': false },
        { name: '黃品臻 Bella', department: '5.一中店', all: true, '1year': false },
        { name: '徐秀琳 Wendy', department: '5.一中店', all: true, '1year': true },
        { name: '許怡婷 ET', department: '5.一中店', all: true, '1year': true },
        { name: '游媤惠 Allie', department: '5.一中店', all: true, '1year': false },
        { name: '劉宜如 Novia', department: '6.關新店', all: true, '1year': true },
        { name: '潘瑋婷 Tina', department: '6.關新店', all: true, '1year': false },
        { name: '潘瑞真 Jenny', department: '6.關新店', all: true, '1year': false },
        { name: '張娟娟 Jessie', department: '6.關新店', all: true, '1year': true },
        { name: '邱涵 Hana', department: '7.逢甲店', all: true, '1year': true },
        { name: '黃昱寧 Mao', department: '7.逢甲店', all: true, '1year': true },
        { name: '趙小淇 Nana', department: '7.逢甲店', all: true, '1year': false },
        { name: '陳鈺惠 Joyce', department: '8.小檜溪店', all: true, '1year': true },
        { name: '吳玉梅 Aimee', department: '8.小檜溪店', all: true, '1year': true },
        { name: '黃筱錞 Eva', department: '8.小檜溪店', all: true, '1year': false },
        { name: '林芮羽 Serene', department: '8.小檜溪店', all: true, '1year': false },
        { name: '游雨喬 Joe', department: '8.小檜溪店', all: true, '1year': false },
        { name: '蕭翰萱 Lucy', department: '9.南雅店', all: true, '1year': false },
        { name: '簡若軒 Shirley', department: '9.南雅店', all: true, '1year': false },
        { name: '李妍伊 Lena', department: '9.南雅店', all: true, '1year': false },
        { name: '詹睿靖 Alina', department: '9.南雅店', all: true, '1year': false },
        { name: '何昀臻 Jessica', department: '9.南雅店', all: true, '1year': false },
        { name: '王柔云 Zoe', department: '10.北屯好市多店', all: true, '1year': false },
        { name: '王姵涵 Zoyna', department: '10.北屯好市多店', all: true, '1year': false },
        { name: '陳湘玲 Lara', department: '11.巨蛋店', all: true, '1year': true },
        { name: '林涵雯 Doris', department: '11.巨蛋店', all: true, '1year': false },
        { name: '林姵馨 Iriru', department: '11.巨蛋店', all: true, '1year': false },
        { name: '陳妍君 sally', department: '11.巨蛋店', all: true, '1year': false },
        { name: '王語絃 Shine', department: '12.中和店', all: true, '1year': false },
        { name: '吳蕙亭 Claire', department: '12.中和店', all: true, '1year': false },
        { name: '蔡詠安 Joanne', department: '13.中山花博店', all: true, '1year': false },
        { name: '邱音棋 Daisy', department: '13.中山花博店', all: true, '1year': false },
        { name: '許茹喻 Judy', department: '13.中山花博店', all: true, '1year': false },
        { name: '杜依純 Coco', department: '13.中山花博店', all: true, '1year': false },
        { name: '許若綺 Noki', department: '14.南屯向上', all: true, '1year': false },
        { name: '游書華 Eunice', department: '14.南屯向上', all: true, '1year': false },
        { name: '陳品君 Cherry', department: '14.南屯向上', all: true, '1year': false },
        { name: '陳美珊 Mia', department: '15.小碧潭', all: true, '1year': false },
        { name: '董俐伶 Lili', department: '15.小碧潭', all: true, '1year': false },
        { name: '高婉菁 Ellie', department: '15.小碧潭', all: true, '1year': false },
        { name: '鄭亦真 Rina', department: '15.小碧潭', all: true, '1year': false },
        { name: '顏如妙 Nina', department: '16.林口店', all: true, '1year': true },
        { name: '吳沛娟 Lala', department: '16.林口店', all: true, '1year': false },
        { name: '林安祈', department: '16.林口店', all: true, '1year': false },
        { name: '藍鳳芝 Mina', department: '17.高雄三多區', all: true, '1year': false },
        { name: '蔡志峖 Nina', department: '17.高雄三多區', all: true, '1year': false },
        { name: '林芸臻 Sally', department: '17.高雄三多區', all: true, '1year': false },
        { name: '黃蓉 Emily', department: '教育部門/妝教', all: true, '1year': true },
        { name: '楊雅雲', department: '教育部門/妝教', all: true, '1year': true },
        { name: '甜心', department: '教育部門/妝教', all: true, '1year': true },
        { name: '洪依婷 fiona', department: '教育部門/妝教', all: true, '1year': false },
        { name: 'Sakura', department: '青埔辦公室', all: true, '1year': false },
        { name: '趙若雅', department: '青埔辦公室', all: true, '1year': false },
        { name: '賴俞蓁 Jenny', department: '青埔辦公室', all: true, '1year': false },
        { name: '李采頤', department: '青埔辦公室', all: true, '1year': false },
        { name: '徐浩哲 Zero', department: '青埔辦公室', all: true, '1year': false },
        { name: 'Sandra', department: '青埔辦公室', all: true, '1year': false }
    ]
};

// 獎品資料
const PRIZES_DATA = {
    // 微e美肌膚管理中心
    'only-beauty': {
        '3year': [
            { name: '大堂地獄獎', quantity: 2 }
        ],
        '1year': [
            { name: '不老松按摩券', quantity: 2 },
            { name: '6000新光禮券', quantity: 1 },
            { name: 'DJI 大疆 OSMO POCKET 3', quantity: 1 },
            { name: '周大福 1公克黃金金幣', quantity: 1 },
            { name: 'dyson 戴森 二合一涼暖空氣清淨機', quantity: 1 },
            { name: '電音雙波*1', quantity: 1 }
        ],
        'all': [
            { name: '1000現金', quantity: 5 },
            { name: '黃金奢華黑面膜5入', quantity: 4 },
            { name: '肉毒12U + 2000獎金', quantity: 3 },
            { name: '神+B+FIR面膜', quantity: 3 },
            { name: '煥皮思保養套組', quantity: 3 },
            { name: '5000現金', quantity: 1 },
            { name: '精品卡夾', quantity: 1 }
        ]
    },

    // 微徠美精品醫美診所
    'weilai-beauty': {
        '3year': [
            { name: '大堂地獄獎', quantity: 2 }
        ],
        '1year': [
            { name: '不老松按摩券', quantity: 2 },
            { name: '熊貓針*2', quantity: 2 },
            { name: '一萬新光禮券', quantity: 1 },
            { name: '水母音響', quantity: 1 },
            { name: '逆時針*1', quantity: 1 },
            { name: '音波 800條', quantity: 1 },
            { name: 'ipad 128GB WiFi版', quantity: 1 },
        ],
        'all': [
            { name: '1000現金', quantity: 5 },
            { name: '黃金奢華黑面膜5入', quantity: 3 },
            { name: '神+B+FIR面膜', quantity: 3 },
            { name: '肉毒12U + 2000獎金', quantity: 3 },
            { name: '5000現金', quantity: 1 },
            { name: 'AirPods Pro 3', quantity: 1 },
        ]
    },

    // 淨膚寶 (Skin Bar)
    'skin-bar': {
        '1year': [
            { name: '大堂地獄獎', quantity: 2 }
        ],
        'all': [
            { name: '不老松按摩券', quantity: 7 },
            { name: '面膜二入組', quantity: 5 },
            { name: '1000現金', quantity: 5 },
            { name: '2000現金', quantity: 3 },
            { name: 'Apple Watch SE 3', quantity: 1 },
            { name: 'Abby加碼-1500現金', quantity: 10 },
            { name: 'Kelly加碼-1500現金', quantity: 10 }
        ]
    }
};

// 資格選項對應
const QUALIFICATION_OPTIONS = {
    'only-beauty': [
        { value: 'all', label: '全部人的抽獎' },
        { value: '1year', label: '1年以上的抽獎' },
        { value: '3year', label: '3年以上的抽獎' }
    ],
    'weilai-beauty': [
        { value: 'all', label: '全部人的抽獎' },
        { value: '1year', label: '1年以上的抽獎' },
        { value: '3year', label: '3年以上的抽獎' }
    ],
    'skin-bar': [
        { value: 'all', label: '全部人的抽獎' },
        { value: '1year', label: '1年以上的抽獎' }
    ]
};
