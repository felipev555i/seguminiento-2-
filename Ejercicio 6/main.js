/* Una subasta o remate es una venta organizada basado en la competencia directa, y
generalmente pública, es decir, a aquel comprador que pague la mayor cantidad de
dinero o de bienes a cambio del producto.
Hacer en JavaScript una simulación de subasta que cumpla con las siguientes
características:
1. Se podrá registrar los productos a subastar almacenados (id del producto, nombre
del producto, fecha y precio inicial de subasta).
2. Cada persona puede pujar por el producto que desea, indicando la fecha, el
producto y el valor ofrecido.
3. Se puede ver la lista de productos registrados.
4. La lista de ofertas por producto.
5. Seleccionar una oferta ganadora. */

// Clase Producto
class Producto {

    // Un objeto que recibe id, nombre, fecha y el precio inicial
    constructor(id, nombre, fecha, precioInicial) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.precioInicial = precioInicial;
        this.ofertas = [];
    }

    // Metodo que agrega una oferta al array de ofertas
    agregarOferta(oferta) {
        this.ofertas.push(oferta);
    }

    // Metodo que aplica el .Reduce a nuestro array de ofertas y queda reducido a un solo valor, en este caso detectaria si el valor ingresado es mayor al que ya esta
    obtenerMejorOferta() {
        if (this.ofertas.length === 0) {
            return null;
        }
        return this.ofertas.reduce((max, oferta) => oferta.valor > max.valor ? oferta : max);
    }

    // Metodo que muestra las ofertas que hay en nuestro array
    mostrarOfertas() {
        if (this.ofertas.length === 0) {
            return "No hay ofertas para este producto.";
        }
        return this.ofertas.map(oferta => `Fecha: ${oferta.fecha}, Valor: ${oferta.valor}`).join("\n");
    }
}

// Clase Oferta
class Oferta {

    // Crea un objeto con la fecha y valor
    constructor(fecha, valor) {
        this.fecha = fecha;
        this.valor = valor;
    }
}

// Función principal para gestionar la subasta
function menu() {
    const productos = [];
    
    let salir = false;

    while (!salir) {
        let eleccion = prompt("Elija una opción:\n1. Registrar producto\n2. Hacer una oferta\n3. Ver lista de productos\n4. Ver ofertas por producto\n5. Seleccionar oferta ganadora\n6. Salir");
        switch (eleccion) {
            case '1': // Registrar producto 
                let id = prompt("Ingrese el ID del producto:");
                let nombre = prompt("Ingrese el nombre del producto:");
                let fecha = prompt("Ingrese la fecha de subasta (YYYY-MM-DD):");
                let precioInicial = parseFloat(prompt("Ingrese el precio inicial de subasta:"));

                // Con los datos anteriores crea el nuevo objeto y los agrega al array productos
                productos.push(new Producto(id, nombre, fecha, precioInicial));
                alert("Producto registrado exitosamente.");
                break;
            case '2': // Hacer una oferta 

                // Identifica si el producto al que desean pujar se encuentra con el ID en el array productos
                let productoId = prompt("Ingrese el ID del producto por el cual desea pujar:");
                let producto = productos.find(p => p.id === productoId);

                if (producto) {
                    let fechaOferta = prompt("Ingrese la fecha de la oferta (YYYY-MM-DD):");
                    let valorOferta = parseFloat(prompt("Ingrese el valor de la oferta:"));
                    producto.agregarOferta(new Oferta(fechaOferta, valorOferta)); // Agrega la oferta con el metodo agregar oferta 
                    alert("Oferta registrada exitosamente.");
                } else {
                    // En caso de no encontrar el producto con el ID
                    alert("Producto no encontrado.");
                }
                break;
            case '3': // Ver la lista de productos 
                if (productos.length === 0) {
                    alert("No hay productos registrados.");
                } else {
                    let listaProductos = productos.map(p => `ID: ${p.id}, Nombre: ${p.nombre}, Fecha: ${p.fecha}, Precio Inicial: ${p.precioInicial}`).join("\n");
                    alert(`Lista de productos:\n${listaProductos}`);
                }
                break;
            case '4': // Ver las ofertas por productos
                let productoIdVer = prompt("Ingrese el ID del producto para ver las ofertas:");
                let productoVer = productos.find(p => p.id === productoIdVer);

                if (productoVer) {
                    alert(`Ofertas para el producto ${productoVer.nombre}:\n${productoVer.mostrarOfertas()}`);
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case '5': // Selecciona oferta ganadora
                let productoIdGanador = prompt("Ingrese el ID del producto para seleccionar la oferta ganadora:");
                let productoGanador = productos.find(p => p.id === productoIdGanador);

                if (productoGanador) {
                    //Obtiene la mejor oferta con el metodo que hay en producto
                    let mejorOferta = productoGanador.obtenerMejorOferta();
                    if (mejorOferta) {
                        alert(`La oferta ganadora para el producto ${productoGanador.nombre} es:\nFecha: ${mejorOferta.fecha}, Valor: ${mejorOferta.valor}`);
                    } else {
                        alert("No hay ofertas para este producto.");
                    }
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case '6':
                salir = true;
                break;
            default:
                alert("Opción inválida. Por favor, elija de nuevo.");
                break;
        }
    }
}

// Iniciar el programa
menu();
