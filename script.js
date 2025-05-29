// 🍵 可爱茶铺 - 完整游戏脚本
console.log('🍵 可爱茶铺启动中...');

// 加载管理器
class LoadingManager {
    constructor() {
        this.loadingSteps = [
            { text: '正在准备茶铺...', duration: 800 },
            { text: '正在种植茶叶...', duration: 600 },
            { text: '正在准备小料...', duration: 500 },
            { text: '正在布置厨房...', duration: 400 },
            { text: '正在迎接顾客...', duration: 300 },
            { text: '茶铺准备完成！', duration: 200 }
        ];
        this.currentStep = 0;
        this.progress = 0;
    }

    async startLoading() {
        const startSection = document.getElementById('start-section');
        const loadingSection = document.getElementById('loading-section');
        const progressFill = document.getElementById('progress-fill');
        const loadingLeaf = document.getElementById('loading-leaf');
        const loadingText = document.getElementById('loading-text');
        const loadingPercentage = document.getElementById('loading-percentage');

        // 隐藏开始按钮，显示加载进度
        startSection.style.display = 'none';
        loadingSection.style.display = 'block';

        for (let i = 0; i < this.loadingSteps.length; i++) {
            const step = this.loadingSteps[i];
            loadingText.textContent = step.text;

            // 计算进度
            const targetProgress = ((i + 1) / this.loadingSteps.length) * 100;

            // 动画更新进度条
            await this.animateProgress(progressFill, loadingLeaf, loadingPercentage, this.progress, targetProgress, step.duration);

            this.progress = targetProgress;
            this.currentStep = i + 1;
        }

        // 加载完成，隐藏加载界面，显示游戏
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';

            // 初始化游戏
            initGame();
        }, 500);
    }

    animateProgress(progressFill, loadingLeaf, loadingPercentage, fromProgress, toProgress, duration) {
        return new Promise(resolve => {
            const startTime = Date.now();
            const progressDiff = toProgress - fromProgress;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 使用缓动函数
                const easeProgress = this.easeOutCubic(progress);
                const currentProgress = fromProgress + (progressDiff * easeProgress);

                // 更新进度条
                progressFill.style.width = currentProgress + '%';
                loadingLeaf.style.left = currentProgress + '%';
                loadingPercentage.textContent = Math.round(currentProgress) + '%';

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            animate();
        });
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// 初始化加载管理器
const loadingManager = new LoadingManager();

// 页面加载完成后设置事件监听器
document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            loadingManager.startLoading();
        });
    }
});

// 游戏数据对象
const gameData = {
    // 季节和天气
    currentSeason: "春天",
    currentWeather: "晴天",
    currentDay: 1,
    seasons: ["春天", "夏天", "秋天", "冬天"],
    weathers: ["晴天", "刮风", "下雨", "下雪", "阴天"],
    weatherDuration: 120000, // 2分钟 = 120000毫秒
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
            boilDuration: 20000, // 20秒
            recipe: null
        },
        {
            state: 'empty',
            startTime: 0,
            boilDuration: 20000, // 20秒
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
        maxPatience: 120000,
        served: false
    },
    customerSpawnCooldown: 30000, // 30秒检查一次是否生成新顾客
    lastCustomerTime: 0,
    customerNames: ['池惊暮', '凌小路', '江飞飞', '江三', '江四', '池云旗', '江潮', '江敕封', '花花', '姬别情', '池九信', '狸怒'],

    // 集卡系统
    collectedCards: {},

    // 消息
    messages: ["欢迎来到可爱茶铺!"],

    // 小篮子选择相关
    selectedPlotForPlanting: null,
    selectedSeedForPlanting: null,

    // 购物车
    cart: [],

    // 货币
    coins: 100,

    // 配方解锁系统
    unlockedRecipes: ["五味子饮", "柠檬茶", "白水煮鱼"],
    customerVisits: {},
    servedCustomers: 0,

    // 配方解锁规则（按照规则MD更新）
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
    },

    // 加工配方
    processingRecipes: {
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
    },

    // 加工台
    processingBoard: {
        state: 'idle', // idle, processing
        recipe: null,
        startTime: 0,
        duration: 0
    },

    // 商店物品
    shopItems: {
        '蜂蜜': { price: 3 },
        '银耳': { price: 3 },
        '红糖': { price: 2 },
        '小鱼干': { price: 5 },
        // 新增物品
        '冰糖': { price: 3 },
        '乌龙茶包': { price: 4 }
    },

    // 人数解锁要求
    recipeUnlockRequirements: {
        "桑菊润燥茶": 30,
        "桂花酒酿饮": 60,
        "蜜桃乌龙冷萃": 90,
        "黄芪枸杞茶": 120,
        "竹蔗茅根马蹄水": 150
    },

    // 猫咪系统
    cats: {
        lastCatTime: Date.now(),           // 上次猫咪出现时间
        // catCooldown: 691200000,   // 8天冷却时间（毫秒）
        catCooldown: 259200000,   // 3天冷却时间（毫秒）
        currentCat: null,       // 当前猫咪信息
        todayVisited: false,      // 今天是否已经来过     
        intimacy: {               // 亲密度记录
            '大橘猫': 0,
            '狸花猫': 0,
            '黑猫小手套': 0,
            '小白猫': 0,
            '大猫猫': 0
        },
        feedCount: {              // 喂食次数
            '大橘猫': 0,
            '狸花猫': 0,
            '黑猫小手套': 0,
            '小白猫': 0,
            '大猫猫': 0
        },
        lastSeen: {},             // 上次见面时间
        gifts: []                 // 收到的小礼物
    },

    // 配方解锁故事（按照规则MD添加）
    recipeStories: {
        "洛神玫瑰饮": {
            title: "朱砂",
            content: "凌小路袖中藏着一盏温热的洛神玫瑰饮。'疏肝解郁的，好好学学，飞飞来了就做给他。跟他说就说养颜的茶方子'挑眉笑时，眼底却映着刀光，袍角还沾着血。",
            effect: "疏肝解郁，美白养颜，活血调经，适合女子日常饮用。"
        },
        "桂圆红枣茶": {
            title: "无归",
            content: "花花去凌雪坟前扫墓，手里拿着他最喜欢她给他做的茶。只是这一次只能自己做了。'自己给自己作茶怎么行，这方子给你们，以后我就来这里喝吧'",
            effect: "补血益气，安神养心，滋阴润燥，适合体弱或熬夜者饮用。"
        },
        "焦香大麦茶": {
            title: "雪夜",
            content: "长安冬夜，江飞飞蜷在凌雪阁的屋檐上，指尖冻得发僵。江三翻上屋顶，扔来一壶滚烫的大麦茶：'怂样，喝两口。'茶雾氤氲里，他忽然想起幼时第一次握刀，也是这焦苦的甜香压住了颤抖。",
            effect: "暖胃消食，缓解焦虑，安定心神，适合秋冬饮用。"
        },
        "三花决明茶": {
            title: "夜狩",
            content: "江四执刀归来，见江三伏案瞌睡，手边一盏凉透的三花决明茶。他轻叹，将外袍披上兄长肩头——却不知昨夜自己任务单上那三个名字，早已被江三的血刃划去。茶渣沉底，如未愈的旧伤。",
            effect: "清肝明目，清热解毒，缓解眼疲劳，适合长期伏案或夜视者饮用。"
        },
        "薄荷甘草凉茶": {
            title: "三哥",
            content: "江四给江三泡的茶，清清凉凉的，他那么爱出汗，肯定喜欢。茶叶刚放下，就听到三哥在院子里训练的刀声，他悄悄探头看了一眼，决定加多一片薄荷叶。",
            effect: "清热解暑，润喉止咳，提神醒脑，适合夏季饮用。"
        },
        "陈皮姜米茶": {
            title: "师徒",
            content: "池云旗心疼那小家伙，以前也不懂自己照顾自己，这茶是她专门给他找医师抄的方子。'别总吃那些乱七八糟的东西，胃疼了可别来找师父'虽然嘴上这么说，她还是悄悄在茶里多加了一片陈皮。",
            effect: "健脾和胃，理气化痰，温中散寒，适合消化不良或胃寒者饮用。"
        },
        "冬瓜荷叶饮": {
            title: "师徒2",
            content: "江潮给师父弄的消暑茶，荷叶是自己趴在池塘边采的，冬瓜也是自己种的。'师父，您尝尝，我按照您说的方法做的'他小心翼翼地端着茶，生怕师父不喜欢，却不知道池云旗早已欣慰地笑了。",
            effect: "清热利湿，消肿减脂，美容养颜，适合夏季消暑或减肥者饮用。"
        },
        "古法酸梅汤": {
            title: "梅香",
            content: "长安暑夜，池惊暮执剑伏于屋脊。目标出现时，她正饮尽最后一滴酸梅汤。瓷碗坠地碎响混着喉骨断裂声，梅妃教的小方子——杀人时唇齿间该留着甜味，才不苦。",
            effect: "生津止渴，消暑解腻，健脾开胃，缓解燥热，唐代已是宫廷消暑佳饮。"
        },
        "小吊梨汤": {
            title: "琴心",
            content: "江敕封抚琴时总爱在身边放一盏小吊梨汤，琴声悠扬，茶香袅袅。他说琴如人生，需要慢慢调教；茶如心境，需要细细品味。一曲终了，一盏茶尽，都是这世间最温柔的时光。",
            effect: "润肺止咳，清热降火，滋阴美容，宫廷传统滋补佳品。"
        }
    },

    // 当前活动标签
    activeTab: 'farm',
    // 当前信息滑块索引
    currentSlide: 0
};

// 初始化材料
const MATERIALS = [
    "五味子", "乌梅", "山楂", "陈皮", "甘草", "桂花", "大麦",
    "菊花", "金银花", "决明子", "枸杞", "生姜", "桂圆", "红枣",
    "薄荷", "玫瑰花", "洛神花", "冬瓜", "荷叶", "薏米", "雪花梨",
    "话梅", "甘蔗", "柚子", "柠檬", "银耳",
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
    // 种子数量初始化：只有五味子和柠檬有1个种子，其他为0
    if (material === "五味子" || material === "柠檬") {
        gameData.seeds[material] = 1;
    } else {
        gameData.seeds[material] = 0;
    }
    gameData.inventory[material] = 0; // 材料库存初始化为0，需要通过种植获得
});

// 设置特殊种子的价格和生长时间（按照规则MD）
const SPECIAL_SEED_CONFIG = {
    "桑叶": { price: 2, growTime: 45000 },      // 45秒
    "杭白菊": { price: 2, growTime: 50000 },    // 50秒
    "水蜜桃": { price: 3, growTime: 60000 },    // 60秒
    "黄芪": { price: 3, growTime: 55000 },      // 55秒
    "白茅根": { price: 2, growTime: 40000 },    // 40秒
    "马蹄": { price: 2, growTime: 45000 },      // 45秒
    "糯米": { price: 2, growTime: 50000 },      // 50秒
    "米": { price: 1, growTime: 40000 }         // 40秒
};

// 应用特殊种子配置
Object.keys(SPECIAL_SEED_CONFIG).forEach(seedName => {
    if (gameData.seedInfo[seedName]) {
        gameData.seedInfo[seedName].price = SPECIAL_SEED_CONFIG[seedName].price;
        gameData.seedInfo[seedName].growTime = SPECIAL_SEED_CONFIG[seedName].growTime;
    }
});

// 游戏状态
let isPaused = false;
let isTestMode = false;

// 调试函数
function debug(message) {
    console.log(`[可爱茶铺] ${message}`);
}

// 添加消息函数
function addMessage(message) {
    gameData.messages.push(message);
    if (gameData.messages.length > 10) {
        gameData.messages.shift(); // 保持最多10条消息
    }
    updateMessageDisplay();
}

// 更新消息显示
function updateMessageDisplay() {
    const messageText = document.getElementById('message-text');
    if (messageText && gameData.messages.length > 0) {
        messageText.textContent = gameData.messages[gameData.messages.length - 1];

        // 显示消息气泡
        const messageBubble = document.getElementById('message-bubble');
        if (messageBubble) {
            messageBubble.classList.remove('hidden');

            // 3秒后隐藏消息
            setTimeout(() => {
                messageBubble.classList.add('hidden');
            }, 3000);
        }
    }
}

// 背景音乐相关变量和函数
let backgroundMusic = null;
let isMusicPlaying = false;
let bgmList = ['music/bgm.mp3']; // 背景音乐列表
let currentBgmIndex = 0;

// 初始化背景音乐
function initBackgroundMusic() {
    try {
        // 随机选择一首背景音乐开始播放
        currentBgmIndex = Math.floor(Math.random() * bgmList.length);
        loadCurrentBgm();
        
    } catch (error) {
        console.error('❌ 背景音乐初始化失败:', error);
    }
}

// 加载当前背景音乐
function loadCurrentBgm() {
    const bgmFile = bgmList[currentBgmIndex];
    backgroundMusic = new Audio(bgmFile);
    backgroundMusic.volume = 0.1; // 背景音乐音量10%，更安静
    
    // 添加事件监听器
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log(`🎵 背景音乐加载成功: ${bgmFile}`);
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.error(`❌ 背景音乐加载失败: ${bgmFile}`, e);
    });
    
    // 音乐播放结束时，切换到下一首
    backgroundMusic.addEventListener('ended', () => {
        console.log('🎵 当前BGM播放结束，切换下一首');
        nextBgm();
    });
    
    // 尝试播放背景音乐
    playBackgroundMusic();
}

// 切换到下一首背景音乐
function nextBgm() {
    currentBgmIndex = (currentBgmIndex + 1) % bgmList.length;
    loadCurrentBgm();
}

// 播放背景音乐
function playBackgroundMusic() {
    if (backgroundMusic && !isMusicPlaying) {
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎵 背景音乐开始播放');
                    isMusicPlaying = true;
                })
                .catch(e => {
                    console.log('🔇 背景音乐需要用户交互后才能播放');
                    // 添加用户交互监听器
                    addUserInteractionListener();
                });
        }
    }
}

// 添加用户交互监听器
function addUserInteractionListener() {
    const startMusicOnInteraction = () => {
        if (backgroundMusic && !isMusicPlaying) {
            backgroundMusic.play()
                .then(() => {
                    console.log('🎵 用户交互后背景音乐开始播放');
                    isMusicPlaying = true;
                    addMessage('🎵 背景音乐已启用');
                })
                .catch(e => console.error('❌ 背景音乐播放失败:', e));
        }
        // 移除监听器
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
    };
    
    document.addEventListener('click', startMusicOnInteraction, { once: true });
    document.addEventListener('keydown', startMusicOnInteraction, { once: true });
}

// 页面加载完成后不自动初始化游戏，等待用户点击开始按钮
// document.addEventListener('DOMContentLoaded', function() {
//     debug('DOM加载完成，开始初始化游戏...');
//     initGame();
// });

// 游戏初始化函数
function initGame() {
    debug('初始化游戏...');

    // 强制更新商店数据，确保移除薄荷叶，添加小鱼干
    gameData.shopItems = {
        '蜂蜜': { price: 3 },
        '银耳': { price: 3 },
        '红糖': { price: 2 },
        '小鱼干': { price: 5 },
        '冰糖': { price: 3 },
        '乌龙茶包': { price: 4 }
    };

    // 强制确保白水煮鱼在解锁配方中
    if (!gameData.unlockedRecipes.includes('白水煮鱼')) {
        gameData.unlockedRecipes.push('白水煮鱼');
        console.log('强制添加白水煮鱼到解锁配方');
    }
    console.log('当前解锁配方:', gameData.unlockedRecipes);

    // 注册Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                debug('Service Worker 注册成功');
            })
            .catch(error => {
                debug('Service Worker 注册失败: ' + error);
            });
    }

    // 初始化背景音乐
    initBackgroundMusic();

    // 初始化界面
    initUI();

    // 初始化事件监听器
    initEventListeners();

    // 更新所有显示
    updateAllDisplays();

    // 启动游戏循环
    startGameLoop();

    // 显示欢迎消息
    addMessage('🍵 欢迎来到可爱茶铺！开始您的经营之旅吧～');

    debug('游戏初始化完成！');
}

// 初始化UI界面
function initUI() {
    debug('初始化UI界面...');

    // 初始化农场网格
    initFarmGrid();

    // 初始化厨房区域
    initKitchen();

    // 初始化茶摊区域
    initTeaShop();

    // 初始化小料网格
    initToppingsGrid();

    debug('UI界面初始化完成');
}

// 初始化农场网格
function initFarmGrid() {
    const farmGrid = document.getElementById('farm-grid');
    if (!farmGrid) return;

    farmGrid.innerHTML = '';

    gameData.plots.forEach((plot, index) => {
        const plotCard = createPlotCard(plot, index);
        farmGrid.appendChild(plotCard);
    });
}

// 创建田地卡片
function createPlotCard(plot, index) {
    const plotCard = document.createElement('div');
    plotCard.className = `plot-card ${plot.state === 'empty' ? 'empty' : ''}`;
    plotCard.dataset.plotId = index;

    plotCard.innerHTML = `
        <div class="plot-header">
            <span class="plot-number">${index + 1}</span>
            <button class="plot-action" data-plot="${index}">
                ${getPlotActionText(plot)}
            </button>
        </div>
        <div class="plot-visual">
            <div class="soil"></div>
            ${getPlotVisualContent(plot)}
        </div>
        <div class="plot-stats">
            <div class="stat">
                <span class="stat-icon" style="font-size: 14px;">💧</span>
                <span class="stat-value" style="font-size: 13px; font-weight: 600;">${plot.moisture}%</span>
            </div>
            <div class="stat">
                <span class="stat-icon" style="font-size: 14px;">🌿</span>
                <span class="stat-value" style="font-size: 13px; font-weight: 600;">${plot.fertility}%</span>
            </div>
        </div>
        ${getPlotTimerContent(plot)}
    `;

    return plotCard;
}

// 获取田地操作按钮文本
function getPlotActionText(plot) {
    switch (plot.state) {
        case 'empty':
            return '🌰 种植';
        case 'growing':
            return '🌱 生长中';
        case 'mature':
            return '🎉 收获';
        default:
            return '➕ 种植';
    }
}

// 获取田地视觉内容
function getPlotVisualContent(plot) {
    if (plot.state === 'empty') {
        return '<div class="empty-hint" style="font-size: 13px; font-weight: 600;">点击种植</div>';
    } else if (plot.state === 'growing') {
        const stageEmojis = ['🌱', '🌿', '🌸', '🌺'];
        const emoji = stageEmojis[plot.growthStage] || '🌱';
        return `<div class="plant growing">${emoji}</div>`;
    } else if (plot.state === 'mature') {
        return '<div class="plant mature">🌺</div>';
    }
    return '';
}

// 获取田地计时器内容
function getPlotTimerContent(plot) {
    if (plot.state === 'growing') {
        return '<div class="plot-timer">⏰ 生长中...</div>';
    } else if (plot.state === 'mature') {
        return '<div class="plot-ready">✨ 可以收获了！</div>';
    }
    return '<div class="plot-timer"></div>';
}

// 初始化厨房区域
function initKitchen() {
    const stovesGrid = document.getElementById('stoves-grid');
    if (!stovesGrid) return;

    stovesGrid.innerHTML = '';

    gameData.stoves.forEach((stove, index) => {
        const stoveCard = createStoveCard(stove, index);
        stovesGrid.appendChild(stoveCard);
    });

    // 初始化加工台
    initProcessingBoard();
}

