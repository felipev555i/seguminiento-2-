/* Desarrollar en JavaScript un programa para la gestión reservas de un hotel.
    -Un cliente puede reservar cualquier tipo de habitación: individual, doble y
    familiar.
    - Las habitaciones pueden ser para fumadores o no fumadores.
    - Las mascotas solo se aceptan en habitaciones familiares.
    - El hotel cuenta con 3 habitaciones de cada tipo.
    - No se puede exceder el número de personas por habitación: individual 2
    personas, 4 personas para doble y 6 personas para familiar.
    - El hotel necesita una estadística de las reservas: nombre de quien reserva,
    país de origen, número de personas, el periodo de la estadía, número de
    personas que están ocupando el hotel y si el huésped trajo mascota. */

    // Crea la clase Habitacion con las respectivas caracteristicas de la habitacion
    class Habitacion {
        constructor(tipo, capacidad, permiteFumar, permiteMascotas) {
            this.tipo = tipo;
            this.capacidad = capacidad;
            this.permiteFumar = permiteFumar;
            this.permiteMascotas = permiteMascotas;
            this.estaReservada = false;
            this.nombreHuesped = "";
            this.paisOrigen = "";
            this.numeroPersonas = 0;
            this.periodoEstadia = "";
            this.tieneMascotas = false;
        }
        
        // Metodo que reserva habitacion  
        reservarHabitacion(nombreHuesped, paisOrigen, numeroPersonas, periodoEstadia, tieneMascotas) {
            this.estaReservada = true;
            this.nombreHuesped = nombreHuesped;
            this.paisOrigen = paisOrigen;
            this.numeroPersonas = numeroPersonas;
            this.periodoEstadia = periodoEstadia;
            this.tieneMascotas = tieneMascotas;
        }
        
        // Metodo que libera una habitacion
        liberarHabitacion() {
            this.estaReservada = false;
            this.nombreHuesped = "";
            this.paisOrigen = "";
            this.numeroPersonas = 0;
            this.periodoEstadia = "";
            this.tieneMascotas = false;
        }
        
        // Metodo que obtiene los detalles a la hora de reservar una habitacion
        obtenerDetallesReserva() {
            return `${this.tipo} - Huésped: ${this.nombreHuesped}, País: ${this.paisOrigen}, Personas: ${this.numeroPersonas}, Periodo: ${this.periodoEstadia}, Mascotas: ${this.tieneMascotas}`;
        }
    }
    
    // Clase del hotel en general 
    class Hotel {

        // Como constructor principal tiene las habitaciones del hotel 3 de cada tipo y permite tener mascotas solo en la familiar 
        constructor() {
            this.habitaciones = [

                // Las habitaciones son instancias de la primera clase HABITACION
                new Habitacion('Individual', 2, true, false),
                new Habitacion('Individual', 2, true, false),
                new Habitacion('Individual', 2, true, false),
                new Habitacion('Doble', 4, true, false),
                new Habitacion('Doble', 4, true, false),
                new Habitacion('Doble', 4, true, false),
                new Habitacion('Familiar', 6, true, true),
                new Habitacion('Familiar', 6, true, true),
                new Habitacion('Familiar', 6, true, true)
            ];
        }
        
        // Metodo que encuentra una habitacion que este disponible, mientras itera en cada una y cumplen los parametros
        encontrarHabitacionDisponible(tipo, numeroPersonas, tieneMascotas) {
            return this.habitaciones.find(habitacion => 
                habitacion.tipo === tipo &&
                !habitacion.estaReservada &&
                habitacion.capacidad >= numeroPersonas &&
                (!tieneMascotas || habitacion.permiteMascotas)
            );
        }
        
        // Metodo que reserva la habitacion; Usa el metodo anterior para confirmar los criterios y una vez los confirma la reserva y muestra los detalles de la reserva
        reservarHabitacion(tipo, nombreHuesped, paisOrigen, numeroPersonas, periodoEstadia, tieneMascotas) {
            const habitacion = this.encontrarHabitacionDisponible(tipo, numeroPersonas, tieneMascotas);
            if (habitacion) {
                habitacion.reservarHabitacion(nombreHuesped, paisOrigen, numeroPersonas, periodoEstadia, tieneMascotas);
                alert(`Habitación reservada exitosamente: ${habitacion.obtenerDetallesReserva()}`);
            } else {
                alert("No hay habitaciones disponibles que cumplan con los criterios.");
            }
        }
        
        // Metodo que muestra las estadisticas actuales que lleva el hotel; Cuenta las personas de las habitaciones reservadas y las suma, ademas de que toma los detalles de las reservas y los muestra en una sola vista  
        mostrarEstadisticas() {
            let totalPersonas = 0;
            let reservas = "Detalles de las reservas:\n";
            this.habitaciones.forEach(habitacion => {
                if (habitacion.estaReservada) {
                    totalPersonas += habitacion.numeroPersonas;
                    reservas += `${habitacion.obtenerDetallesReserva()}\n`;
                }
            });
            reservas += `Número total de personas en el hotel: ${totalPersonas}`;
            alert(reservas);
        }
    }
    
    // Funcion del menu de todas las opciones de la app
    function menu() {

        // Instancia la clase Hotel
        const hotel = new Hotel();
        
        let salir = false;
    
        while (!salir) {
            let eleccion = prompt("Elija una opción:\n1. Reservar una habitación\n2. Mostrar estadísticas\n3. Salir");
            switch (eleccion) {
                case '1':
                    let tipo = prompt("Ingrese el tipo de habitación (Individual, Doble, Familiar):");
                    let nombreHuesped = prompt("Ingrese su nombre:");
                    let paisOrigen = prompt("Ingrese su país de origen:");
                    let numeroPersonas = parseInt(prompt("Ingrese el número de personas:"));
                    let periodoEstadia = prompt("Ingrese el periodo de estadía:");
                    let tieneMascotas = prompt("¿Tiene mascotas? (si/no):").toLowerCase() === 'si';
                    
                    if ((tipo === 'Individual' && numeroPersonas > 2) ||
                        (tipo === 'Doble' && numeroPersonas > 4) ||
                        (tipo === 'Familiar' && numeroPersonas > 6)) {
                        alert("El número de personas excede la capacidad de la habitación.");
                    } else {
                        // Mediante los anteriores datos ingresados ejecuta el metodo reservar habitacion 
                        hotel.reservarHabitacion(tipo, nombreHuesped, paisOrigen, numeroPersonas, periodoEstadia, tieneMascotas);
                    }
                    break;
                case '2':
                    hotel.mostrarEstadisticas();
                    break;
                case '3':
                    salir = true;
                    break;
                default:
                    alert("Opción inválida. Por favor, elija de nuevo.");
            }
        }
    }
    
    // Iniciar el programa
    menu();
    