// script.js

const climatePresets = {
  // 熱帯雨林 – 圧倒的な成長力と再生スピード
  tropical: {
    sunSeedProb: 0.35,
    shadeSeedProb: 0.15,
    shadeThreshold: 3,
    shadeStressProb: 0.15,
    sunLifeProb: 0.03,
    shadeLifeProb: 0.003,
    typhoonProb: 0.08,
    lightningProb: 0.06,
    wildfireProb: 0.002,
    volcanoProb: 0.001,
    fireSpreadProb: 0.15,
    typhoonRadiusBase: 6.0,
    soilDiffusionRate: 0.15,
    treeSoilConsumption: 0.7,
    deadTreeSoilGain: 8.0,
    deadTreeDecompProb: 0.40,
    ashSoilGain: 50.0,
    rockWeatheringRate: 0.15,
    primarySuccessionProb: 0.025,
    richSoilBoost: 6.0,
    primarySoilThreshold: 12.0,
    secondarySoilThreshold: 50.0,
    maxSoilFertility: 120.0,
    ashSettleProb: 0.90,
    rockToSoilThreshold: 3.0,
    volcanoSize: 10.0
  },
  // 温帯森林 – バランスの取れた遷移
  temperate: {
    sunSeedProb: 0.15,
    shadeSeedProb: 0.05,
    shadeThreshold: 5,
    shadeStressProb: 0.30,
    sunLifeProb: 0.05,
    shadeLifeProb: 0.005,
    typhoonProb: 0.05,
    lightningProb: 0.05,
    wildfireProb: 0.005,
    volcanoProb: 0.002,
    fireSpreadProb: 0.25,
    typhoonRadiusBase: 4.0,
    soilDiffusionRate: 0.10,
    treeSoilConsumption: 1.0,
    deadTreeSoilGain: 5.0,
    deadTreeDecompProb: 0.30,
    ashSoilGain: 40.0,
    rockWeatheringRate: 0.10,
    primarySuccessionProb: 0.020,
    richSoilBoost: 4.0,
    primarySoilThreshold: 20.0,
    secondarySoilThreshold: 50.0,
    maxSoilFertility: 100.0,
    ashSettleProb: 0.80,
    rockToSoilThreshold: 5.0,
    volcanoSize: 8.0
  },
  // 乾燥草原 / 砂漠 – 極端な不毛、一度の火災が致命的
  desert: {
    sunSeedProb: 0.01,
    shadeSeedProb: 0.001,
    shadeThreshold: 3,
    shadeStressProb: 0.60,
    sunLifeProb: 0.12,
    shadeLifeProb: 0.01,
    typhoonProb: 0.01,
    lightningProb: 0.04,
    wildfireProb: 0.03,
    volcanoProb: 0.003,
    fireSpreadProb: 0.50,
    typhoonRadiusBase: 3.0,
    soilDiffusionRate: 0.05,
    treeSoilConsumption: 1.8,
    deadTreeSoilGain: 3.0,
    deadTreeDecompProb: 0.20,
    ashSoilGain: 30.0,
    rockWeatheringRate: 0.05,
    primarySuccessionProb: 0.001,
    richSoilBoost: 2.0,
    primarySoilThreshold: 48.0,
    secondarySoilThreshold: 49.5,
    maxSoilFertility: 50.0,
    ashSettleProb: 0.60,
    rockToSoilThreshold: 8.0,
    volcanoSize: 7.0
  },
  // 亜寒帯森林 – 成長は非常に遅いが、陰樹が支配的
  boreal: {
    sunSeedProb: 0.04,
    shadeSeedProb: 0.12,
    shadeThreshold: 7,
    shadeStressProb: 0.25,
    sunLifeProb: 0.08,
    shadeLifeProb: 0.003,
    typhoonProb: 0.005,
    lightningProb: 0.04,
    wildfireProb: 0.003,
    volcanoProb: 0.001,
    fireSpreadProb: 0.20,
    typhoonRadiusBase: 2.0,
    soilDiffusionRate: 0.08,
    treeSoilConsumption: 0.6,
    deadTreeSoilGain: 5.0,
    deadTreeDecompProb: 0.28,
    ashSoilGain: 35.0,
    rockWeatheringRate: 0.08,
    primarySuccessionProb: 0.010,
    richSoilBoost: 3.5,
    primarySoilThreshold: 25.0,
    secondarySoilThreshold: 45.0,
    maxSoilFertility: 80.0,
    ashSettleProb: 0.75,
    rockToSoilThreshold: 6.0,
    volcanoSize: 6.0
  },
  // 高山ガレ場 – 森林限界付近、厳しい環境での粘り
  alpine: {
    sunSeedProb: 0.01,
    shadeSeedProb: 0.02,
    shadeThreshold: 8,
    shadeStressProb: 0.20,
    sunLifeProb: 0.10,
    shadeLifeProb: 0.005,
    typhoonProb: 0.005,
    lightningProb: 0.04,
    wildfireProb: 0.001,
    volcanoProb: 0.002,
    fireSpreadProb: 0.15,
    typhoonRadiusBase: 1.5,
    soilDiffusionRate: 0.06,
    treeSoilConsumption: 0.5,
    deadTreeSoilGain: 4.0,
    deadTreeDecompProb: 0.25,
    ashSoilGain: 25.0,
    rockWeatheringRate: 0.06,
    primarySuccessionProb: 0.002,
    richSoilBoost: 2.5,
    primarySoilThreshold: 55.0,
    secondarySoilThreshold: 58.0,
    maxSoilFertility: 60.0,
    ashSettleProb: 0.60,
    rockToSoilThreshold: 7.0,
    volcanoSize: 5.0
  },
  // 湿潤草原 – 種が広がりやすく、土壌が非常に豊か
  moistGrassland: {
    sunSeedProb: 0.25,
    shadeSeedProb: 0.10,
    shadeThreshold: 4,
    shadeStressProb: 0.20,
    sunLifeProb: 0.04,
    shadeLifeProb: 0.004,
    typhoonProb: 0.08,
    lightningProb: 0.06,
    wildfireProb: 0.006,
    volcanoProb: 0.001,
    fireSpreadProb: 0.30,
    typhoonRadiusBase: 5.0,
    soilDiffusionRate: 0.15,
    treeSoilConsumption: 0.9,
    deadTreeSoilGain: 7.0,
    deadTreeDecompProb: 0.35,
    ashSoilGain: 45.0,
    rockWeatheringRate: 0.12,
    primarySuccessionProb: 0.022,
    richSoilBoost: 5.0,
    primarySoilThreshold: 18.0,
    secondarySoilThreshold: 55.0,
    maxSoilFertility: 120.0,
    ashSettleProb: 0.85,
    rockToSoilThreshold: 4.0,
    volcanoSize: 9.0
  },
  // 湿潤熱帯 – 最速の世代交代、雨による山火事抑制
  wetTropical: {
    sunSeedProb: 0.45,
    shadeSeedProb: 0.20,
    shadeThreshold: 2,
    shadeStressProb: 0.10,
    sunLifeProb: 0.025,
    shadeLifeProb: 0.002,
    typhoonProb: 0.12,
    lightningProb: 0.08,
    wildfireProb: 0.002,
    volcanoProb: 0.001,
    fireSpreadProb: 0.10,
    typhoonRadiusBase: 7.0,
    soilDiffusionRate: 0.20,
    treeSoilConsumption: 0.8,
    deadTreeSoilGain: 10.0,
    deadTreeDecompProb: 0.45,
    ashSoilGain: 60.0,
    rockWeatheringRate: 0.20,
    primarySuccessionProb: 0.015,
    richSoilBoost: 7.0,
    primarySoilThreshold: 15.0,
    secondarySoilThreshold: 65.0,
    maxSoilFertility: 150.0,
    ashSettleProb: 0.92,
    rockToSoilThreshold: 2.5,
    volcanoSize: 12.0
  },
  // 不毛の静寂 – ほぼすべての変化が停止した、静止した景観
  moon: {
    sunSeedProb: 0.01,
    shadeSeedProb: 0.01,
    shadeThreshold: 8,
    shadeStressProb: 0.05,
    sunLifeProb: 0.01,
    shadeLifeProb: 0.001,
    typhoonProb: 0.001,
    lightningProb: 0.001,
    wildfireProb: 0.001,
    volcanoProb: 0.001,
    fireSpreadProb: 0.01,
    typhoonRadiusBase: 1.0,
    soilDiffusionRate: 0.01,
    treeSoilConsumption: 0.05,
    deadTreeSoilGain: 0.5,
    deadTreeDecompProb: 0.05,
    ashSoilGain: 2.0,
    rockWeatheringRate: 0.02,
    primarySuccessionProb: 0.001,
    richSoilBoost: 1.0,
    primarySoilThreshold: 14.0,
    secondarySoilThreshold: 14.5,
    maxSoilFertility: 15.0,
    ashSettleProb: 0.20,
    rockToSoilThreshold: 0.5,
    volcanoSize: 1.0
  },
  // 海底の森 – 成長率は高いが、火災はない。台風の代わりに潮流攪乱
  underwater: {
    sunSeedProb: 0.05,
    shadeSeedProb: 0.25,
    shadeThreshold: 2,
    shadeStressProb: 0.05,
    sunLifeProb: 0.04,
    shadeLifeProb: 0.002,
    typhoonProb: 0.03,
    lightningProb: 0.001,
    wildfireProb: 0.001,
    volcanoProb: 0.005,
    fireSpreadProb: 0.01,
    typhoonRadiusBase: 2.5,
    soilDiffusionRate: 0.05,
    treeSoilConsumption: 0.5,
    deadTreeSoilGain: 4.0,
    deadTreeDecompProb: 0.50,
    ashSoilGain: 10.0,
    rockWeatheringRate: 0.08,
    primarySuccessionProb: 0.015,
    richSoilBoost: 3.5,
    primarySoilThreshold: 8.0,
    secondarySoilThreshold: 25.0,
    maxSoilFertility: 80.0,
    ashSettleProb: 0.80,
    rockToSoilThreshold: 3.0,
    volcanoSize: 6.0
  },
  // 火山帯 – 破壊と驚異的な肥沃化が隣り合わせの環境
  volcanic: {
    sunSeedProb: 0.30,
    shadeSeedProb: 0.10,
    shadeThreshold: 4,
    shadeStressProb: 0.20,
    sunLifeProb: 0.05,
    shadeLifeProb: 0.005,
    typhoonProb: 0.02,
    lightningProb: 0.05,
    wildfireProb: 0.01,
    volcanoProb: 0.08,
    fireSpreadProb: 0.30,
    typhoonRadiusBase: 3.0,
    soilDiffusionRate: 0.15,
    treeSoilConsumption: 1.0,
    deadTreeSoilGain: 5.0,
    deadTreeDecompProb: 0.40,
    ashSoilGain: 100.0,
    rockWeatheringRate: 0.20,
    primarySuccessionProb: 0.050,
    richSoilBoost: 6.0,
    primarySoilThreshold: 15.0,
    secondarySoilThreshold: 40.0,
    maxSoilFertility: 400.0,
    ashSettleProb: 0.98,
    rockToSoilThreshold: 2.0,
    volcanoSize: 18.0
  },
  // サバナ – 陽樹（低木）がまばらに広がる乾燥草原
  savanna: {
    sunSeedProb: 0.15,
    shadeSeedProb: 0.005,
    shadeThreshold: 3,
    shadeStressProb: 0.60,
    sunLifeProb: 0.06,
    shadeLifeProb: 0.01,
    typhoonProb: 0.02,
    lightningProb: 0.08,
    wildfireProb: 0.04,
    fireSpreadProb: 0.50,
    typhoonRadiusBase: 3.0,
    soilDiffusionRate: 0.05,
    treeSoilConsumption: 1.2,
    deadTreeSoilGain: 3.0,
    deadTreeDecompProb: 0.30,
    ashSoilGain: 20.0,
    rockWeatheringRate: 0.05,
    primarySuccessionProb: 0.015,
    richSoilBoost: 3.0,
    primarySoilThreshold: 25.0,
    secondarySoilThreshold: 45.0,
    maxSoilFertility: 60.0,
    ashSettleProb: 0.50,
    rockToSoilThreshold: 6.0,
    volcanoSize: 5.0
  },
  // 黙示録 – 最高頻度の破壊と再生、カオスそのもの
  apocalypse: {
    sunSeedProb: 0.60,
    shadeSeedProb: 0.40,
    shadeThreshold: 2,
    shadeStressProb: 0.80,
    sunLifeProb: 0.01,
    shadeLifeProb: 0.0005,
    typhoonProb: 0.35,
    lightningProb: 0.25,
    wildfireProb: 0.20,
    volcanoProb: 0.10,
    fireSpreadProb: 0.70,
    typhoonRadiusBase: 12.0,
    soilDiffusionRate: 0.25,
    treeSoilConsumption: 3.0,
    deadTreeSoilGain: 15.0,
    deadTreeDecompProb: 0.80,
    ashSoilGain: 100.0,
    rockWeatheringRate: 0.50,
    primarySuccessionProb: 0.08,
    richSoilBoost: 15.0,
    primarySoilThreshold: 5.0,
    secondarySoilThreshold: 25.0,
    maxSoilFertility: 300.0,
    ashSettleProb: 0.98,
    rockToSoilThreshold: 1.5,
    volcanoSize: 25.0
  }
};


