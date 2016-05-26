var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        display()
    },
    bindEvents: function() {
        document.addEventListener('deviceready', function () {
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    var text=JSON.stringify(jsonData);
    var obj = JSON.parse(text);
    if (text!=""){
      //var myMessage=obj.additionalData.title+" : "+obj.message;
      var myMessage=obj.message;
      localStorage.setItem("notif", myMessage);
      localStorage.setItem("date", date_heure());
      display();
}
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

function display(){
  var notif=document.getElementById("notif");
  var date=document.getElementById("date");
  notif.innerHTML="";
for(var x=0; x<localStorage.length;x++){

  var b=localStorage.getItem('notif');
  var c=localStorage.getItem('date');
  notif.innerHTML=b;
  date.innerHTML=c;
}
}
function date_heure()
{
        date = new Date;
        annee = date.getFullYear();
        moi = date.getMonth();
        mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
        j = date.getDate();
        jour = date.getDay();
        jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        resultat = jours[jour]+' '+j+' '+mois[moi]+' '+annee+' à '+h+':'+m+':'+s;
        /*document.getElementById(id).innerHTML = resultat;
        setTimeout('date_heure("'+id+'");','1000');*/
        return resultat;
}