// 创建炉灶卡片
function createStoveCard(stove, index) {
    const stoveCard = document.createElement('div');
    stoveCard.className = `stove-card ${stove.state === 'empty' ? 'empty' : stove.state}`;
    stoveCard.dataset.stoveId = index;

    if (stove.state === 'empty') {
        stoveCard.innerHTML = `
            <div class="stove-visual">
                <div class="pot empty">🫖</div>
            </div>
            <div class="stove-info">
                <div class="empty-text">点击制茶</div>
            </div>
            <button class="start-cooking" data-stove="${index}">开始制茶</button>
        `;
    } else if (stove.state === 'cooking') {
        const progress = getStoveProgress(stove);
        stoveCard.innerHTML = `
            <div class="stove-visual">
                <div class="fire">🔥</div>
                <div class="pot">🫖</div>
                <div class="steam">💨</div>
            </div>
            <div class="stove-info">
                <div class="recipe-name">${stove.recipe || '制茶中'}</div>
                <div class="cooking-timer">⏰ 制作中...</div>
            </div>
            <div class="cooking-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    }

    return stoveCard;
}

// 获取炉灶进度
function getStoveProgress(stove) {
    if (stove.state !== 'cooking') return 0;

    const elapsed = Date.now() - stove.startTime;
    const progress = Math.min((elapsed / stove.boilDuration) * 100, 100);
    return Math.round(progress);
}

// 初始化加工台
function initProcessingBoard() {
    const processingBoard = document.getElementById('processing-board');
    if (!processingBoard) return;

    updateProcessingBoard();
    initProcessingRecipes();
}

// 更新加工台显示
function updateProcessingBoard() {
    const processingInfo = document.getElementById('processing-info');
    const processingIngredients = document.getElementById('processing-ingredients');

    if (!processingInfo || !processingIngredients) return;

    if (gameData.processingBoard.state === 'idle') {
        processingInfo.innerHTML = '<div class="processing-status">点击选择加工配方</div>';
        processingIngredients.textContent = '🥕🌿';
    } else if (gameData.processingBoard.state === 'processing') {
        const elapsed = Date.now() - gameData.processingBoard.startTime;
        const remaining = Math.max(0, gameData.processingBoard.duration - elapsed);
        const seconds = Math.ceil(remaining / 1000);

        processingInfo.innerHTML = `
            <div class="processing-status">正在加工 ${gameData.processingBoard.recipe}</div>
            <div class="processing-timer">⏰ ${seconds}秒</div>
        `;
        processingIngredients.textContent = '⚙️🔄';
    }
}

// 初始化加工配方
function initProcessingRecipes() {
    const processingRecipes = document.getElementById('processing-recipes');
    if (!processingRecipes) return;

    processingRecipes.innerHTML = '';

    Object.keys(gameData.processingRecipes).forEach(recipeName => {
        const recipe = gameData.processingRecipes[recipeName];
        const button = document.createElement('button');
        button.className = 'recipe-chip';
        button.textContent = `${recipe.ingredients[0]}→${recipeName}`;
        button.dataset.recipe = recipeName;

        // 检查是否有足够的材料
        const hasIngredients = recipe.ingredients.every(ingredient =>
            gameData.inventory[ingredient] && gameData.inventory[ingredient] > 0
        );

        if (!hasIngredients) {
            button.classList.add('disabled');
        }

        processingRecipes.appendChild(button);
    });
}

// 初始化茶摊区域
function initTeaShop() {
    updateTeaDisplay();
}

// 更新茶饮显示
function updateTeaDisplay() {
    const teaDisplay = document.getElementById('tea-display');
    if (!teaDisplay) return;

    teaDisplay.innerHTML = '';

    if (gameData.madeTeas.length === 0) {
        teaDisplay.innerHTML = `
            <div class="no-tea-hint">
                <span class="hint-icon">🫖</span>
                <span class="hint-text">还没有制作好的茶饮哦～</span>
            </div>
        `;
        return;
    }

    gameData.madeTeas.forEach((tea, index) => {
        const teaItem = createTeaItem(tea, index);
        teaDisplay.appendChild(teaItem);
    });
}

// 创建茶饮项目
function createTeaItem(tea, index) {
    const teaItem = document.createElement('div');
    teaItem.className = 'tea-item';
    teaItem.dataset.teaId = tea.id;

    const isHot = gameData.teaTemps[tea.id] === 'hot';
    const tempClass = isHot ? 'hot' : 'cold';
    const tempIcon = isHot ? '🔥' : '❄️';
    const tempText = isHot ? '热茶' : '冰茶';
    const effectIcon = isHot ? '✨' : '❄️';

    teaItem.innerHTML = `
        <div class="tea-visual">
            <div class="tea-cup">${isHot ? '🍵' : '🧊'}</div>
            <div class="${isHot ? 'steam-effect' : 'ice-effect'}">${effectIcon}</div>
        </div>
        <div class="tea-info">
            <div class="tea-name">${tea.name}</div>
            <div class="tea-temp ${tempClass}">${tempText} ${tempIcon}</div>
        </div>
        <div class="tea-actions">
            <button class="serve-button" data-tea-index="${index}">🎉 服务顾客</button>
            <button class="add-topping" data-tea-index="${index}">➕ 加料</button>
        </div>
    `;

    return teaItem;
}

// 初始化小料网格
function initToppingsGrid() {
    updateToppingsDisplay();
}

// 更新小料显示
function updateToppingsDisplay() {
    const toppingsGrid = document.getElementById('toppings-grid');
    if (!toppingsGrid) return;

    toppingsGrid.innerHTML = '';

    Object.entries(gameData.toppings).forEach(([toppingName, count]) => {
        const toppingItem = createToppingItem(toppingName, count);
        toppingsGrid.appendChild(toppingItem);
    });
}

// 创建小料项目
function createToppingItem(toppingName, count) {
    const toppingItem = document.createElement('div');
    const hasStock = count > 0;
    toppingItem.className = `topping-item ${hasStock ? '' : 'out-of-stock'}`;
    toppingItem.dataset.topping = toppingName;

    const toppingIcon = getToppingIcon(toppingName);

    toppingItem.innerHTML = `
        <span class="topping-icon" style="opacity: ${hasStock ? '1' : '0.5'};">${toppingIcon}</span>
        <span class="topping-name" style="color: ${hasStock ? '#2E7D32' : '#999'};">${toppingName}</span>
        <span class="topping-count" style="color: ${hasStock ? '#666' : '#999'};">x${count}</span>
        ${!hasStock ? '<span class="out-of-stock-label" style="font-size: 10px; color: #FF5722; cursor: pointer;" title="点击购买种子">🛒 缺货</span>' : ''}
    `;

    // 为缺货的小料添加点击购买功能
    if (!hasStock) {
        toppingItem.style.cursor = 'pointer';
        toppingItem.addEventListener('click', () => {
            buyToppingSeed(toppingName);
        });
    }

    return toppingItem;
}

// 获取小料图标
function getToppingIcon(toppingName) {
    const icons = {
        '红糖': '🟤',
        '薄荷叶': '🌿',
        '姜丝': '🫚',
        '柚子丝': '🍊',
        '银耳丝': '🤍',
        '柠檬片': '🍋',
        '蜂蜜': '🍯',
        '冰糖': '🧊',
        '乌龙茶包': '🍃',
        '干桂花': '🌼',
        '小圆子': '⚪',
        '酒酿': '🍶',
        '水蜜桃果肉': '🍑',
        '黄芪片': '🟡'
    };
    return icons[toppingName] || '🌿';
}

// 获取种子图标 - 使用old版本的可爱图标
function getSeedIcon(material) {
    const seedIcons = {
        '五味子': '🫐',
        '乌梅': '🟫',
        '山楂': '🔴',
        '陈皮': '🍊',
        '甘草': '🌿',
        '桂花': '🌼',
        '大麦': '🌾',
        '菊花': '🌻',
        '金银花': '🌺',
        '决明子': '🌰',
        '枸杞': '🔴',
        '生姜': '🫚',
        '桂圆': '🟤',
        '红枣': '🟤',
        '薄荷': '🌿',
        '玫瑰花': '🌹',
        '洛神花': '🌺',
        '冬瓜': '🥒',
        '荷叶': '🍃',
        '薏米': '⚪',
        '雪花梨': '🍐',
        '话梅': '🟫',
        '甘蔗': '🌾',
        '柚子': '🍋',
        '柠檬': '🍋',
        '桑叶': '🌿',
        '杭白菊': '🌼',
        '水蜜桃': '🍑',
        '黄芪': '🌰',
        '白茅根': '🪴',
        '马蹄': '⚪',
        '糯米': '🌾',
        '米': '🌾'
    };
    return seedIcons[material] || '🌰';
}

// 获取物品图标（用于购物车显示）
function getItemIcon(itemName) {
    // 首先尝试种子图标
    const seedIcon = getSeedIcon(itemName);
    if (seedIcon !== '🌰') {
        return seedIcon;
    }

    // 小料和其他物品的图标
    const itemIcons = {
        '冰糖': '🧊',
        '乌龙茶包': '🍃',
        '银耳': '🍄',
        '蜂蜜': '🍯',
        '牛奶': '🥛',
        '椰汁': '🥥',
        '柠檬汁': '🍋',
        '薄荷叶': '🌿',
        '玫瑰花瓣': '🌹',
        '桂花': '🌸',
        '茉莉花': '🌼'
    };

    return itemIcons[itemName] || '🛒';
}

// 获取商店物品图标 - 使用old版本的可爱图标
function getShopItemIcon(itemName) {
    const shopIcons = {
        '蜂蜜': '🍯',
        '银耳': '🍄',
        '红糖': '🟤',
        '小鱼干': '🐟',
        '冰糖': '❄️',
        '乌龙茶包': '🍃'
    };
    return shopIcons[itemName] || '🛒';
}

// 获取顾客植物图标
function getCustomerIcon(customerName, isVIP) {
    if (!gameData.customer.active) {
        return '🌸'; // 默认花朵图标
    }

    if (isVIP) {
        // VIP顾客使用特殊植物图标
        const vipIcons = {
            '凌小路': '🌹', // 玫瑰
            '花花': '🌺', // 花朵
            '江飞飞': '🌿', // 绿叶
            '江三': '🍀', // 四叶草
            '江四': '🌱', // 幼苗
            '池云旗': '🌾', // 麦穗
            '江潮': '🍃', // 叶子
            '池惊暮': '🌼', // 小花
            '江敕封': '🌻', // 向日葵
            '姬别情': '🌷', // 郁金香
            '池九信': '🪴', // 盆栽
            '狸怒': '🌵'  // 仙人掌
        };
        return vipIcons[customerName] || '🌸';
    } else {
        // 普通顾客使用简单植物图标
        const normalIcons = ['🌸', '🌼', '🌻', '🌺', '🌷'];
        return normalIcons[Math.floor(Math.random() * normalIcons.length)];
    }
}

// 获取顾客小故事（使用配方解锁时的故事）
function getCustomerStory(customerName) {
    // 根据顾客找到对应的配方
    const customerRecipeMap = {
        '凌小路': '洛神玫瑰饮',
        '花花': '桂圆红枣茶',
        '江飞飞': '焦香大麦茶',
        '江三': '三花决明茶',
        '江四': '薄荷甘草凉茶',
        '池云旗': '陈皮姜米茶',
        '江潮': '冬瓜荷叶饮',
        '池惊暮': '古法酸梅汤',
        '江敕封': '小吊梨汤'
    };

    const recipeName = customerRecipeMap[customerName];
    if (!recipeName || !gameData.recipeStories || !gameData.recipeStories[recipeName]) {
        return null;
    }

    const recipeStory = gameData.recipeStories[recipeName];
    return {
        title: recipeStory.title,
        story: recipeStory.content,
        effect: recipeStory.effect,
        recipeName: recipeName
    };
}

// 生成机器码
function generateMachineCode() {
    // 获取浏览器指纹信息
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('茶铺指纹', 2, 2);
    const canvasFingerprint = canvas.toDataURL();

    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        canvasFingerprint.slice(-50) // 取canvas指纹的后50个字符
    ].join('|');

    // 简单哈希函数
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }

    return Math.abs(hash).toString(16).toUpperCase().slice(0, 8);
}

// 生成特殊彩蛋码
function generateEasterEggCode(customerName, visitCount) {
    if (visitCount < 10) return null;

    const machineCode = generateMachineCode();
    const timestamp = Date.now();
    const customerCode = customerName.charCodeAt(0) + customerName.charCodeAt(customerName.length - 1);

    // 组合生成唯一码
    const combined = `${machineCode}${timestamp}${customerCode}${visitCount}`;

    // 生成最终的彩蛋码
    let easterEggCode = '';
    for (let i = 0; i < combined.length; i += 3) {
        const chunk = combined.slice(i, i + 3);
        const num = parseInt(chunk, 36) || chunk.charCodeAt(0) || 1;
        easterEggCode += (num % 36).toString(36).toUpperCase();
    }

    // 格式化为 XXXX-XXXX-XXXX 的形式
    const formatted = easterEggCode.slice(0, 12).match(/.{1,4}/g)?.join('-') || 'TEA-SHOP-LOVE';

    return formatted;
}

// 初始化事件监听器
function initEventListeners() {
    debug('初始化事件监听器...');

    // 选项卡切换
    initTabSwitching();

    // 菜单按钮
    initMenuButton();

    // 农场相关事件
    initFarmEvents();

    // 厨房相关事件
    initKitchenEvents();

    // 茶摊相关事件
    initTeaShopEvents();

    // 购物车按钮
    initCartButton();

    debug('事件监听器初始化完成');
}

// 初始化选项卡切换
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加活动状态
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // 更新游戏数据
            gameData.activeTab = targetTab;

            // 刷新当前选项卡的显示
            refreshCurrentTab(targetTab);
        });
    });
}

// 刷新当前选项卡
function refreshCurrentTab(tabName) {
    switch (tabName) {
        case 'farm':
            initFarmGrid();
            break;
        case 'kitchen':
            initKitchen();
            break;
        case 'shop':
            updateTeaDisplay();
            updateToppingsDisplay();
            break;
        case 'management':
            updateManagementDisplay();
            break;
    }
}

// 初始化菜单按钮
function initMenuButton() {
    const menuButton = document.getElementById('menu-button');
    const menuPanel = document.getElementById('menu-panel');
    const closeMenu = document.getElementById('close-menu');

    if (menuButton && menuPanel) {
        menuButton.addEventListener('click', () => {
            menuPanel.style.display = 'block';
        });
    }

    if (closeMenu && menuPanel) {
        closeMenu.addEventListener('click', () => {
            menuPanel.style.display = 'none';
        });
    }

    // 菜单项事件
    initMenuItems();
}

// 初始化菜单项
function initMenuItems() {
    const saveGameBtn = document.getElementById('save-game-btn');
    const loadGameBtn = document.getElementById('load-game-btn');
    const recipeBookBtn = document.getElementById('recipe-book-btn');
    const testModeBtn = document.getElementById('test-mode-btn');
    const testWindowBtn = document.getElementById('test-window-btn');

    if (saveGameBtn) {
        saveGameBtn.addEventListener('click', () => {
            showSavePanel();
            hideMenu();
        });
    }

    if (loadGameBtn) {
        loadGameBtn.addEventListener('click', () => {
            showLoadPanel();
            hideMenu();
        });
    }

    if (recipeBookBtn) {
        recipeBookBtn.addEventListener('click', () => {
            showRecipeBook();
            hideMenu();
        });
    }

    if (testModeBtn) {
        testModeBtn.addEventListener('click', () => {
            showTestPanel();
            hideMenu();
        });
    }

    if (testWindowBtn) {
        testWindowBtn.addEventListener('click', () => {
            openTestWindow();
            hideMenu();
        });
    }
}

// 隐藏菜单
function hideMenu() {
    const menuPanel = document.getElementById('menu-panel');
    if (menuPanel) {
        menuPanel.style.display = 'none';
    }
}

// 初始化农场事件
function initFarmEvents() {
    // 田地点击事件
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('plot-action')) {
            const plotIndex = parseInt(e.target.dataset.plot);
            handlePlotAction(plotIndex);
        }
    });

    // 快捷操作按钮
    const waterAllBtn = document.getElementById('water-all-btn');
    const fertilizeAllBtn = document.getElementById('fertilize-all-btn');
    const basketBtn = document.getElementById('basket-btn');

    if (waterAllBtn) {
        waterAllBtn.addEventListener('click', () => {
            waterAllPlots();
        });
    }

    if (fertilizeAllBtn) {
        fertilizeAllBtn.addEventListener('click', () => {
            fertilizeAllPlots();
        });
    }

    if (basketBtn) {
        basketBtn.addEventListener('click', () => {
            showBasketPanel();
        });
    }
}

// 处理田地操作
function handlePlotAction(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state === 'empty') {
        // 种植操作
        showBasketPanel(plotIndex);
    } else if (plot.state === 'mature') {
        // 收获操作
        harvestPlot(plotIndex);
    }
}

// 收获田地
function harvestPlot(plotIndex) {
    const plot = gameData.plots[plotIndex];

    if (plot.state !== 'mature') return;

    const harvestedItem = plot.plantType;
    const harvestAmount = Math.floor(Math.random() * 3) + 2; // 2-4个

    // 添加到库存
    if (!gameData.inventory[harvestedItem]) {
        gameData.inventory[harvestedItem] = 0;
    }
    gameData.inventory[harvestedItem] += harvestAmount;

    // 重置田地
    plot.state = 'empty';
    plot.growthStage = 0;
    plot.stageStartTime = 0;
    plot.plantType = null;
    plot.moisture = Math.max(plot.moisture - 20, 0);
    plot.fertility = Math.max(plot.fertility - 15, 0);

    addMessage(`🎉 收获了 ${harvestAmount} 个 ${harvestedItem}`);

    // 刷新显示
    initFarmGrid();
}

// 浇水所有田地
function waterAllPlots() {
    let wateredCount = 0;

    gameData.plots.forEach(plot => {
        if (plot.moisture < 100) {
            plot.moisture = Math.min(plot.moisture + 30, 100);
            wateredCount++;
        }
    });

    if (wateredCount > 0) {
        addMessage(`💧 为 ${wateredCount} 块田地浇了水`);
        initFarmGrid();
    } else {
        addMessage('💧 所有田地的湿度都很充足');
    }
}

// 施肥所有田地
function fertilizeAllPlots() {
    let fertilizedCount = 0;

    gameData.plots.forEach(plot => {
        if (plot.fertility < 100) {
            plot.fertility = Math.min(plot.fertility + 25, 100);
            fertilizedCount++;
        }
    });

    if (fertilizedCount > 0) {
        addMessage(`🌿 为 ${fertilizedCount} 块田地施了肥`);
        initFarmGrid();
    } else {
        addMessage('🌿 所有田地的肥力都很充足');
    }
}

// 初始化厨房事件
function initKitchenEvents() {
    // 炉灶点击事件
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-cooking')) {
            const stoveIndex = parseInt(e.target.dataset.stove);
            startCooking(stoveIndex);
        }
    });

    // 加工配方点击事件
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('recipe-chip') && !e.target.classList.contains('disabled')) {
            const recipeName = e.target.dataset.recipe;
            startProcessing(recipeName);
        }
    });
}

// 开始制茶
function startCooking(stoveIndex) {
    const stove = gameData.stoves[stoveIndex];

    if (stove.state !== 'empty') return;

    // 显示配方选择面板
    showRecipeSelectionPanel(stoveIndex);
}

// 显示配方选择面板
function showRecipeSelectionPanel(stoveIndex) {
    const panel = document.createElement('div');
    panel.className = 'recipe-selection-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow-y: auto;
        min-width: 350px;
    `;

    // 获取所有已解锁的配方（不管材料是否足够）
    const unlockedRecipes = gameData.unlockedRecipes;
    console.log('解锁的配方:', unlockedRecipes); // 调试信息
    console.log('白水煮鱼是否在列表中:', unlockedRecipes.includes('白水煮鱼')); // 调试信息

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #2E7D32;">🍵 选择制茶配方</h3>
            <button class="close-recipe-selection" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div style="margin-bottom: 15px; color: #666; font-size: 14px;">
            为炉灶${stoveIndex + 1}选择要制作的茶饮：
        </div>
        <div class="recipe-options" style="display: grid; gap: 12px;">
            ${unlockedRecipes.length > 0 ? unlockedRecipes.map(recipe => {
                const ingredients = getRecipeIngredients(recipe);
                const canMake = canMakeRecipe(recipe);
                const missingIngredients = getMissingIngredients(recipe);

                return `
                    <div class="recipe-card" style="
                        background: ${canMake ? '#E8F5E8' : '#FFF5F5'};
                        border: 2px solid ${canMake ? '#4CAF50' : '#FF9800'};
                        border-radius: 12px;
                        padding: 16px;
                        transition: all 0.3s ease;
                        position: relative;
                        cursor: pointer;
                    " data-recipe="${recipe}" data-stove="${stoveIndex}">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <div style="flex: 1; margin-right: 12px;">
                                <div style="font-weight: bold; color: ${canMake ? '#2E7D32' : '#E65100'}; font-size: 16px; margin-bottom: 6px;">
                                    ${canMake ? '✅' : '❌'} ${recipe}
                                </div>
                                <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                                    所需材料：${ingredients.join('、')}
                                </div>
                                ${!canMake ? `
                                    <div style="font-size: 11px; color: #D32F2F; background: #FFEBEE; padding: 4px 8px; border-radius: 6px; display: inline-block;">
                                        缺少：${missingIngredients.join('、')}
                                    </div>
                                ` : `
                                    <div style="font-size: 11px; color: #4CAF50; background: #E8F5E8; padding: 4px 8px; border-radius: 6px; display: inline-block;">
                                        ✅ 材料充足
                                    </div>
                                `}
                            </div>
                            ${!canMake ? `
                                <button class="buy-seeds-btn" data-missing-ingredients='${JSON.stringify(missingIngredients)}' style="
                                    background: linear-gradient(135deg, #4CAF50, #45a049);
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    padding: 6px 12px;
                                    font-size: 11px;
                                    font-weight: 500;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
                                    white-space: nowrap;
                                    flex-shrink: 0;
                                    z-index: 2;
                                    position: relative;
                                " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(76, 175, 80, 0.4)'"
                                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(76, 175, 80, 0.3)'">
                                    购买种子
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('') : '<div style="text-align: center; color: #999; padding: 20px;">暂无已解锁的配方</div>'}
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-recipe-selection').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    panel.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // 如果点击的是购买种子按钮，不触发配方选择
            if (e.target.classList.contains('buy-seeds-btn')) {
                return;
            }

            const recipeName = card.dataset.recipe;
            const stoveIndex = parseInt(card.dataset.stove);

            // 检查是否可以制作
            if (canMakeRecipe(recipeName)) {
                // 开始制作选中的配方
                startCookingRecipe(stoveIndex, recipeName);
                document.body.removeChild(panel);
            } else {
                // 显示缺少材料信息，但不关闭面板
                const missingIngredients = getMissingIngredients(recipeName);
                addMessage(`❌ 无法制作${recipeName}，缺少材料：${missingIngredients.join('、')}。可以点击"购买种子"按钮购买所需种子。`);
            }
        });

        card.addEventListener('mouseenter', () => {
            if (canMakeRecipe(card.dataset.recipe)) {
                card.style.background = '#C8E6C9';
                card.style.borderColor = '#388E3C';
            }
        });

        card.addEventListener('mouseleave', () => {
            const canMake = canMakeRecipe(card.dataset.recipe);
            card.style.background = canMake ? '#E8F5E8' : '#FFF5F5';
            card.style.borderColor = canMake ? '#4CAF50' : '#FF9800';
        });
    });

    // 购买种子按钮事件
    panel.querySelectorAll('.buy-seeds-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡到配方按钮
            const missingIngredients = JSON.parse(btn.dataset.missingIngredients);
            buyMissingSeeds(missingIngredients, panel, stoveIndex);
        });
    });
}

// 开始制作指定配方
function startCookingRecipe(stoveIndex, recipeName) {
    const stove = gameData.stoves[stoveIndex];

    if (stove.state !== 'empty') {
        addMessage('❌ 炉灶正在使用中');
        return;
    }

    if (!canMakeRecipe(recipeName)) {
        const missingIngredients = getMissingIngredients(recipeName);
        const allIngredients = getRecipeIngredients(recipeName);
        const availableIngredients = allIngredients.filter(ingredient =>
            gameData.inventory[ingredient] && gameData.inventory[ingredient] > 0
        );

        let message = `❌ 制作${recipeName}失败！缺少材料：${missingIngredients.join('、')}`;
        if (availableIngredients.length > 0) {
            message += `。已有材料：${availableIngredients.map(ing => `${ing}(${gameData.inventory[ing]})`).join('、')}`;
        }
        addMessage(message);
        debug(`制作茶饮失败 - 配方: ${recipeName}, 所需材料: ${allIngredients.join('、')}, 缺少: ${missingIngredients.join('、')}, 当前库存:`, gameData.inventory);
        return;
    }

    // 消耗材料
    const recipeIngredients = getRecipeIngredients(recipeName);
    recipeIngredients.forEach(ingredient => {
        gameData.inventory[ingredient]--;
    });

    // 开始制茶
    stove.state = 'cooking';
    stove.recipe = recipeName;
    stove.startTime = Date.now();

    // 播放炉灶音效
    const fireAudio = new Audio('music/fire.mp3');
    fireAudio.volume = 0.1; // 音量10%，更温和
    fireAudio.play().catch(e => console.log('炉灶音效播放失败', e));
    
    // 3秒后停止炉灶音效，避免持续播放
    setTimeout(() => {
        if (fireAudio) {
            fireAudio.pause();
            fireAudio.currentTime = 0;
        }
    }, 3000);

    addMessage(`🔥 开始制作 ${recipeName}`);

    // 刷新显示
    initKitchen();
}

// 检查是否可以制作配方
function canMakeRecipe(recipeName) {
    const ingredients = getRecipeIngredients(recipeName);
    return ingredients.every(ingredient =>
        gameData.inventory[ingredient] && gameData.inventory[ingredient] > 0
    );
}

// 获取缺少的材料
function getMissingIngredients(recipeName) {
    const ingredients = getRecipeIngredients(recipeName);
    const missing = [];

    for (const ingredient of ingredients) {
        if (!gameData.inventory[ingredient] || gameData.inventory[ingredient] <= 0) {
            missing.push(ingredient);
        }
    }

    return missing;
}

// 获取配方所需材料（按照规则MD更新）
function getRecipeIngredients(recipeName) {
    const recipeIngredients = {
        // 基础配方（简单配方）
        '五味子饮': ['五味子'],
        '柠檬茶': ['柠檬'],

        // 特殊顾客解锁配方（按规则MD修正）
        '洛神玫瑰饮': ['洛神花', '玫瑰花', '山楂'],
        '桂圆红枣茶': ['桂圆', '红枣', '枸杞'],
        '焦香大麦茶': ['大麦'],
        '三花决明茶': ['菊花', '金银花', '决明子', '枸杞'],
        '薄荷甘草凉茶': ['薄荷', '甘草'],
        '陈皮姜米茶': ['陈皮', '生姜'],
        '冬瓜荷叶饮': ['冬瓜', '荷叶', '薏米'],
        '古法酸梅汤': ['乌梅', '山楂', '陈皮', '甘草', '桂花'],
        '小吊梨汤': ['雪花梨', '银耳', '话梅', '枸杞'],

        // 人数解锁配方
        '桑菊润燥茶': ['桑叶', '杭白菊'],
        '桂花酒酿饮': ['桂花', '酒酿'],
        '蜜桃乌龙冷萃': ['水蜜桃', '乌龙茶包'],
        '黄芪枸杞茶': ['黄芪', '枸杞'],
        '竹蔗茅根马蹄水': ['甘蔗', '白茅根', '马蹄'],

        // 猫咪专用配方
        '白水煮鱼': ['小鱼干']
    };

    return recipeIngredients[recipeName] || [];
}

