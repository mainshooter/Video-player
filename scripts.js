var Start;
var VideoController;
var Video;

var videoElement = select('video');

var videoStatus = false;
// If the video is playing or not

function select(element) {
  return(document.querySelector(element));
}

(function() {
  Start = {
    placeListners: function() {
      select('.player__button').addEventListener('click', function(){ VideoController.playOrStop(); });
    }
  }
})();

(function() {
  VideoController = {
    playOrStop: function() {
      console.log("RUN");
      if (videoStatus === true) {
        // Video is playing
        videoElement.pause();
        videoStatus = false;
      }

      else if (videoStatus === false) {
        // Video is not playing
        videoElement.play();
        videoStatus = true;
      }
    }
  }
})();

Start.placeListners();
