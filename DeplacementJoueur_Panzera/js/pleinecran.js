function twPleinEcran(_element) {
      var monElement = _element||document.documentElement;
      if (document.mozFullScreenEnabled) {
	if (!document.mozFullScreenElement) {
          monElement.mozRequestFullScreen();
        } else {
          document.mozCancelFullScreen();
        }
      }
      if (document.fullscreenElement) {
	if (!document.fullscreenElement) {
          monElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
      if (document.webkitFullscreenEnabled) {
	if (!document.webkitFullscreenElement) {
          monElement.webkitRequestFullscreen();
        } else {
          document.webkitExitFullscreen();
        }
      }
      if (document.msFullscreenEnabled) {
	if (!document.msFullscreenElement) {
          monElement.msRequestFullscreen();
        } else {
          document.msExitFullscreen();
        }
      }
}
