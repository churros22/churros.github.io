document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('fullscreen-toggle');
  const zoomImage = document.getElementById('zoomImage');
  let scale = 0.75;
  const zoomSpeed = 0.1;
  const maxZoom = 4;
  const minZoom = 0.3;

  // Apply initial scale when lightbox opens
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      scale = 0.75;
      zoomImage.style.transform = 'scale(0.75)';
      zoomImage.style.transformOrigin = 'center center';
    }
  });

  // Wheel-based zoom with pointer-based transform origin
  zoomImage.addEventListener('wheel', function(e) {
    e.preventDefault();
    // Determine zoom direction
    const zoomIn = e.deltaY < 0;

    // Set scale boundaries
    if (zoomIn) {
      scale = Math.min(scale + zoomSpeed, maxZoom);
    } else {
      scale = Math.max(scale - zoomSpeed, minZoom);
    }

    // Calculate the position of mouse pointer relative to the image
    const rect = zoomImage.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;

    // Update transform origin to where the mouse pointer is
    zoomImage.style.transformOrigin = `${originX}% ${originY}%`;

    // Apply the new scale
    zoomImage.style.transform = `scale(${scale})`;
  });
});
