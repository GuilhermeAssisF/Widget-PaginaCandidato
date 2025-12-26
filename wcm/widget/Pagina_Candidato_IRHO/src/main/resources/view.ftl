<div id="AdmissaoWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide admissao-container" data-params="AdmissaoWidget.instance()">

    <div class="container-fluid">
        <div class="wizard-card">
            
            <input type="hidden" name="idSolicitacaoRH" id="idSolicitacaoRH_${instanceId}">

            <div class="text-center" style="margin-bottom: 30px;">
                <h2 style="color: #485363; font-weight: 300;">Admissão Digital</h2>
                <p class="text-muted">Bem-vindo(a)! Complete seu cadastro para prosseguirmos.</p>
            </div>

            <div class="wizard-progress">
                <div class="step-item active" data-step="1"><div class="step-circle">1</div><div class="step-label">LGPD</div></div>
                <div class="step-item" data-step="2"><div class="step-circle">2</div><div class="step-label">Dados</div></div>
                <div class="step-item" data-step="3"><div class="step-circle">3</div><div class="step-label">Form.</div></div> 
                <div class="step-item" data-step="4"><div class="step-circle">4</div><div class="step-label">Dep.</div></div>
                <div class="step-item" data-step="5"><div class="step-circle">5</div><div class="step-label">Benef.</div></div>
                <div class="step-item" data-step="6"><div class="step-circle">6</div><div class="step-label">Docs</div></div> 
                <div class="step-item" data-step="7"><div class="step-circle">7</div><div class="step-label">Fim</div></div>
            </div>

            <form name="formCandidato_${instanceId}" id="formCandidato_${instanceId}" role="form">

                <div data-step-content="1" class="step-content active">
                    <h3 class="section-title"><i class="flaticon flaticon-lock icon-sm"></i> Privacidade</h3>
                    <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #31708f; padding: 15px; border-radius: 4px; display: flex; align-items: center; margin-bottom: 20px;">
                        <i class="flaticon flaticon-info icon-md" style="margin-right: 15px; font-size: 24px;"></i>
                        <div style="font-size: 0.95em; line-height: 1.4;">
                            <strong>Termo de Consentimento:</strong><br>
                            Para fins de admissão, necessitamos coletar e armazenar seus dados pessoais e documentos sensíveis. Estes dados serão utilizados exclusivamente pelo RH para o processo de contratação e obrigações legais (eSocial).
                        </div>
                    </div>
                    <div class="text-center" style="margin-top: 30px;">
                        <label class="checkbox-inline" style="font-size: 1.2em; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="checkbox" id="chkLGPD_${instanceId}" name="cand_lgpd" value="sim"> 
                            Li, compreendi e <strong>CONCORDO</strong> com o tratamento dos meus dados.
                        </label>
                    </div>
                </div>

                <div data-step-content="2" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-face-id icon-sm"></i> Dados da Admissão</h3>
                  
                    <ul class="nav nav-tabs" role="tablist" id="tabMenuDados_${instanceId}">
                        <li role="presentation" class="active"><a href="#tab_pessoais_${instanceId}" aria-controls="tab_pessoais_${instanceId}" role="tab" data-toggle="tab">Seus Dados</a></li>
                        <li role="presentation"><a href="#tab_endereco_${instanceId}" aria-controls="tab_endereco_${instanceId}" role="tab" data-toggle="tab">Endereço</a></li>
                        <li role="presentation"><a href="#tab_contratacao_${instanceId}" aria-controls="tab_contratacao_${instanceId}" role="tab" data-toggle="tab">Contratação</a></li>
                        <li role="presentation"><a href="#tab_bancarios_${instanceId}" aria-controls="tab_bancarios_${instanceId}" role="tab" data-toggle="tab">Bancários</a></li>
                        <li role="presentation"><a href="#tab_emergencia_${instanceId}" aria-controls="tab_emergencia_${instanceId}" role="tab" data-toggle="tab">Emergência</a></li>
                        <li role="presentation"><a href="#tab_outros_docs_${instanceId}" aria-controls="tab_outros_docs_${instanceId}" role="tab" data-toggle="tab">Docs Extras</a></li>
                        <li role="presentation"><a href="#tab_foto_${instanceId}" aria-controls="tab_foto_${instanceId}" role="tab" data-toggle="tab">Foto</a></li>
                    </ul>

                    <div class="tab-content shadow-panel" id="tabContentDados_${instanceId}">
                        
                        <div role="tabpanel" class="tab-pane active" id="tab_pessoais_${instanceId}">
                            <p class="text-danger"><small>* Confira seus dados básicos.</small></p>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Nome Completo</label>
                                    <input type="text" class="form-control" id="cand_nomeCompleto_${instanceId}" readonly>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input type="email" class="form-control" id="cand_email_${instanceId}" readonly>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>CPF</label>
                                    <input type="text" class="form-control" id="cand_cpf_${instanceId}">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Celular</label>
                                    <input type="text" class="form-control" id="cand_celular_${instanceId}" readonly>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Nascimento</label>
                                    <input type="date" class="form-control" id="cand_nascimento_${instanceId}">
                                </div>
                            </div>

                            <hr>
                            <h4 style="color: #1eaad9;">Dados Complementares</h4>

                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Estado Natal</label>
                                    <select class="form-control" id="cand_estado_natal_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                        <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                        <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                        <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                        <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                        <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                        <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                    </select>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Naturalidade</label>
                                    <input type="text" class="form-control" id="cand_naturalidade_${instanceId}">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Estado Civil</label>
                                    <select class="form-control" id="cand_estado_civil_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Solteiro">Solteiro</option>
                                        <option value="Casado">Casado</option>
                                        <option value="Divorciado">Divorciado</option>
                                        <option value="Viuvo">Viúvo</option>
                                    </select>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Sexo</label>
                                    <select class="form-control" id="cand_sexo_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Nacionalidade</label>
                                    <input type="text" class="form-control" id="cand_nacionalidade_${instanceId}" value="Brasileira">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Cor / Raça</label>
                                    <select class="form-control" id="cand_raca_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Branca">Branca</option>
                                        <option value="Preta">Preta</option>
                                        <option value="Parda">Parda</option>
                                        <option value="Amarela">Amarela</option>
                                        <option value="Indigena">Indígena</option>
                                    </select>
                                </div>
                            </div>

                            <hr>
                            <h4 style="color: #1eaad9;">Dados do RG</h4>
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>RG <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="cand_rg_${instanceId}" placeholder="Número do RG">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>UF do RG</label>
                                    <select class="form-control" id="cand_rg_uf_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                        <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                        <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                        <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                        <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                        <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                        <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                    </select>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Órgão Emissor</label>
                                    <input type="text" class="form-control" id="cand_rg_orgao_${instanceId}" placeholder="Ex: SSP">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Data de Emissão</label>
                                    <input type="date" class="form-control" id="cand_rg_data_emissao_${instanceId}">
                                </div>
                            </div>

                            <hr>
                            <h4 style="color: #1eaad9;">Dados do Título de Eleitor</h4>
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Título Eleitor</label>
                                    <input type="text" class="form-control" id="cand_titulo_eleitor_${instanceId}" placeholder="Número do Título">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Zona Eleitoral</label>
                                    <input type="text" class="form-control" id="cand_titulo_zona_${instanceId}">
                                </div>
                                <div class="col-md-2 form-group">
                                    <label>Seção</label>
                                    <input type="text" class="form-control" id="cand_titulo_secao_${instanceId}">
                                </div>
                                <div class="col-md-2 form-group">
                                    <label>UF do Título</label>
                                    <select class="form-control" id="cand_titulo_uf_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                        <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                        <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                        <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                        <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                        <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                        <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                    </select>
                                </div>
                                <div class="col-md-2 form-group">
                                    <label>Data Emissão</label>
                                    <input type="date" class="form-control" id="cand_titulo_data_emissao_${instanceId}">
                                </div>
                            </div>

                            <div class="text-right" style="margin-top: 20px;">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_endereco_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_endereco_${instanceId}">
                            
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>CEP <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="cand_cep_${instanceId}" placeholder="00000-000">
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>País</label>
                                    <input type="text" class="form-control" id="cand_pais_${instanceId}" value="Brasil">
                                </div>
                                <div class="col-md-6">
                                    <p class="text-muted small" style="margin-top: 25px;">
                                        <i class="flaticon flaticon-info"></i> Digite o CEP para buscar o endereço.
                                    </p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Tipo Logradouro</label>
                                    <select class="form-control" id="cand_tipo_logradouro_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Rua">Rua</option>
                                        <option value="Avenida">Avenida</option>
                                        <option value="Alameda">Alameda</option>
                                        <option value="Estrada">Estrada</option>
                                        <option value="Rodovia">Rodovia</option>
                                        <option value="Praca">Praça</option>
                                        <option value="Travessa">Travessa</option>
                                        <option value="Viela">Viela</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                <div class="col-md-9 form-group">
                                    <label>Endereço (Logradouro)</label>
                                    <input type="text" class="form-control" id="cand_endereco_${instanceId}">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Número <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="cand_numero_${instanceId}">
                                </div>
                                <div class="col-md-9 form-group">
                                    <label>Complemento</label>
                                    <input type="text" class="form-control" id="cand_complemento_${instanceId}" placeholder="Ex: Apto 101, Bloco B">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label>Tipo Bairro</label>
                                    <select class="form-control" id="cand_tipo_bairro_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Bairro">Bairro</option>
                                        <option value="Jardim">Jardim</option>
                                        <option value="Vila">Vila</option>
                                        <option value="Centro">Centro</option>
                                        <option value="Parque">Parque</option>
                                        <option value="Residencial">Residencial</option>
                                        <option value="Distrito">Distrito</option>
                                        <option value="Setor">Setor</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                <div class="col-md-9 form-group">
                                    <label>Bairro</label>
                                    <input type="text" class="form-control" id="cand_bairro_${instanceId}">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>Estado (UF)</label>
                                    <select class="form-control" id="cand_uf_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                        <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                        <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                        <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                        <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                        <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                        <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                    </select>
                                </div>
                                <div class="col-md-8 form-group">
                                    <label>Cidade</label>
                                    <input type="text" class="form-control" id="cand_cidade_${instanceId}">
                                </div>
                            </div>

                            <div class="text-right">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_contratacao_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_contratacao_${instanceId}">
                            <div class="row">
                                <div class="col-md-6 form-group"><label>Empresa</label><input type="text" class="form-control" id="cand_empresa_${instanceId}" readonly></div>
                                <div class="col-md-3 form-group"><label>Admissão</label><input type="text" class="form-control" id="cand_data_admissao_${instanceId}" readonly></div>
                                <div class="col-md-3 form-group"><label>Salário</label><input type="text" class="form-control" id="cand_salario_${instanceId}" readonly></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 form-group"><label>Função</label><input type="text" class="form-control" id="cand_funcao_${instanceId}" readonly></div>
                                <div class="col-md-4 form-group"><label>Seção</label><input type="text" class="form-control" id="cand_secao_${instanceId}" readonly></div>
                                <div class="col-md-4 form-group"><label>Turno</label><input type="text" class="form-control" id="cand_turno_${instanceId}" readonly></div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-3 form-group">
                                    <label style="font-size: 12px;">Possui Deficiência?</label>
                                    <select class="form-control" id="cand_possui_deficiencia_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Nao">Não</option>
                                        <option value="Sim">Sim</option>
                                    </select>
                                </div>

                                <div class="col-md-3 form-group" id="div_tipo_deficiencia_${instanceId}" style="display:none;">
                                    <label style="font-size: 12px;">Tipo de Deficiência</label>
                                    <select class="form-control" id="cand_tipo_deficiencia_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Fisica">Física</option>
                                        <option value="Auditiva">Auditiva</option>
                                        <option value="Fala">Fala</option>
                                        <option value="Visual">Visual</option>
                                        <option value="Mental">Mental</option>
                                        <option value="Intelectual">Intelectual</option>
                                        <option value="Reabilitado">Reabilitado</option>
                                    </select>
                                </div>

                                <div class="col-md-3 form-group">
                                    <label style="font-size: 12px;">Tamanho do Calçado</label>
                                    <input type="number" class="form-control" id="cand_tamanho_calcado_${instanceId}">
                                </div>

                                <div class="col-md-3 form-group">
                                    <label style="font-size: 12px;">Tamanho da Camisa</label>
                                    <select class="form-control" id="cand_tamanho_camisa_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="P">P</option>
                                        <option value="M">M</option>
                                        <option value="G">G</option>
                                        <option value="GG">GG</option>
                                        <option value="XGG">XGG</option>
                                    </select>
                                </div>
                            </div>
                            <div class="text-right">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_bancarios_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_bancarios_${instanceId}">
                            <div class="alert alert-info small">Dados bancários para pagamento.</div>
                            
                            <div class="row">
                                <div class="col-md-4 form-group"><label>Banco</label><input type="text" class="form-control" id="cand_banco_${instanceId}"></div>
                                <div class="col-md-2 form-group"><label>Agência</label><input type="text" class="form-control" id="cand_agencia_${instanceId}"></div>
                                <div class="col-md-3 form-group"><label>Conta</label><input type="text" class="form-control" id="cand_conta_corrente_${instanceId}"></div>
                                <div class="col-md-3 form-group">
                                    <label>Tipo Conta</label>
                                    <select class="form-control" id="cand_tipo_conta_${instanceId}">
                                        <option value="Corrente">Corrente</option>
                                        <option value="Poupanca">Poupança</option>
                                        <option value="Salario">Salário</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>Tipo Chave Pix</label>
                                    <select class="form-control" id="cand_tipo_pix_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="CPF_CNPJ">CPF/CNPJ</option>
                                        <option value="Email">E-mail</option>
                                        <option value="Celular">Celular</option>
                                        <option value="Aleatoria">Chave Aleatória</option>
                                    </select>
                                </div>
                                <div class="col-md-8 form-group">
                                    <label>Chave Pix</label>
                                    <input type="text" class="form-control" id="cand_chave_pix_${instanceId}" placeholder="Informe sua chave pix">
                                </div>
                            </div>
                            
                            <div class="text-right">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_emergencia_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div role="tabpanel" class="tab-pane" id="tab_emergencia_${instanceId}">
                            <div class="row">
                                <div class="col-md-6 form-group"><label>Nome do Contato</label><input type="text" class="form-control" id="cand_emergencia_nome_${instanceId}"></div>
                                <div class="col-md-6 form-group"><label>Telefone</label><input type="text" class="form-control" id="cand_emergencia_telefone_${instanceId}"></div>
                            </div>
                            <div class="text-right">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_outros_docs_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_outros_docs_${instanceId}">
    
                            <div class="panel panel-default">
                                <div class="panel-heading"><i class="flaticon flaticon-card-id"></i> Carteira Nacional de Habilitação (CNH)</div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-3 form-group">
                                            <label>Possui CNH?</label>
                                            <select class="form-control" id="cand_cnh_possuo_${instanceId}">
                                                <option value="Nao">Não</option>
                                                <option value="Sim">Sim</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div id="div_campos_cnh_${instanceId}" style="display:none;">
                                        <div class="row">
                                            <div class="col-md-3 form-group">
                                                <label>Tipo de CNH</label>
                                                <select class="form-control" id="cand_cnh_tipo_${instanceId}">
                                                    <option value="">Selecione...</option>
                                                    <option value="A">A</option>
                                                    <option value="AB">AB</option>
                                                    <option value="AC">AC</option>
                                                    <option value="ACC">ACC</option>
                                                    <option value="AD">AD</option>
                                                    <option value="AE">AE</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="D">D</option>
                                                    <option value="E">E</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3 form-group">
                                                <label>Data Vencimento</label>
                                                <input type="date" class="form-control" id="cand_cnh_data_venc_${instanceId}">
                                            </div>
                                            <div class="col-md-3 form-group">
                                                <label>Data 1ª Habilitação</label>
                                                <input type="date" class="form-control" id="cand_cnh_data_primeira_${instanceId}">
                                            </div>
                                            <div class="col-md-3 form-group">
                                                <label>Data Emissão</label>
                                                <input type="date" class="form-control" id="cand_cnh_data_emissao_${instanceId}">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 form-group">
                                                <label>Órgão Emissor</label>
                                                <input type="text" class="form-control" id="cand_cnh_orgao_${instanceId}" placeholder="Ex: DETRAN">
                                            </div>
                                            <div class="col-md-6 form-group">
                                                <label>UF da CNH</label>
                                                <select class="form-control" id="cand_cnh_uf_${instanceId}">
                                                    <option value="">Selecione...</option>
                                                    <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                                    <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                                    <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                                    <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                                    <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                                    <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                                    <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading"><i class="flaticon flaticon-assignment-ind"></i> Certificado de Reservista</div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-3 form-group">
                                            <label>Possui Reservista?</label>
                                            <select class="form-control" id="cand_reservista_possuo_${instanceId}">
                                                <option value="Nao">Não</option>
                                                <option value="Sim">Sim</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div id="div_campos_reservista_${instanceId}" style="display:none;">
                                        <div class="row">
                                            <div class="col-md-4 form-group">
                                                <label>Número do Certificado</label>
                                                <input type="text" class="form-control" id="cand_reservista_numero_${instanceId}">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label>Data de Emissão</label>
                                                <input type="date" class="form-control" id="cand_reservista_data_emissao_${instanceId}">
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label>Situação Militar</label>
                                                <input type="text" class="form-control" id="cand_reservista_situacao_${instanceId}" placeholder="Ex: Dispensado">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="panel panel-default">
                                        <div class="panel-heading"><i class="flaticon flaticon-vcard"></i> PIS / PASEP / NIS</div>
                                        <div class="panel-body">
                                            <div class="form-group">
                                                <label>Número PIS/PASEP/NIS</label>
                                                <input type="text" class="form-control" id="cand_pis_${instanceId}" placeholder="Informe o número">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading"><i class="flaticon flaticon-book"></i> Carteira de Trabalho (CTPS)</div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-3 form-group">
                                            <label>Número da Carteira</label>
                                            <input type="text" class="form-control" id="cand_ctps_numero_${instanceId}">
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label>Série</label>
                                            <input type="text" class="form-control" id="cand_ctps_serie_${instanceId}">
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label>Data de Emissão</label>
                                            <input type="date" class="form-control" id="cand_ctps_data_emissao_${instanceId}">
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label>UF da CTPS</label>
                                            <select class="form-control" id="cand_ctps_uf_${instanceId}">
                                                <option value="">Selecione...</option>
                                                <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                                                <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                                                <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                                                <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                                                <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                                                <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                                                <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right">
                                <button type="button" class="btn btn-info btn-sm" data-next-tab="#tab_foto_${instanceId}">
                                    Próxima Aba <i class="flaticon flaticon-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_foto_${instanceId}">
                             <div class="text-center">
                                <div id="preview_foto_${instanceId}" style="width: 150px; height: 150px; border: 2px dashed #ccc; margin: 10px auto; border-radius: 50%; background: #f9f9f9; background-size: cover; background-position: center;"></div>
                                <button class="btn btn-primary btn-sm" type="button" data-trigger-upload="file_cand_foto_${instanceId}">Carregar Foto</button>
                                <input type="file" id="file_cand_foto_${instanceId}" class="hidden" data-process-file="cand_foto" accept="image/*">
                                <input type="hidden" id="cand_foto_base64_${instanceId}">
                                <input type="hidden" id="cand_foto_nome_${instanceId}">
                             </div>
                        </div>
                    </div>
                </div>

                <div data-step-content="3" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-book icon-sm"></i> Formação Acadêmica</h3>
                    <div class="alert alert-warning" style="background-color: #fcf8e3; color: #8a6d3b;">
                        Informe sua escolaridade principal.
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label for="cand_grau_instrucao_${instanceId}">Grau de Instrução <span class="text-danger">*</span></label>
                            <select class="form-control" id="cand_grau_instrucao_${instanceId}" name="cand_grau_instrucao">
                                <option value="">Selecione...</option>
                                <option value="Fundamental Incompleto">Fundamental Incompleto</option>
                                <option value="Fundamental Completo">Fundamental Completo</option>
                                <option value="Medio Incompleto">Médio Incompleto</option>
                                <option value="Medio Completo">Médio Completo</option>
                                <option value="Superior Incompleto">Superior Incompleto</option>
                                <option value="Superior Completo">Superior Completo</option>
                                <option value="Pos Graduacao">Pós-Graduação / Especialização</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado">Doutorado</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="cand_ano_conclusao_${instanceId}">Ano de Conclusão</label>
                            <input type="number" class="form-control" id="cand_ano_conclusao_${instanceId}" placeholder="Ex: 2020">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label for="cand_curso_${instanceId}">Nome do Curso</label>
                            <input type="text" class="form-control" id="cand_curso_${instanceId}" placeholder="Ex: Administração, Direito...">
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="cand_instituicao_${instanceId}">Instituição de Ensino</label>
                            <input type="text" class="form-control" id="cand_instituicao_${instanceId}" placeholder="Ex: USP, UNIP...">
                        </div>
                    </div>
                </div>

                <div data-step-content="4" class="step-content">
                     <h3 class="section-title"><i class="flaticon flaticon-group icon-sm"></i> Dependentes</h3>
                     
                     <div class="alert alert-info">
                        <i class="flaticon flaticon-info"></i> Informe seus dependentes. <strong>O cadastro da Mãe é obrigatório</strong> para o eSocial, mesmo que não seja dependente financeiro.
                     </div>

                     <div id="container_dependentes_${instanceId}"></div>

                     <div class="row" style="margin-top: 20px;">
                        <div class="col-md-12 text-center">
                            <button type="button" class="btn btn-info btn-lg" data-add-dependente>
                                <i class="flaticon flaticon-plus"></i> Adicionar Outro Dependente
                            </button>
                        </div>
                     </div>
                </div>

                <div data-step-content="5" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-favorite icon-sm"></i> Benefícios</h3>
                     <div class="row">
                        <div class="col-md-4">
                            <div class="panel panel-default">
                                <div class="panel-heading font-bold">Vale Transporte</div>
                                <div class="panel-body">
                                    <label style="font-size: 11px;">Deseja receber Vale Transporte?</label>
                                    <select class="form-control input-sm" id="cand_opt_vt_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Sim">Sim, desejo receber</option>
                                        <option value="Nao">Não, utilizo meio próprio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="panel panel-default">
                                <div class="panel-heading font-bold">Assistência Médica</div>
                                <div class="panel-body">
                                    <label style="font-size: 11px;">Deseja incluir no Plano de Saúde?</label>
                                    <select class="form-control input-sm" id="cand_opt_saude_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Nao">Não</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="panel panel-default">
                                <div class="panel-heading font-bold">Assistência Odontológica</div>
                                <div class="panel-body">
                                    <label style="font-size: 11px;">Deseja incluir no Plano Odonto?</label>
                                    <select class="form-control input-sm" id="cand_opt_odonto_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Nao">Não</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-step-content="6" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-file-pdf icon-sm"></i> Envio de Documentos</h3>
                    
                    <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #31708f; padding: 15px; border-radius: 4px; display: flex; align-items: center; margin-bottom: 25px;">
                        <i class="flaticon flaticon-info icon-md" style="margin-right: 15px; font-size: 24px;"></i>
                        <span><strong>Instrução:</strong> Clique nos quadros abaixo para anexar ou fotografar cada documento solicitado.</span>
                    </div>

                    <div class="row" id="container_documentos_dinamicos_${instanceId}">
                        <div class="col-md-12 text-center" style="padding: 40px;">
                            <i class="flaticon flaticon-refresh is-spinning icon-xl"></i><br>
                            <span class="text-muted">Carregando lista de documentos...</span>
                        </div>
                    </div>
                    
                    <div id="hidden_inputs_container_${instanceId}"></div>
                </div>

                <div data-step-content="7" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-paper-plane icon-sm"></i> Finalização</h3>

                    <div class="panel panel-info" style="border-color: #bce8f1;">
                        <div class="panel-heading" style="background-color: #d9edf7; color: #31708f; border-color: #bce8f1;">
                            <i class="flaticon flaticon-medical"></i> <strong>Lembrete: Seu Exame Admissional</strong>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>Data e Hora</label>
                                    <input type="text" class="form-control" id="cand_exame_datahora_${instanceId}" readonly style="background-color: #fff;">
                                </div>
                                <div class="col-md-8 form-group">
                                    <label>Clínica</label>
                                    <input type="text" class="form-control" id="cand_exame_clinica_${instanceId}" readonly style="background-color: #fff;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label>Endereço</label>
                                    <input type="text" class="form-control" id="cand_exame_endereco_${instanceId}" readonly style="background-color: #fff;">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Orientação</label>
                                    <p class="text-muted" style="border: 1px solid #eee; padding: 10px; border-radius: 4px; background: #f9f9f9; min-height: 50px;">
                                        <span id="text_exame_orientacao_${instanceId}">Consulte as orientações no e-mail recebido.</span>
                                        <textarea id="cand_exame_orientacao_${instanceId}" style="display:none;"></textarea>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Contrato de Trabalho (Minuta)</label>
                        <textarea class="form-control" rows="8" readonly style="background: #fff; font-family: monospace; font-size: 0.9em;">
                            CONTRATO DE TRABALHO POR PRAZO DETERMINADO...
                        </textarea>
                    </div>

                    <div class="checkbox text-center" style="margin: 30px 0;">
                        <label style="font-size: 1.1em;">
                            <input type="checkbox" id="chkVeracidade_${instanceId}">
                            Declaro que li a minuta do contrato e as informações fornecidas são verdadeiras.
                        </label>
                    </div>

                    <div class="alert alert-success text-center">
                        <i class="flaticon flaticon-check-circle icon-lg"></i><br>
                        Tudo pronto! Clique em "Finalizar e Enviar" para submeter seus dados ao RH.
                    </div>
                </div>
            </form>

            <hr>
            <div class="row" style="display: flex; align-items: center;">
                <div class="col-xs-4">
                    <button type="button" class="btn btn-default btn-lg" data-nav-back disabled>
                        <i class="flaticon flaticon-arrow-left"></i> Voltar
                    </button>
                </div>
                
                <div class="col-xs-4 text-center">
                    <img src="/Pagina_Candidato_IRHO/resources/images/LOGO-COMPLETA.png" 
                         alt="Logo Interhativa" 
                         style="max-height: 45px; max-width: 100%;">
                </div>

                <div class="col-xs-4 text-right">
                    <button type="button" class="btn btn-primary btn-lg" data-nav-next>
                        Próximo <i class="flaticon flaticon-arrow-right"></i>
                    </button>
                    <button type="button" class="btn btn-success btn-lg" data-finish style="display:none;">
                        Finalizar e Enviar <i class="flaticon flaticon-send"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/template" class="template-dependente">
        <div class="col-md-12 dependente-card" style="margin-bottom: 20px;">
            <div class="panel panel-default shadow-sm" style="border-left: 5px solid #5bc0de;">
                <div class="panel-heading" style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9;">
                    <h4 class="panel-title font-bold"><i class="flaticon flaticon-user"></i> Dados do Dependente</h4>
                    <button type="button" class="btn btn-danger btn-xs btn-remove-dep" data-remove-row title="Remover Dependente">
                        <i class="flaticon flaticon-trash"></i> Remover
                    </button>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Nome Completo <span class="text-danger">*</span></label>
                            <input type="text" class="form-control dep-nome" placeholder="Nome do dependente">
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Parentesco <span class="text-danger">*</span></label>
                            <input type="text" class="form-control dep-parentesco" placeholder="Ex: Pai, Filho...">
                        </div>
                        <div class="col-md-3 form-group">
                            <label>Sexo <span class="text-danger">*</span></label>
                            <select class="form-control dep-sexo">
                                <option value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 form-group">
                            <label>Data de Nascimento <span class="text-danger">*</span></label>
                            <input type="date" class="form-control dep-nasc">
                        </div>
                        <div class="col-md-4 form-group">
                            <label>CPF <span class="text-danger">*</span></label>
                            <input type="text" class="form-control dep-cpf" placeholder="000.000.000-00" maxlength="14">
                        </div>
                        <div class="col-md-4 form-group">
                            <label>Estado Civil</label>
                            <select class="form-control dep-est-civil">
                                <option value="">Selecione...</option>
                                <option value="Solteiro">Solteiro(a)</option>
                                <option value="Casado">Casado(a)</option>
                                <option value="Divorciado">Divorciado(a)</option>
                                <option value="Viuvo">Viúvo(a)</option>
                            </select>
                        </div>
                    </div>

                    <hr style="margin: 10px 0;">
                    <label style="color: #777; font-size: 11px; text-transform: uppercase;">Incidências (Para fins legais e de desconto)</label>
                    
                    <div class="row" style="background: #fcfcfc; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
                        <div class="col-md-4 form-group">
                            <label style="font-size: 11px;">Imposto de Renda?</label>
                            <select class="form-control input-sm dep-ir">
                                <option value="Nao">Não</option>
                                <option value="Sim">Sim</option>
                            </select>
                        </div>
                        <div class="col-md-4 form-group">
                            <label style="font-size: 11px;">IRRF (Retido na Fonte)?</label>
                            <select class="form-control input-sm dep-irrf">
                                <option value="Nao">Não</option>
                                <option value="Sim">Sim</option>
                            </select>
                        </div>
                        <div class="col-md-4 form-group">
                            <label style="font-size: 11px;">Plano de Saúde?</label>
                            <select class="form-control input-sm dep-plano">
                                <option value="Nao">Não</option>
                                <option value="Sim">Sim</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </script>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>
<script type="text/javascript" src="/Pagina_Candidato_IRHO/resources/js/oauth-1.0a.js"></script>
<script type="text/javascript" src="/Pagina_Candidato_IRHO/resources/js/Pagina_Candidato_IRHO.js?v=${instanceId}"></script>