const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" }
];

//Build cards
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardElement.querySelector(".card__title").textContent = data.name;
  return cardElement
}

function generateCards() {
  initialCards.forEach(card => {
    cardsList.appendChild(getCardElement(card));
  });
}

function addNewCardToScreen(){
  cardsList.append(getCardElement(initialCards[(initialCards.length - 1)]));
}

generateCards()

/*-----------------------------------------------------------------------------------*/

//Modal Functionality
function openModal(modal) {
  modal.classList.add("modal_opened");
  fillProfileInputs();
  //console.log("visible");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  //console.log("hidden");
}

/*-----------------------------------------------------------------------------------*/

//Edit and Update Profile
const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");

//Selecting name and job elements
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

function fillProfileInputs() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

const profileFormElement = editModal.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editModal);
}

/*-----------------------------------------------------------------------------------*/

//Add Card Modal
const newPostButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close-btn");

//Getting new card link and caption
const cardLink = addCardModal.querySelector("#add-card-link-input");
const cardCaption = addCardModal.querySelector("#add-card-caption-input");

//Append new cards to array
function addNewCardToArray(cardCap, cardUrl){
  const newCardObject = {name:cardCap, link:cardUrl};
  initialCards.push(newCardObject);
}

const addCardFormElement = addCardModal.querySelector(".modal__form");

function handleAddCardFormSubmit(evt){
  evt.preventDefault();
  addNewCardToArray(cardCaption.value, cardLink.value);
  addNewCardToScreen();
  closeModal(addCardModal);
}
/*-----------------------------------------------------------------------------------*/

//Event Listeners
profileEditButton.addEventListener("click", () => openModal(editModal));
editModalCloseButton.addEventListener("click", () => closeModal(editModal));
newPostButton.addEventListener("click", () =>  openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
profileFormElement.addEventListener("submit", handleProfileFormSubmit, true);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit, true);
