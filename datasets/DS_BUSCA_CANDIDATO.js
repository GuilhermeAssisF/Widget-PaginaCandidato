function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    // 1. Cria as colunas de retorno
    dataset.addColumn("txtNomeColaborador");
    dataset.addColumn("txtEmail");
    dataset.addColumn("cpfcnpj");
    dataset.addColumn("txtCELULAR");
    dataset.addColumn("dtDataNascColaborador");
    dataset.addColumn("status");
    dataset.addColumn("mensagem");

    // 2. Busca o ID da solicitação
    var idProcesso = "";
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "idProcessoFluig") {
                idProcesso = constraints[i].initialValue;
            }
        }
    }

    if (idProcesso == "") {
        dataset.addRow(["", "", "", "", "", "ERRO", "ID da solicitação não informado"]);
        return dataset;
    }

    try {
        log.info("DS_BUSCA_CANDIDATO: Iniciando busca para Solicitacao: " + idProcesso);

        // 3. Consulta o Dataset do Formulário
        var nomeDatasetFormulario = "DS_FLUIG_0002"; 
        var c1 = DatasetFactory.createConstraint("WKNumProces", idProcesso, idProcesso, ConstraintType.MUST);
        var dsForm = DatasetFactory.getDataset(nomeDatasetFormulario, null, [c1], null);

        if (dsForm != null && dsForm.rowsCount > 0) {
            
            // Função auxiliar para buscar valor sem quebrar se a coluna não existir
            function getCampoSeguro(dataset, linha, nomeCampo) {
                try {
                    // Tenta buscar exato
                    var valor = dataset.getValue(linha, nomeCampo);
                    
                    // Se veio null ou undefined, retorna vazio
                    if (valor == null || valor == undefined) return "";
                    return valor;
                } catch (e) {
                    // Se deu erro (ex: coluna não existe), tenta buscar em MAIÚSCULO (comum no Fluig)
                    try {
                        var valorUpper = dataset.getValue(linha, nomeCampo.toUpperCase());
                        if (valorUpper == null || valorUpper == undefined) return "";
                        return valorUpper;
                    } catch (e2) {
                        return ""; // Desiste e retorna vazio
                    }
                }
            }

            var nome    = getCampoSeguro(dsForm, 0, "txtNomeColaborador");
            var email   = getCampoSeguro(dsForm, 0, "txtEmail");
            var cpf     = getCampoSeguro(dsForm, 0, "cpfcnpj");
            var celular = getCampoSeguro(dsForm, 0, "txtCELULAR");
            var nasc    = getCampoSeguro(dsForm, 0, "dtDataNascColaborador");

            log.info("DS_BUSCA_CANDIDATO: Dados encontrados - Nome: " + nome);

            dataset.addRow([
                nome, 
                email, 
                cpf, 
                celular, 
                nasc, 
                "OK",
                "Sucesso"
            ]);

        } else {
            log.warn("DS_BUSCA_CANDIDATO: Solicitação não encontrada no DS_FLUIG_0002.");
            dataset.addRow(["", "", "", "", "", "ERRO", "Solicitação " + idProcesso + " não encontrada no formulário."]);
        }

    } catch (e) {
        log.error("DS_BUSCA_CANDIDATO: ERRO CRITICO: " + e.toString());
        dataset.addRow(["", "", "", "", "", "ERRO", "Erro no servidor: " + e.toString()]);
    }

    return dataset;
}