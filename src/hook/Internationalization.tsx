import React from "react";
import { default as en } from '../language/en/constantes.json';
import { default as es } from '../language/es/constantes.json';

  type Props = {
    children: string,
    className?: string
  }
  
  //* Función para traducir el aplicativo según el idioma que seleccione
  //! NO FUNCIONA
  export const selectLanguage = (idioma: string) => {
    if (idioma === 'en') {
      language = {...en};
    } else if (idioma === 'es') {
      language = {...es};
      console.log(language)
    }
    sessionStorage.setItem('language','en_US')
  }
  
  //* Función para traducir el aplicativo según el lenguaje del navegador
  let language:Record<string, string> = {};
  if (window.navigator.language.includes('en')) {
     language = {...en}; 
  } else if (window.navigator.language.includes('es')) {
    language = {...es}; 
  }


  //* Función para traducir las constantes por medio de sets
  export const trans = (key: string):string => {
    if (language[key]) {
      return language[key];
    } else {
      return 'NT: '+ key;
    }
  }

  //* Función para traducir las constantes por medio de la interfaz
  export const Trans = (props: Props) => {
    const render = () => {
      if (language[props.children]) {
        return (
          <span className={props.className}> {language[props.children]} </span>
        )
      } else {
        return (
          <span className={props.className}> {'NT: '+(props.children)} </span>
        )
      }
    }
    return render();  
  }