const GRID_SIZE = 100;
const CELL_SIZE = 8;

const STATE = {
    EMPTY: 0,
    SUN_TREE: 1,
    SHADE_TREE: 2,
    DEAD_TREE: 3,
    BURNING: 4,
    ASH: 5,
    ROCK: 6,
    LAVA: 7
};

const COLORS = {
    [STATE.EMPTY]: '#8B4513',    // 土の色（SaddleBrown）
    [STATE.SUN_TREE]: '#7CFC00', // 陽樹（LawnGreen）
    [STATE.SHADE_TREE]: '#006400',// 陰樹（DarkGreen）
    [STATE.DEAD_TREE]: '#707070', // 枯れ木（Gray）
    [STATE.BURNING]: '#FF4500',  // 燃えている（OrangeRed）
    [STATE.ASH]: '#e5e7eb',      // 灰（Cloudy White）
    [STATE.ROCK]: '#450a0a',     // 岩（Dark Lava Rock）
    [STATE.LAVA]: '#f97316'      // 溶岩（Orange）
};

// パラメーターIDと表示用IDの対応リスト（UI更新に必要）
const ranges = ['sunSeedProb', 'shadeSeedProb', 'shadeThreshold', 'shadeStressProb', 'sunLifeProb', 'shadeLifeProb', 'typhoonProb', 'lightningProb', 'wildfireProb', 'volcanoProb', 'fireSpreadProb', 'soilDiffusionRate', 'treeSoilConsumption', 'deadTreeSoilGain', 'deadTreeDecompProb', 'ashSoilGain', 'rockWeatheringRate', 'primarySuccessionProb', 'richSoilBoost', 'primarySoilThreshold', 'secondarySoilThreshold', 'maxSoilFertility', 'ashSettleProb', 'rockToSoilThreshold', 'typhoonRadiusBase', 'volcanoSize'];
const displayIds = ['sunSeedVal', 'shadeSeedVal', 'shadeThreshVal', 'shadeStressVal', 'sunLifeVal', 'shadeLifeVal', 'typhoonProbVal', 'lightningProbVal', 'wildfireProbVal', 'volcanoProbVal', 'fireSpreadVal', 'soilDiffusionRateVal', 'treeSoilConsumptionVal', 'deadTreeSoilGainVal', 'deadTreeDecompProbVal', 'ashSoilGainVal', 'rockWeatheringRateVal', 'primarySuccessionProbVal', 'richSoilBoostVal', 'primarySoilThresholdVal', 'secondarySoilThresholdVal', 'maxSoilFertilityVal', 'ashSettleProbVal', 'rockToSoilThresholdVal', 'typhoonRadiusBaseVal', 'volcanoSizeVal'];

