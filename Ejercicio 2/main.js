/* El software que se desarrollará controlará un cajero automático (ATM)

- El cajero automático atenderá a un cliente a la vez. 
- Se le pedirá al cliente que inserte su documento de identidad y su pin de 4 dígitos, los cuales se
validaran como parte de cada transacción. 
- El cliente podrá entonces realizar una o más transacciones.
- El cajero automático debe ser capaz de proporcionar los siguientes servicios
al cliente:
• Un cliente debe poder realizar un retiro de efectivo de cualquier cuenta
adecuada vinculada al documento de identidad, en múltiplos de $50000. Se
debe obtener la aprobación del banco antes de entregar efectivo.
• Un cliente debe poder realizar un depósito en cualquier cuenta vinculada al
documento de identidad, consistente en efectivo y/o cheques. El cliente
ingresará el monto del depósito en el cajero automático e indicar si es
efectivo o cheque.
• Un cliente debe poder realizar una transferencia de dinero entre dos
cuentas cualesquiera vinculadas al documento de identidad.
• Un cliente debe poder realizar una consulta de saldo de cualquier cuenta
vinculada al documento de identidad.
• El cajero automático comunicará al cliente los resultados de cada
transacción dependiendo de su tipo. Ejemplo “retiro exitoso, puede tomar x
dinero de la bandeja principal”
• Si el banco determina que el PIN del cliente no es válido, se le pedirá al
cliente que vuelva a ingresar el PIN antes de que se pueda continuar con la
transacción. Si el cliente no puede ingresar correctamente el PIN después
de tres intentos saldrá de la aplicación.
• El cajero automático tendrá un panel de operador con un interruptor que
permitirá apagar o encender el cajero. */ 

// Class para la cuenta de los usuarios
class IdUsuarios {
  constructor(identificacion, pin) {
      this.identificacion = identificacion;
      this.pin = pin;
      this.saldoCuenta = 0;
  }
}

// Donde se almacenaran los usuarios
let arrayUsuarios = [];

// Funcion para ingresar usuarios 
function ingresarUsuarios() {
  let idInput = prompt(`Ingresa por favor tu numero de ID`);
  let pinInput = prompt(`Ingresa por favor el PIN que vas a utilizar (Debe ser de 4 digitos)`);

  if (idInput === '' || pinInput === '') {
      alert(`Ambos campos deben estar llenos`);
  } else if (pinInput.length !== 4) {
      alert(`Los digitos de tu PIN deben ser 4`);
  } else {
      arrayUsuarios.push(new IdUsuarios(parseInt(idInput), parseInt(pinInput)));
  }
}

// Funcion que muestra la informacion de los usuarios 
function printInfoUsuario() {
  if (arrayUsuarios.length === 0) {
      return `Aun no hay usuarios en el sistema`;
  } else {
      return arrayUsuarios.map((usuario, i) => `Hola usuario con ID ${usuario.identificacion} tu PIN es ${usuario.pin}. Tienes un saldo de ${usuario.saldoCuenta}`).join(`\n`);
  }
}

// Funcion para depositar en la cuenta con el id
function depositar(id) {
  let usuario = arrayUsuarios.find(usuario => usuario.identificacion === id);
  if (usuario) {
      let cantidad = parseInt(prompt(`Ingrese la cantidad de dinero que desea depositar`));
      let tipo = prompt(`Es efectivo o cheque? (Ingrese "efectivo" o "cheque")`);

      if (tipo === "efectivo" || tipo === "cheque") {
          usuario.saldoCuenta += cantidad;
          alert(`Depósito exitoso. Tu nuevo saldo es ${usuario.saldoCuenta}`);
      } else {
          alert(`Tipo de depósito inválido.`);
      }
  } else {
      alert(`No hay usuarios con este ID`);
  }
}

