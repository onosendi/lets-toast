import type { ToastSeverities } from 'lets-toast';
import toast from './toast';

function getRandom(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

const words = [
  'et dolor enim',
  'earum rerum vel',
  'et ut quae',
  'modi quos repudiandae',
  'et asperiores recusandae',
  'nesciunt aut iusto',
  'modi ea consequatur',
  'sunt deleniti qui',
  'suscipit ex aut',
  'numquam eveniet qui',
  'aspernatur consequuntur natus',
  'asperiores dolores id',
  'eius aperiam quia',
  'voluptatibus molestias hic',
  'et adipisci et',
  'explicabo saepe ab',
  'ratione ea velit',
  'in in explicabo',
  'error qui similique',
  'quia similique aliquam',
];

const severities = ['error', 'info', 'success', 'warning'];

document.querySelector('[data-toast-button]')?.addEventListener('click', () => {
  toast(
    getRandom(words),
    { severity: getRandom(severities) as ToastSeverities },
  );
});
