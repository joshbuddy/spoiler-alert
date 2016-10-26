(function() {
  if (typeof Object.assign !== 'function') {
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

  window.spoilerAlert = function(selector, opts) {
    var elements = document.querySelectorAll(selector);
    var defaults = {
      max: 4,
      partial: 2,
      hintText: 'Click to reveal completely'
    };

    opts = Object.assign(defaults, opts || {});

    var maxBlur = opts.max;
    var partialBlur = opts.partial;
    var hintText = opts.hintText;

    var processElement = function(index) {
      var el = elements[index];
      el['data-spoiler-state'] = 'shrouded';

      el.style.webkitTransition = '-webkit-filter 250ms';
      el.style.transition = 'filter 250ms';

      var applyBlur = function(radius) {
        el.style.filter = 'blur(' + radius + 'px)';
        el.style.webkitFilter = 'blur(' + radius + 'px)';
      }

      applyBlur(maxBlur);

      el.addEventListener('mouseover', function() {
        el.style.pointer = 'Cursor';
        el.title = hintText;
        if (el['data-spoiler-state'] === 'shrouded') {
          applyBlur(partialBlur);
        }
      })

      el.addEventListener('mouseout', function() {
        el.title = hintText;
        if (el['data-spoiler-state'] === 'shrouded') {
          applyBlur(maxBlur);
        }
      })

      el.addEventListener('click', function() {
        switch(el['data-spoiler-state']) {
        case 'shrouded':
          el['data-spoiler-state'] = 'revealed';
          el.title = '';
          el.style.cursor = 'auto';
          applyBlur(0);
          break;
        default:
          el['data-spoiler-state'] = 'shrouded';
          el.title = hintText;
          el.style.cursor = 'pointer';
          applyBlur(maxBlur);
        }
      })
    }

    for (var i = 0; i !== elements.length; i++) {
      processElement(i);
    }
  }
})();
