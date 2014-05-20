var myAnimations = angular.module('myAnimations', [
  'ngAnimate'
]);

myAnimations.animation('.book-card', function() {
    var animateUp = function(element, className, done) {
      console.log('.book-card'  + element);
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
      console.log('.book-card'  + element);
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

myAnimations.animation('.detail', function() {
  console.log('.detail general');
    var animateUp = function(element, className, done) {
      console.log('.detail'  + element);
      if(className != 'active') {
	return;
      }
      if(jQuery(element).is(":animated")) {
      	return ;
      }
      jQuery(element).show(200);

      return function(cancel) {
      	if(cancel) {
      	  element.stop();
//    	  element.hide(200);
      	}
      };
    }
    var animateDown = function(element, className, done) {
      console.log('.detail'  + element);
      if(className != 'active') {
	return;
      }
      if(jQuery(element).is(":animated")) {
      	return ;
      }
      jQuery(element).hide(200);

      return function(cancel) {
	if(cancel) {
	  element.stop();
	  element.hide(200);
	}
      };
    }

    return {
      addClass: animateUp,
      removeClass: animateDown
    };
  });

