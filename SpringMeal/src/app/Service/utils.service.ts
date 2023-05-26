import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  capitalizeFirst(text: string): string {
    if (text.length === 0) {
      return text; 
    }
    const firstLetter = text.charAt(0).toUpperCase(); 
    const restOfText = text.slice(1);
    return firstLetter + restOfText; // Retorna la cadena amb la primera lletra en majúscules
  }
  
}
