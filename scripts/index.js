const initialCards = [
  {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
  {name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
  {name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
  {name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
  {name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
  {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"}
];

//Modal Functionality
const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");

function openModal() {
  editModal.classList.add("modal_opened");
  getModalInputs();
  //console.log("visible");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
  //console.log("hidden");
}

//Edit and Update Profile
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

function getModalInputs() {

nameInput.value = profileNameElement.textContent;
jobInput.value = profileJobElement.textContent;
}

const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  editModal.classList.remove("modal_opened");
}


//Event Listeners
profileEditButton.addEventListener("click", openModal);
editModalCloseButton.addEventListener("click", closeModal);
profileFormElement.addEventListener("submit", handleProfileFormSubmit,true);



//Build cards
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

function getCardElement(data){
  let cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  cardElement .querySelector(".card__image").setAttribute("src", data.link);
  cardElement .querySelector(".card__image").setAttribute("alt", data.name);
  cardElement .querySelector(".card__title").textContent = data.name;
  return cardElement
}

function generateCards(){

for(let i = 0; i <= (initialCards.length-1); i++){

  //console.log(newCard);
  let newCard = getCardElement(initialCards[i]);
  cardsList.appendChild(newCard);

}

}

generateCards()