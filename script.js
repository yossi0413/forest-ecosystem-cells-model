// script.js
// climatePresets は index.html で先に読み込まれた climate_presets.js から提供されます

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
const ranges = ['sunSeedProb', 'shadeSeedProb', 'shadeThreshold', 'shadeStressProb', 'sunLifeProb', 'shadeLifeProb', 'typhoonProb', 'lightningProb', 'wildfireProb', 'volcanoProb', 'fireSpreadProb', 'soilDiffusionRate', 'treeSoilConsumption', 'deadTreeSoilGain', 'deadTreeDecompProb', 'ashSoilGain', 'rockWeatheringRate', 'primarySuccessionProb', 'richSoilBoost', 'primarySoilThreshold', 'secondarySoilThreshold', 'maxSoilFertility', 'ashSettleProb', 'rockToSoilThreshold', 'typhoonRadiusBase'];
const displayIds = ['sunSeedVal', 'shadeSeedVal', 'shadeThreshVal', 'shadeStressVal', 'sunLifeVal', 'shadeLifeVal', 'typhoonProbVal', 'lightningProbVal', 'wildfireProbVal', 'volcanoProbVal', 'fireSpreadVal', 'soilDiffusionRateVal', 'treeSoilConsumptionVal', 'deadTreeSoilGainVal', 'deadTreeDecompProbVal', 'ashSoilGainVal', 'rockWeatheringRateVal', 'primarySuccessionProbVal', 'richSoilBoostVal', 'primarySoilThresholdVal', 'secondarySoilThresholdVal', 'maxSoilFertilityVal', 'ashSettleProbVal', 'rockToSoilThresholdVal', 'typhoonRadiusBaseVal'];

const SOIL_COLORS = {
    '0-20': '#3b82f6',
    '20-40': '#06b6d4',
    '40-60': '#10b981',
    '60-80': '#facc15',
    '80-100': '#ef4444'
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
    typhoonRadiusBase: 4.0
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
    typhoonRadiusBase: parseFloat(document.getElementById('typhoonRadiusBase').value)
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
                    else if (['shadeThreshold','primarySoilThreshold','secondarySoilThreshold','maxSoilFertility','typhoonRadiusBase'].includes(key))
                        display.textContent = parseFloat(value).toFixed(1);
                    else
                        display.textContent = parseFloat(value).toFixed(2);
                }
            }
        }
    });
    // After updating UI, reset simulation to apply new parameters
    initGrid();
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
let currentYearChangeRate = 0; // その年の変化率を保持
let chartLabels = [];
let chartDataSpatial = [];
let chartDataChange = [];
let chartDataCombined = [];

function initGrid() {
    if (isViewingHistory) exitHistoryMode();

    grid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(STATE.EMPTY));
    nextGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(STATE.EMPTY));
    soilGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(20.0));
    nextSoilGrid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(20.0));

    stepCount = 0;
    historySnapshots = [];
    updateHistoryUI();

    const logList = document.getElementById('eventLogList');
    if (logList) logList.innerHTML = '';

    // グラフデータのリセット
    currentYearChangeRate = 0;
    chartLabels.length = 0;
    chartDataSpatial.length = 0;
    chartDataChange.length = 0;
    chartDataCombined.length = 0;
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
                {
                    label: '総合活力',
                    data: chartDataCombined,
                    borderColor: '#60a5fa',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    yAxisID: 'y'
                },
                {
                    label: '空間多様性',
                    data: chartDataSpatial,
                    borderColor: '#4ade80',
                    borderWidth: 1.5,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: '変化率',
                    data: chartDataChange,
                    borderColor: '#f87171',
                    borderWidth: 1.5,
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
            layout: {
                padding: { left: 5, right: 20, top: 25, bottom: 5 }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#d4d4d8', boxWidth: 10, font: { size: 10 }, padding: 15 }
                },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: {
                    ticks: { color: '#71717a', maxTicksLimit: 10 },
                    grid: { color: '#3f3f46', display: false }
                },
                y: {
                    min: 0,
                    max: 1.0,
                    ticks: {
                        color: '#a1a1aa',
                        stepSize: 0.2,
                        autoSkip: false,
                        includeBounds: true,
                        callback: function (value) { return value.toFixed(1); }
                    },
                    grid: { color: '#3f3f46' }
                }
            }
        }
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
    } else {
        const ratio = Math.min((val - 75.0) / 25.0, 1.0);
        r = 255; g = Math.floor(255 - ratio * 255); b = 0;
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
}

