//First default speed
function setDefaultSpeed() {
  if (localStorage.getItem("speed") == null) {
    localStorage.setItem("speed", JSON.stringify([2, 1.5, 1]));
    localStorage.setItem("favorite", 2);
  }

  if (localStorage.getItem("lowSpeed") == null) {
    localStorage.setItem("lowSpeed", JSON.stringify([0.5]));
  }
}
setDefaultSpeed();

function drawSetting() {
  let darkTheme = false;
  let tema = document.querySelector('[content="rgba(255, 255, 255, 0.98)"]');
  if (!tema) {
    darkTheme = true;
  }

  let parentDiv = document.getElementsByClassName("container-yt-extension")[0];

  // Удаляем предыдущий контейнер со значениями, если он существует
  let existingContainer = document.getElementById("settingContainer");
  if (existingContainer) {
    existingContainer.remove();
  }

  // Создаем новый контейнер
  let settingContainer = document.createElement("div");

  settingContainer.id = "settingContainer";

  // Получаем значения из localStorage
  let speedData = localStorage.getItem("speed");
  let lowSpeedData = localStorage.getItem("lowSpeed");
  let favSpeed = localStorage.getItem("favorite");

  // Парсим значения из строки JSON
  let speedArray = speedData ? JSON.parse(speedData) : [];
  let lowSpeedArray = lowSpeedData ? JSON.parse(lowSpeedData) : [];

  // Создаем элементы для каждого значения скорости
  speedArray.forEach((speed) => {
    let speedItem = document.createElement("div");
    speedItem.classList.add("speedItem");

    speedItem.textContent = "Speed: " + speed + "\u00A0\u00A0\u00A0";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    let favButton = document.createElement("button");
    favButton.textContent = "Favorite";
    favButton.dataset.value = speed;

    if (darkTheme) {
      deleteButton.classList.add("button-dark-yt-extension");
      favButton.classList.add("button-dark-yt-extension");
    } else {
      deleteButton.classList.add("button-yt-extension");
      favButton.classList.add("button-yt-extension");

    }

    deleteButton.addEventListener("click", function () {
      removeSpeed(speed);
      closeButton.remove();
      drawSetting();
    });
    favButton.addEventListener("click", function () {
      localStorage.setItem("favorite", speed);
      closeButton.remove();
      drawSetting();
      rerenderAdditionalButton();
    });

    speedItem.appendChild(deleteButton);
    speedItem.appendChild(favButton);
    //favorite
    if (favSpeed == speed) {
      speedItem.classList.add("favItem");
    }
    settingContainer.appendChild(speedItem);
  });

  // Создаем элементы для каждого значения низкой скорости
  lowSpeedArray.forEach((lowSpeed) => {
    let lowSpeedItem = document.createElement("div");
    lowSpeedItem.classList.add("speedItem");

    lowSpeedItem.textContent = "Low Speed: " + lowSpeed;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    let favButton = document.createElement("button");
    favButton.textContent = "Favorite";
    if (darkTheme) {
      deleteButton.classList.add("button-dark-yt-extension");
      favButton.classList.add("button-dark-yt-extension");
    } else {
      deleteButton.classList.add("button-yt-extension");
      favButton.classList.add("button-yt-extension");

    }
    deleteButton.addEventListener("click", function () {
      removeLowSpeed(lowSpeed);
      drawSetting();
    });

    favButton.addEventListener("click", function () {
      localStorage.setItem("favorite", lowSpeed);
      closeButton.remove();
      drawSetting();
      rerenderAdditionalButton();

    });

    lowSpeedItem.appendChild(deleteButton);
    lowSpeedItem.appendChild(favButton);
    if (favSpeed == lowSpeed) {
      lowSpeedItem.classList.add("favItem");
    }

    settingContainer.appendChild(lowSpeedItem);
  });

  // Добавляем новый контейнер в родительский элемент
  parentDiv.appendChild(settingContainer);

  //Close setting
  let closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  if (darkTheme) {
    closeButton.classList.add("button-close-dark-yt-extension");
  } else {
    closeButton.classList.add("button-close-yt-extension");
  }
  closeButton.addEventListener("click", function () {
    settingContainer.remove();
    closeButton.remove();
  });

  settingContainer.appendChild(closeButton);
}

//Remove Spped
function removeSpeed(speed) {
  let speedData = localStorage.getItem("speed");
  if (speedData) {
    let speedArray = JSON.parse(speedData);
    let index = speedArray.indexOf(speed);
    if (index > -1 && speed !== 1) {
      speedArray.splice(index, 1);
      localStorage.setItem("speed", JSON.stringify(speedArray));
    }
  }
}

function removeLowSpeed(lowSpeed) {
  let lowSpeedData = localStorage.getItem("lowSpeed");
  if (lowSpeedData) {
    let lowSpeedArray = JSON.parse(lowSpeedData);
    let index = lowSpeedArray.indexOf(lowSpeed);
    if (index > -1) {
      lowSpeedArray.splice(index, 1);
      localStorage.setItem("lowSpeed", JSON.stringify(lowSpeedArray));
    }
  }
}

function rerenderAdditionalButton() {
    let favorite = localStorage.getItem('favorite')
    let additionalButton = document.getElementById('additionalButton')
    
    additionalButton.textContent = favorite + 'x';
}