/* Implementar una clase en JavaScript, la cual tenga los siguientes atributos y métodos.

Atributos:
● Código.
● Descripción.
● Precio de compra.
● Precio de venta.
● Cantidad en bodega.
● Cantidad mínima requerida en bodega.
● Cantidad máxima de inventario permitida.
● Porcentaje de Descuento.

Métodos:
● Solicitar pedido: devuelva true si debe solicitar el producto al proveedor y false en
caso contrario.
● Calcular total a pagar: devuelva la cantidad total a pagar al proveedor dado una
cantidad de unidades de compra.

Adicionalmente se desea dos subclases para los siguientes tipos de productos:
● Prendas de vestir (como lo son blusas, jeans, camisas, etc.) el cual debe tener los
siguientes parámetros adicionales:

○ Talla: S, M, L, etc.
○ Permite planchado: verdadero o falso.

● Calzado (como lo son tenis, calzado formal, sandalias, etc.) el cual debe tener el
siguiente parámetro adicional:
○ Talla: 35, 36, 37, etc.

Diseñar un programa que:
● Consulte el número de productos de tipo de prendas de vestir a manejar.
● Consulte el número de productos de tipo calzado a manejar.
● Cree en una estructura de datos (arrays, map, set), los productos de prendas de
vestir en el cual se guardarán las instancias de cada uno de ellos.
● Cree una estructura de datos (arrays, map, set) de productos */

// Clase Producto con los distintos parametros que recibira 
class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidadBodega = cantidadBodega;
        this.cantidadMinimaBodega = cantidadMinimaBodega;
        this.cantidadMaximaInventario = cantidadMaximaInventario;
        this.porcentajeDescuento = porcentajeDescuento;
    }

    // Metodo que retorna si la cantidad que hay en bodega es menor a la cantidad minima de la bodega 
    solicitarPedido() {
        return this.cantidadBodega < this.cantidadMinimaBodega;
    }

    // Calcula y retorna el total a pagar aplicandole el descuento 
    calcularTotalAPagar(cantidadCompra) {
        return cantidadCompra * this.precioCompra * (1 - this.porcentajeDescuento / 100);
    }
}

// Subclase PrendasDeVestir que posee las mismas propiedades de la anterior y agrega la talla y si permite planchado 
class PrendasDeVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
        this.permitePlanchado = permitePlanchado;
    }
}

// Subclase Calzado que posee las mismas propiedades de la anterior y agrega la talla 
class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
    }
}

// Función principal para gestionar los productos desde el menu
function menu() {
    const prendasDeVestir = [];
    const calzados = [];

    let numPrendas = parseInt(prompt("Ingrese el número de productos de tipo prendas de vestir a manejar:"));
    let numCalzados = parseInt(prompt("Ingrese el número de productos de tipo calzado a manejar:"));

    for (let i = 0; i < numPrendas; i++) {
        let codigo = prompt("Ingrese el código de la prenda de vestir:");
        let descripcion = prompt("Ingrese la descripción de la prenda de vestir:");
        let precioCompra = parseFloat(prompt("Ingrese el precio de compra de la prenda de vestir:"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta de la prenda de vestir:"));
        let cantidadBodega = parseInt(prompt("Ingrese la cantidad en bodega de la prenda de vestir:"));
        let cantidadMinimaBodega = parseInt(prompt("Ingrese la cantidad mínima requerida en bodega de la prenda de vestir:"));
        let cantidadMaximaInventario = parseInt(prompt("Ingrese la cantidad máxima de inventario permitida de la prenda de vestir:"));
        let porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento de la prenda de vestir:"));
        let talla = prompt("Ingrese la talla de la prenda de vestir (S, M, L, etc.):");
        let permitePlanchado = prompt("¿Permite planchado? (verdadero/falso):").toLowerCase() === 'verdadero';

        prendasDeVestir.push(new PrendasDeVestir(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla, permitePlanchado));
    }

    for (let i = 0; i < numCalzados; i++) {
        let codigo = prompt("Ingrese el código del calzado:");
        let descripcion = prompt("Ingrese la descripción del calzado:");
        let precioCompra = parseFloat(prompt("Ingrese el precio de compra del calzado:"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta del calzado:"));
        let cantidadBodega = parseInt(prompt("Ingrese la cantidad en bodega del calzado:"));
        let cantidadMinimaBodega = parseInt(prompt("Ingrese la cantidad mínima requerida en bodega del calzado:"));
        let cantidadMaximaInventario = parseInt(prompt("Ingrese la cantidad máxima de inventario permitida del calzado:"));
        let porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento del calzado:"));
        let talla = parseInt(prompt("Ingrese la talla del calzado (35, 36, 37, etc.):"));

        calzados.push(new Calzado(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla));
    }

    // Mostrar los productos creados
    alert("Prendas de vestir:");
    prendasDeVestir.forEach(prenda => {
        alert(`Código: ${prenda.codigo}, Descripción: ${prenda.descripcion}, Precio de Compra: ${prenda.precioCompra}, Precio de Venta: ${prenda.precioVenta}, Cantidad en Bodega: ${prenda.cantidadBodega}, Cantidad Mínima: ${prenda.cantidadMinimaBodega}, Cantidad Máxima: ${prenda.cantidadMaximaInventario}, Descuento: ${prenda.porcentajeDescuento}%, Talla: ${prenda.talla}, Permite Planchado: ${prenda.permitePlanchado}`);
    });

    alert("Calzados:");
    calzados.forEach(calzado => {
        alert(`Código: ${calzado.codigo}, Descripción: ${calzado.descripcion}, Precio de Compra: ${calzado.precioCompra}, Precio de Venta: ${calzado.precioVenta}, Cantidad en Bodega: ${calzado.cantidadBodega}, Cantidad Mínima: ${calzado.cantidadMinimaBodega}, Cantidad Máxima: ${calzado.cantidadMaximaInventario}, Descuento: ${calzado.porcentajeDescuento}%, Talla: ${calzado.talla}`);
    });
}

// Iniciar el programa
menu();
