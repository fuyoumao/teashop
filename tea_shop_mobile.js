// 古风茶铺手机版 JavaScript

// 游戏数据
const gameData = {
    // 季节和天气
    currentSeason: "春天",
    currentWeather: "晴天",
    currentDay: 1,
    seasons: ["春天", "夏天", "秋天", "冬天"],
    weathers: ["晴天", "刮风", "下雨", "下雪", "阴天"],
    weatherDuration: 20000, // 毫秒
    weatherStartTime: Date.now(),
    daysInSeason: 0,
    daysPerSeason: 10,

    // 种子和库存
    seeds: {},
    seedInfo: {}, // 存储种子的详细信息
    inventory: {},
    selectedSeedType: null,

    // 农田
    plots: [
        {
            id: 0,
            state: 'empty',
            growthStage: 0,
            stageStartTime: 0,
            moisture: 50,
            fertility: 50,
            plantType: null
        },
        {
            id: 1,
            state: 'empty',
            growthStage: 0,
            stageStartTime: 0,
            moisture: 50,
            fertility: 50,
            plantType: null
        },
        {
            id: 2,
            state: 'empty',
            growthStage: 0,
            stageStartTime: 0,
            moisture: 50,
            fertility: 50,
            plantType: null
        },
        {
            id: 3,
            state: 'empty',
            growthStage: 0,
            stageStartTime: 0,
            moisture: 50,
            fertility: 50,
            plantType: null
        }
    ],
    growthStages: ["长芽", "大叶子", "开花", "成熟"],
    stageDuration: 15000, // 毫秒，每个阶段15秒
    moistureConsumption: 10,
    fertilityConsumption: 5,
    minMoisture: 10,
    minFertility: 20,

    // 炉灶
    stoves: [
        {
            state: 'empty',
            startTime: 0,
            boilDuration: 20000, // 改为20秒
            recipe: null
        },
        {
            state: 'empty',
            startTime: 0,
            boilDuration: 20000, // 改为20秒
            recipe: null
        }
    ],

    // 茶饮
    madeTeas: [],
    teaTemps: {},
    teaMakeTimes: {},
    teaCoolingDuration: 20000,

    // 小料
    toppings: {
        "红糖": 5,
        "薄荷叶": 5,
        "姜丝": 5,
        "柚子丝": 5,
        "银耳丝": 5,
        "柠檬片": 5,
        "蜂蜜": 5,
        // 新增小料（初始为0，需要通过加工获得）
        "冰糖": 0,
        "乌龙茶包": 0,
        "干桂花": 0,
        "小圆子": 0,
        "酒酿": 0,
        "水蜜桃果肉": 0,
        "黄芪片": 0
    },

    // 顾客
    customer: {
        active: false,
        name: "暂无顾客",
        isVIP: false,
        teaChoice: null,
        toppingChoices: [],
        arrivalTime: 0,
        patience: 120000, // 普通顾客120秒
        served: false
    },
    customerSpawnCooldown: 5000, // 5秒检查一次是否生成新顾客
    lastCustomerTime: 0,
    customerNames: ['池惊暮', '凌小路', '江飞飞', '江三', '江四', '池云旗', '江潮', '江敕封', '花花', '姬别情', '池九信', '狸怒'],

    // 集卡系统
    collectedCards: {},

    // 消息
    messages: ["欢迎来到古风茶铺手机版!"],

    // 小篮子选择相关
    selectedPlotForPlanting: null,
    selectedSeedForPlanting: null,

    // 购物车
    cart: [],

    // 货币
    coins: 100,

    // 配方
    recipeIngredients: {
        "五味子饮": ["五味子"],
        "古法酸梅汤": ["乌梅", "山楂", "陈皮", "甘草", "桂花"],
        "焦香大麦茶": ["大麦"],
        "三花决明茶": ["菊花", "金银花", "决明子", "枸杞"],
        "陈皮姜米茶": ["陈皮", "生姜"],
        "桂圆红枣茶": ["桂圆", "红枣", "枸杞"],
        "薄荷甘草凉茶": ["薄荷", "甘草"],
        "洛神玫瑰饮": ["洛神花", "玫瑰花", "山楂"],
        "冬瓜荷叶饮": ["冬瓜", "荷叶", "薏米"],
        "小吊梨汤": ["雪花梨", "银耳丝", "话梅", "枸杞"],
        "柠檬茶": ["柠檬"],
        // 新增解锁配方
        "桑菊润燥茶": ["桑叶", "杭白菊", "冰糖"],
        "桂花酒酿饮": ["酒酿", "干桂花", "小圆子"],
        "蜜桃乌龙冷萃": ["水蜜桃果肉", "乌龙茶包", "蜂蜜"],
        "黄芪枸杞茶": ["黄芪片", "枸杞", "红枣"],
        "竹蔗茅根马蹄水": ["甘蔗", "白茅根", "马蹄"]
    },

    // 初始茶饮
    initialTeas: ["五味子饮", "古法酸梅汤", "焦香大麦茶", "三花决明茶", "陈皮姜米茶",
                  "桂圆红枣茶", "薄荷甘草凉茶", "洛神玫瑰饮", "冬瓜荷叶饮", "小吊梨汤", "柠檬茶"],

    // 新增：顾客计数和配方解锁系统
    servedCustomers: 0, // 已服务的顾客数量
    unlockedRecipes: ["五味子饮", "柠檬茶"], // 已解锁的配方，其他需要通过特殊顾客解锁
    recipeUnlockRequirements: {
        "桑菊润燥茶": 30,
        "桂花酒酿饮": 60,
        "蜜桃乌龙冷萃": 90,
        "黄芪枸杞茶": 120,
        "竹蔗茅根马蹄水": 150
    },
    customerVisits: {}, // 记录特殊顾客来访次数
    recipeStories: {    // 配方解锁的小故事
        "洛神玫瑰饮": {
            customer: "凌小路",
            title: "朱砂",
            story: "凌小路袖中藏着一盏温热的洛神玫瑰饮。'疏肝解郁的，好好学学，飞飞来了就做给他。跟他说就说养颜的茶方子'挑眉笑时，眼底却映着刀光，袍角还沾着血。",
            effect: "疏肝解郁，美白养颜，活血调经，适合女子日常饮用。"
        },
        "桂圆红枣茶": {
            customer: "花花",
            title: "无归",
            story: "花花去凌雪坟前扫墓，手里拿着他最喜欢她给他做的茶。只是这一次只能自己做了。'自己给自己作茶怎么行，这方子给你们，以后我就来这里喝吧'",
            effect: "补血益气，安神养心，滋阴润燥，适合体弱或熬夜者饮用。"
        },
        "焦香大麦茶": {
            customer: "江飞飞",
            title: "雪夜",
            story: "长安冬夜，江飞飞蜷在凌雪阁的屋檐上，指尖冻得发僵。江三翻上屋顶，扔来一壶滚烫的大麦茶：'怂样，喝两口。'茶雾氤氲里，他忽然想起幼时第一次握刀，也是这焦苦的甜香压住了颤抖。",
            effect: "暖胃消食，缓解焦虑，安定心神，适合秋冬饮用。"
        },
        "三花决明茶": {
            customer: "江三",
            title: "夜狩",
            story: "江四执刀归来，见江三伏案瞌睡，手边一盏凉透的三花决明茶。他轻叹，将外袍披上兄长肩头——却不知昨夜自己任务单上那三个名字，早已被江三的血刃划去。茶渣沉底，如未愈的旧伤。",
            effect: "清肝明目，清热解毒，缓解眼疲劳，适合长期伏案或夜视者饮用。"
        },
        "薄荷甘草凉茶": {
            customer: "江四",
            title: "三哥",
            story: "江四给江三泡的茶，清清凉凉的，他那么爱出汗，肯定喜欢。茶叶刚放下，就听到三哥在院子里训练的刀声，他悄悄探头看了一眼，决定加多一片薄荷叶。",
            effect: "清热解暑，润喉止咳，提神醒脑，适合夏季饮用。"
        },
        "陈皮姜米茶": {
            customer: "池云旗",
            title: "师徒",
            story: "池云旗心疼那小家伙，以前也不懂自己照顾自己，这茶是她专门给他找医师抄的方子。'别总吃那些乱七八糟的东西，胃疼了可别来找师父'虽然嘴上这么说，她还是悄悄在茶里多加了一片陈皮。",
            effect: "健脾和胃，理气化痰，温中散寒，适合消化不良或胃寒者饮用。"
        },
        "冬瓜荷叶饮": {
            customer: "江潮",
            title: "师徒2",
            story: "江潮给师父弄的消暑茶，荷叶是自己趴在池塘边采的，冬瓜也是自己种的。'师父，您尝尝，我按照您说的方法做的'他小心翼翼地端着茶，生怕师父不喜欢，却不知道池云旗早已欣慰地笑了。",
            effect: "清热利湿，消肿减脂，美容养颜，适合夏季消暑或减肥者饮用。"
        },
        "古法酸梅汤": {
            customer: "池惊暮",
            title: "梅香",
            story: "长安暑夜，池惊暮执剑伏于屋脊。目标出现时，她正饮尽最后一滴酸梅汤。瓷碗坠地碎响混着喉骨断裂声，梅妃教的小方子——杀人时唇齿间该留着甜味，才不苦。",
            effect: "生津止渴，消暑解腻，健脾开胃，缓解燥热，唐代已是宫廷消暑佳饮。"
        },
        "小吊梨汤": {
            customer: "江敕封",
            title: "琴心",
            story: "江敕封抚琴时总爱在身边放一盏小吊梨汤，琴声悠扬，茶香袅袅。他说琴如人生，需要慢慢调教；茶如心境，需要细细品味。一曲终了，一盏茶尽，都是这世间最温柔的时光。",
            effect: "润肺止咳，清热降火，滋阴美容，宫廷传统滋补佳品。"
        }
    },
    // 配方解锁条件
    recipeUnlockRules: {
        "洛神玫瑰饮": { customer: "凌小路", visitsRequired: 1, chance: 1.0, guaranteedOnVisit: 1 },
        "桂圆红枣茶": { customer: "花花", visitsRequired: 1, chance: 1.0, guaranteedOnVisit: 1 },
        "焦香大麦茶": { customer: "江飞飞", visitsRequired: 2, chance: 1.0, guaranteedOnVisit: 2 },
        "三花决明茶": { customer: "江三", visitsRequired: 2, chance: 1.0, guaranteedOnVisit: 2 },
        "薄荷甘草凉茶": { customer: "江四", visitsRequired: 2, chance: 1.0, guaranteedOnVisit: 2 },
        "陈皮姜米茶": { customer: "池云旗", visitsRequired: 2, chance: 0.5, guaranteedOnVisit: 3 },
        "冬瓜荷叶饮": { customer: "江潮", visitsRequired: 3, chance: 0.6, guaranteedOnVisit: 4 },
        "古法酸梅汤": { customer: "池惊暮", visitsRequired: 2, chance: 0.3, guaranteedOnVisit: 3 },
        "小吊梨汤": { customer: "江敕封", visitsRequired: 3, chance: 0.4, guaranteedOnVisit: 5 },
    }
};

// 初始化材料
const MATERIALS = [
    "五味子", "乌梅", "山楂", "陈皮", "甘草", "桂花", "大麦",
    "菊花", "金银花", "决明子", "枸杞", "生姜", "桂圆", "红枣",
    "薄荷", "玫瑰花", "洛神花", "冬瓜", "荷叶", "薏米", "雪花梨",
    "话梅", "甘蔗", "柚子", "柠檬",
    // 新增种子
    "桑叶", "杭白菊", "水蜜桃", "黄芪", "白茅根", "马蹄", "糯米", "米"
];

// 初始化种子和库存
MATERIALS.forEach(material => {
    // 将种子信息存储在单独的对象中
    gameData.seedInfo[material] = {
        price: 1,
        growTime: 30000,
        yield: material
    };
    // 种子数量初始化为0
    gameData.seeds[material] = 0;
    gameData.inventory[material] = 1; // 每种材料初始化为1个
});

// 设置新种子的特殊价格和生长时间
const NEW_SEED_CONFIG = {
    "桑叶": { price: 2, growTime: 45000 },      // 45秒
    "杭白菊": { price: 2, growTime: 50000 },    // 50秒
    "水蜜桃": { price: 3, growTime: 60000 },    // 60秒
    "黄芪": { price: 3, growTime: 55000 },      // 55秒
    "白茅根": { price: 2, growTime: 40000 },    // 40秒
    "马蹄": { price: 2, growTime: 45000 },      // 45秒
    "糯米": { price: 2, growTime: 50000 },      // 50秒
    "米": { price: 1, growTime: 40000 }         // 40秒
};

// 应用新种子配置
Object.keys(NEW_SEED_CONFIG).forEach(seedName => {
    if (gameData.seedInfo[seedName]) {
        gameData.seedInfo[seedName].price = NEW_SEED_CONFIG[seedName].price;
        gameData.seedInfo[seedName].growTime = NEW_SEED_CONFIG[seedName].growTime;
    }
});

// 添加铜板
gameData.coins = 100;

// 添加购物车
gameData.cart = [];

// 添加最后点击的空地索引
gameData.lastClickedPlot = undefined;

// 添加加工配方（更新为1→3产出）
gameData.processingRecipes = {
    '红糖': { ingredients: ['甘蔗'], time: 10000, output: 3 },
    '薄荷叶': { ingredients: ['薄荷'], time: 10000, output: 3 },
    '姜丝': { ingredients: ['生姜'], time: 10000, output: 3 },
    '柚子丝': { ingredients: ['柚子'], time: 10000, output: 3 },
    '银耳丝': { ingredients: ['银耳'], time: 15000, output: 3 },
    '柠檬片': { ingredients: ['柠檬'], time: 10000, output: 3 },
    // 新增加工配方
    '水蜜桃果肉': { ingredients: ['水蜜桃'], time: 12000, output: 3 },
    '黄芪片': { ingredients: ['黄芪'], time: 12000, output: 3 },
    '干桂花': { ingredients: ['桂花'], time: 10000, output: 3 },
    '小圆子': { ingredients: ['糯米'], time: 15000, output: 3 },
            '酒酿': { ingredients: ['米'], time: 18000, output: 3 }
};

// 添加加工台
gameData.processingBoard = {
    state: 'idle', // idle, processing
    recipe: null,
    startTime: 0,
    duration: 0
};

// 添加商店物品
gameData.shopItems = {
    '蜂蜜': { price: 3 },
    '银耳': { price: 3 },
    '红糖': { price: 2 },
    '薄荷叶': { price: 2 },
    // 新增物品
    '冰糖': { price: 3 },
    '乌龙茶包': { price: 4 }
};

// 当前活动标签
gameData.activeTab = 'farm-tab';
// 当前信息滑块索引
gameData.currentSlide = 0;

// DOM元素引用
let elements = {
    // 信息显示
    weather: document.getElementById('weather'),
    season: document.getElementById('season'),
    day: document.getElementById('day'),
    selectedSeed: document.getElementById('selected-seed'),

    // 菜单和面板
    menuBtn: document.getElementById('menu-btn'),
    menuPanel: document.getElementById('menu-panel'),
    closeMenu: document.getElementById('close-menu'),

    // 游戏选项卡
    gameTabs: document.querySelectorAll('.game-tab'),
    gameContents: document.querySelectorAll('.game-content'),

    // 信息滑块
    swiperWrapper: document.querySelector('.swiper-wrapper'),
    swiperSlides: document.querySelectorAll('.swiper-slide'),
    paginationBullets: document.querySelector('.swiper-pagination'),

    // 面板
    seedPanel: document.getElementById('seed-panel'),
    recipePanel: document.getElementById('recipe-panel'),

    // 按钮
    saveBtn: document.getElementById('save'),
    loadBtn: document.getElementById('load'),
    recipeBtn: document.getElementById('recipe-button'),
    closeRecipeBtn: document.getElementById('close-recipe'),
    closeShopBtn: document.getElementById('close-shop'),
    serveBtn: document.getElementById('serve-btn'),

    // 商店选项卡
    shopTabs: document.querySelectorAll('.shop-tabs .tab-btn'),
    shopContents: document.querySelectorAll('.shop-panel .tab-content'),

    // 配方选项卡
    recipeTabs: document.querySelectorAll('.recipe-tabs .tab-btn'),
    recipeContents: document.querySelectorAll('.recipe-panel .tab-content'),

    // 农田
    plots: document.querySelectorAll('.plot'),
    plotCheckboxes: document.querySelectorAll('.plot-checkbox'),
    selectAllPlotsCheckbox: document.getElementById('select-all-plots'),

    // 农田操作按钮
    farmBuySeedBtn: document.getElementById('buy-seed-farm'),
    farmWaterBtn: document.getElementById('water-farm'),
    farmFertilizeBtn: document.getElementById('fertilize-farm'),
    farmDigOutBtn: document.getElementById('dig-out-farm'),

    // 茶摊商店按钮和配方按钮
    teaBuySeedBtn: document.getElementById('buy-seed-tea'),
    basketBuySeedBtn: document.getElementById('buy-seed-basket'),
    basketRecipeBtn: document.getElementById('basket-recipe-button'),
    serveBtnTea: document.getElementById('serve-btn-tea'),

    // 炉灶
    stoves: [
        document.getElementById('stove-1'),
        document.getElementById('stove-2')
    ],

    // 加工台
    processingBoard: document.getElementById('processing-board'),
    recipeButtons: document.querySelectorAll('.recipe-btn'),

    // 顾客信息
    customerName: document.getElementById('customer-name'),
    customerTea: document.getElementById('customer-tea'),
    customerToppings: document.getElementById('customer-toppings'),
    patienceTimer: document.getElementById('patience-timer'),

    // 显示区域
    basketContent: document.querySelector('.basket-content'),
    messageContent: document.querySelector('.message-content'),
    teaDisplay: document.querySelector('.tea-display'),
    toppingsDisplay: document.getElementById('toppings-display'),

    // 购物车
    cartItems: document.querySelector('.cart-items'),
    cartTotalAmount: document.getElementById('cart-total-amount'),
    checkoutBtn: document.getElementById('checkout-btn'),
    clearCartBtn: document.getElementById('clear-cart-btn'),

    // 计数显示
    coinsCount: document.getElementById('coins-count'),
    shopCoinsCount: document.getElementById('shop-coins-count'),

    // 炉灶配方选择相关的元素
    recipeSelectPanel: document.getElementById('recipe-select-panel'),
    recipeSelectList: document.querySelector('.recipe-select-list'),
    selectedRecipeName: document.getElementById('selected-recipe-name'),
    selectedRecipeIngredients: document.getElementById('selected-recipe-ingredients'),
    makeRecipeBtn: document.getElementById('make-recipe-btn'),
    cancelRecipeBtn: document.getElementById('cancel-recipe-btn'),
    closeRecipeSelectBtn: document.getElementById('close-recipe-select'),

    // 菜单面板中添加收藏卡按钮事件
    collectionBtn: document.getElementById('collection-button'),

    // 小篮子选择面板
    basketSelectPanel: document.getElementById('basket-select-panel'),
    closeBasketSelectBtn: document.getElementById('close-basket-select'),
    availableSeedsGrid: document.getElementById('available-seeds-grid'),
    unavailableSeedsGrid: document.getElementById('unavailable-seeds-grid'),
    selectedPlotName: document.getElementById('selected-plot-name'),
    confirmPlantBtn: document.getElementById('confirm-plant-btn'),

    // 新的商店按钮
    buySeedMenuBtn: document.getElementById('buy-seed-menu'),
    buySeedFarmBtn: document.getElementById('buy-seed-farm'),

    // 可点击的田地物品
    clickableItems: document.querySelectorAll('.clickable-item')
};

// 添加消息
function addMessage(message, isWarning = false) {
    // 如果是警告消息，创建一个带有警告标记的对象
    const messageObj = isWarning ? { text: message, isWarning: true } : message;
    gameData.messages.push(messageObj);

    // 限制消息数量，保留最新的20条
    if (gameData.messages.length > 20) {
        gameData.messages.shift();
    }

    updateMessageDisplay();
}

// 更新消息显示
function updateMessageDisplay() {
    const messageContent = document.querySelector('.message-content');
    if (!messageContent) return;

    messageContent.innerHTML = '';

    gameData.messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        if (typeof message === 'object' && message.isWarning) {
            messageDiv.classList.add('error');
            messageDiv.textContent = message.text;
        } else {
            messageDiv.textContent = message;
        }

        messageContent.appendChild(messageDiv);
    });

    // 自动滚动到底部
    messageContent.scrollTop = messageContent.scrollHeight;
}

// 更新天气和季节
function updateWeatherAndSeason() {
    const currentTime = Date.now();

    // 如果天气持续时间已过
    if (currentTime - gameData.weatherStartTime >= gameData.weatherDuration) {
        gameData.weatherStartTime = currentTime;

        // 随机选择新天气
        const oldWeather = gameData.currentWeather;
        do {
            gameData.currentWeather = gameData.weathers[Math.floor(Math.random() * gameData.weathers.length)];
        } while (
            (gameData.currentSeason === "冬天" && gameData.currentWeather === "下雨") ||
            (gameData.currentSeason !== "冬天" && gameData.currentWeather === "下雪") ||
            gameData.currentWeather === oldWeather
        );

        // 增加天数
        gameData.currentDay++;
        gameData.daysInSeason++;

        // 如果达到季节变化的天数
        if (gameData.daysInSeason >= gameData.daysPerSeason) {
            gameData.daysInSeason = 0;

            // 更改季节
            const currentSeasonIndex = gameData.seasons.indexOf(gameData.currentSeason);
            gameData.currentSeason = gameData.seasons[(currentSeasonIndex + 1) % gameData.seasons.length];

            addMessage(`季节已经变为${gameData.currentSeason}了。`);
        }

        addMessage(`天气变为${gameData.currentWeather}了。`);
        applyWeatherEffects();
        updateWeatherAndSeasonDisplay();
    }
}

// 应用天气效果
function applyWeatherEffects() {
    // 对每个地块应用天气效果
    gameData.plots.forEach((plot, index) => {
        if (plot.state !== 'empty') {
            // 下雨增加湿度
            if (gameData.currentWeather === "下雨") {
                plot.moisture = Math.min(100, plot.moisture + 20);
                addMessage(`雨水滋润了地块${index + 1}。`);
            }
            // 刮风降低湿度
            else if (gameData.currentWeather === "刮风") {
                plot.moisture = Math.max(0, plot.moisture - 10);
                addMessage(`大风使地块${index + 1}的水分蒸发了一些。`);
            }
        }
    });

    updatePlotsDisplay();
}

// 更新地块显示
function updatePlotsDisplay() {
    gameData.plots.forEach((plot, index) => {
        const plotElement = elements.plots[index];
        if (plotElement) {
            const plotName = plotElement.querySelector('.plot-name');
            const plotMoisture = plotElement.querySelector('.plot-moisture');
            const plotFertility = plotElement.querySelector('.plot-fertility');
            const plotStage = plotElement.querySelector('.plot-stage');
            const plotTimer = plotElement.querySelector('.plot-timer');
            const plotIcon = plotElement.querySelector('.plot-icon');

            if (plot.state === 'empty') {
                plotName.textContent = '空地';
                plotStage.textContent = '-';
                plotTimer.textContent = '-';
                plotIcon.textContent = '';
            } else {
                plotName.textContent = plot.plantType;
                plotStage.textContent = gameData.growthStages[plot.growthStage];

                // 设置植物图标
                switch(plot.growthStage) {
                    case 0: // 种子
                        plotIcon.textContent = '🌱';
                        break;
                    case 1: // 发芽
                        plotIcon.textContent = '🌿';
                        break;
                    case 2: // 生长
                        plotIcon.textContent = '🍀';
                        break;
                    case 3: // 成熟
                        // 根据植物类型选择不同的成熟图标
                        if(plot.plantType === '五味子') {
                            plotIcon.textContent = '🍇';
                        } else if(plot.plantType === '乌梅') {
                            plotIcon.textContent = '🍑';
                        } else if(plot.plantType === '山楂') {
                            plotIcon.textContent = '🍒';
                        } else if(plot.plantType === '菊花') {
                            plotIcon.textContent = '🌼';
                        } else if(plot.plantType === '陈皮') {
                            plotIcon.textContent = '🍊';
                        } else if(plot.plantType === '玫瑰花' || plot.plantType === '玫瑰') {
                            plotIcon.textContent = '🌹';
                        } else if(plot.plantType === '茉莉花') {
                            plotIcon.textContent = '🌺';
                        } else if(plot.plantType === '甘蔗') {
                            plotIcon.textContent = '🎋';
                        } else if(plot.plantType === '薄荷') {
                            plotIcon.textContent = '🍀';
                        } else if(plot.plantType === '生姜') {
                            plotIcon.textContent = '🥭';
                        } else if(plot.plantType === '大麦') {
                            plotIcon.textContent = '🌾';
                        } else if(plot.plantType === '柠檬') {
                            plotIcon.textContent = '🍋';
                        } else {
                            plotIcon.textContent = '🌿';
                        }
                        break;
                    default:
                        plotIcon.textContent = '';
                }

                // 计算剩余时间
                if (plot.state === 'growing') {
                    const currentTime = Date.now();
                    const elapsed = currentTime - plot.stageStartTime;
                    const remaining = Math.max(0, plot.growthTime - elapsed);

                    // 显示剩余时间（秒）
                    plotTimer.textContent = Math.ceil(remaining / 1000) + '秒';
                } else if (plot.state === 'ready') {
                    plotTimer.textContent = '可收获';
                }
            }

            plotMoisture.textContent = plot.moisture + '%';
            plotFertility.textContent = plot.fertility + '%';
        }
    });
}

// 更新天气和季节显示
function updateWeatherAndSeasonDisplay() {
    if (elements.weather) elements.weather.textContent = gameData.currentWeather;
    if (elements.season) elements.season.textContent = gameData.currentSeason;
    if (elements.day) elements.day.textContent = gameData.currentDay;
}

// 更新植物生长
function updateGrowth() {
    const currentTime = Date.now();

    gameData.plots.forEach((plot, index) => {
        if (plot.state === 'growing') {
            // 检查生长条件
            if (plot.moisture < gameData.minMoisture || plot.fertility < gameData.minFertility) {
                addMessage(`地块${index + 1}的${plot.plantType}由于条件不足而停止生长。`, true);
                return;
            }

            const elapsed = currentTime - plot.stageStartTime;

            // 如果当前阶段已完成
            if (elapsed >= plot.growthTime) {
                // 消耗湿度和肥力
                plot.moisture = Math.max(0, plot.moisture - gameData.moistureConsumption);
                plot.fertility = Math.max(0, plot.fertility - gameData.fertilityConsumption);

                // 增加生长阶段
                plot.growthStage++;

                // 检查是否已成熟
                if (plot.growthStage >= gameData.growthStages.length - 1) {
                    plot.state = 'ready';
                    plot.growthStage = gameData.growthStages.length - 1;
                    addMessage(`地块${index + 1}的${plot.plantType}已经成熟，可以收获了！`);
                } else {
                    // 更新下一阶段的开始时间
                    plot.stageStartTime = currentTime;
                    addMessage(`地块${index + 1}的${plot.plantType}进入了${gameData.growthStages[plot.growthStage]}阶段。`);
                }

                updatePlotsDisplay();
            }
        }
    });
}

// 更新炉灶
function updateStove() {
    const currentTime = Date.now();

    gameData.stoves.forEach((stove, index) => {
        if (stove.state === 'boiling') {
            const elapsed = currentTime - stove.startTime;

            // 如果煮沸完成
            if (elapsed >= stove.boilDuration) {
                stove.state = 'done';

                // 制作茶饮
                if (stove.recipe) {
                    const teaId = makeTea(stove.recipe);
                    addMessage(`炉灶${index + 1}煮好了一壶${stove.recipe}！`);
                }

                updateStoveDisplay();
            }
        }
    });
}

// 更新顾客
function updateCustomer() {
    if (!gameData.customer.active) {
        // 检查是否应该生成新顾客
        const currentTime = Date.now();
        if (currentTime - gameData.lastCustomerTime >= gameData.customerSpawnCooldown) {
            // 有20%的几率生成客户
            if (Math.random() < 0.2) {
                spawnCustomer();
            }

            // 无论是否生成客户，都重置冷却时间
            gameData.lastCustomerTime = currentTime;
        }
    } else {
        // 顾客正在等待
        const currentTime = Date.now();
        const waitTime = currentTime - gameData.customer.arrivalTime;

        // 更新耐心计时器
        const patienceTimer = document.getElementById('patience-timer');
        if (patienceTimer) {
            const remainingPatience = Math.max(0, Math.floor((gameData.customer.patience - waitTime) / 1000));
            patienceTimer.textContent = remainingPatience;

            // 如果耐心耗尽
            if (waitTime >= gameData.customer.patience && !gameData.customer.served) {
                addMessage(`${gameData.customer.name}等不及了，离开了茶铺。`, true);
                resetCustomer();
            }
        }
    }
}