const SOIL_COLORS = {
    '0-20': '#3b82f6',
    '20-40': '#06b6d4',
    '40-60': '#10b981',
    '60-80': '#facc15',
    '80-100': '#ef4444',
    '100-200': '#a855f7',
    '200+': '#3f3f46'
};

const DEFAULT_PARAMS = {
    sunSeedProb: 0.15,
    shadeSeedProb: 0.05,
    shadeThreshold: 5,
    shadeStressProb: 0.30,
    sunLifeProb: 0.05,
    shadeLifeProb: 0.005,
    typhoonProb: 0.050,
    lightningProb: 0.050,
    wildfireProb: 0.005,
    volcanoProb: 0.002,
    fireSpreadProb: 0.25,
    soilDiffusionRate: 0.10,
    treeSoilConsumption: 1.0,
    deadTreeSoilGain: 5.0,
    deadTreeDecompProb: 0.30,
    ashSoilGain: 40.0,
    rockWeatheringRate: 0.10,
    primarySuccessionProb: 0.020,
    richSoilBoost: 4.0,
    primarySoilThreshold: 20.0,
    secondarySoilThreshold: 50.0,
    maxSoilFertility: 100.0,
    ashSettleProb: 0.80,
    rockToSoilThreshold: 5.0,
    typhoonRadiusBase: 4.0,
    volcanoSize: 8.0
};

const getParams = () => ({
    sunSeedProb: parseFloat(document.getElementById('sunSeedProb').value),
    shadeSeedProb: parseFloat(document.getElementById('shadeSeedProb').value),
    shadeThreshold: parseInt(document.getElementById('shadeThreshold').value),
    shadeStressProb: parseFloat(document.getElementById('shadeStressProb').value),
    sunLifeProb: parseFloat(document.getElementById('sunLifeProb').value),
    shadeLifeProb: parseFloat(document.getElementById('shadeLifeProb').value),
    typhoonProb: parseFloat(document.getElementById('typhoonProb').value),
    lightningProb: parseFloat(document.getElementById('lightningProb').value),
    wildfireProb: parseFloat(document.getElementById('wildfireProb').value),
    volcanoProb: parseFloat(document.getElementById('volcanoProb').value),
    fireSpreadProb: parseFloat(document.getElementById('fireSpreadProb').value),
    soilDiffusionRate: parseFloat(document.getElementById('soilDiffusionRate').value),
    treeSoilConsumption: parseFloat(document.getElementById('treeSoilConsumption').value),
    deadTreeSoilGain: parseFloat(document.getElementById('deadTreeSoilGain').value),
    deadTreeDecompProb: parseFloat(document.getElementById('deadTreeDecompProb').value),
    ashSoilGain: parseFloat(document.getElementById('ashSoilGain').value),
    rockWeatheringRate: parseFloat(document.getElementById('rockWeatheringRate').value),
    primarySuccessionProb: parseFloat(document.getElementById('primarySuccessionProb').value),
    richSoilBoost: parseFloat(document.getElementById('richSoilBoost').value),
    primarySoilThreshold: parseFloat(document.getElementById('primarySoilThreshold').value),
    secondarySoilThreshold: parseFloat(document.getElementById('secondarySoilThreshold').value),
    maxSoilFertility: parseFloat(document.getElementById('maxSoilFertility').value),
    ashSettleProb: parseFloat(document.getElementById('ashSettleProb').value),
    rockToSoilThreshold: parseFloat(document.getElementById('rockToSoilThreshold').value),
    typhoonRadiusBase: parseFloat(document.getElementById('typhoonRadiusBase').value),
    volcanoSize: parseFloat(document.getElementById('volcanoSize').value)
});

let grid, nextGrid, soilGrid, nextSoilGrid;

// Apply a climate preset to UI controls
function applyPreset(presetName) {
    const preset = climatePresets[presetName];
    if (!preset) return;
    Object.entries(preset).forEach(([key, value]) => {
        const input = document.getElementById(key);
        if (input) {
            input.value = value;
            // update display value
            const idx = ranges.indexOf(key);
            if (idx !== -1) {
                const display = document.getElementById(displayIds[idx]);
                if (display) {
                    if (['typhoonProb','lightningProb','wildfireProb','volcanoProb','shadeLifeProb','primarySuccessionProb'].includes(key))
                        display.textContent = parseFloat(value).toFixed(3);
                    else if (['shadeThreshold','primarySoilThreshold','secondarySoilThreshold','maxSoilFertility','typhoonRadiusBase','volcanoSize'].includes(key))
                        display.textContent = parseFloat(value).toFixed(1);
                    else
                        display.textContent = parseFloat(value).toFixed(2);
                }
            }
        }
    });
    // After updating UI, reset simulation to apply new parameters
    initGrid();
    resetEvaluation();
}

// Listen for preset changes
document.getElementById('climatePresetSelect').addEventListener('change', (e) => {
    applyPreset(e.target.value);
});
let stepCount = 0;
let isRunning = false;
let animationId;
let isViewingHistory = false;
let historySnapshots = [];
let currentViewMode = 'plant';

let diversityChart = null;
const MAX_CHART_HISTORY = 20; // 20年分
let chartLabels = [];
let chartDataVegDiv = [];   // 植生多様性
let chartDataMosaic = [];   // 空間モザイク
let chartDataSoilHet = [];  // 土壌不均一性
let chartDataGap = [];      // ギャップ動態率
let gapCellsCount = 0;      // その年に発生したギャップ（枯死）数
let localGapCellsCount = 0; // 局所エリアの枯死数
let chartDataSeverity = []; // 過酷度

// 局所観測用の点線データ
let chartDataLocalVegDiv = [];
let chartDataLocalMosaic = [];
let chartDataLocalSoilHet = [];
let chartDataLocalGap = [];
let chartDataLocalSeverity = [];

let localAreaRect = { x: 0, y: 0, w: 10, h: 10 }; // 局所観測エリア
let samplePoints = []; // 廃止
let isSamplePoint = null; // 廃止

function initGrid() {
    if (isViewingHistory) exitHistoryMode();

    grid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(STATE.EMPTY));
    nextGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(STATE.EMPTY));
    soilGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(20.0));
    nextSoilGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(20.0));

    stepCount = 0;
    historySnapshots = [];
    updateHistoryUI();

    // 局所観測エリアをランダムに決定
    localAreaRect.x = Math.floor(Math.random() * (GRID_SIZE - localAreaRect.w));
    localAreaRect.y = Math.floor(Math.random() * (GRID_SIZE - localAreaRect.h));

    const logList = document.getElementById('eventLogList');
    if (logList) logList.innerHTML = '';

    // グラフデータのリセット
    gapCellsCount = 0;
    localGapCellsCount = 0;
    chartLabels.length = 0;
    chartDataVegDiv.length = 0;
    chartDataMosaic.length = 0;
    chartDataSoilHet.length = 0;
    chartDataGap.length = 0;
    chartDataLocalVegDiv.length = 0;
    chartDataLocalMosaic.length = 0;
    chartDataLocalSoilHet.length = 0;
    chartDataLocalGap.length = 0;
    chartDataLocalSeverity.length = 0;
    chartDataSeverity.length = 0;
    if (diversityChart) {
        diversityChart.update();
    }

    updateStats();
    drawGrid();
}

