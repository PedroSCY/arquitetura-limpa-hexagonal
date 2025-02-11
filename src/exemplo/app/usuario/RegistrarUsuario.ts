import Colecao from "../portas/Colecao";
import ProvedorCriptografia from "../portas/ProvedorCriptografia";


export default class RegistrarUsuario {
  constructor(
    private colecao: Colecao,
    private provedorCriptografia: ProvedorCriptografia
  ) {}

  executar(nome: string, email: string, senha: string) {
    const senhaCripto = this.provedorCriptografia.criptografar(senha);

    const usuario = {
      id: Math.random(),
      nome,
      email,
      senha: senhaCripto,
    };

    this.colecao.inserir(usuario);
    return usuario;
  }
}
