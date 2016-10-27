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

  /**
   * Converts rgb color to rgba
   * @param  {string} rgb
   * @param  {number} opacity Opacity, between 0 and 1
   * @return {string}         Color converted to rgba
   */
  function rgbToRgba(rgb, opacity) {
    return 'rgba(' + rgb.match(/\((.*)\)/)[1] + ', ' + opacity + ')';
  }

  /**
   * Detect support for CSS Filters.
   * From: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/filters.js
   * @return {boolean}
   */
  function areCSSFiltersSupported() {
    var el = document.createElement('a');
    el.style.cssText = 'filter:blur(2px); ';
    return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
  }

  var cssFilterSupport = areCSSFiltersSupported();

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
      el['data-original-color'] = window.getComputedStyle(el).getPropertyValue('color');

      if(cssFilterSupport) {
        el.style.webkitTransition = '-webkit-filter 250ms';
        el.style.transition = 'filter 250ms';
      } else {
        el.style.color = 'transparent';
        var rgbaColor = rgbToRgba(el['data-original-color'], 0.5);
        el.style.textShadow = '0 0 5px ' + rgbaColor;
      }

      var applyBlur = function(radius) {
        if(cssFilterSupport) {
          el.style.filter = 'blur('+radius+'px)';
          el.style.webkitFilter = 'blur('+radius+'px)';
        } else {
          if(radius === 0) {
            el.style.color = el['data-original-color'];
          } else if(radius === maxBlur) {
            el.style.color = 'transparent';
          }

          var rgbaColor = rgbToRgba(el['data-original-color'], 0.5);
          el.style.textShadow = '0 0 ' + radius * 2 + 'px ' + rgbaColor;
        }
      }

      applyBlur(maxBlur);

      el.addEventListener('mouseover', function(e) {
        el.style.pointer = 'Cursor';
        el.title = hintText;
        if (el['data-spoiler-state'] === 'shrouded') applyBlur(partialBlur);
      })

      el.addEventListener('mouseout', function(e) {
        el.title = hintText;
        if (el['data-spoiler-state'] === 'shrouded') applyBlur(maxBlur);
      })

      el.addEventListener('click', function(e) {
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

    for (var i = 0; i !== elements.length; i++) processElement(i);
  }
})();
