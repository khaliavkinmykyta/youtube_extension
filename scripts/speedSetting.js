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