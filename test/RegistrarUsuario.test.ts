import BancoEmMemoria from "../src/exemplo/adaptadores/db/BancoEmMemoria";
import Colecao from "../src/exemplo/app/portas/Colecao";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha";
import ProvedorCriptografia from "../src/exemplo/app/portas/ProvedorCriptografia";
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco";

test("Deve registrar um usuário invertendo a senha", () => {
  const colecao: Colecao = new BancoEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new InverterSenha();

  const registrarUsuario = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = registrarUsuario.executar("joão", "joao@user.com", "senha123");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(user.senha).toBe("321ahnes");
});

test("Deve registrar um usuário com senha com espaços", () => {
  const colecao: Colecao = new BancoEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new SenhaComEspaco();

  const registrarUsuario = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = registrarUsuario.executar("joão", "joao@user.com", "123456");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(user.senha).toBe("1 2 3 4 5 6");
});
