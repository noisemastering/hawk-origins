import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ScannerDetectionModule, ScanDetected} from 'ngx-scanner-detection';

@Component({
  selector: 'app-ingreso-por-scanner',
  templateUrl: './ingreso-por-scanner.component.html',
  styleUrls: ['./ingreso-por-scanner.component.scss']
})

export class IngresoPorScannerComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  handle(event: ScanDetected) {
    console.log(event);
    this.input.nativeElement.value = event.barcode;
  }

  constructor() { }

  ngOnInit() {
  }

  // dummy
  simulateScanner() {
    console.log('Entró');
    const s = '1234567890123';
    for (let i = 0; i < s.length; i++) {
      const e = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : s[i], shiftKey : false});
      setTimeout(() => document.dispatchEvent(e));
    }
    const xe = new KeyboardEvent('keyup', {bubbles : true, cancelable : true, key : 'Enter', shiftKey : false});
    setTimeout(() => document.dispatchEvent(xe));
  }

}

interface ScannerConfiguration {
  minLength?: number; // 7
  maxLength?: number; //  14
  scannerStartsWith?: string; // '' - characters to trim before the code
  scannerEndsWith?: string; // '' - characters to trim after the code
  scanTimeout?: number; // 100 - timeout for detection in ms
  replaceNotNumber?: boolean; // true - allowes numbers only [0-9], replace everything else
  allowNotNumber?: boolean; // false  - allowes numbers only [0-9], replace everything else
  ignoreOverElement?: string[]; // ['INPUT'] - array of tag names that should disable emit
  barcodeType?: string; // ean13 - gtin[d] or ean[\]
}
