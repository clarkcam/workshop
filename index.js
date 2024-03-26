const COHORT = "2401-ftb-et-web-pt";

const API = " https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT;

const state = {
    events: [],
    event: null,
  };

//get elements
const $form = document.querySelector("form");
const $eventList = document.querySelector("#eventList");
let $deleteButton = $eventList.getElementsByClassName("delete");

const $eventName = document.querySelector("#eventName");
const $eventDesc = document.querySelector("#eventDesc");
const $eventDateTime = document.querySelector("#eventDateTime");
const $eventLocation = document.querySelector("#eventLocation");

//add event when form is submitted
$form.addEventListener('submit', newEvent);


getEvents();
renderEventList();

//get events from the API
async function getEvents() {
    try {
    const response = await fetch(API +"/events");
    const json = await response.json();
    
    //check for errors
    if(json.error){
        throw new Error("Error getting data from API");
        return
    }
    //update state with data from API
    state.events = json.data;
    } catch(err){
        console.error(err);
    }

    //render state
    renderEventList();
}

//add a new event from the form
async function newEvent(){
    event.preventDefault();
    // if(!$eventName.value || !$eventDesc.value || !$eventDateTime.value || !$eventLocation.value){
    //     console.log("invalid inputs");
    //     return
    // }
    // state.event = {
    //     id: state.events.length + 1,
    //     name: $eventName.value,
    //     description: $eventDesc.value,
    //     date: $eventDateTime.value,
    //     location: $eventLocation.value,
    // }
    // state.events.push(state.event);

    // $eventName.value = "";
    // $eventDesc.value = "";
    // $eventDateTime.value = null;
    // $eventLocation.value = "";
    try {
        const response = await fetch(API +"/events", {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: $eventName.value,
              description: $eventDesc.value,
              date: $eventDateTime.value,
              id: state.events.length =1,
            })
        });
    
        if(!response.ok){
          throw new Error("Failed to create new event");
        }
        render();
      } catch(error) {
        console.error(error);
      }

    renderEventList();

    return;
}

function deleteEvent(eventId) {
    console.log("start Delete")
    for(i=0; i < state.events.length; i++){
        console.log(`Deleting event ${eventId}`);
        if(state.events[i].name == eventId){
            state.events.splice(i,1);
            console.log(`Event ${eventId} deleted`);
            console.log(state.events);

        }
    }
    console.log("deleted");
    renderEventList();
}

function renderEventList(){

    const events = state.events.map(renderEvent);
    $eventList.replaceChildren(...events);

    $deleteButton = $eventList.getElementsByClassName("delete");

    for(i = 0; i < $deleteButton.length; i++){
        // $deleteButton[i].addEventListener('click', deleteEvent($deleteButton[i].getAttribute("id")));
        let buttonId = $deleteButton[i].getAttribute("id")
        $deleteButton[i].addEventListener('click', () => {deleteEvent(buttonId)});
    }

    console.log("event rendered")
}

function renderEvent(event){
    const article = document.createElement("article");
    const date = event.date.slice(0, 10);

    console.log("article ready")

    article.id = `${event.name}`
    article.innerHTML = `
    <h3>${event.name}<button class= "delete" id="${event.name}">X</button></h3>
    <time datetime="${date}">${date}</time>
    <address>${event.location}</address>
    `;

  return article;
}