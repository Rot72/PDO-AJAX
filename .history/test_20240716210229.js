// form.js

// Função para renderizar o formulário de adição de usuário
function renderAddUserForm() {
    var addUserFormHtml = `
        <form id="addUserForm">
            <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter first name">
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Enter last name">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
    $('#formContainer').html(addUserFormHtml);
}


// Função para renderizar o formulário de edição de usuário
function renderEditUserForm(userData) {
    var editUserFormHtml = `
        <form id="editUserForm">
            <input type="hidden" id="editUserId" name="editUserId" value="${userData.id}">
            <div class="mb-3">
                <label for="editFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="editFirstName" name="editFirstName" placeholder="Enter first name" value="${userData.first_name}">
            </div>
            <div class="mb-3">
                <label for="editLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="editLastName" name="editLastName" placeholder="Enter last name" value="${userData.last_name}">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    `;
    $('#formContainer').html(editUserFormHtml);
}

// Mostra o formulário de edição de usuário quando o offcanvas for exibido
$('#offcanvasEditUser').on('shown.bs.offcanvas', function () {
    console.log('Offcanvas Edit User shown');
    // Simule dados do usuário para edição
    var userData = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe'
        // Adicione outros campos conforme necessário
    };

    renderEditUserForm(userData);
});
