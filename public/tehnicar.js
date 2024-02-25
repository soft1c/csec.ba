const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('/pacijenti')
  .then(response => response.json())
  .then(data => {
      const tableBody = document.getElementById("pacijentiData"); // Promenjeno za direktan pristup preko ID-a
      if (tableBody) { // Provera da li element postoji
          data.forEach((row) => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                  <td>${row.procenat_nesto || ''}</td>
                  <td>${row.hgb || ''}</td>
                  <td>${row.tr_plt || ''}</td>
                  <td>${row.ac_uricum || ''}</td>
                  <td>${row.ldh || ''}</td>
                  <td>${row.natrij || ''}</td>
              `;
              tableBody.appendChild(tr);
          });
      } else {
          console.error('Element #pacijentiData nije pronađen.');
      }
  })
  .catch(error => console.error('Error:', error));
});

