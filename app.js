const run = () => {
  const buttons = document.getElementsByClassName("link");
  const titleBox = document.getElementById("title-box");
  (openDrawer = () => {
    titleBox.style.height = "250px";
    for (button of buttons) {
      button.style.height = '50px';
    }
  })()

  const bgF = document.getElementById('bg-f');
  const bg  = document.getElementById('bg');

  const blendBgProjects = (increasing) => {
    let count;
    if (increasing) {
      count = 3     // Rel. to picture names
    } else {
      count = 37    // Rel. to picture names
    }
    return blendBackground = () => {
      if (increasing && count > 39 || !increasing && count < 1) {return;} // If finished all pictures
      if (count % 2 === 0) { // Alternate between two bg layers
        bgF.style.opacity = "100%";
        bg.style.opacity  = "0%";
        bg.style.backgroundImage  = "url(Images/"+colorSelected+"/"+count+".png)";
      } else {
        bg.style.opacity = "100%";
        bgF.style.opacity = "0%";
        bgF.style.backgroundImage = "url(Images/"+colorSelected+"/"+count+".png)";
      }
      if (!increasing && count === 32) { // Reopen the drawer on blending back down
        openDrawer();
      }
      setTimeout(function () {
        if (increasing)  { blendBackground(++count) } 
                    else { blendBackground(--count) }
                                }, 50);
    }
  }

  const projectButtonAnimator = (increasing, clickedBUtton) => {
    let blendInitialiser;
    if (increasing) {
      titleBox.setAttribute("style", "height: 200px; opacity: 0.05");
      switch (colorSelected) {
        case 'Orange':
          titleBox.style.borderColor = 'rgba(241, 105, 19, 0.4)';
        case 'Pink':
          titleBox.style.borderColor = 'rgba(231, 41, 138, 0.4)';
      }
      for (button of buttons) {
        if (button !== clickedBUtton) {
          button.setAttribute("style", 
          "font-size: 1.2cm; height: 100px; left: calc(96% - 30px); margin-left:0; margin-top: 20px; transform: translate(-50%, -50%) rotate(90deg);");
          if (button.id === 'GitHub') {
            button.style.top = '80%';
          } if (button.id === 'Projects') {
            button.style.top = '20%';
          }
        }
        else {
          button.setAttribute("style", 
          "font-size: 1.2cm; height: 100px; margin-left: 0; left: 150px; top: 0; margin-top: 40px; transform: translate(-50%, -0%);");
        }
      }
      let projects = document.createElement('div');
      projects.style.marginLeft = '13%';
      projects.style.width = '70%';
      projects.style.marginTop = '10%';
      projects.style.background = 'rgba(255, 255, 255, 0.2)';

      let image = new Image();
      image.src = 'Images/tpMtgHoYg6.gif';
      image.style.width = '90%';
      image.style.margin = 'auto';

      let projectText = document.createElement('div');
      projectText.innerHTML = "JAVA is showing it's age somewhat with regards to popularity and ease of implementation\
      across today's diverse range of systems, however the language remains a valuable asset with regards to legacy systems\
      such as those found at a traditional Japanese firm.<br><br> Moreover, the language is often an entry-point to a computer\
      science degree, where fundamental concepts are made palatable by the consistency of a statically-typed language:";

      projectText.style.fontSize = 'x-large';
      projects.append(projectText);
      projects.append(document.createElement('br'));
      projects.append(image);

      let readme = document.createElement('iframe');
      readme.src = "Chess/Chess.html";
      readme.width = '100%';
      readme.height = '800px';
      readme.style.background = 'rgba(255, 255, 255, 0.6)'

      projects.append(readme);
      
      bgF.prepend(projects);
    }
    else { 
      titleBox.setAttribute("style", "all: null");
      for (button of buttons) {
        button.setAttribute("style", "all: null");
      }
    }
    blendInitialiser = blendBgProjects(increasing);
    blendInitialiser();
  };

  const buttonColors = {Projects: 'Pink', About: 'Orange', GitHub: 'Purple'}
  let increasing = true;
  let colorSelected = null;

  (setButtonAnimations = () => {
    for (let button of buttons) {
      button.onclick = function buttonClicker() {
        colorSelected = (increasing) ? buttonColors[button.id] : colorSelected;
        projectButtonAnimator(increasing, this);
        for (let button of buttons) {
          button.onclick = null;
        }
        increasing = !increasing
        setTimeout(function() {setButtonAnimations()}, 1300); // Prevent button spam
      }
    }
  })();
};
