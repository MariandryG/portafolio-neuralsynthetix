document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. CONFIGURACIÓN DE TUS DATOS Y FORMULARIO
    // =========================================================
    const form = document.getElementById("contact-form");
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    const btnEmail = document.getElementById("btn-email");

    const TELEFONO_WHATSAPP = "584268467458";
    const FORMSPREE_ID = "xqpzgngn";

    function validarFormulario() {
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        return true;
    }

    // --- ENVÍO POR WHATSAPP ---
    if (btnWhatsapp) {
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
    }

    // --- ENVÍO POR CORREO (Formspree) ---
    if (btnEmail) {
        btnEmail.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            const formData = new FormData(form);

            try {
                btnEmail.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
                btnEmail.disabled = true;

                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
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
    }

    // =========================================================
    // 2. MENÚ HAMBURGUESA (MÓVIL)
    // =========================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // =========================================================
    // 3. CAMBIO DE IDIOMA (ESPAÑOL / INGLÉS)
    // =========================================================
    const btnLang = document.getElementById("btn-lang") || document.getElementById("lang-toggle");
    const langText = document.getElementById("lang-text");
    let currentLang = localStorage.getItem("selectedLang") || "es";

    function updateLanguage(lang) {
        // Cambia textos normales (data-es / data-en)
        document.querySelectorAll("[data-es][data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Cambia placeholders de campos de texto
        document.querySelectorAll("[data-es-placeholder][data-en-placeholder]").forEach(input => {
            input.placeholder = input.getAttribute(`data-${lang}-placeholder`);
        });

        // Actualiza el texto del botón (si estás en ES, te ofrece cambiar a EN)
        if (langText) {
            langText.textContent = lang === "es" ? "EN" : "ES";
        }

        document.documentElement.lang = lang;
        localStorage.setItem("selectedLang", lang);
    }

    // Aplicar al cargar la página
    updateLanguage(currentLang);

    // Escuchar clic en el botón de idioma
    if (btnLang) {
        btnLang.addEventListener("click", () => {
            currentLang = currentLang === "es" ? "en" : "es";
            updateLanguage(currentLang);
        });
    }
});