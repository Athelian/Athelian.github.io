const run = () => {
  const buttons = document.getElementsByClassName("link");
  const titleBox = document.getElementById("title-box");
  const bgF = document.getElementById("bg-f");
  const bg = document.getElementById("bg");
  const buttonColors = { Projects: "Pink", About: "Orange", GitHub: "Purple" };
  let projects = [];
  let banners = [];

  (openDrawer = () => {
    titleBox.style.height = "250px";
    for (button of buttons) {
      button.style.height = "50px";
    }
  })();

  window.onresize = function () {
    var w = $(window).width();
    var h = $(window).height();
    if (w < 800 || h < 610) {
      $(".side-button").hide();
    }
    if (w > 800 && h > 610) {
      $(".side-button").show();
    }
  };

  let menuScreen = true;
  let clickedButton = null;

  (setButtonAnimations = () => {
    for (let button of buttons) {
      button.onclick = function buttonClicker() {
        clickedButton = menuScreen ? this.id : clickedButton;
        pageTransition(this);
        for (let button of buttons) {
          button.onclick = null;
        }
        menuScreen = !menuScreen;
        setTimeout(function () {
          setButtonAnimations();
        }, 2000); // Prevent button spam
      };
    }
  })();

  const pageTransition = (clickedButton) => {
    let arrayButtons = [...buttons];

    if (menuScreen) {
      switch (clickedButton.id) {
        case "Projects":
          arrayButtons.splice(0, 1);
          let chessProject = document.getElementById("chess");
          if (chessProject === null) {
            buildChessProject();
          } else {
            chessProject.setAttribute("style", "display: null;");
            setTimeout(function () {
              chessProject.style.opacity = 1;
            }, 10);
          }
          let projectBanner = document.getElementById("banner");
          if (projectBanner === null) {
            let banner = document.createElement("div");
            banner.id = "banner";
            banner.style.opacity = 0;
            bgF.prepend(banner);
            setTimeout(function () {
              banner.style.opacity = 1;
            }, 10);
            banners.push(banner);
          } else {
            projectBanner.setAttribute("style", "display: null; opacity: 0");
            setTimeout(function () {
              projectBanner.style.opacity = 1;
            }, 10);
          }
          break;

        case "About":
          arrayButtons.splice(1, 1);
          break;

        case "GitHub":
          arrayButtons.splice(2, 1);
          break;
      }

      titleBox.setAttribute("style", "height: 200px; opacity: 0");

      clickedButton.setAttribute(
        "style",
        "margin-left: 23%; left: 0; transform: translate(0,0);\
      font-size: 1.2cm; height: 100px; top: 0; margin-top: 220px;"
      );

      arrayButtons[0].setAttribute(
        "style",
        "margin-left: 0; background: rgba(255, 255, 255, 0.6);width: 300px; height: 120px;\
      margin-top: 0; font-size: 1.2cm; height: 100px; top: 30px; left: 20%; transform: translate(0,0);"
      );
      arrayButtons[0].classList.toggle("side-button");

      arrayButtons[1].setAttribute(
        "style",
        "background: rgba(255, 255, 255, 0.6); width: 300px; height: 120px;  margin-top: 0;\
      font-size: 1.2cm; height: 100px; margin-left: 0; left: calc(20% + 310px); top:30px; transform: translate(0,0);"
      );
      arrayButtons[1].classList.toggle("side-button");
    } else {
      titleBox.style = null;
      for (let project of projects) {
        project.style.opacity = 0;
        setTimeout(function () {
          project.style.display = "none";
        }, 2000);
      }
      for (let button of buttons) {
        button.style = null;
      }
      for (let banner of banners) {
        banner.style.opacity = 0;
        setTimeout(function () {
          banner.style.display = "none";
        }, 2000);
      }
    }
    blender();
  };

  const blender = (count = menuScreen ? 3 : 37) => {
    if (count < 1 || count > 39) {
      return;
    } // If finished all picturess
    console.log(count);

    if (count % 2 === 0) {
      // Alternate between two bg layers
      bgF.style.opacity = "100%";
      bg.style.opacity = "0%";
      bg.style.backgroundImage =
        "url(Images/" + buttonColors[clickedButton] + "/" + count + ".png)";
    } else {
      bg.style.opacity = "100%";
      bgF.style.opacity = "0%";
      bgF.style.backgroundImage =
        "url(Images/" + buttonColors[clickedButton] + "/" + count + ".png)";
    }
    if (menuScreen && count === 32) {
      // Reopen the drawer on moving back to menu screen
      openDrawer();
    }
    setTimeout(function () {
      menuScreen ? blender(--count) : blender(++count);
    }, 50); //Change picture every 50ms
  };

  const buildChessProject = () => {
    let chessProject = document.createElement("div");
    chessProject.id = "chess";

    let image = new Image();
    image.id = "chess-gif";
    image.src = "Images/tpMtgHoYg6.gif";

    let projectText = document.createElement("div");
    projectText.id = "project-text";
    projectText.innerHTML =
      "JAVA is showing it's age somewhat with regards to popularity and ease of implementation\
    across today's diverse range of systems, however the language remains a valuable asset with regards to legacy systems\
    such as those found at a traditional Japanese firm.<br><br> Moreover, the language is often an entry-point to a computer\
    science degree, where fundamental concepts are made palatable by the consistency of a statically-typed language:";

    chessProject.append(projectText);
    chessProject.append(document.createElement("br"));
    projectText.append(image);

    let readme = document.createElement("iframe");
    readme.id = "read-me";
    readme.src = "Chess/Chess.html";

    chessProject.append(readme);
    bgF.prepend(chessProject);

    projects.push(chessProject);

    setTimeout(function () {
      chessProject.style.opacity = "100%";
    }, 10); // Required sleep for dynamic element styling
  };
};
