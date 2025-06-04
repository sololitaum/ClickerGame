// Game state - stores all game variables
const gameState = {
    coins: 0,
    cupcakesPerClick: 1,
    clickMultiplier: 1,
    autoBakers: 0,
    clickCount: 0,
    // Starting costs for upgrades
    clickUpgradeCost: 10,
    autoUpgradeCost: 50,
    multiplierUpgradeCost: 100
  };
  
  // Cupcake  that will change as player progresses
  const cupcakeImages = [
    'cupcake1.jpg',
    'cupcake2.jpg', 
    'cupcake3.jpg'
  ];
  let currentImageIndex = 0;
  
 //These grab the elements from the HTML code
  const coinDisplay = document.getElementById('coins');
  const cupcakesPerClickDisplay = document.getElementById('cupcakes-per-click');
  const autoBakersDisplay = document.getElementById('auto-bakers');
  const autoProductionDisplay = document.getElementById('auto-production');
  const cupcakeButton = document.getElementById('cupcake-btn');
  const cupcakeImage = cupcakeButton.querySelector('.cupcake-img');
  
  // Upgrade buttons
  const clickUpgradeBtn = document.getElementById('upgrade-click');
  const autoUpgradeBtn = document.getElementById('upgrade-auto');
  const multiplierUpgradeBtn = document.getElementById('upgrade-multiplier');
  
  // ===== CORE GAME FUNCTIONS =====
  
  // Main function to click the cupcake
  function clickCupcake() {
    // Calculate coins earned per click
    const coinsEarned = gameState.cupcakesPerClick * gameState.clickMultiplier;
    
    // Add coins to total
    gameState.coins += coinsEarned;
    
    // Count this click
    gameState.clickCount++;
    
    // Show floating coin animation
    showFloatingCoins(coinsEarned);
    
    // Check if cupcake image should upgrade
    checkCupcakeUpgrade();
    
    // Update displays
    updateAllDisplays();
  }
  
  // Auto-production from bakers
  function runAutoBakers() {
    if (gameState.autoBakers > 0) {
      // Calculate production from auto bakers
      const production = gameState.autoBakers * gameState.clickMultiplier;
      gameState.coins += production;
      updateAllDisplays();
    }
  }
  
  // ===== UPGRADE FUNCTIONS =====
  
  // Upgrade click power (Better Mixer)
  function upgradeClickPower() {
    if (gameState.coins >= gameState.clickUpgradeCost) {
      // Pay for the upgrade
      gameState.coins -= gameState.clickUpgradeCost;
      
      // Improve click power
      gameState.cupcakesPerClick += 1;
      
      // Make next upgrade more expensive
      gameState.clickUpgradeCost = Math.floor(gameState.clickUpgradeCost * 1.5);
      
      // Update displays
      updateAllDisplays();
    }
  }
  
  // Hire auto baker
  function hireAutoBaker() {
    if (gameState.coins >= gameState.autoUpgradeCost) {
      // Pay for the baker
      gameState.coins -= gameState.autoUpgradeCost;
      
      // Add a baker
      gameState.autoBakers += 1;
      
      // Make next baker more expensive
      gameState.autoUpgradeCost = Math.floor(gameState.autoUpgradeCost * 1.5);
      
      // Update displays
      updateAllDisplays();
    }
  }
  
  // Upgrade multiplier (Fancy Frosting)
  function upgradeMultiplier() {
    if (gameState.coins >= gameState.multiplierUpgradeCost) {
      // Pay for the upgrade
      gameState.coins -= gameState.multiplierUpgradeCost;
      
      // Double the multiplier
      gameState.clickMultiplier *= 2;
      
      // Make next multiplier more expensive
      gameState.multiplierUpgradeCost = Math.floor(gameState.multiplierUpgradeCost * 2);
      
      // Update displays
      updateAllDisplays();
    }
  }
  
  // ===== VISUAL EFFECTS =====
  
  // Create floating coin animation
  function showFloatingCoins(amount) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = `+${amount}`;
    
    // Position randomly near the cupcake
    popup.style.left = `${Math.random() * 100 + 220}px`;
    popup.style.top = `${Math.random() * 50 + 250}px`;
    
    // Add to document
    document.body.appendChild(popup);
    
    // Remove after animation completes
    setTimeout(() => document.body.removeChild(popup), 1000);
  }
  
  // Check if cupcake should upgrade based on clicks
  function checkCupcakeUpgrade() {
    // Upgrade at 50 clicks
    if (gameState.clickCount === 50 && currentImageIndex === 0) {
      cupcakeImage.src = cupcakeImages[1];
      currentImageIndex = 1;
    } 
    // Upgrade at 200 clicks
    else if (gameState.clickCount === 200 && currentImageIndex === 1) {
      cupcakeImage.src = cupcakeImages[2];
      currentImageIndex = 2;
    }
  }
  
  // ===== UPDATE DISPLAYS =====
  
  // Update all game displays
  function updateAllDisplays() {
    // Update stats
    coinDisplay.textContent = Math.floor(gameState.coins);
    cupcakesPerClickDisplay.textContent = gameState.cupcakesPerClick * gameState.clickMultiplier;
    autoBakersDisplay.textContent = gameState.autoBakers;
    autoProductionDisplay.textContent = gameState.autoBakers * gameState.clickMultiplier;
    
    // Update upgrade buttons
    updateUpgradeButton(clickUpgradeBtn, gameState.clickUpgradeCost);
    updateUpgradeButton(autoUpgradeBtn, gameState.autoUpgradeCost);
    updateUpgradeButton(multiplierUpgradeBtn, gameState.multiplierUpgradeCost);
  }
  
  // Update a single upgrade button
  function updateUpgradeButton(button, cost) {
    // Disable button if can't afford
    button.disabled = gameState.coins < cost;
    
    // Update cost display
    button.querySelector('.upgrade-cost').textContent = `${cost} coins`;
  }
  
  // ===== EVENT LISTENERS =====
  
  // Click the cupcake
  cupcakeButton.addEventListener('click', clickCupcake);
  
  // Upgrade buttons
  clickUpgradeBtn.addEventListener('click', upgradeClickPower);
  autoUpgradeBtn.addEventListener('click', hireAutoBaker);
  multiplierUpgradeBtn.addEventListener('click', upgradeMultiplier);
  
  // Auto production every second
  setInterval(runAutoBakers, 1000);
  
  // Initialize game
  updateAllDisplays();