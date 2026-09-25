document.addEventListener('DOMContentLoaded', function () {
    // --- Detectar si viene una terapia seleccionada desde otra página ---
    const urlParams = new URLSearchParams(window.location.search);
    const terapiaParam = urlParams.get('terapia');

    if (terapiaParam) {
        const radioTarget = document.querySelector(`input[name="tipoTerapia"][value="${terapiaParam}"]`);
        if (radioTarget) {
            radioTarget.checked = true;
        }
    }
    // ------------------------------------------------------------------------

    const formReserva = document.getElementById('formReserva');
    const fechaInput = document.getElementById('fechaCita');

    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.min = today;
    }

    if (formReserva) {
        formReserva.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Capturar los datos del formulario de reservas
            const tipoTerapia = document.querySelector('input[name="tipoTerapia"]:checked').value;
            const fecha = document.getElementById('fechaCita').value;
            const hora = document.getElementById('horaCita').value;
            
            // Nota: Asegúrate de que tus inputs en reservar.html tengan estos IDs o clases para capturarlos bien
            const nombre = document.querySelector('input[placeholder="Nombre completo"]').value;
            const correo = document.querySelector('input[placeholder="Correo electrónico"]').value;
            const telefono = document.querySelector('input[type="tel"]').value;

            // 2. Crear el objeto de la nueva cita
            const nuevaCita = {
                terapia: tipoTerapia,
                fecha: fecha,
                hora: hora,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                estado: "Pendiente"
            };

            // 3. Guardar en el almacenamiento local (localStorage) para que viaje al panel admin
            let citas = JSON.parse(localStorage.getItem("citasLuzAngeles")) || [];
            citas.push(nuevaCita);
            localStorage.setItem("citasLuzAngeles", JSON.stringify(citas));

            // 4. Alerta visual de éxito
            alert(`¡Cita agendada con éxito!\n\nModalidad: Terapia ${tipoTerapia}\nFecha: ${fecha}\nHora: ${hora}\n\nLos datos han sido enviados al consultorio.`);

            // 5. Reiniciar formulario
            formReserva.reset();
            if (fechaInput) {
                const today = new Date().toISOString().split('T')[0];
                fechaInput.min = today;
            }
        });
    }
});