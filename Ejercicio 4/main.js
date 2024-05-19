/* Se necesita simular en JavaScript la atención de clientes a través de la asignación de
turnos en un banco. Tener en cuenta las siguientes restricciones y requisitos.

    - Hay tres tipos de clientes: cliente preferencial, cliente general y cliente que no
    tiene cuenta en el banco
    - Hay dos tipos de atención: caja o asesoría.
    - Los de atención de caja se clasifican en depósitos y retiros.
    - El banco cuenta con 5 cajas, de las cuales la 1 y 2 están reservadas para retiros.
    - Aquellos clientes presenciales se atienden primero de los demás tipos.
    - La caja 5 es solo asesoría.
    - A medida que se atienden clientes se va liberando las cajas y distribuyendo entre
    los usuarios de las colas. */

    // Crea una clase Cliente que recibe como parametros el tipo de cliente y el tipo de atencion que recibira
    class Cliente {
        constructor(tipo, tipoAtencion) {
            this.tipo = tipo;
            this.tipoAtencion = tipoAtencion;
        }
    }
    
    // Clase Banco que crea las 5 distintas cajas que hay en un array de objetos. Crea 3 arrays para las distintas colas que existen
    class Banco {
        constructor() {
            this.cajas = [
                { id: 1, tipo: 'retiro', ocupada: false },
                { id: 2, tipo: 'retiro', ocupada: false },
                { id: 3, tipo: 'deposito', ocupada: false },
                { id: 4, tipo: 'deposito', ocupada: false },
                { id: 5, tipo: 'asesoria', ocupada: false }
            ];
            this.colaPreferencial = [];
            this.colaGeneral = [];
            this.colaSinCuenta = [];
        }
    
        // Metodo que agrega clientes a las distintas colas que hay segun el tipo de cliente
        agregarCliente(cliente) {
            switch (cliente.tipo) {
                case 'preferencial':
                    this.colaPreferencial.push(cliente);
                    break;
                case 'general':
                    this.colaGeneral.push(cliente);
                    break;
                case 'sinCuenta':
                    this.colaSinCuenta.push(cliente);
                    break;
            }
        }
    
        // Metodo que asigna cada una de las cajas 
        asignarCajas() {
            const atenderCliente = (cola, tipoCaja) => {
                for (let caja of this.cajas) {
                    if (!caja.ocupada && caja.tipo === tipoCaja) {
                        if (cola.length > 0) {
                            let cliente = cola.shift();
                            caja.ocupada = true;
                            setTimeout(() => {
                                caja.ocupada = false;
                                this.asignarCajas();
                            }, Math.random() * 3000 + 2000); // Simular tiempo de atención
                            alert(`Atendiendo a cliente ${cliente.tipo} en caja ${caja.id} para ${cliente.tipoAtencion}`);
                        }
                    }
                }
            };
    
            // Atender clientes preferenciales primero
            atenderCliente(this.colaPreferencial, 'retiro');
            atenderCliente(this.colaPreferencial, 'deposito');
            atenderCliente(this.colaPreferencial, 'asesoria');
    
            // Atender clientes generales después
            atenderCliente(this.colaGeneral, 'retiro');
            atenderCliente(this.colaGeneral, 'deposito');
            atenderCliente(this.colaGeneral, 'asesoria');
    
            // Atender clientes sin cuenta al final
            atenderCliente(this.colaSinCuenta, 'retiro');
            atenderCliente(this.colaSinCuenta, 'deposito');
            atenderCliente(this.colaSinCuenta, 'asesoria');
        }
    
        // Muestra las cajas que se encuentran ocupadas y las que se encuentran libres
        mostrarEstadoCajas() {
            let estado = 'Estado de las cajas:\n';
            for (let caja of this.cajas) {
                estado += `Caja ${caja.id} (${caja.tipo}): ${caja.ocupada ? 'Ocupada' : 'Libre'}\n`;
            }
            alert(estado);
        }
    }
    
    // Menu de la app
    function menu() {
        const banco = new Banco();
        let salir = false;
    
        while (!salir) {
            let eleccion = prompt("Elija una opción:\n1. Agregar cliente\n2. Asignar cajas\n3. Mostrar estado de cajas\n4. Salir");
            switch (eleccion) {
                case '1':
                    let tipo = prompt("Ingrese el tipo de cliente (preferencial, general, sinCuenta):");
                    let tipoAtencion = prompt("Ingrese el tipo de atención (retiro, deposito, asesoria):");
                    if ((tipo === 'preferencial' || tipo === 'general' || tipo === 'sinCuenta') &&
                        (tipoAtencion === 'retiro' || tipoAtencion === 'deposito' || tipoAtencion === 'asesoria')) {
                        const cliente = new Cliente(tipo, tipoAtencion);
                        banco.agregarCliente(cliente);
                    } else {
                        alert("Tipo de cliente o atención inválido.");
                    }
                    break;
                case '2':
                    banco.asignarCajas();
                    break;
                case '3':
                    banco.mostrarEstadoCajas();
                    break;
                case '4':
                    salir = true;
                    break;
                default:
                    alert("Opción inválida. Por favor, elija de nuevo.");
            }
        }
    }
    
    // Iniciar el programa
    menu();
    