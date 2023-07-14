function getSelectedOptionValue() {
  let selectSpeed = document.getElementById("mySelectSpeed");
  let selectedIndex = selectSpeed.selectedIndex;
  let selectedOption = selectSpeed.options[selectedIndex];
  let selectedValue = selectedOption.value;

  console.log("Выбранное значение: " + selectedValue);
}

function checkElementRendered() {
  // Start point
  let titleElement = document.querySelector(
    "h1.style-scope.ytd-watch-metadata"
  );
  let darkTheme = false;
  if (titleElement) {
    let tema = document.querySelector('[content="rgba(255, 255, 255, 0.98)"]');
    if (tema) {
      //   alert("WHITE");
    } else {
      //   alert("DARK");
      darkTheme = true;
    }

    // Container where we install our UI
    let containerElement = document.createElement("div");
    containerElement.classList.add("container-yt-extension");

    let mainSettingButton = document.createElement("button");
    mainSettingButton.textContent = "Setting";
    if (darkTheme) {
      mainSettingButton.classList.add("button-dark-yt-extension");
    } else {
      mainSettingButton.classList.add("button-yt-extension");
    }
    mainSettingButton.addEventListener("click", function () {
      drawSetting();
    });

    containerElement.appendChild(mainSettingButton);

    // // Check box for +
    // let checkboxInput = document.createElement("input");
    // checkboxInput.type = "checkbox";
    // checkboxInput.id = "myCheckbox";
    // checkboxInput.classList.add("checkbox-yt-extension");
    // containerElement.appendChild(checkboxInput);

    // // Added label
    // let addedLabel = document.createElement("span");
    // addedLabel.textContent = "Added!";
    // addedLabel.classList.add("added-label");
    // addedLabel.style.display = "none";
    // containerElement.appendChild(addedLabel);

    // // Event listener for checkbox change
    // checkboxInput.addEventListener("change", function () {
    //   if (this.checked) {
    //     addedLabel.style.display = "inline";
    //   } else {
    //     addedLabel.style.display = "none";
    //   }
    // });

    /* Select rec list
     *
     *
     *
     *
     *
     *
     *  Rec List
     *
     *
     *
     *
     *
     *
     *
     *
    Select rec list */

    // Select "My recommend list"
    // let selectElement = document.createElement("select");
    // selectElement.id = "mySelect";
    // selectElement.classList.add("select-yt-extension");

    // // Option "My recommend list"
    // let defaultOption = document.createElement("option");
    // defaultOption.value = "default";
    // defaultOption.textContent = "My recommend list";
    // selectElement.appendChild(defaultOption);

    // // Option "Study English"
    // let option1 = document.createElement("option");
    // option1.value = "option1";
    // option1.textContent = "Study English";
    // selectElement.appendChild(option1);

    // // Option "Add New Playlist"
    // let option_new = document.createElement("option");
    // option_new.value = "add_new_playlist";
    // option_new.textContent = "Add new playlist";
    // selectElement.appendChild(option_new);

    // // Add to container our select rec list
    // containerElement.appendChild(selectElement);

    // // Input for new option in rec list
    // let newOptionInput = document.createElement("input");
    // newOptionInput.classList.add("hide-yt-extension");
    // newOptionInput.type = "text";
    // newOptionInput.id = "newOptionInput";
    // newOptionInput.placeholder = "Enter new option";
    // containerElement.appendChild(newOptionInput);

    // // Button to add new option
    // let addOptionButton = document.createElement("button");
    // addOptionButton.classList.add("hide-yt-extension");
    // addOptionButton.textContent = "Add Option";
    // addOptionButton.classList.add("button-yt-extension");
    // addOptionButton.addEventListener("click", function () {
    //   let input = document.getElementById("newOptionInput");
    //   let value = input.value.trim();

    //   if (value !== "") {
    //     let select = document.getElementById("mySelect");
    //     let newOption = document.createElement("option");
    //     newOption.value = value;
    //     newOption.textContent = value;
    //     select.appendChild(newOption);
    //     select.value = value;
    //     input.value = "";
    //     newOptionInput.classList.add("hide-yt-extension");
    //     addOptionButton.classList.add("hide-yt-extension");
    //     select.appendChild(option_new);
    //   }
    // });
    // containerElement.appendChild(addOptionButton);

    /*
     *
     *
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
     *
     *
     */

    // Select your Speed
    let selectSpeed = document.createElement("select");
    selectSpeed.id = "mySelectSpeed";
    selectSpeed.classList.add("select-yt-extension");

    // Add to container our select speed
    containerElement.appendChild(selectSpeed);

    // Input for new speed
    let newSpeedInput = document.createElement("input");
    newSpeedInput.classList.add("hide-yt-extension");
    newSpeedInput.type = "number";
    newSpeedInput.id = "newSpeedInput";
    newSpeedInput.placeholder = "Enter new speed";
    containerElement.appendChild(newSpeedInput);

    // Button to add new option
    let addSpeedButton = document.createElement("button");
    addSpeedButton.classList.add("hide-yt-extension");
    addSpeedButton.textContent = "Add Speed";
    addSpeedButton.classList.add("button-yt-extension");
    addSpeedButton.addEventListener("click", function () {
      let input = document.getElementById("newSpeedInput");
      let value = input.value;

      if (value<=14 && value >= 0.1) {
        console.log(value)
        let select = document.getElementById("mySelectSpeed");
        let newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        select.appendChild(newOption);
        select.value = value;
        input.value = "";
        newSpeedInput.classList.add("hide-yt-extension");
        addSpeedButton.classList.add("hide-yt-extension");
        setSpeedCustom(value)

        if (value >= 1) {
          const arr = JSON.parse(localStorage.getItem("speed")) || [];

          arr.push(+value);
          arr.sort(function (a, b) {
            return b - a;
          });
          localStorage.setItem("speed", JSON.stringify(arr));
          drawNewSelect();
        } else {
          const arr = JSON.parse(localStorage.getItem("lowSpeed")) || [];

          arr.push(+value);
          arr.sort(function (a, b) {
            return a - b;
          });
          localStorage.setItem("lowSpeed", JSON.stringify(arr));
          drawNewSelect();
        }
      } else alert("Incorrect value");
    });

    containerElement.appendChild(addSpeedButton);

    function drawNewSelect() {
      // Получаем текущие значения скорости из localStorage
      const speedData = localStorage.getItem("speed");
      const lowSpeedData = localStorage.getItem("lowSpeed");

      // Проверяем наличие значения скорости
      if (speedData) {
        try {
          // Пытаемся преобразовать данные в массив
          const speedArray = JSON.parse(speedData);

          // Проверяем, содержит ли массив начальные значения
          if (speedArray) {
            // Очищаем selectSpeed от предыдущих элементов
            selectSpeed.innerHTML = "";

            // Создаем и добавляем элементы option в selectSpeed
            speedArray.forEach((speed) => {
              const option = document.createElement("option");
              option.value = speed;
              option.textContent = speed;
              selectSpeed.appendChild(option);
            });
          } else {
            console.log("Начальные значения не установлены или некорректны.");
          }
        } catch (error) {
          console.error("Ошибка при разборе данных из localStorage:", error);
        }
      } else {
        console.log("Начальные значения еще не установлены.");
      }

      if (lowSpeedData) {
        try {
          // Пытаемся преобразовать данные в массив
          const speedArray = JSON.parse(lowSpeedData);

          // Проверяем, содержит ли массив начальные значения
          if (speedArray) {
            // Создаем и добавляем элементы option в selectSpeed
            speedArray.forEach((speed) => {
              const option = document.createElement("option");
              option.value = speed;
              option.textContent = speed;
              selectSpeed.appendChild(option);
            });

            console.log("Начальные значения уже установлены.");
          } else {
            console.log("Начальные значения не установлены или некорректны.");
          }
        } catch (error) {
          console.error("Ошибка при разборе данных из localStorage:", error);
        }
      } else {
        console.log("Начальные значения еще не установлены.");
      }

      let customSpeed = document.createElement("option");
      customSpeed.value = "customSpeed";
      customSpeed.textContent = "Set custom Speed";
      selectSpeed.appendChild(customSpeed);
    }
    drawNewSelect();

    // Выбираем option со значением "1" при первой загрузке страницы
    selectSpeed.value = "1";
    let selectedOption = selectSpeed.querySelector(
      `option[value="${selectSpeed.value}"]`
    );
    selectedOption.selected = true;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // create btn
    let customButton = document.createElement("button");
    customButton.textContent = "1x";
    if (darkTheme) {
      customButton.classList.add("button-dark-yt-extension");
    } else {
      customButton.classList.add("button-yt-extension");
    }
    customButton.addEventListener("click", function () {
      setSpeedCustom(1);
    });
    containerElement.appendChild(customButton);

    let additionalButton = document.createElement("button");
    additionalButton.textContent = "2x";
    additionalButton.classList.add("button-yt-extension");
    if (darkTheme) {
      additionalButton.classList.add("button-dark-yt-extension");
    } else {
      additionalButton.classList.add("button-yt-extension");
    }
    additionalButton.addEventListener("click", function () {
      setSpeedCustom(2);
    });
    containerElement.appendChild(additionalButton);

    // Insert our custom container
    titleElement.insertAdjacentElement("afterend", containerElement);

    // Event listener for selectElement change
    // selectElement.addEventListener("change", function () {
    //   if (this.value === "add_new_playlist") {
    //     newOptionInput.classList.remove("hide-yt-extension");
    //     addOptionButton.classList.remove("hide-yt-extension");
    //   } else {
    //     newOptionInput.classList.add("hide-yt-extension");
    //     addOptionButton.classList.add("hide-yt-extension");
    //   }
    // });
    // Event listener for selectSpeed change
    selectSpeed.addEventListener("change", function () {
      if (this.value === "customSpeed") {
        newSpeedInput.classList.remove("hide-yt-extension");
        addSpeedButton.classList.remove("hide-yt-extension");
      } else {
        setSpeedCustom(this.value);

        newSpeedInput.classList.add("hide-yt-extension");
        addSpeedButton.classList.add("hide-yt-extension");
      }
    });

    getSelectedOptionValue();
  } else {
    // Элемент еще не отрисован, запросите следующую анимацию перед перерисовкой
    requestAnimationFrame(checkElementRendered);
  }
}

// Запускаем проверку отрисовки элемента
requestAnimationFrame(checkElementRendered);