const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;

function initDiversityChart() {
    const chartElement = document.getElementById('diversityChart');
    if (!chartElement || typeof Chart === 'undefined') {
        console.warn("Diversity chart canvas not found or Chart.js not loaded.");
        return;
    }
    const chartCtx = chartElement.getContext('2d');
    diversityChart = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
                // --- 全体指標 (実線) ---
                {
                    label: '植生多様性',
                    data: chartDataVegDiv,
                    borderColor: '#4ade80',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '空間モザイク',
                    data: chartDataMosaic,
                    borderColor: '#facc15',
                    borderWidth: 1.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '土壌不均一性',
                    data: chartDataSoilHet,
                    borderColor: '#60a5fa',
                    borderWidth: 1.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'ギャップ動態',
                    data: chartDataGap,
                    borderColor: '#f87171',
                    borderWidth: 1.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '過酷度',
                    data: chartDataSeverity,
                    borderColor: '#a855f7',
                    borderWidth: 1.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                // --- 局所指標 (点線) ---
                {
                    label: '局所植生',
                    data: chartDataLocalVegDiv,
                    borderColor: '#4ade80',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '局所モザイク',
                    data: chartDataLocalMosaic,
                    borderColor: '#facc15',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '局所土壌',
                    data: chartDataLocalSoilHet,
                    borderColor: '#60a5fa',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '局所ギャップ',
                    data: chartDataLocalGap,
                    borderColor: '#f87171',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '局所過酷',
                    data: chartDataLocalSeverity,
                    borderColor: '#a855f7',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false // 標準の凡例は非表示
                },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: {
                    ticks: { color: '#71717a', maxTicksLimit: 10 },
                    grid: { display: false }
                },
                y: {
                    min: 0,
                    max: 1.0,
                    ticks: {
                        color: '#a1a1aa',
                        stepSize: 0.2,
                        callback: function (value) { return value.toFixed(1); }
                    },
                    grid: { color: '#3f3f46' }
                }
            }
        }
    });
    // カスタム凡例の描画
    renderCustomLegend();
}

function renderCustomLegend() {
    const legendContainer = document.getElementById('customLegend');
    if (!legendContainer || !diversityChart) return;
    legendContainer.innerHTML = '';

    diversityChart.data.datasets.forEach((dataset, index) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.cursor = 'pointer';
        item.style.padding = '2px 0';
        item.style.transition = 'opacity 0.2s';
        
        // 色ボックス
        const box = document.createElement('span');
        box.style.display = 'inline-block';
        box.style.width = '12px';
        box.style.height = '12px';
        box.style.marginRight = '10px';
        box.style.backgroundColor = dataset.borderColor;
        box.style.borderRadius = '2px';
        if (dataset.borderDash) {
            box.style.border = `2px dashed ${dataset.borderColor}`;
            box.style.backgroundColor = 'transparent';
        }

        const label = document.createElement('span');
        label.textContent = dataset.label;
        
        item.appendChild(box);
        item.appendChild(label);

        // クリックで表示切り替え
        item.onclick = () => {
            const meta = diversityChart.getDatasetMeta(index);
            meta.hidden = meta.hidden === null ? !diversityChart.data.datasets[index].hidden : null;
            item.style.opacity = meta.hidden ? '0.3' : '1';
            diversityChart.update();
        };

        legendContainer.appendChild(item);
    });
}

function getSoilColor(val) {
    const ratio = val / 100.0;
    const r = Math.floor(210 - ratio * (210 - 62));
    const g = Math.floor(180 - ratio * (180 - 39));
    const b = Math.floor(140 - ratio * (140 - 35));
    return `rgb(${r}, ${g}, ${b})`;
}

function getSoilHeatmapColor(val) {
    let r, g, b;
    if (val < 25.0) {
        const ratio = val / 25.0;
        r = 0; g = Math.floor(ratio * 255); b = 255;
    } else if (val < 50.0) {
        const ratio = (val - 25.0) / 25.0;
        r = 0; g = 255; b = Math.floor(255 - ratio * 255);
    } else if (val < 75.0) {
        const ratio = (val - 50.0) / 25.0;
        r = Math.floor(ratio * 255); g = 255; b = 0;
    } else if (val < 100.0) {
        const ratio = (val - 75.0) / 25.0;
        r = 255; g = Math.floor(255 - ratio * 255); b = 0;
    } else if (val < 200.0) {
        // 100-200: 赤 → 紫
        const ratio = (val - 100.0) / 100.0;
        r = 255; g = 0; b = Math.floor(ratio * 255);
    } else {
        // 200-500: 紫 → 黒
        const ratio = Math.min((val - 200.0) / 300.0, 1.0);
        r = Math.floor(255 - ratio * 255); g = 0; b = Math.floor(255 - ratio * 255);
    }
    return `rgb(${r}, ${g}, ${b})`;
}

function drawGrid(targetGrid = grid, targetSoilGrid = soilGrid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (currentViewMode === 'plant') {
                const state = targetGrid[y][x];
                if (state === STATE.EMPTY) {
                    ctx.fillStyle = getSoilColor(targetSoilGrid[y][x]);
                } else {
                    ctx.fillStyle = COLORS[state];
                }
            } else {
                ctx.fillStyle = getSoilHeatmapColor(targetSoilGrid[y][x]);
            }
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }

    // 局所観測エリアの枠（赤）を最後に描画
    ctx.strokeStyle = '#ef4444'; // Tailwind red-500
    ctx.lineWidth = 2;
    ctx.strokeRect(
        localAreaRect.x * CELL_SIZE, 
        localAreaRect.y * CELL_SIZE, 
        localAreaRect.w * CELL_SIZE, 
        localAreaRect.h * CELL_SIZE
    );
}

