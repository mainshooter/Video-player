var Start;
var VideoController;
var Video;

var videoElement = select('video');


function select(element) {
  return(document.querySelector(element));
}
function selectAll(elements) {
  return(document.querySelectorAll(elements));
}
(function() {
  Start = {
    placeListners: function() {
      select('.player__button').addEventListener('click', function(){ VideoController.playOrStop(); });
      select('.player__slider').addEventListener('mouseup', function() { VideoController.volume(); });
      selectAll('.player__slider')[1].addEventListener('mouseup', function() { VideoController.speed(); });
    }
  }
})();
(function() {
  VideoController = {

    /**
     * Gets the status fo the video, is it playing or not
     * @return {[boolean]} [If it is playing we return true if it isn't playing we return false]
     */
    status: function() {
      var videoStatus = videoElement.paused;
      if (videoStatus === true) {
        // Video is paused we return false
        return(false);
      }

      else {
        // video is playing we return true
        return(true);
      }
    },
    /**
     * Plays of pause the video
     */
    playOrStop: function() {
      if (VideoController.status() === true) {
        // Video is playing
        videoElement.pause();
        videoStatus = false;
      }

      else if (VideoController.status() === false) {
        // Video is not playing
        videoElement.play();
        videoStatus = true;
      }
    },

    /**
     * Controlls the volume of a video
     */
    volume: function() {
      var volumeLvl = select('.player__slider').value;
      videoElement.volume = volumeLvl;
    },

    speed: function() {
      var speed = selectAll('.player__slider')[1].value;
      videoElement.playbackRate = speed;
    }
  }
})();

Start.placeListners();