// 生成顾客
function spawnCustomer() {
    debug('生成顾客');

    // 30%概率生成特殊顾客（有名字的）
    const isVIP = Math.random() < 0.3;

    // 设置顾客信息
    const customerName = isVIP ? gameData.customerNames[Math.floor(Math.random() * gameData.customerNames.length)] : "普通顾客";

    // 只从已解锁的配方中选择
    if (!gameData.unlockedRecipes || gameData.unlockedRecipes.length === 0) {
        debug('没有可用的配方，使用默认配方');
        gameData.unlockedRecipes = ["五味子饮", "柠檬茶"]; // 确保至少有这两个基础配方
    }
    const teaChoice = gameData.unlockedRecipes[Math.floor(Math.random() * gameData.unlockedRecipes.length)];

    // 修改耐心时间：普通顾客120秒，特殊顾客240秒
    const patience = isVIP ? 240000 : 120000; // VIP 240秒，普通顾客 120秒

    // 更新顾客状态
    gameData.customer = {
        active: true,
        name: customerName,
        isVIP: isVIP,
        teaChoice: teaChoice,
        toppingChoices: [],
        arrivalTime: Date.now(),
        patience: patience,
        served: false
    };

    // 随机选择0-2个小料
    const availableToppings = Object.keys(gameData.toppings);
    const numToppings = Math.floor(Math.random() * 3);
    for (let i = 0; i < numToppings; i++) {
        const topping = availableToppings[Math.floor(Math.random() * availableToppings.length)];
        if (!gameData.customer.toppingChoices.includes(topping)) {
            gameData.customer.toppingChoices.push(topping);
        }
    }

    // 显示顾客到来消息
    let arrivalMessage = isVIP ? `${customerName}来到了茶铺` : "一位普通顾客来到了茶铺";
    arrivalMessage += `，想要一杯${teaChoice}`;
    if (gameData.customer.toppingChoices.length > 0) {
        arrivalMessage += `，加${gameData.customer.toppingChoices.join('、')}`;
    }
    addTeaInfoMessage(arrivalMessage);

    updateCustomerDisplay();
}

// 更新顾客显示
function updateCustomerDisplay() {
    const customerName = document.getElementById('customer-name');
    const customerTea = document.getElementById('customer-tea');
    const customerToppings = document.getElementById('customer-toppings');
    const patienceTimer = document.getElementById('patience-timer');

    if (!customerName || !customerTea || !customerToppings || !patienceTimer) return;

    if (gameData.customer.active) {
        // 显示顾客名称和类型
        customerName.textContent = gameData.customer.isVIP ?
            `${gameData.customer.name} (特殊顾客)` :
            "普通顾客";

        // 显示想要的茶
        customerTea.textContent = gameData.customer.teaChoice || '-';

        // 显示想要的小料
        customerToppings.textContent = gameData.customer.toppingChoices.length > 0 ?
            gameData.customer.toppingChoices.join('、') : '无';

        // 计算并显示剩余耐心时间
        const currentTime = Date.now();
        const waitTime = currentTime - gameData.customer.arrivalTime;
        const remainingPatience = Math.max(0, Math.floor((gameData.customer.patience - waitTime) / 1000));
        patienceTimer.textContent = remainingPatience;

        // 根据剩余时间设置颜色
        if (remainingPatience < 30) {
            patienceTimer.style.color = '#d32f2f'; // 红色
        } else if (remainingPatience < 60) {
            patienceTimer.style.color = '#f57c00'; // 橙色
        } else {
            patienceTimer.style.color = '#2e7d32'; // 绿色
        }

        // 显示总耐心时间
        const totalPatience = Math.floor(gameData.customer.patience / 1000);
        patienceTimer.title = `总耐心时间: ${totalPatience}秒`;
    } else {
        // 没有顾客时显示默认值
        customerName.textContent = '暂无顾客';
        customerTea.textContent = '-';
        customerToppings.textContent = '-';
        patienceTimer.textContent = '-';
        patienceTimer.style.color = ''; // 恢复默认颜色
    }
}

// 重置顾客
function resetCustomer() {
    gameData.customer = {
        active: false,
        name: "暂无顾客",
        isVIP: false,
        teaChoice: null,
        toppingChoices: [],
        arrivalTime: 0,
        patience: 120000, // 重置为普通顾客的耐心时间 120秒
        served: false
    };

    updateCustomerDisplay();
}

// 制作茶饮
function makeTea(recipeName) {
    const teaId = Date.now(); // 使用时间戳作为唯一ID

    // 添加到制作的茶列表
    const newTea = {
        id: teaId,
        name: recipeName,
        recipe: recipeName,
        toppings: [],
        makeTime: Date.now()
    };
    gameData.madeTeas.push(newTea);

    // 设置初始温度为热
    gameData.teaTemps[teaId] = 'hot';
    gameData.teaMakeTimes[teaId] = Date.now();

    addTeaInfoMessage(`成功煮好了一壶${recipeName}`);
    updateTeaDisplay();

    return teaId;
}

// 添加选项卡功能
function setupTabSystem() {
    // 游戏主选项卡
    elements.gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // 切换选项卡活动状态
            elements.gameTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 切换内容区域
            elements.gameContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                    gameData.activeTab = targetTab;
                }
            });
        });
    });

    // 商店选项卡
    elements.shopTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // 切换选项卡活动状态
            elements.shopTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 切换内容区域
            elements.shopContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 配方选项卡
    elements.recipeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // 切换选项卡活动状态
            elements.recipeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 切换内容区域
            elements.recipeContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 设置滑块系统
function setupSwiper() {
    // 创建分页指示器
    if (elements.paginationBullets && elements.swiperSlides.length > 0) {
        elements.paginationBullets.innerHTML = '';
        for (let i = 0; i < elements.swiperSlides.length; i++) {
            const bullet = document.createElement('span');
            bullet.className = 'swiper-pagination-bullet';
            if (i === gameData.currentSlide) {
                bullet.classList.add('swiper-pagination-bullet-active');
            }

            // 为指示器添加点击事件
            bullet.addEventListener('click', () => {
                slideTo(i);
            });

            elements.paginationBullets.appendChild(bullet);
        }
    }

    // 为滑块添加触摸事件
    if (elements.swiperWrapper) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        elements.swiperWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        elements.swiperWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            currentX = e.touches[0].clientX;
            const diff = currentX - startX;

            // 防止在边缘滑动时超出范围
            if ((gameData.currentSlide === 0 && diff > 0) ||
                (gameData.currentSlide === elements.swiperSlides.length - 1 && diff < 0)) {
                return;
            }

            // 跟随手指移动
            elements.swiperWrapper.style.transform = `translateX(${-gameData.currentSlide * 100 + diff / 5}%)`;
        });

        elements.swiperWrapper.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;

            // 判断是否需要切换页面
            if (Math.abs(diff) > 50) {
                if (diff > 0 && gameData.currentSlide > 0) {
                    // 向右滑，显示上一个
                    slideTo(gameData.currentSlide - 1);
                } else if (diff < 0 && gameData.currentSlide < elements.swiperSlides.length - 1) {
                    // 向左滑，显示下一个
                    slideTo(gameData.currentSlide + 1);
                } else {
                    // 回到原位
                    slideTo(gameData.currentSlide);
                }
            } else {
                // 滑动距离不够，回到原位
                slideTo(gameData.currentSlide);
            }
        });
    }
}

// 滑动到指定页面
function slideTo(index) {
    if (elements.swiperWrapper && index >= 0 && index < elements.swiperSlides.length) {
        gameData.currentSlide = index;
        elements.swiperWrapper.style.transform = `translateX(-${index * 100}%)`;

        // 更新分页指示器
        const bullets = elements.paginationBullets.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, i) => {
            if (i === index) {
                bullet.classList.add('swiper-pagination-bullet-active');
            } else {
                bullet.classList.remove('swiper-pagination-bullet-active');
            }
        });
    }
}

// 更新茶饮温度
function updateTeaTemperatures() {
    const currentTime = Date.now();

    Object.keys(gameData.teaTemps).forEach(teaId => {
        if (gameData.teaTemps[teaId] === 'hot') {
            const madeTime = gameData.teaMakeTimes[teaId];
            const elapsed = currentTime - madeTime;

            // 如果已经过了冷却时间
            if (elapsed >= gameData.teaCoolingDuration) {
                gameData.teaTemps[teaId] = 'cold';
                addMessage(`一杯${gameData.madeTeas.find(t => t.id.toString() === teaId).name}已经冷却成凉茶了。`);
                updateTeaDisplay();
            }
        }
    });
}

// 更新茶饮显示
function updateTeaDisplay() {
    if (elements.teaDisplay) {
        elements.teaDisplay.innerHTML = '';

        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .temp-icon {
                margin-right: 5px;
                font-size: 16px;
            }
            .tea-item {
                cursor: pointer;
                user-select: none;
                position: relative;
            }
        `;
        document.head.appendChild(style);

        if (gameData.madeTeas.length === 0) {
            const noTeaDiv = document.createElement('div');
            noTeaDiv.className = 'no-tea';
            noTeaDiv.textContent = '还没有制作好的茶饮';
            elements.teaDisplay.appendChild(noTeaDiv);
        } else {
            gameData.madeTeas.forEach(tea => {
                const teaItem = document.createElement('div');
                teaItem.className = 'tea-item';
                teaItem.setAttribute('data-tea-id', tea.id);

                // 添加双击事件监听器，双击倒掉茶饮
                let clickCount = 0;
                let clickTimer = null;

                teaItem.addEventListener('click', (e) => {
                    // 如果点击的是按钮，不处理双击
                    if (e.target.classList.contains('tea-action-btn')) {
                        return;
                    }

                    clickCount++;

                    if (clickCount === 1) {
                        clickTimer = setTimeout(() => {
                            clickCount = 0;
                        }, 300); // 300毫秒内的连续点击视为双击
                    } else if (clickCount === 2) {
                        clearTimeout(clickTimer);
                        clickCount = 0;

                        // 双击确认倒掉茶饮
                        if (confirm(`确定要倒掉这杯${tea.recipe || tea.name}吗？`)) {
                            discardTea(tea.id);
                        }
                    }
                });

                const teaName = document.createElement('div');
                teaName.className = 'tea-name';
                // 直接显示茶名，不添加图标
                teaName.textContent = tea.recipe || tea.name; // 确保显示茶饮名称

                const teaTemp = document.createElement('div');
                teaTemp.className = 'tea-temp';
                // 添加冷热图标
                if (gameData.teaTemps[tea.id] === 'hot') {
                    teaTemp.classList.add('hot-tea');
                    teaTemp.innerHTML = `<span class="temp-icon">🍵</span>热`;
                } else {
                    teaTemp.classList.add('cold-tea');
                    teaTemp.innerHTML = `<span class="temp-icon">🥛</span>凉`;
                }

                const toppingsSpan = document.createElement('div');
                toppingsSpan.className = 'tea-toppings';
                toppingsSpan.style.marginBottom = '30px'; // 增加底部边距，避免和按钮重叠

                // 为小料添加图标
                if (tea.toppings && tea.toppings.length > 0) {
                    let toppingsText = '';
                    let fullToppings = ''; // 完整的加料信息，用于鼠标悬停显示

                    tea.toppings.forEach((topping, index) => {
                        let toppingIcon = '';

                        // 根据小料类型选择图标
                        if (topping === '红糖') {
                            toppingIcon = '🧂';
                        } else if (topping === '薄荷叶') {
                            toppingIcon = '🍃';
                        } else if (topping === '姜丝') {
                            toppingIcon = '🥭';
                        } else if (topping === '柚子丝') {
                            toppingIcon = '🍊';
                        } else if (topping === '银耳丝') {
                            toppingIcon = '🍄';
                        } else if (topping === '柠檬片') {
                            toppingIcon = '🍋';
                        } else if (topping === '蜂蜜') {
                            toppingIcon = '🍯';
                        }

                        toppingsText += `${toppingIcon}${topping}`;
                        fullToppings += `${toppingIcon}${topping}`;

                        // 如果不是最后一个小料，添加分隔符
                        if (index < tea.toppings.length - 1) {
                            toppingsText += '、';
                            fullToppings += '、';
                        }
                    });

                    toppingsSpan.innerHTML = toppingsText;
                    toppingsSpan.title = `加料: ${fullToppings}`; // 添加鼠标悬停时显示的提示
                } else {
                    toppingsSpan.textContent = '';
                    toppingsSpan.title = ''; // 清除title
                }

                const teaActions = document.createElement('div');
                teaActions.className = 'tea-actions';

                const addToppingBtn = document.createElement('button');
                addToppingBtn.className = 'tea-action-btn add-topping';
                addToppingBtn.textContent = '加料';
                addToppingBtn.addEventListener('click', () => showAddToppingPanel(tea.id));

                const serveBtn = document.createElement('button');
                serveBtn.className = 'tea-action-btn serve-tea';
                serveBtn.textContent = '提供';
                serveBtn.addEventListener('click', () => serveTea(tea.id));

                teaActions.appendChild(addToppingBtn);
                teaActions.appendChild(serveBtn);

                teaItem.appendChild(teaName);
                teaItem.appendChild(teaTemp);
                teaItem.appendChild(toppingsSpan);
                teaItem.appendChild(teaActions);

                elements.teaDisplay.appendChild(teaItem);
            });
        }
    }
}

// 丢弃茶饮
function discardTea(teaId) {
    const teaIndex = gameData.madeTeas.findIndex(t => t.id === teaId);

    if (teaIndex !== -1) {
        const teaName = gameData.madeTeas[teaIndex].name;
        gameData.madeTeas.splice(teaIndex, 1);
        delete gameData.teaTemps[teaId];
        delete gameData.teaMakeTimes[teaId];

        addMessage(`你倒掉了一杯${teaName}。`);
        updateTeaDisplay();
    }
}

// 向顾客提供茶饮
function serveTea(teaId) {
    const tea = gameData.madeTeas.find(t => t.id === teaId);
    if (!tea) return;

    const customer = gameData.customer;
    if (!customer.active) {
        addTeaInfoMessage("现在没有顾客");
        return;
    }

    if (tea.name !== customer.teaChoice) {
        addTeaInfoMessage("这不是顾客想要的茶饮");
        return;
    }

    // 检查小料是否匹配
    const toppingsMatch = customer.toppingChoices.length === tea.toppings.length &&
        customer.toppingChoices.every(t => tea.toppings.includes(t));

    if (!toppingsMatch) {
        addTeaInfoMessage("小料不符合顾客要求");
        return;
    }

    // 计算收益
    let earnings = 15; // 基础茶价15铜币

    // 计算小料收益
    if (tea.toppings && tea.toppings.length > 0) {
        earnings += tea.toppings.length * 2; // 每个小料2铜币
    }

    // 根据温度偏好计算额外收益
    const temp = gameData.teaTemps[tea.id];
    if ((gameData.currentSeason === "夏天" && temp === "cold") ||
        (gameData.currentSeason === "冬天" && temp === "hot")) {
        earnings += 3; // 季节温度匹配加3铜币
    }

    // 添加收益
    gameData.coins += earnings;

    // 构建提供消息
    let serveMessage = `提供了一杯${tea.name}`;
    if (tea.toppings && tea.toppings.length > 0) {
        serveMessage += `（加料：${tea.toppings.join('、')}）`;
    }
    serveMessage += `，获得${earnings}铜币`;

    // 增加已服务顾客计数（非测试模式）
    if (!customer.isTestCustomer) {
        gameData.servedCustomers++;
        debug(`已服务顾客数量: ${gameData.servedCustomers}`);

        // 立即保存游戏数据，确保不丢失进度
        saveGame();

        // 检查是否解锁新配方
        checkNewRecipeUnlock();
    }

    // 如果是VIP顾客，添加收藏卡
    if (customer.isVIP) {
        if (!gameData.collectedCards[customer.name]) {
            gameData.collectedCards[customer.name] = {
                count: 0,
                lastVisit: new Date().toLocaleDateString()
            };
        }
        gameData.collectedCards[customer.name].count++;
        gameData.collectedCards[customer.name].lastVisit = new Date().toLocaleDateString();
        serveMessage += `\n获得了${customer.name}的收藏卡！`;

        // 检查是否解锁新配方（仅在非测试模式下）
        const customerName = customer.name;
        customer.served = true;

        // 先重置顾客，避免重复检查
        setTimeout(() => {
            resetCustomer();
            // 检查解锁条件，但在测试模式下不检查
            if (!customer.isTestCustomer) {
                checkRecipeUnlock(customerName);
            }
        }, 2000);
    } else {
        // 重置顾客
        customer.served = true;
        setTimeout(() => {
            resetCustomer();
        }, 2000);
    }

    addTeaInfoMessage(serveMessage);

    // 移除茶饮
    const teaIndex = gameData.madeTeas.findIndex(t => t.id === teaId);
    if (teaIndex !== -1) {
        gameData.madeTeas.splice(teaIndex, 1);
    }

    updateAllDisplays();
}

// 更新铜板显示
function updateCoinsDisplay() {
    if (elements.coinsCount) {
        elements.coinsCount.textContent = gameData.coins;
    }
    if (elements.shopCoinsCount) {
        elements.shopCoinsCount.textContent = gameData.coins;
    }
}

// 更新小料区域显示
function updateToppingsDisplay() {
    if (elements.toppingsDisplay) {
        elements.toppingsDisplay.innerHTML = '';

        // 小料图标映射
        const toppingIcons = {
            "红糖": "🍯",
            "薄荷叶": "🌿",
            "姜丝": "🫚",
            "柚子丝": "🍋",
            "银耳丝": "🍄",
            "柠檬片": "🍋",
            "蜂蜜": "🍯",
            // 新增小料
            "冰糖": "❄️",
            "乌龙茶包": "🍃",
            "干桂花": "🌼",
            "小圆子": "⚪",
            "酒酿": "🍶",
            "水蜜桃果肉": "🍑",
            "黄芪片": "🌰"
        };

        // 显示所有有库存的小料
        Object.keys(gameData.toppings).forEach(topping => {
            if (gameData.toppings[topping] !== undefined) {
                const toppingItem = document.createElement('div');
                toppingItem.className = 'topping-item';

                // 添加图标
                const iconSpan = document.createElement('span');
                iconSpan.className = 'topping-icon';
                iconSpan.textContent = toppingIcons[topping] || "🥄";

                const toppingName = document.createElement('span');
                toppingName.className = 'topping-name';
                toppingName.textContent = topping;

                const toppingCount = document.createElement('span');
                toppingCount.className = 'topping-count';
                toppingCount.textContent = `${gameData.toppings[topping]}`;

                toppingItem.appendChild(iconSpan);
                toppingItem.appendChild(toppingName);
                toppingItem.appendChild(toppingCount);

                elements.toppingsDisplay.appendChild(toppingItem);
            }
        });
    }
}

// 更新炉灶显示
function updateStoveDisplay() {
    gameData.stoves.forEach((stove, index) => {
        const stoveElement = elements.stoves[index];
        if (stoveElement) {
            const stoveState = stoveElement.querySelector('.stove-state');

            if (stove.state === 'empty') {
                stoveState.textContent = '点击放水';
            } else if (stove.state === 'water') {
                stoveState.textContent = '水已就绪，点击添加材料';
            } else if (stove.state === 'ready') {
                stoveState.textContent = `材料已就绪 (${stove.recipe})，点击开火`;
            } else if (stove.state === 'boiling') {
                const remaining = Math.ceil((stove.startTime + stove.boilDuration - Date.now()) / 1000);
                stoveState.textContent = `正在煮沸 ${stove.recipe} (${remaining}秒)`;
            } else if (stove.state === 'done') {
                stoveState.textContent = '茶饮已完成，点击重置';
            }
        }
    });
}

// 更新加工台显示
function updateProcessingBoardDisplay() {
    if (elements.processingBoard) {
        const processingState = elements.processingBoard.querySelector('.processing-state');

        if (gameData.processingBoard.state === 'idle') {
            processingState.textContent = '点击加工材料';
        } else if (gameData.processingBoard.state === 'processing') {
            const remainingTime = Math.max(0, Math.ceil((gameData.processingBoard.startTime + gameData.processingBoard.duration - Date.now()) / 1000));
            processingState.textContent = `正在加工 ${gameData.processingBoard.recipe} (${remainingTime}秒)`;

            // 如果剩余时间小于等于0，自动完成加工
            if (remainingTime <= 0) {
                gameData.processingBoard.state = 'done';
                addMessage(`${gameData.processingBoard.recipe}加工完成了。`);
                processingState.textContent = `${gameData.processingBoard.recipe} 加工完成，点击收取`;
            }
        } else if (gameData.processingBoard.state === 'done') {
            processingState.textContent = `${gameData.processingBoard.recipe} 加工完成，点击收取`;
        }
    }

    // 更新案板配方按钮，显示原料数量
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    recipeButtons.forEach(btn => {
        const recipe = btn.getAttribute('data-recipe');
        const recipeInfo = gameData.processingRecipes[recipe];

        if (recipeInfo && recipeInfo.ingredients && recipeInfo.ingredients.length > 0) {
            // 获取加工这个小料需要的原料
            const ingredient = recipeInfo.ingredients[0]; // 通常每个配方只需要一种原料
            const ingredientCount = gameData.inventory[ingredient] || 0;
            const currentToppingCount = gameData.toppings[recipe] || 0;

            // 显示格式：原料名(数量)
            btn.textContent = `${ingredient}(${ingredientCount})`;

            // 添加小工具提示，鼠标悬停时显示更多信息
            btn.title = `用${ingredient}制作${recipe}。原料:${ingredientCount}个，已有小料:${currentToppingCount}份`;

            // 根据原料数量显示不同的样式
            // 先清除所有状态类
            btn.classList.remove('no-material', 'low-material', 'enough-material');

            if (ingredientCount === 0) {
                btn.classList.add('no-material');
            } else if (ingredientCount <= 2) {
                btn.classList.add('low-material');
            } else {
                btn.classList.add('enough-material');
            }
        }
    });
}

// 更新篮子显示
function updateBasketDisplay() {
    if (!elements.basketContent) {
        debug('找不到小篮子元素');
        return;
    }

    debug('更新小篮子显示');
    elements.basketContent.innerHTML = '';

    let hasItems = false;

    // 创建两列容器
    const leftColumn = document.createElement('div');
    leftColumn.className = 'basket-column';
    const rightColumn = document.createElement('div');
    rightColumn.className = 'basket-column';

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .basket-content {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        .basket-column {
            flex: 1;
            min-width: 45%;
        }
        .basket-item {
            margin-bottom: 5px;
            width: 100%;
        }
        .item-icon {
            margin-right: 5px;
            font-size: 16px;
        }
    `;
    document.head.appendChild(style);

    let itemCount = 0;

    // 显示种子
    Object.keys(gameData.seeds).forEach(seedName => {
        const count = gameData.seeds[seedName];
        if (count > 0) {
            hasItems = true;
            const seedItem = document.createElement('div');
            seedItem.className = 'basket-item seed-item';
            // 为种子添加🌱图标
            seedItem.innerHTML = `<span class="item-icon">🌱</span><span class="item-name">${seedName}</span>: <span class="item-count">${count}</span>个种子`;

            // 添加双击事件，用于快速种植
            seedItem.addEventListener('dblclick', () => {
                debug('双击种子', seedName);
                autoPlantSeed(seedName);
            });

            // 交替添加到左右列
            if (itemCount % 2 === 0) {
                leftColumn.appendChild(seedItem);
            } else {
                rightColumn.appendChild(seedItem);
            }
            itemCount++;
        }
    });

    // 显示收获物和其他物品
    Object.keys(gameData.inventory).forEach(itemName => {
        const count = gameData.inventory[itemName];
        if (count > 0) {
            hasItems = true;
            const itemElement = document.createElement('div');
            itemElement.className = 'basket-item inventory-item';

            // 选择合适的图标
            let itemIcon = '🌿'; // 默认图标

            // 根据物品类型选择图标
            if (itemName === '红糖') {
                itemIcon = '🧂';
            } else if (itemName === '薄荷叶') {
                itemIcon = '🍃';
            } else if (itemName === '姜丝') {
                itemIcon = '🥭';
            } else if (itemName === '柚子丝') {
                itemIcon = '🍊';
            } else if (itemName === '银耳丝') {
                itemIcon = '🍄';
            } else if (itemName === '柠檬片') {
                itemIcon = '🍋';
            } else if (itemName === '蜂蜜') {
                itemIcon = '🍯';
            } else if (itemName === '五味子') {
                itemIcon = '🍇';
            } else if (itemName === '乌梅') {
                itemIcon = '🍑';
            } else if (itemName === '山楂') {
                itemIcon = '🍒';
            } else if (itemName === '菊花') {
                itemIcon = '🌼';
            } else if (itemName === '薄荷') {
                itemIcon = '🍀';
            } else if (itemName === '陈皮') {
                itemIcon = '🍊';
            } else if (itemName === '生姜') {
                itemIcon = '🥭';
            } else if (itemName === '大麦') {
                itemIcon = '🌾';
            } else if (itemName === '茉莉花') {
                itemIcon = '🌺';
            } else if (itemName === '玫瑰花' || itemName === '玫瑰') {
                itemIcon = '🌹';
            } else if (itemName === '甘蔗') {
                itemIcon = '🎋';
            } else if (itemName === '金银花') {
                itemIcon = '🌼';
            } else if (itemName === '决明子') {
                itemIcon = '🌰';
            } else if (itemName === '枸杞') {
                itemIcon = '🔴';
            } else if (itemName === '桂圆') {
                itemIcon = '🍐';
            } else if (itemName === '红枣') {
                itemIcon = '🍎';
            } else if (itemName === '洛神花') {
                itemIcon = '🌺';
            } else if (itemName === '冬瓜') {
                itemIcon = '🥒';
            } else if (itemName === '荷叶') {
                itemIcon = '☘️';
            } else if (itemName === '薏米') {
                itemIcon = '🌾';
            } else if (itemName === '雪花梨') {
                itemIcon = '🍐';
            } else if (itemName === '话梅') {
                itemIcon = '🍈';
            } else if (itemName === '柚子') {
                itemIcon = '🍊';
            } else if (itemName === '柠檬') {
                itemIcon = '🍋';
            }

            itemElement.innerHTML = `<span class="item-icon">${itemIcon}</span><span class="item-name">${itemName}</span>: <span class="item-count">${count}</span>个`;

            // 添加点击事件，用于移动到炉灶
            itemElement.addEventListener('click', () => {
                selectMaterialForUse(itemName);
            });

            // 交替添加到左右列
            if (itemCount % 2 === 0) {
                leftColumn.appendChild(itemElement);
            } else {
                rightColumn.appendChild(itemElement);
            }
            itemCount++;
        }
    });

    // 如果没有物品，显示空篮子信息
    if (!hasItems) {
        const emptyBasket = document.createElement('div');
        emptyBasket.className = 'basket-item';
        emptyBasket.textContent = '篮子是空的';
        leftColumn.appendChild(emptyBasket);
    }

    // 添加列到容器
    elements.basketContent.appendChild(leftColumn);
    elements.basketContent.appendChild(rightColumn);

    debug('小篮子更新完成', {seeds: gameData.seeds, inventory: gameData.inventory});
}

// 自动种植种子到空地
function autoPlantSeed(seedName) {
    // 检查是否有种子
    if (!gameData.seeds[seedName] || gameData.seeds[seedName] <= 0) {
        addMessage(`你没有${seedName}种子。`, true);
        return;
    }

    // 查找第一个空地
    const emptyPlot = gameData.plots.find(plot => plot.state === 'empty');
    if (!emptyPlot) {
        addMessage('没有空地可以种植。', true);
        return;
    }

    // 种植
    emptyPlot.state = 'growing';
    emptyPlot.plantType = seedName;
    emptyPlot.growthStage = 0;
    emptyPlot.stageStartTime = Date.now();
    emptyPlot.growthTime = gameData.stageDuration;

    // 消耗种子
    gameData.seeds[seedName]--;

    addMessage(`在地块${emptyPlot.id + 1}种植了${seedName}。`);

    // 更新显示
    updatePlotsDisplay();
    updateBasketDisplay();
}

// 将购买的物品添加到库存中，并更新显示
function addPurchasedItemsToInventory(cart) {
    debug('添加购买的物品到库存', cart);
    cart.forEach(item => {
        const quantity = item.quantity || 1;
        // 红糖和薄荷叶直接加到小料区
        if (item.type === 'item' && ["红糖", "薄荷叶"].includes(item.name)) {
            gameData.toppings[item.name] = (gameData.toppings[item.name] || 0) + quantity;
            updateToppingsDisplay();
        } else if (item.type === 'item') {
            gameData.inventory[item.name] = (gameData.inventory[item.name] || 0) + quantity;
        } else if (item.type === 'seed') {
            gameData.seeds[item.name] = (gameData.seeds[item.name] || 0) + quantity;
        } else {
            gameData.inventory[item.name] = (gameData.inventory[item.name] || 0) + quantity;
        }
    });
    updateBasketDisplay();
}

// 修改结账函数，确保正确添加物品到库存
function checkout() {
    debug('点击结账按钮', cart);
    if (cart.length === 0) {
        addMessage('购物车是空的，无法结账。', true);
        return;
    }

    // 清除无效项
    cart = cart.filter(item => item && item.name && !isNaN(item.price));

    // 计算总价
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    debug('结账总价', total);

    // 检查是否有足够的铜板
    const currentCoins = parseInt(document.getElementById('coins-count').textContent);
    if (currentCoins < total) {
        addMessage(`铜板不足！需要${total}个铜板，但你只有${gameData.coins}个。`, true);
        return;
    }

    // 扣除铜板
    const newCoins = currentCoins - total;
    document.getElementById('coins-count').textContent = newCoins;
    document.getElementById('shop-coins-count').textContent = newCoins;

    // 更新游戏数据中的铜板
    gameData.coins = newCoins;

    // 将购买的物品添加到小篮子
    addPurchasedItemsToInventory(cart);

    // 清空购物车
    cart = [];
    updateCartPreview();

    // 提示购买成功（使用自定义通知而不是alert）
    const purchaseNotification = document.createElement('div');
    purchaseNotification.className = 'purchase-notification';
    purchaseNotification.innerHTML = '<i class="fa fa-check-circle"></i> 购买成功！物品已放入小篮子。';
    document.body.appendChild(purchaseNotification);

    // 2秒后移除提示
    setTimeout(() => {
        purchaseNotification.classList.add('fadeout');
        setTimeout(() => {
            if (document.body.contains(purchaseNotification)) {
                document.body.removeChild(purchaseNotification);
            }
        }, 500);
    }, 2000);

    // 关闭商店面板
    document.getElementById('seed-panel').style.display = 'none';
}

// 初始化农田和篮子
function initFarmAndBasket() {
    debug('初始化农田和篮子');

    // 初始化小篮子样式
    const basketItems = document.querySelectorAll('.basket-item');
    basketItems.forEach(item => {
        // 为种子添加样式
        if (item.classList.contains('seed-item')) {
            item.style.backgroundColor = '#f0f0f0'; // 浅灰色替代浅绿色
        }
        // 为物品添加样式
        else if (item.classList.contains('inventory-item')) {
            item.style.backgroundColor = '#f0f0f0'; // 浅灰色替代浅蓝色
        }
    });

    // 更新小篮子显示
    updateBasketDisplay();

    // 初始化小篮子选择系统
    initBasketSelection();
}

// 初始化小篮子选择系统
function initBasketSelection() {
    // 为可点击的田地物品添加事件监听
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('clickable-item')) {
            const plotId = parseInt(e.target.getAttribute('data-plot-id'));
            showBasketSelection(plotId);
        }
    });

    // 关闭按钮事件
    if (elements.closeBasketSelectBtn) {
        elements.closeBasketSelectBtn.addEventListener('click', hideBasketSelection);
    }

    // 去购买按钮事件
    const goToShopBtn = document.getElementById('go-to-shop-btn');
    if (goToShopBtn) {
        goToShopBtn.addEventListener('click', () => {
            // 显示购物车弹窗而不是直接跳转到商店
            showCartPopup();
        });
    }

    // 确认种植按钮事件
    if (elements.confirmPlantBtn) {
        elements.confirmPlantBtn.addEventListener('click', confirmPlanting);
    }
}

