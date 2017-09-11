var Start;
var VideoController;
var Video;

var intervalBarLenght;
// Contains a interval for the function: VideoController.updateVideoBar();

var videoElement = select('video');


function select(element) {
  return(document.querySelector(element));
}
function selectAll(elements) {
  return(document.querySelectorAll(elements));
}

(function() {
  /**
   * Start all the things we need to run on load
   * @type {Object}
   */
  Start = {
    placeListners: function() {
      select('.player__button').addEventListener('click', function(){ VideoController.playOrStop(); });
      select('.player__slider').addEventListener('mouseup', function() { VideoController.volume(); });
      selectAll('.player__slider')[1].addEventListener('mouseup', function() { VideoController.speed(); });
      select('.progress').addEventListener('click', function() { VideoController.updateCurrentPlayTime(event); });
      selectAll('.player__button')[1].addEventListener('click', function() { VideoController.setVideoTenSecondsBack(); });
      selectAll('.player__button')[2].addEventListener('click', function() { VideoController.setVideoTwentyFiveForward(); });
    }
  }
})();
(function() {
  VideoController = {

    /**
     * Gets the status fo the video, is it playing or not
     * @return {[boolean]} [If it is playing we return true if it isn't playing we return false]
     */
    getStatus: function() {
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
     * Gets the current time of how far we are in the video
     * @return {[float]} [the current play time of the video in seconds]
     */
    getCurrentPlayTime: function() {
      return(videoElement.currentTime);
    },

    /**
     * Gets the total lenght of a video and returns it
     * @return {[float]} [The time in seconds of how long the video is]
     */
    getVideoLenght: function() {
      return(videoElement.duration);
    },

    setVideoTenSecondsBack: function() {
      var currentVideoTime = VideoController.getCurrentPlayTime();
      // Current time in seconds

      var newPlayTime = currentVideoTime - 10;
      Video.playTime(newPlayTime);
    },

    setVideoTwentyFiveForward: function() {
      var currentVideoTime = VideoController.getCurrentPlayTime();
      // Current time in seconds

       var newPlayTime = currentVideoTime + 25;

      Video.playTime(newPlayTime);
    },

    /**
     * Updates the video bar on how far we are
     */
    updateVideoBar: function() {
      var currentPlayTime = VideoController.getCurrentPlayTime();
      var videoLenght = VideoController.getVideoLenght();

      var percentageViewed = ((currentPlayTime - videoLenght ) / videoLenght * 100) + 100;
      // Contains how far we are with watching the video in %
      select(".progress__filled").style.flexBasis = percentageViewed + "%";
    },

    updateCurrentPlayTime: function(event) {
      var mouseHorizonLocation = event.clientX;
      // To get the position of the mouse

      var fullPlaybarSize = select('.progress').offsetWidth;
      var fullScreenWith = screen.width;
      // With of the playbar

      var fullVideoLenght = VideoController.getVideoLenght();
      // To lenght of the video

      var oneSecondWorthInPx = fullVideoLenght / fullPlaybarSize;
      // Calculate how mutch one second is worth in px

      var newTime = (mouseHorizonLocation - 400) * oneSecondWorthInPx;
      // The new play time

      Video.playTime(newTime);
    },
    
    /**
     * Plays of pause the video
     */
    playOrStop: function() {
      VideoController.updateVideoBar();
      if (VideoController.getStatus() === true) {
        // Video is playing
        Video.pause();
      }

      else if (VideoController.getStatus() === false) {
        // Video is not playing
        Video.play();
      }
    },

    /**
     * Controlls the volume of a video
     */
    volume: function() {
      var volumeLvl = select('.player__slider').value;
      Video.volume(volumeLvl);
    },

    /**
     * Controlls the new speed
     */
    speed: function() {
      var speedLvl = selectAll('.player__slider')[1].value;
      Video.speed(speedLvl);
    }
  }
})();

(function() {
  /**
   * Controlls video behaviour
   * @type {Object}
   */
  Video = {

    /**
     * Starts the video automatic when the webpage is loaded
     */
    autoPlay: function() {
      if (VideoController.getStatus() === false) {
        // If the video is paused
        videoElement.play();
      }
    },
    /**
     * Starts the video
     */
    play: function() {
      videoElement.play();
    },

    /**
     * Pauses the video
     */
    pause: function() {
      videoElement.pause();
    },

    /**
     * Changes the volume
     * @param  {[float]} volumeLvl [The new volume lvl 0.1 to 1.0]
     */
    volume: function(volumeLvl) {
      videoElement.volume = volumeLvl;
    },

    /**
     * Changes the speed / playbackrate of the video
     * @param  {[float]} speedLvl [The speed lvl from 0.1 to 1.0]
     */
    speed: function(speedLvl) {
      videoElement.playbackRate = speedLvl;
    },

    /**
     * Changes the time of were the video is playing right now
     * @param  {[int]} time [The new time in seconds]
     */
    playTime: function(time) {
      videoElement.currentTime = time;
      VideoController.updateVideoBar();
    },
  }
})();

Start.placeListners();
VideoController.updateVideoBar();
Video.autoPlay();
intervalBarLenght = setInterval(function() { VideoController.updateVideoBar(); }, 1000);
