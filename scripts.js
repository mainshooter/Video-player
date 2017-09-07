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
      select('.player__slider').addEventListener('mouseup', function() { VideoController.volume(); });
    }
  }
})();
(function() {
  VideoController = {
    /**
     * Plays of pause the video
     */
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
    },

    volume: function() {
      var volumeLvl = select('.player__slider').value;
      console.log(volumeLvl);
      videoElement.volume = volumeLvl;
    }
  }
})();

Start.placeListners();