// Funcion para retirar dinero de la cuenta con ID 
function retirar(id) {
  let usuario = arrayUsuarios.find(usuario => usuario.identificacion === id);
  if (usuario) {
      if (usuario.saldoCuenta <= 0) {
          alert(`No hay saldo en esta cuenta`);
      } else {
          let cantidad = parseInt(prompt(`Ingrese la cantidad de dinero que desea retirar (múltiplos de 50000)`));

          if (cantidad % 50000 !== 0) {
              alert(`Solo puedes retirar en múltiplos de 50000`);
          } else if (usuario.saldoCuenta < cantidad) {
              alert(`La cantidad ingresada es mayor al saldo que hay disponible en la cuenta`);
          } else {
              usuario.saldoCuenta -= cantidad;
              alert(`Retiro exitoso, puede tomar ${cantidad} de la bandeja principal. Tu nuevo saldo es ${usuario.saldoCuenta}`);
          }
      }
  } else {
      alert(`No hay usuarios con este ID`);
  }
}

// Funcion para transferir de una cuenta a otra
function transferir(id) {
  let usuario = arrayUsuarios.find(usuario => usuario.identificacion === id);
  if (usuario) {
      let idDestino = parseInt(prompt(`Ingrese el ID de la cuenta destino`));
      let usuarioDestino = arrayUsuarios.find(usuario => usuario.identificacion === idDestino);

      if (usuarioDestino) {
          let cantidad = parseInt(prompt(`Ingrese la cantidad de dinero que desea transferir`));

          if (usuario.saldoCuenta < cantidad) {
              alert(`La cantidad ingresada es mayor al saldo que hay disponible en la cuenta`);
          } else {
              usuario.saldoCuenta -= cantidad;
              usuarioDestino.saldoCuenta += cantidad;
              alert(`Transferencia exitosa. Tu nuevo saldo es ${usuario.saldoCuenta}`);
          }
      } else {
          alert(`No hay usuarios con este ID de destino`);
      }
  } else {
      alert(`No hay usuarios con este ID`);
  }
}

// Funcion para consultar el saldo 
function consultarSaldo(id) {
  let usuario = arrayUsuarios.find(usuario => usuario.identificacion === id);
  if (usuario) {
      alert(`Tu saldo es ${usuario.saldoCuenta}`);
  } else {
      alert(`No hay usuarios con este ID`);
  }
}

// Funcion para validar un usuario 
function validarUsuario() {
  let id = parseInt(prompt(`Ingrese su número de ID`));
  let usuario = arrayUsuarios.find(usuario => usuario.identificacion === id);
  if (usuario) {
      let intentos = 0;
      while (intentos < 3) {
          let pin = parseInt(prompt(`Ingrese su PIN de 4 dígitos`));
          if (usuario.pin === pin) {
              return id;
          } else {
              alert(`PIN incorrecto. Intente de nuevo.`);
              intentos++;
          }
      }
      alert(`Ha excedido el número de intentos permitidos.`);
      return null;
  } else {
      alert(`No hay usuarios con este ID`);
      return null;
  }
}

// Funcion del cajero como tal
const ATM = () => {
  let operando = true;

  while (operando) {
      let operacion = prompt(`Ingrese "on" para encender el cajero automático o "off" para apagarlo`).toLowerCase();
      if (operacion === "on") {
          let idUsuario = validarUsuario();
          if (idUsuario) {
              let continuar = true;
              while (continuar) {
                  let menu = parseInt(prompt(`Ingrese un número para lo que desee hacer \n 1- Ingresar un usuario nuevo (ID y PIN) \n 2- Depositar \n 3- Retirar \n 4- Transferir \n 5- Consultar saldo \n 6- Salir`));
                  switch (menu) {
                      case 1:
                          ingresarUsuarios();
                          break;
                      case 2:
                          depositar(idUsuario);
                          break;
                      case 3:
                          retirar(idUsuario);
                          break;
                      case 4:
                          transferir(idUsuario);
                          break;
                      case 5:
                          consultarSaldo(idUsuario);
                          break;
                      case 6:
                          continuar = false;
                          break;
                      default:
                          alert(`Opción no válida`);
                          break;
                  }
              }
          }
      } else if (operacion === "off") {
          operando = false;
          alert(`Cajero automático apagado.`);
      } else {
          alert(`Opción no válida. Por favor ingrese "on" o "off".`);
      }
  }
}

// Inicia el programa
ATM();

 