function updateStats(targetGrid = grid, targetSoilGrid = soilGrid, targetYear = stepCount) {
    document.getElementById('stepCount').textContent = targetYear;
    let totalSoil = 0;
    const totalCells = GRID_SIZE * GRID_SIZE;
    let soilDistribution = { '0-20': 0, '20-40': 0, '40-60': 0, '60-80': 0, '80-100': 0, '100-200': 0, '200+': 0 };
    let stateCounts = { [STATE.EMPTY]: 0, [STATE.SUN_TREE]: 0, [STATE.SHADE_TREE]: 0, [STATE.DEAD_TREE]: 0, [STATE.BURNING]: 0, [STATE.ASH]: 0, [STATE.ROCK]: 0, [STATE.LAVA]: 0 };

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const soil = targetSoilGrid[y][x];
            const state = targetGrid[y][x];
            totalSoil += soil;
            stateCounts[state]++;
            
            if (soil < 20.0) soilDistribution['0-20']++;
            else if (soil < 40.0) soilDistribution['20-40']++;
            else if (soil < 60.0) soilDistribution['40-60']++;
            else if (soil < 80.0) soilDistribution['60-80']++;
            else if (soil < 100.0) soilDistribution['80-100']++;
            else if (soil < 200.0) soilDistribution['100-200']++;
            else soilDistribution['200+']++;
        }
    }

    // 局所エリアの集計
    let localTotalSoil = 0;
    let localStateCounts = { [STATE.EMPTY]: 0, [STATE.SUN_TREE]: 0, [STATE.SHADE_TREE]: 0, [STATE.DEAD_TREE]: 0, [STATE.BURNING]: 0, [STATE.ASH]: 0, [STATE.ROCK]: 0, [STATE.LAVA]: 0 };
    for (let y = localAreaRect.y; y < localAreaRect.y + localAreaRect.h; y++) {
        for (let x = localAreaRect.x; x < localAreaRect.x + localAreaRect.w; x++) {
            const state = targetGrid[y][x];
            localStateCounts[state]++;
            localTotalSoil += targetSoilGrid[y][x];
        }
    }

    document.getElementById('avgSoil').textContent = (totalSoil / totalCells).toFixed(1);
    const primaryCount = soilDistribution['0-20'];
    let exactSecondary = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (targetSoilGrid[y][x] >= 50.0) exactSecondary++;
        }
    }
    document.getElementById('primaryArea').textContent = ((primaryCount / totalCells) * 100).toFixed(1);
    document.getElementById('secondaryArea').textContent = ((exactSecondary / totalCells) * 100).toFixed(1);

    drawPieChart('pieChartPlants', stateCounts, COLORS, totalCells);
    drawPieChart('pieChartSoil', soilDistribution, SOIL_COLORS, totalCells);

    // --- 生態系指標の計算 ---

    // 1. 植生多様性 (陽樹と陰樹のみの正規化シャノン)
    const treeTotal = stateCounts[STATE.SUN_TREE] + stateCounts[STATE.SHADE_TREE];
    let vegDiversity = 0;
    if (treeTotal > 0) {
        const p1 = stateCounts[STATE.SUN_TREE] / treeTotal;
        const p2 = stateCounts[STATE.SHADE_TREE] / treeTotal;
        if (p1 > 0) vegDiversity -= p1 * Math.log(p1);
        if (p2 > 0) vegDiversity -= p2 * Math.log(p2);
        vegDiversity /= Math.log(2); // 正規化
    }
    
    // (updateEvaluationは統計計算の末尾へ移動)

    // 2. 空間モザイク指数 (境界線の密度)
    let edges = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const s = targetGrid[y][x];
            // 右と下だけチェックして重複回避
            if (x < GRID_SIZE - 1 && s !== targetGrid[y][x+1]) edges++;
            if (y < GRID_SIZE - 1 && s !== targetGrid[y+1][x]) edges++;
        }
    }
    const maxEdges = (GRID_SIZE - 1) * GRID_SIZE * 2;
    const mosaicIndex = Math.min(1.0, (edges / maxEdges)); // 倍率を廃止して上限に達しにくく調整

    // 3. 土壌の不均一性指数 (標準偏差)
    const avgSoil = totalSoil / totalCells;
    let variance = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            variance += Math.pow(targetSoilGrid[y][x] - avgSoil, 2);
        }
    }
    const stdDev = Math.sqrt(variance / totalCells);
    const soilHeterogeneity = Math.min(1.0, stdDev / 50); // 基準を30から50に引き上げ

    // 4. ギャップ動態率 (枯死発生率)
    const gapDynamicsRate = Math.min(1.0, gapCellsCount / (totalCells * 0.05));

    // --- 局所指標の計算 ---
    // 局所植生多様性
    let localVegDiv = 0;
    const localTreeTotal = localStateCounts[STATE.SUN_TREE] + localStateCounts[STATE.SHADE_TREE];
    if (localTreeTotal > 0) {
        const p1 = localStateCounts[STATE.SUN_TREE] / localTreeTotal;
        const p2 = localStateCounts[STATE.SHADE_TREE] / localTreeTotal;
        if (p1 > 0) localVegDiv -= p1 * Math.log(p1);
        if (p2 > 0) localVegDiv -= p2 * Math.log(p2);
        localVegDiv /= Math.log(2);
    }
    // 局所空間モザイク
    let localEdges = 0;
    for (let y = localAreaRect.y; y < localAreaRect.y + localAreaRect.h; y++) {
        for (let x = localAreaRect.x; x < localAreaRect.x + localAreaRect.w; x++) {
            const s = targetGrid[y][x];
            if (x < localAreaRect.x + localAreaRect.w - 1 && s !== targetGrid[y][x+1]) localEdges++;
            if (y < localAreaRect.y + localAreaRect.h - 1 && s !== targetGrid[y+1][x]) localEdges++;
        }
    }
    const maxLocalEdges = (localAreaRect.w - 1) * localAreaRect.h + (localAreaRect.h - 1) * localAreaRect.w;
    const localMosaicIndex = maxLocalEdges > 0 ? (localEdges / maxLocalEdges) : 0;
    // 局所土壌不均一性
    const localAvgSoil = localTotalSoil / 100;
    let localVariance = 0;
    for (let y = localAreaRect.y; y < localAreaRect.y + localAreaRect.h; y++) {
        for (let x = localAreaRect.x; x < localAreaRect.x + localAreaRect.w; x++) {
            localVariance += Math.pow(targetSoilGrid[y][x] - localAvgSoil, 2);
        }
    }
    const localStdDev = Math.sqrt(localVariance / 100);
    const localSoilHet = Math.min(1.0, localStdDev / 50);
    // 局所ギャップ動態率
    const localGapRate = Math.min(1.0, localGapCellsCount / (100 * 0.1)); // 10%の変化で1.0

    // 5. 過酷度の計算 (不毛な地も過酷さとしてカウントするように修正)
    const harshWeights = {
        [STATE.EMPTY]: 0.5,    // 植物がいない空き地
        [STATE.ROCK]: 0.8,     // 岩場
        [STATE.LAVA]: 1.0,     // 溶岩
        [STATE.BURNING]: 1.0,  // 火災
        [STATE.ASH]: 0.4,      // 灰
        [STATE.DEAD_TREE]: 0.2 // 枯れ木
    };
    let severityScore = 0;
    Object.entries(stateCounts).forEach(([state, count]) => {
        const s = parseInt(state);
        severityScore += (harshWeights[s] || 0) * (count / totalCells);
    });
    severityScore = Math.min(1.0, Math.sqrt(severityScore) * 1.2);

    // 局所過酷度の計算
    let localSeverityScore = 0;
    Object.entries(localStateCounts).forEach(([state, count]) => {
        const s = parseInt(state);
        localSeverityScore += (harshWeights[s] || 0) * (count / 100);
    });
    localSeverityScore = Math.min(1.0, Math.sqrt(localSeverityScore) * 1.2);

    // --- 評価システムの更新 (全指標の計算完了後) ---
    if (!isViewingHistory && typeof updateEvaluation === 'function') {
        updateEvaluation({
            diversity: vegDiversity,
            mosaic: mosaicIndex,
            soil: Math.min(1.0, avgSoil / 100),
            activity: gapDynamicsRate,
            stability: 1.0 - severityScore
        });
    }

    // --- グラフの更新 (毎年更新、20年分保持) ---
    if (!isViewingHistory && diversityChart) {
        if (chartLabels.length === 0 || chartLabels[chartLabels.length - 1] !== targetYear) {
            chartLabels.push(targetYear);
            chartDataVegDiv.push(vegDiversity);
            chartDataMosaic.push(mosaicIndex);
            chartDataSoilHet.push(soilHeterogeneity);
            chartDataGap.push(gapDynamicsRate);
            chartDataLocalVegDiv.push(localVegDiv);
            chartDataLocalMosaic.push(localMosaicIndex);
            chartDataLocalSoilHet.push(localSoilHet);
            chartDataLocalGap.push(localGapRate);
            chartDataLocalSeverity.push(localSeverityScore);
            chartDataSeverity.push(severityScore);

            if (chartLabels.length > MAX_CHART_HISTORY) {
                chartLabels.shift();
                chartDataVegDiv.shift();
                chartDataMosaic.shift();
                chartDataSoilHet.shift();
                chartDataGap.shift();
                chartDataLocalVegDiv.shift();
                chartDataLocalMosaic.shift();
                chartDataLocalSoilHet.shift();
                chartDataLocalGap.shift();
                chartDataLocalSeverity.shift();
                chartDataSeverity.shift();
            }
            diversityChart.update();
            gapCellsCount = 0; 
            localGapCellsCount = 0; // 年度更新時にリセット
        }
    }
}

