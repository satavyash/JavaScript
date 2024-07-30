// DOM elements
var contactFormSection = document.getElementById('contactFormSection');
var contactForm = document.getElementById('contactForm');
var contactIdField = document.getElementById('contactId');
var nameField = document.getElementById('name');
var emailField = document.getElementById('email');
var phoneField = document.getElementById('phone');
var contactList = document.getElementById('contactList');
var addContactBtn = document.getElementById('addContactBtn');
var cancelBtn = document.getElementById('cancelBtn');

// Contact storage (in-memory array)
var contacts = [];

// Helper functions
function renderContacts() {
    contactList.innerHTML = '';                    //Clears the current list of contacts.
    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var li = document.createElement('li');     // Creates a new <li> element for each contact
        li.className = 'contact-item';             
        li.innerHTML = `                            
            ${contact.name} - ${contact.email} - ${contact.phone}
            <button onclick="editContact(${i})">Edit</button>
            <button onclick="deleteContact(${i})">Delete</button>
        `;                                         //Sets the class name for styling purposes
        contactList.appendChild(li);               //Adds the new list item to the contact list in the DOM.
    }
}

// Event Listeners             // "Add Contact" button is clicked, the form is reset and shown, allowing the user to add a new contact.
addContactBtn.onclick = function() {
    contactForm.reset();        // Clears the form fields.
    contactIdField.value = '';   //Clears the hidden input, indicating a new contact is being added.
    contactFormSection.style.display = 'block';        // Makes the contact form section visible.
};

contactForm.onsubmit = function(e) {                 //Handles form submission for both adding and editing contacts. It prevents the default form submission, collects data from the form, and updates the contacts array accordingly
    e.preventDefault();   //Prevents the default form submission behavior, which would refresh the page.
    var contact = {      //Created a new contact object with data from the form fields.
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value
    };
    if (contactIdField.value === '') {    //Checks if a new contact is being added or an existing one is being edited.
        contacts.push(contact);           //add anew contacts
    } else {
        contacts[contactIdField.value] = contact;   //update the existng contactS
    }
    renderContacts();                   //will refresh the list
    contactFormSection.style.display = 'none'; //save conatcs will not visible
};

cancelBtn.onclick = function() {        //Hides the contact form without saving any changes.
    contactFormSection.style.display = 'none';  //Hides the form section.
};

function editContact(index) {    //Populates the form with the contact's data and makes the form visible for editing.
    var contact = contacts[index];  //Retrieves the contact object from the array.
    contactIdField.value = index;   // the hidden input to the index of the contact being edited.
    nameField.value = contact.name;  // Populates the form with the contact's name.
    emailField.value = contact.email; //Populates the form with the contact's email.
    phoneField.value = contact.phone;  //Populates the form with the contact's phone.
    contactFormSection.style.display = 'block'; //will show the form
}

function deleteContact(index) {      //Removes a contact from the array and re-renders the contact list.
    contacts.splice(index, 1);    //Removes the contact at the specified index from the array.
    renderContacts();   //update the dispaly contacts
}

// Initial render
renderContacts();  //Calling  the function to display the initial list of contacts when the page loads.
