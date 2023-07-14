document.addEventListener("DOMContentLoaded", function() {
    // Получаем фоновую страницу расширения
    chrome.extension.getBackgroundPage(function(backgroundPage) {
      // Получаем значения из localStorage
      const speedData = backgroundPage.localStorage.getItem("speed");
      const lowSpeedData = backgroundPage.localStorage.getItem("lowSpeed");
    
      // Создаем элементы для вывода значений
      const speedContainer = document.createElement("div");
      const lowSpeedContainer = document.createElement("div");
    
      // Проверяем наличие значений и выводим их
      if (speedData) {
        const speedArray = JSON.parse(speedData);
        speedContainer.textContent = "Speed: " + speedArray.join(", ");
      } else {
        speedContainer.textContent = "Speed: No data";
      }
    
      if (lowSpeedData) {
        const lowSpeedArray = JSON.parse(lowSpeedData);
        lowSpeedContainer.textContent = "Low Speed: " + lowSpeedArray.join(", ");
      } else {
        lowSpeedContainer.textContent = "Low Speed: No data";
      }
    
      // Добавляем элементы на страницу
      document.body.appendChild(speedContainer);
      document.body.appendChild(lowSpeedContainer);
    });
  });
  