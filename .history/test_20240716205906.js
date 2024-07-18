// form.js

// Função para renderizar o formulário de adição de usuário
function renderAddUserForm() {
    $('#formContainer').html('Add User Form Content');
}

// Função para renderizar o formulário de edição de usuário
function renderEditUserForm() {
    $('#formContainer').html('Edit User Form Content');
}

// Mostra o formulário de adição de usuário quando o offcanvas for exibido
$('#offcanvasAddUser').on('shown.bs.offcanvas', function () {
    renderAddUserForm();
});

// Mostra o formulário de edição de usuário quando o offcanvas for exibido
$('#offcanvasEditUser').on('shown.bs.offcanvas', function () {
    renderEditUserForm();
});