// 购买缺少的种子或材料
function buyMissingSeeds(missingIngredients, panel, stoveIndex) {
    // 检查是否是白水煮鱼的小鱼干
    if (missingIngredients.includes('小鱼干')) {
        buyFishForWhiteFish(panel, stoveIndex);
        return;
    }

    let totalCost = 0;
    const seedsToBuy = [];

    // 计算需要购买的种子和总费用
    missingIngredients.forEach(ingredient => {
        if (gameData.seedInfo[ingredient]) {
            const seedPrice = gameData.seedInfo[ingredient].price;
            totalCost += seedPrice;
            seedsToBuy.push({
                name: ingredient,
                price: seedPrice
            });
        }
    });

    if (seedsToBuy.length === 0) {
        addMessage('❌ 这些材料无法通过购买种子获得');
        return;
    }

    // 检查金币是否足够
    if (gameData.coins < totalCost) {
        addMessage(`❌ 金币不足！需要 ${totalCost} 金币，但只有 ${gameData.coins} 金币`);
        return;
    }

    // 显示自定义确认弹窗
    const seedNames = seedsToBuy.map(seed => `${seed.name}(${seed.price}金币)`).join('、');
    showPurchaseConfirmDialog(seedNames, totalCost, () => {
        // 确认购买后的回调
        // 扣除金币
        gameData.coins -= totalCost;

        // 添加种子到seeds（种植系统使用的是seeds）
        seedsToBuy.forEach(seed => {
            gameData.seeds[seed.name] = (gameData.seeds[seed.name] || 0) + 1;
        });

        addMessage(`🛒 成功购买种子：${seedsToBuy.map(s => s.name).join('、')}，花费 ${totalCost} 金币`);

        // 播放金币音效
        const moneyAudio = new Audio('music/money.mp3');
        moneyAudio.volume = 0.1; // 音量10%
        moneyAudio.play().catch(e => console.log('金币音效播放失败', e));

        // 更新显示
        updateAllDisplays();

        // 关闭配方选择面板并重新打开，以显示更新后的状态
        document.body.removeChild(panel);
        setTimeout(() => {
            showRecipeSelectionPanel(stoveIndex);
        }, 100);
    });
}

// 购买小鱼干（白水煮鱼专用）
function buyFishForWhiteFish(panel, stoveIndex) {
    const fishPrice = 5; // 小鱼干价格5金币
    
    // 检查金币是否足够
    if (gameData.coins < fishPrice) {
        addMessage(`❌ 金币不足！需要 ${fishPrice} 金币，但只有 ${gameData.coins} 金币`);
        return;
    }

    // 显示专门的小鱼干购买确认弹窗
    showFishPurchaseDialog(fishPrice, () => {
        // 确认购买后的回调
        // 扣除金币
        gameData.coins -= fishPrice;

        // 添加小鱼干到inventory
        gameData.inventory['小鱼干'] = (gameData.inventory['小鱼干'] || 0) + 1;

        addMessage(`🐟 成功购买小鱼干，花费 ${fishPrice} 金币`);

        // 播放金币音效
        const moneyAudio = new Audio('music/money.mp3');
        moneyAudio.volume = 0.1; // 音量10%
        moneyAudio.play().catch(e => console.log('金币音效播放失败', e));

        // 更新显示
        updateAllDisplays();

        // 关闭配方选择面板并重新打开，以显示更新后的状态
        document.body.removeChild(panel);
        setTimeout(() => {
            showRecipeSelectionPanel(stoveIndex);
        }, 100);
    });
}

// 显示购买确认弹窗
function showPurchaseConfirmDialog(seedNames, totalCost, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'purchase-confirm-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(76, 175, 80, 0.95);
        color: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        z-index: 1003;
        max-width: 400px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
            🛒 确认购买种子
        </div>
        <div style="font-size: 14px; margin-bottom: 12px; line-height: 1.4;">
            ${seedNames}
        </div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px; color: #FFE082;">
            总费用：${totalCost} 金币
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="confirm-purchase-btn" style="
                background: rgba(255, 255, 255, 0.9);
                color: #2E7D32;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">确认购买</button>
            <button class="cancel-purchase-btn" style="
                background: rgba(244, 67, 54, 0.8);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">取消</button>
        </div>
    `;

    document.body.appendChild(dialog);

    // 添加事件监听器
    dialog.querySelector('.confirm-purchase-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
        onConfirm();
    });

    dialog.querySelector('.cancel-purchase-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });

    // 添加悬停效果
    dialog.querySelector('.confirm-purchase-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = 'white';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.confirm-purchase-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
    });

    dialog.querySelector('.cancel-purchase-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = '#f44336';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.cancel-purchase-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(244, 67, 54, 0.8)';
        e.target.style.transform = 'scale(1)';
    });
}

// 显示绿色确认弹窗（通用函数）
function showGreenConfirmDialog(title, message, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'green-confirm-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(76, 175, 80, 0.95);
        color: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        z-index: 1003;
        max-width: 400px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
            ${title}
        </div>
        <div style="font-size: 14px; margin-bottom: 20px; line-height: 1.4; white-space: pre-line;">
            ${message}
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="confirm-dialog-btn" style="
                background: rgba(255, 255, 255, 0.9);
                color: #2E7D32;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">确认</button>
            <button class="cancel-dialog-btn" style="
                background: rgba(244, 67, 54, 0.8);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">取消</button>
        </div>
    `;

    document.body.appendChild(dialog);

    // 添加事件监听器
    dialog.querySelector('.confirm-dialog-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
        onConfirm();
    });

    dialog.querySelector('.cancel-dialog-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });

    // 添加悬停效果
    dialog.querySelector('.confirm-dialog-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = 'white';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.confirm-dialog-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
    });

    dialog.querySelector('.cancel-dialog-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = '#f44336';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.cancel-dialog-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(244, 67, 54, 0.8)';
        e.target.style.transform = 'scale(1)';
    });
}
// 购买小料的种子（茶摊缺货时一键购买）
function buyToppingSeed(toppingName) {
    // 直接购买的小料（不通过种植）
    const directPurchaseItems = {
        '蜂蜜': { price: 15 },
        '冰糖': { price: 8 },
        '乌龙茶包': { price: 12 }
    };

    // 小料对应的种子映射
    const toppingToSeedMap = {
        '红糖': '甘蔗',
        '薄荷叶': '薄荷',
        '姜丝': '生姜',
        '柚子丝': '柚子',
        '银耳丝': '银耳',
        '柠檬片': '柠檬',
        '干桂花': '桂花',
        '水蜜桃果肉': '水蜜桃',
        '黄芪片': '黄芪',
        '小圆子': '糯米',
        '酒酿': '米'
    };

    // 检查是否是直接购买的小料
    if (directPurchaseItems[toppingName]) {
        const item = directPurchaseItems[toppingName];
        
        // 检查金币是否足够
        if (gameData.coins < item.price) {
            addMessage(`❌ 金币不足！需要 ${item.price} 金币，但只有 ${gameData.coins} 金币`);
            return;
        }

        // 显示直接购买确认弹窗
        showDirectPurchaseDialog(toppingName, item.price, () => {
            // 确认购买后的回调
            gameData.coins -= item.price;
            gameData.toppings[toppingName] = (gameData.toppings[toppingName] || 0) + 1;
            
            addMessage(`🛒 成功购买 ${toppingName}，花费 ${item.price} 金币`);

            // 播放金币音效
            const moneyAudio = new Audio('music/money.mp3');
            moneyAudio.volume = 0.1; // 音量10%
            moneyAudio.play().catch(e => console.log('金币音效播放失败', e));

            // 更新显示
            updateAllDisplays();
        });
        return;
    }

    const seedName = toppingToSeedMap[toppingName];
    
    if (!seedName) {
        addMessage(`❌ ${toppingName} 无法通过种植获得`);
        return;
    }

    // 继续原有的种子购买逻辑...
    // (保留原有的种子购买代码)

    if (!gameData.seedInfo[seedName]) {
        addMessage(`❌ 找不到 ${seedName} 的种子信息`);
        return;
    }

    const seedPrice = gameData.seedInfo[seedName].price;
    
    // 检查金币是否足够
    if (gameData.coins < seedPrice) {
        addMessage(`❌ 金币不足！需要 ${seedPrice} 金币，但只有 ${gameData.coins} 金币`);
        return;
    }

    // 显示购买确认弹窗
    showToppingSeedPurchaseDialog(toppingName, seedName, seedPrice, () => {
        // 确认购买后的回调
        gameData.coins -= seedPrice;
        gameData.seeds[seedName] = (gameData.seeds[seedName] || 0) + 1;
        
        addMessage(`🌱 成功购买 ${seedName} 种子，可种植获得 ${toppingName}，花费 ${seedPrice} 金币`);

        // 播放金币音效
        const moneyAudio = new Audio('music/money.mp3');
        moneyAudio.volume = 0.1; // 音量10%
        moneyAudio.play().catch(e => console.log('金币音效播放失败', e));

        // 更新显示
        updateAllDisplays();
    });
}

