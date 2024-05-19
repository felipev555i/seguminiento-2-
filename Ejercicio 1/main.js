/* Construya un algoritmo para las estadísticas de atención de una universidad teniendo en cuenta los siguientes requisitos:

1. Hay dos módulos de atención: terminal para llamada telefónica y oficina.
2. El sistema brinda las estadísticas de todo el proceso de atención:
    • Cantidad de usuarios atendidos.
    • Atendidos por día y especificación por segmento (Estudiante – docente) en
    cada uno de los módulos de atención.
    • Se permite trasferir de módulo de atención y se debe generar estadística de
    esta trasferencia. */

  // Definición de la clase Usuario

  class Usuario {
    constructor(nombre, rol) {
        this.nombre = nombre;
        this.rol = rol;
        this.fecha = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(); // Ajuste el mes
        this.modulo = null;
    }
}

// EL array donde estaran almacenados los usuarios
let arrayUsuarios = [];
let estadisticas = {
    totalAtendidos: 0,
    atendidosPorDia: {},
    transferencias: 0
};

// Funcion para ingresar un usuario 
function ingresarUsuarios() {
    let nombreInput = prompt(`¿Cual es tu nombre?`);
    let rolInput = prompt(`¿Cual es tu rol? (Estudiante o Docente)`);

    if (nombreInput === '' || rolInput === '') {
        alert(`Ambos campos deben estar llenos`);
    } else {
        let usuario = new Usuario(nombreInput.toString(), rolInput.toString());
        arrayUsuarios.push(usuario);
    }
}

// Se le asigna el modulo de atencion a cierto usuario
function asignarModulo(usuario, modulo) {
    usuario.modulo = modulo;
    let fecha = usuario.fecha;
    if (!estadisticas.atendidosPorDia[fecha]) {
        estadisticas.atendidosPorDia[fecha] = { 'llamada': { 'Estudiante': 0, 'Docente': 0 }, 'oficina': { 'Estudiante': 0, 'Docente': 0 } };
    }
    estadisticas.atendidosPorDia[fecha][modulo][usuario.rol]++;
    estadisticas.totalAtendidos++;
}

// Funcion que transfiere de modulo
function transferirModulo(usuario, nuevoModulo) {
    if (usuario.modulo) {
        estadisticas.atendidosPorDia[usuario.fecha][usuario.modulo][usuario.rol]--;
    }
    asignarModulo(usuario, nuevoModulo);
    estadisticas.transferencias++;
}

// Funcion para seleccionar modulo 
function seleccionarModulo() {
    let idUsuario = prompt(`Ingrese el nombre del usuario que desea asignar a un módulo`);
    let usuario = arrayUsuarios.find(u => u.nombre === idUsuario);
    if (usuario) {
        let modulo = prompt(`Ingrese el módulo (llamada/oficina)`);
        if (modulo === 'llamada' || modulo === 'oficina') {
            asignarModulo(usuario, modulo);
            alert(`Usuario ${usuario.nombre} asignado al módulo de ${modulo}`);
        } else {
            alert(`Módulo no válido`);
        }
    } else {
        alert(`Usuario no encontrado`);
    }
}

// Funcion que transfiere el usuario de modulo 
function transferirUsuario() {
    let idUsuario = prompt(`Ingrese el nombre del usuario que desea transferir de módulo`);
    let usuario = arrayUsuarios.find(u => u.nombre === idUsuario);
    if (usuario) {
        let nuevoModulo = prompt(`Ingrese el nuevo módulo (llamada/oficina)`);
        if (nuevoModulo === 'llamada' || nuevoModulo === 'oficina') {
            transferirModulo(usuario, nuevoModulo);
            alert(`Usuario ${usuario.nombre} transferido al módulo de ${nuevoModulo}`);
        } else {
            alert(`Módulo no válido`);
        }
    } else {
        alert(`Usuario no encontrado`);
    }
}

// Funcion que imprime la informacion de los usuarios almacenados en el array
function printNombreRol() {
    if (arrayUsuarios.length === 0) {
        return `Aun no hay usuarios en el sistema`;
    } else {
        return arrayUsuarios.map((usuario, i) => `${usuario.nombre} tu rol es ${usuario.rol}. Ingresaste el ${usuario.fecha}`).join(`\n`);
    }
}

// Funcion para conocer los usuarios por segemento 
const conocerUsuarios = () => {
    if (arrayUsuarios.length === 0) {
        return `No hay usuarios en el sistema`;
    } else {
        let menuSegmentoFecha = parseInt(prompt(`Ingrese la opcion que desea conocer \n 1- Usuarios por segmento Estudiante \n 2- Usuarios por segmento Docente`));

        switch (menuSegmentoFecha) {
            case 1:
                return UsuariosEstudiantes();
            case 2:
                return UsuariosDocentes();
            default:
                return `Ha ocurrido un error`;
        }
    }
}

// Cuenta los usarios estudiantes
function UsuariosEstudiantes() {
    let usuariosEstudiante = 0;
    arrayUsuarios.map((usuario, i) => usuario.rol.toLowerCase() === 'estudiante' ? usuariosEstudiante++ : usuariosEstudiante);
    return usuariosEstudiante;
}

// Cuenta los usarios docentes
function UsuariosDocentes() {
    let usuariosDocente = 0;
    arrayUsuarios.map((usuario, i) => usuario.rol.toLowerCase() === 'docente' ? usuariosDocente++ : usuariosDocente);
    return usuariosDocente;
}

// Funcion en la que se almacenan todas las estadisticas 
function printEstadisticas() {
    let estadisticasStr = `Total de usuarios atendidos: ${estadisticas.totalAtendidos}\nTransferencias de módulo: ${estadisticas.transferencias}\n`;
    estadisticasStr += `Atendidos por día y módulo:\n`;
    for (let fecha in estadisticas.atendidosPorDia) {
        estadisticasStr += `Fecha: ${fecha}\n`;
        estadisticasStr += `  Llamada - Estudiantes: ${estadisticas.atendidosPorDia[fecha].llamada.Estudiante}, Docentes: ${estadisticas.atendidosPorDia[fecha].llamada.Docente}\n`;
        estadisticasStr += `  Oficina - Estudiantes: ${estadisticas.atendidosPorDia[fecha].oficina.Estudiante}, Docentes: ${estadisticas.atendidosPorDia[fecha].oficina.Docente}\n`;
    }
    alert(estadisticasStr);
}

// Funcionamiento del sistema
while (true) {
    let menu = parseInt(prompt(`Ingrese un numero para lo que desee hacer \n 1- Ingresar un usuario \n 2- Asignar módulo a un usuario \n 3- Transferir usuario de módulo \n 4- Conocer los usuarios, su rol y la fecha en la que fue ingresado \n 5- Conocer la cantidad de usuarios que hay en el sistema \n 6- Conocer la cantidad de usuarios que ingresaron por segmentos \n 7- Ver estadísticas de atención \n 8- Salir`));

    switch (menu) {
        case 1:
            ingresarUsuarios();
            break;
        case 2:
            seleccionarModulo();
            break;
        case 3:
            transferirUsuario();
            break;
        case 4:
            alert(printNombreRol());
            break;
        case 5:
            alert(`En el sistema hay ${arrayUsuarios.length} usuarios`);
            break;
        case 6:
            alert(conocerUsuarios());
            break;
        case 7:
            printEstadisticas();
            break;
        case 8:
            alert(`Saliendo del sistema`);
            break;
        default:
            alert(`Ha ocurrido un error`);
            break;
    }

    if (menu === 8) {
        break;
    }
}
