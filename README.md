# spoiler-alert

> A bit of javascript that hides copy and images with a bit of SVG blur. Don't be a spoiler. Taste on mouseover. Eat on click.

Do you publish spoilers? Do you wish you could have them on your page in a way that wasn't fucking rude? With Spoiler Alert! you can! Hide spoilers with a bit of blur.

## Demo

Take a look at the [demo](http://joshbuddy.github.com/spoiler-alert/) to see it in action!

## Usage

To make your site spoiler free, first include `spoiler.js`:

```html
<script src="spoiler.js"></script>
```

Now, let's hide some spoilers!

```js
spoilerAlert('spoiler, .spoiler');
```

To control the maximum and partial blurs, you can pass arguments:

```js
spoilerAlert('spoiler, .spoiler', {
  max: 10,
  partial: 4
});
```

See the `example/` for details.

## API

```js
spoilerAlert(selector);
```

Call the `spoilerAlert` function to blur your spoilers.

Selector can be any valid CSS selector. Anything you can pass to `document.querySelectorAll`, you can pass here.

```js
spoilerAlert(selector, options);
```

You can pass the options object to control how `spoilerAlert` unspoils spoilers. Here is a list of options you can set and their defaults:

```js
spoilerAlert('.spoiler', {
  max: 4,
  partial: 2,
  hintText: 'Click to reveal completely'
})
```

- ***max*** (Number) - Blur that will be applied to hide spoilers.
- ***partial*** (Number) - When you mouseover a spoiler, it will unblur to `partial` blur.
- ***hintText*** (String) - Text that will be set as the `title` attribute of spoilers. So that when you mouseover a spoiler, and want to reveal it, the title will appear and tell you what to do.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install spoiler-alert
```

## Other info

SpoilerAlert works by using [CSS SVG Blur Filter](https://css-tricks.com/almanac/properties/f/filter/), like so:

```js
el.style.transition = 'filter 250ms';
el.style.webkitFilter = 'blur('+radius+'px)';
```

SpoilerAlert was tested in: ***Chrome***, ***Safari***, ***Firefox*** and ***Mobile Safari***.

## License

MIT

