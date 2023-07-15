// Check YT rendering
function checkElementRendered() {
  // Start point
  let titleElement = document.querySelector(
    "h1.style-scope.ytd-watch-metadata"
  );
  //Check do we have Dark Theme or Not
  let darkTheme = false;
  if (titleElement) {
    let tema = document.querySelector('[content="rgba(255, 255, 255, 0.98)"]');
    if (!tema) {
      darkTheme = true;
    }

    // Container where we install our UI
    let containerElement = document.createElement("div");
    containerElement.classList.add("container-yt-extension");

    let mainSettingButton = document.createElement("img");
    mainSettingButton.classList.add('img-setting')
    if (darkTheme) {
        mainSettingButton.src = "https://cdn2.iconfinder.com/data/icons/tools-flat-v-1-free/129/wrench_tools_-512.png";
      } else {
        mainSettingButton.src = "https://cdn2.iconfinder.com/data/icons/tools-flat-v-1-free/129/wrench_tools_-512.png";
      }
    

    if (darkTheme) {
      mainSettingButton.classList.add("button-dark-yt-extension");
    } else {
      mainSettingButton.classList.add("button-yt-extension");
    }
    mainSettingButton.addEventListener("click", function () {
      drawSetting();
    });

    containerElement.appendChild(mainSettingButton);

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
    if (darkTheme) {
      addSpeedButton.classList.add("button-dark-yt-extension");
    } else {
      addSpeedButton.classList.add("button-yt-extension");
    }
    addSpeedButton.addEventListener("click", function () {
      let input = document.getElementById("newSpeedInput");
      let value = input.value;

      if (value <= 14 && value >= 0.1) {
        console.log(value);
        let select = document.getElementById("mySelectSpeed");
        let newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        select.appendChild(newOption);
        select.value = value;
        input.value = "";
        newSpeedInput.classList.add("hide-yt-extension");
        addSpeedButton.classList.add("hide-yt-extension");
        setSpeedCustom(value);

        if (value >= 1) {
          const arr = JSON.parse(localStorage.getItem("speed")) || [];

          arr.push(+value);
          arr.sort(function (a, b) {
            return b - a;
          });
          localStorage.setItem("speed", JSON.stringify(arr));
          drawNewSelect();

          // Устанавливаем значение select равным только что добавленному значению
          select.value = value;
        } else {
          const arr = JSON.parse(localStorage.getItem("lowSpeed")) || [];

          arr.push(+value);
          arr.sort(function (a, b) {
            return a - b;
          });
          localStorage.setItem("lowSpeed", JSON.stringify(arr));
          drawNewSelect();

          // Устанавливаем значение select равным только что добавленному значению
          select.value = value;
        }
      } else alert("Incorrect value");
    });

    containerElement.appendChild(addSpeedButton);

    function drawNewSelect() {
      //Current speed from localStorage
      const speedData = localStorage.getItem("speed");
      const lowSpeedData = localStorage.getItem("lowSpeed");

      if (speedData) {
        try {
          const speedArray = JSON.parse(speedData);

          if (speedArray) {
            //clear selectSpeed
            selectSpeed.innerHTML = "";

            //create option
            speedArray.forEach((speed) => {
              const option = document.createElement("option");
              option.value = speed;
              option.textContent = speed;
              selectSpeed.appendChild(option);
            });
          } else {
            console.log("Start value incorrect.");
          }
        } catch (error) {
          console.error("Error localStorage:", error);
        }
      } else {
        console.log("Start value have not installed.");
      }

      if (lowSpeedData) {
        try {
          const speedArray = JSON.parse(lowSpeedData);

          if (speedArray) {
            speedArray.forEach((speed) => {
              const option = document.createElement("option");
              option.value = speed;
              option.textContent = speed;
              selectSpeed.appendChild(option);
            });
          } else {
            console.log("Start value incorrect.");
          }
        } catch (error) {
          console.error("Error localStorage:", error);
        }
      } else {
        console.log("Start value have not installed.");
      }

      let customSpeed = document.createElement("option");
      customSpeed.value = "customSpeed";
      customSpeed.textContent = "Set custom Speed";
      selectSpeed.appendChild(customSpeed);
    }
    drawNewSelect();

    //select 1 for first loading page
    selectSpeed.value = "1";
    let selectedOption = selectSpeed.querySelector(
      `option[value="${selectSpeed.value}"]`
    );
    selectedOption.selected = true;

    // create btn
    let customButton = document.createElement("button");
    customButton.textContent = "1x";
    if (darkTheme) {
      customButton.classList.add("button-dark-yt-extension");
    } else {
      customButton.classList.add("button-yt-extension");
    }
    customButton.addEventListener("click", function () {
      let select = document.getElementById("mySelectSpeed");

      select.value = 1;

      setSpeedCustom(1);
    });
    containerElement.appendChild(customButton);

    let additionalButton = document.createElement("button");
    additionalButton.id = "additionalButton";
    function testOK() {
      let favorite = localStorage.getItem("favorite");
      additionalButton.textContent = favorite + "x";
    }
    testOK();
    additionalButton.classList.add("button-yt-extension");
    if (darkTheme) {
      additionalButton.classList.add("button-dark-yt-extension");
    } else {
      additionalButton.classList.add("button-yt-extension");
    }
    additionalButton.addEventListener("click", function () {
      let favorite = localStorage.getItem("favorite");
      setSpeedCustom(favorite);
      let select = document.getElementById("mySelectSpeed");
      select.value = favorite;
    });
    containerElement.appendChild(additionalButton);

    // Insert our custom container
    titleElement.insertAdjacentElement("afterend", containerElement);

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
  } else {
    requestAnimationFrame(checkElementRendered);
  }
}

requestAnimationFrame(checkElementRendered);
