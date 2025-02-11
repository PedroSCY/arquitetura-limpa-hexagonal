import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha";
import ProvedorCriptografia from "../src/exemplo/app/usuario/ProvedorCriptografia";
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco";
import CriptoReal from "../src/exemplo/adaptadores/auth/CriptoReal";
import ColecaoUsuario from "../src/exemplo/app/usuario/ColecaoUsuario";
import ColecaoUsuarioDB from "../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB";

test("Deve registrar um usuário invertendo a senha", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = await casoDeUso.executar("joão", "joao@user.com", "senha123");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(user.senha).toBe("321ahnes");
});

test("Deve registrar um usuário com senha com espaços", async() => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new SenhaComEspaco();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = await casoDeUso.executar("joão", "joao@user.com", "123456");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(user.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new CriptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = await casoDeUso.executar("joão", "joao@user.com", "123456");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(provedorCriptografia.comparar("123456", user.senha!)).toBeTruthy();
});

test("Deve lançar erro ao cadastrar usuario já cadastrado", async () => {
  const colecao: ColecaoUsuario = new UsuarioEmMemoria();
  const provedorCriptografia: ProvedorCriptografia = new CriptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const userInfo = {nome: "joão", email: "joao@user.com", senha: "123456"}
  
  await casoDeUso.executar(userInfo.nome, userInfo.email, userInfo.senha);

  const exec = async () =>  await casoDeUso.executar(userInfo.nome, userInfo.email, userInfo.senha);

  await expect(exec).rejects.toThrow("Usuário já existe")

});


test.skip("Deve registrar um usuário no banco de dados", async () => {
  const colecao: ColecaoUsuario = new ColecaoUsuarioDB();
  const provedorCriptografia: ProvedorCriptografia = new CriptoReal();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCriptografia);

  const user = await casoDeUso.executar("joão", "joao@user.com", "123456");

  expect(user).toHaveProperty("id");
  expect(user.nome).toBe("joão");
  expect(provedorCriptografia.comparar("123456", user.senha!)).toBeTruthy();
});