// 显示小篮子选择窗口
function showBasketSelection(plotId) {
    const plot = gameData.plots[plotId];
    if (!plot) return;

    // 只有空地状态才能显示选择窗口
    if (plot.state !== 'empty') {
        addMessage('这块田地已经种植了作物！');
        return;
    }

    // 设置当前选择的田地
    gameData.selectedPlotForPlanting = plotId;

    // 更新田地信息
    if (elements.selectedPlotName) {
        elements.selectedPlotName.textContent = `${plotId + 1}号田地`;
    }

    // 生成种子选择界面
    populateSeedSelection();

    // 显示面板
    if (elements.basketSelectPanel) {
        elements.basketSelectPanel.style.display = 'block';
    }
}

// 隐藏小篮子选择窗口
function hideBasketSelection() {
    if (elements.basketSelectPanel) {
        elements.basketSelectPanel.style.display = 'none';
    }
    gameData.selectedPlotForPlanting = null;
    gameData.selectedSeedForPlanting = null;

    // 重置确认按钮状态
    if (elements.confirmPlantBtn) {
        elements.confirmPlantBtn.disabled = true;
    }
}

// 生成种子选择界面
function populateSeedSelection() {
    // 清空现有内容
    if (elements.availableSeedsGrid) {
        elements.availableSeedsGrid.innerHTML = '';
    }
    if (elements.unavailableSeedsGrid) {
        elements.unavailableSeedsGrid.innerHTML = '';
    }

    // 所有可种植的种子
    const allSeeds = [
        "五味子", "乌梅", "山楂", "陈皮", "甘草", "桂花", "大麦",
        "菊花", "金银花", "决明子", "枸杞", "生姜", "桂圆", "红枣",
        "薄荷", "玫瑰花", "洛神花", "冬瓜", "荷叶", "薏米", "雪花梨",
        "话梅", "甘蔗", "柚子", "柠檬",
        // 新增种子
        "桑叶", "杭白菊", "水蜜桃", "黄芪", "白茅根", "马蹄", "糯米", "米"
    ];

    let hasUnavailableSeeds = false;

    allSeeds.forEach(seedName => {
        const hasStock = gameData.seeds[seedName] && gameData.seeds[seedName] > 0;
        const button = document.createElement('button');
        button.className = 'seed-btn';
        button.textContent = seedName;
        button.setAttribute('data-seed', seedName);

        if (hasStock) {
            // 有库存的种子
            button.addEventListener('click', () => selectSeedForPlanting(seedName));
            if (elements.availableSeedsGrid) {
                elements.availableSeedsGrid.appendChild(button);
            }
        } else {
            // 没有库存的种子
            hasUnavailableSeeds = true;
            button.addEventListener('click', () => buySeedDirectly(seedName));
            if (elements.unavailableSeedsGrid) {
                elements.unavailableSeedsGrid.appendChild(button);
            }
        }
    });

    // 显示或隐藏"去购买"按钮
    const goToShopBtn = document.getElementById('go-to-shop-btn');
    if (goToShopBtn) {
        // 检查是否选中了缺货种子且购物车有物品
        const selectedSeedIsUnavailable = gameData.selectedSeedForPlanting && 
            (!gameData.seeds[gameData.selectedSeedForPlanting] || gameData.seeds[gameData.selectedSeedForPlanting] <= 0);
        
        if (selectedSeedIsUnavailable && gameData.cart && gameData.cart.length > 0) {
            goToShopBtn.style.display = 'block';
        } else {
            goToShopBtn.style.display = 'none';
        }
    }
    
    // 更新购物车显示
    updateBasketCartDisplay();
}

