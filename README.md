# lets-toast

Simple, customizable toast notifications

This package is meant to provide basic "toast" functionality, that lets you customize it to your liking by easily [overriding its CSS classes](https://github.com/onosendi/lets-toast/blob/master/example/styles.css).

## Install
```
npm install --save lets-toast
```
CSS file is located at `lets-toast/build/lets-toast.min.css`.

## Usage
Create `toast` function with default options
```js
import Toast from 'lets-toast';

// This can be exported and re-used throughout your application.
const toast = Toast({

  // Delay in miliseconds. Set to 0 for non disappearing toast notifications.
  delay: 3000,
  
  // Dismiss button text. Only shown if `dismissible` is `true`.
  dismiss: 'dismiss',
  
  // Toast notifications are dismissible.
  dismissible: false,
  
  // Horizontal screen positioning (left, center, right).
  hPos: 'center',
  
  // Place new toast notifications at the top of the stack.
  // If `vPos` is set to 'bottom', new toast notifications will be placed on
  // the bottom of the stack.
  newestAtTop: true,
  
  // Toast notification severity (info, error, success, warning).
  severity: 'info',
  
  // Vertical screen positioning (top, center, bottom).
  vPos: 'top',
});

toast('My notification message');

toast('My warning notification message', {
  severity: 'warning',
});
```

Without default options
```js
import { toast } from 'lets-toast';

// Supply options per call
toast('My notification message', {
  delay: 2000,
});
```

## Customizing
See [example](https://github.com/onosendi/lets-toast/blob/master/example/styles.css).
