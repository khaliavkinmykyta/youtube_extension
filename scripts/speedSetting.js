/* Set default value speed
     *
     *
     *
     *
     *
     *
     *  Speed
     *
     *
     *
     *
     *
     *
     *
     *
     Set default value speed */
function setDefaultSpeed() {
  if (localStorage.getItem("speed") == null) {
    localStorage.setItem("speed", JSON.stringify([2, 1.5, 1]));
  }

  if (localStorage.getItem("lowSpeed") == null) {
    localStorage.setItem("lowSpeed", JSON.stringify([0.5]));
  }
}

setDefaultSpeed();

/* Set default value speed
     *
     *
     *
     *
     *
     *
     *  Speed
     *
     *
     *
     *
     *
     *
     *
     *
     Set default value speed */
function drawSetting() {
    let darkTheme = false;
  let tema = document.querySelector('[content="rgba(255, 255, 255, 0.98)"]');
  if (tema) {
    //   alert("WHITE");
  } else {
    //   alert("DARK");
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
    if (darkTheme) {
      deleteButton.classList.add("button-dark-yt-extension");
    } else {
      deleteButton.classList.add("button-yt-extension");
    }

    deleteButton.addEventListener("click", function () {
      removeSpeed(speed);
      closeButton.remove();
      drawSetting();
    });

    speedItem.appendChild(deleteButton);

    settingContainer.appendChild(speedItem);
  });

  // Создаем элементы для каждого значения низкой скорости
  lowSpeedArray.forEach((lowSpeed) => {
    let lowSpeedItem = document.createElement("div");
    lowSpeedItem.textContent = "Low Speed: " + lowSpeed;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    if (darkTheme) {
      deleteButton.classList.add("button-dark-yt-extension");
    } else {
      deleteButton.classList.add("button-yt-extension");
    }
    deleteButton.addEventListener("click", function () {
      removeLowSpeed(lowSpeed);
      drawSetting();
    });

    lowSpeedItem.appendChild(deleteButton);

    settingContainer.appendChild(lowSpeedItem);
  });

  // Добавляем новый контейнер в родительский элемент
  parentDiv.appendChild(settingContainer);

  // Кнопка "Закрыть"
  let closeButton = document.createElement("button");
  closeButton.textContent = "Закрыть";
  if (darkTheme) {
    closeButton.classList.add("button-dark-yt-extension");
  } else {
    closeButton.classList.add("button-yt-extension");
  }
  closeButton.addEventListener("click", function () {
    settingContainer.remove();
    closeButton.remove();
  });

  parentDiv.appendChild(closeButton);
}

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
