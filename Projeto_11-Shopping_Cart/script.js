function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  const priceBr = price.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${priceBr}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getInfoItems(items) {
  items.forEach((element) => {
    const { id: sku, title: name, thumbnail: imageLowDefinition, price } = element;
    const image = `${imageLowDefinition.slice(0, imageLowDefinition.length - 5)}J.jpg`
    const sectionItem = createProductItemElement({ sku, name, image, price });
    const sectionProducts = document.querySelector('.items');
    sectionProducts.appendChild(sectionItem);
  });
}

async function getItemsToShow() { 
  let items = await fetchProducts('computador');
  document.querySelector('.loading').remove();
  items = items.results.slice(0, 12);
  getInfoItems(items);
}

function removeItemFromStorage(element) {
  const getLocalStorage = JSON.parse(getSavedCartItems()).reverse();
  const cartItemClassName = element.classList[1].slice(3);
  for (let index = 0; index < getLocalStorage.length; index += 1) {
    if (getLocalStorage[index].id === cartItemClassName) {
      getLocalStorage.splice(index, 1);
      break;
    }
  }
  getLocalStorage.reverse();
  saveCartItems(getLocalStorage);
}

const totalPrice = document.querySelector('.total-price');
function sumPrices(price, operation) {
  const getTotalPrice = totalPrice.innerText.replace('.', '').replace(',', '.');
  let value;
  if (operation === 'sum') {
    value = parseFloat(getTotalPrice, 10) + price;
    value = value.toLocaleString('pr-br', { minimumFractionDigits: 2 });
  } else {
    const reducingValue = parseFloat(price.replace('.', '').replace(',', '.'));
    value = parseFloat(getTotalPrice, 10) - reducingValue;
    value = value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }
  totalPrice.innerText = value;
  localStorage.setItem('price', JSON.stringify(value));
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const priceItem = event.currentTarget.parentElement.querySelector('.cart_item_price').innerText;
  sumPrices(priceItem, 'sub');
  removeItemFromStorage(event.currentTarget.parentElement);
  event.currentTarget.parentElement.remove();
}

function priceDescription(salePrice) {
  const brPrice = salePrice.toLocaleString('pt-br', {minimumFractionDigits: 2})
  const textBrCurrency = document.createElement('p');
  textBrCurrency.className = 'cart_item_br_currency';
  const textSymbol = createCustomElement('span', 'cart_item_currency_symbol', 'R$ ');
  const textPrice = createCustomElement('span', 'cart_item_price', brPrice);
  textBrCurrency.appendChild(textSymbol);
  textBrCurrency.appendChild(textPrice);
  return textBrCurrency;
}

function createCartItemNameAndPriceDescription(name, salePrice) {
  const divTextDescription = document.createElement('div');
  divTextDescription.className = 'div_cart_description';
  const textName = createCustomElement('p', 'cart_item_description', name);
  const textBrCurrency = priceDescription(salePrice);
  divTextDescription.appendChild(textName);
  divTextDescription.appendChild(textBrCurrency);
  return divTextDescription;
}

function createCartRemoveItemDescription() {
  const divRemoveItem = document.createElement('div');
  divRemoveItem.className = 'div_remove_cart_item';
  const removeItem = createCustomElement('p', 'remove_cart_item', 'x');
  divRemoveItem.appendChild(removeItem);
  return divRemoveItem;
}

function createCartImageDescription(image) {
  const divImage = document.createElement('div');
  divImage.className = 'div_cart_image';
  const img = document.createElement('img');
  img.src = image;
  divImage.appendChild(img);
  return divImage;
}

function createCartItemDescription(name, salePrice, image) {
  const divImage = createCartImageDescription(image);
  const divTextDescription = createCartItemNameAndPriceDescription(name, salePrice);
  const divRemoveItem = createCartRemoveItemDescription();
  return { divImage, divTextDescription, divRemoveItem };
}

function createCartItemElement({ name, salePrice , image, id }) {
  const li = document.createElement('li');
  li.className = `cart__item id_${id}`;
  const { divImage, divTextDescription, divRemoveItem } = createCartItemDescription(name, salePrice, image);
  li.appendChild(divImage);
  li.appendChild(divTextDescription);
  li.appendChild(divRemoveItem);
  divRemoveItem.addEventListener('click', cartItemClickListener);
  return li;
}

function saveItemsAtStorage(item) {
  let savedItems = JSON.parse(localStorage.getItem('cartItems'));
  if (savedItems === null) savedItems = [];
  savedItems.push(item);
  saveCartItems(savedItems);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const cartItems = document.querySelector('.cart__items');
async function addItemToCart(event) {
  const id = getSkuFromProductItem(event.target.parentElement);
  const getInfoItem = await fetchItem(id);
  const { title: name, price: salePrice, secure_thumbnail: image } = getInfoItem;
  saveItemsAtStorage({ name, salePrice, image, id });
  sumPrices(salePrice, 'sum');
  const itemToCart = createCartItemElement({ name, salePrice, image, id });
  cartItems.appendChild(itemToCart);
}

const emptyCartBtn = document.querySelector('.empty-cart');
function emptyCartFunction() {
  const cartItemsChildren = cartItems.children;
  for (;cartItemsChildren.length > 0;) {
    cartItemsChildren[0].remove();
  }
  localStorage.clear();
  totalPrice.innerText = '0,00';
}
emptyCartBtn.addEventListener('click', emptyCartFunction);

function loadSavedItemsAtStorage(createItem, cart) {
  const savedItems = JSON.parse(getSavedCartItems());
  if (savedItems === null) return null;
  savedItems.forEach((element) => {
    const item = createItem(element);
    cart.appendChild(item);
  });
}

function getPriceATStorage() {
  const priceAtStorage = JSON.parse(localStorage.getItem('price'));
  if (priceAtStorage !== null) {
    totalPrice.innerText = priceAtStorage;
  }
}

function addEventToButtons() {
  const buttons = Array.from(document.getElementsByClassName('item__add'));
  buttons.forEach((element) => element.addEventListener('click', addItemToCart));
}

window.onload = async () => {
  await getItemsToShow();
  loadSavedItemsAtStorage(createCartItemElement, cartItems);
  getPriceATStorage();
  addEventToButtons();
}