function drawPieChart(canvasId, counts, colorsMap, total) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const chartCtx = canvas.getContext('2d');
    chartCtx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 2;
    let currentAngle = -Math.PI / 2;
    Object.keys(counts).forEach(key => {
        const count = counts[key];
        if (count === 0) return;
        const sliceAngle = (count / total) * 2 * Math.PI;
        chartCtx.beginPath();
        chartCtx.moveTo(cx, cy);
        chartCtx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
        chartCtx.closePath();
        chartCtx.fillStyle = colorsMap[key];
        chartCtx.fill();
        currentAngle += sliceAngle;
    });
}

function countShade(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
                if (grid[ny][nx] === STATE.SUN_TREE || grid[ny][nx] === STATE.SHADE_TREE) {
                    count++;
                }
            }
        }
    }
    return count;
}

function triggerVolcanoLogic() {
    const p = getParams();
    const centerX = Math.floor(Math.random() * GRID_SIZE);
    const centerY = Math.floor(Math.random() * GRID_SIZE);
    const radius = p.volcanoSize + (Math.random() - 0.5) * 4;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            if (dist < radius) {
                grid[y][x] = STATE.LAVA;
                soilGrid[y][x] = 0;
            }
        }
    }
    return radius > 15 ? "巨大" : (radius > 8 ? "中規模" : "小規模");
}

function triggerWildfireLogic(size, startBurning) {
    const centerX = Math.floor(Math.random() * GRID_SIZE);
    const centerY = Math.floor(Math.random() * GRID_SIZE);
    const p = getParams();
    let fireQueue = [];
    for (let y = Math.max(0, centerY - size); y <= Math.min(GRID_SIZE - 1, centerY + size); y++) {
        for (let x = Math.max(0, centerX - size); x <= Math.min(GRID_SIZE - 1, centerX + size); x++) {
            if (grid[y][x] === STATE.SUN_TREE || grid[y][x] === STATE.SHADE_TREE) {
                grid[y][x] = STATE.BURNING;
                fireQueue.push({ x, y });
            }
        }
    }
    while (fireQueue.length > 0) {
        const { x, y } = fireQueue.shift();
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
                    const targetState = grid[ny][nx];
                    if (targetState === STATE.SUN_TREE || targetState === STATE.SHADE_TREE) {
                        const densityCount = countShade(nx, ny);
                        let densityMultiplier = 0.2 + 0.8 * (densityCount / 8.0);
                        if (targetState === STATE.SHADE_TREE) densityMultiplier *= 1.3;
                        const finalSpreadProb = p.fireSpreadProb * densityMultiplier;
                        if (Math.random() < finalSpreadProb) {
                            grid[ny][nx] = STATE.BURNING;
                            fireQueue.push({ x: nx, y: ny });
                        }
                    }
                }
            }
        }
    }
}

function triggerTyphoonLogic() {
    const p = getParams();
    let cx = Math.random() * GRID_SIZE;
    let cy = Math.random() * GRID_SIZE;
    let angle = Math.random() * Math.PI * 2;
    const radius = p.typhoonRadiusBase + Math.random() * 5;
    const steps = 150;
    for (let i = 0; i < steps; i++) {
        const intCx = Math.floor(cx);
        const intCy = Math.floor(cy);
        const rInt = Math.ceil(radius);
        for (let dy = -rInt; dy <= rInt; dy++) {
            for (let dx = -rInt; dx <= rInt; dx++) {
                const nx = intCx + dx;
                const ny = intCy + dy;
                if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < radius) {
                        if (grid[ny][nx] === STATE.SUN_TREE || grid[ny][nx] === STATE.SHADE_TREE) {
                            grid[ny][nx] = STATE.DEAD_TREE;
                        }
                    }
                }
            }
        }
        cx += Math.cos(angle);
        cy += Math.sin(angle);
        angle += (Math.random() - 0.5) * 0.2;
    }
}

function step() {
    const p = getParams();
    const diffusionRate = p.soilDiffusionRate;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            let neighborSum = 0;
            let count = 0;
            const neighbors = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            for (let [dx, dy] of neighbors) {
                const nx = x + dx; const ny = y + dy;
                if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) { neighborSum += soilGrid[ny][nx]; count++; }
            }
            if (count > 0) {
                let diff = ((neighborSum / count) - soilGrid[y][x]) * diffusionRate;
                nextSoilGrid[y][x] = Math.min(Math.max(soilGrid[y][x] + diff, 0.0), p.maxSoilFertility);
            } else {
                nextSoilGrid[y][x] = Math.min(Math.max(soilGrid[y][x], 0.0), p.maxSoilFertility);
            }
        }
    }

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const currentState = grid[y][x];
            let nextState = currentState;
            let currentSoil = nextSoilGrid[y][x];
            const shadeCount = countShade(x, y);

            if (currentState === STATE.EMPTY) {
                if (currentSoil < p.primarySoilThreshold) {
                    if (Math.random() < p.primarySuccessionProb) nextState = STATE.SUN_TREE;
                } else if (currentSoil >= p.secondarySoilThreshold) {
                    if (Math.random() < Math.min(1.0, p.sunSeedProb * p.richSoilBoost)) nextState = STATE.SUN_TREE;
                    else if (Math.random() < p.shadeSeedProb) nextState = STATE.SHADE_TREE;
                } else {
                    if (Math.random() < p.sunSeedProb) nextState = STATE.SUN_TREE;
                    else if (Math.random() < p.shadeSeedProb) nextState = STATE.SHADE_TREE;
                }
            } else if (currentState === STATE.SUN_TREE) {
                if (shadeCount >= p.shadeThreshold && Math.random() < p.shadeStressProb) nextState = STATE.DEAD_TREE;
                else if (Math.random() < p.shadeSeedProb) nextState = STATE.SHADE_TREE;
                else if (Math.random() < p.sunLifeProb) nextState = STATE.DEAD_TREE;
                currentSoil = Math.max(0, currentSoil - p.treeSoilConsumption);
            } else if (currentState === STATE.SHADE_TREE) {
                if (Math.random() < p.shadeLifeProb) nextState = STATE.DEAD_TREE;
                currentSoil = Math.max(0, currentSoil - p.treeSoilConsumption);
            } else if (currentState === STATE.DEAD_TREE) {
                currentSoil = Math.min(p.maxSoilFertility, currentSoil + p.deadTreeSoilGain);
                if (Math.random() < p.deadTreeDecompProb * (currentSoil / p.maxSoilFertility)) nextState = STATE.EMPTY;
            } else if (currentState === STATE.BURNING) {
                nextState = STATE.ASH;
                currentSoil = Math.min(p.maxSoilFertility, currentSoil + p.ashSoilGain);
            } else if (currentState === STATE.ASH) {
                if (Math.random() < p.ashSettleProb) nextState = STATE.EMPTY;
            } else if (currentState === STATE.LAVA) {
                nextState = STATE.ROCK;
                currentSoil = 0.0;
            } else if (currentState === STATE.ROCK) {
                currentSoil = Math.min(p.maxSoilFertility, currentSoil + p.rockWeatheringRate);
                if (currentSoil >= p.rockToSoilThreshold) nextState = STATE.EMPTY;
            }
            nextGrid[y][x] = nextState;
            nextSoilGrid[y][x] = currentSoil;
        }
    }

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            // 枯死（ギャップ発生）のカウント
            const oldS = grid[y][x];
            const newS = nextGrid[y][x];
            if ((oldS === STATE.SUN_TREE || oldS === STATE.SHADE_TREE) && 
                (newS === STATE.DEAD_TREE || newS === STATE.EMPTY)) {
                gapCellsCount++;
                if (x >= localAreaRect.x && x < localAreaRect.x + localAreaRect.w &&
                    y >= localAreaRect.y && y < localAreaRect.y + localAreaRect.h) {
                    localGapCellsCount++;
                }
            }
            grid[y][x] = nextGrid[y][x];
            soilGrid[y][x] = nextSoilGrid[y][x];
        }
    }

    let eventMessage = '';
    if (Math.random() < p.typhoonProb) { eventMessage += `🌀 台風自動発生！\n`; triggerTyphoonLogic(); }
    if (Math.random() < p.lightningProb) { eventMessage += `⚡ 落雷によるボヤが発生！\n`; triggerWildfireLogic(1, 0); }
    if (Math.random() < p.wildfireProb) { eventMessage += `🔥 大規模山火事自動発生！\n`; triggerWildfireLogic(5, 3); }
    if (Math.random() < p.volcanoProb) { const sizeStr = triggerVolcanoLogic(); eventMessage += `🌋 ${sizeStr}な火山噴火が発生！\n`; }
    if (eventMessage !== '') showLog(eventMessage.trim());

    stepCount++;
    if (stepCount % 10 === 0) {
        historySnapshots.push({ year: stepCount, grid: grid.map(row => [...row]), soilGrid: soilGrid.map(row => [...row]) });
        updateHistoryUI();
    }
    updateStats();
    drawGrid();
}

