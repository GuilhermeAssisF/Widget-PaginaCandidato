var AdmissaoWidget = SuperWidget.extend({
    passoAtual: 1,
    totalPassos: 7,
    configDocs: [],
    abasVisitadas: {},
    usuarioIntegracao: "",
    idOrigem: null,

    // --- INICIALIZAÇÃO ---
    init: function () {
        var that = this;
        var $div = $("#AdmissaoWidget_" + this.instanceId);

        // 1. Loading
        this.mostrarLoading(true);

        // 2. Captura ID
        var urlParams = new URLSearchParams(window.location.search);
        this.idOrigem = urlParams.get('id_origem');

        // 3. Inicia cadeia: Usuário -> Dados -> Docs
        this.descobrirUsuarioToken();

        this.iniciarListeners($div);
        this.atualizarBotoes();
    },

    // -------------------------------------------------------------------------
    // CADEIA DE CARREGAMENTO
    // -------------------------------------------------------------------------

    descobrirUsuarioToken: function () {
        var that = this;
        var url = WCMAPI.getServerURL() + '/api/public/2.0/users/getCurrent';

        $.ajax({
            url: url, type: 'GET',
            headers: { "Authorization": that.getOAuthHeader(url, 'GET').Authorization },
            success: function (data) {
                if (data && data.login) {
                    that.usuarioIntegracao = data.login;
                }
            },
            error: function () { console.warn("Falha auth usuário."); },
            complete: function () {
                if (that.idOrigem) {
                    $("#idSolicitacaoRH_" + that.instanceId).val(that.idOrigem);
                    that.carregarDadosIniciais(that.idOrigem);
                } else {
                    that.carregarConfiguracaoDocs();
                }
            }
        });
    },

    carregarDadosIniciais: function (id) {
        var that = this;
        var url = WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets';
        var data = { name: "ds_dados_publicos_candidato", constraints: [{ _field: "idProcessoFluig", _initialValue: id, _finalValue: id, _type: 1, _likeSearch: false }] };

        $.ajax({
            url: url, type: 'POST', contentType: 'application/json', data: JSON.stringify(data),
            headers: { "Authorization": that.getOAuthHeader(url, 'POST').Authorization },
            success: function (res) {
                if (res.content && res.content.values && res.content.values.length > 0) {
                    var r = res.content.values[0];
                    var map = {
                        "txtNomeColaborador": "cand_nomeCompleto_", "txtEmail": "cand_email_", "cpfcnpj": "cand_cpf_", "txtTELEFONE": "cand_celular_",
                        "FUN_EMPRESA_DESC_AD": "cand_empresa_", "FUN_ADMISSAO": "cand_data_admissao_", "FUN_SECAO_IDDESC_AD": "cand_secao_",
                        "FUN_IDDESCFUN": "cand_funcao_", "FUN_VLRSALARIO": "cand_salario_", "FUN_IDDESCTURN": "cand_turno_",
                        "cpDataHoraExame": "cand_exame_datahora_", "cpNomeClinica": "cand_exame_clinica_", "cpEnderecoClinica": "cand_exame_endereco_"
                    };
                    for (var k in map) if (r[k]) $("#" + map[k] + that.instanceId).val(r[k]);

                    if (r.dtDataNascColaborador) {
                        var d = r.dtDataNascColaborador.split('/');
                        if (d.length == 3) $("#cand_nascimento_" + that.instanceId).val(d[2] + "-" + d[1] + "-" + d[0]);
                        else $("#cand_nascimento_" + that.instanceId).val(r.dtDataNascColaborador);
                    }
                    if (r.cpOrientacao) { $("#cand_exame_orientacao_" + that.instanceId).val(r.cpOrientacao); $("#text_exame_orientacao_" + that.instanceId).text(r.cpOrientacao); }
                }
            },
            complete: function () { that.carregarConfiguracaoDocs(); }
        });
    },

    carregarConfiguracaoDocs: function () {
        var that = this;
        var url = WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets';
        var data = { name: "ds_lista_documentos_admissao", constraints: [] };

        $.ajax({
            url: url, type: 'POST', contentType: 'application/json', data: JSON.stringify(data),
            headers: { "Authorization": that.getOAuthHeader(url, 'POST').Authorization },
            success: function (res) {
                if (res.content && res.content.values) that.renderizarDocumentos(res.content.values);
            },
            complete: function () { that.mostrarLoading(false); }
        });
    },

    // -------------------------------------------------------------------------
    // LISTENERS E UI
    // -------------------------------------------------------------------------

    iniciarListeners: function ($div) {
        var that = this;
        this.marcarAbaComoVisitada('tab_pessoais_' + this.instanceId);
        
        $div.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var targetId = $(e.target).attr("href").replace("#", "");
            that.marcarAbaComoVisitada(targetId);
        });

        $div.find("[data-nav-next]").hover(function () {
            if (that.passoAtual == 2 && !that.verificarTodasAbasVisitadas(true)) {
                $(this).attr("title", "Você precisa visualizar todas as abas antes de avançar.");
            } else { $(this).attr("title", ""); }
        });

        // Adiciona dependente "Mãe" se não houver
        if ($div.find(".dependente-card").length === 0) this.adicionarDependente("Mae", true);
        
        // Listener para Parentesco (Mostrar Certidão se for Filho)
        $div.on("change", ".dep-parentesco", function() {
            var val = $(this).val();
            var $row = $(this).closest(".dependente-card");
            if (val === "Filho" || val === "Filho Invalido") {
                $row.find(".container-certidao").slideDown();
            } else {
                $row.find(".container-certidao").slideUp();
                // Limpar arquivo se mudar? Opcional.
            }
        });

        // Listener Lógica Deficiência
        $div.find("#cand_possui_deficiencia_" + this.instanceId).on("change", function() {
            var valor = $(this).val();
            var $divTipo = $("#div_tipo_deficiencia_" + that.instanceId);
            if (valor === "Sim") { $divTipo.show(); } else { $divTipo.hide(); }
        });

        // Listeners Docs Extras (CNH/Reservista)
        $div.find("#cand_cnh_possuo_" + this.instanceId).on("change", function() {
            if($(this).val() === "Sim") $("#div_campos_cnh_" + that.instanceId).slideDown();
            else $("#div_campos_cnh_" + that.instanceId).slideUp();
        });
        $div.find("#cand_reservista_possuo_" + this.instanceId).on("change", function() {
            if($(this).val() === "Sim") $("#div_campos_reservista_" + that.instanceId).slideDown();
            else $("#div_campos_reservista_" + that.instanceId).slideUp();
        });

        $div.on("input", ".dep-cpf", function () { $(this).val(that.mascaraCPF($(this).val())); });
        
        $("#file_cand_foto_" + this.instanceId).on('change', function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) { $("#preview_foto_" + that.instanceId).css('background-image', 'url(' + e.target.result + ')').css('background-size', 'cover').html(''); }
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        $div.find("#cand_celular_" + this.instanceId + ", #cand_emergencia_telefone_" + this.instanceId).on("input", function () { $(this).val(that.mascaraTelefone($(this).val())); });
        $div.find("#cand_cep_" + this.instanceId).on("input", function () { $(this).val(that.mascaraCEP($(this).val())); });
        $div.find("#cand_cep_" + this.instanceId).on("blur", function () { that.buscaCEP($(this).val()); });
    },

    mostrarLoading: function (exibir) {
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        if (exibir) {
            if ($div.find("#loading_overlay").length === 0) {
                $div.prepend('<div id="loading_overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.8); z-index:9999; display:flex; justify-content:center; align-items:center; flex-direction:column;"><i class="flaticon flaticon-refresh is-spinning icon-xl text-info"></i><h3 style="color:#555; margin-top:20px;">Carregando informações...</h3></div>');
            }
            $div.find("#loading_overlay").fadeIn();
        } else { $div.find("#loading_overlay").fadeOut(); }
    },

    bindings: {
        local: {
            'nav-next': ['click_proximoPasso'], 'nav-back': ['click_passoAnterior'], 'finish': ['click_enviarAPI'],
            'trigger-upload': ['click_abrirSelecaoArquivo'], 'process-file': ['change_processarArquivo'],
            'add-dependente': ['click_adicionarDependenteManual'], 'remove-row': ['click_removerDependente'], 'next-tab': ['click_avancarAba']
        }
    },

    getOAuthHeader: function (url, method, data) {
        var oauthData = { consumer: { key: 'app_admissao_candidato', secret: 'Segredo.@dmissao.2025#!' }, token: { key: '36450825-af05-4d9e-8323-49be38f76566', secret: 'c5bce4f3-1c22-4300-ae05-aeaf025842dc68ace6dc-b906-4e55-83eb-01e7e2432f3a' }, signature_method: 'HMAC-SHA1' };
        var oauth = OAuth({ consumer: oauthData.consumer, signature_method: oauthData.signature_method, hash_function: function (base, key) { return CryptoJS.HmacSHA1(base, key).toString(CryptoJS.enc.Base64); } });
        return oauth.toHeader(oauth.authorize({ url: url, method: method, data: data || {} }, oauthData.token));
    },

    renderizarDocumentos: function (lista) {
        var that = this; var html = ""; var inputs = ""; this.configDocs = lista;
        for (var i = 0; i < lista.length; i++) {
            var d = lista[i]; if (!d.doc_campo_interno) continue;
            var id = d.doc_campo_interno.trim();
            var obr = (d.doc_obrigatorio == "true" || d.doc_obrigatorio === true);
            var ocr = (d.doc_ocr == "true" || d.doc_ocr === true);
            html += '<div class="col-md-4 mb-15"><div class="upload-box" data-trigger-upload="file_' + id + '_' + that.instanceId + '" id="box_' + id + '_' + that.instanceId + '"><i class="flaticon ' + (d.doc_icone || "flaticon-file-check") + ' icon-xl text-info"></i><h5 class="font-bold mt-10">' + d.doc_titulo + (obr ? ' <span class="text-danger">*</span>' : '') + (ocr ? ' <span class="label label-warning" style="font-size:0.6em">OCR</span>' : '') + '</h5><p class="text-muted small" id="status_' + id + '_' + that.instanceId + '">' + (d.doc_descricao || "Anexar") + '</p><button type="button" class="btn btn-default btn-xs">Anexar</button></div></div>';
            inputs += '<input type="file" id="file_' + id + '_' + that.instanceId + '" class="hidden" accept="image/*,application/pdf" data-process-file="' + id + '"><input type="hidden" id="' + id + '_nome_' + that.instanceId + '"><input type="hidden" id="' + id + '_base64_' + that.instanceId + '">';
        }
        $("#container_documentos_dinamicos_" + that.instanceId).html(html); $("#hidden_inputs_container_" + that.instanceId).html(inputs);
    },

    mascaraTelefone: function (v) { return v.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2").substring(0, 15); },
    mascaraCEP: function (v) { return v.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").substring(0, 9); },
    mascaraCPF: function (v) { return v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").substring(0, 14); },
    validarCPF: function (cpf) { if (!cpf) return false; cpf = cpf.replace(/[^\d]+/g, ''); if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; var s = 0, r; for (var i = 1; i <= 9; i++)s += parseInt(cpf.substring(i - 1, i)) * (11 - i); r = (s * 10) % 11; if (r == 10 || r == 11) r = 0; if (r != parseInt(cpf.substring(9, 10))) return false; s = 0; for (i = 1; i <= 10; i++)s += parseInt(cpf.substring(i - 1, i)) * (12 - i); r = (s * 10) % 11; if (r == 10 || r == 11) r = 0; return r == parseInt(cpf.substring(10, 11)); },
    
    buscaCEP: function (cep) {
        var that = this; var id = this.instanceId; cep = cep.replace(/\D/g, '');
        if (cep != "" && /^[0-9]{8}$/.test(cep)) {
            $("#cand_endereco_" + id).attr("placeholder", "Carregando...").prop("disabled", true);
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                $("#cand_endereco_" + id).prop("disabled", false).attr("placeholder", "");
                if (!("erro" in dados)) {
                    $("#cand_cidade_" + id).val(dados.localidade);
                    $("#cand_uf_" + id).val(dados.uf);
                    $("#cand_pais_" + id).val("Brasil");

                    var logradouroFull = dados.logradouro || "";
                    var partes = logradouroFull.split(" ");
                    var primeiroNome = partes[0]; 
                    var tiposComuns = { "Rua": "Rua", "Avenida": "Avenida", "Av": "Avenida", "Av.": "Avenida", "Alameda": "Alameda", "Estrada": "Estrada", "Rodovia": "Rodovia", "Praça": "Praca", "Praca": "Praca", "Travessa": "Travessa", "Viela": "Viela" };
                    if (tiposComuns[primeiroNome]) {
                        $("#cand_tipo_logradouro_" + id).val(tiposComuns[primeiroNome]);
                        partes.shift();
                        $("#cand_endereco_" + id).val(partes.join(" "));
                    } else {
                        $("#cand_tipo_logradouro_" + id).val("Outro");
                        $("#cand_endereco_" + id).val(logradouroFull);
                    }

                    var bairroFull = dados.bairro || "";
                    var partesBairro = bairroFull.split(" ");
                    var tipoBairro = partesBairro[0];
                    var tiposBairroMap = ["Jardim", "Vila", "Parque", "Residencial", "Distrito", "Setor"];
                    if (bairroFull === "Centro") {
                        $("#cand_tipo_bairro_" + id).val("Centro"); $("#cand_bairro_" + id).val("Centro");
                    } else if (tiposBairroMap.indexOf(tipoBairro) >= 0) {
                        $("#cand_tipo_bairro_" + id).val(tipoBairro);
                        partesBairro.shift();
                        $("#cand_bairro_" + id).val(partesBairro.join(" "));
                    } else {
                        $("#cand_tipo_bairro_" + id).val("Bairro");
                        $("#cand_bairro_" + id).val(bairroFull);
                    }
                    $("#cand_numero_" + id).focus();
                } else { FLUIGC.toast({ message: 'CEP não encontrado.', type: 'warning' }); $("#cand_endereco_" + id).val(""); }
            });
        }
    },

    avancarAba: function (el) { var $d = $("#AdmissaoWidget_" + this.instanceId); var t = $(el).attr("data-next-tab"); if (t) { $d.find('a[href="' + t + '"]').tab('show'); this.marcarAbaComoVisitada(t.replace("#", "")); } },
    marcarAbaComoVisitada: function (id) { this.abasVisitadas[id] = true; $("#AdmissaoWidget_" + this.instanceId).find('a[href="#' + id + '"]').parent().addClass('aba-visitada'); },
    
    verificarTodasAbasVisitadas: function (silent) { var abas = ['tab_pessoais_', 'tab_endereco_', 'tab_contratacao_', 'tab_bancarios_', 'tab_emergencia_', 'tab_outros_docs_', 'tab_foto_']; for (var i = 0; i < abas.length; i++) { if (!this.abasVisitadas[abas[i] + this.instanceId]) { if (!silent) { $('a[href="#' + abas[i] + this.instanceId + '"]').tab('show'); FLUIGC.toast({ title: 'Atenção', message: 'Verifique a aba pendente.', type: 'info' }); } return false; } } return true; },
    
    proximoPasso: function () { if (this.validarPasso(this.passoAtual) && this.passoAtual < this.totalPassos) this.irParaPasso(this.passoAtual + 1); },
    passoAnterior: function () { if (this.passoAtual > 1) this.irParaPasso(this.passoAtual - 1); },
    
    irParaPasso: function (p) { 
        var $d = $("#AdmissaoWidget_" + this.instanceId); 
        $d.find('.step-item').removeClass('active completed'); 
        for (var i = 1; i < p; i++) $d.find('.step-item[data-step="' + i + '"]').addClass('completed'); 
        $d.find('.step-item[data-step="' + p + '"]').addClass('active'); 
        $d.find('.step-content').removeClass('active'); 
        $d.find('.step-content[data-step-content="' + p + '"]').addClass('active'); 
        this.passoAtual = p; 
        this.atualizarBotoes(); 
        $('html,body').animate({ scrollTop: $d.offset().top - 60 }, 'fast'); 
    },
    
    atualizarBotoes: function () { var $d = $("#AdmissaoWidget_" + this.instanceId); $d.find("[data-nav-back]").prop("disabled", this.passoAtual === 1); if (this.passoAtual === this.totalPassos) { $d.find("[data-nav-next]").hide(); $d.find("[data-finish]").show(); } else { $d.find("[data-nav-next]").show(); $d.find("[data-finish]").hide(); } },
    
    validarPasso: function (p) {
        var $d = $("#AdmissaoWidget_" + this.instanceId); var valid = true; var msg = "";
        if (p == 1 && !$d.find("#chkLGPD_" + this.instanceId).is(":checked")) { msg = "Aceite o termo."; valid = false; }
        if (p == 2) { if (!$d.find("#cand_cpf_" + this.instanceId).val()) { msg = "CPF Obrigatório."; valid = false; } else if (!this.verificarTodasAbasVisitadas(false)) { msg = "Navegue por todas as abas."; valid = false; } }
        if (p == 3 && !$d.find("#cand_grau_instrucao_" + this.instanceId).val()) { msg = "Grau de Instrução obrigatório."; valid = false; }
        if (p == 4) {
            var that = this;
            $d.find(".dependente-card").each(function (i) {
                var $c = $(this); var cpf = $c.find(".dep-cpf").val();
                if (!$c.find(".dep-nome").val() || !cpf) { msg = "Preencha os campos obrigatórios do dependente " + (i + 1); valid = false; return false; }
                if (!that.validarCPF(cpf)) { msg = "CPF Dependente inválido."; $c.find(".dep-cpf").css("border-color", "red"); valid = false; return false; }
            });
        }
        if (p == 6) {
            for (var i = 0; i < this.configDocs.length; i++) {
                var d = this.configDocs[i];
                if (d.doc_obrigatorio && !$("#" + d.doc_campo_interno.trim() + "_base64_" + this.instanceId).val()) { msg = d.doc_titulo + " é obrigatório."; valid = false; break; }
            }
        }
        if (p == 7 && !$d.find("#chkVeracidade_" + this.instanceId).is(":checked")) { msg = "Confirme a veracidade."; valid = false; }
        if (!valid) FLUIGC.toast({ title: 'Atenção', message: msg, type: 'warning' });
        return valid;
    },
    
    adicionarDependenteManual: function () { this.adicionarDependente("", false); },
    
    // --- ADICIONAR DEPENDENTE (ATUALIZADO) ---
    adicionarDependente: function (parentesco, obrigatorio) { 
        var $d = $("#AdmissaoWidget_" + this.instanceId); 
        var tmpl = $d.find(".template-dependente").html(); 
        
        // Gera ID único para os campos de anexo desta linha
        var uuid = new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
        tmpl = tmpl.replace(/{{UUID}}/g, uuid);

        var $card = $(tmpl); 
        if (obrigatorio) { 
            // Seleciona o valor e desabilita
            $card.find(".dep-parentesco").val(parentesco).attr("disabled", true); 
            $card.find(".btn-remove-dep").remove(); 
            $card.find(".panel").css("border-left-color", "#d9534f"); 
            // Se for Mãe, não é Filho, então certidão fica oculta (padrão)
        } 
        $("#container_dependentes_" + this.instanceId).append($card); 
    },

    removerDependente: function (el) { $(el).closest('.dependente-card').fadeOut(function () { $(this).remove(); }); },
    
    abrirSelecaoArquivo: function (el) { $("#" + $(el).attr("data-trigger-upload")).trigger('click'); },
    
    processarArquivo: function (el) { 
        var that = this; var input = el; 
        var prefixoCampo = $(el).attr("data-process-file"); 
        
        if (input.files && input.files[0]) { 
            var file = input.files[0]; 
            if (file.size > 5 * 1024 * 1024) { FLUIGC.toast({ title: 'Erro', message: 'Max 5MB', type: 'danger' }); $(input).val(""); return; } 
            
            var reader = new FileReader(); 
            reader.onload = function (e) { 
                // Monta o ID do hidden com base64. Ex: dep_doc_ident_12345_base64_INSTANCEID
                $("#" + prefixoCampo + "_base64_" + that.instanceId).val(e.target.result); 
                // Monta o ID do input de nome. Ex: dep_doc_ident_12345_nome_INSTANCEID
                $("#" + prefixoCampo + "_nome_" + that.instanceId).val(file.name); 
                
                // Feedback visual no botão/ícone se possível, ou apenas toast
                FLUIGC.toast({message: 'Arquivo ' + file.name + ' anexado.', type: 'success'});
            }; 
            reader.readAsDataURL(file); 
        } 
    },

    // --- ENVIAR API (ATUALIZADA) ---
    enviarAPI: function () {
        var that = this;
        var $div = $("#AdmissaoWidget_" + this.instanceId);
        var idSolicitacao = $("#idSolicitacaoRH_" + this.instanceId).val();
        var btn = $div.find("[data-finish]");
        var textoOriginal = btn.html();
        var ID_FORMULARIO_STAGING = 16707; 

        btn.prop("disabled", true).html('<i class="flaticon flaticon-refresh is-spinning"></i> Salvando dados...');

        function formatarDataBR(dataUS) {
            if (!dataUS || dataUS.indexOf("-") === -1) return dataUS;
            var p = dataUS.split("-");
            return p[2] + "/" + p[1] + "/" + p[0];
        }

        function tratarErro(msg) {
            FLUIGC.toast({ title: 'Erro', message: msg, type: 'danger' });
            btn.prop("disabled", false).html(textoOriginal);
        }

        var possuiDeficiencia = $div.find("#cand_possui_deficiencia_" + that.instanceId).val();
        var tipoDeficiencia = $div.find("#cand_tipo_deficiencia_" + that.instanceId).val();
        var valorFinalDeficiencia = (possuiDeficiencia === "Sim") ? tipoDeficiencia : "Nao";

        // CNH
        var possuiCNH = $div.find("#cand_cnh_possuo_" + that.instanceId).val();
        var dadosCNH = {
            tipo: (possuiCNH == "Sim") ? $div.find("#cand_cnh_tipo_" + that.instanceId).val() : "",
            vencimento: (possuiCNH == "Sim") ? formatarDataBR($div.find("#cand_cnh_data_venc_" + that.instanceId).val()) : "",
            primeira: (possuiCNH == "Sim") ? formatarDataBR($div.find("#cand_cnh_data_primeira_" + that.instanceId).val()) : "",
            emissao: (possuiCNH == "Sim") ? formatarDataBR($div.find("#cand_cnh_data_emissao_" + that.instanceId).val()) : "",
            orgao: (possuiCNH == "Sim") ? $div.find("#cand_cnh_orgao_" + that.instanceId).val() : "",
            uf: (possuiCNH == "Sim") ? $div.find("#cand_cnh_uf_" + that.instanceId).val() : ""
        };

        // Reservista
        var possuiReservista = $div.find("#cand_reservista_possuo_" + that.instanceId).val();
        var dadosReservista = {
            numero: (possuiReservista == "Sim") ? $div.find("#cand_reservista_numero_" + that.instanceId).val() : "",
            emissao: (possuiReservista == "Sim") ? formatarDataBR($div.find("#cand_reservista_data_emissao_" + that.instanceId).val()) : "",
            situacao: (possuiReservista == "Sim") ? $div.find("#cand_reservista_situacao_" + that.instanceId).val() : ""
        };

        var dadosCandidato = {
            "origem_dados": "pagina_publica_staging",
            "data_integracao": new Date().toLocaleString(),
            
            // Pessoais
            "txtNomeColaborador": $div.find("#cand_nomeCompleto_" + that.instanceId).val(),
            "cpfcnpj": $div.find("#cand_cpf_" + that.instanceId).val(),
            "dtDataNascColaborador": formatarDataBR($div.find("#cand_nascimento_" + that.instanceId).val()),
            "txtEmail": $div.find("#cand_email_" + that.instanceId).val(),
            "txtCELULAR": $div.find("#cand_celular_" + that.instanceId).val(),
            
            // RG, Título, Endereço, Complementares, Contratação...
            // (Mantendo os campos já configurados anteriormente)
            "rg": $div.find("#cand_rg_" + that.instanceId).val(),
            "rg_uf": $div.find("#cand_rg_uf_" + that.instanceId).val(),
            "rg_orgao": $div.find("#cand_rg_orgao_" + that.instanceId).val(),
            "rg_data_emissao": formatarDataBR($div.find("#cand_rg_data_emissao_" + that.instanceId).val()),
            "titulo_eleitor": $div.find("#cand_titulo_eleitor_" + that.instanceId).val(),
            "titulo_zona": $div.find("#cand_titulo_zona_" + that.instanceId).val(),
            "titulo_secao": $div.find("#cand_titulo_secao_" + that.instanceId).val(),
            "titulo_uf": $div.find("#cand_titulo_uf_" + that.instanceId).val(),
            "titulo_data_emissao": formatarDataBR($div.find("#cand_titulo_data_emissao_" + that.instanceId).val()),

            "txtCEP": $div.find("#cand_cep_" + that.instanceId).val(),
            "txtTipoLogradouro": $div.find("#cand_tipo_logradouro_" + that.instanceId).val(),
            "txtRUA": $div.find("#cand_endereco_" + that.instanceId).val(),
            "txtNUMERO": $div.find("#cand_numero_" + that.instanceId).val(),
            "txtCOMPLEMENTO": $div.find("#cand_complemento_" + that.instanceId).val(),
            "txtTipoBairro": $div.find("#cand_tipo_bairro_" + that.instanceId).val(),
            "txtBAIRRO": $div.find("#cand_bairro_" + that.instanceId).val(),
            "txtNOMEMUNICIPIO": $div.find("#cand_cidade_" + that.instanceId).val(),
            "txtNOMECODETD": $div.find("#cand_uf_" + that.instanceId).val(),
            "txtPais": $div.find("#cand_pais_" + that.instanceId).val(),
            "txtEstadoNatal": $div.find("#cand_estado_natal_" + that.instanceId).val(),
            "txtNaturalidade": $div.find("#cand_naturalidade_" + that.instanceId).val(),
            "txtEstadoCivil": $div.find("#cand_estado_civil_" + that.instanceId).val(),
            "txtSexo": $div.find("#cand_sexo_" + that.instanceId).val(),
            "txtNacionalidade": $div.find("#cand_nacionalidade_" + that.instanceId).val(),
            "txtRaca": $div.find("#cand_raca_" + that.instanceId).val(),

            "txtDeficiencia": valorFinalDeficiencia,
            "txtTamanhoCalcado": $div.find("#cand_tamanho_calcado_" + that.instanceId).val(),
            "txtTamanhoCamisa": $div.find("#cand_tamanho_camisa_" + that.instanceId).val(),
            "txtGrauInstrucao": $div.find("#cand_grau_instrucao_" + that.instanceId).val(),
            "txtAnoConclusao": $div.find("#cand_ano_conclusao_" + that.instanceId).val(),
            "txtNomeCurso": $div.find("#cand_curso_" + that.instanceId).val(),
            "txtInstituicaoEnsino": $div.find("#cand_instituicao_" + that.instanceId).val(),

            "BancoPAgto": $div.find("#cand_banco_" + that.instanceId).val(),
            "AgPagto": $div.find("#cand_agencia_" + that.instanceId).val(),
            "ContPagto": $div.find("#cand_conta_corrente_" + that.instanceId).val(),
            "TipodeContPagto": $div.find("#cand_tipo_conta_" + that.instanceId).val(),
            "txtTipoChavePix": $div.find("#cand_tipo_pix_" + that.instanceId).val(),
            "txtChavePix": $div.find("#cand_chave_pix_" + that.instanceId).val(),
            "ValeTransp": ($div.find("#cand_opt_vt_" + that.instanceId).val() == "Sim" ? "1" : "2"),
            "AssistMedica": ($div.find("#cand_opt_saude_" + that.instanceId).val() == "Sim" ? "Sim" : "Nao"),
            "AssistOdontologica": ($div.find("#cand_opt_odonto_" + that.instanceId).val() == "Sim" ? "Sim" : "Nao"),

            "txtCNH_Possui": possuiCNH,
            "txtCNH_Tipo": dadosCNH.tipo,
            "txtCNH_DataVencimento": dadosCNH.vencimento,
            "txtCNH_OrgaoEmissor": dadosCNH.orgao,
            "txtCNH_DataEmissao": dadosCNH.emissao,
            "txtCNH_UF": dadosCNH.uf,
            "txtCNH_DataPrimeira": dadosCNH.primeira,

            "txtReservista_Possui": possuiReservista,
            "txtReservista_Numero": dadosReservista.numero,
            "txtReservista_DataEmissao": dadosReservista.emissao,
            "txtReservista_Situacao": dadosReservista.situacao,

            "txtPIS": $div.find("#cand_pis_" + that.instanceId).val(),
            "txtCTPS_Numero": $div.find("#cand_ctps_numero_" + that.instanceId).val(),
            "txtCTPS_Serie": $div.find("#cand_ctps_serie_" + that.instanceId).val(),
            "txtCTPS_DataEmissao": formatarDataBR($div.find("#cand_ctps_data_emissao_" + that.instanceId).val()),
            "txtCTPS_UF": $div.find("#cand_ctps_uf_" + that.instanceId).val(),

            "cand_foto_base64": $div.find("#cand_foto_base64_" + this.instanceId).val(),
            "txtNomeEmergencia": $div.find("#cand_emergencia_nome_" + that.instanceId).val(),
            "txtTelefoneEmergencia": $div.find("#cand_emergencia_telefone_" + that.instanceId).val()
        };

        // --- DEPENDENTES (COM NOVOS CAMPOS E ANEXOS) ---
        var deps = []; 
        $div.find(".dependente-card").each(function(index) { 
            var i = index + 1;
            var c = $(this); 
            var uuid = c.attr("data-uuid"); // Captura o ID único da linha

            dadosCandidato["txtNomDepen___" + i] = c.find(".dep-nome").val();
            dadosCandidato["txtSexoDepen___" + i] = c.find(".dep-sexo").val();
            dadosCandidato["cpDataNascimentoDep___" + i] = formatarDataBR(c.find(".dep-nasc").val());
            dadosCandidato["txtParentescoDepen___" + i] = c.find(".dep-parentesco").val();
            dadosCandidato["TxtCPFDep___" + i] = c.find(".dep-cpf").val();
            dadosCandidato["depEstadoCivil___" + i] = c.find(".dep-est-civil").val(); 

            // Novas Incidências
            dadosCandidato["TxtIncIRRF___" + i] = (c.find(".dep-ir").val() == "Sim" ? "1" : "0");
            dadosCandidato["TxtSalarioFamilia___" + i] = (c.find(".dep-sf").val() == "Sim" ? "1" : "0");
            dadosCandidato["TxtPensaoAlimenticia___" + i] = (c.find(".dep-pensao").val() == "Sim" ? "1" : "0");
            dadosCandidato["TxtAssistMedica___" + i] = (c.find(".dep-saude").val() == "Sim" ? "1" : "0");
            dadosCandidato["TxtAssistOdonto___" + i] = (c.find(".dep-odonto").val() == "Sim" ? "1" : "0");

            // Anexos Dinâmicos do Dependente (Nome e Base64)
            dadosCandidato["txtNomeDocIdentDep___" + i] = $("#dep_doc_ident_" + uuid + "_nome_" + that.instanceId).val();
            dadosCandidato["base64DocIdentDep___" + i] = $("#dep_doc_ident_" + uuid + "_base64_" + that.instanceId).val();

            // Certidão (apenas se visível/preenchido)
            dadosCandidato["txtNomeCertidaoDep___" + i] = $("#dep_doc_certidao_" + uuid + "_nome_" + that.instanceId).val();
            dadosCandidato["base64CertidaoDep___" + i] = $("#dep_doc_certidao_" + uuid + "_base64_" + that.instanceId).val();

            deps.push({ nome: c.find(".dep-nome").val(), cpf: c.find(".dep-cpf").val() });
        });
        dadosCandidato["json_dependentes"] = JSON.stringify(deps);

        // Processamento dos Documentos de Upload (Passo 6)
        for(var i=0; i<this.configDocs.length; i++) { 
            var d = this.configDocs[i]; 
            if(!d.doc_campo_interno) continue; 
            var c = d.doc_campo_interno.trim(); 
            if ($("#"+c+"_base64_"+that.instanceId).length > 0) {
                dadosCandidato[c+"_nome"] = $("#"+c+"_nome_"+that.instanceId).val(); 
                dadosCandidato[c+"_base64"] = $("#"+c+"_base64_"+that.instanceId).val();
            }
        }

        var jsonCompleto = JSON.stringify(dadosCandidato);
        
        var cardData = [
            { "name": "ref_id_solicitacao", "value": idSolicitacao },
            { "name": "status_integracao", "value": "Pendente" },
            { "name": "data_envio", "value": new Date().toLocaleString() },
            { "name": "json_dados_completos", "value": jsonCompleto }
        ];

        for (var key in dadosCandidato) {
            if (dadosCandidato.hasOwnProperty(key)) {
                cardData.push({ "name": key, "value": dadosCandidato[key] });
            }
        }

        var payloadCreateCard = {
            "parentDocumentId": parseInt(ID_FORMULARIO_STAGING),
            "formData": cardData
        };

        var urlCreate = WCMAPI.getServerURL() + '/api/public/ecm/card/create';

        $.ajax({
            url: urlCreate, type: 'POST', contentType: 'application/json', data: JSON.stringify(payloadCreateCard),
            headers: { "Authorization": that.getOAuthHeader(urlCreate, 'POST').Authorization },
            success: function (res) {
                avancarProcesso(idSolicitacao);
            },
            error: function (xhr) {
                console.error(">>> Erro Create Card:", xhr);
                tratarErro("Falha ao salvar dados de staging.");
            }
        });

        function avancarProcesso(id) {
            var urlMove = WCMAPI.getServerURL() + '/process-management/api/v2/requests/' + id + '/move';
            var payloadMove = { "movementSequence": 97, "comment": "Dados salvos no Staging Area." };
            var authMove = that.getOAuthHeader(urlMove, 'POST', payloadMove);

            $.ajax({
                url: urlMove, type: 'POST', contentType: 'application/json',
                data: JSON.stringify(payloadMove),
                headers: { "Authorization": authMove.Authorization },
                success: function () {
                    $div.find(".wizard-card").html('<div class="alert alert-success text-center" style="padding:40px;"><h3>Sucesso!</h3><p>Seus dados foram enviados para o RH.</p><i class="flaticon flaticon-check-circle icon-xl text-success"></i></div>');
                    $('html, body').animate({ scrollTop: $div.offset().top - 100 }, 'slow');
                },
                error: function (xhr) {
                    console.error("Erro Move:", xhr);
                    tratarErro("Erro ao mover processo.");
                }
            });
        }
    }
});