// 显示小料种子购买确认弹窗
function showToppingSeedPurchaseDialog(toppingName, seedName, seedPrice, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'topping-seed-purchase-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(156, 39, 176, 0.95);
        color: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 25px rgba(156, 39, 176, 0.4);
        z-index: 1003;
        max-width: 400px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
            🌱 购买种子制作小料
        </div>
        <div style="font-size: 14px; margin-bottom: 12px; line-height: 1.4;">
            缺货：${toppingName}<br>
            购买：${seedName} 种子 → 种植收获 → 制作小料
        </div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px; color: #FFE082;">
            价格：${seedPrice} 金币
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="confirm-topping-btn" style="
                background: rgba(255, 255, 255, 0.9);
                color: #7B1FA2;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">🌱 购买种子</button>
            <button class="cancel-topping-btn" style="
                background: rgba(244, 67, 54, 0.8);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">取消</button>
        </div>
    `;

    document.body.appendChild(dialog);

    // 添加事件监听器
    dialog.querySelector('.confirm-topping-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
        onConfirm();
    });

    dialog.querySelector('.cancel-topping-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });

    // 添加悬停效果
    dialog.querySelector('.confirm-topping-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = 'white';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.confirm-topping-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
    });

    dialog.querySelector('.cancel-topping-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = '#f44336';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.cancel-topping-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(244, 67, 54, 0.8)';
        e.target.style.transform = 'scale(1)';
    });
}
// 显示小鱼干购买确认弹窗
function showFishPurchaseDialog(fishPrice, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'fish-purchase-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(33, 150, 243, 0.95);
        color: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
        z-index: 1003;
        max-width: 400px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
            🐟 购买小鱼干
        </div>
        <div style="font-size: 14px; margin-bottom: 12px; line-height: 1.4;">
            制作白水煮鱼需要小鱼干<br>
            小鱼干不是种植获得，需要直接购买
        </div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px; color: #FFE082;">
            价格：${fishPrice} 金币
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="confirm-fish-btn" style="
                background: rgba(255, 255, 255, 0.9);
                color: #1976D2;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">🐟 购买小鱼干</button>
            <button class="cancel-fish-btn" style="
                background: rgba(244, 67, 54, 0.8);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">取消</button>
        </div>
    `;

    document.body.appendChild(dialog);

    // 添加事件监听器
    dialog.querySelector('.confirm-fish-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
        onConfirm();
    });

    dialog.querySelector('.cancel-fish-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });

    // 添加悬停效果
    dialog.querySelector('.confirm-fish-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = 'white';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.confirm-fish-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
    });

    dialog.querySelector('.cancel-fish-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = '#f44336';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.cancel-fish-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(244, 67, 54, 0.8)';
        e.target.style.transform = 'scale(1)';
    });
}
// 显示直接购买小料确认弹窗
function showDirectPurchaseDialog(toppingName, price, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'direct-purchase-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(76, 175, 80, 0.95);
        color: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        z-index: 1003;
        max-width: 400px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
            🛒 直接购买小料
        </div>
        <div style="font-size: 14px; margin-bottom: 12px; line-height: 1.4;">
            缺货：${toppingName}<br>
            ${toppingName} 可以直接购买，无需种植
        </div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px; color: #FFE082;">
            价格：${price} 金币
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="confirm-direct-btn" style="
                background: rgba(255, 255, 255, 0.9);
                color: #388E3C;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">🛒 购买</button>
            <button class="cancel-direct-btn" style="
                background: rgba(244, 67, 54, 0.8);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            ">取消</button>
        </div>
    `;

    document.body.appendChild(dialog);

    // 添加事件监听器
    dialog.querySelector('.confirm-direct-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
        onConfirm();
    });

    dialog.querySelector('.cancel-direct-btn').addEventListener('click', () => {
        document.body.removeChild(dialog);
    });

    // 添加悬停效果
    dialog.querySelector('.confirm-direct-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = 'white';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.confirm-direct-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
        e.target.style.transform = 'scale(1)';
    });

    dialog.querySelector('.cancel-direct-btn').addEventListener('mouseenter', (e) => {
        e.target.style.background = '#f44336';
        e.target.style.transform = 'scale(1.05)';
    });

    dialog.querySelector('.cancel-direct-btn').addEventListener('mouseleave', (e) => {
        e.target.style.background = 'rgba(244, 67, 54, 0.8)';
        e.target.style.transform = 'scale(1)';
    });
}
// 开始加工
function startProcessing(recipeName) {
    const recipe = gameData.processingRecipes[recipeName];

    if (gameData.processingBoard.state !== 'idle') {
        addMessage('❌ 加工台正在使用中');
        return;
    }

    // 检查材料
    const hasIngredients = recipe.ingredients.every(ingredient =>
        gameData.inventory[ingredient] && gameData.inventory[ingredient] > 0
    );

    if (!hasIngredients) {
        const missingIngredients = recipe.ingredients.filter(ingredient =>
            !gameData.inventory[ingredient] || gameData.inventory[ingredient] <= 0
        );
        const availableIngredients = recipe.ingredients.filter(ingredient =>
            gameData.inventory[ingredient] && gameData.inventory[ingredient] > 0
        );

        let message = `❌ 加工${recipeName}失败！缺少材料：${missingIngredients.join('、')}`;
        if (availableIngredients.length > 0) {
            message += `。已有材料：${availableIngredients.map(ing => `${ing}(${gameData.inventory[ing]})`).join('、')}`;
        }
        addMessage(message);
        debug(`加工失败 - 配方: ${recipeName}, 所需材料: ${recipe.ingredients.join('、')}, 缺少: ${missingIngredients.join('、')}, 当前库存:`, gameData.inventory);
        return;
    }

    // 消耗材料
    recipe.ingredients.forEach(ingredient => {
        gameData.inventory[ingredient]--;
    });

    // 开始加工
    gameData.processingBoard.state = 'processing';
    gameData.processingBoard.recipe = recipeName;
    gameData.processingBoard.startTime = Date.now();
    gameData.processingBoard.duration = recipe.time;

    addMessage(`🔪 开始加工 ${recipeName}`);

    // 刷新显示
    updateProcessingBoard();
    initProcessingRecipes();
}

// 初始化茶摊事件
function initTeaShopEvents() {
    // 服务顾客按钮
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('serve-button')) {
            const teaIndex = parseInt(e.target.dataset.teaIndex);
            serveCustomer(teaIndex);
        }
    });

    // 添加小料按钮
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-topping')) {
            const teaIndex = parseInt(e.target.dataset.teaIndex);
            showToppingSelection(teaIndex);
        }
    });
}

// 服务顾客
function serveCustomer(teaIndex) {
    const tea = gameData.madeTeas[teaIndex];
    if (!tea) {
        addMessage('❌ 茶饮不存在');
        return;
    }

    // 检查是否有猫咪在场
    if (gameData.cats && gameData.cats.currentCat) {
        const cat = gameData.cats.currentCat;
        const elapsed = Date.now() - cat.arrivalTime;

        if (elapsed < cat.stayDuration) {
            // 猫咪还在，检查是否是白水煮鱼
            if (tea.name !== '白水煮鱼') {
                addMessage(`❌ 猫咪只吃白水煮鱼，不吃 ${tea.name}`);
                return;
            }

            // 喂食猫咪
            feedCat(cat, teaIndex);
            return;
        } else {
            // 猫咪已经离开
            gameData.cats.currentCat = null;
            addMessage(`🐱 ${cat.name} 已经离开了...`);
        }
    }

    // 普通顾客逻辑
    if (!gameData.customer.active) {
        addMessage('❌ 没有顾客在等待');
        return;
    }

    // 检查茶饮是否匹配顾客需求
    if (tea.name !== gameData.customer.teaChoice) {
        addMessage(`❌ 顾客要的是 ${gameData.customer.teaChoice}，不是 ${tea.name}`);
        return;
    }

    // 检查小料是否匹配
    const customerToppings = gameData.customer.toppingChoices || [];
    const teaToppings = tea.toppings || [];

    const missingToppings = customerToppings.filter(topping => !teaToppings.includes(topping));
    if (missingToppings.length > 0) {
        addMessage(`❌ 还需要添加小料：${missingToppings.join('、')}`);
        return;
    }

    // 计算收入
    const basePrice = 10;
    const toppingBonus = teaToppings.length * 2;
    const vipBonus = gameData.customer.isVIP ? 5 : 0;
    const temperatureBonus = gameData.teaTemps[tea.id] === 'hot' ? 3 : 0;

    const totalPrice = basePrice + toppingBonus + vipBonus + temperatureBonus;

    // 获得收入
    gameData.coins += totalPrice;

    // 播放金币音效
    const moneyAudio = new Audio('music/money.mp3');
    moneyAudio.volume = 0.1; // 音量10%
    moneyAudio.play().catch(e => console.log('金币音效播放失败', e));

    // 移除茶饮
    gameData.madeTeas.splice(teaIndex, 1);
    delete gameData.teaTemps[tea.id];
    delete gameData.teaMakeTimes[tea.id];

    // 记录服务顾客
    gameData.servedCustomers = (gameData.servedCustomers || 0) + 1;

    // 记录特殊顾客访问
    if (gameData.customer.isVIP && gameData.customerNames.includes(gameData.customer.name)) {
        if (!gameData.customerVisits) {
            gameData.customerVisits = {};
        }
        gameData.customerVisits[gameData.customer.name] =
            (gameData.customerVisits[gameData.customer.name] || 0) + 1;

        // 检查配方解锁
        checkRecipeUnlock(gameData.customer.name);
    }

    // 显示成功消息
    const customerName = gameData.customer.name;
    addMessage(`🎉 成功服务 ${customerName}，获得 ${totalPrice} 铜板！`);

    // 重置顾客
    resetCustomer();

    // 更新最后顾客时间，从顾客离开时开始计算下次生成时间
    gameData.lastCustomerTime = Date.now();

    // 更新显示
    updateAllDisplays();
}

// 喂食猫咪
function feedCat(cat, teaIndex) {
    // 移除白水煮鱼
    const tea = gameData.madeTeas[teaIndex];
    gameData.madeTeas.splice(teaIndex, 1);
    delete gameData.teaTemps[tea.id];
    delete gameData.teaMakeTimes[tea.id];

    // 标记猫咪已被喂食
    cat.fed = true;

    // 增加亲密度
    const catName = cat.name;
    if (!gameData.cats.intimacy[catName]) {
        gameData.cats.intimacy[catName] = 0;
    }
    if (!gameData.cats.feedCount[catName]) {
        gameData.cats.feedCount[catName] = 0;
    }

    gameData.cats.intimacy[catName] = Math.min(5000, gameData.cats.intimacy[catName] + 10);
    gameData.cats.feedCount[catName]++;
    gameData.cats.lastSeen[catName] = Date.now();

    // 显示消息
    addMessage(`🐱 ${catName} 开心地吃着白水煮鱼！亲密度+10`);
    // 播放猫咪叫声
    const catAudio = new Audio('music/cat-meow-14536.mp3');
    catAudio.volume = 0.1; // 音量10%
    catAudio.play().catch(e => console('音频播放失败', e));
    // 检查是否有礼物 - 基于亲密度的分层奖励系统
    const intimacy = gameData.cats.intimacy[catName];
    if (intimacy >= 500) {
        let giftCount = 0;
        let giftChance = 0;
        let giftPool = [];

        // 根据亲密度确定礼物数量、概率和物品池
        if (intimacy >= 5000) {
            // 满亲密度：每次必定3个礼物
            giftCount = 3;
            giftChance = 1.0;
            giftPool = ['小鱼干', '蜂蜜', '红糖', '冰糖', '乌龙茶包', '银耳', '五味子', '柠檬', '薄荷', '甘草'];
        } else if (intimacy >= 3000) {
            // 高亲密度：70%概率2个礼物
            giftCount = 2;
            giftChance = 0.7;
            giftPool = ['小鱼干', '蜂蜜', '红糖', '冰糖', '乌龙茶包', '银耳', '五味子', '柠檬'];
        } else if (intimacy >= 1500) {
            // 中高亲密度：50%概率1-2个礼物
            giftCount = Math.random() < 0.5 ? 2 : 1;
            giftChance = 0.5;
            giftPool = ['小鱼干', '蜂蜜', '红糖', '冰糖', '银耳', '五味子'];
        } else if (intimacy >= 500) {
            // 初级亲密度：30%概率1个礼物
            giftCount = 1;
            giftChance = 0.3;
            giftPool = ['小鱼干', '蜂蜜', '红糖', '银耳'];
        }

        // 判断是否给礼物
        if (Math.random() < giftChance) {
            const gifts = [];
            for (let i = 0; i < giftCount; i++) {
                const gift = giftPool[Math.floor(Math.random() * giftPool.length)];
                gameData.inventory[gift] = (gameData.inventory[gift] || 0) + 1;
                gifts.push(gift);
            }

            // 显示礼物弹窗
            showCatGiftPopup(catName, gameData.cats.currentCat.icon, gifts, intimacy);

            // 同时添加消息
            if (gifts.length === 1) {
                addMessage(`🎁 ${catName} 送给你一个小礼物：${gifts[0]}！`);
            } else {
                addMessage(`🎁 ${catName} 送给你${gifts.length}个小礼物：${gifts.join('、')}！`);
            }
        }
    }

    // 更新显示
    updateCustomerDisplay();
    updateAllDisplays();
}

// 显示猫咪礼物弹窗
function showCatGiftPopup(catName, catIcon, gifts, intimacy) {
    // 创建弹窗容器
    const popup = document.createElement('div');
    popup.className = 'cat-gift-popup';
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1003;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    // 创建弹窗内容
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 25px;
        max-width: 90vw;
        max-height: 80vh;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 3px solid #E91E63;
        animation: bounceIn 0.5s ease;
        position: relative;
    `;

    // 获取亲密度等级文本
    const intimacyText = intimacy >= 4000 ? '超级亲密' : intimacy >= 2000 ? '非常亲密' : intimacy >= 500 ? '比较熟悉' : '初次见面';
    const intimacyColor = intimacy >= 4000 ? '#4CAF50' : intimacy >= 2000 ? '#FF9800' : intimacy >= 500 ? '#2196F3' : '#9C27B0';

    // 生成礼物图标
    const giftIcons = {
        '小鱼干': '🐟',
        '蜂蜜': '🍯',
        '红糖': '🟤',
        '银耳': '🍄',
        '冰糖': '❄️',
        '乌龙茶包': '🍃',
        '五味子': '🫐',
        '柠檬': '🍋',
        '薄荷': '🌿',
        '甘草': '🌱'
    };

    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 48px; margin-bottom: 10px;">${catIcon}</div>
            <h3 style="color: #E91E63; margin: 0 0 5px 0; font-size: 20px;">${catName}</h3>
            <div style="color: ${intimacyColor}; font-size: 12px; font-weight: bold;">
                亲密度: ${intimacy}/5000 (${intimacyText})
            </div>
        </div>

        <div style="background: #FFF3E0; border-radius: 15px; padding: 20px; margin-bottom: 20px; border: 2px dashed #FF9800;">
            <div style="font-size: 24px; margin-bottom: 10px;">🎁</div>
            <h4 style="color: #F57C00; margin: 0 0 15px 0;">送给你的小礼物</h4>

            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                ${gifts.map(gift => `
                    <div style="
                        background: white;
                        border-radius: 12px;
                        padding: 12px;
                        border: 2px solid #FFB74D;
                        min-width: 80px;
                        box-shadow: 0 2px 8px rgba(255, 183, 77, 0.3);
                    ">
                        <div style="font-size: 24px; margin-bottom: 5px;">${giftIcons[gift] || '🎁'}</div>
                        <div style="font-size: 12px; font-weight: bold; color: #E65100;">${gift}</div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 15px; color: #F57C00; font-size: 14px;">
                ${gifts.length === 1 ? '一份贴心的小礼物' : `${gifts.length}份贴心的小礼物`}
            </div>
        </div>

        <button onclick="this.closest('.cat-gift-popup').remove()" style="
            background: linear-gradient(135deg, #E91E63, #F06292);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 30px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(233, 30, 99, 0.4)'"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(233, 30, 99, 0.3)'">
            收下礼物 💕
        </button>
    `;

    popup.appendChild(content);
    document.body.appendChild(popup);

    // 3秒后自动关闭
    setTimeout(() => {
        if (document.body.contains(popup)) {
            popup.remove();
        }
    }, 3000);

    // 点击背景关闭
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

// 显示小料选择
function showToppingSelection(teaIndex) {
    const tea = gameData.madeTeas[teaIndex];
    if (!tea) return;

    // 创建小料选择面板
    const panel = document.createElement('div');
    panel.className = 'topping-selection-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow-y: auto;
    `;

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #2E7D32;">为 ${tea.name} 添加小料</h3>
            <button class="close-topping-panel" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div class="available-toppings" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 8px; max-height: 300px; overflow-y: auto;">
            ${Object.entries(gameData.toppings)
                .map(([name, count]) => {
                    const hasStock = count > 0;
                    return `
                    <button class="topping-option" data-topping="${name}" data-has-stock="${hasStock}" style="
                        background: ${hasStock ? '#E8F5E8' : '#F5F5F5'};
                        border: 2px solid ${hasStock ? '#81C784' : '#CCCCCC'};
                        border-radius: 8px;
                        padding: 6px 4px;
                        cursor: ${hasStock ? 'pointer' : 'not-allowed'};
                        transition: all 0.3s ease;
                        text-align: center;
                        opacity: ${hasStock ? '1' : '0.5'};
                        min-height: 60px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    " ${hasStock ? '' : 'disabled'}>
                        <div style="font-size: 16px; margin-bottom: 2px;">${getToppingIcon(name)}</div>
                        <div style="font-size: 10px; font-weight: 500; color: ${hasStock ? '#2E7D32' : '#999'}; line-height: 1.2;">${name}</div>
                        <div style="font-size: 8px; color: ${hasStock ? '#666' : '#999'};">x${count}</div>
                        ${!hasStock ? '<div style="font-size: 7px; color: #FF5722; margin-top: 1px;">缺货</div>' : ''}
                    </button>
                `;
                }).join('')}
        </div>
        <div style="margin-top: 15px; text-align: center;">
            <button class="confirm-toppings" style="
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 12px;
                padding: 10px 20px;
                font-size: 14px;
                cursor: pointer;
            ">确认添加</button>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    const selectedToppings = new Set(tea.toppings || []);

    panel.querySelectorAll('.topping-option').forEach(btn => {
        const toppingName = btn.dataset.topping;
        const hasStock = btn.dataset.hasStock === 'true';

        // 如果已经添加过，显示选中状态
        if (selectedToppings.has(toppingName)) {
            btn.style.background = '#4CAF50';
            btn.style.color = 'white';
        }

        // 只为有库存的小料添加点击事件
        if (hasStock) {
            btn.addEventListener('click', () => {
                if (selectedToppings.has(toppingName)) {
                    // 移除小料
                    selectedToppings.delete(toppingName);
                    btn.style.background = '#E8F5E8';
                    btn.style.color = '#2E7D32';
                } else {
                    // 添加小料
                    selectedToppings.add(toppingName);
                    btn.style.background = '#4CAF50';
                    btn.style.color = 'white';
                }
            });
        } else {
            // 没有库存的小料点击时显示提示
            btn.addEventListener('click', () => {
                addMessage(`❌ ${toppingName} 库存不足，请先制作或购买小料`);
            });
        }
    });

    panel.querySelector('.close-topping-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    panel.querySelector('.confirm-toppings').addEventListener('click', () => {
        // 更新茶饮的小料
        tea.toppings = Array.from(selectedToppings);

        // 消耗小料库存
        selectedToppings.forEach(toppingName => {
            if (gameData.toppings[toppingName] > 0) {
                gameData.toppings[toppingName]--;
            }
        });

        addMessage(`✅ 为 ${tea.name} 添加了小料：${Array.from(selectedToppings).join('、')}`);

        // 更新显示
        updateTeaDisplay();
        updateToppingsDisplay();

        // 关闭面板
        document.body.removeChild(panel);
    });
}

// 初始化购物车按钮
function initCartButton() {
    const cartButton = document.getElementById('cart-button');
    const shopBtn = document.getElementById('shop-btn');
    const inventoryBtn = document.getElementById('inventory-btn');

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            showShopPanel();
        });
    }

    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            showShopPanel();
        });
    }

    if (inventoryBtn) {
        inventoryBtn.addEventListener('click', () => {
            showInventoryPanel();
        });
    }

    // 更新购物车徽章
    updateCartBadge();
}

// 更新购物车徽章
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        const itemCount = gameData.cart.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = itemCount;
        cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
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
        patience: 120000,
        maxPatience: 120000,
        served: false
    };

    updateCustomerDisplay();
}

// 检查配方解锁
function checkRecipeUnlock(customerName) {
    if (!gameData.customerVisits || !gameData.recipeUnlockRules) return;

    const visitCount = gameData.customerVisits[customerName] || 0;

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
                } else if (Math.random() < rule.chance) {
                    // 根据概率判断
                    shouldUnlock = true;
                }

                if (shouldUnlock) {
                    gameData.unlockedRecipes.push(recipe);
                    addMessage(`🔓 解锁新配方：${recipe}！`);
                    showRecipeUnlockStory(recipe);
                }
            }
        }
    });
}

// 显示配方解锁故事（更新为完整故事内容）
function showRecipeUnlockStory(recipeName) {
    const story = gameData.recipeStories[recipeName];

    // 创建故事弹窗
    const storyPanel = document.createElement('div');
    storyPanel.className = 'recipe-story-panel';
    storyPanel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInUp 0.5s ease;
    `;

    const storyContent = document.createElement('div');
    storyContent.style.cssText = `
        background: linear-gradient(135deg, #fff8e1, #f3e5ab);
        border-radius: 20px;
        padding: 30px;
        max-width: 90vw;
        max-height: 80vh;
        overflow-y: auto;
        text-align: left;
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
        border: 3px solid #8b4513;
        font-family: 'KaiTi', '楷体', serif;
    `;

    if (story) {
        // 有故事内容的配方
        storyContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="font-size: 48px; margin-bottom: 15px;">🍵</div>
                <h2 style="color: #8b4513; margin-bottom: 10px; font-size: 24px;">新配方解锁</h2>
                <h3 style="color: #2E7D32; margin-bottom: 5px; font-size: 20px;">${recipeName}</h3>
                <h4 style="color: #666; margin-bottom: 20px; font-size: 16px; font-style: italic;">${story.title}</h4>
            </div>

            <div style="background: rgba(255,255,255,0.7); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #8b4513;">
                <p style="color: #333; line-height: 1.8; margin-bottom: 15px; font-size: 16px; text-indent: 2em;">
                    ${story.content}
                </p>
                <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 15px;">
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        <strong>功效：</strong>${story.effect}
                    </p>
                </div>
            </div>

            <div style="text-align: center;">
                <button style="
                    background: linear-gradient(135deg, #8b4513, #a0522d);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 30px;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
                    transition: all 0.3s ease;
                " onclick="this.closest('.recipe-story-panel').remove()"
                   onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(139, 69, 19, 0.4)'"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 8px rgba(139, 69, 19, 0.3)'">
                    收下这个配方
                </button>
            </div>
        `;
    } else {
        // 没有故事内容的配方（人数解锁）
        storyContent.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                <h2 style="color: #8b4513; margin-bottom: 15px;">新配方解锁！</h2>
                <h3 style="color: #2E7D32; margin-bottom: 20px;">${recipeName}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
                    恭喜您解锁了新的茶饮配方！现在您可以在厨房制作这款特色茶饮了。
                </p>
                <button style="
                    background: linear-gradient(135deg, #8b4513, #a0522d);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 24px;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
                " onclick="this.closest('.recipe-story-panel').remove()">
                    太好了！
                </button>
            </div>
        `;
    }

    storyPanel.appendChild(storyContent);
    document.body.appendChild(storyPanel);

    // 8秒后自动关闭（给用户更多时间阅读故事）
    setTimeout(() => {
        if (document.body.contains(storyPanel)) {
            storyPanel.remove();
        }
    }, 8000);
}

// 打开测试页面
function openTestPage() {
    try {
        // 保存当前游戏数据
        localStorage.setItem('teaShopGameData', JSON.stringify(gameData));

        // 计算窗口居中位置
        const width = 1200;
        const height = 800;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        // 打开测试页面，直接在中间显示
        const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,location=no,menubar=no,toolbar=no,status=no`;
        const testWindow = window.open('全功能测试页面.html', 'teaShopTest', windowFeatures);

        if (testWindow) {
            addMessage('🧪 测试页面已打开');
        } else {
            addMessage('❌ 无法打开测试页面，请检查浏览器弹窗设置');
        }
    } catch (error) {
        addMessage('❌ 打开测试页面失败: ' + error.message);
        console.error('打开测试页面失败:', error);
    }
}

// 打开测试窗口
function openTestWindow() {
    try {
        // 保存当前游戏数据
        saveGame();

        // 计算窗口居中位置
        const width = 900;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        // 打开测试窗口，直接在中间显示
        const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,location=no,menubar=no,toolbar=no,status=no`;
        const testWindow = window.open('测试窗口.html', 'teaShopTestWindow', windowFeatures);

        if (testWindow) {
            addMessage('🔬 测试窗口已打开');
        } else {
            addMessage('❌ 无法打开测试窗口，请检查浏览器弹窗设置');
        }
    } catch (error) {
        addMessage('❌ 打开测试窗口失败: ' + error.message);
        console.error('打开测试窗口失败:', error);
    }
}

// 启动游戏循环
function startGameLoop() {
    debug('启动游戏循环...');

    // 主游戏循环，每秒更新一次
    setInterval(() => {
        if (!isPaused) {
            updateGameState();
        }
    }, 1000);

    // 快速更新循环，每100毫秒更新一次（用于动画和进度条）
    setInterval(() => {
        if (!isPaused) {
            updateFastState();
        }
    }, 100);

    debug('游戏循环已启动');
}

// 更新游戏状态（每秒）
function updateGameState() {
    // 更新天气
    updateWeather();

    // 更新农场
    updateFarm();

    // 更新厨房
    updateKitchen();

    // 更新茶饮温度
    updateTeaTemperature();

    // 更新顾客
    updateCustomer();

    // 生成新顾客
    trySpawnCustomer();

    // 检查人数解锁
    checkCustomerCountUnlocks();
}

// 更新快速状态（每100毫秒）
function updateFastState() {
    // 更新进度条显示
    updateProgressBars();

    // 更新计时器显示
    updateTimers();
}

// 更新天气
function updateWeather() {
    const now = Date.now();
    const elapsed = now - gameData.weatherStartTime;

    if (elapsed >= gameData.weatherDuration) {
        gameData.weatherStartTime = now;

        // 随机选择新天气（遵循季节规则）
        const oldWeather = gameData.currentWeather;
        let newWeather;

        do {
            newWeather = gameData.weathers[Math.floor(Math.random() * gameData.weathers.length)];
        } while (
            // 冬天不能下雨
            (gameData.currentSeason === "冬天" && newWeather === "下雨") ||
            // 非冬天不能下雪
            (gameData.currentSeason !== "冬天" && newWeather === "下雪") ||
            // 不能连续相同天气
            newWeather === oldWeather
        );

        gameData.currentWeather = newWeather;

        // 播放天气音效
        let weatherAudio;
        switch (newWeather) {
            case "晴天":
                weatherAudio = new Audio('music/sun.mp3');
                break;
            case "下雨":
                //weatherAudio = new Audio('music/rain.mp3');
                break;
            case "刮风":
                weatherAudio = new Audio('music/windy.mp3');
                break;
            default:
                // 下雪或其他天气暂无音效
                break;
        }
        
        if (weatherAudio) {
            weatherAudio.volume = 0.1; // 音量10%，更安静
            weatherAudio.play().catch(e => console.log('天气音效播放失败', e));
        }

        // 增加天数
        gameData.currentDay++;
        gameData.daysInSeason++;

        // 如果达到季节变化的天数
        if (gameData.daysInSeason >= gameData.daysPerSeason) {
            gameData.daysInSeason = 0;

            // 更改季节
            const currentSeasonIndex = gameData.seasons.indexOf(gameData.currentSeason);
            gameData.currentSeason = gameData.seasons[(currentSeasonIndex + 1) % gameData.seasons.length];

            addMessage(`🌸 季节已经变为${gameData.currentSeason}了`);
        }

        // 应用天气效果
        applyWeatherEffects();

        updateWeatherDisplay();
        addMessage(`🌤️ 天气变为${gameData.currentWeather}了`);
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
                addMessage(`💧 雨水滋润了田地${index + 1}`);
            }
            // 刮风降低湿度
            else if (gameData.currentWeather === "刮风") {
                plot.moisture = Math.max(0, plot.moisture - 10);
                addMessage(`💨 大风使田地${index + 1}的水分蒸发了一些`);
            }
            // 下雪增加湿度和肥力
            else if (gameData.currentWeather === "下雪") {
                plot.moisture = Math.min(100, plot.moisture + 15);
                plot.fertility = Math.min(100, plot.fertility + 10);
                addMessage(`❄️ 雪花为田地${index + 1}带来了养分`);
            }
        }
    });
}

// 更新农场
function updateFarm() {
    let hasChanges = false;

    gameData.plots.forEach((plot, index) => {
        if (plot.state === 'growing') {
            const now = Date.now();
            const elapsed = now - plot.stageStartTime;

            // 检查是否需要进入下一阶段
            if (elapsed >= gameData.stageDuration) {
                plot.growthStage++;
                plot.stageStartTime = now;

                if (plot.growthStage >= gameData.growthStages.length) {
                    // 成熟
                    plot.state = 'mature';
                    addMessage(`🌺 田地${index + 1}的${plot.plantType}成熟了！`);
                }

                hasChanges = true;
            }

            // 消耗湿度和肥力
            if (Math.random() < 0.1) { // 10%概率消耗
                plot.moisture = Math.max(plot.moisture - gameData.moistureConsumption, 0);
                plot.fertility = Math.max(plot.fertility - gameData.fertilityConsumption, 0);
                hasChanges = true;
            }

            // 检查生长条件
            if (plot.moisture < gameData.minMoisture || plot.fertility < gameData.minFertility) {
                // 生长停滞
                if (Math.random() < 0.05) { // 5%概率显示提示
                    addMessage(`⚠️ 田地${index + 1}需要浇水或施肥`);
                }
            }
        }
    });

    if (hasChanges) {
        initFarmGrid();
    }
}

// 更新厨房
function updateKitchen() {
    let hasChanges = false;

    // 更新炉灶
    gameData.stoves.forEach((stove, index) => {
        if (stove.state === 'cooking') {
            const elapsed = Date.now() - stove.startTime;

            if (elapsed >= stove.boilDuration) {
                // 制茶完成
                const teaId = Date.now() + index;
                const newTea = {
                    id: teaId,
                    name: stove.recipe,
                    toppings: []
                };

                gameData.madeTeas.push(newTea);
                gameData.teaTemps[teaId] = 'hot';
                gameData.teaMakeTimes[teaId] = Date.now();

                // 重置炉灶
                stove.state = 'empty';
                stove.recipe = null;
                stove.startTime = 0;

                addMessage(`🍵 ${newTea.name} 制作完成！`);
                hasChanges = true;
            }
        }
    });

    // 更新加工台
    if (gameData.processingBoard.state === 'processing') {
        const elapsed = Date.now() - gameData.processingBoard.startTime;

        if (elapsed >= gameData.processingBoard.duration) {
            // 加工完成
            const recipe = gameData.processingRecipes[gameData.processingBoard.recipe];
            const outputAmount = recipe.output;

            if (!gameData.toppings[gameData.processingBoard.recipe]) {
                gameData.toppings[gameData.processingBoard.recipe] = 0;
            }
            gameData.toppings[gameData.processingBoard.recipe] += outputAmount;

            addMessage(`🎉 加工完成！获得 ${outputAmount} 个 ${gameData.processingBoard.recipe}`);

            // 重置加工台
            gameData.processingBoard.state = 'idle';
            gameData.processingBoard.recipe = null;
            gameData.processingBoard.startTime = 0;
            gameData.processingBoard.duration = 0;

            updateProcessingBoard();
            initProcessingRecipes();
            updateToppingsDisplay();
        }
    }

    if (hasChanges) {
        initKitchen();
        updateTeaDisplay();
    }
}

// 更新茶饮温度
function updateTeaTemperature() {
    let hasChanges = false;

    Object.keys(gameData.teaTemps).forEach(teaId => {
        if (gameData.teaTemps[teaId] === 'hot') {
            const makeTime = gameData.teaMakeTimes[teaId];
            const elapsed = Date.now() - makeTime;

            if (elapsed >= gameData.teaCoolingDuration) {
                gameData.teaTemps[teaId] = 'cold';
                hasChanges = true;
            }
        }
    });

    if (hasChanges) {
        updateTeaDisplay();
    }
}

// 更新顾客
function updateCustomer() {
    // 如果有猫咪在场，不处理普通顾客逻辑
    if (gameData.cats && gameData.cats.currentCat) {
        const cat = gameData.cats.currentCat;
        const elapsed = Date.now() - cat.arrivalTime;

        // 如果猫咪还在停留期间，不处理普通顾客
        if (elapsed < cat.stayDuration) {
            return;
        }
    }

    // 普通顾客逻辑
    if (gameData.customer.active) {
        const elapsed = Date.now() - gameData.customer.arrivalTime;
        const remaining = gameData.customer.patience - elapsed;

        if (remaining <= 0) {
            // 顾客失去耐心离开
            addMessage(`😞 ${gameData.customer.name} 等得不耐烦，离开了...`);
            resetCustomer();
            // 更新最后顾客时间，从顾客离开时开始计算下次生成时间
            gameData.lastCustomerTime = Date.now();
        } else {
            // 更新耐心条
            updateCustomerDisplay();
        }
    }
}

// 尝试生成新顾客
function trySpawnCustomer() {
    // 在函数开头添加
   const now = Date.now();

    if (!gameData.cats.currentCat && 
        gameData.currentDay % 3 === 0 && 
        gameData.currentDay > 0 &&
        !gameData.cats.todayVisited) {
       // 猫咪自动生成逻辑
       const catNames = ['大橘猫', '狸花猫', '黑猫小手套', '小白猫', '大猫猫'];
       const catIcons = ['🧡', '🐱', '🖤', '🤍', '😺'];
       
       const randomIndex = Math.floor(Math.random() * catNames.length);
       const catName = catNames[randomIndex];
       
       gameData.cats.currentCat = {
           name: catName,
           icon: catIcons[randomIndex],
           arrivalTime: now,
           stayDuration: 30000,
           fed: false
       };
       
       gameData.cats.lastCatTime = now;
       gameData.cats.todayVisited = true; 
       addMessage(`🐱 ${catName} 来到了茶铺！`);
       // 播放猫咪叫声
       const catAudio = new Audio('music/cat-meow-14536.mp3');
       catAudio.volume = 0.1; // 音量10%
       catAudio.play().catch(e => console.log('音频播放失败', e));
       updateCustomerDisplay();
       return;
    }


    // 如果有猫咪在场，不生成新顾客
    if (gameData.cats && gameData.cats.currentCat) {
        const cat = gameData.cats.currentCat;
        const elapsed = Date.now() - cat.arrivalTime;

        // 如果猫咪还在停留期间，不生成新顾客
        if (elapsed < cat.stayDuration) {
            return;
        }
    }

    if (gameData.customer.active) return;

   // const now = Date.now();
    if (now - gameData.lastCustomerTime < gameData.customerSpawnCooldown) return;

    // 20%概率生成顾客
    if (Math.random() < 0.2) {
        spawnRandomCustomer();
        gameData.lastCustomerTime = now;
    }
}

// 生成随机顾客
function spawnRandomCustomer() {
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
    // 排除白水煮鱼，只给猫咪
    const availableRecipes = gameData.unlockedRecipes.filter(recipe => recipe !== '白水煮鱼');
    const teaChoice = availableRecipes.length > 0 ?
        availableRecipes[Math.floor(Math.random() * availableRecipes.length)] :
        '五味子饮'; // 如果没有其他配方，默认五味子饮

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
        maxPatience: patience,
        served: false
    };

    // 随机选择0-2个小料（顾客不知道茶铺库存，随机要求小料）
    // 基础小料池：顾客可能要求的小料（排除银耳，只能要求银耳丝）
    const possibleToppings = [
        "红糖", "薄荷叶", "姜丝", "柚子丝", "银耳丝", "柠檬片", "蜂蜜",
        "冰糖", "乌龙茶包", "干桂花", "小圆子", "酒酿", "水蜜桃果肉", "黄芪片"
    ];

    const numToppings = Math.floor(Math.random() * 3); // 0-2个小料
    for (let i = 0; i < numToppings; i++) {
        const topping = possibleToppings[Math.floor(Math.random() * possibleToppings.length)];
        if (!gameData.customer.toppingChoices.includes(topping)) {
            gameData.customer.toppingChoices.push(topping);
        }
    }

    // 显示顾客消息
    let customerMessage = `${customerName}来到茶铺，想要一杯${teaChoice}`;
    if (gameData.customer.toppingChoices.length > 0) {
        customerMessage += `，加${gameData.customer.toppingChoices.join('、')}`;
    }
    addMessage(customerMessage);

    updateCustomerDisplay();
}

// 检查人数解锁
function checkCustomerCountUnlocks() {
    const customerCount = gameData.servedCustomers || 0;
    const unlockRules = [
        { count: 30, recipe: '桑菊润燥茶' },
        { count: 60, recipe: '桂花酒酿饮' },
        { count: 90, recipe: '蜜桃乌龙冷萃' },
        { count: 120, recipe: '黄芪枸杞茶' },
        { count: 150, recipe: '竹蔗茅根马蹄水' }
    ];

    unlockRules.forEach(rule => {
        if (customerCount >= rule.count && !gameData.unlockedRecipes.includes(rule.recipe)) {
            gameData.unlockedRecipes.push(rule.recipe);
            addMessage(`🎉 服务${rule.count}位顾客，解锁新配方：${rule.recipe}！`);
            showRecipeUnlockStory(rule.recipe);
        }
    });
}

// 更新所有显示
function updateAllDisplays() {
    updateWeatherDisplay();
    updateCustomerDisplay();
    updateCoinsDisplay();
    updateCartBadge();
    initFarmGrid();
    initKitchen();
    updateTeaDisplay();
    updateToppingsDisplay();
    updateManagementDisplay();
}

// 更新天气显示
function updateWeatherDisplay() {
    const weatherIcon = document.getElementById('weather-icon');
    const seasonText = document.getElementById('season-text');
    const dayNumber = document.getElementById('day-number');

    if (weatherIcon) {
        const weatherIcons = {
            '晴天': '☀️',
            '刮风': '💨',
            '下雨': '🌨️',
            '下雪': '❄️',
            '阴天': '☁️'
        };
        weatherIcon.textContent = weatherIcons[gameData.currentWeather] || '☀️';
    }

    if (seasonText) {
        seasonText.textContent = `${gameData.currentSeason} · ${gameData.currentWeather}`;
    }

    if (dayNumber) {
        dayNumber.textContent = gameData.currentDay;
    }
}

