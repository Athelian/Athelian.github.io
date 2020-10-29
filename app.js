window.onload = function() {
  const menuButtons = document.getElementById("hidden-nav");
  const titleBox = document.getElementById("title-box");
  (openDrawer = () => {
    menuButtons.style.height = "50px";
    titleBox.style.height = "250px";
  })()

  const projectButton = document.getElementById("Projects");
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
        bg.style.backgroundImage  = "url(Images/Pink/"+count+".png)";
      } else {
        bg.style.opacity = "100%";
        bgF.style.opacity = "0%";
        bgF.style.backgroundImage = "url(Images/Pink/"+count+".png)";
      }
      if (!increasing && count === 32) { // Reopen the drawer on blending back down
        openDrawer();
      }
      setTimeout(function () {
        if (increasing)  { blendBackground(++count) } 
                    else { blendBackground(--count) }
                                }, 45);
    }
  }

  const projectButtonAnimator = (increasing) => {
    let blendInitialiser;
    if (increasing) {
      titleBox.setAttribute("style", "height: 200px; opacity: 0.05"); 
      menuButtons.setAttribute("style", "width: 100%; height: 50px; top: 0%; margin-top: 2%; transform: translate(-50%, -0%);");
    }
    else { 
      titleBox.setAttribute("style", "all: null");
      menuButtons.setAttribute("style", "all: null");
    }
    blendInitialiser = blendBgProjects(increasing);
    blendInitialiser();
  };

  let increasing = true;
  projectButton.onclick = function projectButtonClicker () {
    projectButtonAnimator(increasing);
    increasing = !increasing
    this.onclick = null;
    setTimeout(function() {projectButton.onclick = projectButtonClicker}, 1500); // Prevent button spam
  }
}
