document.addEventListener("DOMContentLoaded", () => {
    loadItems();
});

function loadItems() {
    const list = document.getElementById("list");
    const items = JSON.parse(localStorage.getItem("items")) || [];

    items.forEach((item) => {
    addListItem(item);
    });
}

function addItem() {
    const itemInput = document.getElementById("item-input");
    const itemName = itemInput.value.trim();

    if (itemName) {
    addListItem(itemName);
    saveItem(itemName);
    }

    itemInput.value = "";
}

function addListItem(itemName) {
    const list = document.getElementById("list");
    const listItem = document.createElement("li");
    const itemText = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    itemText.textContent = itemName;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Borrar";

    editButton.onclick = function () {
    editItem(itemText);
    };

    deleteButton.onclick = function () {
    list.removeChild(listItem);
    removeItem(itemName);
    };

    listItem.appendChild(itemText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
}

function editItem(itemText) {
    const itemName = itemText.textContent;
    const newItemName = prompt("Editar elemento:", itemName);

    if (newItemName && newItemName.trim() !== "") {
    updateItem(itemName, newItemName.trim());
    itemText.textContent = newItemName.trim();
    }
}

function saveItem(itemName) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(itemName);
    localStorage.setItem("items", JSON.stringify(items));
}

function updateItem(oldItemName, newItemName) {
    const items = JSON.parse(localStorage.getItem("items"));
    const index = items.indexOf(oldItemName);

    if (index > -1) {
    items[index] = newItemName;
    localStorage.setItem("items", JSON.stringify(items));
    }
}

function removeItem(itemName) {
    const items = JSON.parse(localStorage.getItem("items"));
    const index = items.indexOf(itemName);

    if (index > -1) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    }
}