// 更新顾客显示
function updateCustomerDisplay() {
    const customerIcon = document.getElementById('customer-icon');
    const customerName = document.getElementById('customer-name');
    const customerOrder = document.getElementById('customer-order');
    const patienceBar = document.getElementById('patience-bar');
    const patienceFill = document.getElementById('patience-fill');
    const patienceText = document.getElementById('patience-text');

    // 检查是否有猫咪在场
    if (gameData.cats && gameData.cats.currentCat) {
        const cat = gameData.cats.currentCat;
        const elapsed = Date.now() - cat.arrivalTime;

        if (elapsed < cat.stayDuration) {
            // 猫咪还在停留期间
            if (customerIcon) customerIcon.textContent = cat.icon;
            if (customerName) customerName.textContent = `${cat.name} 🐱`;
            if (customerOrder) {
                if (cat.fed) {
                    customerOrder.textContent = '满足地吃着白水煮鱼 😸';
                } else {
                    customerOrder.textContent = '想要白水煮鱼 🐟';
                }
            }

            // 显示猫咪停留时间条
            if (patienceBar) {
                patienceBar.style.display = 'block';
                const remaining = cat.stayDuration - elapsed;
                const percentage = (remaining / cat.stayDuration) * 100;

                if (patienceFill) {
                    patienceFill.style.width = `${percentage}%`;
                    patienceFill.style.background = '#E91E63'; // 粉色表示猫咪
                }

                if (patienceText) {
                    patienceText.textContent = `停留时间：${Math.ceil(remaining / 1000)}秒`;
                }
            }
            return;
        } else {
            // 猫咪离开了
            const catName = cat.name;
            gameData.cats.currentCat = null;
            addMessage(`🐱 ${catName} 离开了...`);
            console.log(`猫咪 ${catName} 离开了`); // 调试信息
        }
    }

    // 普通顾客显示逻辑
    if (!gameData.customer.active) {
        if (customerIcon) customerIcon.textContent = '🌵';
        if (customerName) customerName.textContent = '暂无顾客';
        if (customerOrder) customerOrder.textContent = '等待顾客到来...';
        if (patienceBar) patienceBar.style.display = 'none';
        return;
    }

    // 显示顾客信息
    if (customerIcon) {
        customerIcon.textContent = '🌵';
    }

    if (customerName) {
        const vipText = gameData.customer.isVIP ? ' (VIP)' : '';
        customerName.textContent = gameData.customer.name + vipText;
    }

    if (customerOrder) {
        const toppingText = gameData.customer.toppingChoices.length > 0
            ? `，要加${gameData.customer.toppingChoices.join('、')}`
            : '';
        customerOrder.textContent = `想要${gameData.customer.teaChoice}${toppingText}`;
    }

    // 更新耐心条
    if (patienceBar && patienceFill && patienceText) {
        patienceBar.style.display = 'block';

        const elapsed = Date.now() - gameData.customer.arrivalTime;
        const remaining = Math.max(0, gameData.customer.patience - elapsed);
        const percentage = (remaining / gameData.customer.maxPatience) * 100;

        patienceFill.style.width = `${percentage}%`;
        patienceText.textContent = `耐心：${Math.round(percentage)}%`;

        // 根据耐心值改变颜色
        if (percentage > 60) {
            patienceFill.style.background = 'linear-gradient(90deg, #4CAF50, #81C784)';
        } else if (percentage > 30) {
            patienceFill.style.background = 'linear-gradient(90deg, #FFD54F, #FFC107)';
        } else {
            patienceFill.style.background = 'linear-gradient(90deg, #F44336, #E57373)';
        }
    }
}

// 更新铜板显示
function updateCoinsDisplay() {
    const coinCount = document.getElementById('coin-count');
    if (coinCount) {
        coinCount.textContent = gameData.coins;
    }
}

// 更新进度条
function updateProgressBars() {
    // 更新炉灶进度条
    gameData.stoves.forEach((stove, index) => {
        if (stove.state === 'cooking') {
            const stoveCard = document.querySelector(`[data-stove-id="${index}"]`);
            if (stoveCard) {
                const progressFill = stoveCard.querySelector('.progress-fill');
                if (progressFill) {
                    const progress = getStoveProgress(stove);
                    progressFill.style.width = `${progress}%`;
                }
            }
        }
    });
}

// 更新计时器
function updateTimers() {
    // 更新田地计时器
    gameData.plots.forEach((plot, index) => {
        if (plot.state === 'growing') {
            const plotCard = document.querySelector(`[data-plot-id="${index}"]`);
            if (plotCard) {
                const timer = plotCard.querySelector('.plot-timer');
                if (timer) {
                    const elapsed = Date.now() - plot.stageStartTime;
                    const remaining = Math.max(0, gameData.stageDuration - elapsed);
                    const seconds = Math.ceil(remaining / 1000);

                    if (seconds > 0) {
                        const minutes = Math.floor(seconds / 60);
                        const secs = seconds % 60;
                        timer.textContent = `⏰ ${minutes}:${secs.toString().padStart(2, '0')}`;
                    } else {
                        timer.textContent = '✨ 即将成熟！';
                    }
                }
            }
        }
    });

    // 更新炉灶计时器
    gameData.stoves.forEach((stove, index) => {
        if (stove.state === 'cooking') {
            const stoveCard = document.querySelector(`[data-stove-id="${index}"]`);
            if (stoveCard) {
                const timer = stoveCard.querySelector('.cooking-timer');
                if (timer) {
                    const elapsed = Date.now() - stove.startTime;
                    const remaining = Math.max(0, stove.boilDuration - elapsed);
                    const seconds = Math.ceil(remaining / 1000);

                    if (seconds > 0) {
                        const minutes = Math.floor(seconds / 60);
                        const secs = seconds % 60;
                        timer.textContent = `⏰ ${minutes}:${secs.toString().padStart(2, '0')}`;
                    } else {
                        timer.textContent = '✨ 即将完成！';
                    }
                }
            }
        }
    });

    // 更新加工台计时器
    if (gameData.processingBoard.state === 'processing') {
        updateProcessingBoard();
    }
}

// 显示篮子面板（种植选择）
function showBasketPanel(plotIndex = null) {
    const panel = document.createElement('div');
    panel.className = 'basket-panel';

    // 检测是否为手机端
    const isMobile = window.innerWidth <= 768;

    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: ${isMobile ? '12px' : '20px'};
        padding: ${isMobile ? '16px' : '20px'};
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: ${isMobile ? '88vw' : '90vw'};
        max-height: ${isMobile ? '70vh' : '80vh'};
        overflow-y: auto;
        min-width: ${isMobile ? '0' : '300px'};
        width: ${isMobile ? '88vw' : 'auto'};
    `;

    const availableSeeds = Object.entries(gameData.seeds).filter(([name, count]) => count > 0);

    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #2E7D32;">🧺 选择种子</h3>
            <button class="close-basket-panel" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div style="margin-bottom: 15px; color: #666; font-size: 14px;">
            ${plotIndex !== null ? `为田地${plotIndex + 1}选择种子：` : '选择要种植的种子：'}
        </div>
        <div class="seed-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 6px;">
            ${availableSeeds.map(([seedName, count]) => `
                <button class="seed-option" data-seed="${seedName}" style="
                    background: #E8F5E8;
                    border: 2px solid #81C784;
                    border-radius: 8px;
                    padding: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    min-height: 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="font-size: 14px; margin-bottom: 3px;">${getSeedIcon(seedName)}</div>
                    <div style="font-size: 9px; font-weight: 500; margin-bottom: 2px; line-height: 1.1;">${seedName}</div>
                    <div style="font-size: 8px; color: #666;">x${count}</div>
                </button>
            `).join('')}
        </div>
        ${availableSeeds.length === 0 ? '<div style="text-align: center; color: #999; padding: 20px;">没有可种植的种子</div>' : ''}
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-basket-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    panel.querySelectorAll('.seed-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const seedName = btn.dataset.seed;

            if (plotIndex !== null) {
                // 直接种植到指定田地
                plantSeed(plotIndex, seedName);
            } else {
                // 选择田地种植
                selectPlotForPlanting(seedName);
            }

            document.body.removeChild(panel);
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#4CAF50';
            btn.style.color = 'white';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#E8F5E8';
            btn.style.color = '#2E7D32';
        });
    });
}

// 种植种子
function plantSeed(plotIndex, seedName) {
    const plot = gameData.plots[plotIndex];

    if (plot.state !== 'empty') {
        addMessage('❌ 这块田地已经种植了作物');
        return;
    }

    if (!gameData.seeds[seedName] || gameData.seeds[seedName] <= 0) {
        addMessage('❌ 没有足够的种子');
        return;
    }

    // 消耗种子
    gameData.seeds[seedName]--;

    // 种植
    plot.state = 'growing';
    plot.growthStage = 0;
    plot.stageStartTime = Date.now();
    plot.plantType = seedName;

    // 播放种植音效
    const woodAudio = new Audio('music/wood.mp3');
    woodAudio.volume = 0.1; // 音量10%，更温和
    woodAudio.play().catch(e => console.log('种植音效播放失败', e));

    addMessage(`🌱 在田地${plotIndex + 1}种植了${seedName}`);

    // 刷新显示
    initFarmGrid();
}

// 选择田地种植
function selectPlotForPlanting(seedName) {
    gameData.selectedSeedForPlanting = seedName;
    addMessage(`🌰 已选择${seedName}，请点击空田地进行种植`);

    // 高亮显示空田地
    document.querySelectorAll('.plot-card.empty').forEach(card => {
        card.classList.add('selected');

        const clickHandler = () => {
            const plotIndex = parseInt(card.dataset.plotId);
            plantSeed(plotIndex, seedName);

            // 移除高亮和事件监听器
            document.querySelectorAll('.plot-card').forEach(c => {
                c.classList.remove('selected');
                c.removeEventListener('click', clickHandler);
            });

            gameData.selectedSeedForPlanting = null;
        };

        card.addEventListener('click', clickHandler);
    });
}

// 保存游戏
function saveGame() {
    try {
        const saveData = {
            ...gameData,
            saveTime: Date.now(),
            version: '1.0'
        };

        localStorage.setItem('cuteTeaShop_save', JSON.stringify(saveData));
        debug('游戏已保存到本地存储');
        return true;
    } catch (error) {
        debug('保存游戏失败: ' + error.message);
        return false;
    }
}

// 加载游戏
function loadGame() {
    try {
        const saveData = localStorage.getItem('cuteTeaShop_save');
        if (!saveData) {
            debug('没有找到保存的游戏数据');
            return false;
        }

        const parsedData = JSON.parse(saveData);

        // 合并保存的数据到游戏数据
        Object.assign(gameData, parsedData);

        // 更新所有显示
        updateAllDisplays();

        debug('游戏已从本地存储加载');
        return true;
    } catch (error) {
        debug('加载游戏失败: ' + error.message);
        return false;
    }
}

// 添加到购物车
function addToCart(itemName, itemType, price) {
    // 确保购物车数组存在
    if (!gameData.cart) {
        gameData.cart = [];
    }

    console.log('添加到购物车:', itemName, itemType, price);
    console.log('当前购物车:', gameData.cart);

    const existingItem = gameData.cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        console.log('增加数量:', existingItem);
    } else {
        const newItem = {
            name: itemName,
            type: itemType,
            price: price,
            quantity: 1
        };
        gameData.cart.push(newItem);
        console.log('添加新物品:', newItem);
    }

    console.log('更新后购物车:', gameData.cart);

    updateCartBadge();
    addMessage(`🛒 已将 ${itemName} 添加到购物车`);

    // 延迟更新购物车显示区域，确保DOM已渲染
    setTimeout(() => {
        updateShopCartDisplay();
    }, 10);
}

// 更新商店面板中的购物车显示
function updateShopCartDisplay() {
    console.log('updateShopCartDisplay 被调用');

    const shopPanel = document.querySelector('.dynamic-shop-panel');
    if (!shopPanel) {
        console.log('找不到动态商店面板');
        return;
    }

    console.log('找到动态商店面板:', shopPanel);

    const cartArea = shopPanel.querySelector('.cart-area');
    if (!cartArea) {
        console.log('找不到购物车区域');
        console.log('所有带class的元素:', shopPanel.querySelectorAll('[class]'));
        return;
    }

    console.log('找到购物车区域:', cartArea);

    // 确保购物车数组存在
    if (!gameData.cart) {
        gameData.cart = [];
    }

    const cartTotal = getCartTotal();
    const cartCount = gameData.cart.reduce((total, item) => total + item.quantity, 0);

    console.log('购物车数据:', gameData.cart);
    console.log('购物车总数:', cartCount);
    console.log('购物车总价:', cartTotal);

    cartArea.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 8px;">🪙</span>
                <span style="font-size: 16px; font-weight: bold; color: #2E7D32;">铜板：${gameData.coins}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="font-size: 16px; margin-right: 8px;">🛒 购物车：${cartCount} 件</span>
                <span style="font-size: 16px; font-weight: bold; color: #FF6F00;">总计：${cartTotal} 铜板</span>
            </div>
        </div>

        <div style="display: flex; gap: 12px;">
            <button class="purchase-cart-btn" style="
                flex: 1;
                background: ${cartCount > 0 && gameData.coins >= cartTotal ? '#FF6F00' : '#CCC'};
                color: white;
                border: none;
                border-radius: 12px;
                padding: 12px 16px;
                font-size: 14px;
                font-weight: bold;
                cursor: ${cartCount > 0 && gameData.coins >= cartTotal ? 'pointer' : 'not-allowed'};
                transition: all 0.3s ease;
            " ${cartCount === 0 || gameData.coins < cartTotal ? 'disabled' : ''}>
                💰 立即购买 (${cartTotal} 铜板)
            </button>
            <button class="clear-cart-btn" style="
                background: #E0E0E0;
                color: #666;
                border: none;
                border-radius: 12px;
                padding: 12px 16px;
                font-size: 14px;
                cursor: ${cartCount > 0 ? 'pointer' : 'not-allowed'};
                transition: all 0.3s ease;
            " ${cartCount === 0 ? 'disabled' : ''}>
                🗑️ 清空
            </button>
        </div>

        <!-- 购物车内容 -->
        ${cartCount > 0 ? `
            <div style="margin-top: 12px; max-height: 120px; overflow-y: auto;">
                <div style="font-size: 12px; color: #666; margin-bottom: 8px;">购物车内容：</div>
                ${gameData.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; background: white; border-radius: 8px; margin-bottom: 4px; font-size: 12px;">
                        <span>${item.name} x${item.quantity}</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: #FF6F00; font-weight: bold;">${item.price * item.quantity} 铜板</span>
                            <button class="cart-decrease-btn" data-item="${item.name}" style="background: #E0E0E0; border: none; border-radius: 4px; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">-</button>
                            <button class="cart-increase-btn" data-item="${item.name}" style="background: #E0E0E0; border: none; border-radius: 4px; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">+</button>
                            <button class="cart-remove-btn" data-item="${item.name}" style="background: #FF5722; color: white; border: none; border-radius: 4px; width: 20px; height: 20px; font-size: 12px; cursor: pointer;">×</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;

    // 重新绑定购物车按钮事件
    bindCartButtonEvents(shopPanel);
}

// 从购物车移除
function removeFromCart(itemName) {
    const itemIndex = gameData.cart.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        gameData.cart.splice(itemIndex, 1);
        updateCartBadge();
        addMessage(`🗑️ 已从购物车移除 ${itemName}`);

        // 更新购物车显示区域
        updateShopCartDisplay();
    }
}

// 修改购物车物品数量
function changeCartQuantity(itemName, change) {
    const item = gameData.cart.find(item => item.name === itemName);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartBadge();

        // 更新购物车显示区域
        updateShopCartDisplay();
    }
}

// 计算购物车总价
function getCartTotal() {
    return gameData.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 购买购物车中的所有物品
function purchaseCart() {
    if (gameData.cart.length === 0) {
        addMessage('❌ 购物车是空的');
        return;
    }

    const total = getCartTotal();

    if (gameData.coins < total) {
        addMessage(`❌ 铜板不足！需要 ${total} 铜板，但只有 ${gameData.coins} 铜板`);
        return;
    }

    // 扣除铜板
    gameData.coins -= total;

    // 添加物品到库存
    gameData.cart.forEach(item => {
        if (item.type === 'seed') {
            if (!gameData.seeds[item.name]) {
                gameData.seeds[item.name] = 0;
            }
            gameData.seeds[item.name] += item.quantity;
            debug(`添加种子到种子库存: ${item.name} x${item.quantity}, 当前种子: ${gameData.seeds[item.name]}`);
        } else if (item.type === 'topping') {
            // 小料直接添加到小料区
            if (!gameData.toppings[item.name]) {
                gameData.toppings[item.name] = 0;
            }
            gameData.toppings[item.name] += item.quantity;
            debug(`添加小料到小料区: ${item.name} x${item.quantity}, 当前小料: ${gameData.toppings[item.name]}`);
        } else if (item.type === 'material') {
            // 原材料（如银耳、蜂蜜等）添加到库存，用于制茶或加工
            if (!gameData.inventory[item.name]) {
                gameData.inventory[item.name] = 0;
            }
            gameData.inventory[item.name] += item.quantity;
            debug(`添加原材料到库存: ${item.name} x${item.quantity}, 当前库存: ${gameData.inventory[item.name]}`);
        } else {
            // 处理其他未分类物品
            if (!gameData.inventory[item.name]) {
                gameData.inventory[item.name] = 0;
            }
            gameData.inventory[item.name] += item.quantity;
            debug(`添加物品到库存: ${item.name} x${item.quantity}, 当前库存: ${gameData.inventory[item.name]}`);
        }
    });

    addMessage(`✅ 购买成功！花费 ${total} 铜板`);

    // 清空购物车
    gameData.cart = [];
    updateCartBadge();
    updateCoinsDisplay();
    updateToppingsDisplay();

    // 更新购物车显示区域
    updateShopCartDisplay();
}

// 绑定购物车按钮事件
function bindCartButtonEvents(panel) {
    // 购买购物车
    const purchaseBtn = panel.querySelector('.purchase-cart-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', () => {
            purchaseCart();
        });
    }

    // 清空购物车
    const clearBtn = panel.querySelector('.clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            gameData.cart = [];
            updateCartBadge();
            addMessage('🗑️ 已清空购物车');
            updateShopCartDisplay();
        });
    }

    // 购物车商品数量调整按钮
    panel.querySelectorAll('.cart-decrease-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.dataset.item;
            changeCartQuantity(itemName, -1);
        });
    });

    panel.querySelectorAll('.cart-increase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.dataset.item;
            changeCartQuantity(itemName, 1);
        });
    });

    panel.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.dataset.item;
            removeFromCart(itemName);
        });
    });
}

