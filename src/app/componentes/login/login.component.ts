import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import{Usuario} from 'src/app/model/Usuario';
import{Token} from 'src/app/model/Token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private mensagem:number;
  private usuario:Usuario = new Usuario();

  constructor(private srv: UsuarioService, private router: Router) {
    this.mensagem=0;
   }

  ngOnInit() {
    if(localStorage.getItem("vickToken")){
      this.router.navigate(['/listagem']);
    }
  }
  enviarDados(){
    this.srv.autenticar(this.usuario).subscribe(
      (res:Token)=>{
        localStorage.setItem("vickToken",res.strToken);
        this.mensagem = 0;
        this.router.navigate(['/listagem']);
      },
      (err)=>{
        this.mensagem = 1;
      }
    );
  }

}
