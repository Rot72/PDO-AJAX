// Função simples para testar a renderização dentro de formContainer
function renderHelloWorld() {
    var helloWorldHtml = '<p>Hello, World!</p>';
    $('#formContainer').html(helloWorldHtml);
}

// Chame a função ao carregar o documento
$(document).ready(function() {
    renderHelloWorld();
});