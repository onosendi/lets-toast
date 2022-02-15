export type ToastHorizontalPositions = 'left' | 'center' | 'right';
export type ToastVerticalPositions = 'top' | 'center' | 'bottom';
export type ToastSeverities = 'error' | 'info' | 'success' | 'warning';

export interface ToastOptions {
  delay?: number;
  dismiss?: string;
  dismissible?: boolean;
  hPos?: ToastHorizontalPositions;
  newestAtTop?: boolean;
  severity?: ToastSeverities;
  vPos?: ToastVerticalPositions;
}

const className = 'lets-toast';

const defaultOptions: Required<ToastOptions> = {
  delay: 3000,
  dismiss: '',
  dismissible: true,
  hPos: 'center',
  newestAtTop: true,
  severity: 'info',
  vPos: 'top',
};

function removeListItem(
  ul: HTMLUListElement,
  li: HTMLLIElement,
) {
  li.remove();
  const listItems = ul.querySelector('li');
  if (!listItems) {
    ul.remove();
  }
}

export type ToastReturn = (
  message: string,
  options?: ToastOptions,
) => void;

function Toast(initOptions: ToastOptions = {}): ToastReturn {
  return (message, options) => {
    const opts = { ...defaultOptions, ...initOptions, ...options };

    let ul = document.querySelector('[data-toast]') as HTMLUListElement;
    if (!ul) {
      ul = document.createElement('ul');
      ul.dataset.toast = '';
      ul.classList.add(className);
      ul.classList.add(`${className}--vpos-${opts.vPos}`);
      ul.classList.add(`${className}--hpos-${opts.hPos}`);
    }

    const li: HTMLLIElement = document.createElement('li');
    li.classList.add(`${className}__item`);
    li.classList.add(`${className}__item--${opts.severity}`);

    const p: HTMLParagraphElement = document.createElement('p');
    p.classList.add(`${className}__text`);
    const text = document.createTextNode(message);
    p.append(text);

    li.append(p);

    if (opts.dismissible) {
      const button: HTMLButtonElement = document.createElement('button');
      button.classList.add(`${className}__dismiss`);
      button.setAttribute('type', 'button');
      const buttonText = document.createTextNode(opts.dismiss);
      button.append(buttonText);
      button.addEventListener('click', () => {
        removeListItem(ul, li);
      });
      li.appendChild(button);
    }

    const newestAtTop = ['top', 'center'].includes(opts.vPos)
      ? opts.newestAtTop
      : !opts.newestAtTop;
    if (newestAtTop) {
      ul.insertBefore(li, ul.childNodes[0]);
    } else {
      ul.appendChild(li);
    }

    if (opts.delay > 0) {
      setTimeout(() => {
        removeListItem(ul, li);
      }, opts.delay);
    }

    document.body.appendChild(ul);
  };
}

const toast = Toast();

export { className, toast };
export default Toast;
