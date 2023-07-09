function checkElementRendered() {
  //Start point
  let titleElement = document.querySelector(
    "h1.style-scope.ytd-watch-metadata"
  );

  if (titleElement) {
    // Элемент отрисован, выполните необходимые действия

    //Container where we install our UI
    let containerElement = document.createElement("div");
    containerElement.classList.add("container-yt-extension");

    // Check box for +
    let checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = "myCheckbox";
    checkboxInput.classList.add("checkbox-yt-extension");
    containerElement.appendChild(checkboxInput);

     // Added label
     let addedLabel = document.createElement("span");
     addedLabel.textContent = "Added!";
     addedLabel.classList.add("added-label");
     addedLabel.style.display = "none";
     containerElement.appendChild(addedLabel);
 
     // Event listener for checkbox change
     checkboxInput.addEventListener("change", function () {
       if (this.checked) {
         addedLabel.style.display = "inline";
       } else {
         addedLabel.style.display = "none";
       }
     });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Select "My recommend list"
    let selectElement = document.createElement("select");
    selectElement.id = "mySelect";
    selectElement.classList.add("select-yt-extension");

    // Option "My recommend list"
    let defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.textContent = "My recommend list";
    selectElement.appendChild(defaultOption);

    // Option "Study English"
    let option1 = document.createElement("option");
    option1.value = "option1";
    option1.textContent = "Study English";
    selectElement.appendChild(option1);

    // Option "Add New Playlist"
    let option_new = document.createElement("option");
    option_new.value = "add_new_playlist";
    option_new.textContent = "Add new playlist";
    selectElement.appendChild(option_new);

    //Add to container out select rec list
    containerElement.appendChild(selectElement);

    // Input for new option in rec list
    let newOptionInput = document.createElement("input");
    newOptionInput.classList.add("hide-yt-extension");
    newOptionInput.type = "text";
    newOptionInput.id = "newOptionInput";
    newOptionInput.placeholder = "Enter new option";
    containerElement.appendChild(newOptionInput);

    // Button to add new option
    let addOptionButton = document.createElement("button");
    addOptionButton.classList.add("hide-yt-extension");
    addOptionButton.textContent = "Add Option";
    addOptionButton.classList.add("button-yt-extension");
    addOptionButton.addEventListener("click", function () {
      let input = document.getElementById("newOptionInput");
      let value = input.value.trim();

      if (value !== "") {
        let select = document.getElementById("mySelect");
        let newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        select.appendChild(newOption);
        select.value = value;
        input.value = "";
        newOptionInput.classList.add("hide-yt-extension");
        addOptionButton.classList.add("hide-yt-extension");
        select.appendChild(option_new);
      }
    });
    containerElement.appendChild(addOptionButton);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Select your Speed
    let selectSpeed = document.createElement("select");
    selectSpeed.id = "mySelectSpeed";
    selectSpeed.classList.add("select-yt-extension");

    //Default option 1
    // let defaultSpeed = document.createElement("option");
    // defaultSpeed.value = "1";
    // defaultSpeed.textContent = "Default speed";
    // selectSpeed.appendChild(defaultSpeed);

    //Speed option 1
    let speed1 = document.createElement("option");
    speed1.value = "1";
    speed1.textContent = "1";
    selectSpeed.appendChild(speed1);

    //Speed option 2
    let speed2 = document.createElement("option");
    speed2.value = "2";
    speed2.textContent = "2";
    selectSpeed.appendChild(speed2);

    //Custom speed option
    let customSpeed = document.createElement("option");
    customSpeed.value = "customSpeed";
    customSpeed.textContent = "Set custom Speed";
    selectSpeed.appendChild(customSpeed);

    //Add to container out select speed
    containerElement.appendChild(selectSpeed);

    // Input for new option in rec list
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
      let value = input.value.trim();

      if (value !== "") {
        let select = document.getElementById("mySelectSpeed");
        let newOption = document.createElement("option");
        newOption.value = value;
        newOption.textContent = value;
        select.appendChild(newOption);
        select.value = value;
        input.value = "";
        newSpeedInput.classList.add("hide-yt-extension");
        addSpeedButton.classList.add("hide-yt-extension");
        select.appendChild(customSpeed);
        setSpeedCustom(value);
      }
    });
    containerElement.appendChild(addSpeedButton);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // create btn
    let customButton = document.createElement("button");
    customButton.textContent = "1x";
    customButton.classList.add("button-yt-extension");
    //   customButton.addEventListener("click", function () {
    //     setSpeedCustom(1);
    //   });
    customButton.addEventListener("click", function () {
        let select = document.getElementById("mySelectSpeed");
        select.value = speed1.value;

      setSpeedCustom(speed1.value);
    });
    containerElement.appendChild(customButton);

    let additionalButton = document.createElement("button");
    additionalButton.textContent = "2x";
    additionalButton.classList.add("button-yt-extension");
    additionalButton.addEventListener("click", function () {
        let select = document.getElementById("mySelectSpeed");
        select.value = speed2.value;
      setSpeedCustom(speed2.value);
    });
    containerElement.appendChild(additionalButton);

    // Insert our custom container
    titleElement.insertAdjacentElement("afterend", containerElement);

    // Event listener for selectElement change
    selectElement.addEventListener("change", function () {
      if (this.value === "add_new_playlist") {
        newOptionInput.classList.remove("hide-yt-extension");
        addOptionButton.classList.remove("hide-yt-extension");
      } else {
        newOptionInput.classList.add("hide-yt-extension");
        addOptionButton.classList.add("hide-yt-extension");
      }
    });
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
    // Элемент еще не отрисован, запросите следующую анимацию перед перерисовкой
    requestAnimationFrame(checkElementRendered);
    console.log("not yet");
  }
}

// Запускаем проверку отрисовки элемента
requestAnimationFrame(checkElementRendered);
