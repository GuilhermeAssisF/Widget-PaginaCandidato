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
                <div class="step-item" data-step="3"><div class="step-circle">3</div><div class="step-label">Docs</div></div>
                <div class="step-item" data-step="4"><div class="step-circle">4</div><div class="step-label">Dep.</div></div>
                <div class="step-item" data-step="5"><div class="step-circle">5</div><div class="step-label">Benef.</div></div>
                <div class="step-item" data-step="6"><div class="step-circle">6</div><div class="step-label">Fim</div></div>
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
                    
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#tab_pessoais_${instanceId}" aria-controls="tab_pessoais_${instanceId}" role="tab" data-toggle="tab">
                                <i class="flaticon flaticon-person icon-sm"></i> Seus Dados
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#tab_contratacao_${instanceId}" aria-controls="tab_contratacao_${instanceId}" role="tab" data-toggle="tab">
                                <i class="flaticon flaticon-work icon-sm"></i> Contratação
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#tab_complementar_${instanceId}" aria-controls="tab_complementar_${instanceId}" role="tab" data-toggle="tab">
                                <i class="flaticon flaticon-medical icon-sm"></i> Exame Médico
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content shadow-panel">
                        
                        <div role="tabpanel" class="tab-pane active" id="tab_pessoais_${instanceId}">
                            <p class="text-danger"><small>* Confira seus dados básicos. Se houver erro, contate o recrutador.</small></p>
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
                                    <label>Contato / Celular</label>
                                    <input type="text" class="form-control" id="cand_celular_${instanceId}" readonly>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="date" class="form-control" id="cand_nascimento_${instanceId}" readonly>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_contratacao_${instanceId}">
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Empresa - Filial</label>
                                    <input type="text" class="form-control" id="cand_empresa_${instanceId}" readonly>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Data de Admissão</label>
                                    <input type="text" class="form-control" id="cand_data_admissao_${instanceId}" readonly>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label>Salário</label>
                                    <div class="input-group">
                                        <span class="input-group-addon">R$</span>
                                        <input type="text" class="form-control" id="cand_salario_${instanceId}" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>Função</label>
                                    <input type="text" class="form-control" id="cand_funcao_${instanceId}" readonly>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Seção / Departamento</label>
                                    <input type="text" class="form-control" id="cand_secao_${instanceId}" readonly>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label>Turno de Trabalho</label>
                                    <input type="text" class="form-control" id="cand_turno_${instanceId}" readonly>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane" id="tab_complementar_${instanceId}">
                            <div class="alert alert-info">
                                <i class="flaticon flaticon-info"></i> Informações sobre seu exame admissional agendado.
                            </div>
                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>Data e Hora do Exame</label>
                                    <input type="text" class="form-control" id="cand_exame_datahora_${instanceId}" readonly>
                                </div>
                                <div class="col-md-8 form-group">
                                    <label>Clínica</label>
                                    <input type="text" class="form-control" id="cand_exame_clinica_${instanceId}" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label>Endereço da Clínica</label>
                                    <input type="text" class="form-control" id="cand_exame_endereco_${instanceId}" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <label>Orientação ao Candidato</label>
                                    <textarea class="form-control" id="cand_exame_orientacao_${instanceId}" rows="3" readonly></textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style="background-color: #fcf8e3; border: 1px solid #faebcc; color: #8a6d3b; padding: 15px; border-radius: 4px; display: flex; align-items: center; margin-top: 15px;">
                        <i class="flaticon flaticon-alert icon-md" style="margin-right: 15px; font-size: 24px;"></i>
                        <span><strong>Orientação:</strong> Olá <span id="span_nome_msg_${instanceId}">Candidato</span>! Confira os dados nas abas acima e siga para a próxima etapa.</span>
                    </div>
                </div>

                <div data-step-content="3" class="step-content">
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

                <div data-step-content="4" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-group icon-sm"></i> Dependentes</h3>
                    <table class="table table-striped table-bordered" id="tbDependentes_${instanceId}">
                        <thead>
                            <tr>
                                <th>Nome do Dependente</th>
                                <th>Parentesco</th>
                                <th>Nascimento</th>
                                <th width="50"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <button type="button" class="btn btn-info" data-add-dependente>
                        <i class="flaticon flaticon-plus"></i> Adicionar Dependente
                    </button>
                </div>

                <div data-step-content="5" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-favorite icon-sm"></i> Benefícios</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading font-bold">Vale Transporte</div>
                                <div class="panel-body">
                                    <label>Deseja receber Vale Transporte?</label>
                                    <select class="form-control" id="cand_opt_vt_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Sim">Sim, desejo receber</option>
                                        <option value="Nao">Não, utilizo meio próprio</option>
                                    </select>
                                    <br>
                                    <div style="background-color: #fcf8e3; border: 1px solid #faebcc; color: #8a6d3b; padding: 15px; border-radius: 4px; display: flex; align-items: center; margin-top: 10px;">
                                        <i class="flaticon flaticon-alert icon-md" style="margin-right: 15px; font-size: 24px;"></i>
                                        <span><strong>Atenção:</strong> Desconto legal de 6% sobre o salário base.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading font-bold">Assistência Médica</div>
                                <div class="panel-body">
                                    <label>Deseja incluir no Plano de Saúde?</label>
                                    <select class="form-control" id="cand_opt_saude_${instanceId}">
                                        <option value="">Selecione...</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Nao">Não</option>
                                    </select>
                                    <br>
                                    <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #31708f; padding: 15px; border-radius: 4px; display: flex; align-items: center; margin-top: 10px;">
                                        <i class="flaticon flaticon-info icon-md" style="margin-right: 15px; font-size: 24px;"></i>
                                        <span><strong>Informação:</strong> Plano extensivo aos dependentes cadastrados.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-step-content="6" class="step-content">
                    <h3 class="section-title"><i class="flaticon flaticon-paper-plane icon-sm"></i> Finalização</h3>

                    <div class="form-group">
                        <label>Contrato de Trabalho (Minuta)</label>
                        <textarea class="form-control" rows="8" readonly style="background: #fff; font-family: monospace; font-size: 0.9em;">
CONTRATO DE TRABALHO POR PRAZO DETERMINADO

Pelo presente instrumento particular de contrato de trabalho...
1. O EMPREGADO exercerá a função de ANALISTA...
2. O horário de trabalho será das 08:00 às 17:00...
(...)
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
        <tr>
            <td><input type="text" class="form-control dep-nome" placeholder="Nome"></td>
            <td>
                <select class="form-control dep-parentesco">
                    <option value="Filho">Filho(a)</option>
                    <option value="Conjuge">Cônjuge</option>
                </select>
            </td>
            <td><input type="date" class="form-control dep-nasc"></td>
            <td class="text-center">
                <button type="button" class="btn btn-danger btn-xs" data-remove-row><i class="flaticon flaticon-trash"></i></button>
            </td>
        </tr>
    </script>
</div>
<script type="text/javascript" src="/portal/resources/js/jquery/jquery.js"></script>
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>

<script type="text/javascript" src="/Pagina_Candidato_IRHO/resources/js/oauth-1.0a.js"></script>

<script type="text/javascript" src="/Pagina_Candidato_IRHO/resources/js/Pagina_Candidato_IRHO.js"></script>