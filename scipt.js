var selectedRow = null

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null)
     insertNewRecord(formData);
  else
    updateRecord(formData);
  resetForm();

}

function readFormData() {
    var formData = {};
    formData["itemName"] = document.getElementById("itemName").value;
    formData["supplier"] = document.getElementById("supplier").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["location"] = document.getElementById("location").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("inventoryList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.itemName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.supplier;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quantity;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.location;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("itemName").value = "";
    document.getElementById("supplier").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("location").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("itemName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("supplier").value = selectedRow.cells[1].innerHTML;
    document.getElementById("quantity").value = selectedRow.cells[2].innerHTML;
    document.getElementById("location").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.itemName;
    selectedRow.cells[1].innerHTML = formData.supplier;
    selectedRow.cells[2].innerHTML = formData.quantity;
    selectedRow.cells[3].innerHTML = formData.location;
}

function onDelete(td) {
    selectedRow = td.parentElement.parentElement;
    var formData = {};

    formData["itemName"] = selectedRow.cells[0].innerHTML
    formData["supplier"] = selectedRow.cells[1].innerHTML
    formData["quantity"] = selectedRow.cells[2].innerHTML
    formData["location"] = selectedRow.cells[3].innerHTML

    const input = prompt("Reason for deletion: ");
    console.log("User deleted item: '"+ formData["itemName"] +"' due to: "+ input);

    row = td.parentElement.parentElement;
    document.getElementById("inventoryList").deleteRow(row.rowIndex);
    if (confirm("Item Removed Successfully. Undo Delete?")) {
        updateRecord(formData);
        console.log("User undeleted item: '"+ formData["itemName"]+"'");
    }
  resetForm();
}
