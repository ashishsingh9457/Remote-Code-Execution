function displayText() {
    // Get the input value from the first text box
    var inputText = document.getElementById("code").value;
    
    // Set the value of the second text box to the input value
    document.getElementById("input").value = inputText;
}