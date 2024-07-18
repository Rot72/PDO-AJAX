$(document).ready(function() {
    // Função para renderizar e exibir o formulário de usuário
    function renderUserForm(title, submitText, userData = null) {
        var formId = userData ? 'editForm' : 'insertForm';
        var formAction = userData ? 'updateData' : 'insertData';
        var formMethod = userData ? 'POST' : 'POST'; // Defina o método correto conforme necessário
      
        // Preencher os campos do formulário com os dados do usuário, se disponíveis
        var firstName = userData ? userData.first_name : '';
        var lastName = userData ? userData.last_name : '';
        var email = userData ? userData.email : '';
        var imageUrl = userData ? userData.image_url : 'images/default_profile.jpg';
        var country = userData ? userData.country : '';
        var gender = userData ? userData.gender : '';

        var formHtml = `
          <form method="${formMethod}" id="${formId}">
            ${userData ? `<input type="hidden" name="id" value="${userData.id}">` : ''}
            <div class="row mb-3">
              <div class="col">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" name="first_name" placeholder="First Name" value="${firstName}">
              </div>
              <div class="col">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" name="last_name" placeholder="Last Name" value="${lastName}">
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" name="email" placeholder="Email" value="${email}">
            </div>
            <div class="row mb-3">
              <label class="form-label">Upload Image</label>
              <div class="col-2">
                <img class="preview_img" src="${imageUrl}">
              </div>
              <div class="col-10">
                <div class="file-upload text-secondary">
                  <input type="file" class="image" name="image" accept="image/*">
                  ${userData ? `<input type="hidden" name="image_old" value="${userData.image_url}">` : ''}
                  <span class="fs-4 fw-2">Choose file...</span>
                  <span>or drag and drop file here</span>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Country</label>       
              <select name="country" class="form-control country-select">
                <option value="">Select a country...</option>
                <option value="Brazil" ${country === 'Brazil' ? 'selected' : ''}>Brazil</option>
                <option value="USA" ${country === 'USA' ? 'selected' : ''}>USA</option>
                <!-- Adicione mais opções conforme necessário -->
              </select>
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Gender:</label>
              &nbsp;&nbsp;
              <input type="radio" class="form-check-input" name="gender" value="male" ${gender === 'male' ? 'checked' : ''}>
              <label class="form-input-label">Male</label>
              &nbsp;
              <input type="radio" class="form-check-input" name="gender" value="female" ${gender === 'female' ? 'checked' : ''}>
              <label class="form-input-label">Female</label>
            </div>
            <div>
              <button type="submit" class="btn btn-primary me-1" id="${userData ? 'editBtn' : 'insertBtn'}">${submitText}</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </form>
        `;
      
        return formHtml;
    }

    // Função para mostrar o formulário de inserção ou edição
    function showUserForm(title, submitText, userData = null) {
        var userFormHtml = renderUserForm(title, submitText, userData);
        $('#formContainer').html(userFormHtml); // Substitua '#formContainer' pelo ID ou classe do elemento onde deseja inserir o formulário
    }

    // Exemplo de uso para adicionar usuário
    $('#offcanvasAddUser .offcanvas-body').on('shown.bs.offcanvas', function () {
        console.log('Offcanvas Add User shown');
        showUserForm('Add new user', 'Submit');
    });

    // Exemplo de uso para editar usuário
    $('#offcanvasEditUser .offcanvas-body').on('shown.bs.offcanvas', function () {
        // Simule dados do usuário para edição
        var userData = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            image_url: 'images/john_doe.jpg',
            country: 'USA',
            gender: 'male'
        };

        showUserForm('Edit user data', 'Update', userData);
    });

});
