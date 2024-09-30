function runCode() {
    // Simulating code execution for demo
    var code = document.getElementById("code").value;
    var input = document.getElementById("input").value;
    var output;

    // Basic mock logic for displaying output
    if (code.includes("print") && input.trim() !== "") {
      output = "Executed code with input: " + input;
    } else {
      output = "Code executed successfully!";
    }

    // Display the result in the output text area
    document.getElementById("output").value = output;
  }


 