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

  //Add Like-Button Event Listener
  const newCardLikeBtn = cardElement.querySelector("#like-btn");
  newCardLikeBtn.addEventListener("click", handleLikeButtonClick, true);

  //Add Delete-Button Event Listener
  const newCardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  newCardDeleteBtn.addEventListener("click", handleDeleteButtonClick, true);

  //Add Preview-Modal Event Listener
  cardImage.addEventListener("click",handleImagePreviewModal, true);

  return cardElement
}

function generateCards() {
  initialCards.forEach(card => {
    addNewCardToScreen(card);
  });
}

generateCards()

/*-----------------------------------------------------------------------------------*/

function handleEscape(evt){
  if(evt.key === "Escape"){
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleOverlay(evt) {
  if(evt.target.id.includes("modal")){
    closeModal(evt.target);
  }
}

//Modal Functionality
function openModal(modal) {
  modal.classList.add("modal_opened");

  //Close modal on Escape Keydown
  window.addEventListener("keydown", handleEscape, false);

  //Close modal on Click outside modal container
  modal.addEventListener("click", handleOverlay,false);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  window.removeEventListener("keydown", handleEscape, false);
  modal.removeEventListener("click", handleOverlay, false);
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

const profileFormElement = editModal.querySelector(".modal__form");

function fillProfileInputs() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;

  //Reset Validation on open in case bad values were given previously
  resetValidation(profileFormElement, [nameInput, jobInput]);
}

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
  cardsList.prepend(getCardElement(cardObject));
}

const addCardFormElement = addCardModal.querySelector(".modal__form");

function handleAddCardFormSubmit(evt){
  evt.preventDefault();
  const newCardObject = {name: cardCaption.value, link: cardLink.value};
  evt.target.reset();
  const cardSubmitButton = evt.target.querySelector(settings.submitButtonSelector);
  disableButton(cardSubmitButton, settings);
  addNewCardToScreen(newCardObject);
  closeModal(addCardModal);

}
/*-----------------------------------------------------------------------------------*/


//Add red heart icon to post
function likePost(button){
  button.classList.add("card__like-btn__active");
}

//Remove red heart icon from post
function unlikePost(button){
  button.classList.remove("card__like-btn__active");
}

//Like button event handler
function handleLikeButtonClick(evt){
  evt.preventDefault();
  evt.target.classList.toggle("card__like-btn__active");
}

/*-----------------------------------------------------------------------------------*/

//Gets button from click access parent element and removes from DOM
function handleDeleteButtonClick(evt){
  evt.preventDefault();
  const clickedButton = evt.target;
  const cardElementToDelete = clickedButton.closest(".card");
  //console.log(cardElementToDelete);
  cardElementToDelete.remove();
}

/*-----------------------------------------------------------------------------------*/

//Preview Modal Functionality
const imagePreviewModal = document.querySelector("#preview-modal")
const imageElementOfModal = imagePreviewModal.querySelector(".modal__image");
const textElementOfModal = imagePreviewModal.querySelector(".modal__caption");
const previewModalCloseBtn = imagePreviewModal.querySelector(".modal__close_type_preview");

function handleImagePreviewModal(evt){
  evt.preventDefault();
  const clickedImage = evt.target;
  imageElementOfModal.src = clickedImage.src;
  const cardOfImage = clickedImage.closest(".card");
  const captionText = cardOfImage.querySelector(".card__title");
  imageElementOfModal.alt = captionText.textContent;
  textElementOfModal.textContent = captionText.textContent;
  openModal(imagePreviewModal);
}
/*-----------------------------------------------------------------------------------*/

//Modal UX features for closing
function closeOnEscape(evt) {
  console.log(evt);
}




//Event Listeners
profileEditButton.addEventListener("click", () => {openModal(editModal);fillProfileInputs();});
editModalCloseButton.addEventListener("click", () => closeModal(editModal));
newPostButton.addEventListener("click", () =>  openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
previewModalCloseBtn.addEventListener("click", ()=> closeModal(imagePreviewModal));
profileFormElement.addEventListener("submit", handleProfileFormSubmit, true);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit, true);
