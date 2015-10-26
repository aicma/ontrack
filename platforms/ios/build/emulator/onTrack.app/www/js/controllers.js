angular.module('onTrack.controllers', ['ionic', 'ngCordova', 'opentok'])
/**
.controller('VideoCtrl', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
                OTSession.init(apiKey, sessionId, token);
                $scope.streams = OTSession.streams;
            }]).value({
                apiKey: '45376102',
                sessionId: '1_MX40NTM3NjEwMn5-MTQ0NTYyNTI2MjA4NH5pZ2d1RExwam4zNk9aL2psRk15Yk5QcVd-UH4',
                token: 'T1==cGFydG5lcl9pZD00NTM3NjEwMiZzaWc9OWNlMDM4MjlkNDg4YzhhZWJmODJhM2I1YzdkNmQ4YTY2NTY0MGI0Njpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UTTNOakV3TW41LU1UUTBOVFl5TlRJMk1qQTROSDVwWjJkMVJFeHdhbTR6Tms5YUwycHNSazE1WWs1UWNWZC1VSDQmY3JlYXRlX3RpbWU9MTQ0NTYyNTI4MSZub25jZT0wLjUxMzkwNjUyNDUzNjY3OTcmZXhwaXJlX3RpbWU9MTQ0NTY0Njg0NyZjb25uZWN0aW9uX2RhdGE9dGVzdA=='
            });
*/

.controller ('VideoCtrl', function($scope, TokBoxSettings, $ionicPopup) {
 
  document.addEventListener("deviceready", function () {  
    var opentok = {
        config: undefined,
        session: undefined,
        publisher: undefined,
        subscriber: undefined,
        isSubscribing: false,

        initializePublisher: function() {
            opentok.publisher = OT.initPublisher('publisher');
        },

        initializeSession: function() {
            opentok.session = OT.initSession(TokBoxSettings.apiKey, TokBoxSettings.sessionId);
            opentok.session.on('streamCreated', opentok.onStreamCreated);
            opentok.session.on('streamDestroyed', opentok.onStreamDestroyed);
            opentok.session.connect(TokBoxSettings.token, opentok.onSessionConnected);
        },

        onSessionConnected: function(event) {
            opentok.session.publish(opentok.publisher);
        },

        onStreamCreated: function(event) {
            if (!opentok.isSubscribing) {
                opentok.subscriber = opentok.session.subscribe(event.stream, 'subscriber');
                opentok.isSubscribing = true;
            }
        },

        onStreamDestroyed: function(event) {
            if (opentok.isSubscribing && event.stream.streamId === opentok.subscriber.stream.streamId) {
                opentok.session.unsubscribe(opentok.subscriber);
                opentok.isSubscribing = false;
                opentok.subscriber = undefined;
            }
        }
      };
    OT.setLogLevel(OT.DEBUG);

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
                //do ERROR stuff
          });
        }

   }, false);
})


.controller('HomeCtrl', function($scope, $cordovaGeolocation, $ionicPopup) {

  document.addEventListener("deviceready", function() {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $scope.getLocation = function() {
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
