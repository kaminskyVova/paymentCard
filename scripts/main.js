import { el, setChildren } from '../node_modules/redom/dist/redom.es.js';

const createElms = () => {
  const secure = el('p', { className: 'secure' }, 'Secure Checkout');
  const creditCard = el(
    'div',
    { className: 'credit-card' },
    el('span', { className: 'card__number' }, 'xxxx xxxx xxxx xxxx'),
    el(
      'div',
      { className: 'card__personal' },
      el('span', { className: 'card__name' }, 'Xxxx Xxx'),
      el('span', { className: 'card__date' }, 'xx/xx')
    )
  );

  const inputHolderWrapper = el(
    'div',
    { className: 'form__input-wrap form__input-wrap_holder' },
    el('label', { className: 'form__label form__holder-label' }, 'Card Holder'),
    el('input', { className: 'input input__holder' })
  );

  const inputNumberWrapper = el(
    'div',
    { className: 'form__input-wrap form__input-wrap_number' },
    el('label', { className: 'form__label form__number-label' }, 'Card Number'),
    el('input', { className: 'input input__number' }, { maxLength: 16 })
  );

  const inputDateWrapper = el(
    'div',
    { className: 'form__input-wrap form__input-wrap_date' },
    el('label', { className: 'form__label form__date-label' }, 'Card Expiry'),
    el('input', { className: 'input input__date' }, { maxLength: 4 })
  );

  const inputCvvWrapper = el(
    'div',
    { className: 'form__input-wrap form__input-wrap_cvv' },
    el('label', { className: 'form__label form__cvv-label' }, 'Card Cvv'),
    el('input', { className: 'input input__cvv' }, { maxLength: 3 })
  );

  const formButton = el('button', { className: 'form__button' }, {type: 'submit'}, 'CHECK OUT');

  const form = el(
    'form',
    { className: 'form' },
    inputHolderWrapper,
    inputNumberWrapper,
    inputDateWrapper,
    inputCvvWrapper,
    formButton
  );

  const card = el('div', { className: 'card' }, secure, creditCard, form);

  return el('div', { className: 'wrapper' }, card);
};

setChildren(document.body, createElms());

const formControl = () => {
  const cardNumber = document.querySelector('.card__number');
  const inputCardNumber = document.querySelector('.input__number');

  inputCardNumber.addEventListener('input', ({ target }) => {
    target.value = target.value.replace(/[^0-9]/gi, '');
    cardNumber.textContent =
      target.value.slice(0, 4) +
      ' ' +
      target.value.slice(4, 8) +
      ' ' +
      target.value.slice(8, 12) +
      ' ' +
      target.value.slice(12, 16);
    cardNumber.textContent;
  });

  const inputHolder = document.querySelector('.input__holder');
  const cardName = document.querySelector('.card__name');

  inputHolder.addEventListener('input', ({ target }) => {
    target.value = target.value.replace(/[^А-Яа-яA-Za-z/' ']/gi, '');
    cardName.textContent = target.value;
  });

  const inputDate = document.querySelector('.input__date');
  const cardDate = document.querySelector('.card__date');

  inputDate.addEventListener('input', ({ target }) => {
    target.value = target.value.replace(/[^0-9]/gi, '');
    cardDate.textContent =
      target.value.slice(0, 2) + '/' + target.value.slice(2, 4);
  });

  const inputCvv = document.querySelector('.input__cvv');
  inputCvv.addEventListener('input', ({ target }) => {
    target.value = target.value.replace(/[^0-9]/gi, '');
  });

	const form = document.querySelector('.form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const paymentData = Object.fromEntries(formData);

    console.log(paymentData);

		form.reset()
		cardNumber.textContent = 'XXXX XXXX XXXX XXXX'
		cardName.textContent = 'Xxxx Xxx'
		cardDate.textContent = 'XX/XX'

		return paymentData

  });
};

formControl();
