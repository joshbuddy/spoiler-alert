# SPOILER ALERT!

Do you ever have spoilers and wish you could have them on your page in a way that wasn't annoying? With spoiler alert you can! Hide any text with a bit of blurriness. Clicking reveals. Mouseover gives you a taste.

Should work on images and text.

## Usage

To make your site spoiler free, simply include spoiler.js, then, add this somewhere:

```javascript
$('spoiler, .spoiler').spoilerAlert()
```

To control the maximum and partial blurs, you can pass arguments:

```javascript
$('spoiler, .spoiler').spoilerAlert({max: 10, partial: 4})
```

Have fun! Play with it! (but don't go over 10 .. this plugin explicitly does not go to 11)

## Demo

Take a look at [this](http://htmlpreview.github.com/?https://github.com/joshbuddy/spoiler-alert/blob/master/test.html) to see it in action!

## Tested browsers

* Chrome
* Safari
* Firefox
* Mobile Safari
