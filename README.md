# lets-toast

Simple, customizable toast notifications

This module is meant to provide basic "toast" functionality, that lets you customize it to your liking by easily [overriding its CSS classes](https://github.com/onosendi/lets-toast/blob/master/example/styles.css).

## Install
```
npm install --save lets-toast
```

## Usage
Instantiate with options
```js
import Toast, { toast } from 'lets-toast';

const toast = Toast({
  severity: 'success',
});

toast('Success message');
```
