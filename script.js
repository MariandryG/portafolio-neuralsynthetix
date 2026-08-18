document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    const btnEmail = document.getElementById("btn-email");

    // =========================================================
    // CONFIGURACIÓN DE TUS DATOS
    // =========================================================
    const TELEFONO_WHATSAPP = "584268467458"; // Reemplaza por el número corporativo (Código país + número sin espacios ni +)
    const FORMSPREE_ID = "xqpzgngn";   // Reemplaza por tu ID de Formspree (crea uno gratis en formspree.io)

    // Función auxiliar para validar que los campos obligatorios estén llenos
    function validarFormulario() {
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        return true;
    }

    // --- OPCIÓN A: ENVÍO POR WHATSAPP ---
    btnWhatsapp.addEventListener("click", () => {
        if (!validarFormulario()) return;

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const empresa = document.getElementById("empresa").value;
        const mensaje = document.getElementById("mensaje").value;

        const textoWhatsApp = 
            `*Nuevo mensaje de contacto - NeuralSynthetix*%0A%0A` +
            `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
            `*Correo:* ${encodeURIComponent(email)}%0A` +
            `*Empresa:* ${encodeURIComponent(empresa)}%0A%0A` +
            `*Mensaje:*%0A${encodeURIComponent(mensaje)}`;

        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP}&text=${textoWhatsApp}`;
        window.open(urlWhatsApp, "_blank");
    });

    // --- OPCIÓN B: ENVÍO POR CORREO (Vía Fetch a Formspree) ---
    btnEmail.addEventListener("click", async () => {
        if (!validarFormulario()) return;

        const formData = new FormData(form);

        try {
            btnEmail.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btnEmail.disabled = true;

            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("¡Gracias! Tu solicitud ha sido enviada con éxito por correo.");
                form.reset();
            } else {
                alert("Hubo un detalle al enviar el correo. Por favor inténtalo por WhatsApp.");
            }
        } catch (error) {
            alert("Error de conexión. Inténtalo nuevamente o usa la opción de WhatsApp.");
        } finally {
            btnEmail.innerHTML = '<i class="fa-solid fa-envelope"></i> Enviar por Correo';
            btnEmail.disabled = false;
        }
    });
});