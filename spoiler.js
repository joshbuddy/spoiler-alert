(function ($) {
  var browser = {}
  browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
  browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
  browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
  browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
  browser.msieVer = /msie ([0-9.]+)/.exec(navigator.userAgent.toLowerCase());
  browser.msieVer =
    browser.msieVer.length <= 1 ?
    "" :
    browser.msieVer[1];

  $.fn.spoilerAlert = function(opts) {
    if (!opts) opts = {}
    var maxBlur = opts.max || 10
    var partialBlur = opts.partial || 6

    $(this).each(function() {
      var $spoiler = $(this)
      $spoiler.data('state', 'shrouded')

      var animationTimer = null
      var step = 0

      var cancelTimer = function() {
        if (animationTimer) {
          clearTimeout(animationTimer)
          animationTimer = null
        }
      }

      var applyBlur = function() {
        var radius = maxBlur - step
        if (browser.msie) {
            var adjustment = "-" + radius + "px";
            $spoiler.css("margin-top", adjustment);
            $spoiler.css("margin-bottom", radius + "px");
            $spoiler.css("margin-left", adjustment);
            $spoiler.css("margin-right", radius + "px");

            var filterValue =
                !radius ?
                "" :
                browser.msieVer == "9.0" ?
                "progid:DXImageTransform.Microsoft.Blur(pixelradius=" + radius + ")" :
                "url(filter.svg#blur)";
            $spoiler.css("display", "inline-block");
            $spoiler.css("filter", filterValue);
        } else if (browser.mozilla) {
          var filterValue = radius > 0 ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='blur'><feGaussianBlur stdDeviation='" + radius + "' /></filter></svg>#blur\")" : ''
          $spoiler.css('filter', filterValue)
        } else {
          var filterValue = radius > 0 ? 'blur('+radius+'px)' : ''
          $spoiler.css('filter', filterValue)
          $spoiler.css('-webkit-filter', filterValue)
          $spoiler.css('-moz-filter', filterValue)
          $spoiler.css('-o-filter', filterValue)
          $spoiler.css('-ms-filter', filterValue)
        }
      }

      var reveal = function() {
        cancelTimer()
        var finalStep = $spoiler.data('state') == 'shrouded' ? (maxBlur - partialBlur) : maxBlur
        if (step < finalStep) {
          step++
          applyBlur()
          animationTimer = setTimeout(reveal, 10)
        }
      }

      var shroud = function() {
        cancelTimer()
        if (step > 0) {
          step--
          applyBlur()
          animationTimer = setTimeout(shroud, 10)
        }
      }
      applyBlur()

      $(this).on('mouseover', function(e) {
        if ($spoiler.data('state') == 'shrouded') reveal()
      })
      $(this).on('mouseout', function(e) {
        if ($spoiler.data('state') == 'shrouded') shroud()
      })
      $(this).on('click', function(e) {
        $spoiler.data('state', $spoiler.data('state') == 'shrouded' ? 'revealed' : 'shrouded')
        $spoiler.data('state') == 'shrouded' ? shroud() : reveal()
      })
    })

  };
})( jQuery );