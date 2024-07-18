// Função para renderizar o formulário de usuário
function renderUserForm(title, submitText, id = null, formData = {}) {
    var formId = id ? 'editForm' : 'insertForm';
    var formAction = id ? 'updateData' : 'insertData';
    var formMethod = id ? 'POST' : 'POST'; // Defina o método correto conforme necessário

    var firstName = formData.first_name || '';
    var lastName = formData.last_name || '';
    var email = formData.email || '';
    var imagePreview = formData.image ? `<img class="preview_img" src="${formData.image}">` : '<img class="preview_img" src="images/default_profile.jpg">';
    var countryOptions = ''; // Aqui você pode construir as opções do select para o país dinamicamente
    var maleChecked = formData.gender === 'male' ? 'checked' : '';
    var femaleChecked = formData.gender === 'female' ? 'checked' : '';

    var formHtml = `
      <form method="${formMethod}" id="${formId}">
        ${id ? `<input type="hidden" name="id" value="${id}">` : ''}
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" name="first_name" placeholder="Nikola" value="${firstName}">
          </div>
          <div class="col">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" name="last_name" placeholder="Tesla" value="${lastName}">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="email" placeholder="name@example.com" value="${email}">
        </div>
        <div class="row mb-3">
          <label class="form-label">Upload Image</label>
          <div class="col-2">
            ${imagePreview}
          </div>
          <div class="col-10">
            <div class="file-upload text-secondary">
              <input type="file" class="image" name="image" accept="image/*">
              ${formData.image ? `<input type="hidden" name="image_old" value="${formData.image}">` : ''}
              <span class="fs-4 fw-2">Choose file...</span>
              <span>or drag and drop file here</span>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Country</label>       
          <select name="country" class="form-control country-select">
            <option value="">Select a country...</option>
            ${countryOptions}
          </select>
        </div>
        <div class="form-group mb-3">
          <label class="form-label">Gender:</label>
          &nbsp;&nbsp;
          <input type="radio" class="form-check-input" name="gender" value="male" ${maleChecked}>
          <label class="form-input-label">Male</label>
          &nbsp;
          <input type="radio" class="form-check-input" name="gender" value="female" ${femaleChecked}>
          <label class="form-input-label">Female</label>
        </div>
        <div>
          <button type="submit" class="btn btn-primary me-1" id="${id ? 'editBtn' : 'insertBtn'}" disabled>${submitText}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="offcanvas">Cancel</button>
        </div>
      </form>
    `;

    return formHtml;
}

// Exemplo de uso para adicionar usuário
$('#offcanvasAddUser .offcanvas-body').html(renderUserForm('Add new user', 'Submit'));

// Exemplo de uso para editar usuário (passando o ID e os dados do usuário)
$('#offcanvasEditUser .offcanvas-body').html(renderUserForm('Edit user data', 'Update', 'user_id', {
    first_name: 'Nikola',
    last_name: 'Tesla',
    email: 'nikola.tesla@example.com',
    image: 'images/nikola_tesla.jpg',
    gender: 'male'
}));
