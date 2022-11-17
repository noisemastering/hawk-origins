///////////// No Mover!!!!! //////////////////////////////////////////////////////////////
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';               //
import { FormGroup, FormControl, ReactiveFormsModule,                                   //
        FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';             //
import { MatDialogRef } from '@angular/material';                                       //       
import { Response } from 'src/app/shared/classes/response';                             //
import { SpinnerComponent } from 'src/app/widgets/spinner/spinner.component';           // 
//     Servicios custom                                                                 //
import { NotificationsService } from 'src/app/servicios/notifications.service';         //
import { UsuariosService } from 'src/app/servicios/usuarios.service';                   //
import { Usuario } from 'src/app/shared/classes/usuario';                               //
import { Router } from '@angular/router';                                               //
///////////// /No Mover!!!!! /////////////////////////////////////////////////////////////

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

///////////////////// No mover !!! ///////////////////////////////////
  theForm: FormGroup;                                       //
  submitted= false;                                                 //
  spinner: SpinnerComponent= new SpinnerComponent;                  //
  working: boolean= false;                                          //
  user: Usuario;                                                    //  
/////////////////// /No mover !!! ////////////////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService,
    private theService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/hawk/dashboard');
    }
    this.theForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  validate() { // No mover
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.theForm.invalid) {
      console.log('Form invalid');
      return;
    }else{
      this.sendCredentials();
    }
  }

  // Adaptar al modelo correspondiente
  sendCredentials(): void {
    //Si no funciona, hay que inicializarlo a pie
    this.user = new Usuario();
    this.user.Clave= this.theForm.controls['username'].value;
    this.user.Password=  this.theForm.controls['password'].value;
    console.log("Usuario: ", this.user)
    this.theService.sendCredentials(this.user as Usuario)
      .subscribe(
        (res) => {
          let u= new Usuario;
          u= res as Usuario;
          localStorage.setItem('Token', 'token');
          localStorage.setItem("Usuario", JSON.stringify(u));
          this.notificationService.success('Bienvenido a Hawk 2.0');
          this.router.navigateByUrl('/hawk/dashboard');
        },
        err => {
          this.notificationService.error('Credenciales inválidas, vuelva a intentarlo');
          this.theForm.reset(); 
        }
      );
  }

  get f() { return this.theForm.controls; } // Mo mover!!!

}
