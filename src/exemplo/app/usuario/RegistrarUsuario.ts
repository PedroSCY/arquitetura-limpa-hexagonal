import Colecao from "../portas/Colecao";
import ProvedorCriptografia from "../portas/ProvedorCriptografia";
import Usuario from "./Usuario";


export default class RegistrarUsuario {
  constructor(
    private colecao: Colecao,
    private provedorCriptografia: ProvedorCriptografia
  ) {}

  executar(nome: string, email: string, senha: string): Usuario {
    const senhaCripto = this.provedorCriptografia.criptografar(senha);

    const usuario: Usuario = {
      id: Math.random().toString(),
      nome,
      email,
      senha: senhaCripto,
    };

    this.colecao.inserir(usuario);
    return usuario;
  }
}
