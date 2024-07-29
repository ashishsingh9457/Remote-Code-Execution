function executeCode() {
    const code = document.getElementById('codeInput').value;
    const outputElement = document.getElementById('output');

    // Example: Sending code to a backend API for execution
    fetch('https://api.example.com/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        outputElement.textContent = data.output;
    })
    .catch(error => {
        outputElement.textContent = 'Error executing code';
    });
}
