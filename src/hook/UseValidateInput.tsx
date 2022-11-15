export function UseValidateInput() {
  /** Funcion para validar un campo cuando esta vacio */
  const validateEmpty = (value: string) => {
    if (value !== '') return false;
    return true;
  }

  /** Validar que un campo solo tenga numeros */
  const validateNumber = (value: string) => {
    const soloNumeros = /^[0-9]+$/;
    if(value && value.match(soloNumeros)) return true;
    return false;
  }

  /** Validar que un campo solo tenga letras */
  const validateLetter = (value: string) => {
    const soloLetras = /^[a-zA-Z]+$/;
    if(value && value.match(soloLetras)) return true;
    return false;
  }

  /** Funcion para validar que el correo sea valido */
  const validateEmail = (value: string) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!regex.test(value)) return true;
    return false;
  }

  /** Validar que una contraseña cumpla con la estructura sugerida */
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&/+.])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/;
    if(!regex.test(value)) return true;
    return false;
  }

  return { validateEmpty, validateNumber, validateLetter, validateEmail, validatePassword }

}
