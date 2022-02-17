import { getByRole, queryByRole, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { nanoid } from 'nanoid';
import type { ToastOptions, ToastReturn } from '../src/index';
import Toast, { toast } from '../src/index';

jest.useFakeTimers();

const className = 'lets-toast';

beforeEach(() => {
  document.body.innerHTML = `
    <button data-testid="init">Init Toast</button>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
});

function getList() {
  return screen.getByRole('list') as HTMLUListElement;
}

function init(func: ToastReturn, options: ToastOptions = {}) {
  const id = nanoid();
  const initButton = screen.getByTestId('init');
  const callback = () => {
    func(id, options);
  };
  initButton.addEventListener('click', callback);
  userEvent.click(initButton);
  initButton.removeEventListener('click', callback);
  return {
    ul: getList(),
    li: screen.getByText(id).closest('li') as HTMLLIElement,
  };
}

test('Dismiss text', () => {
  const { li } = init(toast, { dismiss: 'dismiss', dismissible: true });
  const buttonText = getByRole(li, 'button').textContent;
  expect(buttonText).toBe('dismiss');
});

test('Dismissible', () => {
  const { li } = init(toast, { dismissible: true });
  const button = queryByRole(li, 'button');
  expect(button).toBeTruthy();
});

test('Not dismissible', () => {
  const { li } = init(toast, { dismissible: false });
  const button = queryByRole(li, 'button');
  expect(button).toBeFalsy();
});

test('Horizontal position', () => {
  const { ul } = init(toast, { hPos: 'right' });
  expect(ul).toHaveClass(`${className}--hpos-right`);
});

test('Newest at top with `vpos` top', () => {
  const toastFunc = Toast({ vPos: 'top', newestAtTop: true });
  init(toastFunc);
  const { li: secondLi } = init(toastFunc);
  const ul = getList();
  expect(ul.children[0]).toBe(secondLi);
});

test('Newest at top with `vpos` bottom', () => {
  const toastFunc = Toast({ vPos: 'bottom', newestAtTop: true });
  init(toastFunc);
  const { li: secondLi } = init(toastFunc);
  const ul = getList();
  expect(ul.children[1]).toBe(secondLi);
});

test('Newest at bottom with `vpos` top', () => {
  const toastFunc = Toast({ vPos: 'top', newestAtTop: false });
  init(toastFunc);
  const { li: secondLi } = init(toastFunc);
  const ul = getList();
  expect(ul.children[1]).toBe(secondLi);
});

test('Newest at bottom with `vpos` bottom', () => {
  const toastFunc = Toast({ vPos: 'bottom', newestAtTop: false });
  init(toastFunc);
  const { li: secondLi } = init(toastFunc);
  const ul = getList();
  expect(ul.children[0]).toBe(secondLi);
});

test('Severity', () => {
  const { li } = init(toast, { severity: 'warning' });
  expect(li).toHaveClass(`${className}__item--warning`);
});

test('Vertical position', () => {
  const { ul } = init(toast, { vPos: 'bottom' });
  expect(ul).toHaveClass(`${className}--vpos-bottom`);
});

test('Dismiss button dismisses notification and list is removed', () => {
  const { li } = init(toast, { dismissible: true });
  const button = getByRole(li, 'button');
  userEvent.click(button);
  const ul = screen.queryByRole('list');
  expect(ul).toBe(null);
});

test('Dismiss button dismisses notification and list remains', () => {
  const toastFunc = Toast({ dismissible: true });
  init(toastFunc);
  const { li } = init(toastFunc);
  const button = getByRole(li, 'button');
  userEvent.click(button);
  const ul = screen.queryByRole('list');
  expect(ul).not.toBe(null);
});

test('Dismissed after delay', () => {
  init(toast, { delay: 4000 });
  jest.runAllTimers();
  const li = screen.queryByRole('listitem');
  expect(li).toBe(null);
});

test('Not dismissed if delay is 0', () => {
  init(toast, { delay: 0 });
  jest.runAllTimers();
  const li = screen.queryByRole('listitem');
  expect(li).toBeTruthy();
});