// 更新种子选择状态的公共函数
function updateSeedSelectionState(seedName) {
    // 清除所有选中状态
    document.querySelectorAll('.available-seeds .seed-btn, .unavailable-seeds .seed-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // 设置新的选中状态
    const selectedBtn = document.querySelector(`.seed-btn[data-seed="${seedName}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }

    // 启用或禁用确认按钮
    if (elements.confirmPlantBtn) {
        const hasStock = gameData.seeds[seedName] && gameData.seeds[seedName] > 0;
        elements.confirmPlantBtn.disabled = !hasStock;
    }
}

// 更新种子选择状态和按钮显示
function updateSeedSelectionStateAndButtons(seedName) {
    // 更新选中状态
    updateSeedSelectionState(seedName);
    
    // 显示或隐藏"去购买"按钮
    const goToShopBtn = document.getElementById('go-to-shop-btn');
    if (goToShopBtn) {
        // 检查是否选中了缺货种子且购物车有物品
        const selectedSeedIsUnavailable = gameData.selectedSeedForPlanting && 
            (!gameData.seeds[gameData.selectedSeedForPlanting] || gameData.seeds[gameData.selectedSeedForPlanting] <= 0);
        
        if (selectedSeedIsUnavailable && gameData.cart && gameData.cart.length > 0) {
            goToShopBtn.style.display = 'block';
        } else {
            goToShopBtn.style.display = 'none';
        }
    }
    
    // 更新购物车显示
    updateBasketCartDisplay();
}

// 选择种子进行种植
function selectSeedForPlanting(seedName) {
    gameData.selectedSeedForPlanting = seedName;
    updateSeedSelectionState(seedName);
}

// 直接购买种子 - 改为添加到购物车
function buySeedDirectly(seedName) {
    // 设置选中状态
    gameData.selectedSeedForPlanting = seedName;
    
    // 根据种子类型确定价格
    const seedPrices = {
        "桑叶": 2, "杭白菊": 2, "水蜜桃": 3, "黄芪": 3,
        "白茅根": 2, "马蹄": 2, "糯米": 2, "米": 1
    };
    const price = seedPrices[seedName] || 1; // 默认价格1铜板

    // 直接添加到购物车
    addToCart(seedName, 'seed', price);
    
    addMessage(`已将 ${seedName} 种子加入购物车`);
    
    // 更新UI状态 - 这会处理选中状态和按钮显示
    updateSeedSelectionStateAndButtons(seedName);
    
    // 更新种植选择弹窗中的购物车显示
    updateBasketCartDisplay();
}

// 更新种植选择弹窗中的购物车显示
function updateBasketCartDisplay() {
    const cartSection = document.getElementById('basket-cart-section');
    const cartItems = document.getElementById('basket-cart-items');
    const cartTotal = document.getElementById('basket-cart-total');
    
    if (!cartSection || !cartItems || !cartTotal) return;

    // 如果购物车为空，隐藏整个区域
    if (!gameData.cart || gameData.cart.length === 0) {
        cartSection.style.display = 'none';
        return;
    }
    
    // 显示购物车区域
    cartSection.style.display = 'block';
    
    // 清空现有内容
    cartItems.innerHTML = '';
    
    if (gameData.cart.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'basket-cart-empty';
        emptyDiv.textContent = '购物车是空的';
        cartItems.appendChild(emptyDiv);
    } else {
        // 显示购物车物品
        gameData.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'basket-cart-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'basket-cart-item-name';
            nameSpan.textContent = item.name;
            
            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'basket-cart-item-quantity';
            quantitySpan.textContent = `x${item.quantity}`;
            
            const priceSpan = document.createElement('span');
            priceSpan.className = 'basket-cart-item-price';
            priceSpan.textContent = `${item.price * item.quantity}铜板`;
            
            itemDiv.appendChild(nameSpan);
            itemDiv.appendChild(quantitySpan);
            itemDiv.appendChild(priceSpan);
            
            cartItems.appendChild(itemDiv);
        });
    }
    
    // 更新总价
    const total = gameData.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `总计: ${total} 铜板`;
}

// 确认种植
function confirmPlanting() {
    if (gameData.selectedPlotForPlanting === null || !gameData.selectedSeedForPlanting) {
        return;
    }

    const plotId = gameData.selectedPlotForPlanting;
    const seedName = gameData.selectedSeedForPlanting;

    // 检查是否还有种子
    if (!gameData.seeds[seedName] || gameData.seeds[seedName] <= 0) {
        addMessage('种子不足！', true);
        return;
    }

    // 种植种子
    plantSeed(plotId, seedName);

    // 关闭窗口
    hideBasketSelection();
}

// 初始化事件监听器
function initEventListeners() {
    // 菜单按钮
    if (elements.menuBtn && elements.menuPanel) {
        elements.menuBtn.addEventListener('click', () => {
            elements.menuPanel.style.display = elements.menuPanel.style.display === 'block' ? 'none' : 'block';
        });
    }

    // 关闭菜单按钮
    if (elements.closeMenu && elements.menuPanel) {
        elements.closeMenu.addEventListener('click', () => {
            elements.menuPanel.style.display = 'none';
        });
    }

    // 保存和加载功能已集成到存档管理中

    // 配方按钮
    if (elements.recipeBtn && elements.recipePanel) {
        elements.recipeBtn.addEventListener('click', () => {
            elements.recipePanel.style.display = 'flex';
            // 更新配方解锁状态
            setTimeout(updateRecipeUnlockStatus, 0);
        });
    }

    // 小篮子区域配方按钮
    if (elements.basketRecipeBtn && elements.recipePanel) {
        elements.basketRecipeBtn.addEventListener('click', () => {
            elements.recipePanel.style.display = 'flex';
            // 更新配方解锁状态
            setTimeout(updateRecipeUnlockStatus, 0);
        });
    }

    // 关闭配方按钮
    if (elements.closeRecipeBtn && elements.recipePanel) {
        elements.closeRecipeBtn.addEventListener('click', () => {
            elements.recipePanel.style.display = 'none';
        });
    }

    // 关闭商店按钮
    if (elements.closeShopBtn) {
        elements.closeShopBtn.addEventListener('click', () => {
            hideShopModal();
        });
    }

    // 农田操作按钮和新的商店按钮
    if (elements.farmBuySeedBtn) {
        elements.farmBuySeedBtn.addEventListener('click', () => {
            showShopModal();
        });
    }

    if (elements.buySeedFarmBtn) {
        elements.buySeedFarmBtn.addEventListener('click', () => {
            showShopModal();
        });
    }

    // 顶部状态栏的商店按钮 - 打开商店弹窗
    const statusShopBtn = document.getElementById('buy-seed-status');
    if (statusShopBtn) {
        statusShopBtn.addEventListener('click', () => {
            showShopModal();
        });
    }

    // 顶部状态栏的篮子按钮
    const basketBtn = document.getElementById('basket-btn');
    if (basketBtn) {
        basketBtn.addEventListener('click', () => {
            showBasketView();
        });
    }

    // 篮子面板关闭按钮
    const closeBasketBtn = document.getElementById('close-basket-view');
    if (closeBasketBtn) {
        closeBasketBtn.addEventListener('click', () => {
            hideBasketView();
        });
    }

    // 去购买按钮
    const goToShopBtn = document.getElementById('go-to-shop-btn');
    if (goToShopBtn) {
        goToShopBtn.addEventListener('click', () => {
            showCartPopup();
        });
    }

    // 商店遮罩层点击关闭
    const shopOverlay = document.getElementById('shop-overlay');
    if (shopOverlay) {
        shopOverlay.addEventListener('click', () => {
            hideShopModal();
        });
    }

    // 菜单中的商店按钮已移除

    if (elements.basketBuySeedBtn) {
        elements.basketBuySeedBtn.addEventListener('click', () => {
            showShopModal();
        });
    }

    if (elements.farmWaterBtn) {
        elements.farmWaterBtn.addEventListener('click', () => {
            const selectedPlots = getSelectedPlots();
            if (selectedPlots.length === 0) {
                addMessage('请先选择要浇水的地块。', true);
                return;
            }

            selectedPlots.forEach(plotIndex => {
                waterPlot(plotIndex);
            });
        });
    }

    if (elements.farmFertilizeBtn) {
        elements.farmFertilizeBtn.addEventListener('click', () => {
            const selectedPlots = getSelectedPlots();
            if (selectedPlots.length === 0) {
                addMessage('请先选择要施肥的地块。', true);
                return;
            }

            selectedPlots.forEach(plotIndex => {
                fertilizePlot(plotIndex);
            });
        });
    }

    if (elements.farmDigOutBtn) {
        elements.farmDigOutBtn.addEventListener('click', () => {
            const selectedPlots = getSelectedPlots();
            if (selectedPlots.length === 0) {
                addMessage('请先选择要挖出的地块。', true);
                return;
            }

            selectedPlots.forEach(plotIndex => {
                digOutPlot(plotIndex);
            });
        });
    }

    // 全选地块复选框
    if (elements.selectAllPlotsCheckbox) {
        elements.selectAllPlotsCheckbox.addEventListener('change', () => {
            const checked = elements.selectAllPlotsCheckbox.checked;
            elements.plotCheckboxes.forEach(checkbox => {
                checkbox.checked = checked;
            });
        });
    }

    // 商店种子和物品按钮
    const seedBtns = document.querySelectorAll('.seed-btn');
    seedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const seedType = btn.textContent;
            const price = parseInt(btn.getAttribute('data-price'));
            addToCart(seedType, 'seed', price);
        });
    });

    const shopItemBtns = document.querySelectorAll('.shop-item-btn');
    shopItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.getAttribute('data-item');
            const price = parseInt(btn.getAttribute('data-price'));
            addToCart(item, 'item', price);
        });
    });

    // 购物车按钮
    if (elements.checkoutBtn) {
        elements.checkoutBtn.addEventListener('click', checkout);
    }

    if (elements.clearCartBtn) {
        elements.clearCartBtn.addEventListener('click', clearCart);
    }

    // 炉灶点击
    elements.stoves.forEach((stove, index) => {
        stove.addEventListener('click', () => {
            handleStoveClick(index);
        });
    });

    // 加工台点击
    if (elements.processingBoard) {
        elements.processingBoard.addEventListener('click', handleProcessingBoardClick);
    }

    // 加工配方按钮
    elements.recipeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const recipe = btn.getAttribute('data-recipe');
            processRecipe(recipe);
        });
    });

    // 服务顾客按钮
    if (elements.serveBtnTea) {
        elements.serveBtnTea.addEventListener('click', serveCustomer);
    }

    // 菜单面板中添加收藏卡按钮事件
    if (elements.collectionBtn) {
        // 移除旧的事件监听器
        const oldBtn = elements.collectionBtn.cloneNode(true);
        elements.collectionBtn.parentNode.replaceChild(oldBtn, elements.collectionBtn);
        elements.collectionBtn = oldBtn;

        elements.collectionBtn.addEventListener('click', () => {
            showCollectionCards();
            // 关闭菜单面板
            if (elements.menuPanel) {
                elements.menuPanel.style.display = 'none';
            }
        });
    }

    // 关闭集卡册面板事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-btn') && e.target.closest('.collection-panel')) {
            e.target.closest('.collection-panel').style.display = 'none';
        }
    });

    // 解锁进度按钮事件
    const unlockProgressBtn = document.getElementById('unlock-progress-button');
    if (unlockProgressBtn) {
        unlockProgressBtn.addEventListener('click', () => {
            showUnlockProgress();
            hideMenuPanel();
        });
    }

    // 关闭解锁进度面板事件
    const closeUnlockProgressBtn = document.getElementById('close-unlock-progress');
    if (closeUnlockProgressBtn) {
        closeUnlockProgressBtn.addEventListener('click', () => {
            hideUnlockProgress();
        });
    }

    // 存档管理按钮事件
    const saveManagerBtn = document.getElementById('save-manager');
    if (saveManagerBtn) {
        saveManagerBtn.addEventListener('click', () => {
            showSavePanel();
            hideMenuPanel();
        });
    }

    // 完整测试页按钮事件
    const testPageBtn = document.getElementById('test-page-button');
    if (testPageBtn) {
        testPageBtn.addEventListener('click', () => {
            window.open('test.html', '_blank');
            hideMenuPanel();
        });
    }

    // 特殊顾客解锁测试按钮事件
    const specialCustomerTestBtn = document.getElementById('special-customer-test-button');
    if (specialCustomerTestBtn) {
        specialCustomerTestBtn.addEventListener('click', () => {
            window.open('special_customer_unlock_test.html', '_blank');
            hideMenuPanel();
        });
    }

    // 购物车按钮事件
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCartPopup);
    }

    // 购物车弹出窗口事件
    const closeCartPopupBtn = document.getElementById('close-cart-popup');
    if (closeCartPopupBtn) {
        closeCartPopupBtn.addEventListener('click', hideCartPopup);
    }

    const cartPopupClearBtn = document.getElementById('cart-popup-clear');
    if (cartPopupClearBtn) {
        cartPopupClearBtn.addEventListener('click', () => {
            clearCart();
            updateCartPopup();
        });
    }

    const cartPopupCheckoutBtn = document.getElementById('cart-popup-checkout');
    if (cartPopupCheckoutBtn) {
        cartPopupCheckoutBtn.addEventListener('click', () => {
            checkout();
            hideCartPopup();
            // 结账后刷新种植选择弹窗以反映新的库存状态
            if (gameData.selectedPlotForPlanting !== null) {
                populateSeedSelection();
            }
        });
    }

    // 小篮子选择面板事件
}

// 获取所有选中的地块
function getSelectedPlots() {
    const selectedPlots = [];
    elements.plotCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const plotId = parseInt(checkbox.getAttribute('data-plot-id'));
            selectedPlots.push(plotId);
        }
    });
    return selectedPlots;
}

// 浇水
function waterPlot(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state === 'empty') {
        addMessage(`地块${plotIndex + 1}是空地，不需要浇水。`, true);
        return;
    }

    if (plot.moisture >= 100) {
        addMessage(`地块${plotIndex + 1}已经足够湿润了。`, true);
        return;
    }

    plot.moisture = Math.min(100, plot.moisture + 25);
    addMessage(`你给地块${plotIndex + 1}浇了水，湿度提高到了${plot.moisture}%。`);

    updatePlotsDisplay();
}

// 施肥
function fertilizePlot(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state === 'empty') {
        addMessage(`地块${plotIndex + 1}是空地，不需要施肥。`, true);
        return;
    }

    if (plot.fertility >= 100) {
        addMessage(`地块${plotIndex + 1}已经足够肥沃了。`, true);
        return;
    }

    if (gameData.coins < 2) {
        addMessage(`施肥需要2个铜板，你只有${gameData.coins}个。`, true);
        return;
    }

    gameData.coins -= 2;
    plot.fertility = Math.min(100, plot.fertility + 20);

    addMessage(`你给地块${plotIndex + 1}施了肥，肥沃度提高到了${plot.fertility}%。花费了2个铜板。`);

    updatePlotsDisplay();
    updateCoinsDisplay();
}

// 挖出植物
function digOutPlot(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state === 'empty') {
        addMessage(`地块${plotIndex + 1}已经是空地了。`, true);
        return;
    }

    if (plot.state === 'ready') {
        // 如果植物已经成熟，收获
        harvestPlant(plotIndex);
    } else {
        // 否则直接挖出
        const oldPlantType = plot.plantType;

        plot.state = 'empty';
        plot.plantType = null;
        plot.growthStage = 0;

        addMessage(`你挖出了地块${plotIndex + 1}的${oldPlantType}。`);
        updatePlotsDisplay();
    }
}

// 收获植物
function harvestPlant(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state !== 'ready') {
        addMessage(`地块${plotIndex + 1}的植物还没有成熟，无法收获。`, true);
        return;
    }

    const yieldType = plot.plantType;
    // 一次收获3个成品
    gameData.inventory[yieldType] = (gameData.inventory[yieldType] || 0) + 3;

    addMessage(`你收获了三个${yieldType}，放进了小篮子里。`);
    addTeaInfoMessage(`收获了3个${yieldType}！`);

    // 重置地块
    plot.state = 'empty';
    plot.plantType = null;
    plot.growthStage = 0;

    updatePlotsDisplay();
    updateBasketDisplay();
}

// 种植
function plantSeed(plotIndex, seedType) {
    const plot = gameData.plots[plotIndex];

    if (plot.state !== 'empty') {
        addMessage(`地块${plotIndex + 1}已经种植了其他植物。`, true);
        return;
    }

    if (!gameData.seeds[seedType] || gameData.seeds[seedType] <= 0) {
        addMessage(`你没有${seedType}种子。`, true);
        return;
    }

    // 直接从长芽阶段开始
    plot.state = 'growing';
    plot.plantType = seedType;
    plot.growthStage = 0; // 直接从长芽开始
    plot.stageStartTime = Date.now();
    plot.growthTime = gameData.stageDuration;

    // 消耗种子
    gameData.seeds[seedType]--;

    addMessage(`在地块${plotIndex + 1}种植了${seedType}。`);

    updatePlotsDisplay();
    updateBasketDisplay();
}

// 游戏主循环优化
function gameLoop() {
    // 更新天气和季节
    updateWeatherAndSeason();

    // 更新植物生长
    updateGrowth();

    // 更新炉灶
    updateStove();

    // 更新顾客
    updateCustomer();

    // 更新茶饮温度
    updateTeaTemperatures();

    // 更新定时器 - 改为更频繁地更新
    updateTimers();

    // 持续更新游戏
    requestAnimationFrame(gameLoop);
}

// 更新各种定时器
function updateTimers() {
    // 更新炉灶显示
    updateStoveDisplay();

    // 更新加工台显示
    updateProcessingBoardDisplay();

    // 更新农田计时器显示
    updatePlotTimers();
}

// 专门用于更新农田倒计时的函数
function updatePlotTimers() {
    gameData.plots.forEach((plot, index) => {
        if (plot.state === 'growing') {
            const plotElement = elements.plots[index];
            if (plotElement) {
                const timerElement = plotElement.querySelector('.plot-timer');
                if (timerElement) {
                    const currentTime = Date.now();
                    const elapsed = currentTime - plot.stageStartTime;
                    const remaining = Math.max(0, plot.growthTime - elapsed);
                    timerElement.textContent = Math.ceil(remaining / 1000) + '秒';
                }
            }
        }
    });
}

// 重写农田点击和双击事件
function initPlotEvents() {
    debug('初始化农田事件');

    // 为每个地块添加点击和双击事件
    elements.plots.forEach((plotElement, index) => {
        // 湿度点击
        const moistureElement = plotElement.querySelector('.plot-moisture');
        if (moistureElement) {
            moistureElement.addEventListener('click', (event) => {
                event.stopPropagation(); // 阻止事件冒泡
                waterPlot(index);
            });
            // 添加样式和提示
            moistureElement.style.cursor = 'pointer';
            moistureElement.title = '点击浇水';
            moistureElement.classList.add('clickable-stat');
        }

        // 肥沃度点击
        const fertilityElement = plotElement.querySelector('.plot-fertility');
        if (fertilityElement) {
            fertilityElement.addEventListener('click', (event) => {
                event.stopPropagation(); // 阻止事件冒泡
                fertilizePlot(index);
            });
            // 添加样式和提示
            fertilityElement.style.cursor = 'pointer';
            fertilityElement.title = '点击施肥';
            fertilityElement.classList.add('clickable-stat');
        }

        // 地块双击（挖出）
        plotElement.addEventListener('dblclick', () => {
            debug('双击地块', index);
            digOutOrHarvestPlot(index);
        });

        // 地块点击（收获成熟植物）
        plotElement.addEventListener('click', () => {
            const plot = gameData.plots[index];
            if (plot.state === 'ready') {
                debug('点击收获地块', index);
                harvestPlant(index);
            }
        });
    });
}

// 挖出或收获农田
function digOutOrHarvestPlot(plotIndex) {
    const plot = gameData.plots[plotIndex];

    // 如果是空地，不做任何事
    if (plot.state === 'empty') {
        addMessage(`地块${plotIndex + 1}已经是空地了。`, true);
        return;
    }

    // 如果植物已经成熟，收获
    if (plot.state === 'ready') {
        harvestPlant(plotIndex);
    } else {
        // 否则直接挖出
        const oldPlantType = plot.plantType;

        plot.state = 'empty';
        plot.plantType = null;
        plot.growthStage = 0;

        addMessage(`你挖出了地块${plotIndex + 1}的${oldPlantType}。`);
        updatePlotsDisplay();
    }
}

// 保存游戏
function saveGame() {
    debug('保存游戏');

    // 准备要保存的游戏数据
    const saveData = {
        version: '1.0',
        date: new Date().toLocaleString(),
        gameData: gameData
    };

    // 将数据转换为JSON字符串
    const saveString = JSON.stringify(saveData, null, 2);

    // 创建一个Blob对象
    const blob = new Blob([saveString], { type: 'application/json' });

    // 创建下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `tea_shop_save_${new Date().toISOString().slice(0,10)}.json`;

    // 触发下载
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 释放URL对象
    URL.revokeObjectURL(downloadLink.href);

    addMessage('游戏已保存到文件！');
}

function loadGame() {
    debug('加载游戏');

    // 创建文件输入元素
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';

    // 添加文件选择事件
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            addMessage('没有选择文件。', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const saveData = JSON.parse(e.target.result);

                // 验证存档版本
                if (!saveData.version) {
                    addMessage('无效的存档文件。', true);
                    return;
                }

                // 加载游戏数据
                Object.assign(gameData, saveData.gameData);

                // 更新显示
                updateAllDisplays();

                // 更新配方显示
                updateRecipeDisplay();

                // 检查并激活应该激活的配方
                checkAndActivateReadyRecipes();

                addMessage('游戏加载成功！');
            } catch (error) {
                addMessage('加载存档时出错：' + error.message, true);
            }
        };

        reader.readAsText(file);
    });

    // 触发文件选择
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// 更新所有显示
function updateAllDisplays() {
    updateWeatherAndSeasonDisplay();
    updatePlotsDisplay();
    updateStoveDisplay();
    updateProcessingBoardDisplay();
    updateCustomerDisplay();
    updateMessageDisplay();
    updateTeaDisplay();
    updateBasketDisplay();
    updateToppingsDisplay();
    updateCoinsDisplay();
    updateCartDisplay();

    // 如果配方面板正在显示，更新配方解锁状态
    const recipePanel = document.getElementById('recipe-panel');
    if (recipePanel && recipePanel.style.display === 'flex') {
        updateRecipeUnlockStatus();
    }
}

// 初始化游戏
function initGame() {
    debug('初始化游戏');

    // 获取DOM元素引用
    elements.teaBuySeedBtn = document.getElementById('buy-seed-tea');
    elements.basketBuySeedBtn = document.getElementById('buy-seed-basket');
    elements.basketRecipeBtn = document.getElementById('basket-recipe-button');
    elements.recipePanel = document.getElementById('recipe-panel');
    elements.closeRecipeBtn = document.getElementById('close-recipe');
    elements.seedPanel = document.getElementById('seed-panel');
    elements.closeShopBtn = document.getElementById('close-shop');

    // 确保获取集卡册按钮
    elements.collectionBtn = document.getElementById('collection-button');
    debug('集卡册按钮元素:', elements.collectionBtn);

    // 初始化空的茶饮列表
    gameData.madeTeas = [];
    gameData.teaTemps = {};
    gameData.teaMakeTimes = {};

    // 初始化集卡系统
    if (!gameData.collectedCards) {
        gameData.collectedCards = {};
    }

    // 初始化暂停按钮
    initPauseButton();

    initEventListeners();
    setupTabSystem();
    setupSwiper();
    updateAllDisplays();

    // 初始化配方显示
    updateRecipeDisplay();

    // 检查并激活应该激活的配方
    checkAndActivateReadyRecipes();

    // 启动游戏循环和定时器
    setInterval(function() {
        if (!isPaused) gameLoop();
    }, 1000);

    setInterval(function() {
        if (!isPaused) updateTimers();
    }, 1000);

    debug('游戏初始化完成');
}

// 游戏循环
function gameLoop() {
    // 更新天气和季节
    updateWeatherAndSeason();

    // 更新植物生长
    updateGrowth();

    // 更新炉灶
    updateStove();

    // 更新顾客
    updateCustomer();

    // 更新茶温度
    updateTeaTemperatures();

    // 检查新配方解锁
    updateRecipeUnlockStatus();
}

// 游戏暂停状态
let isPaused = false;

// 初始化暂停按钮
function initPauseButton() {
    const pauseBtn = document.getElementById('pause-btn');
    const pauseOverlay = document.getElementById('pause-overlay');
    const resumeBtn = document.getElementById('resume-btn');

    if (!pauseBtn || !pauseOverlay || !resumeBtn) {
        console.error('暂停功能缺少必要的DOM元素');
        return;
    }

    // 点击暂停按钮
    pauseBtn.addEventListener('click', function() {
        togglePause();
        // 如果是从菜单中点击的，关闭菜单
        const menuPanel = document.getElementById('menu-panel');
        if (menuPanel && menuPanel.style.display === 'block') {
            menuPanel.style.display = 'none';
        }
    });

    // 点击继续按钮
    resumeBtn.addEventListener('click', function() {
        togglePause();
    });

    // 按下空格键也可以暂停/继续
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.keyCode === 32) {
            togglePause();
            e.preventDefault(); // 防止页面滚动
        }
    });
}

// 切换暂停状态
function togglePause() {
    isPaused = !isPaused;

    const pauseBtn = document.getElementById('pause-btn');
    const pauseOverlay = document.getElementById('pause-overlay');

    if (isPaused) {
        pauseBtn.classList.add('active');
        pauseOverlay.classList.add('active');
        addMessage('游戏已暂停');
    } else {
        pauseBtn.classList.remove('active');
        pauseOverlay.classList.remove('active');
        addMessage('游戏已继续');
    }
}

// 修改游戏循环，考虑暂停状态
function gameLoop() {
    if (isPaused) return; // 如果暂停，停止游戏逻辑更新

    // 更新天气和季节
    updateWeatherAndSeason();

    // 更新植物生长
    updateGrowth();

    // 更新炉灶
    updateStove();

    // 更新顾客
    updateCustomer();

    // 更新茶温度
    updateTeaTemperatures();

    // 检查新配方解锁
    updateRecipeUnlockStatus();
}

// 修改定时器更新，考虑暂停状态
function updateTimers() {
    if (isPaused) return; // 如果暂停，停止更新定时器

    updatePlotTimers();
    updateTeaDisplay();
    updateStoveDisplay();
    updateProcessingBoardDisplay();
}

// 修改showCollectionCards函数开头，添加调试信息
function showCollectionCards() {
    debug('显示集卡册');

    // 创建集卡册面板
    const panel = document.createElement('div');
    panel.className = 'collection-panel';
    panel.id = 'collection-panel';

    // 添加标题和关闭按钮
    const header = document.createElement('div');
    header.className = 'collection-header';
    header.innerHTML = `
        <h3>集卡册</h3>
        <button class="close-btn">×</button>
    `;

    // 添加卡片容器
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'collection-cards';

    // 显示收集的卡片
    if (gameData.collectedCards && Object.keys(gameData.collectedCards).length > 0) {
        Object.entries(gameData.collectedCards).forEach(([name, cardData]) => {
            // 查找对应的配方
            const recipeRule = Object.entries(gameData.recipeUnlockRules).find(([recipe, rule]) => rule.customer === name);
            const recipeName = recipeRule ? recipeRule[0] : '未知配方';
            const isUnlocked = recipeRule ? (gameData.unlockedRecipes && gameData.unlockedRecipes.includes(recipeName)) : false;
            
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.innerHTML = `
                <div class="card-name">${name}</div>
                <div class="card-info">
                    <div class="card-count">×${cardData.count}</div>
                    <div class="card-visit">上次来访：${cardData.lastVisit}</div>
                    <div class="card-recipe">配方：${recipeName} ${isUnlocked ? '✅已激活' : '🔒未激活'}</div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    } else {
        cardsContainer.innerHTML = '<div class="empty-collection">还没有收集到任何卡片</div>';
    }

    // 组装面板
    panel.appendChild(header);
    panel.appendChild(cardsContainer);
    document.body.appendChild(panel);

    // 添加关闭按钮事件
    header.querySelector('.close-btn').addEventListener('click', () => {
        panel.remove();
    });

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .collection-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            max-height: 80vh;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .collection-header {
            padding: 15px;
            background: #f5f5f5;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .collection-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        .collection-cards {
            padding: 15px;
            overflow-y: auto;
            flex: 1;
        }
        .collection-card {
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
        }
        .card-name {
            font-size: 16px;
            color: #333;
        }
        .card-info {
            text-align: right;
        }
        .card-count {
            color: #666;
            font-size: 14px;
            margin-bottom: 4px;
        }
        .card-visit {
            color: #999;
            font-size: 12px;
        }
        .card-recipe {
            color: #666;
            font-size: 11px;
            margin-top: 2px;
            font-weight: 500;
        }
        .empty-collection {
            text-align: center;
            color: #999;
            padding: 20px;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .close-btn:hover {
            color: #333;
        }
    `;
    document.head.appendChild(style);
}

// 当DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 购物车相关功能
// 添加到购物车
function addToCart(itemName, itemType, price) {
    // 检查购物车中是否已有此物品
    const existingItem = gameData.cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        gameData.cart.push({
            name: itemName,
            type: itemType,
            price: price,
            quantity: 1
        });
    }

    addMessage(`已将${itemName}添加到购物车。`);
    updateCartDisplay();
    updateCartPopup();
    updateCartPreview();
}

// 从购物车移除
function removeFromCart(itemName) {
    const itemIndex = gameData.cart.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        gameData.cart.splice(itemIndex, 1);
        addMessage(`已从购物车移除${itemName}。`);
        updateCartDisplay();
        updateCartPopup();
        updateCartPreview();
    }
}

// 改变购物车物品数量
function changeCartItemQuantity(itemName, change) {
    const item = gameData.cart.find(item => item.name === itemName);

    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartDisplay();
        updateCartPopup();
        updateCartPreview();
    }
}

// 清空购物车
function clearCart() {
    gameData.cart = [];
    addMessage('已清空购物车。');
    updateCartDisplay();
    updateCartPopup();
    updateCartPreview();
}

// 结账
function checkout() {
    if (gameData.cart.length === 0) {
        addMessage('购物车是空的，无法结账。', true);
        return;
    }

    // 计算总价
    const total = gameData.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (gameData.coins < total) {
        addMessage(`你没有足够的铜板。需要${total}个铜板，但你只有${gameData.coins}个。`, true);
        return;
    }

    // 扣除铜板
    gameData.coins -= total;

    // 添加物品到库存
    gameData.cart.forEach(item => {
        if (item.type === 'seed') {
            gameData.seeds[item.name] = (gameData.seeds[item.name] || 0) + item.quantity;
        } else if (item.type === 'item') {
            // 检查是否是小料类物品
            const toppingItems = ['冰糖', '乌龙茶包', '红糖', '薄荷叶', '蜂蜜', '银耳丝'];
            if (toppingItems.includes(item.name)) {
                gameData.toppings[item.name] = (gameData.toppings[item.name] || 0) + item.quantity;
            } else {
            gameData.inventory[item.name] = (gameData.inventory[item.name] || 0) + item.quantity;
            }
        }
    });

    addMessage(`你花费了${total}个铜板购买了物品。`);

    // 清空购物车
    gameData.cart = [];

    // 更新显示
    updateCoinsDisplay();
    updateCartDisplay();
    updateCartPopup();
    updateCartPreview();
    updateBasketDisplay();
    updateToppingsDisplay(); // 更新小料显示
    updateBasketCartDisplay(); // 更新种植选择弹窗中的购物车显示
}

// 更新购物车显示
function updateCartDisplay() {
    if (!elements.cartItems || !elements.cartTotalAmount) return;

    elements.cartItems.innerHTML = '';

    if (gameData.cart.length === 0) {
        const emptyCart = document.createElement('div');
        emptyCart.className = 'empty-cart';
        emptyCart.textContent = '购物车是空的';
        elements.cartItems.appendChild(emptyCart);
    } else {
        gameData.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            const itemName = document.createElement('div');
            itemName.className = 'cart-item-name';
            itemName.textContent = item.name;

            const itemPrice = document.createElement('div');
            itemPrice.className = 'cart-item-price';
            itemPrice.textContent = `${item.price}铜板`;

            const quantityControl = document.createElement('div');
            quantityControl.className = 'cart-item-quantity';

            const minusBtn = document.createElement('button');
            minusBtn.className = 'quantity-btn';
            minusBtn.textContent = '-';
            minusBtn.addEventListener('click', () => changeCartItemQuantity(item.name, -1));

            const quantityValue = document.createElement('span');
            quantityValue.className = 'quantity-value';
            quantityValue.textContent = item.quantity;

            const plusBtn = document.createElement('button');
            plusBtn.className = 'quantity-btn';
            plusBtn.textContent = '+';
            plusBtn.addEventListener('click', () => changeCartItemQuantity(item.name, 1));

            const removeBtn = document.createElement('button');
            removeBtn.className = 'cart-item-remove';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => removeFromCart(item.name));

            quantityControl.appendChild(minusBtn);
            quantityControl.appendChild(quantityValue);
            quantityControl.appendChild(plusBtn);

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(quantityControl);
            cartItem.appendChild(removeBtn);

            elements.cartItems.appendChild(cartItem);
        });
    }

    // 更新总价
    const total = gameData.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotalAmount.textContent = total;
}

// 选择物品用于使用
function selectMaterialForUse(material) {
    if (gameData.activeTab !== 'kitchen-tab') {
        // 自动切换到厨房页面
        const kitchenTab = document.querySelector('.game-tab[data-tab="kitchen-tab"]');
        if (kitchenTab) {
            kitchenTab.click();
        }
    }

    // 选择材料后提示用户选择炉灶
    gameData.selectedMaterial = material;
    addMessage(`已选择${material}，请点击炉灶或加工台使用。`);
}

// 炉灶操作
function handleStoveClick(stoveIndex) {
    const stove = gameData.stoves[stoveIndex];

    if (stove.state === 'empty') {
        // 添加水
        stove.state = 'water';
        addMessage(`向炉灶${stoveIndex + 1}中加入了水。`);
    }
    else if (stove.state === 'water') {
        // 需要添加材料
        if (!gameData.selectedMaterial) {
            addMessage('请先从篮子中选择要使用的材料。', true);
            return;
        }

        // 检查是否有这种材料
        if (!gameData.inventory[gameData.selectedMaterial] || gameData.inventory[gameData.selectedMaterial] <= 0) {
            addMessage(`你没有${gameData.selectedMaterial}。`, true);
            return;
        }

        // 找出可以用这种材料制作的茶饮
        let matchingRecipe = null;
        for (const [recipe, ingredients] of Object.entries(gameData.recipeIngredients)) {
            if (ingredients.length === 1 && ingredients[0] === gameData.selectedMaterial) {
                matchingRecipe = recipe;
                break;
            }
        }

        if (!matchingRecipe) {
            addMessage(`${gameData.selectedMaterial}不能单独用来制作茶饮。`, true);
            return;
        }

        // 消耗材料
        gameData.inventory[gameData.selectedMaterial]--;

        // 设置炉灶状态
        stove.state = 'ready';
        stove.recipe = matchingRecipe;

        addMessage(`向炉灶${stoveIndex + 1}中加入了${gameData.selectedMaterial}，准备制作${matchingRecipe}。`);
        gameData.selectedMaterial = null;

        updateBasketDisplay();
    }
    else if (stove.state === 'ready') {
        // 开始煮沸
        stove.state = 'boiling';
        stove.startTime = Date.now();

        addMessage(`炉灶${stoveIndex + 1}开始煮沸${stove.recipe}。`);
    }
    else if (stove.state === 'done') {
        // 重置炉灶
        stove.state = 'empty';
        stove.recipe = null;

        addMessage(`已重置炉灶${stoveIndex + 1}。`);
    }

    updateStoveDisplay();
}

// 加工台操作
function handleProcessingBoardClick() {
    if (gameData.processingBoard.state === 'idle') {
        addMessage('请选择一个配方进行加工。');
    }
    else if (gameData.processingBoard.state === 'processing') {
        addMessage(`正在加工${gameData.processingBoard.recipe}，请等待完成。`);
    }
    else if (gameData.processingBoard.state === 'done') {
        // 收取加工完成的物品
        const recipe = gameData.processingBoard.recipe;
        const recipeInfo = gameData.processingRecipes[recipe];
        const outputAmount = recipeInfo.output || 1; // 默认为1，新配方为3

        gameData.processingBoard.state = 'idle';
        gameData.processingBoard.recipe = null;

        // 检查是否是小料（直接加到小料区）
        const toppingItems = ['红糖', '薄荷叶', '姜丝', '柚子丝', '银耳丝', '柠檬片', '小圆子', '干桂花', '水蜜桃果肉', '黄芪片', '酒酿'];
        if (toppingItems.includes(recipe)) {
            gameData.toppings[recipe] = (gameData.toppings[recipe] || 0) + outputAmount;
            addMessage(`你收取了${outputAmount}份${recipe}，已添加到小料区。当前${recipe}数量：${gameData.toppings[recipe]}份`);
        } else {
            // 其他加工品加到库存
            gameData.inventory[recipe] = (gameData.inventory[recipe] || 0) + outputAmount;
            addMessage(`你收取了${outputAmount}个${recipe}，已添加到库存。当前${recipe}数量：${gameData.inventory[recipe]}个`);
        }

        updateProcessingBoardDisplay();
        updateToppingsDisplay();
        updateBasketDisplay();
    }
}

// 处理配方加工
function processRecipe(recipeName) {
    if (gameData.processingBoard.state !== 'idle') {
        addMessage('加工台正在使用中，请等待当前加工完成。', true);
        return;
    }

    const recipeInfo = gameData.processingRecipes[recipeName];
    if (!recipeInfo) {
        addMessage(`未知的配方：${recipeName}。`, true);
        return;
    }

    // 检查材料是否足够
    const missingIngredients = [];
    const availableIngredients = [];
    for (const ingredient of recipeInfo.ingredients) {
        const currentCount = gameData.inventory[ingredient] || 0;
        if (currentCount <= 0) {
            missingIngredients.push(`${ingredient}(当前:${currentCount})`);
        } else {
            availableIngredients.push(`${ingredient}(当前:${currentCount})`);
        }
    }

    if (missingIngredients.length > 0) {
        let message = `加工${recipeName}失败！缺少材料：${missingIngredients.join('、')}`;
        if (availableIngredients.length > 0) {
            message += `。已有材料：${availableIngredients.join('、')}`;
        }
        addMessage(message, true);
        return;
    }

    // 消耗材料
    for (const ingredient of recipeInfo.ingredients) {
        gameData.inventory[ingredient]--;
    }

    // 设置加工台状态
    gameData.processingBoard.state = 'processing';
    gameData.processingBoard.recipe = recipeName;
    gameData.processingBoard.startTime = Date.now();
    gameData.processingBoard.duration = recipeInfo.time;

    addMessage(`开始加工${recipeName}，预计需要${Math.ceil(recipeInfo.time / 1000)}秒。`);

    updateProcessingBoardDisplay();
    updateBasketDisplay();
    updateToppingsDisplay(); // 添加这行，确保小料显示也更新
}

// 显示添加小料面板
function showAddToppingPanel(teaId) {
    // 简化版：直接显示提示信息，询问要添加哪种小料
    const availableToppings = Object.keys(gameData.toppings).filter(t => gameData.toppings[t] > 0);

    if (availableToppings.length === 0) {
        addMessage('你没有可用的小料。', true);
        return;
    }

    const tea = gameData.madeTeas.find(t => t.id === teaId);
    if (!tea) {
        addMessage('找不到选择的茶饮。', true);
        return;
    }

    // 创建小料选择面板
    const toppingPanel = document.createElement('div');
    toppingPanel.className = 'topping-panel';
    toppingPanel.style.position = 'fixed';
    toppingPanel.style.top = '50%';
    toppingPanel.style.left = '50%';
    toppingPanel.style.transform = 'translate(-50%, -50%)';
    toppingPanel.style.backgroundColor = 'white';
    toppingPanel.style.padding = '15px';
    toppingPanel.style.borderRadius = '5px';
    toppingPanel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toppingPanel.style.zIndex = '2000';
    toppingPanel.style.width = '80%';
    toppingPanel.style.maxHeight = '80%';
    toppingPanel.style.overflowY = 'auto';

    const panelTitle = document.createElement('div');
    panelTitle.style.fontWeight = 'bold';
    panelTitle.style.marginBottom = '10px';
    panelTitle.style.paddingBottom = '5px';
    panelTitle.style.borderBottom = '1px solid #eee';
    panelTitle.textContent = '选择要添加的小料';

    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(toppingPanel);
    });

    toppingPanel.appendChild(panelTitle);
    toppingPanel.appendChild(closeButton);

    // 添加小料选项
    availableToppings.forEach(topping => {
        const toppingButton = document.createElement('button');
        toppingButton.style.display = 'block';
        toppingButton.style.width = '100%';
        toppingButton.style.padding = '10px';
        toppingButton.style.margin = '5px 0';
        toppingButton.style.textAlign = 'left';
        toppingButton.style.background = '#f5f5f5';
        toppingButton.style.border = 'none';
        toppingButton.style.borderRadius = '4px';
        toppingButton.textContent = `${topping} (${gameData.toppings[topping]}份)`;

        toppingButton.addEventListener('click', () => {
            addToppingToTea(teaId, topping);
            document.body.removeChild(toppingPanel);
        });

        toppingPanel.appendChild(toppingButton);
    });

    document.body.appendChild(toppingPanel);
}

// 向茶饮添加小料
function addToppingToTea(teaId, topping) {
    const tea = gameData.madeTeas.find(t => t.id === teaId);
    if (!tea) {
        addMessage('找不到选择的茶饮。', true);
        return;
    }

    if (!gameData.toppings[topping] || gameData.toppings[topping] <= 0) {
        addMessage(`你没有足够的${topping}。`, true);
        return;
    }

    // 检查是否已添加过此小料
    if (tea.toppings.includes(topping)) {
        addMessage(`这杯${tea.name}已经添加过${topping}了。`, true);
        return;
    }

    // 消耗小料
    gameData.toppings[topping]--;

    // 添加到茶饮
    tea.toppings.push(topping);

    addMessage(`向${tea.name}中添加了${topping}。`);

    updateTeaDisplay();
    updateToppingsDisplay();
}

// 服务顾客
function serveCustomer() {
    if (!gameData.customer.active) {
        debug('没有活跃的顾客');
        return false;
    }

    const customer = gameData.customer;
    const orderedTea = customer.teaChoice;
    const requiredToppings = customer.toppingChoices;

    debug('尝试为顾客提供服务', { orderedTea, requiredToppings });

    // 查找匹配的茶饮
    const suitableTea = gameData.madeTeas.find(tea => {
        const isCorrectTea = tea.name === orderedTea;
        const hasRequiredToppings = requiredToppings.every(topping =>
            tea.toppings && tea.toppings.includes(topping)
        );

        // 检查温度偏好
        const currentTemp = gameData.teaTemps[tea.id] || 'hot';
        const preferredTemp = customer.isVIP ?
            (gameData.currentSeason === "夏天" ? "cold" : "hot") :
            (gameData.currentSeason === "冬天" && temp === "hot");

        return isCorrectTea && hasRequiredToppings;
    });

    if (!suitableTea) {
        addMessage(`没有合适的${orderedTea}可以提供给顾客。`, true);
        return false;
    }

    // 移除已提供的茶饮
    const teaIndex = gameData.madeTeas.findIndex(tea => tea.id === suitableTea.id);
    if (teaIndex > -1) {
        gameData.madeTeas.splice(teaIndex, 1);
        delete gameData.teaTemps[suitableTea.id];
        delete gameData.teaMakeTimes[suitableTea.id];
    }

    // 计算奖励
    let baseReward = 10;
    let rewardMultiplier = requiredToppings.length * 0.5 + 1;
    if (customer.isVIP) rewardMultiplier *= 2;

    const finalReward = Math.floor(baseReward * rewardMultiplier);
    gameData.coins += finalReward;

    // 增加已服务顾客数量
    gameData.servedCustomers++;
    debug(`已服务顾客数量: ${gameData.servedCustomers}`);

    // 立即保存游戏数据，确保不丢失进度
    saveGame();

    // 检查是否解锁新配方
    Object.entries(gameData.recipeUnlockRequirements).forEach(([recipe, requirement]) => {
        if (gameData.servedCustomers === requirement && !gameData.unlockedRecipes.includes(recipe)) {
            gameData.unlockedRecipes.push(recipe);
            addMessage(`🎉 恭喜！解锁新配方：${recipe}！已服务${requirement}位顾客`);
            updateRecipeDisplay();
            debug(`解锁新配方: ${recipe}`);
        }
    });

    // 添加顾客卡片到收藏
    if (!gameData.collectedCards[customer.name]) {
        gameData.collectedCards[customer.name] = {
            count: 1,
            lastVisit: new Date().toLocaleDateString()
        };
        addMessage(`获得新顾客卡片：${customer.name}！`);
    } else {
        gameData.collectedCards[customer.name].count++;
        gameData.collectedCards[customer.name].lastVisit = new Date().toLocaleDateString();
    }

    checkNewRecipeUnlock();

    addMessage(`成功为${customer.name}提供了${orderedTea}，获得${finalReward}铜板。`);

    // 重置顾客
    resetCustomer();
    updateAllDisplays();

    // 通知测试页面数据更新
    notifyTestPage();

    return true;
}

// 检查新配方解锁
function checkNewRecipeUnlock() {
    const currentCount = gameData.servedCustomers;

    Object.keys(gameData.recipeUnlockRequirements).forEach(recipeName => {
        const requiredCount = gameData.recipeUnlockRequirements[recipeName];

        // 如果达到解锁条件且尚未解锁
        if (currentCount >= requiredCount && !gameData.unlockedRecipes.includes(recipeName)) {
            gameData.unlockedRecipes.push(recipeName);

            // 显示解锁消息
            addMessage(`🎉 恭喜！你已服务${currentCount}位顾客，解锁了新配方：${recipeName}！`, false);

            // 显示配方面板中的新配方
            updateRecipeDisplay();

            // 可选：播放解锁音效或动画
            showRecipeUnlockNotification(recipeName);
        }
    });
}

// 显示配方解锁通知
function showRecipeUnlockNotification(recipeName) {
    // 找到对应的配方元素并显示
    const recipeElements = document.querySelectorAll('.unlockable-recipe');
    recipeElements.forEach(element => {
        const nameElement = element.querySelector('.recipe-name');
        if (nameElement && nameElement.textContent === recipeName) {
            element.style.display = 'block';
            element.style.animation = 'fadeIn 0.5s ease-in';
        }
    });
}

// 更新配方显示
function updateRecipeDisplay() {
    const recipeElements = document.querySelectorAll('.unlockable-recipe');
    recipeElements.forEach(element => {
        const nameElement = element.querySelector('.recipe-name');
        if (nameElement) {
            const recipeName = nameElement.textContent;
            if (gameData.unlockedRecipes.includes(recipeName)) {
                element.style.display = 'block';
            }
        }
    });
}

// 调试功能
const DEBUG = true;
function debug(message, data = null) {
    if (DEBUG) {
        if (data) {
            console.log(`[DEBUG] ${message}:`, data);
        } else {
            console.log(`[DEBUG] ${message}`);
        }
    }
}

// 商店功能
let cart = [];

// 标记商店是否已初始化
let shopInitialized = false;

// 初始化商店功能
function initializeShop() {
    debug('初始化商店');

    // 如果已经初始化过，则不重复初始化
    if (shopInitialized) {
        debug('商店已初始化，跳过');
        return;
    }

    // 清空购物车，确保没有无效项
    cart = [];

    // 移除所有已存在的事件监听器，防止重复绑定
    document.querySelectorAll('.seed-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    document.querySelectorAll('.shop-item-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    // 移除结账按钮已存在的事件监听器
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        const newCheckoutBtn = checkoutBtn.cloneNode(true);
        checkoutBtn.parentNode.replaceChild(newCheckoutBtn, checkoutBtn);
    }

    // 种子按钮点击事件
    document.querySelectorAll('.seed-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            debug('点击种子按钮', this.textContent);

            // 移除其他按钮的选中状态
            document.querySelectorAll('.seed-btn').forEach(b => b.classList.remove('selected'));
            // 添加当前按钮的选中状态
            this.classList.add('selected');

            // 添加到购物车
            const itemName = this.textContent.trim();
            const itemPrice = parseInt(this.dataset.price) || 1;

            debug('添加种子到购物车', {name: itemName, price: itemPrice});
            addToCart(itemName, 'seed', itemPrice);
        });
    });

    // 物品按钮点击事件
    document.querySelectorAll('.shop-item-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            debug('点击物品按钮', this.dataset.item);

            // 移除其他按钮的选中状态
            document.querySelectorAll('.shop-item-btn').forEach(b => b.classList.remove('selected'));
            // 添加当前按钮的选中状态
            this.classList.add('selected');

            // 添加到购物车
            const itemName = this.dataset.item.trim();
            const itemPrice = parseInt(this.dataset.price) || 3;

            debug('添加物品到购物车', {name: itemName, price: itemPrice});
            addToCart(itemName, 'item', itemPrice);
        });
    });

    // 结账按钮点击事件
    const newCheckoutBtn = document.getElementById('checkout-btn');
    if (newCheckoutBtn) {
        newCheckoutBtn.addEventListener('click', function() {
            debug('点击结账按钮', gameData.cart);
            checkout();

            // 提示购买成功（使用自定义通知而不是alert）
            const purchaseNotification = document.createElement('div');
            purchaseNotification.className = 'purchase-notification';
            purchaseNotification.innerHTML = '<i class="fa fa-check-circle"></i> 购买成功！物品已放入小篮子。';
            document.body.appendChild(purchaseNotification);

            // 2秒后移除提示
            setTimeout(() => {
                purchaseNotification.classList.add('fadeout');
                setTimeout(() => {
                    if (document.body.contains(purchaseNotification)) {
                        document.body.removeChild(purchaseNotification);
                    }
                }, 500);
            }, 2000);

            // 关闭商店面板
            document.getElementById('seed-panel').style.display = 'none';
        });
    }

    // 标记商店已初始化
    shopInitialized = true;
}

// 第二个addToCart函数已删除，避免冲突

function updateCartPreview() {
    // 清除无效项
    gameData.cart = gameData.cart.filter(item => item && item.name && !isNaN(item.price));

    const itemsCount = gameData.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = gameData.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // 更新顶部统计信息
    const cartItemsCountEl = document.getElementById('cart-items-count');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (cartItemsCountEl) cartItemsCountEl.textContent = itemsCount;
    if (cartTotalEl) cartTotalEl.textContent = total;

    // 更新购物车物品列表
    const cartPreviewItems = document.querySelector('.cart-preview-items');
    if (!cartPreviewItems) return;
    
    cartPreviewItems.innerHTML = '';

    if (gameData.cart.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'cart-preview-empty';
        emptyDiv.textContent = '购物车是空的';
        cartPreviewItems.appendChild(emptyDiv);
    } else {
        gameData.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-preview-item';
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'cart-preview-item-name';
            nameDiv.textContent = item.name;
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'cart-preview-item-info';
            
            const quantityDiv = document.createElement('div');
            quantityDiv.className = 'cart-preview-item-quantity';
            quantityDiv.textContent = `x${item.quantity || 1}`;
            
            const priceDiv = document.createElement('div');
            priceDiv.className = 'cart-preview-item-price';
            priceDiv.textContent = `${item.price * (item.quantity || 1)}铜板`;
            
            infoDiv.appendChild(quantityDiv);
            infoDiv.appendChild(priceDiv);
            itemDiv.appendChild(nameDiv);
            itemDiv.appendChild(infoDiv);
            
            cartPreviewItems.appendChild(itemDiv);
        });
    }

    debug('更新购物车预览', {itemsCount, total, items: gameData.cart});
}

function showAddToCartHint() {
    const hint = document.getElementById('add-to-cart-hint');
    hint.style.display = 'block';

    // 2秒后隐藏提示
    setTimeout(() => {
        hint.style.display = 'none';
    }, 2000);
}

// 为快速操作按钮添加事件监听
function initQuickActions() {
    const quickStoveBtn = document.getElementById('quick-stove-btn');
    const quickProcessBtn = document.getElementById('quick-process-btn');

    if (quickStoveBtn) {
        quickStoveBtn.addEventListener('click', function() {
            // 滚动到炉灶区域
            const stovesContainer = document.querySelector('.stoves-container');
            if (stovesContainer) {
                stovesContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (quickProcessBtn) {
        quickProcessBtn.addEventListener('click', function() {
            // 滚动到案板区域
            const processingContainer = document.querySelector('.processing-container');
            if (processingContainer) {
                processingContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    initQuickActions();
    initFarmAndBasket();
    initPlotEvents(); // 添加地块事件初始化
    
    // 强制更新购物车预览以显示新布局
    updateCartPreview();

    // 添加保存通知和按钮点击样式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .save-notification, .purchase-notification {
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(46, 125, 50, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 9999;
            font-size: 16px;
            animation: fade-in 0.3s ease-out;
            display: flex;
            align-items: center;
        }

        .save-notification i, .purchase-notification i {
            margin-right: 8px;
            font-size: 18px;
        }

        .button-pressed {
            transform: scale(0.95);
            opacity: 0.8;
            transition: transform 0.1s, opacity 0.1s;
        }

        .fadeout {
            opacity: 0;
            transition: opacity 0.5s;
        }

        @keyframes fade-in {
            from { opacity: 0; transform: translate(-50%, -10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }

        /* 新的游戏信息区域样式 */
        .info-block {
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .game-status {
            font-size: 16px;
            padding: 8px;
            background-color: #f0f0f0;
            border-radius: 5px;
            margin-bottom: 10px;
            text-align: center;
            font-weight: bold;
            color: #2e7d32;
        }

        .customer-status {
            background-color: #f0f0f0;
            padding: 8px;
            border-radius: 5px;
        }

        .customer-info-row {
            margin: 5px 0;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .info-label {
            font-weight: bold;
            margin-right: 5px;
            color: #1565c0;
        }

        #customer-name {
            margin-right: 10px;
            font-weight: bold;
        }

        #patience-timer {
            color: #d32f2f;
            font-weight: bold;
        }
    `;
    document.head.appendChild(styleElement);

    // 游戏循环由initGame函数启动，这里不再重复启动
});

// 更新DOM元素引用
function updateDOMReferences() {
    // 添加炉灶配方选择相关的元素
    elements.recipeSelectPanel = document.getElementById('recipe-select-panel');
    elements.recipeSelectList = document.querySelector('.recipe-select-list');
    elements.selectedRecipeName = document.getElementById('selected-recipe-name');
    elements.selectedRecipeIngredients = document.getElementById('selected-recipe-ingredients');
    elements.makeRecipeBtn = document.getElementById('make-recipe-btn');
    elements.cancelRecipeBtn = document.getElementById('cancel-recipe-btn');
    elements.closeRecipeSelectBtn = document.getElementById('close-recipe-select');

    // 更新茶摊商店按钮
    elements.teaBuySeedBtn = document.getElementById('buy-seed-tea');
    elements.basketBuySeedBtn = document.getElementById('buy-seed-basket');
    elements.basketRecipeBtn = document.getElementById('basket-recipe-button');
    elements.serveBtnTea = document.getElementById('serve-btn-tea');

    // 更新小料显示元素
    elements.toppingsDisplay = document.getElementById('toppings-display');
}

// 当前选中的炉灶和配方
let selectedStoveIndex = -1;
let selectedRecipe = null;

// 初始化炉灶配方选择功能
function initStoveRecipe() {
    debug('初始化炉灶配方选择功能');

    // 关闭按钮事件
    if (elements.closeRecipeSelectBtn) {
        elements.closeRecipeSelectBtn.addEventListener('click', () => {
            elements.recipeSelectPanel.style.display = 'none';
            resetRecipeSelection();
        });
    }

    // 取消按钮事件
    if (elements.cancelRecipeBtn) {
        elements.cancelRecipeBtn.addEventListener('click', () => {
            elements.recipeSelectPanel.style.display = 'none';
            resetRecipeSelection();
        });
    }

    // 制作按钮事件
    if (elements.makeRecipeBtn) {
        elements.makeRecipeBtn.addEventListener('click', makeSelectedRecipe);
    }

    // 炉灶点击事件改为打开配方选择
    elements.stoves.forEach((stove, index) => {
        stove.addEventListener('click', () => {
            // 检查炉灶状态
            if (gameData.stoves[index].state === 'boiling' || gameData.stoves[index].state === 'done') {
                // 炉灶正在煮或已完成，使用原始处理逻辑
                handleStoveOriginal(index);
            } else {
                // 炉灶未使用或已有水，打开配方选择界面
                openRecipeSelect(index);
            }
        });
    });
}

// 原始的炉灶处理逻辑（用于正在煮或已完成的情况）
function handleStoveOriginal(stoveIndex) {
    const stove = gameData.stoves[stoveIndex];

    if (stove.state === 'boiling') {
        // 正在煮，不做任何操作
        const remaining = Math.ceil((stove.startTime + stove.boilDuration - Date.now()) / 1000);
        addMessage(`炉灶${stoveIndex + 1}正在煮沸${stove.recipe}，还需要${remaining}秒。`);
    } else if (stove.state === 'done') {
        // 已完成，重置炉灶
        stove.state = 'empty';
        stove.recipe = null;
        addMessage(`已重置炉灶${stoveIndex + 1}。`);
        updateStoveDisplay();
    }
}

// 打开配方选择界面
function openRecipeSelect(stoveIndex) {
    debug('打开配方选择界面', stoveIndex);
    selectedStoveIndex = stoveIndex;

    // 根据炉灶状态设置标题
    const stove = gameData.stoves[stoveIndex];
    const recipeTitle = document.querySelector('.recipe-select-title');
    if (recipeTitle) {
        recipeTitle.textContent = `选择茶饮配方 (炉灶${stoveIndex + 1})`;
    }

    // 自动添加水
    if (stove.state === 'empty') {
        stove.state = 'water';
        addMessage(`向炉灶${stoveIndex + 1}中加入了水。`);
        updateStoveDisplay();
    }

    // 生成配方列表
    populateRecipeList();

    // 显示配方选择面板
    elements.recipeSelectPanel.style.display = 'flex';
}

// 生成配方列表
function populateRecipeList() {
    if (!elements.recipeSelectList) return;

    elements.recipeSelectList.innerHTML = '';

    // 获取所有配方
    const recipes = Object.keys(gameData.recipeIngredients);

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item-select';
        recipeItem.dataset.recipe = recipe;

        // 检查材料是否足够
        const ingredients = gameData.recipeIngredients[recipe];
        const hasMaterials = checkRecipeMaterials(recipe);

        recipeItem.innerHTML = `
            <div class="recipe-name">${recipe}</div>
            <div class="recipe-ingredients">需要: ${ingredients.join(', ')}</div>
            <div class="recipe-status">${hasMaterials ? '✅ 材料充足' : '❌ 材料不足'}</div>
        `;

        // 添加点击事件
        recipeItem.addEventListener('click', () => {
            // 移除其他选中状态
            document.querySelectorAll('.recipe-item-select').forEach(item => {
                item.classList.remove('selected');
            });

            // 添加选中状态
            recipeItem.classList.add('selected');

            // 更新选中的配方
            selectedRecipe = recipe;
            updateRecipeDetails(recipe);
        });

        elements.recipeSelectList.appendChild(recipeItem);
    });
}