function updateStats(targetGrid = grid, targetSoilGrid = soilGrid, targetYear = stepCount) {
    document.getElementById('stepCount').textContent = targetYear;
    let totalSoil = 0;
    const totalCells = GRID_SIZE * GRID_SIZE;
    let soilDistribution = { '0-20': 0, '20-40': 0, '40-60': 0, '60-80': 0, '80-100': 0 };
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
            else soilDistribution['80-100']++;
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

    // --- 生物多様性スコアの計算 ---

    // 1. 空間多様性 (重み付け + シャノン指数)
    const weights = {
        [STATE.SHADE_TREE]: 1.0,   // 陰樹
        [STATE.SUN_TREE]: 0.8,     // 陽樹
        [STATE.DEAD_TREE]: 0.4,    // 枯れ木
        [STATE.ASH]: 0.2,          // 灰
        [STATE.EMPTY]: 0.1,        // 空き地
        [STATE.ROCK]: 0.05,        // 岩
        [STATE.BURNING]: 0.0,
        [STATE.LAVA]: 0.0
    };

    let entropy = 0;
    Object.keys(stateCounts).forEach(state => {
        const count = stateCounts[state];
        const p = count / totalCells;
        if (count > 0) {
            entropy -= p * Math.log(p);
        }
    });

    // 2. 土壌の質を加味した重み付けの計算
    let weightedSum = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const soil = targetSoilGrid[y][x];
            const state = targetGrid[y][x];
            // そのマスの土壌が豊かであるほど、そのマスの価値を高く評価する（最大2倍の開き）
            const soilFactor = 0.5 + (soil / 100); 
            weightedSum += (weights[state] || 0) * soilFactor;
        }
    }
    weightedSum /= totalCells; // 平均化
    weightedSum = Math.min(1.0, weightedSum); // 1.0でキャップ

    const maxEntropy = Math.log(8);
    const spatialDiversity = (entropy / maxEntropy) * weightedSum;

    // 3. 総合活力スコア
    // 倍率によるブーストを廃止し、より素直な指標に調整
    const combinedScore = Math.min(1.0, spatialDiversity * (1.0 + currentYearChangeRate));

    // --- グラフの更新 (毎年更新、20年分保持) ---
    if (!isViewingHistory && diversityChart) {
        if (chartLabels.length === 0 || chartLabels[chartLabels.length - 1] !== targetYear) {
            chartLabels.push(targetYear);
            chartDataSpatial.push(spatialDiversity);
            chartDataChange.push(currentYearChangeRate); // 生の値を採用
            chartDataCombined.push(combinedScore);

            if (chartLabels.length > MAX_CHART_HISTORY) {
                chartLabels.shift();
                chartDataSpatial.shift();
                chartDataChange.shift();
                chartDataCombined.shift();
            }
            diversityChart.update();
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
    const centerX = Math.floor(Math.random() * GRID_SIZE);
    const centerY = Math.floor(Math.random() * GRID_SIZE);
    const radius = 5 + Math.random() * 10;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            if (dist < radius) {
                grid[y][x] = STATE.LAVA;
                soilGrid[y][x] = 0;
            }
        }
    }
    return radius > 10 ? "巨大" : "中規模";
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

    let cellsChanged = 0;
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x] !== nextGrid[y][x]) cellsChanged++;
            grid[y][x] = nextGrid[y][x];
            soilGrid[y][x] = nextSoilGrid[y][x];
        }
    }
    // 変化率の記録 (毎年記録)
    currentYearChangeRate = cellsChanged / (GRID_SIZE * GRID_SIZE);

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

document.getElementById('btnStart').addEventListener('click', (e) => {
    isRunning = !isRunning;
    const btn = e.target;
    if (isRunning) {
        btn.innerHTML = '⏹ ストップ'; btn.classList.replace('primary', 'danger');
        lastTime = performance.now(); animationId = requestAnimationFrame(loop);
    } else {
        btn.innerHTML = '▶ スタート'; btn.classList.replace('danger', 'primary');
        cancelAnimationFrame(animationId);
    }
});

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
    document.getElementById('btnStart').innerHTML = '▶ スタート';
    document.getElementById('btnStart').classList.replace('danger', 'primary');
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
    input.addEventListener('input', (e) => updateDisplay(id, display, e.target.value));
});
function updateDisplay(id, display, value) {
    if (['typhoonProb', 'lightningProb', 'wildfireProb', 'volcanoProb', 'shadeLifeProb', 'primarySuccessionProb'].includes(id)) display.textContent = parseFloat(value).toFixed(3);
    else if (id === 'shadeThreshold') display.textContent = value;
    else if (['primarySoilThreshold', 'secondarySoilThreshold', 'maxSoilFertility', 'typhoonRadiusBase'].includes(id)) display.textContent = parseFloat(value).toFixed(1);
    else display.textContent = parseFloat(value).toFixed(2);
}
document.getElementById('btnResetParams').addEventListener('click', () => {
    Object.keys(DEFAULT_PARAMS).forEach(id => {
        const input = document.getElementById(id);
        const display = document.getElementById(displayIds[ranges.indexOf(id)]);
        if (input && display) { input.value = DEFAULT_PARAMS[id]; updateDisplay(id, display, DEFAULT_PARAMS[id]); }
    });
});

initDiversityChart();
initGrid();

// 起動時に現在のプリセットをUIに反映させる
const initialPreset = document.getElementById('climatePresetSelect').value;
if (initialPreset) {
    applyPreset(initialPreset);
}