// 显示商店面板
function showShopPanel() {
    const panel = document.createElement('div');
    panel.className = 'shop-panel dynamic-shop-panel';
    // 检测是否为手机端
    const isMobile = window.innerWidth <= 768;

    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: ${isMobile ? '12px' : '20px'};
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: ${isMobile ? '88vw' : '90vw'};
        max-height: ${isMobile ? '70vh' : '80vh'};
        height: ${isMobile ? '70vh' : 'auto'};
        overflow: hidden;
        min-width: ${isMobile ? '0' : '400px'};
        width: ${isMobile ? '88vw' : 'auto'};
        padding: 0;
        margin: 0;
    `;

    const cartTotal = getCartTotal();
    const cartCount = gameData.cart.reduce((total, item) => total + item.quantity, 0);

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">🏪 茶铺商店</h3>
            <button class="close-shop-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>

        <div class="cart-area" style="background: #F8F9FA; padding: ${isMobile ? '8px' : '16px'}; border-bottom: 1px solid #E0E0E0;">
            <div style="display: ${isMobile ? 'block' : 'flex'}; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; ${isMobile ? 'margin-bottom: 8px;' : ''}">
                    <span style="font-size: ${isMobile ? '18px' : '20px'}; margin-right: 8px;">🪙</span>
                    <span style="font-size: ${isMobile ? '14px' : '16px'}; font-weight: bold; color: #2E7D32;">铜板：${gameData.coins}</span>
                </div>
                <div style="display: flex; align-items: center; ${isMobile ? 'font-size: 14px;' : ''}">
                    <span style="font-size: ${isMobile ? '14px' : '16px'}; margin-right: 8px;">🛒 购物车：${cartCount} 件</span>
                    <span style="font-size: ${isMobile ? '14px' : '16px'}; font-weight: bold; color: #FF6F00;">总计：${cartTotal} 铜板</span>
                </div>
            </div>

            <div style="display: flex; gap: ${isMobile ? '8px' : '12px'};">
                <button class="purchase-cart-btn" style="
                    flex: 1;
                    background: ${cartCount > 0 && gameData.coins >= cartTotal ? '#FF6F00' : '#CCC'};
                    color: white;
                    border: none;
                    border-radius: ${isMobile ? '8px' : '12px'};
                    padding: ${isMobile ? '14px 12px' : '12px 16px'};
                    font-size: ${isMobile ? '13px' : '14px'};
                    font-weight: bold;
                    cursor: ${cartCount > 0 && gameData.coins >= cartTotal ? 'pointer' : 'not-allowed'};
                    transition: all 0.3s ease;
                    min-height: ${isMobile ? '44px' : 'auto'};
                " ${cartCount === 0 || gameData.coins < cartTotal ? 'disabled' : ''}>
                    💰 立即购买 (${cartTotal} 铜板)
                </button>
                <button class="clear-cart-btn" style="
                    background: #E0E0E0;
                    color: #666;
                    border: none;
                    border-radius: ${isMobile ? '8px' : '12px'};
                    padding: ${isMobile ? '14px 12px' : '12px 16px'};
                    font-size: ${isMobile ? '13px' : '14px'};
                    cursor: ${cartCount > 0 ? 'pointer' : 'not-allowed'};
                    transition: all 0.3s ease;
                    min-height: ${isMobile ? '44px' : 'auto'};
                    ${isMobile ? 'min-width: 60px;' : ''}
                " ${cartCount === 0 ? 'disabled' : ''}>
                    🗑️ 清空
                </button>
            </div>

            ${cartCount > 0 ? `
                <div style="margin-top: 8px; max-height: ${isMobile ? '120px' : '160px'}; overflow-y: auto;">
                    <div style="font-size: ${isMobile ? '11px' : '12px'}; color: #666; margin-bottom: 8px;">购物车内容：</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${isMobile ? '80px' : '100px'}, 1fr)); gap: ${isMobile ? '6px' : '8px'};">
                        ${gameData.cart.map(item => `
                            <div style="
                                background: #E8F5E8;
                                border: 2px solid #81C784;
                                border-radius: 8px;
                                padding: ${isMobile ? '6px' : '8px'};
                                text-align: center;
                                position: relative;
                                transition: all 0.3s ease;
                            ">
                                <div style="font-size: ${isMobile ? '16px' : '20px'}; margin-bottom: 4px;">${getItemIcon(item.name)}</div>
                                <div style="font-size: ${isMobile ? '10px' : '11px'}; font-weight: 500; margin-bottom: 2px; line-height: 1.2;">${item.name}</div>
                                <div style="font-size: ${isMobile ? '9px' : '10px'}; color: #666; margin-bottom: 4px;">x${item.quantity}</div>
                                <div style="font-size: ${isMobile ? '9px' : '10px'}; color: #FF6F00; font-weight: bold; margin-bottom: 4px;">${item.price * item.quantity}铜板</div>
                                <div style="display: flex; gap: 2px; justify-content: center;">
                                    <button class="cart-decrease-btn" data-item="${item.name}" style="background: #E0E0E0; border: none; border-radius: 4px; width: 18px; height: 18px; font-size: 10px; cursor: pointer;">-</button>
                                    <button class="cart-increase-btn" data-item="${item.name}" style="background: #E0E0E0; border: none; border-radius: 4px; width: 18px; height: 18px; font-size: 10px; cursor: pointer;">+</button>
                                    <button class="cart-remove-btn" data-item="${item.name}" style="background: #FF5722; color: white; border: none; border-radius: 4px; width: 18px; height: 18px; font-size: 10px; cursor: pointer;">×</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>

        <div class="panel-content" style="padding: ${isMobile ? '10px' : '20px'}; max-height: ${isMobile ? '35vh' : '50vh'}; overflow-y: auto;">
            <div class="shop-categories">
                <div class="shop-category">
                    <h4 style="color: #4CAF50; margin-bottom: 15px; border-bottom: 2px solid #E8F5E8; padding-bottom: 8px;">🌿 基础材料</h4>
                    <div class="shop-items" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${isMobile ? '100px' : '120px'}, 1fr)); gap: ${isMobile ? '8px' : '10px'};">
                        ${Object.entries(gameData.shopItems).map(([itemName, itemData]) => {
                            // 确定物品类型：红糖、蜂蜜、乌龙茶包和冰糖是小料，银耳和小鱼干是原材料
                            const itemType = (itemName === '红糖' || itemName === '蜂蜜' || itemName === '乌龙茶包' || itemName === '冰糖') ? 'topping' : 'material';
                            return `
                            <div class="shop-item" style="
                                background: #E8F5E8;
                                border: 2px solid #81C784;
                                border-radius: ${isMobile ? '8px' : '12px'};
                                padding: ${isMobile ? '8px' : '12px'};
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                position: relative;
                            ">
                                <div style="font-size: ${isMobile ? '20px' : '24px'}; margin-bottom: ${isMobile ? '6px' : '8px'};">${getShopItemIcon(itemName)}</div>
                                <div style="font-size: ${isMobile ? '11px' : '12px'}; font-weight: 500; margin-bottom: ${isMobile ? '4px' : '6px'}; color: #2E7D32; line-height: 1.2;">${itemName}</div>
                                <div style="font-size: ${isMobile ? '10px' : '11px'}; color: #666; margin-bottom: ${isMobile ? '6px' : '8px'};">${itemData.price} 铜板</div>
                                <button class="add-to-cart-btn" data-item="${itemName}" data-type="${itemType}" data-price="${itemData.price}" style="
                                    background: #4CAF50;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    padding: ${isMobile ? '4px 6px' : '6px 8px'};
                                    font-size: ${isMobile ? '9px' : '10px'};
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    width: 100%;
                                ">
                                    加入购物车
                                </button>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>

                <div class="shop-category" style="margin-top: 20px;">
                    <h4 style="color: #4CAF50; margin-bottom: 15px; border-bottom: 2px solid #E8F5E8; padding-bottom: 8px;">🌰 种子商店</h4>
                    <div class="shop-items" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${isMobile ? '100px' : '120px'}, 1fr)); gap: ${isMobile ? '8px' : '10px'};">
                        ${MATERIALS.map(material => {
                            const price = gameData.seedInfo[material]?.price || 2;
                            return `
                            <div class="shop-item" style="
                                background: #E8F5E8;
                                border: 2px solid #81C784;
                                border-radius: ${isMobile ? '8px' : '12px'};
                                padding: ${isMobile ? '8px' : '12px'};
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                position: relative;
                            ">
                                <div style="font-size: ${isMobile ? '20px' : '24px'}; margin-bottom: ${isMobile ? '6px' : '8px'};">${getSeedIcon(material)}</div>
                                <div style="font-size: ${isMobile ? '11px' : '12px'}; font-weight: 500; margin-bottom: ${isMobile ? '4px' : '6px'}; color: #2E7D32; line-height: 1.2;">${material}种子</div>
                                <div style="font-size: ${isMobile ? '10px' : '11px'}; color: #666; margin-bottom: ${isMobile ? '6px' : '8px'};">${price} 铜板</div>
                                <button class="add-to-cart-btn" data-item="${material}" data-type="seed" data-price="${price}" style="
                                    background: #4CAF50;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    padding: ${isMobile ? '4px 6px' : '6px 8px'};
                                    font-size: ${isMobile ? '9px' : '10px'};
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    width: 100%;
                                ">
                                    加入购物车
                                </button>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-shop-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    // 绑定购物车相关按钮事件
    bindCartButtonEvents(panel);

    // 添加到购物车按钮
    panel.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('点击了加入购物车按钮');
            const itemName = btn.dataset.item;
            const itemType = btn.dataset.type;
            const price = parseInt(btn.dataset.price);

            console.log('按钮数据:', { itemName, itemType, price });

            addToCart(itemName, itemType, price);
        });
    });
}

// 显示配方大全
function showRecipeBook() {
    const panel = document.createElement('div');
    panel.className = 'recipe-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow: hidden;
        min-width: 450px;
    `;

    const allRecipes = [
        { name: '五味子饮', ingredients: ['五味子'], unlockType: '基础配方' },
        { name: '柠檬茶', ingredients: ['柠檬'], unlockType: '基础配方' },
        { name: '洛神玫瑰饮', ingredients: ['洛神花', '玫瑰花', '山楂'], unlockType: '凌小路解锁' },
        { name: '桂圆红枣茶', ingredients: ['桂圆', '红枣', '枸杞'], unlockType: '花花解锁' },
        { name: '焦香大麦茶', ingredients: ['大麦'], unlockType: '江飞飞解锁' },
        { name: '三花决明茶', ingredients: ['菊花', '金银花', '决明子', '枸杞'], unlockType: '江三解锁' },
        { name: '薄荷甘草凉茶', ingredients: ['薄荷', '甘草'], unlockType: '江四解锁' },
        { name: '陈皮姜米茶', ingredients: ['陈皮', '生姜'], unlockType: '池云旗解锁' },
        { name: '冬瓜荷叶饮', ingredients: ['冬瓜', '荷叶', '薏米'], unlockType: '江潮解锁' },
        { name: '古法酸梅汤', ingredients: ['乌梅', '山楂', '陈皮', '甘草', '桂花'], unlockType: '池惊暮解锁' },
        { name: '小吊梨汤', ingredients: ['雪花梨', '银耳', '话梅', '枸杞'], unlockType: '江敕封解锁' },
        { name: '桑菊润燥茶', ingredients: ['桑叶', '杭白菊'], unlockType: '30人解锁' },
        { name: '桂花酒酿饮', ingredients: ['桂花', '酒酿'], unlockType: '60人解锁' },
        { name: '蜜桃乌龙冷萃', ingredients: ['水蜜桃', '乌龙茶包'], unlockType: '90人解锁' },
        { name: '黄芪枸杞茶', ingredients: ['黄芪', '枸杞'], unlockType: '120人解锁' },
        { name: '竹蔗茅根马蹄水', ingredients: ['甘蔗', '白茅根', '马蹄'], unlockType: '150人解锁' }
    ];

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">📖 配方大全</h3>
            <button class="close-recipe-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div class="panel-content" style="padding: 20px; max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 15px; color: #666; font-size: 14px;">
                已解锁配方：${gameData.unlockedRecipes.length} / ${allRecipes.length}
            </div>

            <div class="recipe-list" style="display: grid; gap: 12px;">
                ${allRecipes.map(recipe => {
                    const isUnlocked = gameData.unlockedRecipes.includes(recipe.name);
                    return `
                        <div class="recipe-item" style="
                            padding: 15px;
                            background: ${isUnlocked ? '#E8F5E8' : '#F5F5F5'};
                            border-radius: 12px;
                            border: 2px solid ${isUnlocked ? '#81C784' : '#DDD'};
                            opacity: ${isUnlocked ? '1' : '0.6'};
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                <div>
                                    <div style="font-weight: bold; color: ${isUnlocked ? '#2E7D32' : '#666'}; margin-bottom: 4px;">
                                        ${isUnlocked ? '🍵' : '🔒'} ${recipe.name}
                                    </div>
                                    <div style="font-size: 12px; color: #666;">
                                        ${recipe.unlockType}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 12px; color: #666; margin-bottom: 4px;">所需材料：</div>
                                    <div style="font-size: 11px; color: ${isUnlocked ? '#4CAF50' : '#999'};">
                                        ${isUnlocked ? recipe.ingredients.join('、') : '???'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-recipe-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });
}

// 显示测试面板
function showTestPanel() {
    const panel = document.createElement('div');
    panel.className = 'test-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow: hidden;
        min-width: 400px;
    `;

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">🧪 测试模式</h3>
            <button class="close-test-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div class="panel-content" style="padding: 20px; max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 20px;">
                <h4 style="color: #4CAF50; margin-bottom: 10px;">🎮 游戏测试</h4>
                <div style="display: grid; gap: 10px;">
                    <button class="test-btn" data-action="add-coins" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        💰 添加1000铜板
                    </button>
                    <button class="test-btn" data-action="add-materials" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🌿 添加所有材料
                    </button>
                    <button class="test-btn" data-action="add-toppings" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🍯 添加所有小料
                    </button>
                    <button class="test-btn" data-action="unlock-recipes" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        📖 解锁所有配方
                    </button>
                    <button class="test-btn" data-action="spawn-customer" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        👑 生成VIP顾客
                    </button>
                    <button class="test-btn" data-action="add-teas" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🍵 添加所有茶饮
                    </button>
                    <button class="test-btn" data-action="fast-grow" style="background: #4CAF50; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🌱 快速成熟农作物
                    </button>
                    <button class="test-btn" data-action="add-day" style="background: #FF9800; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        📅 增加一天
                    </button>
                    <button class="test-btn" data-action="reset-game" style="background: #F44336; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🔄 重置游戏
                    </button>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h4 style="color: #E91E63; margin-bottom: 10px;">🐱 猫咪系统测试</h4>
                <div style="display: grid; gap: 10px;">
                    <button class="test-btn" data-action="spawn-cat" style="background: #E91E63; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🐱 立刻刷新猫猫
                    </button>
                    <button class="test-btn" data-action="add-fish" style="background: #2196F3; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🐟 添加小鱼干x10
                    </button>
                    <button class="test-btn" data-action="make-fish-dish" style="background: #009688; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        🍲 制作白水煮鱼
                    </button>
                    <button class="test-btn" data-action="max-cat-intimacy" style="background: #9C27B0; color: white; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
                        💕 所有猫咪满亲密度
                    </button>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h4 style="color: #4CAF50; margin-bottom: 10px;">📊 游戏状态</h4>
                <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
                    <div><strong>铜板：</strong>${gameData.coins}</div>
                    <div><strong>已服务顾客：</strong>${gameData.servedCustomers || 0}</div>
                    <div><strong>已解锁配方：</strong>${gameData.unlockedRecipes.length}/16</div>
                    <div><strong>当前季节：</strong>${gameData.currentSeason}</div>
                    <div><strong>当前天气：</strong>${gameData.currentWeather}</div>
                    <div><strong>游戏天数：</strong>${gameData.currentDay}</div>
                    <div><strong>制作的茶饮：</strong>${gameData.madeTeas.length}</div>
                    <div><strong>当前顾客：</strong>${gameData.customer.active ? gameData.customer.name : '无'}</div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-test-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    // 测试按钮事件
    panel.querySelectorAll('.test-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            executeTestAction(action);

            // 关闭面板并重新打开以更新状态显示
            document.body.removeChild(panel);
            showTestPanel();
        });
    });
}

// 执行测试操作
function executeTestAction(action) {
    switch (action) {
        case 'add-coins':
            gameData.coins += 1000;
            addMessage('💰 添加了1000铜板');
            updateCoinsDisplay();
            break;

        case 'add-materials':
            MATERIALS.forEach(material => {
                gameData.inventory[material] = (gameData.inventory[material] || 0) + 10;
            });
            addMessage('🌿 添加了所有材料各10个');
            break;

        case 'add-toppings':
            Object.keys(gameData.toppings).forEach(topping => {
                gameData.toppings[topping] = 10;
            });
            addMessage('🍯 添加了所有小料各10个');
            updateToppingsDisplay();
            break;

        case 'unlock-recipes':
            const allRecipes = [
                '洛神玫瑰饮', '桂圆红枣茶', '焦香大麦茶', '三花决明茶', '薄荷甘草凉茶',
                '陈皮姜米茶', '冬瓜荷叶饮', '古法酸梅汤', '小吊梨汤',
                '桑菊润燥茶', '桂花酒酿饮', '蜜桃乌龙冷萃', '黄芪枸杞茶', '竹蔗茅根马蹄水'
            ];
            allRecipes.forEach(recipe => {
                if (!gameData.unlockedRecipes.includes(recipe)) {
                    gameData.unlockedRecipes.push(recipe);
                }
            });
            addMessage('📖 解锁了所有配方');
            break;

        case 'open-test-page':
            openTestPage();
            break;

        case 'spawn-customer':
            if (!gameData.customer.active) {
                spawnTestCustomer();
            } else {
                addMessage('❌ 已有顾客在等待');
            }
            break;

        case 'add-teas':
            const completeTeas = gameData.unlockedRecipes.slice(0, 5);
            completeTeas.forEach((tea, index) => {
                const teaId = Date.now() + index;
                const newTea = {
                    id: teaId,
                    name: tea,
                    toppings: []
                };
                gameData.madeTeas.push(newTea);
                gameData.teaTemps[teaId] = 'hot';
                gameData.teaMakeTimes[teaId] = Date.now();
            });
            addMessage(`🍵 添加了${completeTeas.length}杯茶饮`);
            updateTeaDisplay();
            break;

        case 'fast-grow':
            gameData.plots.forEach((plot, index) => {
                if (plot.state === 'growing') {
                    plot.state = 'mature';
                    addMessage(`🌺 田地${index + 1}的作物快速成熟`);
                }
            });
            initFarmGrid();
            break;

            case 'add-day':
                gameData.currentDay += 1;
                addMessage(`📅 时间流逝，现在是第${gameData.currentDay}天`);
                updateWeatherDisplay();
                break;

        case 'reset-game':
            if (confirm('确定要重置游戏吗？这将清除所有进度！')) {
                localStorage.removeItem('cuteTeaShop_save');
                location.reload();
            }
            break;

        // 猫咪系统测试功能
        case 'spawn-cat':
            spawnTestCat();
            break;

        case 'add-fish':
            gameData.inventory['小鱼干'] = (gameData.inventory['小鱼干'] || 0) + 10;
            addMessage('🐟 添加了10个小鱼干');
            updateAllDisplays();
            break;

        case 'make-fish-dish':
            if (gameData.inventory['小鱼干'] && gameData.inventory['小鱼干'] > 0) {
                // 消耗小鱼干
                gameData.inventory['小鱼干']--;

                // 制作白水煮鱼
                const fishDishId = Date.now();
                const fishDish = {
                    id: fishDishId,
                    name: '白水煮鱼',
                    toppings: []
                };
                gameData.madeTeas.push(fishDish);
                gameData.teaTemps[fishDishId] = 'hot';
                gameData.teaMakeTimes[fishDishId] = Date.now();

                addMessage('🍲 制作了一份白水煮鱼');
                updateAllDisplays();
            } else {
                addMessage('❌ 没有小鱼干，无法制作白水煮鱼');
            }
            break;

        case 'max-cat-intimacy':
            Object.keys(gameData.cats.intimacy).forEach(catName => {
                gameData.cats.intimacy[catName] = 100;
                gameData.cats.feedCount[catName] = 10;
                gameData.cats.lastSeen[catName] = Date.now();
            });
            addMessage('💕 所有猫咪亲密度已设为满级');
            updateAllDisplays();
            break;
    }
}

// 生成测试顾客
function spawnTestCustomer() {
    const vipCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];
    const customerName = vipCustomers[Math.floor(Math.random() * vipCustomers.length)];

    // 排除白水煮鱼，只给猫咪
    const availableRecipes = gameData.unlockedRecipes.filter(recipe => recipe !== '白水煮鱼');
    const teaChoice = availableRecipes.length > 0 ?
        availableRecipes[Math.floor(Math.random() * availableRecipes.length)] :
        '五味子饮';

    gameData.customer = {
        active: true,
        name: customerName,
        isVIP: true,
        teaChoice: teaChoice,
        toppingChoices: [],
        arrivalTime: Date.now(),
        patience: 300000, // 5分钟
        maxPatience: 300000,
        served: false
    };

    addMessage(`👑 测试VIP顾客 ${customerName} 来了，想要${teaChoice}`);
    updateCustomerDisplay();
}

// 生成测试猫咪
function spawnTestCat() {
    const catBreeds = ['大橘猫', '狸花猫', '黑猫小手套', '小白猫', '大猫猫'];
    const catIcons = {
        '大橘猫': '🧡',
        '狸花猫': '🐱',
        '黑猫小手套': '🖤',
        '小白猫': '🤍',
        '大猫猫': '😺'
    };

    const randomCat = catBreeds[Math.floor(Math.random() * catBreeds.length)];

    gameData.cats.currentCat = {
        name: randomCat,
        icon: catIcons[randomCat],
        arrivalTime: Date.now(),
        stayDuration: 30000, // 30秒
        fed: false
    };

    // 更新上次猫咪出现时间
    gameData.cats.lastCatTime = Date.now();

    addMessage(`🐱 测试猫咪 ${randomCat} ${catIcons[randomCat]} 来了！它会停留30秒`);
    updateCustomerDisplay();
}

// 测试增加顾客访问次数（用于测试彩蛋码功能）
function addTestVisits() {
    const vipCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];

    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    // 为每个VIP顾客增加5次访问
    vipCustomers.forEach(customerName => {
        gameData.customerVisits[customerName] = (gameData.customerVisits[customerName] || 0) + 5;
    });

    addMessage('🎯 已为所有VIP顾客增加5次访问记录');
    updateManagementDisplay();
}

// 测试彩蛋码功能
function testEasterEggCodes() {
    const vipCustomers = ['凌小路', '花花', '江飞飞', '江三', '江四', '池云旗', '江潮', '池惊暮', '江敕封'];

    if (!gameData.customerVisits) {
        gameData.customerVisits = {};
    }

    // 将所有VIP顾客访问次数设为12次以上
    vipCustomers.forEach(customerName => {
        gameData.customerVisits[customerName] = 12;
    });

    // 解锁所有配方以便显示故事
    const allSpecialRecipes = ['洛神玫瑰饮', '桂圆红枣茶', '焦香大麦茶', '三花决明茶', '薄荷甘草凉茶', '陈皮姜米茶', '冬瓜荷叶饮', '古法酸梅汤', '小吊梨汤'];
    allSpecialRecipes.forEach(recipe => {
        if (!gameData.unlockedRecipes.includes(recipe)) {
            gameData.unlockedRecipes.push(recipe);
        }
    });

    updateManagementDisplay();
    addMessage('🎊 已将所有VIP顾客访问次数设为12次，可以查看彩蛋码和故事了！');

    // 显示彩蛋码信息
    setTimeout(() => {
        // 检查是否已经有彩蛋码弹窗存在
        const existingPanel = document.getElementById('easter-egg-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        let message = "🎊 特殊彩蛋码列表:\n\n";
        vipCustomers.forEach(customerName => {
            const easterEggCode = generateEasterEggCode(customerName, 12);
            if (easterEggCode) {
                message += `${customerName}: ${easterEggCode}\n`;
            }
        });

        // 创建一个更美观的弹窗
        const panel = document.createElement('div');
        panel.id = 'easter-egg-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FFD700, #FFA500);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
            z-index: 1002;
            max-width: 90vw;
            max-height: 80vh;
            overflow-y: auto;
            border: 3px solid #FF8C00;
        `;

        panel.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #8B4513; margin-bottom: 10px;">🎊 特殊彩蛋码</h2>
                <p style="color: #8B0000; font-size: 14px;">恭喜解锁所有VIP顾客的专属纪念码！</p>
            </div>
            <div style="background: rgba(255,255,255,0.9); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                ${vipCustomers.map(customerName => {
                    const easterEggCode = generateEasterEggCode(customerName, 12);
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #ddd;">
                            <span style="font-weight: bold; color: #2E7D32;">${getCustomerIcon(customerName, true)} ${customerName}</span>
                            <span style="font-family: 'Courier New', monospace; color: #8B0000; font-weight: bold;">${easterEggCode}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="text-align: center;">
                <button id="close-easter-egg-panel" style="
                    background: #8B4513;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 10px 20px;
                    font-size: 14px;
                    cursor: pointer;
                ">关闭</button>
            </div>
        `;

        // 添加关闭事件监听器
        const closeBtn = panel.querySelector('#close-easter-egg-panel');
        const closePanel = () => {
            panel.remove();
            // 移除ESC键监听器
            document.removeEventListener('keydown', escKeyHandler);
        };

        closeBtn.addEventListener('click', closePanel);

        // 点击背景关闭（可选）
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                closePanel();
            }
        });

        // ESC键关闭
        const escKeyHandler = (e) => {
            if (e.key === 'Escape') {
                closePanel();
            }
        };
        document.addEventListener('keydown', escKeyHandler);

        document.body.appendChild(panel);
        addMessage("🎊 显示了所有彩蛋码");
    }, 1000);
}

// 恢复测试数据
function resetTestData() {
    if (confirm('确定要恢复测试前的状态吗？\n\n这将重置所有顾客访问记录和解锁的配方。')) {
        // 重置顾客访问记录
        gameData.customerVisits = {};

        // 重置为初始配方
        gameData.unlockedRecipes = ["五味子饮", "柠檬茶"];

        updateManagementDisplay();
        addMessage('🔄 已恢复到测试前状态');
    }
}

// 显示特殊顾客档案弹窗
function showCustomerProfiles() {
    const modal = document.getElementById('customer-profile-modal');
    const profileList = document.getElementById('customer-profile-list');

    if (!modal || !profileList) return;

    // 清空现有内容
    profileList.innerHTML = '';

    // 生成顾客档案列表
    gameData.customerNames.forEach(customerName => {
        const visitCount = gameData.customerVisits[customerName] || 0;
        const profileRow = document.createElement('div');
        profileRow.className = 'customer-profile-row';

        // 查找该顾客解锁的配方
        let unlockedRecipe = '';
        for (const [recipeName, rule] of Object.entries(gameData.recipeUnlockRules)) {
            if (rule.customer === customerName && gameData.unlockedRecipes.includes(recipeName)) {
                unlockedRecipe = recipeName;
                break;
            }
        }

        profileRow.innerHTML = `
            <div class="profile-avatar">🌵</div>
            <div class="profile-info">
                <div class="profile-name">${customerName}</div>
                <div class="profile-details">
                    <span class="visit-count">访问次数: ${visitCount}</span>
                    <span class="unlock-status">${unlockedRecipe ? `已解锁: ${unlockedRecipe}` : '暂无解锁配方'}</span>
                </div>
            </div>
        `;

        profileList.appendChild(profileRow);
    });

    // 显示弹窗
    modal.style.display = 'flex';
}

