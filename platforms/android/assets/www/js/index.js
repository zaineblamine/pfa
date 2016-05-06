var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    //alert("Notification received:\n" + JSON.stringify(jsonData));
    //var text = '{"isActive":false,"message":"hello","additionalData":{"title":"title"}}';
    var text=JSON.stringify(jsonData);
    var obj = JSON.parse(text);
    var myMessage=obj.message+ "<br>" +obj.additionalData.title;
    localStorage.setItem("message", myMessage);
document.getElementById("notif").innerHTML = localStorage.getItem("message");
  };

  window.plugins.OneSignal.getIds(function(ids) {
  document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
  document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
  console.log('getIds: ' + JSON.stringify(ids));

});
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  // Enable to debug issues
  window.plugins.OneSignal.setLogLevel({logLevel: 0, visualLevel: 0});
  window.plugins.OneSignal.init("da7bc528-f33e-4c80-9865-b13d0d5f0038",
                                {googleProjectNumber: "97377827043"},
                                notificationOpenedCallback);
  window.plugins.OneSignal.setSubscription(true);
  window.plugins.OneSignal.enableInAppAlertNotification(false);
  /*var text=JSON.stringify(jsonData);
  var obj = JSON.parse(text);
  document.getElementById("notif").innerHTML=obj.additionalData.title + "<br>" +
  obj.message;*/
}, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);

    }

};
app.initialize();
