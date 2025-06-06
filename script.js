document.querySelector('input[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();

    var nome = document.querySelector('#nome').value;
    var telefone = document.querySelector('#telefone').value;
    var mensagem = document.querySelector('#mensagem').value;

    // Exiba uma mensagem de confirmação
    alert('Mensagem enviada com sucesso!');

    // Limpe os campos do formulário
    document.querySelector('#nome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#mensagem').value = '';
});