// 关闭特殊顾客档案弹窗
function closeCustomerProfiles() {
    const modal = document.getElementById('customer-profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 显示猫猫档案弹窗
function showCatProfiles() {
    const modal = document.getElementById('cat-profile-modal');
    const profileList = document.getElementById('cat-profile-list');

    if (!modal || !profileList) return;

    // 清空现有内容
    profileList.innerHTML = '';

    // 猫咪品种列表
    const catBreeds = [
        { name: '大橘猫', icon: '🧡', description: '温和友善的大橘猫，喜欢晒太阳' },
        { name: '狸花猫', icon: '🐱', description: '活泼好动的狸花猫，很有灵性' },
        { name: '黑猫小手套', icon: '🖤', description: '优雅神秘的黑猫，带着白色小手套' },
        { name: '小白猫', icon: '🤍', description: '纯洁可爱的小白猫，很爱干净' },
        { name: '大猫猫', icon: '😺', description: '憨厚可爱的大猫猫，食量很大' }
    ];

    // 添加亲密度规则说明
    const rulesDiv = document.createElement('div');
    rulesDiv.className = 'cat-rules';
    rulesDiv.innerHTML = `
        <div style="background: #E8F5E8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <h4 style="color: #2E7D32; margin: 0 0 10px 0;">🐱 猫咪系统规则</h4>
            <div style="color: #388E3C; font-size: 14px; line-height: 1.6;">
                <p><strong>出现规律：</strong>每8天出现一次，停留30秒</p>
                <p><strong>喂食方式：</strong>用白水煮鱼喂食（小鱼干制作）</p>
                <p><strong>亲密度：</strong>每次喂食+10，最高5000</p>
                <p><strong>礼物系统：</strong></p>
                <ul style="margin: 5px 0; padding-left: 20px;">
                    <li><strong>500+：</strong>30%概率1个基础原料</li>
                    <li><strong>1500+：</strong>50%概率1-2个制茶原料</li>
                    <li><strong>3000+：</strong>70%概率2个高级原料</li>
                    <li><strong>5000：</strong>100%概率3个顶级原料</li>
                </ul>
            </div>
        </div>
    `;
    profileList.appendChild(rulesDiv);

    // 为每只猫咪创建档案卡片
    catBreeds.forEach(cat => {
        const intimacy = gameData.cats.intimacy[cat.name] || 0;
        const feedCount = gameData.cats.feedCount[cat.name] || 0;
        const lastSeen = gameData.cats.lastSeen[cat.name];

        const profileRow = document.createElement('div');
        profileRow.className = 'profile-row';
        profileRow.style.cssText = `
            display: flex;
            align-items: center;
            padding: 15px;
            margin-bottom: 12px;
            background: #F8F8F8;
            border-radius: 8px;
            border-left: 4px solid #E91E63;
        `;

        const intimacyColor = intimacy >= 4000 ? '#4CAF50' : intimacy >= 2000 ? '#FF9800' : intimacy >= 500 ? '#2196F3' : intimacy > 0 ? '#9C27B0' : '#757575';
        const intimacyText = intimacy >= 4000 ? '超级亲密' : intimacy >= 2000 ? '非常亲密' : intimacy >= 500 ? '比较熟悉' : intimacy > 0 ? '初次见面' : '未曾相遇';

        profileRow.innerHTML = `
            <div class="profile-avatar" style="font-size: 24px; margin-right: 15px;">${cat.icon}</div>
            <div class="profile-info" style="flex: 1;">
                <div class="profile-name" style="font-weight: bold; color: #333; margin-bottom: 5px;">${cat.name}</div>
                <div class="profile-description" style="color: #666; font-size: 12px; margin-bottom: 8px;">${cat.description}</div>
                <div class="profile-details" style="display: flex; gap: 15px; font-size: 12px;">
                    <span style="color: ${intimacyColor}; font-weight: bold;">亲密度: ${intimacy}/5000 (${intimacyText})</span>
                    <span style="color: #666;">喂食次数: ${feedCount}</span>
                    ${lastSeen ? `<span style="color: #999;">上次见面: ${new Date(lastSeen).toLocaleDateString()}</span>` : '<span style="color: #999;">从未见过</span>'}
                </div>
            </div>
        `;

        profileList.appendChild(profileRow);
    });

    // 显示弹窗
    modal.style.display = 'flex';
}

// 关闭猫猫档案弹窗
function closeCatProfiles() {
    const modal = document.getElementById('cat-profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 显示测试页面弹窗
function showTestPanelModal() {
    const modal = document.getElementById('test-panel-modal');
    if (modal) {
        modal.style.display = 'flex';

        // 重置模态框内容的位置到中心
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translate(0, 0)';
        }

        // 初始化拖拽功能
        initTestPanelDrag();
    }
}

// 初始化测试页面拖拽功能
function initTestPanelDrag() {
    const modal = document.getElementById('test-panel-modal');
    const modalContent = modal.querySelector('.modal-content');
    const header = modal.querySelector('.modal-header');

    if (!modal || !modalContent || !header) return;

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // 鼠标事件
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    // 触摸事件（移动端）
    header.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', dragMove);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
            header.style.cursor = 'grabbing';
        }
    }

    function dragMove(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            // 限制拖拽范围，防止窗口跑到屏幕外
            const maxX = window.innerWidth - modalContent.offsetWidth - 40;
            const maxY = window.innerHeight - modalContent.offsetHeight - 40;
            const minX = -modalContent.offsetWidth + 100; // 至少保留100px可见
            const minY = 0;

            currentX = Math.max(minX, Math.min(maxX, currentX));
            currentY = Math.max(minY, Math.min(maxY, currentY));

            xOffset = currentX;
            yOffset = currentY;

            modalContent.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    function dragEnd(e) {
        if (isDragging) {
            initialX = currentX || 0;
            initialY = currentY || 0;
            xOffset = currentX || 0;
            yOffset = currentY || 0;
        }
        isDragging = false;
        header.style.cursor = 'grab';
    }
}

// 关闭测试页面弹窗
function closeTestPanel() {
    const modal = document.getElementById('test-panel-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 测试功能：增加30顾客
function testAddCustomers() {
    gameData.servedCustomers += 30;
    addMessage('🎮 已增加30个顾客数量');
    updateAllDisplays();
}

// 测试功能：增加全部种子
function testAddAllSeeds() {
    MATERIALS.forEach(material => {
        gameData.seeds[material] = (gameData.seeds[material] || 0) + 10;
    });
    addMessage('🌱 已增加全部种子各10个');
    updateAllDisplays();
}

// 测试功能：增加全部原料
function testAddAllMaterials() {
    MATERIALS.forEach(material => {
        gameData.inventory[material] = (gameData.inventory[material] || 0) + 10;
    });
    addMessage('🥕 已增加全部原料各10个');
    updateAllDisplays();
}

// 测试功能：增加全部小料
function testAddAllToppings() {
    Object.keys(gameData.toppings).forEach(topping => {
        gameData.toppings[topping] = (gameData.toppings[topping] || 0) + 10;
    });
    addMessage('🍯 已增加全部小料各10个');
    updateAllDisplays();
}

// 测试功能：解锁全部配方
function testUnlockAllRecipes() {
    const allRecipes = [
        "五味子饮", "柠檬茶", "洛神玫瑰饮", "桂圆红枣茶", "焦香大麦茶",
        "三花决明茶", "薄荷甘草凉茶", "陈皮姜米茶", "冬瓜荷叶饮",
        "古法酸梅汤", "小吊梨汤", "桑菊润燥茶", "桂花酒酿饮",
        "蜜桃乌龙冷萃", "黄芪枸杞茶", "竹蔗茅根马蹄水"
    ];
    gameData.unlockedRecipes = [...allRecipes];
    addMessage('📜 已解锁全部茶饮配方');
    updateAllDisplays();
}

// 测试功能：增加全部茶饮
function testAddAllTeas() {
    // 清空现有茶饮
    gameData.madeTeas = [];
    gameData.teaTemps = {};
    gameData.teaMakeTimes = {};

    // 添加所有已解锁配方的茶饮
    const completeTeas = gameData.unlockedRecipes; // 添加所有已解锁的茶饮配方
    completeTeas.forEach((tea, index) => {
        const teaId = Date.now() + index;
        const newTea = {
            id: teaId,
            name: tea,
            toppings: []
        };
        gameData.madeTeas.push(newTea);
        gameData.teaTemps[teaId] = 'hot';
        gameData.teaMakeTimes[teaId] = Date.now();
    });

    addMessage(`🍵 已添加${completeTeas.length}杯茶饮`);
    updateAllDisplays();
}

// 测试功能：立刻刷新顾客
function testSpawnCustomer() {
    if (gameData.customer.active) {
        addMessage('🚀 当前已有顾客，请先服务完当前顾客');
        return;
    }
    spawnRandomCustomer();
    addMessage('🚀 已立刻生成新顾客');
    updateAllDisplays();
}

// 测试功能：立刻刷新猫猫
function testSpawnCat() {
    const catBreeds = ['大橘猫', '狸花猫', '黑猫小手套', '小白猫', '大猫猫'];
    const catIcons = {
        '大橘猫': '🧡',
        '狸花猫': '🐱',
        '黑猫小手套': '🖤',
        '小白猫': '🤍',
        '大猫猫': '😺'
    };

    // 清除之前的猫咪
    if (gameData.cats.currentCat) {
        addMessage(`🐱 ${gameData.cats.currentCat.name} 被新猫咪替换了`);
    }

    // 清除现有的普通顾客（避免冲突）
    if (gameData.customer.active) {
        addMessage(`👋 ${gameData.customer.name} 因为猫咪到来而离开了`);
        resetCustomer();
    }

    const randomIndex = Math.floor(Math.random() * catBreeds.length);
    const randomCat = catBreeds[randomIndex];

    console.log('随机数:', Math.random());
    console.log('随机索引:', randomIndex);
    console.log('选中的猫咪:', randomCat);

    gameData.cats.currentCat = {
        name: randomCat,
        icon: catIcons[randomCat],
        arrivalTime: Date.now(),
        stayDuration: 30000, // 30秒
        fed: false
    };

    // 更新上次猫咪出现时间
    gameData.cats.lastCatTime = Date.now();

    addMessage(`🐱 测试猫咪 ${randomCat} ${catIcons[randomCat]} 来了！它会停留30秒`);
    updateCustomerDisplay();
}

// 测试功能：添加小鱼干
function testAddFish() {
    gameData.inventory['小鱼干'] = (gameData.inventory['小鱼干'] || 0) + 10;
    addMessage('🐟 添加了10个小鱼干');
    updateAllDisplays();
}

// 测试功能：制作白水煮鱼
function testMakeFishDish() {
    if (gameData.inventory['小鱼干'] && gameData.inventory['小鱼干'] > 0) {
        // 消耗小鱼干
        gameData.inventory['小鱼干']--;

        // 制作白水煮鱼
        const fishDishId = Date.now();
        const fishDish = {
            id: fishDishId,
            name: '白水煮鱼',
            toppings: []
        };
        gameData.madeTeas.push(fishDish);
        gameData.teaTemps[fishDishId] = 'hot';
        gameData.teaMakeTimes[fishDishId] = Date.now();

        addMessage('🍲 制作了一份白水煮鱼');
        updateAllDisplays();
    } else {
        addMessage('❌ 没有小鱼干，无法制作白水煮鱼');
    }
}

// 测试功能：所有猫咪满亲密度
function testMaxCatIntimacy() {
    const catBreeds = ['大橘猫', '狸花猫', '黑猫小手套', '小白猫', '大猫猫'];
    catBreeds.forEach(catName => {
        gameData.cats.intimacy[catName] = 5000;
        gameData.cats.feedCount[catName] = 500;
        gameData.cats.lastSeen[catName] = Date.now();
    });
    addMessage('💕 所有猫咪亲密度已设为满级(5000)');
    updateAllDisplays();
}

// 测试功能：亲密度500礼物测试
function testCatIntimacy500() {
    // 清除现有的普通顾客（避免冲突）
    if (gameData.customer.active) {
        addMessage(`👋 ${gameData.customer.name} 因为猫咪到来而离开了`);
        resetCustomer();
    }

    // 生成一只亲密度500的猫咪
    const catName = '测试橘猫';
    gameData.cats.intimacy[catName] = 500;
    gameData.cats.feedCount[catName] = 50;
    gameData.cats.lastSeen[catName] = Date.now();
        
        gameData.cats.currentCat = {
            name: catName,
        icon: '🧡',
        arrivalTime: Date.now(),
        stayDuration: 30000,
            fed: false
        };
        
    addMessage(`🎁 生成亲密度500的${catName}，30%概率1个基础原料`);
        updateCustomerDisplay();
}

// 测试功能：亲密度1500礼物测试
function testCatIntimacy1500() {
    // 清除现有的普通顾客（避免冲突）
    if (gameData.customer.active) {
        addMessage(`👋 ${gameData.customer.name} 因为猫咪到来而离开了`);
        resetCustomer();
    }

    // 生成一只亲密度1500的猫咪
    const catName = '测试狸花';
    gameData.cats.intimacy[catName] = 1500;
    gameData.cats.feedCount[catName] = 150;
    gameData.cats.lastSeen[catName] = Date.now();

    gameData.cats.currentCat = {
        name: catName,
        icon: '🐱',
        arrivalTime: Date.now(),
        stayDuration: 30000,
        fed: false
    };

    addMessage(`🎁 生成亲密度1500的${catName}，50%概率1-2个制茶原料`);
    updateCustomerDisplay();
}

// 测试功能：亲密度3000礼物测试
function testCatIntimacy3000() {
    // 清除现有的普通顾客（避免冲突）
    if (gameData.customer.active) {
        addMessage(`👋 ${gameData.customer.name} 因为猫咪到来而离开了`);
        resetCustomer();
    }

    // 生成一只亲密度3000的猫咪
    const catName = '测试黑猫';
    gameData.cats.intimacy[catName] = 3000;
    gameData.cats.feedCount[catName] = 300;
    gameData.cats.lastSeen[catName] = Date.now();

    gameData.cats.currentCat = {
        name: catName,
        icon: '🖤',
        arrivalTime: Date.now(),
        stayDuration: 30000,
        fed: false
    };

    addMessage(`🎁 生成亲密度3000的${catName}，70%概率2个高级原料`);
    updateCustomerDisplay();
}

// 测试功能：亲密度5000礼物测试
function testCatIntimacy5000() {
    // 清除现有的普通顾客（避免冲突）
    if (gameData.customer.active) {
        addMessage(`👋 ${gameData.customer.name} 因为猫咪到来而离开了`);
        resetCustomer();
    }

    // 生成一只亲密度5000的猫咪
    const catName = '测试白猫';
    gameData.cats.intimacy[catName] = 5000;
    gameData.cats.feedCount[catName] = 500;
    gameData.cats.lastSeen[catName] = Date.now();

    gameData.cats.currentCat = {
        name: catName,
        icon: '🤍',
        arrivalTime: Date.now(),
        stayDuration: 30000,
        fed: false
    };

    addMessage(`🎁 生成亲密度5000的${catName}，100%概率3个顶级原料`);
    updateCustomerDisplay();
}

// 测试功能：清空顾客数
function testClearCustomers() {
    gameData.servedCustomers = 0;
    gameData.customerVisits = {};
    addMessage('🗑️ 已清空顾客数量和访问记录');
    updateAllDisplays();
}

// 测试功能：清空种子
function testClearSeeds() {
    MATERIALS.forEach(material => {
        gameData.seeds[material] = 0;
    });
    addMessage('🗑️ 已清空全部种子');
    updateAllDisplays();
}

// 测试功能：清空原料
function testClearMaterials() {
    MATERIALS.forEach(material => {
        gameData.inventory[material] = 0;
    });
    addMessage('🗑️ 已清空全部原料');
    updateAllDisplays();
}

// 测试功能：清空小料
function testClearToppings() {
    Object.keys(gameData.toppings).forEach(topping => {
        gameData.toppings[topping] = 0;
    });
    addMessage('🗑️ 已清空全部小料');
    updateAllDisplays();
}

// 测试功能：清空茶饮
function testClearTeas() {
    gameData.madeTeas = [];
    gameData.teaTemps = {};
    gameData.teaMakeTimes = {};
    addMessage('🗑️ 已清空全部茶饮');
    updateAllDisplays();
}

// 测试功能：重置配方
function testResetRecipes() {
    gameData.unlockedRecipes = ["五味子饮", "柠檬茶"];
    addMessage('🗑️ 已重置配方为初始状态');
    updateAllDisplays();
}

// 测试功能：清空金币
function testClearCoins() {
    gameData.coins = 0;
    addMessage('🪙 已清空金币');
    updateAllDisplays();
}
// 测试功能：增加一天
function testAddDay() {
    gameData.currentDay += 1;
    gameData.cats.todayVisited = false;  // 👈 添加这行
    addMessage(`📅 时间流逝，现在是第${gameData.currentDay}天`);
    updateWeatherDisplay();
}
// 测试功能：重置天数
function testResetDay() {
    gameData.currentDay = 1;
    gameData.currentSeason = "春天";
    gameData.currentWeather = "晴天";
    gameData.weatherStartTime = Date.now();
    gameData.daysInSeason = 0;
    addMessage('📅 已重置天数到第1天，春天晴天');
    updateAllDisplays();
}

// 测试功能：重置全部存档
function testResetAllSaves() {
    showGreenConfirmDialog(
        '⚠️ 重置全部存档',
        '确定要重置全部存档吗？\n\n这将删除所有4个存档槽的数据，\n并重置当前游戏到初始状态（第1天）。\n\n此操作不可撤销！',
        () => {
        // 删除所有存档（使用正确的键名）
        for (let i = 1; i <= 4; i++) {
            localStorage.removeItem(`cuteTeaShop_save_slot${i}`);
        }

        // 也删除旧的默认存档（如果存在）
        localStorage.removeItem('cuteTeaShop_save');

        // 重置当前游戏数据到初始状态
        resetGameDataToInitial();

        // 更新所有显示
        updateAllDisplays();

        // 更新存档槽显示
        updateSaveSlots();

        addMessage('💾 已重置全部存档和当前游戏，回到第1天初始状态');

        // 关闭测试页面
        closeTestPanel();
        }
    );
}

// 更新管理页面显示
function updateManagementDisplay() {
    updateCustomerStats();
    updateRecipeProgress();
    updateCustomerCards();
    updateSaveSlots();
}

// 更新顾客统计
function updateCustomerStats() {
    const servedCount = document.getElementById('served-customers-count');
    const unlockedCount = document.getElementById('unlocked-recipes-count');

    if (servedCount) {
        servedCount.textContent = gameData.servedCustomers || 0;
    }

    if (unlockedCount) {
        unlockedCount.textContent = gameData.unlockedRecipes ? gameData.unlockedRecipes.length : 2;
    }
}

// 更新配方解锁进度
function updateRecipeProgress() {
    const progressList = document.getElementById('recipe-progress-list');
    if (!progressList) return;

    progressList.innerHTML = '';

    // 人数解锁配方
    const countUnlocks = [
        { count: 30, recipe: '桑菊润燥茶' },
        { count: 60, recipe: '桂花酒酿饮' },
        { count: 90, recipe: '蜜桃乌龙冷萃' },
        { count: 120, recipe: '黄芪枸杞茶' },
        { count: 150, recipe: '竹蔗茅根马蹄水' }
    ];

    countUnlocks.forEach(unlock => {
        const isUnlocked = gameData.unlockedRecipes && gameData.unlockedRecipes.includes(unlock.recipe);
        const currentCount = gameData.servedCustomers || 0;

        const progressItem = document.createElement('div');
        progressItem.className = `progress-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        progressItem.innerHTML = `
            <span>${unlock.recipe}</span>
            <span>${isUnlocked ? '✅ 已解锁' : `${currentCount}/${unlock.count} 顾客`}</span>
        `;
        progressList.appendChild(progressItem);
    });

    // 特殊顾客解锁配方
    if (gameData.recipeUnlockRules) {
        Object.entries(gameData.recipeUnlockRules).forEach(([recipe, rule]) => {
            const isUnlocked = gameData.unlockedRecipes && gameData.unlockedRecipes.includes(recipe);
            const visitCount = gameData.customerVisits ? (gameData.customerVisits[rule.customer] || 0) : 0;

            const progressItem = document.createElement('div');
            progressItem.className = `progress-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            progressItem.innerHTML = `
                <span>${recipe}</span>
                <span>${isUnlocked ? '✅ 已解锁' : `${rule.customer} ${visitCount}/${rule.visitsRequired} 次`}</span>
            `;
            progressList.appendChild(progressItem);
        });
    }
}

// 更新特殊顾客卡片
function updateCustomerCards() {
    const cardsGrid = document.getElementById('customer-cards-grid');
    if (!cardsGrid) return;

    cardsGrid.innerHTML = '';

    // 获取特殊顾客列表
    const specialCustomers = gameData.customerNames || ['池惊暮', '凌小路', '江飞飞', '江三', '江四', '池云旗', '江潮', '江敕封', '花花', '姬别情', '池九信', '狸怒'];

    specialCustomers.forEach(customerName => {
        const visitCount = gameData.customerVisits ? (gameData.customerVisits[customerName] || 0) : 0;

        // 获取该顾客对应的配方
        let customerRecipes = [];
        if (gameData.recipeUnlockRules) {
            Object.entries(gameData.recipeUnlockRules).forEach(([recipe, rule]) => {
                if (rule.customer === customerName) {
                    const isUnlocked = gameData.unlockedRecipes && gameData.unlockedRecipes.includes(recipe);
                    customerRecipes.push({
                        name: recipe,
                        unlocked: isUnlocked
                    });
                }
            });
        }

        // 获取顾客故事和彩蛋码
        const customerStory = getCustomerStory(customerName);
        const hasUnlockedRecipe = customerRecipes.some(recipe => recipe.unlocked);
        const easterEggCode = generateEasterEggCode(customerName, visitCount);

        const customerCard = document.createElement('div');
        customerCard.className = 'customer-card vip';
        customerCard.innerHTML = `
            <div class="customer-content">
                <div class="customer-header">
                    <div class="customer-name-line">
                        <span class="customer-icon">${getCustomerIcon(customerName, true)}</span>
                        <span class="customer-name">${customerName}</span>
                    </div>
                </div>
                <div class="customer-visits">来访 ${visitCount} 次</div>

                ${hasUnlockedRecipe && customerStory ? `
                    <div class="customer-story">
                        <div class="story-title">${customerStory.title}</div>
                        <div class="story-content">${customerStory.story}</div>
                        <div class="story-details">
                            <div class="story-effect">${customerStory.effect}</div>
                            <div class="story-recipe">配方：${customerStory.recipeName}</div>
                        </div>
                    </div>
                ` : ''}

                <div class="customer-recipes">
                    ${customerRecipes.map(recipe =>
                        `<div class="recipe-status ${recipe.unlocked ? '' : 'locked'}">
                            ${recipe.name} ${recipe.unlocked ? '✅' : '🔒'}
                        </div>`
                    ).join('')}

                    ${easterEggCode ? `
                        <div class="easter-egg-code">
                            <div class="easter-egg-title">🎊 特殊彩蛋码</div>
                            <div class="easter-egg-value">${easterEggCode}</div>
                            <div class="easter-egg-desc">恭喜解锁专属纪念码！</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        cardsGrid.appendChild(customerCard);
    });
}

// 更新存档槽显示
function updateSaveSlots() {
    for (let i = 1; i <= 4; i++) {
        const timeElement = document.getElementById(`slot-${i}-time`);
        const saveBtn = document.querySelector(`[onclick="saveToSlot(${i})"]`);
        const loadBtn = document.querySelector(`[onclick="loadFromSlot(${i})"]`);

        if (timeElement && saveBtn && loadBtn) {
            try {
                const saveData = localStorage.getItem(`cuteTeaShop_save_slot${i}`);

                // 第一个存档始终显示保存按钮（因为游戏一开始就在运行）
                if (i === 1) {
                    if (saveData) {
                        const data = JSON.parse(saveData);
                        const saveTime = new Date(data.saveTime);
                        timeElement.textContent = saveTime.toLocaleString();
                    } else {
                        timeElement.textContent = '当前游戏';
                    }
                    saveBtn.textContent = '保存';
                    saveBtn.setAttribute('onclick', `saveToSlot(${i})`);
                    loadBtn.style.display = saveData ? 'block' : 'none';
                } else {
                    // 其他存档槽的逻辑
                    if (saveData) {
                        const data = JSON.parse(saveData);
                        const saveTime = new Date(data.saveTime);
                        timeElement.textContent = saveTime.toLocaleString();
                        saveBtn.textContent = '保存';
                        saveBtn.setAttribute('onclick', `saveToSlot(${i})`);
                        loadBtn.style.display = 'block';
                    } else {
                        timeElement.textContent = '空';
                        saveBtn.textContent = '新建';
                        saveBtn.setAttribute('onclick', `createNewGame(${i})`);
                        loadBtn.style.display = 'none';
                    }
                }
            } catch (error) {
                if (i === 1) {
                    timeElement.textContent = '当前游戏';
                    saveBtn.textContent = '保存';
                    saveBtn.setAttribute('onclick', `saveToSlot(${i})`);
                    loadBtn.style.display = 'none';
                } else {
                    timeElement.textContent = '空';
                    saveBtn.textContent = '新建';
                    saveBtn.setAttribute('onclick', `createNewGame(${i})`);
                    loadBtn.style.display = 'none';
                }
            }
        }
    }
}

// 创建新游戏
function createNewGame(slot) {
    if (confirm('确定要创建新游戏吗？\n\n这将清空当前游戏进度，从第一天开始。\n所有配方、顾客访问记录都将重置。')) {
        debug(`开始创建新游戏到存档位 ${slot}`);

        // 重置游戏数据到初始状态
        resetGameDataToInitial();

        // 保存新游戏到指定槽位
        saveToSlot(slot);

        // 强制更新所有显示
        updateAllDisplays();

        // 特别更新存档槽显示，确保按钮状态正确
        updateSaveSlots();

        addMessage(`🎮 新游戏已创建并保存到存档 ${slot}！`);
        debug(`新游戏创建完成，存档位 ${slot}`);
    }
}

// 重置游戏数据到初始状态
function resetGameDataToInitial() {
    debug('开始重置游戏数据到初始状态...');

    // 1. 基础游戏状态
    gameData.coins = 100;
    gameData.currentDay = 1;
    gameData.currentSeason = "春天";
    gameData.currentWeather = "晴天";
    gameData.servedCustomers = 0;
    gameData.weatherStartTime = Date.now();
    gameData.lastCustomerTime = 0;

    // 2. 清空各种容器
    gameData.madeTeas = [];
    gameData.teaTemps = {};
    gameData.teaMakeTimes = {};
    gameData.cart = [];
    gameData.customerVisits = {};

    // 3. 重置顾客状态
    gameData.customer = {
        active: false,
        name: "暂无顾客",
        isVIP: false,
        teaChoice: null,
        toppingChoices: [],
        arrivalTime: 0,
        patience: 120000,
        maxPatience: 120000,
        served: false
    };

    // 4. 重置解锁配方
    gameData.unlockedRecipes = ["五味子饮", "柠檬茶"];

    // 5. 完全重新初始化种子和材料系统
    gameData.seeds = {};
    gameData.inventory = {};
    gameData.seedInfo = {};

    // 重新运行材料初始化逻辑
    MATERIALS.forEach(material => {
        // 重新设置种子信息
        gameData.seedInfo[material] = {
            price: 1,
            growTime: 30000,
            yield: material
        };

        // 种子数量：只有五味子和柠檬有1个种子，其他为0
        if (material === "五味子" || material === "柠檬") {
            gameData.seeds[material] = 1;
        } else {
            gameData.seeds[material] = 0;
        }

        // 材料库存：每种材料0个，需要通过种植获得
        gameData.inventory[material] = 0;
    });

    // 应用特殊种子配置
    Object.keys(SPECIAL_SEED_CONFIG).forEach(seedName => {
        if (gameData.seedInfo[seedName]) {
            gameData.seedInfo[seedName].price = SPECIAL_SEED_CONFIG[seedName].price;
            gameData.seedInfo[seedName].growTime = SPECIAL_SEED_CONFIG[seedName].growTime;
        }
    });

    // 6. 重新初始化小料（所有小料都为0，需要通过加工或购买获得）
    gameData.toppings = {
        // 基础小料：需要通过加工获得
        "红糖": 0,
        "薄荷叶": 0,
        "姜丝": 0,
        "柚子丝": 0,
        "银耳丝": 0,
        "柠檬片": 0,
        "蜂蜜": 0,
        // 高级小料：需要通过加工获得
        "冰糖": 0,
        "乌龙茶包": 0,
        "干桂花": 0,
        "小圆子": 0,
        "酒酿": 0,
        "水蜜桃果肉": 0,
        "黄芪片": 0
    };

    // 7. 重置农田状态
    gameData.plots = Array(4).fill(null).map((_, index) => ({
        id: index + 1,
        planted: false,
        crop: null,
        plantTime: 0,
        growthTime: 0,
        ready: false,
        watered: false,
        fertilized: false,
        state: 'empty',
        moisture: 50,
        fertility: 50
    }));

    // 8. 重置炉灶状态
    gameData.stoves = [
        {
            state: 'empty',
            startTime: 0,
            boilDuration: 20000,
            recipe: null
        },
        {
            state: 'empty',
            startTime: 0,
            boilDuration: 20000,
            recipe: null
        }
    ];

    // 9. 重置加工台状态
    gameData.processingBoard = {
        state: 'idle',
        recipe: null,
        startTime: 0,
        duration: 0
    };

    debug('游戏数据重置完成！');
    debug('种子库存:', gameData.seeds);
    debug('材料库存:', gameData.inventory);
    debug('小料库存:', gameData.toppings);
}

// 保存到指定槽位
function saveToSlot(slot) {
    try {
        const saveData = {
            ...gameData,
            saveTime: Date.now(),
            version: '1.0'
        };

        localStorage.setItem(`cuteTeaShop_save_slot${slot}`, JSON.stringify(saveData));
        addMessage(`💾 游戏已保存到存档 ${slot}`);

        // 更新存档槽显示
        updateSaveSlots();

        debug(`游戏已保存到存档位 ${slot}`);
        return true;
    } catch (error) {
        addMessage(`❌ 保存失败: ${error.message}`);
        console.error('保存游戏失败:', error);
        return false;
    }
}

// 从指定槽位载入
function loadFromSlot(slot) {
    try {
        const saveData = localStorage.getItem(`cuteTeaShop_save_slot${slot}`);
        if (!saveData) {
            addMessage(`❌ 存档 ${slot} 为空`);
            return false;
        }

        const parsedData = JSON.parse(saveData);

        // 合并保存的数据到游戏数据
        Object.assign(gameData, parsedData);

        // 更新所有显示
        updateAllDisplays();

        addMessage(`📁 已载入存档 ${slot}`);
        debug(`游戏已从存档位 ${slot} 载入`);
        return true;
    } catch (error) {
        addMessage(`❌ 载入失败: ${error.message}`);
        console.error('载入游戏失败:', error);
        return false;
    }
}

// 导出存档
function exportSave() {
    try {
        const saveData = {
            ...gameData,
            saveTime: Date.now(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(saveData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `可爱茶铺存档_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
        link.click();

        addMessage('📤 存档已导出');
    } catch (error) {
        addMessage(`❌ 导出失败: ${error.message}`);
        console.error('导出存档失败:', error);
    }
}

// 导入存档
function importSave() {
    const fileInput = document.getElementById('import-file');
    if (fileInput) {
        fileInput.click();
    }
}

// 处理导入文件
function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const saveData = JSON.parse(e.target.result);

            // 验证存档格式
            if (!saveData.version || saveData.coins === undefined) {
                addMessage('❌ 无效的存档文件');
                return;
            }

            // 确认导入
            if (confirm('确定要导入这个存档吗？当前进度将被覆盖！')) {
                Object.assign(gameData, saveData);
                updateAllDisplays();
                addMessage('📥 存档导入成功');
            }
        } catch (error) {
            addMessage(`❌ 导入失败: ${error.message}`);
            console.error('导入存档失败:', error);
        }
    };
    reader.readAsText(file);

    // 清空文件输入
    event.target.value = '';
}

// 强制刷新游戏
function forceRefreshGame() {
    showGreenConfirmDialog(
        '🔄 强制刷新游戏',
        '确定要强制刷新游戏吗？\n\n这将重新加载页面，清除所有缓存。\n游戏进度会自动保存。',
        () => {
            // 先保存游戏
            saveGame();

            addMessage('🔄 正在强制刷新游戏...');

            // 延迟一下让消息显示
            setTimeout(() => {
                // 强制刷新页面，绕过缓存
                window.location.reload(true);
            }, 500);
        }
    );
}

// 强制清除缓存并重新加载（专门针对手机浏览器）
function forceClearCacheAndReload() {
    // 立即清除所有可能的缓存
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            });
        });
    }

    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
    }

    // 清除localStorage（保留存档）
    const saves = {};
    for (let i = 1; i <= 4; i++) {
        const saveKey = `cuteTeaShop_save_slot${i}`;
        if (localStorage.getItem(saveKey)) {
            saves[saveKey] = localStorage.getItem(saveKey);
        }
    }
    localStorage.clear();
    Object.keys(saves).forEach(key => {
        localStorage.setItem(key, saves[key]);
    });

    // 强制重新加载，绕过所有缓存
    window.location.reload(true);
}

// 清除游戏缓存
function clearGameCache() {
    showGreenConfirmDialog(
        '🗑️ 清除游戏缓存',
        '确定要清除游戏缓存吗？\n\n这将清除浏览器缓存，但不会删除游戏存档。\n清除后页面会自动刷新。',
        () => {
            addMessage('🗑️ 正在清除缓存...');

            // 1. 备份游戏存档
            const saves = {};
            for (let i = 1; i <= 4; i++) {
                const saveKey = `cuteTeaShop_save_slot${i}`;
                if (localStorage.getItem(saveKey)) {
                    saves[saveKey] = localStorage.getItem(saveKey);
                }
            }

            // 2. 清除localStorage
            localStorage.clear();

            // 3. 恢复游戏存档
            Object.keys(saves).forEach(key => {
                localStorage.setItem(key, saves[key]);
            });

            // 4. 通知Service Worker清除缓存
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });

                // 监听缓存清除完成消息
                const messageHandler = (event) => {
                    if (event.data && event.data.type === 'CACHE_CLEARED') {
                        navigator.serviceWorker.removeEventListener('message', messageHandler);
                        addMessage('✅ 缓存清除完成，正在刷新页面...');
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    }
                };
                navigator.serviceWorker.addEventListener('message', messageHandler);

                // 超时处理
                setTimeout(() => {
                    navigator.serviceWorker.removeEventListener('message', messageHandler);
                    addMessage('⚠️ 缓存清除超时，正在强制刷新...');
                    window.location.reload(true);
                }, 5000);
            } else {
                // 如果没有Service Worker，直接刷新
                addMessage('✅ 缓存清除完成，正在刷新页面...');
                setTimeout(() => {
                    window.location.reload(true);
                }, 1000);
            }
        }
    );
}

// 自动保存游戏（每30秒）
setInterval(() => {
    if (!isPaused) {
        saveGame();
        debug('自动保存游戏');
    }
}, 30000);

// 页面卸载时保存游戏
window.addEventListener('beforeunload', () => {
    saveGame();
});

// 页面可见性变化时暂停/恢复游戏
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isPaused = true;
        debug('页面隐藏，游戏暂停');
    } else {
        isPaused = false;
        debug('页面显示，游戏恢复');
    }
});

// 游戏启动时尝试加载保存的游戏
document.addEventListener('DOMContentLoaded', () => {
    // 延迟加载，确保游戏初始化完成
    setTimeout(() => {
        if (loadGame()) {
            addMessage('📁 已加载保存的游戏进度');
        }
    }, 1000);
});

// 显示库存面板
function showInventoryPanel() {
    const panel = document.createElement('div');
    panel.className = 'inventory-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow: hidden;
        min-width: 400px;
    `;

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">🧺 库存篮子</h3>
            <button class="close-inventory-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div class="panel-content" style="padding: 20px; max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 20px; margin-right: 8px;">🪙</span>
                    <span style="font-size: 16px; font-weight: bold; color: #2E7D32;">当前铜板：${gameData.coins}</span>
                </div>
            </div>

            <div class="inventory-categories">
                <div class="inventory-category">
                    <h4 style="color: #4CAF50; margin-bottom: 15px; border-bottom: 2px solid #E8F5E8; padding-bottom: 8px;">🌿 种植材料</h4>
                    <div class="inventory-items" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
                        ${Object.entries(gameData.inventory).filter(([name, count]) => count > 0).map(([itemName, count]) => `
                            <div class="inventory-item" style="background: #F8F9FA; border-radius: 12px; padding: 12px; text-align: center; border: 1px solid #E9ECEF;">
                                <div style="font-size: 24px; margin-bottom: 8px;">🌰</div>
                                <div style="font-weight: 500; color: #2E7D32; margin-bottom: 4px; font-size: 12px;">${itemName}</div>
                                <div style="font-size: 14px; color: #4CAF50; font-weight: bold;">x${count}</div>
                            </div>
                        `).join('')}
                        ${Object.entries(gameData.inventory).filter(([name, count]) => count > 0).length === 0 ?
                            '<div style="text-align: center; color: #999; padding: 20px; grid-column: 1 / -1;">暂无种植材料</div>' : ''}
                    </div>
                </div>

                <div class="inventory-category" style="margin-top: 20px;">
                    <h4 style="color: #4CAF50; margin-bottom: 15px; border-bottom: 2px solid #E8F5E8; padding-bottom: 8px;">🍯 小料库存</h4>
                    <div class="inventory-items" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
                        ${Object.entries(gameData.toppings).filter(([name, count]) => count > 0).map(([toppingName, count]) => `
                            <div class="inventory-item" style="background: #F8F9FA; border-radius: 12px; padding: 12px; text-align: center; border: 1px solid #E9ECEF;">
                                <div style="font-size: 24px; margin-bottom: 8px;">${getToppingIcon(toppingName)}</div>
                                <div style="font-weight: 500; color: #2E7D32; margin-bottom: 4px; font-size: 12px;">${toppingName}</div>
                                <div style="font-size: 14px; color: #4CAF50; font-weight: bold;">x${count}</div>
                            </div>
                        `).join('')}
                        ${Object.entries(gameData.toppings).filter(([name, count]) => count > 0).length === 0 ?
                            '<div style="text-align: center; color: #999; padding: 20px; grid-column: 1 / -1;">暂无小料库存</div>' : ''}
                    </div>
                </div>

                <div class="inventory-category" style="margin-top: 20px;">
                    <h4 style="color: #4CAF50; margin-bottom: 15px; border-bottom: 2px solid #E8F5E8; padding-bottom: 8px;">🍵 制作的茶饮</h4>
                    <div class="inventory-items" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        ${gameData.madeTeas.map((tea, index) => {
                            const isHot = gameData.teaTemps[tea.id] === 'hot';
                            return `
                                <div class="inventory-item" style="background: #F8F9FA; border-radius: 12px; padding: 12px; text-align: center; border: 1px solid #E9ECEF;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">${isHot ? '🍵' : '🧊'}</div>
                                    <div style="font-weight: 500; color: #2E7D32; margin-bottom: 4px; font-size: 12px;">${tea.name}</div>
                                    <div style="font-size: 10px; color: #666; margin-bottom: 4px;">${isHot ? '热茶' : '冰茶'}</div>
                                    ${tea.toppings && tea.toppings.length > 0 ?
                                        `<div style="font-size: 10px; color: #4CAF50;">+${tea.toppings.join('、')}</div>` :
                                        '<div style="font-size: 10px; color: #999;">无小料</div>'}
                                </div>
                            `;
                        }).join('')}
                        ${gameData.madeTeas.length === 0 ?
                            '<div style="text-align: center; color: #999; padding: 20px; grid-column: 1 / -1;">暂无制作的茶饮</div>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-inventory-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });
}

// 显示保存面板
function showSavePanel() {
    const panel = document.createElement('div');
    panel.className = 'save-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow: hidden;
        min-width: 500px;
    `;

    const saves = getSaveList();

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">💾 保存游戏</h3>
            <button class="close-save-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div class="panel-content" style="padding: 20px; max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 20px; margin-right: 8px;">🎮</span>
                    <span style="font-size: 16px; font-weight: bold; color: #2E7D32;">选择存档位置</span>
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 15px;">
                    当前进度：第${gameData.currentDay}天 | ${gameData.servedCustomers || 0}位顾客 | ${gameData.coins}铜板
                </div>
            </div>

            <div class="save-slots" style="display: grid; gap: 12px;">
                ${[1, 2, 3, 4].map(slot => {
                    const save = saves[`slot${slot}`];
                    const isEmpty = !save;
                    return `
                        <div class="save-slot" style="
                            background: ${isEmpty ? '#F8F9FA' : '#E8F5E8'};
                            border: 2px solid ${isEmpty ? '#E9ECEF' : '#81C784'};
                            border-radius: 12px;
                            padding: 15px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " data-slot="${slot}">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: bold; color: ${isEmpty ? '#666' : '#2E7D32'}; margin-bottom: 4px;">
                                        💾 存档 ${slot}
                                    </div>
                                    ${isEmpty ?
                                        '<div style="font-size: 12px; color: #999;">空存档位</div>' :
                                        `<div style="font-size: 12px; color: #666;">
                                            第${save.currentDay}天 | ${save.servedCustomers || 0}位顾客 | ${save.coins}铜板
                                        </div>
                                        <div style="font-size: 11px; color: #999;">
                                            ${new Date(save.saveTime).toLocaleString()}
                                        </div>`
                                    }
                                </div>
                                <button class="save-to-slot" data-slot="${slot}" style="
                                    background: #4CAF50;
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    padding: 8px 16px;
                                    font-size: 12px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                ">
                                    ${isEmpty ? '保存' : '覆盖'}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-save-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    // 保存按钮事件
    panel.querySelectorAll('.save-to-slot').forEach(btn => {
        btn.addEventListener('click', () => {
            const slot = btn.dataset.slot;
            saveGameToSlot(slot);
            document.body.removeChild(panel);
        });
    });

    // 存档槽点击事件
    panel.querySelectorAll('.save-slot').forEach(slot => {
        slot.addEventListener('mouseenter', () => {
            slot.style.background = slot.style.background.includes('#E8F5E8') ? '#C8E6C9' : '#E3F2FD';
        });

        slot.addEventListener('mouseleave', () => {
            const slotNum = slot.dataset.slot;
            const save = saves[`slot${slotNum}`];
            slot.style.background = save ? '#E8F5E8' : '#F8F9FA';
        });
    });
}

// 显示加载面板
function showLoadPanel() {
    const panel = document.createElement('div');
    panel.className = 'load-panel';
    panel.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.25);
        z-index: 1001;
        max-width: 90vw;
        max-height: 80vh;
        overflow: hidden;
        min-width: 500px;
    `;

    const saves = getSaveList();

    panel.innerHTML = `
        <div class="panel-header" style="background: #4CAF50; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">📁 加载游戏</h3>
            <button class="close-load-panel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div class="panel-content" style="padding: 20px; max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 20px; margin-right: 8px;">🎮</span>
                    <span style="font-size: 16px; font-weight: bold; color: #2E7D32;">选择要加载的存档</span>
                </div>
            </div>

            <div class="save-slots" style="display: grid; gap: 12px;">
                ${[1, 2, 3, 4].map(slot => {
                    const save = saves[`slot${slot}`];
                    const isEmpty = !save;
                    return `
                        <div class="save-slot ${isEmpty ? 'disabled' : ''}" style="
                            background: ${isEmpty ? '#F5F5F5' : '#E8F5E8'};
                            border: 2px solid ${isEmpty ? '#DDD' : '#81C784'};
                            border-radius: 12px;
                            padding: 15px;
                            cursor: ${isEmpty ? 'not-allowed' : 'pointer'};
                            opacity: ${isEmpty ? '0.6' : '1'};
                            transition: all 0.3s ease;
                        " data-slot="${slot}">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: bold; color: ${isEmpty ? '#999' : '#2E7D32'}; margin-bottom: 4px;">
                                        📁 存档 ${slot}
                                    </div>
                                    ${isEmpty ?
                                        '<div style="font-size: 12px; color: #999;">空存档位</div>' :
                                        `<div style="font-size: 12px; color: #666;">
                                            第${save.currentDay}天 | ${save.servedCustomers || 0}位顾客 | ${save.coins}铜板
                                        </div>
                                        <div style="font-size: 11px; color: #999;">
                                            ${new Date(save.saveTime).toLocaleString()}
                                        </div>`
                                    }
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    ${!isEmpty ? `
                                        <button class="load-from-slot" data-slot="${slot}" style="
                                            background: #2196F3;
                                            color: white;
                                            border: none;
                                            border-radius: 8px;
                                            padding: 8px 16px;
                                            font-size: 12px;
                                            cursor: pointer;
                                            transition: all 0.3s ease;
                                        ">
                                            加载
                                        </button>
                                        <button class="delete-slot" data-slot="${slot}" style="
                                            background: #F44336;
                                            color: white;
                                            border: none;
                                            border-radius: 8px;
                                            padding: 8px 12px;
                                            font-size: 12px;
                                            cursor: pointer;
                                            transition: all 0.3s ease;
                                        ">
                                            删除
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 添加事件监听器
    panel.querySelector('.close-load-panel').addEventListener('click', () => {
        document.body.removeChild(panel);
    });

    // 加载按钮事件
    panel.querySelectorAll('.load-from-slot').forEach(btn => {
        btn.addEventListener('click', () => {
            const slot = btn.dataset.slot;
            loadGameFromSlot(slot);
            document.body.removeChild(panel);
        });
    });

    // 删除按钮事件
    panel.querySelectorAll('.delete-slot').forEach(btn => {
        btn.addEventListener('click', () => {
            const slot = btn.dataset.slot;
            if (confirm(`确定要删除存档 ${slot} 吗？此操作无法撤销！`)) {
                deleteSaveSlot(slot);
                document.body.removeChild(panel);
                showLoadPanel(); // 重新显示面板
            }
        });
    });

    // 存档槽悬停效果
    panel.querySelectorAll('.save-slot:not(.disabled)').forEach(slot => {
        slot.addEventListener('mouseenter', () => {
            slot.style.background = '#C8E6C9';
        });

        slot.addEventListener('mouseleave', () => {
            slot.style.background = '#E8F5E8';
        });
    });
}

// 获取存档列表
function getSaveList() {
    const saves = {};
    for (let i = 1; i <= 4; i++) {
        const saveData = localStorage.getItem(`cuteTeaShop_save_slot${i}`);
        if (saveData) {
            try {
                saves[`slot${i}`] = JSON.parse(saveData);
            } catch (e) {
                console.error(`存档 ${i} 数据损坏:`, e);
            }
        }
    }
    return saves;
}

// 保存到指定存档位
function saveGameToSlot(slot) {
    try {
        const saveData = {
            ...gameData,
            saveTime: Date.now(),
            version: '1.0'
        };

        localStorage.setItem(`cuteTeaShop_save_slot${slot}`, JSON.stringify(saveData));
        addMessage(`💾 游戏已保存到存档 ${slot}`);

        // 同时保存到默认位置（兼容性）
        if (slot === '1') {
            localStorage.setItem('cuteTeaShop_save', JSON.stringify(saveData));
        }

        debug(`游戏已保存到存档位 ${slot}`);
        return true;
    } catch (error) {
        addMessage(`❌ 保存失败: ${error.message}`);
        console.error('保存游戏失败:', error);
        return false;
    }
}

// 从指定存档位加载
function loadGameFromSlot(slot) {
    try {
        const saveData = localStorage.getItem(`cuteTeaShop_save_slot${slot}`);
        if (!saveData) {
            addMessage(`❌ 存档 ${slot} 不存在`);
            return false;
        }

        const parsedData = JSON.parse(saveData);

        // 合并数据到当前游戏状态
        Object.assign(gameData, parsedData);

        // 更新所有显示
        updateAllDisplays();

        addMessage(`📁 已加载存档 ${slot}`);
        debug(`已从存档位 ${slot} 加载游戏`);
        return true;
    } catch (error) {
        addMessage(`❌ 加载失败: ${error.message}`);
        console.error('加载游戏失败:', error);
        return false;
    }
}

// 删除存档位
function deleteSaveSlot(slot) {
    try {
        localStorage.removeItem(`cuteTeaShop_save_slot${slot}`);
        addMessage(`🗑️ 已删除存档 ${slot}`);
        debug(`已删除存档位 ${slot}`);
        return true;
    } catch (error) {
        addMessage(`❌ 删除失败: ${error.message}`);
        console.error('删除存档失败:', error);
        return false;
    }
}

debug('🍵 可爱茶铺脚本加载完成！');