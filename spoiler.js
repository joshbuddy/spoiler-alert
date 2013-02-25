(function( $ ) {
  $.fn.spoilerAlert = function(opts) {
    if (!opts) opts = {}
    var maxBlur = opts.max || 10
    var partialBlur = opts.partial || 6

    var browser = {}
    browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    $(this).each(function() {
      var $spoiler = $(this)
      $spoiler.data('spoiler-state', 'shrouded')

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
          alert("WARNING, this site contains spoilers!")
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
        var finalStep = $spoiler.data('spoiler-state') == 'shrouded' ? (maxBlur - partialBlur) : maxBlur
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
        if ($spoiler.data('spoiler-state') == 'shrouded') reveal()
      })
      $(this).on('mouseout', function(e) {
        if ($spoiler.data('spoiler-state') == 'shrouded') shroud()
      })
      $(this).on('click', function(e) {
        $spoiler.data('spoiler-state', $spoiler.data('spoiler-state') == 'shrouded' ? 'revealed' : 'shrouded')
        $spoiler.data('spoiler-state') == 'shrouded' ? shroud() : reveal()
      })
    })

  };
})( jQuery );
