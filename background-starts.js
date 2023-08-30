const parallaxContainer = document.getElementById('parallaxBg');

let SCREEN_W = parallaxContainer.clientWidth;
let SCREEN_H = parallaxContainer.clientHeight;

let dotsArrayBySize = {};

const speedMove = 1;

// let dotsAmount = 1;

const spaceDotsLayers = [
  {
    width: 4,
    height: 4,
    speedMove: 0.6,
    dotAmountMultiplier: 10,
  },
  {
    width: 2.8,
    height: 2.8,
    speedMove: 0.4,
    dotAmountMultiplier: 4,
  },
  {
    width: 1.2,
    height: 1.2,
    speedMove: 0.15,
    dotAmountMultiplier: 10,
  },
];

let dotsAmount = 1; // Initialize dotsAmount before using it

window.onload = () => {
  setScreenSize();
  setDots();

  const framesPerSecond = 50;
  setInterval(updateItems, 1000 / framesPerSecond);
};

const updateItems = () => {
  updateDotsMove();
};

const setDots = () => {
  spaceDotsLayers.forEach((layerInfo) => {
    const layer = document.createElement('div');
    layer.className = 'parallax-layer layer1';
    parallaxContainer.appendChild(layer);

    dotsAmount = dotsAmount * layerInfo.dotAmountMultiplier;

    for (let eachDot = 0; eachDot < dotsAmount; eachDot++) {
      const itemSpaceDot = document.createElement('div');
      itemSpaceDot.className = 'space-dot';
      layer.appendChild(itemSpaceDot);

      itemSpaceDot.style.height = layerInfo.height + 'px';
      itemSpaceDot.style.width = layerInfo.width + 'px';
      itemSpaceDot.style.background = '#fff';
      itemSpaceDot.style.position = 'absolute';
      itemSpaceDot.style.top = Math.round(Math.random() * SCREEN_H) + 'px';
      itemSpaceDot.style.left = Math.round(Math.random() * SCREEN_W) + 'px';
      itemSpaceDot.style.borderRadius = '50%';

      const dotSize = `${layerInfo.width}x${layerInfo.height}`;
      if (!dotsArrayBySize[dotSize]) {
        dotsArrayBySize[dotSize] = [];
      }
      dotsArrayBySize[dotSize].push(itemSpaceDot);
    }
  });
};

const updateDotsMove = () => {
  for (let dotSize in dotsArrayBySize) {
    const itemArrays = dotsArrayBySize[dotSize];
    itemArrays.forEach((item) => {
      currentVal = item.style.top;
      updateTopVal = currentVal.replace('px', '') * 1;

      const layerIndex = spaceDotsLayers.findIndex(
        (layerInfo) => `${layerInfo.width}x${layerInfo.height}` === dotSize
      );

      const layerSpeed = spaceDotsLayers[layerIndex].speedMove;
      item.style.top = `${updateTopVal - speedMove * layerSpeed}px`;

      if (updateTopVal < 0) {
        item.style.top = SCREEN_H + 10 + 'px';
        item.style.left = Math.round(Math.random() * SCREEN_W) + 'px';
      }
    });
  }
};

const setScreenSize = () => {
  SCREEN_W = parallaxContainer.clientWidth; // Update SCREEN_W on window resize
  SCREEN_H = parallaxContainer.clientHeight; // Update SCREEN_H on window resize
};

const handleResize = () => {
  setScreenSize();
};

window.addEventListener('resize', handleResize);