let lastTime = 0;
let currentStepInterval = 100;

function updateStepInterval(value) {
    // 1(1000ms) ~ 5(100ms) ~ 10(10ms)
    const speed = parseInt(value);
    if (speed <= 5) {
        currentStepInterval = 1000 - (speed - 1) * 225; // 1000, 775, 550, 325, 100
    } else {
        currentStepInterval = 100 - (speed - 5) * 18; // 100, 82, 64, 46, 28, 10
    }
    document.getElementById('speedVal').textContent = speed;
}

document.getElementById('simSpeed').addEventListener('input', (e) => {
    updateStepInterval(e.target.value);
});

function loop(timestamp) {
    if (!isRunning) return;
    if (timestamp - lastTime >= currentStepInterval) {
        step();
        lastTime = timestamp;
    }
    animationId = requestAnimationFrame(loop);
}

function updateStartButtonsUI() {
    const mainBtn = document.getElementById('btnStart');
    const floatBtn = document.getElementById('floatingStartBtn');
    
    if (isRunning) {
        mainBtn.innerHTML = '⏹ ストップ';
        mainBtn.classList.replace('primary', 'danger');
        if (floatBtn) {
            floatBtn.innerHTML = '■';
            floatBtn.classList.add('running');
        }
    } else {
        mainBtn.innerHTML = '▶ スタート';
        mainBtn.classList.replace('danger', 'primary');
        if (floatBtn) {
            floatBtn.innerHTML = '▶';
            floatBtn.classList.remove('running');
        }
    }
}

function toggleSimulation() {
    isRunning = !isRunning;
    if (isRunning) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(loop);
    } else {
        cancelAnimationFrame(animationId);
    }
    updateStartButtonsUI();
}

document.getElementById('btnStart').addEventListener('click', toggleSimulation);
document.getElementById('floatingStartBtn').addEventListener('click', toggleSimulation);

document.getElementById('btnStep').addEventListener('click', () => { if (!isRunning) step(); });
document.getElementById('btnReset').addEventListener('click', () => { if (isRunning) document.getElementById('btnStart').click(); initGrid(); });
document.getElementById('btnVolcano').addEventListener('click', () => { const s = triggerVolcanoLogic(); showLog(`🌋 ${s}な火山噴火が発生！`); updateStats(); drawGrid(); });
document.getElementById('btnWildfire').addEventListener('click', () => { triggerWildfireLogic(5, 3); showLog("🔥 大規模山火事が発生！"); updateStats(); drawGrid(); });
document.getElementById('btnTyphoon').addEventListener('click', () => { triggerTyphoonLogic(); showLog("🌀 台風が通過しました"); updateStats(); drawGrid(); });
document.querySelectorAll('input[name="viewMode"]').forEach(r => { r.addEventListener('change', (e) => { currentViewMode = e.target.value; drawGrid(); }); });

function updateHistoryUI() {
    const s = document.getElementById('historySlider');
    const d = document.getElementById('historyYearDisplay');
    if (historySnapshots.length > 0) {
        s.disabled = false; s.max = historySnapshots.length - 1;
        if (!isViewingHistory) { s.value = historySnapshots.length - 1; d.textContent = `現在（レビューなし）`; d.style.color = '#a3a3a3'; }
    }
}
function enterHistoryMode(index) {
    isRunning = false;
    updateStartButtonsUI();
    isViewingHistory = true;
    const snapshot = historySnapshots[index];
    document.getElementById('historyYearDisplay').textContent = `過去プレビュー: ${snapshot.year} 年`;
    document.getElementById('historyYearDisplay').style.color = '#3b82f6';
    document.getElementById('btnReturnPresent').disabled = false;
    drawGrid(snapshot.grid, snapshot.soilGrid);
    updateStats(snapshot.grid, snapshot.soilGrid, snapshot.year);
}
function exitHistoryMode() {
    isViewingHistory = false;
    const s = document.getElementById('historySlider');
    if (historySnapshots.length > 0) s.value = historySnapshots.length - 1;
    document.getElementById('historyYearDisplay').textContent = `現在（レビューなし）`;
    document.getElementById('historyYearDisplay').style.color = '#a3a3a3';
    document.getElementById('btnReturnPresent').disabled = true;
    drawGrid();
    updateStats();
}
document.getElementById('historySlider').addEventListener('input', (e) => enterHistoryMode(parseInt(e.target.value)));
document.getElementById('btnReturnPresent').addEventListener('click', () => exitHistoryMode());

