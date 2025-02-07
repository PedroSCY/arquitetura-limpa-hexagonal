import RegistrarUsuario from '../src/RegistrarUsuario'

test('Deve registrar um usuário', () => {
    const registrarUsuario = new RegistrarUsuario()


    const user = registrarUsuario.executar("joão","joao@user.com", "senha123")


    expect(user).toHaveProperty("id")
    expect(user.nome).toBe("joão")
    expect(registrarUsuario.usuarios[0]).toBe(user)

})