// 检查配方材料是否足够
function checkRecipeMaterials(recipe) {
    const ingredients = gameData.recipeIngredients[recipe];

    for (const ingredient of ingredients) {
        if (!gameData.inventory[ingredient] || gameData.inventory[ingredient] <= 0) {
            return false;
        }
    }

    return true;
}

// 更新配方详情显示
function updateRecipeDetails(recipe) {
    if (!elements.selectedRecipeName || !elements.selectedRecipeIngredients || !elements.makeRecipeBtn) return;

    elements.selectedRecipeName.textContent = recipe;

    const ingredients = gameData.recipeIngredients[recipe];
    let ingredientsHTML = '需要的材料: <ul>';

    const missingIngredients = [];

    for (const ingredient of ingredients) {
        const count = gameData.inventory[ingredient] || 0;
        const isAvailable = count > 0;

        if (!isAvailable) {
            missingIngredients.push(ingredient);
        }

        ingredientsHTML += `
            <li class="${isAvailable ? 'ingredient-available' : 'ingredient-missing'}">
                ${ingredient}: ${count} 个 ${isAvailable ? '✓' : '✗'}
            </li>
        `;
    }

    ingredientsHTML += '</ul>';
    elements.selectedRecipeIngredients.innerHTML = ingredientsHTML;

    // 更新制作按钮状态
    elements.makeRecipeBtn.disabled = missingIngredients.length > 0;
}

// 制作选中的配方
function makeSelectedRecipe() {
    if (selectedStoveIndex < 0 || !selectedRecipe) return;

    const stove = gameData.stoves[selectedStoveIndex];

    // 检查炉灶状态
    if (stove.state !== 'water') {
        addMessage(`炉灶${selectedStoveIndex + 1}不可用。`, true);
        return;
    }

    // 再次检查材料是否足够
    if (!checkRecipeMaterials(selectedRecipe)) {
        addMessage(`制作${selectedRecipe}的材料不足。`, true);
        updateRecipeDetails(selectedRecipe);
        return;
    }

    // 消耗材料
    const ingredients = gameData.recipeIngredients[selectedRecipe];
    for (const ingredient of ingredients) {
        gameData.inventory[ingredient]--;
    }

    // 设置炉灶状态
    stove.state = 'boiling';
    stove.recipe = selectedRecipe;
    stove.startTime = Date.now();

    // 更新小篮子显示
    updateBasketDisplay();

    // 更新炉灶显示
    updateStoveDisplay();

    // 关闭配方选择面板
    elements.recipeSelectPanel.style.display = 'none';

    // 添加消息
    addMessage(`炉灶${selectedStoveIndex + 1}开始煮制${selectedRecipe}。`);

    // 重置选择状态
    resetRecipeSelection();
}

// 重置配方选择状态
function resetRecipeSelection() {
    selectedStoveIndex = -1;
    selectedRecipe = null;

    if (elements.selectedRecipeName) {
        elements.selectedRecipeName.textContent = '请选择茶饮';
    }

    if (elements.selectedRecipeIngredients) {
        elements.selectedRecipeIngredients.textContent = '需要的材料将显示在这里';
    }

    if (elements.makeRecipeBtn) {
        elements.makeRecipeBtn.disabled = true;
    }
}

// 初始化函数中添加对新DOM元素的引用和事件处理
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    initQuickActions();
    initFarmAndBasket();
    initPlotEvents();
    updateDOMReferences(); // 更新DOM元素引用
    initStoveRecipe();  // 初始化炉灶配方选择功能

    // 游戏循环由initGame函数启动，这里不再重复启动
});

// 修复顾客功能
function initCustomerSystem() {
    debug('初始化顾客系统');

    // 确保顾客区域可见
    const customerArea = document.getElementById('customer-area');
    if (customerArea) {
        customerArea.style.display = 'block';
    }

    // 添加服务顾客按钮事件
    const serveBtn = document.getElementById('serve-btn');
    if (serveBtn) {
        serveBtn.addEventListener('click', () => {
            if (gameData.customer.active) {
                // 打开茶摊标签页
                const teaTab = document.querySelector('.game-tab[data-tab="tea-tab"]');
                if (teaTab) {
                    teaTab.click();
                }
                // 提示服务顾客
                addMessage('请从茶摊上选择合适的茶饮提供给顾客。');
            } else {
                addMessage('目前没有顾客。');

                // 如果很久没有顾客，强制生成一个
                if (Date.now() - gameData.lastCustomerTime > 60000) {
                    spawnCustomer();
                }
            }
        });
    }

    // 启动顾客生成系统
    gameData.lastCustomerTime = Date.now();
    setInterval(checkForNewCustomer, 15000); // 每15秒检查是否生成新顾客
}

// 定期检查是否生成新顾客
function checkForNewCustomer() {
    if (!gameData.customer.active) {
        const currentTime = Date.now();
        if (currentTime - gameData.lastCustomerTime >= gameData.customerSpawnCooldown) {
            // 没有顾客时，提高生成概率到50%
            if (Math.random() < 0.5) {
                spawnCustomer();
            }

            // 无论是否生成客户，都重置冷却时间
            gameData.lastCustomerTime = currentTime;
        }
    } else {
        // 更新耐心显示
        updateCustomerDisplay();
    }
}

// 生成顾客（修复版）
function spawnCustomer() {
    debug('生成顾客');

    // 30%概率生成特殊顾客（有名字的）
    const isVIP = Math.random() < 0.3;

    // 设置顾客信息
    const customerName = isVIP ? gameData.customerNames[Math.floor(Math.random() * gameData.customerNames.length)] : "普通顾客";

    // 只从已解锁的配方中选择
    if (!gameData.unlockedRecipes || gameData.unlockedRecipes.length === 0) {
        debug('没有可用的配方，使用默认配方');
        gameData.unlockedRecipes = ["五味子饮", "柠檬茶"]; // 确保至少有这两个基础配方
    }
    const teaChoice = gameData.unlockedRecipes[Math.floor(Math.random() * gameData.unlockedRecipes.length)];

    // 修改耐心时间：普通顾客120秒，特殊顾客240秒
    const patience = isVIP ? 240000 : 120000; // VIP 240秒，普通顾客 120秒

    // 更新顾客状态
    gameData.customer = {
        active: true,
        name: customerName,
        isVIP: isVIP,
        teaChoice: teaChoice,
        toppingChoices: [],
        arrivalTime: Date.now(),
        patience: patience,
        served: false
    };

    // 随机选择0-2个小料
    const availableToppings = Object.keys(gameData.toppings);
    const numToppings = Math.floor(Math.random() * 3);
    for (let i = 0; i < numToppings; i++) {
        const topping = availableToppings[Math.floor(Math.random() * availableToppings.length)];
        if (!gameData.customer.toppingChoices.includes(topping)) {
            gameData.customer.toppingChoices.push(topping);
        }
    }

    // 显示顾客到来消息
    let arrivalMessage = isVIP ? `${customerName}来到了茶铺` : "一位普通顾客来到了茶铺";
    arrivalMessage += `，想要一杯${teaChoice}`;
    if (gameData.customer.toppingChoices.length > 0) {
        arrivalMessage += `，加${gameData.customer.toppingChoices.join('、')}`;
    }
    addTeaInfoMessage(arrivalMessage);

    updateCustomerDisplay();
}

// 修复炉灶功能
function initStoveRecipeFixed() {
    debug('重新初始化炉灶配方选择功能');

    // 首先确保DOM元素引用正确
    elements.recipeSelectPanel = document.getElementById('recipe-select-panel');
    elements.recipeSelectList = document.querySelector('.recipe-select-list');
    elements.selectedRecipeName = document.getElementById('selected-recipe-name');
    elements.selectedRecipeIngredients = document.getElementById('selected-recipe-ingredients');
    elements.makeRecipeBtn = document.getElementById('make-recipe-btn');
    elements.cancelRecipeBtn = document.getElementById('cancel-recipe-btn');
    elements.closeRecipeSelectBtn = document.getElementById('close-recipe-select');

    // 打印DOM元素引用，用于调试
    debug('炉灶配方面板元素:', {
        panel: elements.recipeSelectPanel,
        list: elements.recipeSelectList,
        recipeName: elements.selectedRecipeName,
        ingredients: elements.selectedRecipeIngredients,
        makeBtn: elements.makeRecipeBtn,
        cancelBtn: elements.cancelRecipeBtn,
        closeBtn: elements.closeRecipeSelectBtn
    });

    // 确保面板存在
    if (!elements.recipeSelectPanel) {
        console.error('炉灶配方面板不存在!');
        return;
    }

    // 为按钮添加事件监听
    if (elements.closeRecipeSelectBtn) {
        debug('添加关闭按钮事件');
        elements.closeRecipeSelectBtn.addEventListener('click', function() {
            debug('点击关闭按钮');
            elements.recipeSelectPanel.style.display = 'none';
        });
    }

    if (elements.cancelRecipeBtn) {
        debug('添加取消按钮事件');
        elements.cancelRecipeBtn.addEventListener('click', function() {
            debug('点击取消按钮');
            elements.recipeSelectPanel.style.display = 'none';
        });
    }

    if (elements.makeRecipeBtn) {
        debug('添加制作按钮事件');
        elements.makeRecipeBtn.addEventListener('click', function() {
            debug('点击制作按钮');
            makeSelectedRecipe();
        });
    }

    // 移除旧的事件监听器，以防重复
    elements.stoves.forEach((stove, index) => {
        const oldElement = stove.cloneNode(true);
        stove.parentNode.replaceChild(oldElement, stove);
        elements.stoves[index] = oldElement;
    });

    // 添加新的事件监听器
    elements.stoves.forEach((stove, index) => {
        debug('为炉灶添加点击事件', index);
        stove.addEventListener('click', function() {
            debug('点击炉灶', index);
            const stoveState = gameData.stoves[index].state;
            debug('炉灶状态', stoveState);

            // 检查炉灶状态
            if (stoveState === 'boiling') {
                // 正在煮，显示剩余时间
                const remaining = Math.ceil((gameData.stoves[index].startTime + gameData.stoves[index].boilDuration - Date.now()) / 1000);
                addMessage(`炉灶${index + 1}正在煮沸${gameData.stoves[index].recipe}，还需要${remaining}秒。`);
            }
            else if (stoveState === 'done') {
                // 已完成，重置炉灶
                gameData.stoves[index].state = 'empty';
                gameData.stoves[index].recipe = null;
                addMessage(`已重置炉灶${index + 1}。`);
                updateStoveDisplay();
            }
            else {
                // 空闲或已有水，打开配方选择
                openRecipeSelectFixed(index);
            }
        });
    });
}

// 修复打开配方选择界面函数
function openRecipeSelectFixed(stoveIndex) {
    debug('打开配方选择界面', stoveIndex);

    // 保存当前选中的炉灶索引
    selectedStoveIndex = stoveIndex;

    // 根据炉灶状态设置标题
    const stove = gameData.stoves[stoveIndex];
    const recipeTitle = document.querySelector('.recipe-select-title');
    if (recipeTitle) {
        recipeTitle.textContent = `选择茶饮配方 (炉灶${stoveIndex + 1})`;
    }

    // 自动添加水
    if (stove.state === 'empty') {
        stove.state = 'water';
        addMessage(`向炉灶${stoveIndex + 1}中加入了水。`);
        updateStoveDisplay();
    }

    // 生成配方列表
    populateRecipeListFixed();

    // 显示配方选择面板
    if (elements.recipeSelectPanel) {
        elements.recipeSelectPanel.style.display = 'flex';
    } else {
        console.error('配方选择面板元素不存在!');
    }
}

// 修复生成配方列表函数
function populateRecipeListFixed() {
    if (!elements.recipeSelectList) {
        console.error('配方列表元素不存在!');
        return;
    }

    elements.recipeSelectList.innerHTML = '';

    // 获取所有配方 - 基础配方永远可用，特殊配方需要通过顾客解锁
    const basicRecipes = ["五味子饮", "柠檬茶"]; // 基础配方

    const recipes = Object.keys(gameData.recipeIngredients).filter(recipe => {
        // 基础配方永远可用，特殊配方需要解锁
        return basicRecipes.includes(recipe) || gameData.unlockedRecipes.includes(recipe);
    });

    // 如果没有解锁任何配方，显示提示
    if (recipes.length === 0) {
        const noRecipeMsg = document.createElement('div');
        noRecipeMsg.className = 'no-recipe-message';
        noRecipeMsg.innerHTML = '你还没有解锁任何茶饮配方。<br>服务特殊顾客可以解锁更多配方！';
        noRecipeMsg.style.textAlign = 'center';
        noRecipeMsg.style.padding = '20px';
        noRecipeMsg.style.color = '#888';
        elements.recipeSelectList.appendChild(noRecipeMsg);
        return;
    }

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item-select';
        recipeItem.dataset.recipe = recipe;

        // 检查材料是否足够
        const ingredients = gameData.recipeIngredients[recipe];
        const hasMaterials = checkRecipeMaterials(recipe);

        recipeItem.innerHTML = `
            <div class="recipe-name">${recipe}</div>
            <div class="recipe-ingredients">需要: ${ingredients.join(', ')}</div>
            <div class="recipe-status">${hasMaterials ? '✅ 材料充足' : '❌ 材料不足'}</div>
        `;

        // 添加点击事件
        recipeItem.addEventListener('click', () => {
            debug('点击配方', recipe);
            // 移除其他选中状态
            document.querySelectorAll('.recipe-item-select').forEach(item => {
                item.classList.remove('selected');
            });

            // 添加选中状态
            recipeItem.classList.add('selected');

            // 更新选中的配方
            selectedRecipe = recipe;
            updateRecipeDetails(recipe);
        });

        elements.recipeSelectList.appendChild(recipeItem);
    });
}

// 修复保存游戏功能
function saveGameFixed() {
    debug('保存游戏');
    try {
        // 创建保存数据对象，确保保存所有重要数据
        const saveData = {
            // 基础数据
            version: '1.1',
            saveDate: new Date().toISOString(),

            // 玩家资源
            seeds: gameData.seeds,
            inventory: gameData.inventory,
            coins: gameData.coins,

            // 农田数据
            plots: gameData.plots,

            // 茶饮相关
            madeTeas: gameData.madeTeas,
            teaTemps: gameData.teaTemps,
            teaMakeTimes: gameData.teaMakeTimes,
            toppings: gameData.toppings,

            // 炉灶数据
            stoves: gameData.stoves,

            // 加工台数据
            processingBoard: gameData.processingBoard,

            // 顾客数据
            customer: gameData.customer,
            lastCustomerTime: gameData.lastCustomerTime,

            // 环境数据
            currentSeason: gameData.currentSeason,
            currentWeather: gameData.currentWeather,
            currentDay: gameData.currentDay,
            daysInSeason: gameData.daysInSeason,
            weatherStartTime: gameData.weatherStartTime,

            // 收藏系统
            collectedCards: gameData.collectedCards,

            // 配方解锁系统
            unlockedRecipes: gameData.unlockedRecipes,
            customerVisits: gameData.customerVisits,
            servedCustomers: gameData.servedCustomers,

            // 其他游戏状态
            activeTab: gameData.activeTab,
            currentSlide: gameData.currentSlide,
            messages: gameData.messages
        };

        // 转换为字符串
        const saveString = JSON.stringify(saveData);

        // 存储到本地存储
        localStorage.setItem('teaShopMobileSave', saveString);

        // 显示保存成功提示
        const saveNotification = document.createElement('div');
        saveNotification.className = 'save-notification';
        saveNotification.innerHTML = '<i class="fa fa-check-circle"></i> 游戏已保存成功！';
        document.body.appendChild(saveNotification);

        // 保存按钮视觉反馈
        const saveBtn = document.getElementById('save');
        if (saveBtn) {
            saveBtn.classList.add('button-pressed');
            setTimeout(() => {
                saveBtn.classList.remove('button-pressed');
            }, 300);
        }

        // 2秒后移除提示
        setTimeout(() => {
            saveNotification.classList.add('fadeout');
            setTimeout(() => {
                if (document.body.contains(saveNotification)) {
                    document.body.removeChild(saveNotification);
                }
            }, 500);
        }, 2000);

        addMessage('游戏已保存成功！');
        debug('游戏保存成功', saveData);
    } catch (error) {
        console.error('保存游戏失败:', error);
        addMessage('保存游戏失败: ' + error.message, true);
    }
}

// 田地兼容性处理函数
function ensurePlotsCompatibility(savedPlots) {
    // 保持现有田地数据作为默认
    const defaultPlots = [...gameData.plots];

    // 逐个恢复保存的田地数据
    if (savedPlots && Array.isArray(savedPlots)) {
        savedPlots.forEach((savedPlot, index) => {
            if (index < defaultPlots.length) {
                // 确保每个田地都有完整的字段
                defaultPlots[index] = {
                    id: index,
                    state: savedPlot.state || 'empty',
                    growthStage: savedPlot.growthStage || 0,
                    stageStartTime: savedPlot.stageStartTime || 0,
                    moisture: savedPlot.moisture || 50,
                    fertility: savedPlot.fertility || 50,
                    plantType: savedPlot.plantType || null
                };
            }
        });
    }

    return defaultPlots;
}

// 修复加载游戏功能
function loadGameFixed() {
    debug('加载游戏');
    try {
        // 从本地存储获取数据
        const saveString = localStorage.getItem('teaShopMobileSave');

        if (!saveString) {
            addMessage('没有找到保存的游戏数据。', true);
            return;
        }

        // 解析数据
        const saveData = JSON.parse(saveString);
        debug('加载游戏数据', saveData);

        // 更新游戏数据
        if (saveData.seeds) gameData.seeds = saveData.seeds;
        if (saveData.inventory) gameData.inventory = saveData.inventory;
        if (saveData.coins) gameData.coins = saveData.coins;

        // 使用兼容性处理函数确保田地正确加载
        if (saveData.plots) {
            gameData.plots = ensurePlotsCompatibility(saveData.plots);
        }

        if (saveData.madeTeas) gameData.madeTeas = saveData.madeTeas;
        if (saveData.teaTemps) gameData.teaTemps = saveData.teaTemps;
        if (saveData.teaMakeTimes) gameData.teaMakeTimes = saveData.teaMakeTimes;
        if (saveData.toppings) gameData.toppings = saveData.toppings;

        if (saveData.stoves) gameData.stoves = saveData.stoves;
        if (saveData.processingBoard) gameData.processingBoard = saveData.processingBoard;

        if (saveData.customer) gameData.customer = saveData.customer;
        if (saveData.lastCustomerTime) gameData.lastCustomerTime = saveData.lastCustomerTime;

        if (saveData.currentSeason) gameData.currentSeason = saveData.currentSeason;
        if (saveData.currentWeather) gameData.currentWeather = saveData.currentWeather;
        if (saveData.currentDay) gameData.currentDay = saveData.currentDay;
        if (saveData.daysInSeason) gameData.daysInSeason = saveData.daysInSeason;
        if (saveData.weatherStartTime) gameData.weatherStartTime = saveData.weatherStartTime;

        if (saveData.collectedCards) gameData.collectedCards = saveData.collectedCards;

        if (saveData.unlockedRecipes) gameData.unlockedRecipes = saveData.unlockedRecipes;
        if (saveData.customerVisits) gameData.customerVisits = saveData.customerVisits;
        if (saveData.servedCustomers !== undefined) gameData.servedCustomers = saveData.servedCustomers;

        if (saveData.activeTab) gameData.activeTab = saveData.activeTab;
        if (saveData.currentSlide) gameData.currentSlide = saveData.currentSlide;
        if (saveData.messages) gameData.messages = saveData.messages;

        // 更新所有显示
        updateAllDisplays();

        // 更新配方显示
        updateRecipeDisplay();

        // 检查并激活应该激活的配方
        checkAndActivateReadyRecipes();

        addMessage('游戏加载成功！');
    } catch (error) {
        console.error('加载游戏失败:', error);
        addMessage('加载游戏失败: ' + error.message, true);
    }
}