// --- インポート / エクスポート ---
function exportPreset() {
    const params = getParams();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(params, null, 2));
    const downloadAnchorNode = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `forest_preset_${date}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importPreset(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const params = JSON.parse(e.target.result);
            Object.entries(params).forEach(([key, value]) => {
                const input = document.getElementById(key);
                if (input) {
                    input.value = value;
                    const idx = ranges.indexOf(key);
                    if (idx !== -1) {
                        const display = document.getElementById(displayIds[idx]);
                        if (display) updateDisplay(key, display, value);
                    }
                }
            });
            document.getElementById('climatePresetSelect').value = 'custom';
            initGrid();
            alert("プリセットをインポートしました！");
        } catch (err) {
            alert("JSONの読み込みに失敗しました。");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

document.getElementById('btnExportPreset').addEventListener('click', exportPreset);
document.getElementById('btnImportPreset').addEventListener('click', () => document.getElementById('importFileInput').click());
document.getElementById('importFileInput').addEventListener('change', importPreset);

function showLog(msg) {
    const logList = document.getElementById('eventLogList');
    if (!logList) return;
    const li = document.createElement('li');
    li.textContent = `[Year ${stepCount}] ${msg}`;
    logList.insertBefore(li, logList.firstChild);
    if (logList.childNodes.length > 5) logList.removeChild(logList.lastChild);
}

ranges.forEach((id, index) => {
    const input = document.getElementById(id);
    const display = document.getElementById(displayIds[index]);
    input.addEventListener('input', (e) => {
        updateDisplay(id, display, e.target.value);
        const select = document.getElementById('climatePresetSelect');
        if (select.value !== 'custom') select.value = 'custom';
    });
});
function updateDisplay(id, display, value) {
    if (['typhoonProb', 'lightningProb', 'wildfireProb', 'volcanoProb', 'shadeLifeProb', 'primarySuccessionProb'].includes(id)) display.textContent = parseFloat(value).toFixed(3);
    else if (id === 'shadeThreshold') display.textContent = value;
    else if (['primarySoilThreshold', 'secondarySoilThreshold', 'maxSoilFertility', 'typhoonRadiusBase', 'volcanoSize'].includes(id)) display.textContent = parseFloat(value).toFixed(1);
    else display.textContent = parseFloat(value).toFixed(2);
}
document.getElementById('btnResetParams').addEventListener('click', () => {
    Object.keys(DEFAULT_PARAMS).forEach(id => {
        const input = document.getElementById(id);
        const display = document.getElementById(displayIds[ranges.indexOf(id)]);
        if (input && display) { input.value = DEFAULT_PARAMS[id]; updateDisplay(id, display, DEFAULT_PARAMS[id]); }
    });
    document.getElementById('climatePresetSelect').value = 'temperate';
});

// 評価システム用の変数
let evaluationYears = 0;
let evaluationData = {
    diversity: [],
    mosaic: [],
    soil: [],
    activity: [],
    stability: []
};
let historyChart = null;
let isEvaluating = false;
let evaluationStartYear = 0;
const EVAL_PERIOD = 100;

// 評価履歴チャートの初期化
function initHistoryChart() {
    const ctx = document.getElementById('historyChart').getContext('2d');
    historyChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['植生多様性', '空間複雑性', '土壌ポテンシャル', '新陳代謝', '環境安定度'],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#334155' },
                    grid: { color: '#334155' },
                    pointLabels: { color: '#94a3b8', font: { size: 10 } },
                    ticks: { display: false, stepSize: 0.2 },
                    suggestedMin: 0,
                    suggestedMax: 1.0
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { color: '#94a3b8', boxWidth: 10, padding: 10, font: { size: 10 } }
                }
            }
        }
    });
}

// 評価のリセット
function resetEvaluation() {
    isEvaluating = false;
    evaluationYears = 0;
    evaluationData = {
        diversity: [],
        mosaic: [],
        soil: [],
        activity: [],
        stability: []
    };
    document.getElementById('eval-status').textContent = '待機中';
    document.getElementById('eval-status').className = 'status-badge';
    document.getElementById('eval-progress').style.width = '0%';
    
    const btn = document.getElementById('btnStartEval');
    if (btn) {
        btn.textContent = '📊 調査開始 (100年間)';
        btn.disabled = false;
        btn.style.background = '#3b82f6';
    }
}

// 調査の開始
function startEvaluation() {
    resetEvaluation();
    isEvaluating = true;
    evaluationStartYear = stepCount;
    document.getElementById('eval-status').textContent = `調査中 (0/${EVAL_PERIOD}年)`;
    document.getElementById('eval-status').className = 'status-badge investigative';
    
    const btn = document.getElementById('btnStartEval');
    if (btn) {
        btn.textContent = '⌛ 調査中...';
        btn.disabled = true;
        btn.style.background = '#475569';
    }
}

// 評価結果の確定
function completeEvaluation() {
    try {
        if (evaluationData.diversity.length === 0) return;
        
        const calcAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        
        const avgs = {
            diversity: calcAvg(evaluationData.diversity),
            mosaic: calcAvg(evaluationData.mosaic),
            soil: calcAvg(evaluationData.soil),
            activity: calcAvg(evaluationData.activity),
            stability: calcAvg(evaluationData.stability)
        };
        
        document.getElementById('eval-status').textContent = '評価完了';
        document.getElementById('eval-status').className = 'status-badge complete';
        
        isEvaluating = false;
        const btn = document.getElementById('btnStartEval');
        if (btn) {
            btn.textContent = '🔄 再調査を開始';
            btn.disabled = false;
            btn.style.background = '#10b981';
        }
        
        // プリセット名取得
        let presetName = "カスタム";
        const presetSelect = document.getElementById('climatePreset');
        if (presetSelect && presetSelect.selectedOptions && presetSelect.selectedOptions.length > 0) {
            presetName = presetSelect.selectedOptions[0].text;
        }
        
        const label = `${presetName} (Year ${evaluationStartYear})`;
        
        // 履歴チャートに追加 (レーダー用データセット)
        const colors = [
            { bg: 'rgba(96, 165, 250, 0.2)', border: 'rgba(96, 165, 250, 1)' },
            { bg: 'rgba(244, 114, 182, 0.2)', border: 'rgba(244, 114, 182, 1)' },
            { bg: 'rgba(52, 211, 153, 0.2)', border: 'rgba(52, 211, 153, 1)' }
        ];
        
        if (historyChart) {
            const dataIndex = historyChart.data.datasets.length % colors.length;
            const newDataset = {
                label: label,
                data: [avgs.diversity, avgs.mosaic, avgs.soil, avgs.activity, avgs.stability],
                backgroundColor: colors[dataIndex].bg,
                borderColor: colors[dataIndex].border,
                borderWidth: 2,
                pointBackgroundColor: colors[dataIndex].border
            };
            
            historyChart.data.datasets.push(newDataset);
            // 最新の3件に制限
            if (historyChart.data.datasets.length > 3) {
                historyChart.data.datasets.shift();
            }
            historyChart.update();
        }
    } catch (e) {
        console.error("Evaluation failed:", e);
        document.getElementById('eval-status').textContent = 'エラー';
    }
}

// パラメータ変更の監視設定
function setupEvaluationListeners() {
    // 自動リセットを廃止し、ボタンのみで制御
    const btn = document.getElementById('btnStartEval');
    if (btn) btn.addEventListener('click', startEvaluation);
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetEvaluation);
}

// 既存のinitに追記
const originalInit = window.onload;
window.onload = function() {
    if (originalInit) {
        try { originalInit(); } catch(e) {}
    }
    initHistoryChart();
    setupEvaluationListeners();
    resetEvaluation();
};

// step関数内に組み込むロジック
function updateEvaluation(metrics) {
    if (!isEvaluating) return;
    
    if (evaluationYears < EVAL_PERIOD) {
        evaluationYears++;
        evaluationData.diversity.push(metrics.diversity);
        evaluationData.mosaic.push(metrics.mosaic);
        evaluationData.soil.push(metrics.soil);
        evaluationData.activity.push(metrics.activity);
        evaluationData.stability.push(metrics.stability);
        
        // UI更新
        const progress = (evaluationYears / EVAL_PERIOD) * 100;
        const progressBar = document.getElementById('eval-progress');
        const statusText = document.getElementById('eval-status');
        
        if (progressBar) progressBar.style.width = progress + '%';
        if (statusText) statusText.textContent = `調査中 (${evaluationYears}/${EVAL_PERIOD}年)`;
        
        if (evaluationYears >= EVAL_PERIOD) {
            completeEvaluation();
        }
    }
}

initDiversityChart();
initGrid();

// 起動時に現在のプリセットをUIに反映させる
const initialPreset = document.getElementById('climatePresetSelect').value;
if (initialPreset) {
    applyPreset(initialPreset);
}
