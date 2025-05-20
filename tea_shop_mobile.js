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
        "柠檬片": 5
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
        "小吊梨汤": ["雪花梨", "银耳", "话梅", "枸杞"],
        "柠檬茶": ["柠檬"]
    },

    // 初始茶饮
    initialTeas: ["五味子饮", "古法酸梅汤", "焦香大麦茶", "三花决明茶", "陈皮姜米茶", 
                  "桂圆红枣茶", "薄荷甘草凉茶", "洛神玫瑰饮", "冬瓜荷叶饮", "小吊梨汤", "柠檬茶"],
    
    // 新增：配方解锁系统
    unlockedRecipes: ["五味子饮", "柠檬茶"], // 初始解锁的配方
    customerVisits: {}, // 记录特殊顾客来访次数
    recipeStories: {    // 配方解锁的小故事
        "古法酸梅汤": {
            customer: "池惊暮",
            title: "梅香",
            story: "长安暑夜，池惊暮执剑伏于屋脊。目标出现时，她正饮尽最后一滴酸梅汤。瓷碗坠地碎响混着喉骨断裂声，梅妃教的小方子——杀人时唇齿间该留着甜味，才不苦。",
            effect: "生津止渴，消暑解腻，健脾开胃，缓解燥热，唐代已是宫廷消暑佳饮。"
        },
        "焦香大麦茶": {
            customer: "江飞飞",
            title: "雪夜",
            story: "长安冬夜，江飞飞蜷在凌雪阁的屋檐上，指尖冻得发僵。江三翻上屋顶，扔来一壶滚烫的大麦茶：'怂样，喝两口。'茶雾氤氲里，他忽然想起幼时第一次握刀，也是这焦苦的甜香压住了颤抖。",
            effect: "暖胃消食，缓解焦虑，安定心神，适合秋冬饮用。"
        },
        "洛神玫瑰饮": {
            customer: "凌小路",
            title: "朱砂",
            story: "凌小路袖中藏着一盏温热的洛神玫瑰饮。'疏肝解郁的，好好学学，飞飞来了就做给他。跟他说就说养颜的茶方子'挑眉笑时，眼底却映着刀光，袍角还沾着血。",
            effect: "疏肝解郁，美白养颜，活血调经，适合女子日常饮用。"
        },
        "三花决明茶": {
            customer: "江三",
            title: "夜狩",
            story: "江四执刀归来，见江三伏案瞌睡，手边一盏凉透的三花决明茶。他轻叹，将外袍披上兄长肩头——却不知昨夜自己任务单上那三个名字，早已被江三的血刃划去。茶渣沉底，如未愈的旧伤。",
            effect: "清肝明目，清热解毒，缓解眼疲劳，适合长期伏案或夜视者饮用。"
        }
    },
    // 配方解锁条件
    recipeUnlockRules: {
        "古法酸梅汤": { customer: "池惊暮", visitsRequired: 2, chance: 0.3, guaranteedOnVisit: 3 },
        "焦香大麦茶": { customer: "江飞飞", visitsRequired: 2, chance: 1.0, guaranteedOnVisit: 2 },
        "三花决明茶": { customer: "江三", visitsRequired: 2, chance: 1.0, guaranteedOnVisit: 2 },
        "洛神玫瑰饮": { customer: "凌小路", visitsRequired: 1, chance: 1.0, guaranteedOnVisit: 1 },
    }
};