// 修复初始化设置
function initFixedFunctions() {
    debug('初始化修复的功能');

    // 修复保存按钮
    const saveBtn = document.getElementById('save');
    if (saveBtn) {
        debug('添加保存按钮事件');
        // 移除旧的事件监听器
        const oldSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(oldSaveBtn, saveBtn);

        // 添加新的事件监听器
        oldSaveBtn.addEventListener('click', function() {
            debug('点击保存按钮');
            saveGameFixed();
        });
    }

    // 修复加载按钮
    const loadBtn = document.getElementById('load');
    if (loadBtn) {
        debug('添加加载按钮事件');
        // 移除旧的事件监听器
        const oldLoadBtn = loadBtn.cloneNode(true);
        loadBtn.parentNode.replaceChild(oldLoadBtn, loadBtn);

        // 添加新的事件监听器
        oldLoadBtn.addEventListener('click', function() {
            debug('点击加载按钮');
            loadGameFixed();
        });
    }

    // 添加存档管理按钮事件
    const saveManagerBtn = document.getElementById('save-manager');
    if (saveManagerBtn) {
        debug('添加存档管理按钮事件');
        // 移除旧的事件监听器
        const oldSaveManagerBtn = saveManagerBtn.cloneNode(true);
        saveManagerBtn.parentNode.replaceChild(oldSaveManagerBtn, saveManagerBtn);

        // 添加新的事件监听器
        oldSaveManagerBtn.addEventListener('click', function() {
            debug('点击存档管理按钮');
            // 关闭菜单面板
            const menuPanel = document.getElementById('menu-panel');
            if (menuPanel) {
                menuPanel.style.display = 'none';
            }
            // 显示存档管理面板
            showSavePanel();
        });
    }

    // 初始化炉灶功能
    initStoveRecipeFixed();
}

// 在DOM加载完成后初始化修复的功能
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    initQuickActions();
    initFarmAndBasket();
    initPlotEvents();
    updateDOMReferences();
    initCustomerSystem();

    // 添加修复的功能初始化
    setTimeout(initFixedFunctions, 500); // 延迟执行，确保其他初始化完成

    // 启动主游戏循环
    gameLoop();

    // 确保配方显示正确更新
    setTimeout(updateRecipeDisplay, 600);

    // 监听测试页面的消息
    window.addEventListener('message', function(event) {
        console.log('收到跨窗口消息:', event.data);
        handleTestPageMessage(event.data);
    });
});

// 处理测试页面消息
function handleTestPageMessage(data) {
    console.log('处理测试页面消息:', data.type);
    switch(data.type) {
        case 'spawnCustomer':
            spawnCustomer();
            addMessage('🧑‍🤝‍🧑 测试页面生成了普通顾客');
            break;
        case 'spawnSpecialCustomer':
            spawnSpecialCustomer(data.recipe);
            addMessage(`👑 测试页面生成了特殊顾客 - ${data.recipe}`);
            break;
        case 'makeAllTeas':
            console.log('执行制作所有茶饮');
            // 自动切换到茶摊选项卡
            switchToTeaTab();
            quickAddAllTeas();
            addMessage('🍵 测试页面制作了所有茶饮');
            break;
        case 'testSpecialCustomerUnlock':
            console.log('执行特殊顾客解锁测试:', data.customerName, data.recipeName);
            testSpecialCustomerUnlockInGame(data.customerName, data.recipeName);
            addMessage(`🔓 测试特殊顾客解锁 - ${data.customerName} → ${data.recipeName}`);
            break;
        case 'updateServedCustomers':
            gameData.servedCustomers = data.count;
            addMessage(`📈 服务顾客数设置为 ${data.count}`);
            saveGame();
            notifyTestPage();
            break;
        case 'forceUnlockAllRecipes':
            forceUnlockAllRecipes();
            addMessage('🔓 已强制解锁所有配方');
            break;
        case 'resetUnlockProgress':
            resetUnlockProgressInGame();
            addMessage('🔄 已重置解锁进度');
            break;
        case 'connectionTest':
            console.log('收到测试页面连接测试');
            addMessage('🔗 测试页面连接正常');
            break;
        default:
            console.log('未知的消息类型:', data.type);
    }
}

// 生成特殊顾客（点特定配方的顾客）
function spawnSpecialCustomer(recipeName) {
    if (gameData.customer.active) {
        resetCustomer();
    }

    // 确保配方已解锁
    if (!gameData.unlockedRecipes.includes(recipeName)) {
        gameData.unlockedRecipes.push(recipeName);
    }

    const specialCustomerNames = [
        "品茶大师王老先生", "养生达人李阿姨", "茶文化研究者张教授",
        "中医药师陈医生", "茶艺师刘小姐", "文人墨客赵先生"
    ];

    const randomName = specialCustomerNames[Math.floor(Math.random() * specialCustomerNames.length)];

    gameData.customer = {
        active: true,
        name: randomName,
        teaChoice: recipeName,
        toppingChoices: [],
        patience: 120, // 特殊顾客耐心更好
        maxPatience: 120,
        isVIP: true // 标记为VIP顾客
    };

    updateCustomerDisplay();
    addMessage(`👑 特殊顾客 ${randomName} 来了！想要 ${recipeName}`);
}

// 通知测试页面数据更新
function notifyTestPage() {
    try {
        // 向所有打开的窗口发送消息
        if (window.opener) {
            window.opener.postMessage({
                type: 'gameDataUpdate',
                gameData: gameData
            }, '*');
        }

        // 向所有子窗口发送消息
        for (let i = 0; i < window.frames.length; i++) {
            window.frames[i].postMessage({
                type: 'gameDataUpdate',
                gameData: gameData
            }, '*');
        }
    } catch (error) {
        // 静默处理通信错误
        console.log('测试页面通信失败:', error.message);
    }
}

// 测试特殊顾客解锁功能
function testSpecialCustomerUnlockInGame(customerName, recipeName) {
    debug(`测试特殊顾客解锁: ${customerName} → ${recipeName}`);

    // 确保 customerVisits 存在
    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    // 在测试模式下，直接设置足够的访问次数来确保解锁
    if (isTestMode) {
        gameData.customerVisits[customerName] = 10; // 设置一个足够大的数字

        // 检查配方是否已经解锁
        const wasUnlocked = gameData.unlockedRecipes.includes(recipeName);

        // 直接解锁配方
        if (!wasUnlocked) {
            gameData.unlockedRecipes.push(recipeName);
            addMessage(`🔓 测试模式：已解锁配方 ${recipeName}`);

            // 在测试模式下也显示解锁弹窗
            setTimeout(() => {
                showRecipeUnlockStory(recipeName);
            }, 1000); // 延迟1秒显示弹窗
        }
    } else {
        // 正常模式下增加顾客访问次数
        gameData.customerVisits[customerName] = (gameData.customerVisits[customerName] || 0) + 1;

        // 检查解锁条件
        checkRecipeUnlock(customerName);
    }

    // 生成对应的特殊顾客
    spawnSpecialCustomerByName(customerName, recipeName);

    // 更新显示
    updateAllDisplays();

    saveGame();
    notifyTestPage();
}

// 根据顾客名生成特殊顾客
function spawnSpecialCustomerByName(customerName, recipeName) {
    if (gameData.customer.active) {
        resetCustomer();
    }

    // 确保配方已解锁（用于测试）
    if (!gameData.unlockedRecipes.includes(recipeName)) {
        gameData.unlockedRecipes.push(recipeName);
    }

    gameData.customer = {
        active: true,
        name: customerName,
        teaChoice: recipeName,
        toppingChoices: [],
        patience: 120,
        maxPatience: 120,
        isVIP: true,
        isSpecialCustomer: true
    };

    updateCustomerDisplay();
}

// 强制解锁所有配方
function forceUnlockAllRecipes() {
    const allRecipes = [
        '洛神玫瑰饮', '桂圆红枣茶', '焦香大麦茶', '三花决明茶', '薄荷甘草凉茶',
        '陈皮姜米茶', '冬瓜荷叶饮', '古法酸梅汤', '小吊梨汤',
        '桑菊润燥茶', '桂花酒酿饮', '蜜桃乌龙冷萃', '黄芪枸杞茶', '竹蔗茅根马蹄水'
    ];

    // 确保 unlockedRecipes 存在
    if (!gameData.unlockedRecipes) {
        gameData.unlockedRecipes = ['五味子饮', '柠檬茶'];
    }

    // 添加所有配方
    allRecipes.forEach(recipe => {
        if (!gameData.unlockedRecipes.includes(recipe)) {
            gameData.unlockedRecipes.push(recipe);
        }
    });

    // 设置足够的服务顾客数
    gameData.servedCustomers = 200;

    // 设置所有特殊顾客访问记录
    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    const specialCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];
    specialCustomers.forEach(customer => {
        gameData.customerVisits[customer] = 5;
    });

    updateRecipeDisplay();
    saveGame();
    notifyTestPage();

    debug('所有配方已强制解锁');
}

// 重置解锁进度
function resetUnlockProgressInGame() {
    gameData.servedCustomers = 0;
    gameData.unlockedRecipes = ['五味子饮', '柠檬茶']; // 只保留基础配方
    gameData.customerVisits = {};

    updateRecipeDisplay();
    saveGame();
    notifyTestPage();

    debug('解锁进度已重置');
}

// 新增：茶摊信息消息队列
let teaInfoMessages = [];
function addTeaInfoMessage(msg) {
    teaInfoMessages.push({msg, time: Date.now()});
    if (teaInfoMessages.length > 3) teaInfoMessages.shift();
    updateTeaInfoPanel();
}
function updateTeaInfoPanel() {
    const panel = document.getElementById('tea-info-panel');
    if (!panel) return;

    panel.innerHTML = teaInfoMessages.map(msgObj => `<div class="tea-info">${msgObj.msg}</div>`).join('');
    panel.style.display = teaInfoMessages.length ? 'block' : 'none';
}

