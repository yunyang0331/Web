var myApp = angular.module("myApp",[]);

myApp.controller('myController', function($scope) {
  $scope.navSetActive = function() {
    var url = window.location.href;

    if(url.indexOf("/platforms/") >= 0 ) {
      //$("#nav_products").addClass('active');
      angular.element('#nav_platforms').addClass('active');
    }
    else if(url.indexOf("contact.html") >= 0 || url.indexOf("faq.html") >= 0) {
      //$("#nav_contact").addClass('active');
      angular.element('#nav_contact').addClass('active');
    }
	else if(url.indexOf("collaborators.html") >= 0 ) {
      //$("#nav_collaborators").addClass('active');
      angular.element('#nav_collaborators').addClass('active');
    }
    else if(url.indexOf("events.html") >= 0 ) {
      //$("#nav_events").addClass('active');
      angular.element('#nav_events').addClass('active');
    }
	 
    else {
      //$("#nav_about").addClass('active');
      angular.element('#nav_about').addClass('active');
    }
    // initialization of header
    $.HSCore.components.HSHeader.init($('#js-header'));
    $.HSCore.helpers.HSHamburgers.init('.hamburger');

    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
      event: 'hover',
      pageContainer: $('.container'),
      breakpoint: 991
    });
  }
});


myApp.controller('sendConsultationEmail', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll){

  var firstname = document.getElementById("firstname");
  var lastname = document.getElementById("lastname");
  var companyname = document.getElementById("companyname");
  var jobtitle = document.getElementById("jobtitle");
  var emailaddr = document.getElementById("emailaddr");
  var phonenumber = document.getElementById("phonenumber");
  var messagebody = document.getElementById("messagebody");
  //var body = {'title':'test','message':'test'};
  
  var insertedElement = null;
  var messageSent = false;
  
  $scope.insertWarning = function (ele, targetID, warningText) {
      var p = document.createElement("p");
      p.textContent = warningText;
      p.setAttribute("class","text-danger");
      ele.parentNode.appendChild(p);
      //$location.hash(targetID);
      //$anchorScroll();
      insertedElement = p;
    }
  
  $scope.submitEmail = function () {
    if (insertedElement) {
      insertedElement.remove();
    }
    if (!name.value) {
      $scope.insertWarning(name, 'name', "Please enter your name!");
      return;
    }
    if (!email.value) {
      $scope.insertWarning(email, 'email', "Please enter your email address!");
      return;
    }
    if (!subject.value) {
      $scope.insertWarning(subject, 'subject', "Please enter your subject!");
      return;
    }
    if (!phone.value) {
      $scope.insertWarning(phone, 'phone', "Please enter your phone number!");
      return;
  
    if (!message.value) {
      $scope.insertWarning(message, 'message', "Please enter your questions or message!");
      return;
    }
    if (messageSent == false) {
      $http({ 
          url: 'https://yunyang0331.github.io/YunWeb/sendemail', 
          dataType: 'json', 
          method: 'POST', 
          data: {'sender': 'no-response@gmail.com', 'receiver': 'yunyang0331@gmail.com', 'title': 'General request', 'message': 'name: ' + name.value + '\n' + 'email: ' + emial.value + '\n' + 'subject: ' + subject.value + '\n' + 'phone: ' + phone.value + '\n' + 'message: ' + message.value }
      });
      $scope.insertWarning(submitButton, 'submitButton', "Thanks for your message, you will be contacted in 2 workdays！");
      messageSent = true;
    }
    else {
      $scope.insertWarning(submitButton, 'submitButton', "Your message was already sent, please refresh page to start sent another message！");
    }
  }
}]);