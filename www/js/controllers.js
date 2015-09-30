angular.module('onTrack.controllers', ['ionic', 'ngCordova'])

/**
  Empty Debug Controllers
*/
//.controller('VideoCtrl', function($scope) {})

//.controller('PhotoCtrl', function($scope) {})

///////////////////////////////////////////////////////

.controller ('VideoCtrl', function($scope, $cordovaCapture, VideoService) {
   
   document.addEventListener("deviceready", function () {

    $scope.captureVideo = function() {
      var options = { limit: 1, duration: 15 };

      $cordovaCapture.captureVideo(options).then(function(videoData) {
        VideoService.saveVideo(videoData).success(function(data) {
          $scope.clip = data;
          $scope.$apply();
        }).error(function(data){
          console.log('ERROR: ' + data);
        })
      , function(err) {
          console.log(err.message);
        }
      });
    }

    $scope.urlForClipThumb = function(clipUrl) {
      var name = clipUrl.substr(clipUrl.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      var sliced = trueOrigin.slice(0, -4);
      return sliced + '.png';
    }
     
    $scope.showClip = function(clip) {
      console.log('show clip: ' + clip);
    }
  }, false);
})


.controller ('PhotoCtrl', function($scope, $cordovaCamera) {

  document.addEventListener("deviceready", function () {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: false
        };

        $scope.takePicture = function() {
        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.imgSrc = "data:image/jpeg;base64," + imageData;
          }, function(err) {
                console.log(err);
          });
        }

   }, false);
})


.controller('HomeCtrl', function($scope, $cordovaGeolocation, $ionicPopup) {

  document.addEventListener("deviceready", function() {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $scope.getLocation = function() {
    //  document.addEventListener("deviceready", function(){
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) 
        {
          $scope.position = position;
          var popUp = $ionicPopup.alert({
            title: 'Position found!',
            template: 'Lat: ' + position.coords.latitude + '&nbsp; Long: ' + position.coords.longitude
          })
        }, function(err) {
            var popUp = $ionicPopup.alert({
            title: 'ERROR',
            template: err.message
          })
      });
    }
  }, false);
});
