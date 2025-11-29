import { enableValidation, validationConfig, resetValidation, disableButton} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/api.js";

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4a3c1700-c949-4ac5-9329-48c898326049",
    "Content-Type": "application/json"
  }
});


api.getAppInfo()
.then(([cards, userInfo])=>{
  //Card posts production
  //HOW SHOULD THESE BE ORDERED NEWEST FIRST OR LAST?
  cards.forEach((card) =>{
    addNewCardToScreen(card)
  })

  //User info production
  console.log(userInfo)
  profileNameElement.textContent = userInfo.name
  profileJobElement.textContent = userInfo.about
  profilePicture.src = userInfo.avatar


})
.catch(err =>{
  console.log(err)
});

// const initialCards = [
//   { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
//   { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
//   { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
//   { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
//   { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
//   { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" }
// ];

//Build cards
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

function getCardElement(data) {
  //console.log(data)
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardElement.querySelector(".card__title").textContent = data.name;

  //Add Like-Button Event Listener
  const newCardLikeBtn = cardElement.querySelector("#like-btn");
  if (data.isLiked) {
    newCardLikeBtn.classList.toggle("card__like-btn__active");
  }
  newCardLikeBtn.addEventListener("click", (evt) => handleLikeButtonClick(newCardLikeBtn,data._id),true);

  //Add Delete-Button Event Listener
  const newCardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  newCardDeleteBtn.addEventListener("click", (evt) => handleDeleteButtonClick(cardElement,data._id),true);

  //Add Preview-Modal Event Listener
  cardImage.addEventListener("click",handleImagePreviewModal, true);

  return cardElement
}

// function generateCards() {
//   initialCards.forEach(card => {
//     addNewCardToScreen(card);
//   });
// }

// generateCards()

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
const editModalSubmitBtn = editModal.querySelector(".modal__submit-btn");


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
  editModalSubmitBtn.textContent = "Saving...";
  evt.preventDefault();
  api.editUserInfo(nameInput.value,jobInput.value)
  .then(data => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    editModalSubmitBtn.textContent = "Save";
    closeModal(editModal);
  })
  .catch(err => console.log(err));
  
}

/*-----------------------------------------------------------------------------------*/

//Add Card Modal
const newPostButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardModalSubmitBtn = addCardModal.querySelector(".modal__submit-btn");

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
  addCardModalSubmitBtn.textContent = "Saving..."
  api.addNewCard(cardCaption.value, cardLink.value)
  .then(obj =>{
    console.log(obj)
    const newCardObject = {name: cardCaption.value, link: cardLink.value,_id: obj._id};
    evt.target.reset();
    const cardSubmitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
    disableButton(cardSubmitButton, validationConfig);
    addNewCardToScreen(newCardObject);
    addCardModalSubmitBtn.textContent = "Save"
    closeModal(addCardModal);
  })
  .catch(err => console.log(err));
  // const newCardObject = {name: cardCaption.value, link: cardLink.value};
  // evt.target.reset();
  // const cardSubmitButton = evt.target.querySelector(validationConfig.submitButtonSelector);
  // disableButton(cardSubmitButton, validationConfig);
  // addNewCardToScreen(newCardObject);
  // closeModal(addCardModal);

}
/*-----------------------------------------------------------------------------------*/


//Add red heart icon to post
// function likePost(button){
//   button.classList.add("card__like-btn__active");
// }

//Remove red heart icon from post
// function unlikePost(button){
//   button.classList.remove("card__like-btn__active");
// }

//Like button event handler
function handleLikeButtonClick(likeBtn, id){
  
  api.toggleLike(!likeBtn.classList.contains("card__like-btn__active"),id)
  .then((obj) => {
    //console.log(obj);
    likeBtn.classList.toggle("card__like-btn__active");
  })
  .catch(console.error)

  
}

/*-----------------------------------------------------------------------------------*/

//Delete Image Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCancelBtn = deleteModal.querySelector(".modal__cancel-btn")
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close");
const deleteModalFormElement = deleteModal.querySelector(".modal__form");
const deleteModalSubmitBtn = deleteModal.querySelector(".modal__delete-btn");

let cardElementToDelete = null;
let cardElementToDeleteId = null;

//Gets button from click access parent element and removes from DOM
function handleDeleteButtonClick(cardElement,cardId){
  //console.log(cardElement);
  //console.log(data);
  //console.log(evt);
  
  cardElementToDelete = cardElement;
  cardElementToDeleteId = cardId;
  openModal(deleteModal);
}

function handleDeleteCardFormSubmit(evt){
  evt.preventDefault();
  deleteModalSubmitBtn.textContent = "Deleting...";
  api.deleteCard(cardElementToDeleteId).then(obj =>{
    cardElementToDelete.remove();
    cardElementToDelete = null;
    cardElementToDeleteId = null;
    deleteModalSubmitBtn.textContent = "Delete";
    closeModal(deleteModal);
  }).catch(console.error);

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

//Edit Avatar Modal
const profileAvatar = document.querySelector(".profile__avatar");
const profilePicture = profileAvatar.querySelector(".profile__avatar-img");
const editAvatarBtn = profileAvatar.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#profile-avatar-modal");
const editAvatarFormElement = editAvatarModal.querySelector(".modal__form");
const editAvatarModalCloseBtn = editAvatarModal.querySelector(".modal__close");
const editAvatarModalSubmitBtn = editAvatarBtn.querySelector(".modal__submit-btn");

function handleEditAvatarFormSubmit(evt){
  evt.preventDefault();
  const editAvatarFormInput = editAvatarFormElement.querySelector("#profile-avatar-input");
  //console.log(editAvatarFormInput.value);
  editAvatarModalSubmitBtn.textContent = "Saving...";
  api.editUserAvatar(editAvatarFormInput.value)
  .then(obj =>{
    profilePicture.src = editAvatarFormInput.value;
    evt.target.reset();
    const editAvatarModalSubmitBtn = evt.target.querySelector(validationConfig.submitButtonSelector);
    disableButton(editAvatarModalSubmitBtn, validationConfig);
    editAvatarModalSubmitBtn.textContent = "Save";
    closeModal(editAvatarModal);
  })

  
}
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/

//Modal UX features for closing
function closeOnEscape(evt) {
  console.log(evt);
}




//Event Listeners
profileEditButton.addEventListener("click", () => {openModal(editModal);fillProfileInputs();});
newPostButton.addEventListener("click", () =>  openModal(addCardModal));
editAvatarBtn.addEventListener("click", ()=> openModal(editAvatarModal));


editModalCloseButton.addEventListener("click", () => closeModal(editModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
previewModalCloseBtn.addEventListener("click", ()=> closeModal(imagePreviewModal));
editAvatarModalCloseBtn.addEventListener("click", ()=> closeModal(editAvatarModal));
deleteModalCancelBtn.addEventListener("click", ()=>closeModal(deleteModal));
deleteModalCloseBtn.addEventListener("click", ()=>closeModal(deleteModal));

profileFormElement.addEventListener("submit", handleProfileFormSubmit, true);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit, true);
editAvatarFormElement.addEventListener("submit", handleEditAvatarFormSubmit, true);
deleteModalFormElement.addEventListener("submit", handleDeleteCardFormSubmit, true);

enableValidation(validationConfig);