// 初始化材料
const MATERIALS = [
    "五味子", "乌梅", "山楂", "陈皮", "甘草", "桂花", "大麦",
    "菊花", "金银花", "决明子", "枸杞", "生姜", "桂圆", "红枣",
    "薄荷", "玫瑰花", "洛神花", "冬瓜", "荷叶", "薏米", "雪花梨",
    "话梅", "甘蔗", "柚子", "柠檬"
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

// 添加铜板
gameData.coins = 100;

// 添加购物车
gameData.cart = [];

// 添加最后点击的空地索引
gameData.lastClickedPlot = undefined;

// 添加加工配方
gameData.processingRecipes = {
    '红糖': { ingredients: ['甘蔗'], time: 10000 },
    '薄荷叶': { ingredients: ['薄荷'], time: 10000 },
    '姜丝': { ingredients: ['生姜'], time: 10000 },
    '柚子丝': { ingredients: ['柚子'], time: 10000 },
    '银耳丝': { ingredients: ['银耳'], time: 15000 },
    '柠檬片': { ingredients: ['柠檬'], time: 10000 }
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
    '银耳': { price: 3 }
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
    toppingsDisplay: document.querySelector('.toppings-display'),
    
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
    collectionBtn: document.getElementById('collection-button')
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
        
        // 检查是否解锁新配方
        const customerName = customer.name;
        customer.served = true;
        
        // 先重置顾客，避免重复检查
        setTimeout(() => {
            resetCustomer();
            // 检查解锁条件
            checkRecipeUnlock(customerName);
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
        ["红糖", "薄荷叶", "姜丝", "柚子丝", "银耳丝", "柠檬片"].forEach(topping => {
            if (gameData.toppings[topping] !== undefined) {
                const toppingItem = document.createElement('div');
                toppingItem.className = 'topping-item';
                
                // 获取小料对应的图标
                let toppingIcon = '';
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
                
                const toppingName = document.createElement('div');
                toppingName.className = 'topping-name';
                toppingName.innerHTML = `<span class="topping-icon">${toppingIcon}</span>${topping}`;
                
                const toppingCount = document.createElement('div');
                toppingCount.className = 'topping-count';
                toppingCount.textContent = `${gameData.toppings[topping]}份`;
                
                toppingItem.appendChild(toppingName);
                toppingItem.appendChild(toppingCount);
                elements.toppingsDisplay.appendChild(toppingItem);
            }
        });
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .topping-icon {
                margin-right: 5px;
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);
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
            const remainingTime = Math.ceil((gameData.processingBoard.startTime + gameData.processingBoard.duration - Date.now()) / 1000);
            processingState.textContent = `正在加工 ${gameData.processingBoard.recipe} (${remainingTime}秒)`;
        } else if (gameData.processingBoard.state === 'done') {
            processingState.textContent = `${gameData.processingBoard.recipe} 加工完成，点击收取`;
        }
    }
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
    
    // 保存按钮
    if (elements.saveBtn) {
        elements.saveBtn.addEventListener('click', saveGameFixed);
    }
    
    // 加载按钮
    if (elements.loadBtn) {
        elements.loadBtn.addEventListener('click', loadGameFixed);
    }
    
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
    if (elements.closeShopBtn && elements.seedPanel) {
        elements.closeShopBtn.addEventListener('click', () => {
            elements.seedPanel.style.display = 'none';
        });
    }
    
    // 农田操作按钮
    if (elements.farmBuySeedBtn && elements.seedPanel) {
        elements.farmBuySeedBtn.addEventListener('click', () => {
            elements.seedPanel.style.display = 'flex';
        });
    }
    
    if (elements.basketBuySeedBtn && elements.seedPanel) {
        elements.basketBuySeedBtn.addEventListener('click', () => {
            elements.seedPanel.style.display = 'flex';
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
    
    // 检查加工完成
    if (gameData.processingBoard.state === 'processing') {
        const currentTime = Date.now();
        if (currentTime - gameData.processingBoard.startTime >= gameData.processingBoard.duration) {
            gameData.processingBoard.state = 'done';
            addMessage(`${gameData.processingBoard.recipe}加工完成了。`);
            updateProcessingBoardDisplay();
        }
    }
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
                
                addMessage('游戏已成功加载！');
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
    
    initEventListeners();
    setupTabSystem();
    setupSwiper();
    updateAllDisplays();
    gameLoop();
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
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.innerHTML = `
                <div class="card-name">${name}</div>
                <div class="card-info">
                    <div class="card-count">×${cardData.count}</div>
                    <div class="card-visit">上次来访：${cardData.lastVisit}</div>
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
}

// 从购物车移除
function removeFromCart(itemName) {
    const itemIndex = gameData.cart.findIndex(item => item.name === itemName);
    
    if (itemIndex !== -1) {
        gameData.cart.splice(itemIndex, 1);
        addMessage(`已从购物车移除${itemName}。`);
        updateCartDisplay();
    }
}

// 改变购物车物品数量
function changeCartItemQuantity(itemName, change) {
    const item = gameData.cart.find(item => item.name === itemName);
    
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartDisplay();
    }
}

// 清空购物车
function clearCart() {
    gameData.cart = [];
    addMessage('已清空购物车。');
    updateCartDisplay();
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
            gameData.inventory[item.name] = (gameData.inventory[item.name] || 0) + item.quantity;
        }
    });
    
    addMessage(`你花费了${total}个铜板购买了物品。`);
    
    // 清空购物车
    gameData.cart = [];
    
    // 更新显示
    updateCoinsDisplay();
    updateCartDisplay();
    updateBasketDisplay();
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
        gameData.processingBoard.state = 'idle';
        gameData.processingBoard.recipe = null;
        // 红糖和薄荷叶直接加到小料区
        if (recipe === '红糖' || recipe === '薄荷叶') {
            gameData.toppings[recipe] = (gameData.toppings[recipe] || 0) + 1;
            addMessage(`你收取了一份${recipe}，已添加到小料区。`);
        } else {
            gameData.toppings[recipe] = (gameData.toppings[recipe] || 0) + 1;
            addMessage(`你收取了一份${recipe}，已添加到小料区。`);
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
    for (const ingredient of recipeInfo.ingredients) {
        if (!gameData.inventory[ingredient] || gameData.inventory[ingredient] <= 0) {
            missingIngredients.push(ingredient);
        }
    }
    
    if (missingIngredients.length > 0) {
        addMessage(`加工${recipeName}需要${missingIngredients.join('和')}，但你没有足够的材料。`, true);
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
        addMessage('目前没有顾客。', true);
        return;
    }
    
    // 检查是否有符合要求的茶饮
    const requiredTea = gameData.customer.teaChoice;
    const requiredToppings = gameData.customer.toppingChoices;
    
    let matchingTea = null;
    
    for (const tea of gameData.madeTeas) {
        if (tea.name === requiredTea) {
            // 检查是否有所有需要的小料
            const hasMissingToppings = requiredToppings.some(topping => !tea.toppings.includes(topping));
            
            if (!hasMissingToppings) {
                matchingTea = tea;
                break;
            }
        }
    }
    
    if (!matchingTea) {
        addMessage(`没有找到符合${gameData.customer.name}要求的茶饮。需要${requiredTea}${requiredToppings.length > 0 ? '，加' + requiredToppings.join('和') : ''}。`, true);
        return;
    }
    
    // 服务顾客
    serveTea(matchingTea.id);
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
            const item = {
                type: 'seed',
                name: this.textContent.trim(),
                price: parseInt(this.dataset.price) || 1
            };
            
            // 确保价格有效
            if (isNaN(item.price)) {
                item.price = 1;
            }
            
            debug('添加种子到购物车', item);
            addToCart(item);
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
            const item = {
                type: 'item',
                name: this.dataset.item.trim(),
                price: parseInt(this.dataset.price) || 3
            };
            
            // 确保价格有效
            if (isNaN(item.price)) {
                item.price = 3;
            }
            
            debug('添加物品到购物车', item);
            addToCart(item);
        });
    });

    // 结账按钮点击事件
    const newCheckoutBtn = document.getElementById('checkout-btn');
    if (newCheckoutBtn) {
        newCheckoutBtn.addEventListener('click', function() {
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
        });
    }
    
    // 标记商店已初始化
    shopInitialized = true;
}

function addToCart(item) {
    // 验证物品是否有效
    if (!item || !item.name || isNaN(item.price)) {
        debug('无效物品', item);
        return;
    }
    
    debug('添加物品到购物车', item);
    
    // 检查是否已经在购物车中
    const existingItem = cart.find(i => i.name === item.name && i.type === item.type);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    
    updateCartPreview();
    showAddToCartHint();
}

function updateCartPreview() {
    // 清除无效项
    cart = cart.filter(item => item && item.name && !isNaN(item.price));
    
    const itemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    document.getElementById('cart-items-count').textContent = itemsCount;
    document.getElementById('cart-total').textContent = total;
    
    // 更新购物车详细列表
    const cartPreview = document.querySelector('.cart-preview');
    const cartList = cartPreview.querySelector('.cart-list') || document.createElement('div');
    cartList.className = 'cart-list';
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'cart-empty-msg';
        emptyMsg.textContent = '购物车是空的';
        cartList.appendChild(emptyMsg);
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item-preview';
            itemDiv.textContent = `${item.name} x ${item.quantity || 1} (${item.price * (item.quantity || 1)}铜板)`;
            cartList.appendChild(itemDiv);
        });
    }
    
    // 如果购物车列表还没有添加到预览区域，就添加它
    if (!cartPreview.querySelector('.cart-list')) {
        cartPreview.insertBefore(cartList, cartPreview.lastElementChild);
    }
    
    debug('更新购物车预览', {itemsCount, total, items: cart});
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
    
    // 启动主游戏循环
    gameLoop();
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
    
    // 启动主游戏循环
    gameLoop();
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
    
    // 获取所有配方
    const recipes = Object.keys(gameData.recipeIngredients).filter(recipe => {
        // 只显示已解锁的配方
        return gameData.unlockedRecipes.includes(recipe);
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
        
        if (saveData.plots) gameData.plots = saveData.plots;
        
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
}); 

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
        
        if (saveData.plots) gameData.plots = saveData.plots;
        
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
        
        // 显示加载成功提示
        const loadNotification = document.createElement('div');
        loadNotification.className = 'save-notification';
        loadNotification.innerHTML = `<i class="fa fa-check-circle"></i> 已加载存档${slotNumber}！`;
        document.body.appendChild(loadNotification);
        
        // 2秒后移除提示
        setTimeout(() => {
            loadNotification.classList.add('fadeout');
            setTimeout(() => {
                if (document.body.contains(loadNotification)) {
                    document.body.removeChild(loadNotification);
                }
            }, 500);
        }, 2000);
        
        addMessage(`已加载存档${slotNumber}的游戏！`);
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
            
            // 农田数据
            gameData.plots = deepCopy(saveData.plots);
            
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
            
            // 为某些可能缺少的属性添加默认值
            if (!gameData.teaTemps) gameData.teaTemps = {};
            if (!gameData.teaMakeTimes) gameData.teaMakeTimes = {};
            if (!gameData.madeTeas) gameData.madeTeas = [];
            
            // 关闭存档面板
            const savePanel = document.getElementById('save-panel');
            if (savePanel) savePanel.remove();
            
            // 手动刷新当前选项卡显示
            if (gameData.activeTab) {
                // 找到对应的选项卡并点击它
                const tabButton = document.querySelector(`.game-tab[data-tab="${gameData.activeTab}"]`);
                if (tabButton) {
                    tabButton.click();
                }
            }
            
            // 显示当前状态的详细信息(调试用)
            debug('导入后的状态:', {
                天数: gameData.currentDay,
                季节: gameData.currentSeason,
                天气: gameData.currentWeather,
                铜币: gameData.coins
            });
            
            // 显示成功消息
            const loadNotification = document.createElement('div');
            loadNotification.className = 'save-notification';
            loadNotification.innerHTML = `<i class="fa fa-check-circle"></i> 存档已成功导入！游戏时间：第${gameData.currentDay}天，${gameData.currentSeason}`;
            loadNotification.style.maxWidth = "300px";
            loadNotification.style.textAlign = "center";
            document.body.appendChild(loadNotification);
            
            // 2秒后移除提示
            setTimeout(() => {
                loadNotification.classList.add('fadeout');
                setTimeout(() => {
                    if (document.body.contains(loadNotification)) {
                        document.body.removeChild(loadNotification);
                    }
                }, 500);
            }, 2000);
            
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

// 检查配方解锁条件
function checkRecipeUnlock(customerName) {
    debug(`检查顾客 ${customerName} 的配方解锁条件`);
    
    // 如果不是特殊顾客，直接返回
    if (!gameData.customerNames.includes(customerName)) {
        return false;
    }
    
    // 增加来访次数
    if (!gameData.customerVisits[customerName]) {
        gameData.customerVisits[customerName] = 1;
    } else {
        gameData.customerVisits[customerName]++;
    }
    
    const visitCount = gameData.customerVisits[customerName];
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
        gameData.unlockedRecipes.push(unlockedRecipe);
        
        // 显示解锁故事
        setTimeout(() => {
            showRecipeUnlockStory(unlockedRecipe);
        }, 2000); // 延迟显示，让玩家先看到顾客离开的消息
        
        return true;
    }
    
    return false;
}

// 更新配方解锁状态
function updateRecipeUnlockStatus() {
    debug('更新配方解锁状态显示');
    
    // 查找配方面板中的所有配方项
    const recipePanel = document.getElementById('recipe-panel');
    if (!recipePanel) return;
    
    const recipeItems = recipePanel.querySelectorAll('.recipe-item');
    
    recipeItems.forEach(item => {
        const recipeName = item.querySelector('.recipe-name').textContent;
        const isUnlocked = gameData.unlockedRecipes.includes(recipeName);
        
        // 修改显示样式
        if (isUnlocked) {
            item.classList.remove('recipe-locked');
            item.querySelector('.recipe-ingredients').style.display = 'block';
            
            // 移除锁图标（如果存在）
            const lockIcon = item.querySelector('.recipe-lock');
            if (lockIcon) lockIcon.remove();
            
            // 移除提示文本（如果存在）
            const unlockHint = item.querySelector('.unlock-hint');
            if (unlockHint) unlockHint.remove();
        } else {
            item.classList.add('recipe-locked');
            
            // 隐藏配方内容
            item.querySelector('.recipe-ingredients').style.display = 'none';
            
            // 添加锁图标（如果不存在）
            if (!item.querySelector('.recipe-lock')) {
                const lockIcon = document.createElement('div');
                lockIcon.className = 'recipe-lock';
                lockIcon.innerHTML = '🔒';
                lockIcon.style.position = 'absolute';
                lockIcon.style.right = '10px';
                lockIcon.style.top = '10px';
                lockIcon.style.fontSize = '18px';
                lockIcon.style.color = '#888';
                item.style.position = 'relative';
                item.appendChild(lockIcon);
                
                // 添加提示文本
                const unlockHint = document.createElement('div');
                unlockHint.className = 'unlock-hint';
                unlockHint.textContent = '服务特殊顾客解锁';
                unlockHint.style.fontSize = '12px';
                unlockHint.style.color = '#888';
                unlockHint.style.marginTop = '5px';
                item.appendChild(unlockHint);
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
    const unlockSound = new Audio('data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQADAAD///wRDhsF/QH8EhwO+Qj2CRMSDw75CfsNEg8TDw39A/0P/hIQEAn8+gsQEhUP/wX8/xD+Cw8UEQv/+Or3CBsSEAv/9ev1ChkWEgv88evzChwZFQ4B+u3xCR4cGBIE/O/vCB4eGhQH/e/uBx8gHBYJ/u/tBSAhHhcL/+/sBCEjIBkM/+/rAyIkIhsOAO7rAiMmJB0PAO7qASMnJh8QAPD9/RgkJyAQAPL9/RglKCEQAfP9/RcmKSMRAff9/BcnKiQSAff9/BYoKyQSAvj9/BYpLCUSAvr9+xUqLSYSAvn9+xUrLicTA/n9+xQsMCgTBPr9+xMtMSkUBPr9+xMuMioUBfv9+xIvMysUBfv9+xIwNCsVBvz9+xExNSwVBvz9/BEyNi0WCPz9/BAzNy4WCfz9/BAzOC8XCv39/A81OS8XC/39/A82OjAYDf39/A83OzEYDf39/A84PDIZDv7+/A45PTMZDv7+/A45PjMaD/7+/A46PzQaEP/+/A47QDUbEf/+/A48QTYcEv/+/A49QjcdEwD+/A4+QzgdEwH+/A4/RDkeEwL+/A5ARTofFAP+/A5BRjsfFQT+/A5CRzwgFgP+/A9DRz0hFgL9/A9FSD0iFwH9/BBGSj0jFwL9/BBHSz4kFwP9/BBISz8lFgT9/BBJTEAWFAT9/BBKTkEXEwP9/RFLTkIXEwL9/RFMUEMYEgL8/RFNUUQYEAL7/RJOUEUYEAL7/RJOUEUYEAL7/RJPUkYZEAH7/RJQUkcZEAH7/RJRUUgZEAL7/RJSU0kZDwL6/RNUVEYZDAL5/BFSVUUYCAH5/RFSVUMXCQH6/RFRVD8WCwH7/BFPUz0WCwL7/BJNUT0WDAP7/BJOUj4XEAP8/BJNUj8XEQT8/BJMUkAZEgX9/BJLUUEZEQL8/BpNUEAfAwP5/hdMTkEeBAP6/hdLTEEeBAP6/hhKS0AeBAP6/hhJSUAeBAP6/hhISEAeBAP6/hhHRkAeBAP6/hhHRkAeBAP6/hhGRUEeBAP6/hhFRD8eBAP6/hhEQz4eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBAT6/hhDQj0eBATs');
    unlockSound.volume = 0.3;
    unlockSound.play().catch(e => debug('无法播放音效', e));
}