// 显示存档界面
function showSavePanel() {
    debug('显示存档界面');

    // 创建存档面板
    const savePanel = document.createElement('div');
    savePanel.className = 'save-panel';
    savePanel.id = 'save-panel';

    // 添加标题和关闭按钮
    const header = document.createElement('div');
    header.className = 'save-header';
    header.innerHTML = `
        <h3>存档管理</h3>
        <button class="close-btn">×</button>
    `;

    // 添加存档插槽容器
    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'save-slots-container';

    // 创建四个存档位
    for (let i = 1; i <= 4; i++) {
        const slotKey = `teaShopSaveSlot${i}`;
        let saveInfo = { empty: true, day: 0, date: '无' };

        // 尝试读取已有存档信息
        try {
            const slotData = localStorage.getItem(slotKey);
            if (slotData) {
                const saveData = JSON.parse(slotData);
                saveInfo = {
                    empty: false,
                    day: saveData.currentDay || 0,
                    date: new Date(saveData.saveDate).toLocaleString() || '未知'
                };
            }
        } catch (e) {
            console.error(`读取存档${i}失败:`, e);
        }

        // 创建存档位元素
        const slot = document.createElement('div');
        slot.className = 'save-slot' + (saveInfo.empty ? ' empty-slot' : '');
        slot.innerHTML = `
            <div class="slot-info">
                <div class="slot-number">存档 ${i}</div>
                <div class="slot-day">${saveInfo.empty ? '- 空 -' : `第 ${saveInfo.day} 天`}</div>
                <div class="slot-date">${saveInfo.empty ? '' : saveInfo.date}</div>
            </div>
            <div class="slot-actions">
                <button class="save-btn" data-slot="${i}">保存</button>
                <button class="load-btn" data-slot="${i}" ${saveInfo.empty ? 'disabled' : ''}>读取</button>
            </div>
        `;

        slotsContainer.appendChild(slot);
    }

    // 创建导出/导入按钮区域
    const exportImportActions = document.createElement('div');
    exportImportActions.className = 'export-import-actions';
    exportImportActions.innerHTML = `
        <button id="export-save" class="action-btn export-btn">导出存档</button>
        <button id="import-save" class="action-btn import-btn">导入存档</button>
        <input type="file" id="import-file-input" accept=".json" style="display: none;">
    `;

    // 组装面板
    savePanel.appendChild(header);
    savePanel.appendChild(slotsContainer);
    savePanel.appendChild(exportImportActions);
    document.body.appendChild(savePanel);

    // 添加关闭按钮事件
    header.querySelector('.close-btn').addEventListener('click', () => {
        savePanel.remove();
    });

    // 添加保存和加载按钮事件
    const saveButtons = savePanel.querySelectorAll('.save-btn');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slotNumber = btn.getAttribute('data-slot');
            saveGameToSlot(slotNumber);
            updateSaveSlots(); // 更新存档位信息
        });
    });

    const loadButtons = savePanel.querySelectorAll('.load-btn');
    loadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slotNumber = btn.getAttribute('data-slot');
            loadGameFromSlot(slotNumber);
            savePanel.remove(); // 加载后关闭面板
        });
    });

    // 添加导出按钮事件
    const exportButton = savePanel.querySelector('#export-save');
    exportButton.addEventListener('click', () => {
        showExportDialog();
    });

    // 添加导入按钮和文件输入事件
    const importButton = savePanel.querySelector('#import-save');
    const fileInput = savePanel.querySelector('#import-file-input');

    importButton.addEventListener('click', () => {
        fileInput.click(); // 触发文件选择对话框
    });

    fileInput.addEventListener('change', (event) => {
        importSaveData(event.target.files[0]);
    });

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .save-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            max-height: 80vh;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .save-header {
            padding: 15px;
            background: #f5f5f5;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .save-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        .save-slots-container {
            padding: 15px;
            overflow-y: auto;
            flex: 1;
        }
        .save-slot {
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
        }
        .empty-slot {
            background: #f9f9f9;
        }
        .slot-info {
            flex: 1;
        }
        .slot-number {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .slot-day {
            font-size: 14px;
            color: #666;
            margin-bottom: 3px;
        }
        .slot-date {
            font-size: 12px;
            color: #999;
        }
        .slot-actions {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .save-btn, .load-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .save-btn {
            background: #4caf50;
            color: white;
        }
        .load-btn {
            background: #2196f3;
            color: white;
        }
        .load-btn:disabled {
            background: #cccccc;
            cursor: not-allowed;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .close-btn:hover {
            color: #333;
        }
        .export-import-actions {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background: #f5f5f5;
            border-top: 1px solid #eee;
        }
        .action-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            flex: 1;
            margin: 0 5px;
            text-align: center;
        }
        .export-btn {
            background: #ff9800;
            color: white;
        }
        .import-btn {
            background: #673ab7;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// 更新存档位信息
function updateSaveSlots() {
    const savePanel = document.getElementById('save-panel');
    if (!savePanel) return;

    const slots = savePanel.querySelectorAll('.save-slot');

    slots.forEach((slot, index) => {
        const slotNumber = index + 1;
        const slotKey = `teaShopSaveSlot${slotNumber}`;
        let saveInfo = { empty: true, day: 0, date: '无' };

        // 尝试读取已有存档信息
        try {
            const slotData = localStorage.getItem(slotKey);
            if (slotData) {
                const saveData = JSON.parse(slotData);
                saveInfo = {
                    empty: false,
                    day: saveData.currentDay || 0,
                    date: new Date(saveData.saveDate).toLocaleString() || '未知'
                };
            }
        } catch (e) {
            console.error(`读取存档${slotNumber}失败:`, e);
        }

        // 更新存档位显示
        slot.classList.toggle('empty-slot', saveInfo.empty);

        const dayDisplay = slot.querySelector('.slot-day');
        if (dayDisplay) {
            dayDisplay.textContent = saveInfo.empty ? '- 空 -' : `第 ${saveInfo.day} 天`;
        }

        const dateDisplay = slot.querySelector('.slot-date');
        if (dateDisplay) {
            dateDisplay.textContent = saveInfo.empty ? '' : saveInfo.date;
        }

        const loadBtn = slot.querySelector('.load-btn');
        if (loadBtn) {
            loadBtn.disabled = saveInfo.empty;
        }
    });
}

// 将游戏保存到指定存档位
function saveGameToSlot(slotNumber) {
    debug(`保存游戏到存档位 ${slotNumber}`);
    try {
        // 创建保存数据对象
        const saveData = {
            // 基础数据
            version: '1.1',
            saveDate: new Date().toISOString(),

            // 玩家资源
            seeds: gameData.seeds,
            inventory: gameData.inventory,
            coins: gameData.coins,

            // 农田数据
            plots: gameData.plots,

            // 茶饮相关
            madeTeas: gameData.madeTeas,
            teaTemps: gameData.teaTemps,
            teaMakeTimes: gameData.teaMakeTimes,
            toppings: gameData.toppings,

            // 炉灶数据
            stoves: gameData.stoves,

            // 加工台数据
            processingBoard: gameData.processingBoard,

            // 顾客数据
            customer: gameData.customer,
            lastCustomerTime: gameData.lastCustomerTime,

            // 环境数据
            currentSeason: gameData.currentSeason,
            currentWeather: gameData.currentWeather,
            currentDay: gameData.currentDay,
            daysInSeason: gameData.daysInSeason,
            weatherStartTime: gameData.weatherStartTime,

            // 收藏系统
            collectedCards: gameData.collectedCards,

            // 配方解锁系统
            unlockedRecipes: gameData.unlockedRecipes,
            customerVisits: gameData.customerVisits,

            // 其他游戏状态
            activeTab: gameData.activeTab,
            currentSlide: gameData.currentSlide,
            messages: gameData.messages
        };

        // 转换为字符串
        const saveString = JSON.stringify(saveData);

        // 存储到本地存储的指定位置
        const slotKey = `teaShopSaveSlot${slotNumber}`;
        localStorage.setItem(slotKey, saveString);

        // 显示保存成功提示
        const saveNotification = document.createElement('div');
        saveNotification.className = 'save-notification';
        saveNotification.innerHTML = `<i class="fa fa-check-circle"></i> 游戏已保存到存档${slotNumber}！`;
        document.body.appendChild(saveNotification);

        // 2秒后移除提示
        setTimeout(() => {
            saveNotification.classList.add('fadeout');
            setTimeout(() => {
                if (document.body.contains(saveNotification)) {
                    document.body.removeChild(saveNotification);
                }
            }, 500);
        }, 2000);

        addMessage(`游戏已保存到存档${slotNumber}！`);
    } catch (error) {
        console.error('保存游戏失败:', error);
        addMessage('保存游戏失败: ' + error.message, true);
    }
}

// 从指定存档位加载游戏
function loadGameFromSlot(slotNumber) {
    debug(`从存档${slotNumber}加载游戏`);
    try {
        // 从本地存储获取数据
        const slotKey = `teaShopSaveSlot${slotNumber}`;
        const saveString = localStorage.getItem(slotKey);

        if (!saveString) {
            addMessage(`存档${slotNumber}是空的，无法加载。`, true);
            return;
        }

        // 解析数据
        const saveData = JSON.parse(saveString);
        debug('加载游戏数据', saveData);

        // 更新游戏数据
        if (saveData.seeds) gameData.seeds = saveData.seeds;
        if (saveData.inventory) gameData.inventory = saveData.inventory;
        if (saveData.coins) gameData.coins = saveData.coins;

        // 使用兼容性处理函数确保田地正确加载
        if (saveData.plots) {
            gameData.plots = ensurePlotsCompatibility(saveData.plots);
        }

        if (saveData.madeTeas) gameData.madeTeas = saveData.madeTeas;
        if (saveData.teaTemps) gameData.teaTemps = saveData.teaTemps;
        if (saveData.teaMakeTimes) gameData.teaMakeTimes = saveData.teaMakeTimes;
        if (saveData.toppings) gameData.toppings = saveData.toppings;

        if (saveData.stoves) gameData.stoves = saveData.stoves;
        if (saveData.processingBoard) gameData.processingBoard = saveData.processingBoard;

        if (saveData.customer) gameData.customer = saveData.customer;
        if (saveData.lastCustomerTime) gameData.lastCustomerTime = saveData.lastCustomerTime;

        if (saveData.currentSeason) gameData.currentSeason = saveData.currentSeason;
        if (saveData.currentWeather) gameData.currentWeather = saveData.currentWeather;
        if (saveData.currentDay) gameData.currentDay = saveData.currentDay;
        if (saveData.daysInSeason) gameData.daysInSeason = saveData.daysInSeason;
        if (saveData.weatherStartTime) gameData.weatherStartTime = saveData.weatherStartTime;

        if (saveData.collectedCards) gameData.collectedCards = saveData.collectedCards;

        if (saveData.unlockedRecipes) gameData.unlockedRecipes = saveData.unlockedRecipes;
        if (saveData.customerVisits) gameData.customerVisits = saveData.customerVisits;

        if (saveData.activeTab) gameData.activeTab = saveData.activeTab;
        if (saveData.currentSlide) gameData.currentSlide = saveData.currentSlide;
        if (saveData.messages) gameData.messages = saveData.messages;

        // 更新所有显示
        updateAllDisplays();

        // 更新配方显示
        updateRecipeDisplay();

        // 检查并激活应该激活的配方
        checkAndActivateReadyRecipes();

        addMessage(`已加载存档${slotNumber}的游戏！`);
    } catch (error) {
        console.error('加载游戏失败:', error);
        addMessage('加载游戏失败: ' + error.message, true);
    }
}

// 修复保存按钮
function initFixedFunctions() {
    debug('初始化修复的功能');

    // 修复保存按钮
    const saveBtn = document.getElementById('save');
    if (saveBtn) {
        debug('添加保存按钮事件');
        // 移除旧的事件监听器
        const oldSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(oldSaveBtn, saveBtn);

        // 添加新的事件监听器 - 打开存档面板
        oldSaveBtn.addEventListener('click', function() {
            debug('点击保存按钮');
            showSavePanel();
        });
    }

    // 修复加载按钮
    const loadBtn = document.getElementById('load');
    if (loadBtn) {
        debug('添加加载按钮事件');
        // 移除旧的事件监听器
        const oldLoadBtn = loadBtn.cloneNode(true);
        loadBtn.parentNode.replaceChild(oldLoadBtn, loadBtn);

        // 添加新的事件监听器 - 打开存档面板
        oldLoadBtn.addEventListener('click', function() {
            debug('点击加载按钮');
            showSavePanel();
        });
    }

    // 初始化炉灶功能
    initStoveRecipeFixed();
}

// 在DOM加载完成后初始化修复的功能
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    initQuickActions();
    initFarmAndBasket();
    initPlotEvents();
    updateDOMReferences();
    initCustomerSystem();

    // 添加修复的功能初始化
    setTimeout(initFixedFunctions, 500); // 延迟执行，确保其他初始化完成

    // 启动主游戏循环
    gameLoop();
});

// 导出存档数据为文件
function exportSaveData() {
    debug('导出存档数据');
    try {
        // 创建保存数据对象
        const saveData = {
            // 基础数据
            version: '1.1',
            saveDate: new Date().toISOString(),

            // 玩家资源
            seeds: gameData.seeds,
            inventory: gameData.inventory,
            coins: gameData.coins,

            // 农田数据
            plots: gameData.plots,

            // 茶饮相关
            madeTeas: gameData.madeTeas,
            teaTemps: gameData.teaTemps,
            teaMakeTimes: gameData.teaMakeTimes,
            toppings: gameData.toppings,

            // 炉灶数据
            stoves: gameData.stoves,

            // 加工台数据
            processingBoard: gameData.processingBoard,

            // 顾客数据
            customer: gameData.customer,
            lastCustomerTime: gameData.lastCustomerTime,

            // 环境数据
            currentSeason: gameData.currentSeason,
            currentWeather: gameData.currentWeather,
            currentDay: gameData.currentDay,
            daysInSeason: gameData.daysInSeason,
            weatherStartTime: gameData.weatherStartTime,

            // 收藏系统
            collectedCards: gameData.collectedCards,

            // 配方解锁系统
            unlockedRecipes: gameData.unlockedRecipes,
            customerVisits: gameData.customerVisits,

            // 其他游戏状态
            activeTab: gameData.activeTab,
            currentSlide: gameData.currentSlide,
            messages: gameData.messages
        };

        // 转换为字符串
        const saveString = JSON.stringify(saveData, null, 2);

        // 创建Blob对象
        const blob = new Blob([saveString], { type: 'application/json' });

        // 创建临时URL
        const url = URL.createObjectURL(blob);

        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `茶店游戏存档_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        document.body.appendChild(a);

        // 触发下载
        a.click();

        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        // 显示成功消息
        const saveNotification = document.createElement('div');
        saveNotification.className = 'save-notification';
        saveNotification.innerHTML = `<i class="fa fa-check-circle"></i> 存档已成功导出！文件保存在您的下载文件夹中`;
        saveNotification.style.maxWidth = "300px";
        saveNotification.style.textAlign = "center";
        document.body.appendChild(saveNotification);

        // 2秒后移除提示
        setTimeout(() => {
            saveNotification.classList.add('fadeout');
            setTimeout(() => {
                if (document.body.contains(saveNotification)) {
                    document.body.removeChild(saveNotification);
                }
            }, 500);
        }, 2000);

        addMessage(`存档已成功导出！文件保存在您的下载文件夹中`);
    } catch (error) {
        console.error('导出存档失败:', error);
        addMessage('导出存档失败: ' + error.message, true);
    }
}

// 从文件导入存档数据
function importSaveData(file) {
    debug('从文件导入存档数据');

    if (!file) {
        addMessage('未选择文件，导入取消。', true);
        return;
    }

    // 检查文件类型
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        addMessage('只能导入JSON格式的存档文件！', true);
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            // 解析JSON数据
            debug('开始解析导入文件');
            const jsonString = event.target.result;
            debug('读取文件内容:', jsonString.substring(0, 100) + '...');

            let saveData;
            try {
                saveData = JSON.parse(jsonString);
                debug('解析JSON成功，检查数据结构...');
            } catch (jsonError) {
                addMessage('JSON格式无效，请确保文件未损坏！', true);
                console.error('JSON解析错误:', jsonError);
                return;
            }

            // 验证文件结构
            if (!saveData) {
                addMessage('导入文件内容为空！', true);
                return;
            }

            // 支持两种存档结构
            // 1. 完整存档结构
            if (saveData.version) {
                debug('检测到版本号，是标准存档格式');
                // 直接使用saveData对象
            }
            // 2. 从localStorage导出的存档，其中游戏数据在gameData字段
            else if (saveData.gameData) {
                debug('检测到gameData字段，是旧版存档格式');
                // 从gameData中提取数据
                saveData = saveData.gameData;
            }
            // 3. 无法识别的格式
            else {
                addMessage('无法识别的存档格式！请确保导入正确的存档文件。', true);
                debug('无法识别的存档格式:', saveData);
                return;
            }

            // 检查是否包含基本必要的字段
            const requiredFields = ['currentDay', 'seeds', 'inventory', 'plots'];
            const missingFields = requiredFields.filter(field => !saveData[field]);

            if (missingFields.length > 0) {
                addMessage(`存档格式不完整，缺少必要字段: ${missingFields.join(', ')}`, true);
                debug('缺少必要字段:', missingFields);
                return;
            }

            // 清理现有数据
            debug('清理当前游戏数据，准备导入新数据');

            // 创建一个深拷贝以避免引用问题
            const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

            debug('导入存档数据开始');

            // 完全替换游戏数据
            // 玩家资源
            gameData.seeds = deepCopy(saveData.seeds);
            gameData.inventory = deepCopy(saveData.inventory);
            gameData.coins = saveData.coins;

            // 农田数据 - 使用兼容性处理函数
            gameData.plots = ensurePlotsCompatibility(saveData.plots);

            // 茶饮相关
            gameData.madeTeas = saveData.madeTeas ? deepCopy(saveData.madeTeas) : [];
            gameData.teaTemps = saveData.teaTemps ? deepCopy(saveData.teaTemps) : {};
            gameData.teaMakeTimes = saveData.teaMakeTimes ? deepCopy(saveData.teaMakeTimes) : {};
            gameData.toppings = saveData.toppings ? deepCopy(saveData.toppings) : {};

            // 炉灶数据
            gameData.stoves = deepCopy(saveData.stoves);

            // 加工台数据
            gameData.processingBoard = deepCopy(saveData.processingBoard);

            // 顾客数据
            gameData.customer = deepCopy(saveData.customer);
            gameData.lastCustomerTime = saveData.lastCustomerTime;

            // 环境数据
            gameData.currentSeason = saveData.currentSeason;
            gameData.currentWeather = saveData.currentWeather;
            gameData.currentDay = saveData.currentDay;
            gameData.daysInSeason = saveData.daysInSeason;
            gameData.weatherStartTime = saveData.weatherStartTime;

            // 收藏系统
            gameData.collectedCards = saveData.collectedCards ? deepCopy(saveData.collectedCards) : {};

            // 配方解锁系统
            gameData.unlockedRecipes = saveData.unlockedRecipes ? deepCopy(saveData.unlockedRecipes) : ["五味子饮", "柠檬茶"];
            gameData.customerVisits = saveData.customerVisits ? deepCopy(saveData.customerVisits) : {};

            // 其他游戏状态
            gameData.activeTab = saveData.activeTab;
            gameData.currentSlide = saveData.currentSlide;
            gameData.messages = saveData.messages ? deepCopy(saveData.messages) : [];

            debug('导入存档数据完成，更新显示');

            // 更新所有显示
            updateAllDisplays();

            // 更新配方显示
            updateRecipeDisplay();

            // 检查并激活应该激活的配方
            checkAndActivateReadyRecipes();

            addMessage(`存档已成功导入！当前游戏时间：第${gameData.currentDay}天，${gameData.currentSeason}`);
        } catch (error) {
            console.error('导入存档失败:', error);
            addMessage('导入存档失败: ' + error.message, true);
            debug('导入存档错误详情:', error);
        }
    };

    reader.onerror = function() {
        addMessage('读取文件失败，请重试！', true);
    };

    // 开始读取文件
    reader.readAsText(file);
}

// 显示导出存档选择对话框
function showExportDialog() {
    debug('显示导出存档选择对话框');

    // 创建导出选择对话框
    const exportDialog = document.createElement('div');
    exportDialog.className = 'export-dialog';
    exportDialog.id = 'export-dialog';

    // 添加标题和关闭按钮
    const header = document.createElement('div');
    header.className = 'export-dialog-header';
    header.innerHTML = `
        <h3>选择要导出的存档</h3>
        <button class="close-btn">×</button>
    `;

    // 添加导出选项容器
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'export-options-container';

    // 添加"导出当前游戏"选项
    const currentGameOption = document.createElement('div');
    currentGameOption.className = 'export-option';
    currentGameOption.innerHTML = `
        <div class="option-info">
            <div class="option-title">当前游戏状态</div>
            <div class="option-description">导出正在进行中的游戏（第 ${gameData.currentDay} 天）</div>
        </div>
    `;
    currentGameOption.addEventListener('click', () => {
        exportSaveData();
        exportDialog.remove();
    });
    optionsContainer.appendChild(currentGameOption);

    // 添加分隔线
    const divider = document.createElement('div');
    divider.className = 'export-divider';
    divider.textContent = '或选择已保存的存档';
    optionsContainer.appendChild(divider);

    // 添加四个存档位选项
    let hasSlots = false;
    for (let i = 1; i <= 4; i++) {
        const slotKey = `teaShopSaveSlot${i}`;
        let saveInfo = { empty: true, day: 0, date: '无' };

        // 尝试读取已有存档信息
        try {
            const slotData = localStorage.getItem(slotKey);
            if (slotData) {
                const saveData = JSON.parse(slotData);
                saveInfo = {
                    empty: false,
                    day: saveData.currentDay || 0,
                    date: new Date(saveData.saveDate).toLocaleString() || '未知'
                };
                hasSlots = true;
            }
        } catch (e) {
            console.error(`读取存档${i}失败:`, e);
        }

        // 创建存档选项
        const slotOption = document.createElement('div');
        slotOption.className = 'export-option' + (saveInfo.empty ? ' disabled-option' : '');
        slotOption.innerHTML = `
            <div class="option-info">
                <div class="option-title">存档 ${i}</div>
                <div class="option-description">${saveInfo.empty ? '- 空 -' : `第 ${saveInfo.day} 天 (${saveInfo.date})`}</div>
            </div>
        `;

        if (!saveInfo.empty) {
            slotOption.addEventListener('click', () => {
                exportSaveFromSlot(i);
                exportDialog.remove();
            });
        }

        optionsContainer.appendChild(slotOption);
    }

    // 如果没有存档，显示提示
    if (!hasSlots) {
        const noSlotsMessage = document.createElement('div');
        noSlotsMessage.className = 'no-slots-message';
        noSlotsMessage.textContent = '没有已保存的存档';
        optionsContainer.appendChild(noSlotsMessage);
    }

    // 组装对话框
    exportDialog.appendChild(header);
    exportDialog.appendChild(optionsContainer);
    document.body.appendChild(exportDialog);

    // 添加关闭按钮事件
    header.querySelector('.close-btn').addEventListener('click', () => {
        exportDialog.remove();
    });

    // 添加对话框样式
    const style = document.createElement('style');
    style.textContent = `
        .export-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 1001;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .export-dialog-header {
            padding: 15px;
            background: #f5f5f5;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .export-dialog-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        .export-options-container {
            padding: 15px;
            max-height: 60vh;
            overflow-y: auto;
        }
        .export-option {
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            background: #fff;
            cursor: pointer;
            transition: background 0.2s;
        }
        .export-option:hover {
            background: #f9f9f9;
        }
        .export-option.disabled-option {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f9f9f9;
        }
        .option-info {
            flex: 1;
        }
        .option-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .option-description {
            font-size: 14px;
            color: #666;
        }
        .export-divider {
            text-align: center;
            margin: 15px 0;
            color: #999;
            font-size: 14px;
            position: relative;
        }
        .export-divider:before, .export-divider:after {
            content: '';
            position: absolute;
            top: 50%;
            width: 25%;
            height: 1px;
            background: #eee;
        }
        .export-divider:before {
            left: 0;
        }
        .export-divider:after {
            right: 0;
        }
        .no-slots-message {
            text-align: center;
            color: #999;
            padding: 20px 0;
            font-style: italic;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .close-btn:hover {
            color: #333;
        }
    `;
    document.head.appendChild(style);
}

// 导出指定存档位的存档
function exportSaveFromSlot(slotNumber) {
    debug(`导出存档位 ${slotNumber} 的存档`);
    try {
        // 从本地存储获取指定存档位的数据
        const slotKey = `teaShopSaveSlot${slotNumber}`;
        const saveString = localStorage.getItem(slotKey);

        if (!saveString) {
            addMessage(`存档${slotNumber}是空的，无法导出。`, true);
            return;
        }

        // 解析数据
        const saveData = JSON.parse(saveString);

        // 转换为字符串
        const exportString = JSON.stringify(saveData, null, 2);

        // 创建Blob对象
        const blob = new Blob([exportString], { type: 'application/json' });

        // 创建临时URL
        const url = URL.createObjectURL(blob);

        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `茶店游戏存档_${slotNumber}_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        document.body.appendChild(a);

        // 触发下载
        a.click();

        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        // 显示成功消息
        const saveNotification = document.createElement('div');
        saveNotification.className = 'save-notification';
        saveNotification.innerHTML = `<i class="fa fa-check-circle"></i> 存档${slotNumber}已成功导出！文件保存在您的下载文件夹中`;
        saveNotification.style.maxWidth = "300px";
        saveNotification.style.textAlign = "center";
        document.body.appendChild(saveNotification);

        // 2秒后移除提示
        setTimeout(() => {
            saveNotification.classList.add('fadeout');
            setTimeout(() => {
                if (document.body.contains(saveNotification)) {
                    document.body.removeChild(saveNotification);
                }
            }, 500);
        }, 2000);

        addMessage(`存档${slotNumber}已成功导出！文件保存在您的下载文件夹中`);
    } catch (error) {
        console.error('导出存档失败:', error);
        addMessage('导出存档失败: ' + error.message, true);
    }
}

// 检查并激活应该激活的配方
function checkAndActivateReadyRecipes() {
    debug('检查并激活应该激活的配方');
    
    if (!gameData.customerVisits || !gameData.recipeUnlockRules) {
        return;
    }
    
    let activatedCount = 0;
    
    // 遍历所有特殊顾客
    Object.entries(gameData.customerVisits).forEach(([customerName, visitCount]) => {
        // 查找对应的解锁规则
        Object.entries(gameData.recipeUnlockRules).forEach(([recipe, rule]) => {
            if (rule.customer === customerName) {
                // 如果配方已解锁，跳过
                if (gameData.unlockedRecipes.includes(recipe)) {
                    return;
                }
                
                // 检查是否达到必定解锁的次数
                if (visitCount >= rule.guaranteedOnVisit) {
                    debug(`自动激活配方: ${recipe} (顾客 ${customerName} 已来访 ${visitCount} 次，必定解锁)`);
                    
                    // 激活配方
                    gameData.unlockedRecipes.push(recipe);
                    activatedCount++;
                    
                    // 保存游戏数据
                    saveGame();
                    
                    // 显示激活消息
                    addMessage(`🎉 自动激活配方: ${recipe} (${customerName}已来访${visitCount}次)`);
                }
            }
        });
    });
    
    if (activatedCount > 0) {
        debug(`登录时自动激活了 ${activatedCount} 个配方`);
        // 更新配方显示
        updateRecipeDisplay();
        updateRecipeUnlockStatus();
    }
}

// 检查配方解锁条件
function checkRecipeUnlock(customerName) {
    debug(`检查顾客 ${customerName} 的配方解锁条件`);

    // 如果不是特殊顾客，直接返回
    if (!gameData.customerNames.includes(customerName)) {
        return false;
    }

    // 确保 customerVisits 存在
    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    // 增加来访次数（如果是测试模式，不增加次数）
    if (!gameData.testMode) {
        if (!gameData.customerVisits[customerName]) {
            gameData.customerVisits[customerName] = 1;
        } else {
            gameData.customerVisits[customerName]++;
        }
    }

    const visitCount = gameData.customerVisits[customerName] || 0;
    debug(`${customerName} 已来访 ${visitCount} 次`);

    // 检查是否有配方可以解锁
    let unlockedRecipe = null;

    // 遍历解锁规则
    Object.entries(gameData.recipeUnlockRules).forEach(([recipe, rule]) => {
        // 只检查当前顾客对应的配方
        if (rule.customer === customerName) {
            // 如果配方已解锁，跳过
            if (gameData.unlockedRecipes.includes(recipe)) {
                return;
            }

            // 在测试模式下，直接解锁配方
            if (gameData.testMode || isTestMode) {
                unlockedRecipe = recipe;
                return;
            }

            // 检查访问次数条件
            if (visitCount >= rule.visitsRequired) {
                let shouldUnlock = false;

                // 检查是否达到必定解锁的次数
                if (visitCount >= rule.guaranteedOnVisit) {
                    shouldUnlock = true;
                }
                // 否则，根据概率判断
                else if (Math.random() < rule.chance) {
                    shouldUnlock = true;
                }

                if (shouldUnlock) {
                    unlockedRecipe = recipe;
                }
            }
        }
    });

    // 如果有配方解锁
    if (unlockedRecipe) {
        debug(`解锁配方: ${unlockedRecipe}`);

        // 防止重复添加配方
        if (!gameData.unlockedRecipes.includes(unlockedRecipe)) {
            gameData.unlockedRecipes.push(unlockedRecipe);

            // 记录已显示过的故事，避免重复显示
            if (!gameData.shownRecipeStories) {
                gameData.shownRecipeStories = [];
            }

            // 只有当故事没有显示过时才显示
            if (!gameData.shownRecipeStories.includes(unlockedRecipe)) {
                gameData.shownRecipeStories.push(unlockedRecipe);

                // 显示解锁故事
                setTimeout(() => {
                    showRecipeUnlockStory(unlockedRecipe);
                }, 2000); // 延迟显示，让玩家先看到顾客离开的消息
            }

            return true;
        }
    }

    return false;
}

// 更新配方解锁状态
function updateRecipeUnlockStatus() {
    debug('更新配方解锁状态显示');

    // 查找配方面板中的所有配方项
    const recipePanel = document.getElementById('recipe-panel');
    if (!recipePanel) return;

    const servedCustomers = gameData.servedCustomers || 0;
    
    // 检查人数解锁的配方
    const unlockableRecipes = document.querySelectorAll('.unlockable-recipe');
    unlockableRecipes.forEach(recipe => {
        const unlockRequirement = parseInt(recipe.dataset.unlock);
        recipe.style.display = 'block'; // 总是显示
        
        const recipeName = recipe.querySelector('.recipe-name');
        const recipeIngredients = recipe.querySelector('.recipe-ingredients');
        
        if (servedCustomers >= unlockRequirement) {
            // 已解锁 - 显示完整信息
            if (recipeName && recipeName.textContent.includes('🔒')) {
                const recipeTitle = recipeName.textContent.replace('🔒 ', '');
                recipeName.textContent = recipeTitle;
                
                // 根据配方名称显示实际材料
                const ingredientsMap = {
                    '桑菊润燥茶': '桑叶, 杭白菊, 冰糖',
                    '桂花酒酿饮': '酒酿, 干桂花, 小圆子',
                    '蜜桃乌龙冷萃': '水蜜桃果肉, 乌龙茶包, 蜂蜜',
                    '黄芪枸杞茶': '黄芪片, 枸杞, 红枣',
                    '竹蔗茅根马蹄水': '甘蔗, 白茅根, 马蹄'
                };
                
                if (recipeIngredients && ingredientsMap[recipeTitle]) {
                    recipeIngredients.textContent = ingredientsMap[recipeTitle];
                }
            }
        }
    });
    
    // 检查特殊顾客解锁的配方
    const specialUnlockRecipes = document.querySelectorAll('.special-unlock');
    specialUnlockRecipes.forEach(recipe => {
        const customerName = recipe.dataset.customer;
        recipe.style.display = 'block'; // 总是显示
        
        // 检查是否已解锁
        const isUnlocked = gameData.unlockedRecipes && 
                          Object.entries(gameData.recipeUnlockRules).some(([recipeName, rule]) => 
                              rule.customer === customerName && gameData.unlockedRecipes.includes(recipeName)
                          );
        
        const recipeName = recipe.querySelector('.recipe-name');
        const recipeIngredients = recipe.querySelector('.recipe-ingredients');
        
        if (isUnlocked) {
            // 已解锁 - 显示完整信息
            if (recipeName && recipeName.textContent.includes('🔒')) {
                const recipeTitle = recipeName.textContent.replace('🔒 ', '');
                recipeName.textContent = recipeTitle;

                // 根据配方名称显示实际材料
                const ingredientsMap = {
                    '洛神玫瑰饮': '洛神花, 玫瑰花, 山楂',
                    '桂圆红枣茶': '桂圆, 红枣, 枸杞',
                    '焦香大麦茶': '大麦',
                    '三花决明茶': '菊花, 金银花, 决明子, 枸杞',
                    '薄荷甘草凉茶': '薄荷, 甘草',
                    '陈皮姜米茶': '陈皮, 生姜',
                    '冬瓜荷叶饮': '冬瓜, 荷叶, 薏米',
                    '古法酸梅汤': '乌梅, 山楂, 陈皮, 甘草, 桂花',
                    '小吊梨汤': '雪花梨, 银耳丝, 话梅, 枸杞'
                };
                
                if (recipeIngredients && ingredientsMap[recipeTitle]) {
                    recipeIngredients.textContent = ingredientsMap[recipeTitle];
                }
            }
        }
    });
}

// 显示配方解锁故事
function showRecipeUnlockStory(recipe) {
    debug(`显示配方解锁故事: ${recipe}`);
    const storyData = gameData.recipeStories[recipe];

    if (!storyData) {
        debug(`找不到配方 ${recipe} 的故事数据`);
        return;
    }

    // 创建故事面板
    const storyPanel = document.createElement('div');
    storyPanel.className = 'recipe-unlock-panel';
    storyPanel.innerHTML = `
        <div class="unlock-header">
            <h3>解锁新配方: ${recipe}</h3>
            <button class="close-btn">×</button>
        </div>
        <div class="unlock-content">
            <div class="unlock-image">🍵</div>
            <div class="unlock-title">${storyData.title}</div>
            <div class="unlock-story">${storyData.story}</div>
            <div class="unlock-divider"></div>
            <div class="unlock-info">
                <div class="unlock-effect"><b>功效:</b> ${storyData.effect}</div>
                <div class="unlock-ingredients"><b>材料:</b> ${gameData.recipeIngredients[recipe].join('、')}</div>
            </div>
        </div>
        <div class="unlock-footer">
            <button class="confirm-btn">我已了解</button>
        </div>
    `;

    document.body.appendChild(storyPanel);

    // 添加关闭按钮事件
    storyPanel.querySelector('.close-btn').addEventListener('click', () => {
        storyPanel.remove();
    });

    // 添加确认按钮事件
    storyPanel.querySelector('.confirm-btn').addEventListener('click', () => {
        storyPanel.remove();
        addMessage(`你已解锁新配方：${recipe}！`);
    });

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .recipe-unlock-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: fade-in 0.5s ease-out;
        }
        .unlock-header {
            padding: 15px;
            background: #7c4f3f;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .unlock-header h3 {
            margin: 0;
            font-size: 18px;
        }
        .unlock-content {
            padding: 20px;
            overflow-y: auto;
            max-height: 60vh;
        }
        .unlock-image {
            font-size: 50px;
            text-align: center;
            margin-bottom: 15px;
        }
        .unlock-title {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: #7c4f3f;
        }
        .unlock-story {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #333;
            text-align: justify;
            padding: 0 10px;
        }
        .unlock-divider {
            height: 1px;
            background: #e0e0e0;
            margin: 15px 0;
        }
        .unlock-info {
            font-size: 14px;
            color: #555;
            line-height: 1.5;
        }
        .unlock-effect, .unlock-ingredients {
            margin-bottom: 10px;
        }
        .unlock-footer {
            padding: 15px;
            background: #f5f5f5;
            border-top: 1px solid #eee;
            text-align: center;
        }
        .confirm-btn {
            padding: 10px 25px;
            background: #7c4f3f;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .confirm-btn:hover {
            background: #6a4334;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: white;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(style);

    // 播放解锁音效（如果需要）
    const unlockSound = new Audio('data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQADAAD///wRDhsF/QH8EhwO+Qj2CRMSDw75CfsNEg8TDw39A/0P/hIQEAn8+gsQEhUP/wX8/xD+Cw8UEQv/+Or3CBsSEAv/9ev1ChkWEgv88evzChwZFQ4B+u3xCR4cGBIE/O/vCB4eGhQH/e/uBx8gHBYJ/u/tBSAhHhcL/+/sBCEjIBkM/+/rAyIkIhsOAO7rAiMmJB0PAO7qASMnJh8QAPD9/RgkJyAQAPL9/RglKCEQAfP9/RcmKSMRAff9/BcnKiQSAff9/BYoKyQSAvj9+xUqLSYSAvn9+xUrLicTA/n9+xQsMCgTBPr9+xMtMSkUBPr9+xMuMioUBfv9+xIvMysUBfv9+xIwNCsVBvz9+xExNSwVBvz9/BEyNi0WCPz9/BAzNy4WCfz9/BAzOC8XCv39/A81OS8XC/39/A82OjAYDf39/A83OzEYDf39/A84PDIZDv7+/A45PTMZDv7+/A45PjMaD/7+/A46PzQaEP/+/A47QDUbEf/+/A48QTYcEv/+/A49QjcdEwD+/A4+QzgdEwH+/A4/RDkeEwL+/A5ARTofFAP+/A5BRjsfFQT+/A5CRzwgFgP+/A9DRz0hFgL9/A9FSD0iFwH9/BBGSj0jFwL9/BBHSz4kFwP9/BBISz8lFgT9/BBJTEAWFAT9/BBKTkEXEwP9/RFLTkIXEwL9/RFMUEMYEgL8/RFNUUQYEAL7/RJOUEUYEAL7/RJOUEUYEAL7/RJPUkYZEAH7/RJQUkcZEAH7/RJRUUgZEAL7/RJSU0kZDwL6/RNUVEYZDAL5/BFSVUUYCAH5/RFSVUMXCQH6/RFRVD8WCwH7/BFPUz0WCwL7/BJNUT0WDAP7/BJOUj4XEAP8/BJNUj8XEQT8/BJMUkAZEgX9/BJLUUEZEQL8/BpNUEAfAwP5/hdMTkEeBAP6/hdLTEEeBAP6/hhKS0AeBAP6/hhJSUAeBAP6/hhISEAeBAP6/hhHRkAeBAP6/hhHRkAeBAP6/hhGRUEeBAP6/hhFRD8eBAP6/hhEQz4eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBATs');
    unlockSound.volume = 0.3;
    unlockSound.play().catch(e => debug('无法播放音效', e));
}

// 测试模式功能
// 备份原始游戏数据
let originalGameData = null;
let isTestMode = false;
let testIndicator = null;

// 初始化测试模式
function initTestMode() {
    console.log('初始化测试模式...');

    // 为测试模式按钮添加事件监听器
    const testModeBtn = document.getElementById('test-mode-button');
    const testModePanel = document.getElementById('test-mode-panel');
    const testModeHeader = testModePanel ? testModePanel.querySelector('.test-header') : null;
    const closeTestModeBtn = document.getElementById('close-test-mode');
    const exitTestModeBtn = document.getElementById('exit-test-mode');
    const spawnCustomerTestBtn = document.getElementById('spawn-customer-test');
    const addTeaTestBtn = document.getElementById('add-tea-test');
    const addToppingsTestBtn = document.getElementById('add-toppings-test');
    const unlockAllTestBtn = document.getElementById('unlock-all-test');
    const testStatusText = document.getElementById('test-status-text');
    const testCustomerCount = document.getElementById('test-customer-count');
    const testRecipeCount = document.getElementById('test-recipe-count');

    // 确保基本元素存在
    if (!testModeBtn || !testModePanel || !closeTestModeBtn || !exitTestModeBtn ||
        !spawnCustomerTestBtn || !addTeaTestBtn || !testStatusText) {
        console.error('测试模式缺少必要的DOM元素');
        return;
    }

    console.log('测试模式元素已找到, 添加事件监听器...');

    // 使测试面板可拖动，使用标题作为拖动手柄
    if (testModeHeader) {
        makeDraggable(testModePanel, testModeHeader);
    }

    // 打开测试模式面板
    testModeBtn.addEventListener('click', function() {
        console.log('点击测试模式按钮');
        document.getElementById('menu-panel').style.display = 'none';
        testModePanel.style.display = 'flex';
        updateTestStatus(); // 更新测试状态显示
    });

    // 关闭测试模式面板
    closeTestModeBtn.addEventListener('click', function() {
        console.log('点击关闭测试模式面板按钮');
        testModePanel.style.display = 'none';
    });

    // 生成顾客
    spawnCustomerTestBtn.addEventListener('click', function() {
        console.log('点击生成测试顾客按钮');
        if (!isTestMode) {
            enterTestMode();
        }
        spawnTestCustomer();
        updateTestStatus();
    });

    // 快速制作茶饮
    addTeaTestBtn.addEventListener('click', function() {
        console.log('点击快速制作茶饮按钮');
        if (!isTestMode) {
            enterTestMode();
        }
        // 自动切换到茶摊选项卡
        switchToTeaTab();
        quickAddAllTeas();
        testStatusText.textContent = '已制作所有茶饮';
        updateTestStatus();
    });

    // 添加所有小料
    if (addToppingsTestBtn) {
        addToppingsTestBtn.addEventListener('click', function() {
            console.log('点击添加所有小料按钮');
            if (!isTestMode) {
                enterTestMode();
            }
            addAllToppingsForTest();
            testStatusText.textContent = '已添加所有小料';
            updateTestStatus();
        });
    }

    // 解锁所有配方
    if (unlockAllTestBtn) {
        unlockAllTestBtn.addEventListener('click', function() {
            console.log('点击解锁所有配方按钮');
            if (!isTestMode) {
                enterTestMode();
            }
            unlockAllRecipesForTest();
            testStatusText.textContent = '已解锁所有配方';
            updateTestStatus();
        });
    }

    // 退出测试模式
    exitTestModeBtn.addEventListener('click', function() {
        console.log('点击退出测试模式按钮');
        exitTestMode();
        testModePanel.style.display = 'none';
    });

    // 添加特殊顾客按钮事件监听器
    const specialCustomerBtns = document.querySelectorAll('.test-btn.special');
    specialCustomerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const customerName = this.getAttribute('data-customer');
            const recipeName = this.getAttribute('data-recipe');
            console.log(`点击特殊顾客按钮: ${customerName} → ${recipeName}`);
            testSpecialCustomer(customerName, recipeName);
        });
    });

    // 添加人数设置按钮事件监听器
    const customerCountBtns = document.querySelectorAll('.customer-count-btn');
    customerCountBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const count = parseInt(this.getAttribute('data-count'));
            console.log(`点击人数设置按钮: ${count}`);
            setCustomerCount(count);
        });
    });

    // 添加系统测试按钮事件监听器
    const checkRecipeStatusBtn = document.getElementById('check-recipe-status-btn');
    const checkCustomerVisitsBtn = document.getElementById('check-customer-visits-btn');
    const resetProgressBtn = document.getElementById('reset-progress-btn');

    if (checkRecipeStatusBtn) {
        checkRecipeStatusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('点击检查配方状态按钮');
            checkRecipeStatus();
        });
    }

    if (checkCustomerVisitsBtn) {
        checkCustomerVisitsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('点击检查顾客访问按钮');
            checkCustomerVisits();
        });
    }

    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('点击重置进度按钮');
            resetProgress();
        });
    }

    console.log('测试模式初始化完成');
}

// 进入测试模式
function enterTestMode() {
    if (!isTestMode) {
        console.log('进入测试模式');
        // 备份当前游戏数据
        originalGameData = JSON.parse(JSON.stringify(gameData));

        // 设置测试模式标记
        gameData.testMode = true;

        // 创建测试模式指示器
        if (!testIndicator) {
            testIndicator = document.createElement('div');
            testIndicator.className = 'test-mode-indicator';
            testIndicator.textContent = '测试模式';
            document.body.appendChild(testIndicator);
        } else {
            testIndicator.style.display = 'block';
        }

        // 切换到茶摊选项卡
        const teaTab = document.querySelector('.game-tab[data-tab="tea-tab"]');
        if (teaTab) {
            teaTab.click();
        }

        isTestMode = true;
        document.getElementById('test-status-text').textContent = '测试模式已启动';
        addMessage('已进入测试模式，您的游戏进度不会受到影响。');
    }
}

// 退出测试模式
function exitTestMode() {
    if (isTestMode && originalGameData) {
        console.log('退出测试模式');
        // 恢复原始游戏数据
        Object.assign(gameData, originalGameData);

        // 确保测试模式标记被清除
        gameData.testMode = false;

        // 更新所有显示
        updateAllDisplays();

        // 隐藏测试模式指示器
        if (testIndicator) {
            testIndicator.style.display = 'none';
        }

        isTestMode = false;
        document.getElementById('test-status-text').textContent = '准备就绪';
        addMessage('已退出测试模式，游戏恢复原始状态。');
    }
}

// 生成测试顾客
function spawnTestCustomer() {
    // 确保当前没有其他顾客
    if (gameData.customer.active) {
        resetCustomer();
    }

    console.log('生成特殊顾客进行测试');

    // 从特殊顾客名单中随机选择一个顾客
    const specialCustomerName = gameData.customerNames[Math.floor(Math.random() * gameData.customerNames.length)];

    // 设置一个测试顾客，随机选择一个茶饮
    const allTeas = Object.keys(gameData.recipeIngredients);
    const randomTea = allTeas[Math.floor(Math.random() * allTeas.length)];

    // 随机选择0-2个小料
    const availableToppings = Object.keys(gameData.toppings);
    const numToppings = Math.floor(Math.random() * 3);
    const toppingChoices = [];

    for (let i = 0; i < numToppings; i++) {
        const topping = availableToppings[Math.floor(Math.random() * availableToppings.length)];
        if (!toppingChoices.includes(topping)) {
            toppingChoices.push(topping);
        }
    }

    // 更新顾客状态
    gameData.customer = {
        active: true,
        name: specialCustomerName, // 使用特殊顾客名字
        isVIP: true,               // 标记为VIP顾客
        teaChoice: randomTea,
        toppingChoices: toppingChoices,
        arrivalTime: Date.now(),
        patience: 300000, // 5分钟超长耐心
        served: false,
        isTestCustomer: true       // 标记为测试顾客，避免触发故事解锁
    };

    // 显示顾客消息
    let customerMessage = `特殊顾客 ${specialCustomerName} 来到茶铺，想要一杯${randomTea}`;
    if (toppingChoices.length > 0) {
        customerMessage += `，加${toppingChoices.join('、')}`;
    }
    addMessage(customerMessage);
    document.getElementById('test-status-text').textContent = `特殊顾客 ${specialCustomerName} 已生成`;

    // 确保更新顾客显示
    updateCustomerDisplay();

    // 切换到茶摊选项卡让用户可以直接服务顾客
    const teaTab = document.querySelector('.game-tab[data-tab="tea-tab"]');
    if (teaTab) {
        teaTab.click();
    }
}

