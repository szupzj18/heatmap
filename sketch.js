let cellW = 20;  // 每个矩形的宽度
let cellH = 20;  // 每个矩形的高度
let rows = 7;    // 行数，例如代表一周
let cols = 12;   // 列数，可以代表连续的周数

// 当前数据和目标数据数组，每个元素代表该单元格的数值（例如提交次数）
let currentData = [];
let targetData = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 初始化当前数据和目标数据
  for (let i = 0; i < rows * cols; i++) {
    let initial = floor(random(0, 11));
    currentData.push(initial);
    targetData.push(floor(random(0, 11)));
  }
  
  // 控制帧率以便观察渐变效果
  frameRate(60);
}

function draw() {
  background(255);
  
  // 更新每个单元格的数据，使用 lerp 平滑过渡
  for (let i = 0; i < currentData.length; i++) {
    currentData[i] = lerp(currentData[i], targetData[i], 0.05);
    
    // 当当前值与目标值接近时，重新设置一个新的随机目标值
    if (abs(currentData[i] - targetData[i]) < 0.1) {
      targetData[i] = floor(random(0, 11));
    }
  }
  
  drawHeatmap();
}

function drawHeatmap() {
  // 遍历每个单元格
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index = i * cols + j;
      // 为了更直观显示渐变效果，将当前值取整数
      let count = round(currentData[index]);
      
      // 根据提交次数映射颜色强度：此处 0 对应浅色，10 对应深色
      let intensity = map(count, 0, 10, 50, 255);
      fill(0, 200, 50, intensity);
      stroke(200);
      
      // 计算绘制位置，加上边距50
      let x = j * cellW + 50;
      let y = i * cellH + 50;
      rect(x, y, cellW, cellH);
    }
  }
}

// 当窗口尺寸发生变化时，调整画布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
