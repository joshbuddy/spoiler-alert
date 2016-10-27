(function() {
  if (typeof Object.assign != 'function') {
    (function () {
      Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source !== undefined && source !== null) {
            for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        }
        return output;
      };
    })();
  }

  var DATA_ATTRIBUTE = 'data-spoiler-state';

  var BLUR_STATES = {
    shrouded: 'shrouded',
    revealed: 'revealed'
  }

  var CURSORS = {
    auto: 'auto',
    pointer: 'pointer'
  }

  window.spoilerAlert = function(selector, opts) {
    var elements = document.querySelectorAll(selector);
    var defaults = {
      max: 4,
      partial: 2,
      hintText: 'Click to reveal completely',
      transitionSpeed: 250
    };

    opts = Object.assign(defaults, opts || {});

    var maxBlur = opts.max;
    var partialBlur = opts.partial;
    var hintText = opts.hintText;
    var transitionSpeed = opts.transitionSpeed;

    var processElement = function(index) {
      var el = elements[index];
      el[DATA_ATTRIBUTE] = BLUR_STATES.shrouded;

      el.style.webkitTransition = '-webkit-filter ' + transitionSpeed + 'ms';
      el.style.transition = 'filter ' + transitionSpeed + 'ms';

      var applyBlur = function(radius) {
        el.style.filter = 'blur('+radius+'px)';
        el.style.webkitFilter = 'blur('+radius+'px)';
      }

      applyBlur(maxBlur);

      el.addEventListener('mouseover', function(e) {
        el.style.pointer = 'Cursor';
        el.title = hintText;
        if (el[DATA_ATTRIBUTE] === BLUR_STATES.shrouded) applyBlur(partialBlur);
      })

      el.addEventListener('mouseout', function(e) {
        el.title = hintText;
        if (el[DATA_ATTRIBUTE] === BLUR_STATES.shrouded) applyBlur(maxBlur);
      })

      el.addEventListener('click', function(e) {
        switch(el[DATA_ATTRIBUTE]) {
          case BLUR_STATES.shrouded:
            el[DATA_ATTRIBUTE] = BLUR_STATES.revealed;
            el.title = '';
            el.style.cursor = CURSORS.auto;
            applyBlur(0);
            break;
          default:
            el[DATA_ATTRIBUTE] = BLUR_STATES.shrouded;
            el.title = hintText;
            el.style.cursor = CURSORS.pointer;
            applyBlur(maxBlur);
        }
      })
    }

    for (var i = 0; i !== elements.length; i++) processElement(i);
  }
})();