// 自动切换到茶摊选项卡
function switchToTeaTab() {
    console.log('尝试切换到茶摊选项卡');
    const teaTab = document.querySelector('.game-tab[data-tab="tea-tab"]');
    if (teaTab) {
        console.log('找到茶摊选项卡，正在切换');
        teaTab.click();
        // 确保切换成功
        setTimeout(() => {
            const activeTab = document.querySelector('.game-tab.active');
            if (activeTab && activeTab.getAttribute('data-tab') === 'tea-tab') {
                console.log('✅ 成功切换到茶摊选项卡');
            } else {
                console.log('⚠️ 切换茶摊选项卡可能失败');
            }
        }, 100);
    } else {
        console.log('❌ 未找到茶摊选项卡');
    }
}

// 快速添加所有茶饮
function quickAddAllTeas() {
    console.log('🍵 开始快速添加所有茶饮');

    // 清空现有的茶饮
    gameData.madeTeas = [];
    console.log('已清空现有茶饮');

    // 添加所有可能的茶饮（包括解锁和未解锁的）
    const allTeas = Object.keys(gameData.recipeIngredients);
    console.log('基础茶饮配方:', allTeas);

    // 添加新配方茶饮
    const newTeas = ["桑菊润燥茶", "桂花酒酿饮", "蜜桃乌龙冷萃", "黄芪枸杞茶", "竹蔗茅根马蹄水"];
    console.log('新配方茶饮:', newTeas);

    // 合并所有茶饮
    const completeTeas = [...allTeas, ...newTeas];
    console.log('总共要制作的茶饮:', completeTeas);

    completeTeas.forEach((tea, index) => {
        const teaId = 'tea-' + Date.now() + '-' + index;
        const currentTime = Date.now();

        const newTea = {
            id: teaId,
            name: tea,
            recipe: tea, // 确保有recipe字段
            makeTime: currentTime,
            hot: true, // 初始为热饮
            toppings: []
        };

        gameData.madeTeas.push(newTea);

        // 记录制作时间和温度
        gameData.teaMakeTimes[teaId] = currentTime;
        gameData.teaTemps[teaId] = 'hot';

        console.log(`添加茶饮: ${tea} (ID: ${teaId})`);
    });

    console.log(`总共添加了 ${gameData.madeTeas.length} 杯茶饮`);

    // 确保所有小料有足够的库存
    for (const topping in gameData.toppings) {
        gameData.toppings[topping] = 10; // 设置为10份
    }

    // 添加新的小料库存
    gameData.toppings["冰糖"] = 10;
    gameData.toppings["乌龙茶包"] = 10;
    gameData.toppings["干桂花"] = 10;
    gameData.toppings["小圆子"] = 10;
    gameData.toppings["酒酿"] = 10;
    gameData.toppings["水蜜桃果肉"] = 10;
    gameData.toppings["黄芪片"] = 10;

    console.log('小料库存已更新');

    // 检查茶饮显示元素
    console.log('茶饮显示元素:', elements.teaDisplay);
    console.log('小料显示元素:', elements.toppingsDisplay);

    // 强制更新显示
    console.log('开始更新显示...');
    updateTeaDisplay();
    updateToppingsDisplay();

    // 额外的强制更新
    setTimeout(() => {
        console.log('延迟更新显示...');
        updateAllDisplays();
    }, 100);

    console.log('✅ 快速添加所有茶饮完成');
}

// 确保在DOM加载完成后调用测试模式初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，准备初始化测试模式');
    // 由于initGame会在页面加载时被调用，确保我们的代码在之后运行
    setTimeout(function() {
        initTestMode();
    }, 500); // 给原始初始化留一点时间
});

// 覆盖原来的方式，保留但不依赖它
if (typeof initGame === 'function') {
    const originalInitGame = initGame;
    initGame = function() {
        const result = originalInitGame.apply(this, arguments);
        initTestMode();
        return result;
    };
}

// 添加测试模式窗口拖动功能
function makeDraggable(element, handle) {
    console.log('设置测试面板可拖动');

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (handle) {
        // 如果指定了handle，则使用handle作为拖动触发区域
        handle.onmousedown = dragMouseDown;
        handle.ontouchstart = dragTouchStart;
    } else {
        // 否则直接用元素本身
        element.onmousedown = dragMouseDown;
        element.ontouchstart = dragTouchStart;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // 获取鼠标初始位置
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e = e || window.event;
        // 阻止屏幕滚动
        e.preventDefault();
        // 获取触摸初始位置
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // 计算新位置
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // 设置元素新位置，并保持在视口内
        const newTop = (element.offsetTop - pos2);
        const newLeft = (element.offsetLeft - pos1);

        // 确保面板不会被拖出屏幕
        const maxTop = window.innerHeight - element.offsetHeight;
        const maxLeft = window.innerWidth - element.offsetWidth;

        element.style.top = Math.min(Math.max(0, newTop), maxTop) + "px";
        element.style.left = Math.min(Math.max(0, newLeft), maxLeft) + "px";
    }

    function elementTouchDrag(e) {
        e = e || window.event;
        // 阻止屏幕滚动
        e.preventDefault();
        // 计算新位置
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;

        // 设置元素新位置，并保持在视口内
        const newTop = (element.offsetTop - pos2);
        const newLeft = (element.offsetLeft - pos1);

        // 确保面板不会被拖出屏幕
        const maxTop = window.innerHeight - element.offsetHeight;
        const maxLeft = window.innerWidth - element.offsetWidth;

        element.style.top = Math.min(Math.max(0, newTop), maxTop) + "px";
        element.style.left = Math.min(Math.max(0, newLeft), maxLeft) + "px";
    }

    function closeDragElement() {
        // 停止移动
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

// 在initTestMode中添加调用拖动功能的代码
function initTestMode() {
    console.log('初始化测试模式...');

    // 为测试模式按钮添加事件监听器
    const testModeBtn = document.getElementById('test-mode-button');
    const testModePanel = document.getElementById('test-mode-panel');
    const testModeHeader = testModePanel ? testModePanel.querySelector('.test-header') : null;
    const closeTestModeBtn = document.getElementById('close-test-mode');
    const exitTestModeBtn = document.getElementById('exit-test-mode');
    const spawnCustomerTestBtn = document.getElementById('spawn-customer-test');
    const addTeaTestBtn = document.getElementById('add-tea-test');
    const testStatusText = document.getElementById('test-status-text');

    // 确保所有元素存在
    if (!testModeBtn || !testModePanel || !closeTestModeBtn || !exitTestModeBtn ||
        !spawnCustomerTestBtn || !addTeaTestBtn || !testStatusText) {
        console.error('测试模式缺少必要的DOM元素', {
            testModeBtn, testModePanel, closeTestModeBtn, exitTestModeBtn,
            spawnCustomerTestBtn, addTeaTestBtn, testStatusText
        });
        return;
    }

    console.log('测试模式元素已找到, 添加事件监听器...');

    // 使测试面板可拖动，使用标题作为拖动手柄
    if (testModeHeader) {
        makeDraggable(testModePanel, testModeHeader);
    }

    // 打开测试模式面板
    testModeBtn.addEventListener('click', function() {
        console.log('点击测试模式按钮');
        document.getElementById('menu-panel').style.display = 'none';

        // 调整面板位置到中央
        testModePanel.style.top = '10%';
        testModePanel.style.left = '5%';

        testModePanel.style.display = 'flex';
    });

    // 关闭测试模式面板但不退出测试模式
    closeTestModeBtn.addEventListener('click', function() {
        console.log('点击关闭测试模式面板按钮');
        testModePanel.style.display = 'none';
    });

    // 进入测试模式
    spawnCustomerTestBtn.addEventListener('click', function() {
        console.log('点击生成测试顾客按钮');
        if (!isTestMode) {
            enterTestMode();
        }
        // 生成测试顾客
        spawnTestCustomer();
    });

    // 快速制作茶饮
    addTeaTestBtn.addEventListener('click', function() {
        console.log('点击快速制作茶饮按钮');
        if (!isTestMode) {
            enterTestMode();
        }
        // 快速添加所有茶饮
        quickAddAllTeas();
        testStatusText.textContent = '已添加所有茶饮供测试';
    });

    // 退出测试模式
    exitTestModeBtn.addEventListener('click', function() {
        console.log('点击退出测试模式按钮');
        exitTestMode();
        testModePanel.style.display = 'none';
    });

    console.log('测试模式初始化完成');
}

// 更新测试状态显示
function updateTestStatus() {
    const testCustomerCount = document.getElementById('test-customer-count');
    const testRecipeCount = document.getElementById('test-recipe-count');

    if (testCustomerCount) {
        testCustomerCount.textContent = gameData.servedCustomers || 0;
    }

    if (testRecipeCount) {
        testRecipeCount.textContent = gameData.unlockedRecipes ? gameData.unlockedRecipes.length : 2;
    }
}

// 添加所有小料的测试功能
function addAllToppingsForTest() {
    console.log('🧂 添加所有小料库存...');

    // 基础小料
    const basicToppings = {
        "红糖": 10, "薄荷叶": 10, "姜丝": 10, "柚子丝": 10,
        "银耳丝": 10, "柠檬片": 10, "蜂蜜": 10
    };

    // 新小料
    const newToppings = {
        "冰糖": 10, "乌龙茶包": 10, "干桂花": 10,
        "小圆子": 10, "酒酿": 10, "水蜜桃果肉": 10, "黄芪片": 10
    };

    // 合并所有小料
    Object.assign(gameData.toppings, basicToppings, newToppings);

    // 更新显示
    updateToppingsDisplay();

    const totalToppings = Object.keys(gameData.toppings).length;
    addMessage(`🧂 已添加所有${totalToppings}种小料，每种10份`);
    console.log(`✅ 所有小料库存已设置为10 (总共${totalToppings}种)`);
}

// 解锁所有配方的测试功能
function unlockAllRecipesForTest() {
    console.log('🔓 解锁所有配方...');

    // 设置足够的顾客数量
    gameData.servedCustomers = 200;

    // 设置所有特殊顾客访问次数
    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    const specialCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];
    specialCustomers.forEach(customer => {
        gameData.customerVisits[customer] = 5;
    });

    // 添加所有解锁的配方
    const allRecipes = [
        '五味子饮', '柠檬茶', // 基础配方
        '洛神玫瑰饮', '桂圆红枣茶', '焦香大麦茶', '三花决明茶', '薄荷甘草凉茶',
        '陈皮姜米茶', '冬瓜荷叶饮', '古法酸梅汤', '小吊梨汤', // 特殊顾客解锁
        '桑菊润燥茶', '桂花酒酿饮', '蜜桃乌龙冷萃', '黄芪枸杞茶', '竹蔗茅根马蹄水' // 人数解锁
    ];

    const oldCount = gameData.unlockedRecipes ? gameData.unlockedRecipes.length : 2;
    gameData.unlockedRecipes = [...allRecipes];

    // 更新所有显示
    updateAllDisplays();

    addMessage(`🔓 已解锁所有${allRecipes.length}个配方，服务顾客数设置为200`);
    console.log(`✅ 所有配方解锁完成 (从${oldCount}个增加到${allRecipes.length}个)`);
}

// 测试特殊顾客功能
function testSpecialCustomer(customerName, recipeName) {
    console.log(`👑 测试特殊顾客 - ${customerName} → ${recipeName}`);

    if (!isTestMode) {
        enterTestMode();
    }

    // 使用现有的测试特殊顾客解锁功能
    testSpecialCustomerUnlockInGame(customerName, recipeName);

    // 切换到茶摊选项卡
    switchToTeaTab();

    const testStatusText = document.getElementById('test-status-text');
    if (testStatusText) {
        testStatusText.textContent = `特殊顾客 ${customerName} 已生成`;
    }

    updateTestStatus();
    addMessage(`👑 测试生成特殊顾客 ${customerName} → ${recipeName}`);
    console.log(`✅ 特殊顾客 ${customerName} 生成成功`);
}

// 设置顾客数量功能
function setCustomerCount(count) {
    console.log(`📈 设置服务顾客数为 ${count}...`);

    if (!isTestMode) {
        enterTestMode();
    }

    const oldCount = gameData.servedCustomers || 0;
    gameData.servedCustomers = count;

    // 检查并解锁对应的配方
    const unlockConditions = [
        { count: 30, recipe: '桑菊润燥茶' },
        { count: 60, recipe: '桂花酒酿饮' },
        { count: 90, recipe: '蜜桃乌龙冷萃' },
        { count: 120, recipe: '黄芪枸杞茶' },
        { count: 150, recipe: '竹蔗茅根马蹄水' }
    ];

    let newlyUnlocked = [];
    unlockConditions.forEach(condition => {
        if (count >= condition.count && !gameData.unlockedRecipes.includes(condition.recipe)) {
            gameData.unlockedRecipes.push(condition.recipe);
            newlyUnlocked.push(condition.recipe);
            console.log(`🔓 解锁配方: ${condition.recipe}`);
        }
    });

    // 更新显示
    updateAllDisplays();

    const testStatusText = document.getElementById('test-status-text');
    if (testStatusText) {
        if (newlyUnlocked.length > 0) {
            testStatusText.textContent = `设置${count}人，解锁了${newlyUnlocked.length}个配方`;
        } else {
            testStatusText.textContent = `服务顾客数已设置为 ${count} (原:${oldCount})`;
        }
    }

    updateTestStatus();

    if (newlyUnlocked.length > 0) {
        addMessage(`📈 设置服务顾客数为${count}，解锁配方：${newlyUnlocked.join('、')}`);
    } else {
        addMessage(`📈 服务顾客数已设置为 ${count}`);
    }

    console.log(`✅ 服务顾客数已设置为 ${count} (原:${oldCount})`);
}

// 检查配方状态
function checkRecipeStatus() {
    console.log('📋 检查配方状态...');

    const allRecipes = {
        // 基础配方
        '五味子饮': '基础配方',
        '柠檬茶': '基础配方',
        // 特殊顾客解锁
        '洛神玫瑰饮': '凌小路',
        '桂圆红枣茶': '花花',
        '焦香大麦茶': '江飞飞',
        '三花决明茶': '江三',
        '薄荷甘草凉茶': '江四',
        '陈皮姜米茶': '池云旗',
        '冬瓜荷叶饮': '江潮',
        '古法酸梅汤': '池惊暮',
        '小吊梨汤': '江敕封',
        // 人数解锁
        '桑菊润燥茶': '30人解锁',
        '桂花酒酿饮': '60人解锁',
        '蜜桃乌龙冷萃': '90人解锁',
        '黄芪枸杞茶': '120人解锁',
        '竹蔗茅根马蹄水': '150人解锁'
    };

    let unlockedCount = 0;
    let totalCount = Object.keys(allRecipes).length;

    console.log('🔍 详细配方状态检查:');
    console.log(`当前测试模式: ${isTestMode ? '是' : '否'}`);
    console.log(`gameData.testMode: ${gameData.testMode ? '是' : '否'}`);
    console.log(`当前解锁配方数组:`, gameData.unlockedRecipes);

    Object.entries(allRecipes).forEach(([recipe, unlockType]) => {
        const isUnlocked = gameData.unlockedRecipes && gameData.unlockedRecipes.includes(recipe);
        const status = isUnlocked ? '✅ 已解锁' : '🔒 未解锁';
        console.log(`${status} ${recipe} (${unlockType})`);
        if (isUnlocked) unlockedCount++;
    });

    console.log(`📊 当前服务顾客数: ${gameData.servedCustomers || 0}`);
    console.log(`📊 配方解锁进度: ${unlockedCount}/${totalCount}`);
    console.log(`📊 顾客访问记录:`, gameData.customerVisits);

    const testStatusText = document.getElementById('test-status-text');
    if (testStatusText) {
        testStatusText.textContent = `配方状态已检查 (${unlockedCount}/${totalCount})`;
    }
}

// 检查顾客访问记录
function checkCustomerVisits() {
    console.log('👑 检查特殊顾客访问记录...');

    const specialCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];

    if (!gameData.customerVisits) {
        console.log('⚠️ 没有顾客访问记录');
        const testStatusText = document.getElementById('test-status-text');
        if (testStatusText) {
            testStatusText.textContent = '没有顾客访问记录';
        }
        return;
    }

    let totalVisits = 0;
    specialCustomers.forEach(customer => {
        const visits = gameData.customerVisits[customer] || 0;
        console.log(`👤 ${customer}: 访问 ${visits} 次`);
        totalVisits += visits;
    });

    console.log(`📊 特殊顾客总访问次数: ${totalVisits}`);

    const testStatusText = document.getElementById('test-status-text');
    if (testStatusText) {
        testStatusText.textContent = `顾客访问已检查 (总计${totalVisits}次)`;
    }
}

// 重置解锁进度
function resetProgress() {
    console.log('🔄 重置解锁进度...');

    if (confirm('确定要重置所有解锁进度吗？')) {
        if (!isTestMode) {
            enterTestMode();
        }

        const oldRecipeCount = gameData.unlockedRecipes ? gameData.unlockedRecipes.length : 2;
        const oldCustomerCount = gameData.servedCustomers || 0;

        gameData.servedCustomers = 0;
        gameData.unlockedRecipes = ['五味子饮', '柠檬茶']; // 只保留基础配方
        gameData.customerVisits = {};

        // 更新所有显示
        updateAllDisplays();

        const testStatusText = document.getElementById('test-status-text');
        if (testStatusText) {
            testStatusText.textContent = '解锁进度已重置';
        }

        updateTestStatus();
        addMessage(`🔄 已重置解锁进度：配方${oldRecipeCount}→2个，顾客${oldCustomerCount}→0人`);
        console.log('✅ 解锁进度已重置');
    } else {
        console.log('❌ 取消重置操作');
        const testStatusText = document.getElementById('test-status-text');
        if (testStatusText) {
            testStatusText.textContent = '取消重置操作';
        }
    }
}

// 显示解锁进度面板
function showUnlockProgress() {
    const panel = document.getElementById('unlock-progress-panel');
    if (panel) {
        updateUnlockProgressDisplay();
        panel.style.display = 'block';
    }
}

// 隐藏解锁进度面板
function hideUnlockProgress() {
    const panel = document.getElementById('unlock-progress-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

// 更新解锁进度显示
function updateUnlockProgressDisplay() {
    debug('更新解锁进度显示');

    // 更新已服务顾客数量
    const servedCustomersSpan = document.getElementById('served-customers-count');
    if (servedCustomersSpan) {
        servedCustomersSpan.textContent = gameData.servedCustomers;
    }

    // 计算下一个解锁目标
    let nextUnlockInfo = "全部配方已解锁！";
    let nextRequirement = null;

    for (const [recipe, requirement] of Object.entries(gameData.recipeUnlockRequirements)) {
        if (!gameData.unlockedRecipes.includes(recipe)) {
            if (!nextRequirement || requirement < nextRequirement) {
                nextRequirement = requirement;
                nextUnlockInfo = `还需服务 ${requirement - gameData.servedCustomers} 位顾客解锁「${recipe}」`;
            }
        }
    }

    const nextUnlockSpan = document.getElementById('next-unlock-info');
    if (nextUnlockSpan) {
        nextUnlockSpan.textContent = nextUnlockInfo;
    }

    // 更新配方列表
    const recipesList = document.getElementById('unlock-recipes-list');
    if (recipesList) {
        recipesList.innerHTML = '';

        // 按解锁要求排序
        const sortedRecipes = Object.entries(gameData.recipeUnlockRequirements)
            .sort(([,a], [,b]) => a - b);

        sortedRecipes.forEach(([recipe, requirement]) => {
            const isUnlocked = gameData.unlockedRecipes.includes(recipe);
            const isNext = !isUnlocked && requirement === nextRequirement;

            const item = document.createElement('div');
            item.className = `unlock-recipe-item ${isUnlocked ? 'unlocked' : ''} ${isNext ? 'next-unlock' : ''}`;

            item.innerHTML = `
                <div class="unlock-recipe-info">
                    <div class="unlock-recipe-name">${recipe}</div>
                    <div class="unlock-recipe-requirement">需要服务 ${requirement} 位顾客</div>
                </div>
                <div class="unlock-recipe-status ${isUnlocked ? 'unlocked' : (isNext ? 'next' : 'locked')}">
                    ${isUnlocked ? '已解锁' : (isNext ? '下一个' : '未解锁')}
                </div>
            `;

            recipesList.appendChild(item);
        });
    }
}

// 隐藏菜单面板
function hideMenuPanel() {
    const menuPanel = document.getElementById('menu-panel');
    if (menuPanel) {
        menuPanel.style.display = 'none';
    }
}

// 篮子查看功能
function showBasketView() {
    const panel = document.getElementById('basket-view-panel');
    if (!panel) return;

    // 更新篮子内容
    updateBasketViewContent();

    // 显示面板
    panel.style.display = 'block';

    // 添加关闭按钮事件（如果还没有添加）
    const closeBtn = document.getElementById('close-basket-view');
    if (closeBtn) {
        closeBtn.onclick = hideBasketView;
    }
}

function hideBasketView() {
    const panel = document.getElementById('basket-view-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function updateBasketViewContent() {
    // 更新种子显示
    updateBasketSeeds();

    // 更新收获物品显示
    updateBasketMaterials();

    // 更新小料显示
    updateBasketToppingsView();
}

function updateBasketSeeds() {
    const container = document.getElementById('basket-seeds-display');
    if (!container) return;

    container.innerHTML = '';

    let hasSeeds = false;
    Object.keys(gameData.seeds).forEach(seedName => {
        const count = gameData.seeds[seedName];
        if (count > 0) {
            hasSeeds = true;
            const seedCard = createBasketItemCard('🌱', seedName, count, '种子');
            container.appendChild(seedCard);
        }
    });

    if (!hasSeeds) {
        container.innerHTML = '<div class="basket-empty">暂无种子库存</div>';
    }
}

function updateBasketMaterials() {
    const container = document.getElementById('basket-materials-display');
    if (!container) return;

    container.innerHTML = '';

    let hasMaterials = false;
    Object.keys(gameData.inventory).forEach(itemName => {
        const count = gameData.inventory[itemName];
        if (count > 0) {
            hasMaterials = true;
            const icon = getItemIcon(itemName);
            const materialCard = createBasketItemCard(icon, itemName, count, '个');
            container.appendChild(materialCard);
        }
    });

    if (!hasMaterials) {
        container.innerHTML = '<div class="basket-empty">暂无收获物品</div>';
    }
}

function updateBasketToppingsView() {
    const container = document.getElementById('basket-toppings-display');
    if (!container) return;

    container.innerHTML = '';

    let hasToppings = false;
    Object.keys(gameData.toppings).forEach(toppingName => {
        const count = gameData.toppings[toppingName];
        if (count > 0) {
            hasToppings = true;
            const icon = getToppingIcon(toppingName);
            const toppingCard = createBasketItemCard(icon, toppingName, count, '份');
            container.appendChild(toppingCard);
        }
    });

    if (!hasToppings) {
        container.innerHTML = '<div class="basket-empty">暂无小料库存</div>';
    }
}

function createBasketItemCard(icon, name, count, unit) {
    const card = document.createElement('div');
    card.className = 'basket-item-card';

    card.innerHTML = `
        <span class="basket-item-icon">${icon}</span>
        <div class="basket-item-name">${name}</div>
        <div class="basket-item-count">${count}${unit}</div>
    `;

    return card;
}

function getItemIcon(itemName) {
    const iconMap = {
        '五味子': '🫐', '乌梅': '🟫', '山楂': '🔴', '陈皮': '🍊',
        '甘草': '🌿', '桂花': '🌼', '大麦': '🌾', '菊花': '🌻',
        '金银花': '🌺', '决明子': '🌰', '枸杞': '🔴', '生姜': '🫚',
        '桂圆': '🟤', '红枣': '🟤', '薄荷': '🍀', '玫瑰花': '🌹',
        '洛神花': '🌺', '冬瓜': '🥒', '荷叶': '☘️', '薏米': '🌾',
        '雪花梨': '🍐', '话梅': '🍈', '甘蔗': '🎋', '柚子': '🍊',
        '柠檬': '🍋', '桑叶': '🌿', '杭白菊': '🌼', '水蜜桃': '🍑',
        '黄芪': '🌰', '白茅根': '🪴', '马蹄': '⚪', '糯米': '🌾',
        '米': '🌾', '蜂蜜': '🍯', '银耳': '🍄'
    };
    return iconMap[itemName] || '🌿';
}

function getToppingIcon(toppingName) {
    const iconMap = {
        '红糖': '🍯', '薄荷叶': '🌿', '姜丝': '🫚', '柚子丝': '🍋',
        '银耳丝': '🍄', '柠檬片': '🍋', '蜂蜜': '🍯', '冰糖': '❄️',
        '乌龙茶包': '🍃', '干桂花': '🌼', '小圆子': '⚪', '酒酿': '🍶',
        '水蜜桃果肉': '🍑', '黄芪片': '🌰'
    };
    return iconMap[toppingName] || '🥄';
}

// 购物车弹出窗口功能
function showCartPopup() {
    const cartPopupPanel = document.getElementById('cart-popup-panel');
    if (cartPopupPanel) {
        cartPopupPanel.style.display = 'block';
        updateCartPopup();
    }
}

function hideCartPopup() {
    const cartPopupPanel = document.getElementById('cart-popup-panel');
    if (cartPopupPanel) {
        cartPopupPanel.style.display = 'none';
    }
}

function updateCartPopup() {
    const cartPopupItemsCount = document.getElementById('cart-popup-items-count');
    const cartPopupTotal = document.getElementById('cart-popup-total');
    const cartPopupItems = document.getElementById('cart-popup-items');
    const cartPopupClearBtn = document.getElementById('cart-popup-clear');
    const cartPopupCheckoutBtn = document.getElementById('cart-popup-checkout');

    if (!cartPopupItemsCount || !cartPopupTotal || !cartPopupItems) return;

    // 更新数量和总价
    const totalItems = gameData.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = gameData.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartPopupItemsCount.textContent = totalItems;
    cartPopupTotal.textContent = totalPrice;

    // 更新商品列表
    cartPopupItems.innerHTML = '';

    if (gameData.cart.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'cart-empty-message';
        emptyMessage.textContent = '购物车是空的';
        cartPopupItems.appendChild(emptyMessage);
    } else {
        gameData.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-popup-item';

            const itemName = document.createElement('div');
            itemName.className = 'cart-popup-item-name';
            itemName.textContent = item.name;

            const itemQuantity = document.createElement('div');
            itemQuantity.className = 'cart-popup-item-quantity';
            itemQuantity.textContent = `×${item.quantity}`;

            const itemPrice = document.createElement('div');
            itemPrice.className = 'cart-popup-item-price';
            itemPrice.textContent = `${item.price * item.quantity}铜板`;

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemQuantity);
            cartItem.appendChild(itemPrice);

            cartPopupItems.appendChild(cartItem);
        });
    }

    // 更新按钮状态
    const isEmpty = gameData.cart.length === 0;
    if (cartPopupClearBtn) {
        cartPopupClearBtn.disabled = isEmpty;
    }
    if (cartPopupCheckoutBtn) {
        cartPopupCheckoutBtn.disabled = isEmpty || totalPrice > gameData.coins;
    }
}

// 显示商店弹窗
function showShopModal() {
    const shopOverlay = document.getElementById('shop-overlay');
    const shopPanel = document.getElementById('seed-panel');
    
    if (shopOverlay) {
        shopOverlay.style.display = 'block';
    }
    if (shopPanel) {
        shopPanel.style.display = 'flex';
    }
}

// 隐藏商店弹窗
function hideShopModal() {
    const shopOverlay = document.getElementById('shop-overlay');
    const shopPanel = document.getElementById('seed-panel');
    
    if (shopOverlay) {
        shopOverlay.style.display = 'none';
    }
    if (shopPanel) {
        shopPanel.style.display = 'none';
    }
}