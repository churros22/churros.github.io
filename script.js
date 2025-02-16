document.addEventListener('DOMContentLoaded', function () {
  // Select all images that should trigger the lightbox by using the "flowchart-img" class
  const flowchartImgs = document.querySelectorAll('.flowchart-img');
  
  // Define constants for zoom
  let currentScale = 1;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;
  const SCALE_STEP = 0.1;

  // Create and configure the fullscreen container
  const fullscreenContainer = document.createElement('div');
  fullscreenContainer.id = 'fullscreen-container';

  // Create the fullscreen image element
  const fullscreenImage = document.createElement('img');
  fullscreenImage.id = 'fullscreen-image';

  // Create zoom controls with two buttons: zoom in and zoom out
  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';
  zoomControls.innerHTML = `
    <button class="zoom-btn zoom-in">+</button>
    <button class="zoom-btn zoom-out">&minus;</button>
  `;

  // Append the image and zoom controls to the fullscreen container
  fullscreenContainer.appendChild(fullscreenImage);
  fullscreenContainer.appendChild(zoomControls);
  document.body.appendChild(fullscreenContainer);

  // Function to update the image scale based on currentScale
  function updateImageScale() {
    fullscreenImage.style.transform = `scale(${currentScale})`;
  }

  // Listen for clicks on any card image
  flowchartImgs.forEach((img) => {
    img.addEventListener('click', function () {
      // Set the fullscreen image source to match the clicked image
      fullscreenImage.src = this.src;
      // Reset scale to default when opening
      currentScale = 1;
      updateImageScale();
      fullscreenContainer.classList.add('active');
    });
  });

  // Zoom button event listeners
  zoomControls.querySelector('.zoom-in').addEventListener('click', function (e) {
    e.stopPropagation();
    if (currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
      updateImageScale();
    }
  });

  zoomControls.querySelector('.zoom-out').addEventListener('click', function (e) {
    e.stopPropagation();
    if (currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
      updateImageScale();
    }
  });

  // Hide the fullscreen container when clicking outside the image or on the container itself
  fullscreenContainer.addEventListener('click', function (e) {
    if (e.target !== fullscreenImage && !e.target.classList.contains('zoom-btn')) {
      fullscreenContainer.classList.remove('active');
    }
  });

  // Keyboard Support for closing with Escape and zooming with '+'/'-' keys
  document.addEventListener('keydown', function (e) {
    if (fullscreenContainer.classList.contains('active')) {
      if (e.key === 'Escape') {
        fullscreenContainer.classList.remove('active');
      } else if (e.key === '+' || e.key === '=') {
        if (currentScale < MAX_SCALE) {
          currentScale += SCALE_STEP;
          updateImageScale();
        }
      } else if (e.key === '-' || e.key === '_') {
        if (currentScale > MIN_SCALE) {
          currentScale -= SCALE_STEP;
          updateImageScale();
        }
      }
    }
  });
});
