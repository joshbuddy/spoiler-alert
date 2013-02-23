$(function() {
  $('spoiler, .spoiler').each(function() {
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

    var applyShadow = function() {
      var radius = 10 - step
      var blur = null
      if (radius > 0) blur = "blur(" + radius + "px)"
      $spoiler.css('filter', blur)
      $spoiler.css('-webkit-filter', blur)
      $spoiler.css('-moz-filter', blur)
      $spoiler.css('-o-filter', blur)
      $spoiler.css('-ms-filter', blur)
    }

    var reveal = function() {
      cancelTimer()
      var finalStep = $spoiler.data('state') == 'shrouded' ? 6 : 10
      if (step < finalStep) {
        step++
        applyShadow()
        animationTimer = setTimeout(reveal, 10)
      }
    }

    var shroud = function() {
      cancelTimer()
      if (step > 0) {
        step--
        applyShadow()
        animationTimer = setTimeout(shroud, 10)
      }
    }
    applyShadow()

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
})
