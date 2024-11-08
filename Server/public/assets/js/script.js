async function runCode() {
  // Get the code from the textarea
  const code = document.getElementById('code').value;
  const input = document.getElementById('input').value;
  const outputElement = document.getElementById('output');
  const language = document.getElementById('language').value;

  try {
      // Send the code to the server for execution
      const response = await fetch('/exec-script', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              scriptContent: code,
              lang: language,
              input: input
          }),
      });

      if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
      }

      // Stream the response text and update the output textarea
      const reader = response.body.getReader();
      let decoder = new TextDecoder();
      let result = '';

      while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
          outputElement.value = result;
      }

      outputElement.value = result;
  } catch (error) {
      outputElement.value = `Error: ${error.message}`;
  }
}
