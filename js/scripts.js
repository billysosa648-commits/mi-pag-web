// Script para enviar lo puesto dentro del cuadro de texto
    const form = document.getElementById('fallaForm');
    const textarea = document.getElementById('mensajeFalla');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const mensaje = textarea.value.trim();

      if (mensaje === "") {
        alert("Por favor escribe una descripción de la falla.");
        return;
      }

      try {
        const respuesta = await fetch('/.netlify/functions/enviar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mensaje })
        });

        if (respuesta.ok) {
          alert("¡Mensaje enviado con éxito!");
          textarea.value = "";
        } else {
          alert("Hubo un error al enviar el mensaje.");
        }
      } catch (error) {
        alert("Error de conexión.");
      }
    });
