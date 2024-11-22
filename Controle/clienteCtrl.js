import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;

            // Pseudo-validação
            if (nome && cpf && endereco &&
                numero > 0 && bairro && cidade && uf && cep) {
                // Gravar o cliente
                const cliente = new Cliente(0, nome, cpf, endereco, numero, bairro, cidade, uf, cep);
                cliente.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente adicionado com sucesso!",
                            "codigo": cliente.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
                }
                );
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            // O código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const endereco = requisicao.body.endereco;
            const numero = requisicao.body.numero;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const cep = requisicao.body.cep;
            // Validação de regra de negócio
            if (codigo > 0 && nome && cpf && endereco && numero > 0 && bairro && cidade && uf && cep) {
                // Alterar o cliente
                const cliente = new Cliente(codigo, nome, cpf, endereco, numero, bairro, cidade, uf, cep);
                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o cliente: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
                }
                );
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            // O código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            // Pseudo-validação
            if (codigo > 0) {
                // Alterar o cliente
                const cliente = new Cliente(codigo);
                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o cliente: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um código válido de um cliente conforme documentação da API."
                }
                );
            }

        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            // Evitar que código tenha valor undefined
            if (isNaN(codigo)) {
                codigo = "";
            }
            const cliente = new Cliente();
            // Método consultar retorna uma lista de usuário
            cliente.consultar(codigo)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar clientes: " + erro.message
                    }
                    );
                });

        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            }
            );
        }
    }
}