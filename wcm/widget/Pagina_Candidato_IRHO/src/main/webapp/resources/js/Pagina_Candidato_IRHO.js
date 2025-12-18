var AdmissaoWidget = SuperWidget.extend({
    // Variáveis da Widget
    passoAtual: 1,
    totalPassos: 6,
    configDocs: [],

    // Método executado ao iniciar
    init: function () {
        var that = this;

        // Captura o ID da URL (?id_origem=12345)
        var urlParams = new URLSearchParams(window.location.search);
        var idOrigem = urlParams.get('id_origem');

        if (idOrigem) {
            $("#idSolicitacaoRH_" + this.instanceId).val(idOrigem);
            console.log("ID Origem encontrado: " + idOrigem);

            // Chama a função para buscar os dados usando o novo Dataset
            this.carregarDadosIniciais(idOrigem);
        } else {
            console.warn("Nenhum ID de origem encontrado na URL.");
        }

        this.carregarConfiguracaoDocs();

        this.atualizarBotoes();
    },

    carregarDadosIniciais: function (idProcesso) {
        var that = this;

        // --- 1. DADOS DE AUTENTICAÇÃO (Mantenha suas chaves aqui) --
        var oauthData = {
            consumer: {
                key: 'CONSUMER_KEY',        // CONSUMER_KEY
                secret: 'CONSUMER_SECRET'   // CONSUMER_SECRET
            },
            token: {
                key: 'ACCESS_TOKEN',        // ACCESS_TOKEN
                secret: 'SECRET_TOKEN'      // SECRET_TOKEN
            },
            signature_method: 'HMAC-SHA1'
        };

        // --- 2. PREPARAR URL ---
        var baseUrl = WCMAPI.getServerURL();
        var urlEndpoint = baseUrl + '/api/public/ecm/dataset/datasets';

        // --- 3. PAYLOAD REAL (O que será enviado) ---
        var payloadReal = {
            name: "ds_dados_publicos_candidato",
            constraints: [{
                _field: "idProcessoFluig",
                _initialValue: idProcesso,
                _finalValue: idProcesso,
                _type: 1,
                _likeSearch: false
            }]
        };

        // --- 4. DADOS PARA ASSINATURA (O Pulo do Gato) ---
        // Para JSON, não passamos o 'data' na hora de assinar
        var requestForSigning = {
            url: urlEndpoint,
            method: 'POST',
            data: {} // VAZIO: O segredo para corrigir o "signature_invalid" em JSON
        };

        // --- 5. GERAR ASSINATURA ---
        var oauth = OAuth({
            consumer: oauthData.consumer,
            signature_method: oauthData.signature_method,
            hash_function: function (base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });

        var token = oauthData.token;
        var authHeader = oauth.toHeader(oauth.authorize(requestForSigning, token));

        // --- 6. CHAMADA AJAX ---
        $.ajax({
            url: urlEndpoint,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payloadReal), // Envia o payload real
            headers: {
                "Authorization": authHeader.Authorization
            },
            success: function (data) {
                if (data && data.content && data.content.values && data.content.values.length > 0) {
                    var registro = data.content.values[0];
                    console.log("Registro encontrado:", registro);

                    // --- 1. PREENCHIMENTO DA ABA "SEUS DADOS" (Mantido) ---
                    if (registro.txtNomeColaborador) {
                        $("#cand_nomeCompleto_" + that.instanceId).val(registro.txtNomeColaborador);
                        // Atualiza mensagem de boas vindas se existir o span
                        $("#span_nome_msg_" + that.instanceId).text(registro.txtNomeColaborador.split(" ")[0]);
                    }
                    if (registro.txtEmail) $("#cand_email_" + that.instanceId).val(registro.txtEmail);
                    if (registro.cpfcnpj) $("#cand_cpf_" + that.instanceId).val(registro.cpfcnpj);
                    if (registro.txtTELEFONE) $("#cand_celular_" + that.instanceId).val(registro.txtTELEFONE);

                    // Tratamento da Data de Nascimento (Formato DD/MM/AAAA para AAAA-MM-DD se necessário)
                    var dtNasc = registro.dtDataNascColaborador;
                    if (dtNasc) {
                        if (dtNasc.indexOf('/') > -1) {
                            var p = dtNasc.split('/');
                            $("#cand_nascimento_" + that.instanceId).val(p[2] + "-" + p[1] + "-" + p[0]);
                        } else {
                            $("#cand_nascimento_" + that.instanceId).val(dtNasc);
                        }
                    }

                    // --- 2. PREENCHIMENTO DA ABA "CONTRATAÇÃO" (Novos Mapeamentos) ---
                    // Aqui conectamos o nome da COLUNA DO DATASET ao ID DO HTML

                    if (registro.FUN_EMPRESA_DESC_AD) {
                        $("#cand_empresa_" + that.instanceId).val(registro.FUN_EMPRESA_DESC_AD);
                    }

                    if (registro.FUN_ADMISSAO) {
                        $("#cand_data_admissao_" + that.instanceId).val(registro.FUN_ADMISSAO);
                    }

                    if (registro.FUN_SECAO_IDDESC_AD) {
                        $("#cand_secao_" + that.instanceId).val(registro.FUN_SECAO_IDDESC_AD);
                    }

                    if (registro.FUN_IDDESCFUN) {
                        $("#cand_funcao_" + that.instanceId).val(registro.FUN_IDDESCFUN);
                    }

                    if (registro.FUN_VLRSALARIO) {
                        // Formata para moeda se vier apenas número, ou exibe direto
                        $("#cand_salario_" + that.instanceId).val(registro.FUN_VLRSALARIO);
                    }

                    if (registro.FUN_IDDESCTURN) {
                        $("#cand_turno_" + that.instanceId).val(registro.FUN_IDDESCTURN);
                    }

                    // --- 3. PREENCHIMENTO DA ABA "EXAME MÉDICO" (Novos Mapeamentos) ---

                    if (registro.cpDataHoraExame) {
                        $("#cand_exame_datahora_" + that.instanceId).val(registro.cpDataHoraExame);
                    }

                    if (registro.cpNomeClinica) {
                        $("#cand_exame_clinica_" + that.instanceId).val(registro.cpNomeClinica);
                    }

                    if (registro.cpEnderecoClinica) {
                        $("#cand_exame_endereco_" + that.instanceId).val(registro.cpEnderecoClinica);
                    }

                    // Se houver campo de orientação, mapeie aqui também
                    // if (registro.cpOrientacao) $("#cand_exame_orientacao_" + that.instanceId).val(registro.cpOrientacao);

                    FLUIGC.toast({ title: 'Sucesso', message: 'Dados carregados.', type: 'success' });
                } else {
                    FLUIGC.toast({ title: 'Atenção', message: 'Solicitação não encontrada ou sem dados públicos.', type: 'warning' });
                }
            },
            error: function (xhr, status, error) {
                console.error("Erro OAuth:", xhr);
                FLUIGC.toast({ title: 'Erro', message: 'Falha na autenticação (' + xhr.status + ' - ' + xhr.statusText + ')', type: 'danger' });
            }
        });
    },

    // --- NOVAS FUNÇÕES PARA DOCUMENTOS DINÂMICOS ---

    carregarConfiguracaoDocs: function () {
        var that = this;
        console.log("Iniciando carga de documentos dinâmicos...");

        // Configuração OAuth (Mesmas chaves do seu código original)
        var oauthData = {
            consumer: { key: 'CONSUMER_KEY', secret: 'CONSUMER_SECRET' },
            token: { key: 'ACESS_TOKEN', secret: 'SECRET_TOKEN' },
            signature_method: 'HMAC-SHA1'
        };

        var urlEndpoint = WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets';

        // Payload para buscar o dataset de configuração criado no GED
        var payload = {
            name: "ds_config_docs_admissao", // Nome que você definiu na exportação
            constraints: []
        };

        var requestForSigning = { url: urlEndpoint, method: 'POST', data: {} };
        var oauth = OAuth({
            consumer: oauthData.consumer,
            signature_method: oauthData.signature_method,
            hash_function: function (base_string, key) { return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64); }
        });

        var authHeader = oauth.toHeader(oauth.authorize(requestForSigning, oauthData.token));

        $.ajax({
            url: urlEndpoint,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            headers: { "Authorization": authHeader.Authorization },
            success: function (data) {
                if (data && data.content && data.content.values) {
                    console.log("Configuração de Docs carregada:", data.content.values);
                    that.renderizarDocumentos(data.content.values);
                } else {
                    $("#container_documentos_dinamicos_" + that.instanceId).html('<div class="alert alert-warning">Nenhum documento configurado.</div>');
                }
            },
            error: function (xhr) {
                console.error("Erro ao carregar config docs", xhr);
                $("#container_documentos_dinamicos_" + that.instanceId).html('<div class="alert alert-danger">Erro ao carregar documentos.</div>');
            }
        });
    },

    renderizarDocumentos: function (lista) {
        var that = this;
        var htmlDocs = "";
        var htmlInputs = "";

        // Salva na variável global para usar na validação depois
        this.configDocs = lista;

        for (var i = 0; i < lista.length; i++) {
            var doc = lista[i];

            // Pula registros inválidos (às vezes datasets pai-filho trazem metadados)
            if (!doc.doc_campo_interno) continue;

            var idCampo = doc.doc_campo_interno.trim();
            var titulo = doc.doc_titulo || "Documento";
            var desc = doc.doc_descricao || "Anexar arquivo";
            var icone = doc.doc_icone || "flaticon-file-check";
            var obrigatorio = (doc.doc_obrigatorio == "true");

            // --- GERA O CARD VISUAL ---
            htmlDocs += '<div class="col-md-4 col-sm-6 mb-15" style="margin-bottom: 20px;">';
            // Note o 'upload-box' chamando o ID correto
            htmlDocs += '  <div class="upload-box" data-trigger-upload="file_' + idCampo + '_' + that.instanceId + '" id="box_' + idCampo + '_' + that.instanceId + '" style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 5px; cursor: pointer; transition: all 0.3s;">';
            htmlDocs += '    <i class="flaticon ' + icone + ' icon-xl text-info"></i>';
            htmlDocs += '    <h5 style="font-weight:bold; margin-top: 10px;">' + titulo + (obrigatorio ? ' <span class="text-danger">*</span>' : '') + '</h5>';
            htmlDocs += '    <p class="text-muted small" id="status_' + idCampo + '_' + that.instanceId + '">' + desc + '</p>';
            htmlDocs += '    <button type="button" class="btn btn-default btn-xs" style="margin-top: 5px;">Anexar</button>';
            htmlDocs += '  </div>';
            htmlDocs += '</div>';

            // --- GERA OS INPUTS OCULTOS ---
            // Input File (invisível)
            htmlInputs += '<input type="file" id="file_' + idCampo + '_' + that.instanceId + '" class="hidden" accept="image/*,application/pdf" data-process-file="' + idCampo + '" style="display:none;">';
            // Input para salvar o Nome do arquivo
            htmlInputs += '<input type="hidden" id="' + idCampo + '_nome_' + that.instanceId + '">';
            // Input para salvar o Base64
            htmlInputs += '<input type="hidden" id="' + idCampo + '_base64_' + that.instanceId + '">';
        }

        // Injeta o HTML na página
        $("#container_documentos_dinamicos_" + that.instanceId).html(htmlDocs);
        $("#hidden_inputs_container_" + that.instanceId).html(htmlInputs);

        // REAPLICA OS EVENTOS DE CLIQUE (Importante pois o HTML foi recriado)
        // O Fluig as vezes perde o bind em elementos dinâmicos, então forçamos aqui se necessário,
        // mas como seu binding usa delegação (se usar 'data-trigger-upload'), deve funcionar.
        // Se não funcionar o clique, avise que faremos um ajuste no 'bindings'.
    },

    // Bindings e demais funções mantidas conforme seu original
    bindings: {
        local: {
            'nav-next': ['click_proximoPasso'],
            'nav-back': ['click_passoAnterior'],
            'finish': ['click_enviarAPI'],
            'trigger-upload': ['click_abrirSelecaoArquivo'],
            'process-file': ['change_processarArquivo'],
            'add-dependente': ['click_adicionarDependente'],
            'remove-row': ['click_removerLinha']
        }
    },

    // --- MANTIVE A LÓGICA DE NAVEGAÇÃO E UPLOAD DO SEU ARQUIVO ORIGINAL ---
    proximoPasso: function () {
        if (!this.validarPasso(this.passoAtual)) return;
        if (this.passoAtual < this.totalPassos) {
            this.irParaPasso(this.passoAtual + 1);
        }
    },

    passoAnterior: function () {
        if (this.passoAtual > 1) {
            this.irParaPasso(this.passoAtual - 1);
        }
    },

    irParaPasso: function (passoDestino) {
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        $div.find('.step-item').removeClass('active');
        for (var i = 1; i < passoDestino; i++) {
            $div.find('.step-item[data-step="' + i + '"]').addClass('completed');
        }
        $div.find('.step-item[data-step="' + passoDestino + '"]').addClass('active');
        $div.find('.step-content').removeClass('active');
        $div.find('.step-content[data-step-content="' + passoDestino + '"]').addClass('active');
        this.passoAtual = passoDestino;
        this.atualizarBotoes();
        $('html, body').animate({ scrollTop: $div.offset().top - 60 }, 'fast');
    },

    validarPasso: function (passo) {
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        var isValid = true;
        var msg = "";

        if (passo == 1) {
            if (!$div.find("#chkLGPD_" + this.instanceId).is(":checked")) {
                msg = 'Aceite o termo LGPD para continuar.';
                isValid = false;
            }
        }
        if (passo == 2) {
            if ($div.find("#cand_cpf_" + this.instanceId).val() == "") {
                msg = 'Preencha o CPF.';
                isValid = false;
            } else if ($div.find("#cand_nascimento_" + this.instanceId).val() == "") {
                msg = 'Preencha a Data de Nascimento.';
                isValid = false;
            } else if ($div.find("#cand_celular_" + this.instanceId).val() == "") {
                msg = 'Preencha o Celular.';
                isValid = false;
            }
        }
        
        // --- VALIDAÇÃO DINÂMICA DO PASSO 3 ---
        if (passo == 3) {
            if (this.configDocs.length === 0) {
                console.warn("Nenhuma configuração de documentos carregada.");
                // Opcional: Bloquear ou deixar passar se falhou a carga
            }

            for (var i = 0; i < this.configDocs.length; i++) {
                var doc = this.configDocs[i];
                // Pula inválidos
                if (!doc.doc_campo_interno) continue;

                // Verifica se é obrigatório
                if (doc.doc_obrigatorio == "true" || doc.doc_obrigatorio === true) {
                    var campo = doc.doc_campo_interno.trim();
                    var valorBase64 = $div.find("#" + campo + "_base64_" + this.instanceId).val();
                    
                    if (!valorBase64 || valorBase64 === "") {
                        msg = "O documento <strong>" + doc.doc_titulo + "</strong> é obrigatório.";
                        isValid = false;
                        break; // Para no primeiro erro e mostra o toast
                    }
                }
            }
        }

        if (!isValid) {
            FLUIGC.toast({ title: 'Atenção', message: msg, type: 'warning' });
            return false;
        }
        return true;
    },

    atualizarBotoes: function () {
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        var btnVoltar = $div.find("[data-nav-back]");
        var btnAvancar = $div.find("[data-nav-next]");
        var btnFinalizar = $div.find("[data-finish]");

        btnVoltar.prop("disabled", this.passoAtual === 1);

        if (this.passoAtual === this.totalPassos) {
            btnAvancar.hide();
            btnFinalizar.show();
        } else {
            btnAvancar.show();
            btnFinalizar.hide();
        }
    },

    abrirSelecaoArquivo: function (el) {
        var idInput = $(el).data("trigger-upload");
        $("#" + idInput).trigger('click');
    },

    processarArquivo: function (el) {
        var that = this;
        var input = el;
        var prefixoCampo = $(el).data("process-file");

        if (input.files && input.files[0]) {
            var file = input.files[0];
            if (file.size > 5 * 1024 * 1024) {
                FLUIGC.toast({ title: 'Erro', message: 'O arquivo deve ter no máximo 5MB.', type: 'danger' });
                $(input).val("");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#" + prefixoCampo + "_base64_" + that.instanceId).val(e.target.result);
                $("#" + prefixoCampo + "_nome_" + that.instanceId).val(file.name);
                var boxId = "#box_" + prefixoCampo + "_" + that.instanceId;
                var statusId = "#status_" + prefixoCampo + "_" + that.instanceId;
                $(boxId).addClass("uploaded").css("border-color", "#5cb85c").css("background", "#dff0d8");
                $(statusId).html('<i class="flaticon flaticon-check"></i> ' + file.name).css("color", "green").attr("title", file.name);
            };
            reader.readAsDataURL(file);
        }
    },

    adicionarDependente: function () {
        var template = $(".template-dependente").html();
        $("#tbDependentes_" + this.instanceId + " tbody").append(template);
    },

    removerLinha: function (el) {
        $(el).closest('tr').remove();
    },

    enviarAPI: function () {
        var that = this;
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        var idSolicitacao = $("#idSolicitacaoRH_" + this.instanceId).val();

        if (!idSolicitacao) {
            FLUIGC.toast({ title: 'Erro', message: 'ID da solicitação não encontrado.', type: 'danger' });
            return;
        }

        // Feedback Visual
        var btn = $div.find("[data-finish]");
        var textoOriginal = btn.html();
        btn.prop("disabled", true).html('<i class="flaticon flaticon-refresh is-spinning"></i> Enviando...');

        // --- 1. PREPARAÇÃO DOS DADOS (PAYLOAD) ---
        var dadosFormulario = {
            "origem_dados": "pagina_publica",
            
            // Dados Fixos (Etapa 1, 2, 4, 5...)
            "cpfcnpj": $div.find("#cand_cpf_" + this.instanceId).val(),
            "dtDataNascColaborador": $div.find("#cand_nascimento_" + this.instanceId).val(),
            "txtCELULAR": $div.find("#cand_celular_" + this.instanceId).val(),
            "cand_email": $div.find("#cand_email_" + this.instanceId).val(),
            "ValeTransp": ($div.find("#cand_opt_vt_" + this.instanceId).val() == "Sim" ? "1" : "2"),
            "AssistMedica": ($div.find("#cand_opt_saude_" + this.instanceId).val() == "Sim" ? "Sim" : "Nao"),
            "FUN_TERMO_LGPD_AD_1": "Aceito em " + new Date().toLocaleDateString()
            // Remova os campos de documentos fixos que estavam aqui ("cand_doc_rg_nome"...)
        };

        // --- ADIÇÃO DINÂMICA DOS DOCUMENTOS ---
        // Itera sobre a configuração para pegar o que foi uploadado
        for (var i = 0; i < this.configDocs.length; i++) {
            var doc = this.configDocs[i];
            if (!doc.doc_campo_interno) continue;

            var campo = doc.doc_campo_interno.trim();
            
            // Adiciona par Nome e Base64 ao JSON
            // Ex: cand_doc_rg_nome e cand_doc_rg_base64
            dadosFormulario[campo + "_nome"] = $div.find("#" + campo + "_nome_" + this.instanceId).val();
            dadosFormulario[campo + "_base64"] = $div.find("#" + campo + "_base64_" + this.instanceId).val();
        }

        // --- 2. CONFIGURAÇÃO OAUTH ---
        var oauthData = {
            consumer: {
                key: 'CONSUMER_KEY',        // CONSUMER_KEY
                secret: 'CONSUMER_SECRET'   // CONSUMER_SECRET
            },
            token: {
                key: 'ACCESS_TOKEN',        // ACCESS_TOKEN
                secret: 'SECRET_TOKEN'      // SECRET_TOKEN
            },
            signature_method: 'HMAC-SHA1'
        };

        var baseUrl = WCMAPI.getServerURL();
        var urlEndpoint = baseUrl + '/process-management/api/v2/requests/' + idSolicitacao + '/move';
        var proximaAtividade = 97;

        // Payload REAL que será enviado
        var requestData = {
            url: urlEndpoint,
            method: 'POST',
            data: {
                "movementSequence": proximaAtividade,
                "assignee": "admin",
                "formFields": dadosFormulario
            }
        };

        // --- 3. DADOS PARA ASSINATURA (CORREÇÃO DO ERRO 500) ---
        // O corpo "data" deve ser VAZIO na assinatura de JSON
        var requestForSigning = {
            url: urlEndpoint,
            method: 'POST',
            data: {}
        };

        // --- 4. GERAR CABEÇALHO ---
        var oauth = OAuth({
            consumer: oauthData.consumer,
            signature_method: oauthData.signature_method,
            hash_function: function (base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });

        var token = oauthData.token;
        // Assina o objeto vazio, não o payload real
        var authHeader = oauth.toHeader(oauth.authorize(requestForSigning, token));

        // --- 5. CHAMADA AJAX ---
        $.ajax({
            url: requestData.url,
            type: requestData.method,
            contentType: 'application/json',
            headers: {
                "Authorization": authHeader.Authorization
            },
            data: JSON.stringify(requestData.data), // Envia o payload real
            success: function (resp) {
                $div.find(".wizard-card").html(
                    '<div class="alert alert-success text-center" style="padding: 40px;">' +
                    '<i class="flaticon flaticon-check-circle icon-xl"></i><br><br>' +
                    '<h3>Tudo certo!</h3>' +
                    '<p>Suas informações e documentos foram enviados com sucesso para o RH.</p>' +
                    '<p>Você pode fechar esta página agora.</p>' +
                    '</div>'
                );
                $('html, body').animate({ scrollTop: $div.offset().top - 100 }, 'slow');
            },
            error: function (xhr, status, error) {
                console.error("Erro API Move (OAuth):", xhr);
                var msg = 'Não foi possível enviar os dados.';

                if (xhr.status == 500 && xhr.responseText.indexOf("signature_invalid") > -1) {
                    msg = "Erro de assinatura digital (500). Contate o suporte.";
                } else if (xhr.status == 403) {
                    msg = "Permissão negada para movimentar a solicitação.";
                }

                FLUIGC.toast({ title: 'Erro no envio', message: msg, type: 'danger' });
                btn.prop("disabled", false).html(textoOriginal);
            }
        });
    }
});