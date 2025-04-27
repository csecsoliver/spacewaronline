function setupFullscreenToggle(canvasId, buttonId, backgroundElementSelector = 'body') {
    const canvas = document.getElementById(canvasId);
    const button = document.getElementById(buttonId);
    const backgroundElement = document.querySelector(backgroundElementSelector);
  
    if (!canvas || !button) {
      console.error("Canvas or button not found. Ensure correct IDs are provided.");
      return;
    }
  
    if (!backgroundElement) {
      console.warn("Background element not found. Background adjustments will be skipped.");
    }
  
    function resizeCanvas() {
      if (document.fullscreenElement) {
        // Canvas dimensions (800x600)
        const canvasWidth = 800;
        const canvasHeight = 600;
        const aspectRatio = canvasWidth / canvasHeight; // 4:3
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenRatio = screenWidth / screenHeight;
  
        let scale, newWidth, newHeight;
        // Scale to touch at least one border (maximize size)
        if (screenRatio > aspectRatio) {
          // Screen is wider: scale to fit height, touch top/bottom
          scale = screenHeight / canvasHeight;
        } else {
          // Screen is taller: scale to fit width, touch left/right
          scale = screenWidth / canvasWidth;
        }
  
        newWidth = canvasWidth * scale;
        newHeight = canvasHeight * scale;
  
        // Apply scaling and center the canvas
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
        canvas.style.position = 'absolute';
        canvas.style.left = `${(screenWidth - newWidth) / 2}px`;
        canvas.style.top = `${(screenHeight - newHeight) / 2}px`;
        canvas.style.margin = '0';
  
        // Adjust background image (if backgroundElement exists)
        if (backgroundElement) {
          backgroundElement.style.backgroundSize = `${newWidth}px ${newHeight}px`;
          backgroundElement.style.backgroundPosition = `${(screenWidth - newWidth) / 2}px ${(screenHeight - newHeight) / 2}px`;
          backgroundElement.style.backgroundRepeat = 'no-repeat';
        }
      } else {
        // Reset canvas styles
        canvas.style.width = '800px';
        canvas.style.height = '600px';
        canvas.style.position = '';
        canvas.style.left = '';
        canvas.style.top = '';
        canvas.style.margin = '';
  
        // Reset background styles (restore CSS defaults)
        if (backgroundElement) {
          backgroundElement.style.backgroundSize = '';
          backgroundElement.style.backgroundPosition = '';
          backgroundElement.style.backgroundRepeat = '';
        }
      }
    }
  
    button.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen().then(() => {
          resizeCanvas();
        }).catch(err => {
          console.error("Fullscreen request failed:", err);
        });
      } else {
        document.exitFullscreen().then(() => {
          resizeCanvas();
        }).catch(err => {
          console.error("Exiting fullscreen failed:", err);
        });
      }
    });
  
    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
  }