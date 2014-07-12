var myAnimations = angular.module('myAnimations', [
  'ngAnimate'
]);

myAnimations.animation('.book-card', function() {
    var animateUp = function(element, className, done) {
      if(className != 'expand') {
	return ;
      }
      if(jQuery(element).is(":animated")) {
      	return ;
      }
      jQuery(element).animate({
        height: 60
      }, 200, done);
      return function(cancel) {
	if(cancel) {
	  element.stop();
	}
      };
    }
    var animateDown = function(element, className, done) {
      if(className != 'expand') {
	return;
      }
      if(jQuery(element).is(":animated")) {
      	return ;
      }

      jQuery(element).animate({
        height: 20
      }, 200, done);

      return function(cancel) {
	if(cancel) {
	  element.stop();
	}
      };
    }

    return {
      addClass: animateUp,
      removeClass: animateDown
    };
  });
