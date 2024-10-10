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
const editModalCloseButton = editModal.querySelector(".modal__close");

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
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");

//Getting new card link and caption
const cardLink = addCardModal.querySelector("#add-card-link-input");
const cardCaption = addCardModal.querySelector("#add-card-caption-input");

//Add card to Screen
function addNewCardToScreen(cardObject){
  cardsList.appendChild(getCardElement(cardObject));
}

const addCardFormElement = addCardModal.querySelector(".modal__form");

function handleAddCardFormSubmit(evt){
  evt.preventDefault();
  const newCardObject = {name: cardCaption.value, link: cardLink.value};
  addNewCardToScreen(newCardObject);
  const allCards = cardsList.querySelectorAll(".card");
  const newCard = allCards[allCards.length - 1]

  //Add Like-Button Event Listener
  const newCardLikeBtn = newCard.querySelector("#like-btn");
  newCardLikeBtn.addEventListener("click", handleLikeButtonClick, true);

  //Add Delete-Button Event Listener
  const newCardDeleteBtn = newCard.querySelector(".card__delete-btn");
  newCardDeleteBtn.addEventListener("click", handleDeleteButtonClick, true);

  //Add Preview-Modal Event Listener
  newCardImage = newCard.querySelector(".card__image");
  newCardImage.addEventListener("click",handleImagePreviewModal, true);
  closeModal(addCardModal);
}
/*-----------------------------------------------------------------------------------*/

//Get all like buttons
const allLikeButtonElements = cardsList.querySelectorAll("#like-btn");

//Add red heart icon to post
function likePost(button){
  button.classList.remove("card__like-btn");
  button.classList.add("card__like-btn--liked");
}

//Remove red heart icon from post
function unlikePost(button){
  button.classList.remove("card__like-btn--liked");
  button.classList.add("card__like-btn");
}

//Like button event handler
function handleLikeButtonClick(evt){
  evt.preventDefault();
  const clickedButton = evt.target;
  if (clickedButton.classList.contains("card__like-btn")){
    likePost(clickedButton);
  }
  else if (clickedButton.classList.contains("card__like-btn--liked")){
    unlikePost(clickedButton);
  }
  else{
    console.log("ERROR WITH LIKE BUTTONS");
  }
}

/*-----------------------------------------------------------------------------------*/

//Delete Button Functionality
const allDeleteButtonElements = cardsList.querySelectorAll(".card__delete-btn");


//Gets button from click access parent element and removes from DOM
function handleDeleteButtonClick(evt){
  evt.preventDefault();
  const clickedButton = evt.target;
  const cardElementToDelete = clickedButton.parentElement;
  cardElementToDelete.remove();
}

/*-----------------------------------------------------------------------------------*/

//Preview Modal Functionality
const allPictureElementsFromCards = cardsList.querySelectorAll(".card__image");
const imagePreviewModal = document.querySelector("#preview-modal")
const imageElementOfModal = imagePreviewModal.querySelector(".modal__image");
const textElementOfModal = imagePreviewModal.querySelector(".modal__caption");
const modalCloseBtn = imagePreviewModal.querySelector(".modal__close_type_preview");

function handleImagePreviewModal(evt){
  evt.preventDefault();
  const clickedImage = evt.target;
  imageElementOfModal.src = clickedImage.src;
  const cardOfImage = clickedImage.parentElement;
  const captionText = cardOfImage.querySelector(".card__title");
  imageElementOfModal.alt = captionText.textContent;
  textElementOfModal.textContent = captionText.textContent;
  openModal(imagePreviewModal);
}
/*-----------------------------------------------------------------------------------*/

//Event Listeners
profileEditButton.addEventListener("click", () => openModal(editModal));
editModalCloseButton.addEventListener("click", () => closeModal(editModal));
newPostButton.addEventListener("click", () =>  openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
modalCloseBtn.addEventListener("click", ()=> closeModal(imagePreviewModal));
profileFormElement.addEventListener("submit", handleProfileFormSubmit, true);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit, true);
allLikeButtonElements.forEach(button => {
  button.addEventListener("click", handleLikeButtonClick, true);
});
allDeleteButtonElements.forEach(button => {
  button.addEventListener("click",handleDeleteButtonClick,true);
})
allPictureElementsFromCards.forEach(picture => {
  picture.addEventListener("click", handleImagePreviewModal, true);
})