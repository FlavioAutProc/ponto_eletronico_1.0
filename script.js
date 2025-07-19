// Feriados de Maragogi - AL (atualizado para 2023-2024)
// Feriados de Maragogi - AL (atualizados e verificados)
const feriados = [
    // Feriados Nacionais (datas fixas)
    { date: '2023-01-01', name: 'Ano Novo', type: 'Nacional', fixed: true },
    { date: '2023-04-21', name: 'Tiradentes', type: 'Nacional', fixed: true },
    { date: '2023-05-01', name: 'Dia do Trabalho', type: 'Nacional', fixed: true },
    { date: '2023-09-07', name: 'Independência do Brasil', type: 'Nacional', fixed: true },
    { date: '2023-10-12', name: 'Nossa Senhora Aparecida', type: 'Nacional', fixed: true },
    { date: '2023-11-02', name: 'Finados', type: 'Nacional', fixed: true },
    { date: '2023-11-15', name: 'Proclamação da República', type: 'Nacional', fixed: true },
    { date: '2023-12-25', name: 'Natal', type: 'Nacional', fixed: true },
    
    // Feriados Nacionais (datas variáveis - 2023)
    { date: '2023-02-21', name: 'Carnaval', type: 'Nacional', fixed: false },
    { date: '2023-04-07', name: 'Sexta-Feira Santa', type: 'Nacional', fixed: false },
    { date: '2023-06-08', name: 'Corpus Christi', type: 'Nacional', fixed: false },
    
    // Feriados Estaduais (AL)
    { date: '2023-06-24', name: 'São João', type: 'Estadual', fixed: true },
    { date: '2023-06-29', name: 'São Pedro', type: 'Estadual', fixed: true },
    { date: '2023-09-16', name: 'Emancipação Política de Alagoas', type: 'Estadual', fixed: true },
    
    // Feriados Municipais (Maragogi-AL) - DATAS CORRIGIDAS E VERIFICADAS
    { date: '2023-04-23', name: 'Dia de São Jorge (Padroeiro de Maragogi)', type: 'Municipal', fixed: true },
    { date: '2023-09-27', name: 'Emancipação Política de Maragogi', type: 'Municipal', fixed: true },
    
    // Feriados Nacionais (2024 - datas fixas)
    { date: '2024-01-01', name: 'Ano Novo', type: 'Nacional', fixed: true },
    { date: '2024-04-21', name: 'Tiradentes', type: 'Nacional', fixed: true },
    { date: '2024-05-01', name: 'Dia do Trabalho', type: 'Nacional', fixed: true },
    { date: '2024-09-07', name: 'Independência do Brasil', type: 'Nacional', fixed: true },
    { date: '2024-10-12', name: 'Nossa Senhora Aparecida', type: 'Nacional', fixed: true },
    { date: '2024-11-02', name: 'Finados', type: 'Nacional', fixed: true },
    { date: '2024-11-15', name: 'Proclamação da República', type: 'Nacional', fixed: true },
    { date: '2024-12-25', name: 'Natal', type: 'Nacional', fixed: true },
    
    // Feriados Nacionais (2024 - datas variáveis)
    { date: '2024-02-13', name: 'Carnaval', type: 'Nacional', fixed: false },
    { date: '2024-03-29', name: 'Sexta-Feira Santa', type: 'Nacional', fixed: false },
    { date: '2024-05-30', name: 'Corpus Christi', type: 'Nacional', fixed: false },
    
    // Feriados Estaduais (AL - 2024)
    { date: '2024-06-24', name: 'São João', type: 'Estadual', fixed: true },
    { date: '2024-06-29', name: 'São Pedro', type: 'Estadual', fixed: true },
    { date: '2024-09-16', name: 'Emancipação Política de Alagoas', type: 'Estadual', fixed: true },
    
    // Feriados Municipais (Maragogi-AL - 2024)
    { date: '2024-04-23', name: 'Dia de São Jorge (Padroeiro de Maragogi)', type: 'Municipal', fixed: true },
    { date: '2024-09-27', name: 'Emancipação Política de Maragogi', type: 'Municipal', fixed: true }
];

// Função para verificar se uma data é feriado
function isFeriado(date) {
    const dateStr = date.toISOString().split('T')[0];
    return feriados.some(f => f.date === dateStr);
}
// Adicione no início do arquivo, após as constantes de feriados
const defaultConfig = {
    nome: '',
    setor: '',
    funcao: '',
    empresa: '',
    admissao: '',
    jornadaInicio: '08:00',
    jornadaFim: '17:00'
};
// Função para obter informações do feriado
function getFeriadoInfo(date) {
    const dateStr = date.toISOString().split('T')[0];
    return feriados.find(f => f.date === dateStr);
}

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar hora atual
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Carregar registros do localStorage
    loadUserConfig();
    loadRegistros();
    updateBackupStats();

    // Configurar listeners dos botões
    // Configurar botão de salvar
    document.getElementById('saveConfigBtn').addEventListener('click', saveUserConfig);

    document.getElementById('entradaBtn').addEventListener('click', () => registrarPonto('Entrada'));
    document.getElementById('intervaloBtn').addEventListener('click', () => registrarPonto('Intervalo'));
    document.getElementById('retornoBtn').addEventListener('click', () => registrarPonto('Retorno'));
    document.getElementById('saidaBtn').addEventListener('click', () => registrarPonto('Saída'));
    
    // Upload de arquivo
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    
    // Limpar registros
    document.getElementById('clearTodayBtn').addEventListener('click', clearTodayRegistros);
    
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Carregar conteúdo específico da tab
            if (tabId === 'configuracoes') loadUserConfig();
            if (tabId === 'historico') loadHistorico();
            if (tabId === 'relatorios') loadRelatorios();
            if (tabId === 'feriados') loadFeriados();
            if (tabId === 'backup') updateBackupStats();
        });
    });
    
    // Filtros
    document.getElementById('filterPeriod').addEventListener('change', function() {
        document.getElementById('customDateRange').style.display = 
            this.value === 'custom' ? 'block' : 'none';
    });
    
    document.getElementById('filterBtn').addEventListener('click', loadHistorico);
    document.getElementById('exportFilterBtn').addEventListener('click', exportFilteredData);
    
    // Relatórios
    document.getElementById('generateMonthlyBtn').addEventListener('click', exportMonthPDF);
    document.getElementById('generateYearlyBtn').addEventListener('click', exportYearPDF);
    
    // Preencher anos para relatórios
    populateYearDropdown();
    
    // Backup
    document.getElementById('exportBackupBtn').addEventListener('click', exportBackup);
    document.getElementById('importBackupBtn').addEventListener('click', () => document.getElementById('backupFileInput').click());
    document.getElementById('backupFileInput').addEventListener('change', importBackup);
    
    // Carregar localização
    getLocation();
});

// Atualizar hora atual
function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Maceio'
    };
    document.getElementById('currentTime').textContent = now.toLocaleDateString('pt-BR', options);
}

// Lidar com upload de arquivo
function handleFileUpload(event) {
    const file = event.target.files[0];
    const filePreview = document.getElementById('filePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview"> ${file.name}`;
            } else if (file.type === 'application/pdf') {
                filePreview.innerHTML = `<i class="fas fa-file-pdf" style="color: #e74c3c; font-size: 1.5rem;"></i> ${file.name}`;
            } else {
                filePreview.innerHTML = `<i class="fas fa-file" style="color: #3498db; font-size: 1.5rem;"></i> ${file.name}`;
            }
        };
        reader.readAsDataURL(file);
    } else {
        filePreview.innerHTML = '<span>Nenhum arquivo selecionado</span>';
    }
}

// Obter localização
function getLocation() {
    const locationInfo = document.getElementById('locationInfo');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Usar a API de geocodificação reversa para obter cidade e estado
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.address.city || data.address.town || data.address.village;
                        const state = data.address.state;
                        locationInfo.innerHTML = `<i class="fas fa-map-marker-alt"></i> Localização: ${city}, ${state}`;
                        
                        // Salvar localização para uso no registro
                        localStorage.setItem('lastKnownLocation', JSON.stringify({
                            city: city,
                            state: state,
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }));
                    })
                    .catch(error => {
                        console.error("Erro ao obter localização:", error);
                        locationInfo.innerHTML = '<i class="fas fa-map-marker-alt"></i> Localização: Maragogi, AL (padrão)';
                    });
            },
            error => {
                console.error("Erro ao obter geolocalização:", error);
                locationInfo.innerHTML = '<i class="fas fa-map-marker-alt"></i> Localização: Maragogi, AL (padrão)';
            }
        );
    } else {
        locationInfo.innerHTML = '<i class="fas fa-map-marker-alt"></i> Localização: Maragogi, AL (padrão)';
    }
}

// Registrar ponto
function registrarPonto(tipo) {
    const now = new Date();
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    
    if (fileInput.files.length === 0 && tipo !== 'Intervalo' && tipo !== 'Retorno') {
        alert('Por favor, anexe um comprovante antes de registrar o ponto.');
        return;
    }
    
    // Obter localização salva
    let location = { city: 'Maragogi', state: 'AL' };
    const savedLocation = localStorage.getItem('lastKnownLocation');
    if (savedLocation) {
        location = JSON.parse(savedLocation);
    }
    
    // Obter arquivo se existir
    let fileData = null;
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result.split(',')[1] // Remove data: prefix
            };
            
            // Criar registro
            createRecord(tipo, now, location, fileData);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Criar registro sem arquivo
        createRecord(tipo, now, location, null);
    }
}

function createRecord(tipo, now, location, fileData) {
    // Criar registro
    const registro = {
        id: Date.now(),
        tipo: tipo,
        data: now.toISOString(),
        localizacao: `${location.city}, ${location.state}`,
        coordenadas: location.lat && location.lon ? 
            { lat: location.lat, lon: location.lon } : null,
        arquivo: fileData
    };
    
    // Salvar no localStorage
    saveRegistro(registro);
    
    // Atualizar exibição
    addRegistroToTable(registro);
    
    // Limpar arquivo após registro
    document.getElementById('fileInput').value = '';
    document.getElementById('filePreview').innerHTML = '<span>Nenhum arquivo selecionado</span>';
    
    // Feedback visual
    showNotification(`Ponto de ${tipo} registrado com sucesso às ${now.toLocaleTimeString('pt-BR')}`, 'success');
    
    // Atualizar totais
    updateTodaySummary();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Salvar registro no localStorage
function saveRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    registros.push(registro);
    localStorage.setItem('registrosPontos', JSON.stringify(registros));
}

// Carregar registros do localStorage
function loadRegistros() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const today = new Date().toISOString().split('T')[0];
    
    // Filtrar registros de hoje
    const todayRegistros = registros.filter(reg => {
        return reg.data.split('T')[0] === today;
    });
    
    // Ordenar por horário
    todayRegistros.sort((a, b) => new Date(a.data) - new Date(b.data));
    
    // Exibir registros de hoje
    const registrosBody = document.getElementById('registrosBody');
    registrosBody.innerHTML = '';
    
    todayRegistros.forEach(reg => {
        addRegistroToTable(reg);
    });
    
    // Atualizar totais
    updateTodaySummary();
}

// Adicionar registro à tabela
function addRegistroToTable(registro) {
    const registrosBody = document.getElementById('registrosBody');
    const row = document.createElement('tr');
    
    const date = new Date(registro.data);
    
    // Verificar se é feriado
    const isFeriado = feriados.some(f => f.date === registro.data.split('T')[0]);
    
    if (isFeriado) {
        row.classList.add('feriado');
    }
    
    row.innerHTML = `
        <td>${registro.tipo}</td>
        <td>${date.toLocaleTimeString('pt-BR')}</td>
        <td>${registro.localizacao}</td>
        <td>${registro.arquivo ? 
            `<span class="file-info">${registro.arquivo.name}</span>` : 'N/A'}</td>
        <td>
            ${registro.arquivo ? 
                `<button class="btn btn-primary btn-sm view-file" data-id="${registro.id}">
                    <i class="fas fa-eye"></i> Visualizar
                </button>` : ''}
            <button class="btn btn-danger btn-sm delete-reg" data-id="${registro.id}">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </td>
    `;
    
    registrosBody.appendChild(row);
    
    // Adicionar eventos aos botões
    if (registro.arquivo) {
        row.querySelector('.view-file').addEventListener('click', function() {
            viewFile(registro.id);
        });
    }
    
    row.querySelector('.delete-reg').addEventListener('click', function() {
        deleteRegistro(registro.id);
    });
}

// Visualizar arquivo anexo
function viewFile(registroId) {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const registro = registros.find(r => r.id == registroId);
    
    if (!registro || !registro.arquivo) return;
    
    const fileData = registro.arquivo;
    const fileUrl = `data:${fileData.type};base64,${fileData.data}`;
    
    if (fileData.type === 'application/pdf') {
        // Abrir PDF em nova aba
        window.open(fileUrl, '_blank');
    } else if (fileData.type.startsWith('image/')) {
        // Mostrar imagem em modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 class="modal-title">Comprovante - ${registro.tipo}</h3>
                <img src="${fileUrl}" style="max-width: 100%;" alt="Comprovante">
                <p><strong>Horário:</strong> ${new Date(registro.data).toLocaleString('pt-BR')}</p>
                <p><strong>Localização:</strong> ${registro.localizacao}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    } else {
        // Download de outros tipos de arquivo
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileData.name;
        a.click();
    }
}

// Excluir registro
function deleteRegistro(registroId) {
    if (confirm('Tem certeza que deseja excluir este registro permanentemente?')) {
        let registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
        registros = registros.filter(r => r.id != registroId);
        localStorage.setItem('registrosPontos', JSON.stringify(registros));
        
        loadRegistros();
        showNotification('Registro excluído com sucesso!', 'success');
    }
}

// Atualizar resumo do dia
function updateTodaySummary() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const today = new Date().toISOString().split('T')[0];
    
    const todayRegistros = registros.filter(reg => {
        return reg.data.split('T')[0] === today;
    });
    
    // Calcular horas trabalhadas
    let totalHoras = 0;
    
    // Encontrar entrada e saída
    const entrada = todayRegistros.find(r => r.tipo === 'Entrada');
    const saida = todayRegistros.find(r => r.tipo === 'Saída');
    
    if (entrada && saida) {
        const entradaTime = new Date(entrada.data);
        const saidaTime = new Date(saida.data);
        
        // Calcular diferença em horas
        let diffHours = (saidaTime - entradaTime) / (1000 * 60 * 60);
        
        // Verificar se há intervalo
        const intervalo = todayRegistros.find(r => r.tipo === 'Intervalo');
        const retorno = todayRegistros.find(r => r.tipo === 'Retorno');
        
        if (intervalo && retorno) {
            const intervaloTime = new Date(intervalo.data);
            const retornoTime = new Date(retorno.data);
            const intervaloDiff = (retornoTime - intervaloTime) / (1000 * 60 * 60);
            diffHours -= intervaloDiff;
        } else if (diffHours > 6) {
            // Descontar 1 hora padrão se não houver registro de intervalo
            diffHours -= 1;
        }
        
        totalHoras = diffHours;
    }
    
    // Formatar horas
    const hours = Math.floor(totalHoras);
    const minutes = Math.floor((totalHoras - hours) * 60);
    const totalStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    document.getElementById('totalHoursToday').textContent = totalStr;
}

// Limpar registros de hoje (apenas da visualização)
function clearTodayRegistros() {
    if (confirm('Tem certeza que deseja limpar os registros de hoje da visualização? Os dados permanecerão no histórico.')) {
        document.getElementById('registrosBody').innerHTML = '';
        document.getElementById('totalHoursToday').textContent = '00:00';
    }
}

// Carregar histórico
function loadHistorico() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const filterPeriod = document.getElementById('filterPeriod').value;
    const filterDate = document.getElementById('filterDate').value;
    const filterDateEnd = document.getElementById('filterDateEnd').value;
    
    let filteredRegistros = [...registros];
    
    if (filterDate) {
        const selectedDate = new Date(filterDate);
        let endDate = filterDateEnd ? new Date(filterDateEnd) : new Date(filterDate);
        
        filteredRegistros = filteredRegistros.filter(reg => {
            const regDate = new Date(reg.data);
            
            if (filterPeriod === 'day') {
                return regDate.toDateString() === selectedDate.toDateString();
            } else if (filterPeriod === 'week') {
                const startOfWeek = new Date(selectedDate);
                startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                
                return regDate >= startOfWeek && regDate <= endOfWeek;
            } else if (filterPeriod === 'month') {
                return regDate.getMonth() === selectedDate.getMonth() && 
                       regDate.getFullYear() === selectedDate.getFullYear();
            } else if (filterPeriod === 'year') {
                return regDate.getFullYear() === selectedDate.getFullYear();
            } else if (filterPeriod === 'custom') {
                return regDate >= selectedDate && regDate <= endDate;
            }
            
            return true;
        });
    }
    
    // Ordenar por data (mais recente primeiro)
    filteredRegistros.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Agrupar por dia
    const groupedByDay = {};
    filteredRegistros.forEach(reg => {
        const dateKey = new Date(reg.data).toISOString().split('T')[0];
        if (!groupedByDay[dateKey]) {
            groupedByDay[dateKey] = [];
        }
        groupedByDay[dateKey].push(reg);
    });
    
    // Exibir histórico
    const historicoContent = document.getElementById('historicoContent');
    historicoContent.innerHTML = '';
    
    for (const [date, registros] of Object.entries(groupedByDay)) {
        const dateObj = new Date(date);
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        
        // Verificar se é feriado
        const isFeriado = feriados.some(f => f.date === date);
        const feriadoInfo = isFeriado ? feriados.find(f => f.date === date) : null;
        
        // Calcular horas trabalhadas no dia
        let horasTrabalhadas = 0;
        const entrada = registros.find(r => r.tipo === 'Entrada');
        const saida = registros.find(r => r.tipo === 'Saída');
        
        if (entrada && saida) {
            const entradaTime = new Date(entrada.data);
            const saidaTime = new Date(saida.data);
            
            // Calcular diferença em horas
            let diffHours = (saidaTime - entradaTime) / (1000 * 60 * 60);
            
            // Verificar se há intervalo
            const intervalo = registros.find(r => r.tipo === 'Intervalo');
            const retorno = registros.find(r => r.tipo === 'Retorno');
            
            if (intervalo && retorno) {
                const intervaloTime = new Date(intervalo.data);
                const retornoTime = new Date(retorno.data);
                const intervaloDiff = (retornoTime - intervaloTime) / (1000 * 60 * 60);
                diffHours -= intervaloDiff;
            } else if (diffHours > 6) {
                // Descontar 1 hora padrão se não houver registro de intervalo
                diffHours -= 1;
            }
            
            horasTrabalhadas = diffHours;
        }
        
        // Formatar horas
        const hours = Math.floor(horasTrabalhadas);
        const minutes = Math.floor((horasTrabalhadas - hours) * 60);
        const horasStr = horasTrabalhadas > 0 ? 
            `${hours}h ${minutes}m` : 'N/A';
        
        dayCard.innerHTML = `
            <div class="day-header">
                <h3>${dateObj.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <span class="total-hours">${horasStr}</span>
            </div>
            <div class="day-body">
                ${isFeriado ? `
                    <div class="feriado-info">
                        <i class="fas fa-calendar-day"></i>
                        <strong>Feriado:</strong> ${feriadoInfo.name} (${feriadoInfo.type})
                    </div>
                ` : ''}
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Horário</th>
                            <th>Localização</th>
                            <th>Comprovante</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${registros.map(reg => `
                            <tr ${isFeriado ? 'class="feriado"' : ''}>
                                <td>${reg.tipo}</td>
                                <td>${new Date(reg.data).toLocaleTimeString('pt-BR')}</td>
                                <td>${reg.localizacao}</td>
                                <td>${reg.arquivo ? 
                                    `<span class="file-info">${reg.arquivo.name}</span>` : 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        historicoContent.appendChild(dayCard);
    }
    
    if (filteredRegistros.length === 0) {
        historicoContent.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Nenhum registro encontrado para o período selecionado.</p>
            </div>
        `;
    }
}

// Exportar dados filtrados
function exportFilteredData() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const filterPeriod = document.getElementById('filterPeriod').value;
    const filterDate = document.getElementById('filterDate').value;
    const filterDateEnd = document.getElementById('filterDateEnd').value;
    
    let filteredRegistros = [...registros];
    
    if (filterDate) {
        const selectedDate = new Date(filterDate);
        let endDate = filterDateEnd ? new Date(filterDateEnd) : new Date(filterDate);
        
        filteredRegistros = filteredRegistros.filter(reg => {
            const regDate = new Date(reg.data);
            
            if (filterPeriod === 'day') {
                return regDate.toDateString() === selectedDate.toDateString();
            } else if (filterPeriod === 'week') {
                const startOfWeek = new Date(selectedDate);
                startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                
                return regDate >= startOfWeek && regDate <= endOfWeek;
            } else if (filterPeriod === 'month') {
                return regDate.getMonth() === selectedDate.getMonth() && 
                       regDate.getFullYear() === selectedDate.getFullYear();
            } else if (filterPeriod === 'year') {
                return regDate.getFullYear() === selectedDate.getFullYear();
            } else if (filterPeriod === 'custom') {
                return regDate >= selectedDate && regDate <= endDate;
            }
            
            return true;
        });
    }
    
    if (filteredRegistros.length === 0) {
        alert('Nenhum registro encontrado para exportar.');
        return;
    }
    
    // Criar conteúdo CSV
    let csvContent = "Tipo,Data,Hora,Localização,Arquivo\n";
    
    filteredRegistros.forEach(reg => {
        const date = new Date(reg.data);
        csvContent += `"${reg.tipo}","${date.toLocaleDateString('pt-BR')}",` +
                      `"${date.toLocaleTimeString('pt-BR')}","${reg.localizacao}",` +
                      `"${reg.arquivo ? reg.arquivo.name : 'N/A'}"\n`;
    });
    
    // Criar arquivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    // Definir nome do arquivo
    let fileName = 'registros_ponto';
    if (filterPeriod === 'day' && filterDate) {
        fileName += `_${new Date(filterDate).toISOString().split('T')[0]}`;
    } else if (filterPeriod === 'month' && filterDate) {
        const date = new Date(filterDate);
        fileName += `_${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}`;
    } else if (filterPeriod === 'year' && filterDate) {
        fileName += `_${new Date(filterDate).getFullYear()}`;
    } else if (filterPeriod === 'custom' && filterDate && filterDateEnd) {
        fileName += `_${new Date(filterDate).toISOString().split('T')[0]}_a_${new Date(filterDateEnd).toISOString().split('T')[0]}`;
    }
    
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Carregar relatórios
function loadRelatorios() {
    const relatoriosContent = document.getElementById('relatoriosContent');
    relatoriosContent.innerHTML = `
        <div class="report-info">
            <i class="fas fa-info-circle"></i>
            <p>Selecione as opções acima para gerar relatórios em PDF.</p>
            <p>Os relatórios incluem totais de horas trabalhadas e marcações de ponto.</p>
        </div>
    `;
}

// Preencher dropdown de anos
function populateYearDropdown() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const yearSelect = document.getElementById('reportYear');
    
    // Obter anos únicos dos registros
    const years = new Set();
    registros.forEach(reg => {
        years.add(new Date(reg.data).getFullYear());
    });
    
    // Adicionar anos atuais caso não haja registros
    if (years.size === 0) {
        const currentYear = new Date().getFullYear();
        years.add(currentYear);
        years.add(currentYear - 1);
    }
    
    // Ordenar anos (do mais recente para o mais antigo)
    const sortedYears = Array.from(years).sort((a, b) => b - a);
    
    // Preencher dropdown
    yearSelect.innerHTML = '';
    sortedYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
    
    // Definir ano atual como padrão
    yearSelect.value = new Date().getFullYear();
}

// Exportar relatório mensal em PDF

function exportMonthPDF() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const monthInput = document.getElementById('reportMonth').value;
    const userConfig = JSON.parse(localStorage.getItem('userConfig')) || defaultConfig;
    
    if (!monthInput) {
        alert('Por favor, selecione um mês e ano.');
        return;
    }
    
    const [year, month] = monthInput.split('-').map(Number);
    
    // Filtrar registros do mês selecionado
    const monthRegistros = registros.filter(reg => {
        const regDate = new Date(reg.data);
        return regDate.getMonth() + 1 === month && regDate.getFullYear() === year;
    });
    
    if (monthRegistros.length === 0) {
        alert('Nenhum registro encontrado para o mês selecionado.');
        return;
    }
    
    // Agrupar por dia
    const groupedByDay = {};
    monthRegistros.forEach(reg => {
        const dateKey = new Date(reg.data).toISOString().split('T')[0];
        if (!groupedByDay[dateKey]) {
            groupedByDay[dateKey] = [];
        }
        groupedByDay[dateKey].push(reg);
    });
    
    // Criar conteúdo do PDF
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório Mensal de Ponto - ${monthName}</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 1.5cm;
                    color: #333;
                    line-height: 1.5;
                }
                .pdf-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #e0e0e0;
                }
                .pdf-header h1 {
                    color: #2c3e50;
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                .pdf-header h2 {
                    color: #7f8c8d;
                    font-size: 1.3rem;
                    font-weight: 400;
                }
                .user-info {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    font-size: 0.9rem;
                }
                .user-info-row {
                    display: flex;
                    margin-bottom: 0.5rem;
                }
                .user-info-label {
                    font-weight: 600;
                    min-width: 150px;
                    color: #7f8c8d;
                }
                .pdf-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    font-size: 0.9rem;
                }
                .pdf-table th {
                    background-color: #3498db;
                    color: white;
                    padding: 0.75rem;
                    text-align: center;
                    font-weight: 500;
                    border: 1px solid #2980b9;
                }
                .pdf-table td {
                    padding: 0.6rem;
                    border: 1px solid #e0e0e0;
                    text-align: center;
                }
                .pdf-table tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                .pdf-feriado {
                    background-color: #fff8e1 !important;
                    color: #5d4037;
                }
                .pdf-summary {
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    padding: 1rem;
                    margin: 1.5rem 0;
                }
                .pdf-summary h3 {
                    color: #2c3e50;
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 0.5rem;
                }
                .pdf-notes {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px dashed #e0e0e0;
                }
                .pdf-footer {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 2px solid #e0e0e0;
                    font-size: 0.85rem;
                    color: #7f8c8d;
                }
                .pdf-signature {
                    margin-top: 3rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e0e0e0;
                    text-align: right;
                }
                .pdf-logo {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                .pdf-logo-text {
                    display: inline-block;
                    background-color: #3498db;
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }
                @page {
                    size: A4;
                    margin: 1.5cm;
                    @bottom-right {
                        content: "Página " counter(page) " de " counter(pages);
                        font-size: 0.8rem;
                        color: #7f8c8d;
                    }
                }
            </style>
        </head>
        <body>
            <div class="pdf-logo">
                <div class="pdf-logo-text">PONTO ELETRÔNICO</div>
            </div>
            <div class="pdf-header">
                <h1>Relatório Mensal de Ponto</h1>
                <h2>${monthName}</h2>
            </div>
            
            <div class="user-info">
                <div class="user-info-row">
                    <span class="user-info-label">Nome:</span>
                    <span>${userConfig.nome || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Setor:</span>
                    <span>${userConfig.setor || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Função:</span>
                    <span>${userConfig.funcao || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Empresa:</span>
                    <span>${userConfig.empresa || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Data de Admissão:</span>
                    <span>${userConfig.admissao ? new Date(userConfig.admissao).toLocaleDateString('pt-BR') : 'Não informada'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Jornada Padrão:</span>
                    <span>${userConfig.jornadaInicio || '08:00'} às ${userConfig.jornadaFim || '17:00'}</span>
                </div>
            </div>
            
            <table class="pdf-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Dia</th>
                        <th>Entrada</th>
                        <th>Intervalo</th>
                        <th>Retorno</th>
                        <th>Saída</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    let totalHorasMes = 0;
    let diasUteis = 0;
    let diasTrabalhados = 0;
    let diasFeriados = 0;
    let horasExtras = 0;
    let horasDevidas = 0;
    
    // Obter todos os dias do mês
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month - 1, daysInMonth);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dateKey = currentDate.toISOString().split('T')[0];
        const dayName = currentDate.toLocaleDateString('pt-BR', { weekday: 'short' });
        
        // Verificar se é dia útil (segunda a sexta)
        const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;
        if (isWeekday) diasUteis++;
        
        // Verificar se é feriado
        const isFeriado = feriados.some(f => f.date === dateKey);
        const feriadoInfo = isFeriado ? feriados.find(f => f.date === dateKey) : null;
        if (isFeriado) diasFeriados++;
        
        // Obter registros do dia
        const dayRegistros = groupedByDay[dateKey] || [];
        
        // Organizar registros por tipo
        const entrada = dayRegistros.find(r => r.tipo === 'Entrada');
        const intervalo = dayRegistros.find(r => r.tipo === 'Intervalo');
        const retorno = dayRegistros.find(r => r.tipo === 'Retorno');
        const saida = dayRegistros.find(r => r.tipo === 'Saída');
        
        // Calcular horas trabalhadas
        let horasTrabalhadas = 0;
        let horasStr = 'N/A';
        let horasExtrasDia = 0;
        let horasDevidasDia = 0;
        
        if (entrada && saida) {
            diasTrabalhados++;
            const entradaTime = new Date(entrada.data);
            const saidaTime = new Date(saida.data);
            
            // Calcular diferença em horas
            let diffHours = (saidaTime - entradaTime) / (1000 * 60 * 60);
            
            // Descontar intervalo se existir
            if (intervalo && retorno) {
                const intervaloTime = new Date(intervalo.data);
                const retornoTime = new Date(retorno.data);
                const intervaloDiff = (retornoTime - intervaloTime) / (1000 * 60 * 60);
                diffHours -= intervaloDiff;
            } else if (diffHours > 6) {
                // Descontar 1 hora padrão se não houver registro de intervalo
                diffHours -= 1;
            }
            
            horasTrabalhadas = diffHours;
            
            // Calcular horas extras/devidas (considerando jornada padrão 8h)
            const jornadaPadrao = 8;
            if (horasTrabalhadas > jornadaPadrao) {
                horasExtrasDia = horasTrabalhadas - jornadaPadrao;
                horasExtras += horasExtrasDia;
            } else if (horasTrabalhadas > 0) {
                horasDevidasDia = jornadaPadrao - horasTrabalhadas;
                horasDevidas += horasDevidasDia;
            }
            
            // Formatar horas
            const hours = Math.floor(diffHours);
            const minutes = Math.floor((diffHours - hours) * 60);
            horasStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            if (horasExtrasDia > 0 || horasDevidasDia > 0) {
                horasStr += ` (${horasExtrasDia > 0 ? '+' : ''}${horasExtrasDia.toFixed(2)}h / ${horasDevidasDia > 0 ? '-' : ''}${horasDevidasDia.toFixed(2)}h)`;
            }
        }
        
        totalHorasMes += horasTrabalhadas;
        
        pdfContent += `
            <tr ${isFeriado ? 'class="pdf-feriado"' : ''}>
                <td>${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}</td>
                <td>${dayName}${isFeriado ? ' (Feriado)' : ''}</td>
                <td>${entrada ? new Date(entrada.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td>${intervalo ? new Date(intervalo.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td>${retorno ? new Date(retorno.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td>${saida ? new Date(saida.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td>${horasStr}</td>
            </tr>
        `;
    }
    
    // Formatar total do mês
    const totalHours = Math.floor(totalHorasMes);
    const totalMinutes = Math.floor((totalHorasMes - totalHours) * 60);
    const totalStr = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
    
    // Calcular média diária
    const mediaDiaria = diasTrabalhados > 0 ? totalHorasMes / diasTrabalhados : 0;
    const mediaHours = Math.floor(mediaDiaria);
    const mediaMinutes = Math.floor((mediaDiaria - mediaHours) * 60);
    const mediaStr = `${mediaHours.toString().padStart(2, '0')}:${mediaMinutes.toString().padStart(2, '0')}`;
    
    // Formatar horas extras e devidas
    const horasExtrasFormat = horasExtras > 0 ? `+${horasExtras.toFixed(2)}h` : '0h';
    const horasDevidasFormat = horasDevidas > 0 ? `-${horasDevidas.toFixed(2)}h` : '0h';
    
    pdfContent += `
                </tbody>
            </table>
            
            <div class="pdf-summary">
                <h3>Resumo Mensal</h3>
                <table class="pdf-table" style="width: 100%;">
                    <tr>
                        <td style="text-align: right; width: 70%;"><strong>Total do Mês:</strong></td>
                        <td style="font-weight: bold;">${totalStr}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Média Diária:</strong></td>
                        <td style="font-weight: bold;">${mediaStr}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Dias Úteis:</strong></td>
                        <td style="font-weight: bold;">${diasUteis}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Dias Trabalhados:</strong></td>
                        <td style="font-weight: bold;">${diasTrabalhados}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Dias Feriados:</strong></td>
                        <td style="font-weight: bold;">${diasFeriados}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Horas Extras:</strong></td>
                        <td style="font-weight: bold; color: ${horasExtras > 0 ? '#27ae60' : '#7f8c8d'};">${horasExtrasFormat}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Horas Devidas:</strong></td>
                        <td style="font-weight: bold; color: ${horasDevidas > 0 ? '#e74c3c' : '#7f8c8d'};">${horasDevidasFormat}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Saldo Final:</strong></td>
                        <td style="font-weight: bold; color: ${(horasExtras - horasDevidas) > 0 ? '#27ae60' : '#e74c3c'};">${(horasExtras - horasDevidas).toFixed(2)}h</td>
                    </tr>
                </table>
            </div>
            
            <div class="pdf-notes">
                <p><strong>Observações:</strong></p>
                <ul>
                    <li>Horas calculadas considerando 1 hora de intervalo para jornadas acima de 6 horas</li>
                    <li>Feriados destacados em amarelo</li>
                    <li>Jornada padrão considerada: ${userConfig.jornadaInicio || '08:00'} às ${userConfig.jornadaFim || '17:00'} (8h diárias)</li>
                    <li>Horas extras calculadas com base na diferença entre horas trabalhadas e jornada padrão</li>
                    <li>Relatório gerado automaticamente pelo sistema de ponto eletrônico</li>
                </ul>
            </div>
            
            <div class="pdf-footer">
                <p>Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
            </div>
            
            <div class="pdf-signature">
                <p>_________________________________________</p>
                <p>Assinatura do Responsável</p>
            </div>
        </body>
        </html>
    `;
    
    // Gerar PDF
    const win = window.open('', '_blank');
    win.document.write(pdfContent);
    win.document.close();
    
    // Adicionar delay para garantir que o conteúdo seja carregado antes da impressão
    setTimeout(() => {
        win.print();
    }, 500);
}

// Exportar relatório anual em PDF
function exportYearPDF() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const year = document.getElementById('reportYear').value;
    const userConfig = JSON.parse(localStorage.getItem('userConfig')) || defaultConfig;
    
    if (!year) {
        alert('Por favor, selecione um ano.');
        return;
    }
    
    // Filtrar registros do ano selecionado
    const yearRegistros = registros.filter(reg => {
        const regDate = new Date(reg.data);
        return regDate.getFullYear() === parseInt(year);
    });
    
    if (yearRegistros.length === 0) {
        alert('Nenhum registro encontrado para o ano selecionado.');
        return;
    }
    
    // Agrupar por mês
    const groupedByMonth = {};
    yearRegistros.forEach(reg => {
        const month = new Date(reg.data).getMonth();
        if (!groupedByMonth[month]) {
            groupedByMonth[month] = [];
        }
        groupedByMonth[month].push(reg);
    });
    
    // Criar conteúdo do PDF
    let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório Anual de Ponto - ${year}</title>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 1.5cm;
                    color: #333;
                    line-height: 1.5;
                }
                .pdf-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #e0e0e0;
                }
                .pdf-header h1 {
                    color: #2c3e50;
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                .pdf-header h2 {
                    color: #7f8c8d;
                    font-size: 1.3rem;
                    font-weight: 400;
                }
                .user-info {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    font-size: 0.9rem;
                }
                .user-info-row {
                    display: flex;
                    margin-bottom: 0.5rem;
                }
                .user-info-label {
                    font-weight: 600;
                    min-width: 150px;
                    color: #7f8c8d;
                }
                .pdf-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    font-size: 0.9rem;
                }
                .pdf-table th {
                    background-color: #3498db;
                    color: white;
                    padding: 0.75rem;
                    text-align: center;
                    font-weight: 500;
                    border: 1px solid #2980b9;
                }
                .pdf-table td {
                    padding: 0.6rem;
                    border: 1px solid #e0e0e0;
                    text-align: center;
                }
                .pdf-table tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                .pdf-feriado {
                    background-color: #fff8e1 !important;
                    color: #5d4037;
                }
                .pdf-summary {
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    padding: 1rem;
                    margin: 1.5rem 0;
                }
                .pdf-summary h3 {
                    color: #2c3e50;
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 0.5rem;
                }
                .pdf-notes {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px dashed #e0e0e0;
                }
                .pdf-footer {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 2px solid #e0e0e0;
                    font-size: 0.85rem;
                    color: #7f8c8d;
                }
                .pdf-signature {
                    margin-top: 3rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e0e0e0;
                    text-align: right;
                }
                .pdf-logo {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                .pdf-logo-text {
                    display: inline-block;
                    background-color: #3498db;
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }
                @page {
                    size: A4;
                    margin: 1.5cm;
                    @bottom-right {
                        content: "Página " counter(page) " de " counter(pages);
                        font-size: 0.8rem;
                        color: #7f8c8d;
                    }
                }
            </style>
        </head>
        <body>
            <div class="pdf-logo">
                <div class="pdf-logo-text">PONTO ELETRÔNICO</div>
            </div>
            <div class="pdf-header">
                <h1>Relatório Anual de Ponto</h1>
                <h2>Ano ${year}</h2>
            </div>
            
            <div class="user-info">
                <div class="user-info-row">
                    <span class="user-info-label">Nome:</span>
                    <span>${userConfig.nome || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Setor:</span>
                    <span>${userConfig.setor || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Função:</span>
                    <span>${userConfig.funcao || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Empresa:</span>
                    <span>${userConfig.empresa || 'Não informado'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Data de Admissão:</span>
                    <span>${userConfig.admissao ? new Date(userConfig.admissao).toLocaleDateString('pt-BR') : 'Não informada'}</span>
                </div>
                <div class="user-info-row">
                    <span class="user-info-label">Jornada Padrão:</span>
                    <span>${userConfig.jornadaInicio || '08:00'} às ${userConfig.jornadaFim || '17:00'}</span>
                </div>
            </div>
    `;
    
    let totalHorasAno = 0;
    let totalDiasUteis = 0;
    let totalDiasTrabalhados = 0;
    
    for (let month = 0; month < 12; month++) {
        if (groupedByMonth[month]) {
            const monthName = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long' });
            const monthRegistros = groupedByMonth[month];
            
            // Agrupar por dia
            const groupedByDay = {};
            monthRegistros.forEach(reg => {
                const dateKey = new Date(reg.data).toISOString().split('T')[0];
                if (!groupedByDay[dateKey]) {
                    groupedByDay[dateKey] = [];
                }
                groupedByDay[dateKey].push(reg);
            });
            
            let monthTable = `
                <h3 style="margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h3>
                <table class="pdf-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Dia</th>
                            <th>Entrada</th>
                            <th>Intervalo</th>
                            <th>Retorno</th>
                            <th>Saída</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            let totalHorasMes = 0;
            let diasUteisMes = 0;
            let diasTrabalhadosMes = 0;
            
            // Obter todos os dias do mês
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(year, month, day);
                const dateKey = currentDate.toISOString().split('T')[0];
                const dayName = currentDate.toLocaleDateString('pt-BR', { weekday: 'short' });
                
                // Verificar se é dia útil (segunda a sexta)
                const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;
                if (isWeekday) {
                    diasUteisMes++;
                    totalDiasUteis++;
                }
                
                // Verificar se é feriado
                const isFeriado = feriados.some(f => f.date === dateKey);
                const feriadoInfo = isFeriado ? feriados.find(f => f.date === dateKey) : null;
                
                // Obter registros do dia
                const dayRegistros = groupedByDay[dateKey] || [];
                
                // Organizar registros por tipo
                const entrada = dayRegistros.find(r => r.tipo === 'Entrada');
                const intervalo = dayRegistros.find(r => r.tipo === 'Intervalo');
                const retorno = dayRegistros.find(r => r.tipo === 'Retorno');
                const saida = dayRegistros.find(r => r.tipo === 'Saída');
                
                // Calcular horas trabalhadas
                let horasTrabalhadas = 0;
                let horasStr = 'N/A';
                
                if (entrada && saida) {
                    diasTrabalhadosMes++;
                    totalDiasTrabalhados++;
                    const entradaTime = new Date(entrada.data);
                    const saidaTime = new Date(saida.data);
                    
                    // Calcular diferença em horas
                    let diffHours = (saidaTime - entradaTime) / (1000 * 60 * 60);
                    
                    // Descontar intervalo se existir
                    if (intervalo && retorno) {
                        const intervaloTime = new Date(intervalo.data);
                        const retornoTime = new Date(retorno.data);
                        const intervaloDiff = (retornoTime - intervaloTime) / (1000 * 60 * 60);
                        diffHours -= intervaloDiff;
                    } else if (diffHours > 6) {
                        // Descontar 1 hora padrão se não houver registro de intervalo
                        diffHours -= 1;
                    }
                    
                    horasTrabalhadas = diffHours;
                    
                    // Formatar horas
                    const hours = Math.floor(diffHours);
                    const minutes = Math.floor((diffHours - hours) * 60);
                    horasStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
                
                totalHorasMes += horasTrabalhadas;
                totalHorasAno += horasTrabalhadas;
                
                monthTable += `
                    <tr ${isFeriado ? 'class="pdf-feriado"' : ''}>
                        <td>${day.toString().padStart(2, '0')}/${(month+1).toString().padStart(2, '0')}</td>
                        <td>${dayName}${isFeriado ? ' (Feriado)' : ''}</td>
                        <td>${entrada ? new Date(entrada.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td>${intervalo ? new Date(intervalo.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td>${retorno ? new Date(retorno.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td>${saida ? new Date(saida.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td>${horasStr}</td>
                    </tr>
                `;
            }
            
            // Formatar total do mês
            const totalHours = Math.floor(totalHorasMes);
            const totalMinutes = Math.floor((totalHorasMes - totalHours) * 60);
            const totalStr = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
            
            // Calcular média diária
            const mediaDiaria = diasTrabalhadosMes > 0 ? totalHorasMes / diasTrabalhadosMes : 0;
            const mediaHours = Math.floor(mediaDiaria);
            const mediaMinutes = Math.floor((mediaDiaria - mediaHours) * 60);
            const mediaStr = `${mediaHours.toString().padStart(2, '0')}:${mediaMinutes.toString().padStart(2, '0')}`;
            
            monthTable += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="6" style="text-align: right;"><strong>Total do Mês:</strong></td>
                            <td><strong>${totalStr}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="text-align: right;"><strong>Média Diária:</strong></td>
                            <td><strong>${mediaStr}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="text-align: right;"><strong>Dias Úteis:</strong></td>
                            <td><strong>${diasUteisMes}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="text-align: right;"><strong>Dias Trabalhados:</strong></td>
                            <td><strong>${diasTrabalhadosMes}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            `;
            
            pdfContent += monthTable;
        }
    }
    
    // Formatar total do ano
    const totalHours = Math.floor(totalHorasAno);
    const totalMinutes = Math.floor((totalHorasAno - totalHours) * 60);
    const totalStr = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}`;
    
    // Calcular média mensal
    const mesesComRegistros = Object.keys(groupedByMonth).length;
    const mediaMensal = mesesComRegistros > 0 ? totalHorasAno / mesesComRegistros : 0;
    const mediaMensalHours = Math.floor(mediaMensal);
    const mediaMensalMinutes = Math.floor((mediaMensal - mediaMensalHours) * 60);
    const mediaMensalStr = `${mediaMensalHours.toString().padStart(2, '0')}:${mediaMensalMinutes.toString().padStart(2, '0')}`;
    
    // Calcular média diária anual
    const mediaDiariaAnual = totalDiasTrabalhados > 0 ? totalHorasAno / totalDiasTrabalhados : 0;
    const mediaDiariaHours = Math.floor(mediaDiariaAnual);
    const mediaDiariaMinutes = Math.floor((mediaDiariaAnual - mediaDiariaHours) * 60);
    const mediaDiariaStr = `${mediaDiariaHours.toString().padStart(2, '0')}:${mediaDiariaMinutes.toString().padStart(2, '0')}`;
    
    pdfContent += `
        <div class="pdf-summary">
            <h3>Resumo Anual</h3>
            <table class="pdf-table">
                <tbody>
                    <tr>
                        <td style="text-align: right; width: 70%;"><strong>Total de Horas Trabalhadas:</strong></td>
                        <td style="font-weight: bold;">${totalStr}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Média Mensal:</strong></td>
                        <td style="font-weight: bold;">${mediaMensalStr}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Média Diária:</strong></td>
                        <td style="font-weight: bold;">${mediaDiariaStr}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Dias Úteis no Ano:</strong></td>
                        <td style="font-weight: bold;">${totalDiasUteis}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;"><strong>Dias Trabalhados:</strong></td>
                        <td style="font-weight: bold;">${totalDiasTrabalhados}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="pdf-notes">
            <p><strong>Observações:</strong></p>
            <ul>
                <li>Horas calculadas considerando 1 hora de intervalo para jornadas acima de 6 horas</li>
                <li>Feriados destacados em amarelo</li>
                <li>Relatório gerado automaticamente pelo sistema de ponto eletrônico</li>
                <li>Jornada padrão: ${userConfig.jornadaInicio || '08:00'} às ${userConfig.jornadaFim || '17:00'}</li>
            </ul>
        </div>
        
        <div class="pdf-footer">
            <p>Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
        
        <div class="pdf-signature">
            <p>_________________________________________</p>
            <p>Assinatura do Responsável</p>
        </div>
    </body>
    </html>
    `;
    
    // Gerar PDF
    const win = window.open('', '_blank');
    win.document.write(pdfContent);
    win.document.close();
    
    // Adicionar delay para garantir que o conteúdo seja carregado antes da impressão
    setTimeout(() => {
        win.print();
    }, 500);
}

// Carregar feriados
function loadFeriados() {
    const feriadosContent = document.getElementById('feriadosContent');
    
    // Agrupar feriados por tipo
    const feriadosPorTipo = {
        'Nacional': [],
        'Estadual': [],
        'Municipal': []
    };
    
    feriados.forEach(feriado => {
        feriadosPorTipo[feriado.type].push(feriado);
    });
    
    // Exibir feriados
    let html = '';
    
    for (const [tipo, lista] of Object.entries(feriadosPorTipo)) {
        if (lista.length > 0) {
            html += `
                <div class="feriado-card">
                    <h4><i class="fas fa-${tipo === 'Nacional' ? 'flag' : tipo === 'Estadual' ? 'map-marked-alt' : 'city'}"></i> Feriados ${tipo}s</h4>
                    <ul>
                        ${lista.map(feriado => {
                            const date = new Date(feriado.date);
                            return `
                                <li>
                                    <strong>${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}:</strong> 
                                    ${feriado.name}
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    feriadosContent.innerHTML = html || '<p>Nenhum feriado cadastrado.</p>';
}

// Exportar backup
function exportBackup() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const dataStr = JSON.stringify(registros, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `ponto_eletronico_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

// Importar backup
function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (Array.isArray(data) && data.length > 0 && data[0].tipo && data[0].data) {
                if (confirm(`Deseja importar ${data.length} registros? Isso substituirá seus registros atuais.`)) {
                    localStorage.setItem('registrosPontos', JSON.stringify(data));
                    alert('Backup importado com sucesso!');
                    loadRegistros();
                    updateBackupStats();
                    showNotification('Backup importado com sucesso!', 'success');
                }
            } else {
                alert('O arquivo não contém dados válidos de registro de ponto.');
            }
        } catch (error) {
            alert('Erro ao ler o arquivo. Certifique-se de que é um JSON válido.');
            console.error(error);
        }
    };
    reader.readAsText(file);
    
    // Limpar o input para permitir nova seleção do mesmo arquivo
    event.target.value = '';
}

// Atualizar estatísticas de backup
function updateBackupStats() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    
    document.getElementById('totalRecords').textContent = registros.length;
    
    if (registros.length > 0) {
        const firstDate = new Date(registros[0].data);
        const lastDate = new Date(registros[registros.length - 1].data);
        
        document.getElementById('recordsPeriod').textContent = 
            `${firstDate.toLocaleDateString('pt-BR')} - ${lastDate.toLocaleDateString('pt-BR')}`;
    } else {
        document.getElementById('recordsPeriod').textContent = 'N/A';
    }
}

// Adicione estas novas funções:
function loadUserConfig() {
    const config = JSON.parse(localStorage.getItem('userConfig')) || defaultConfig;
    
    document.getElementById('userName').value = config.nome;
    document.getElementById('userSetor').value = config.setor;
    document.getElementById('userFuncao').value = config.funcao;
    document.getElementById('userEmpresa').value = config.empresa;
    document.getElementById('userAdmissao').value = config.admissao;
    document.getElementById('jornadaInicio').value = config.jornadaInicio;
    document.getElementById('jornadaFim').value = config.jornadaFim;
}

function saveUserConfig() {
    const config = {
        nome: document.getElementById('userName').value,
        setor: document.getElementById('userSetor').value,
        funcao: document.getElementById('userFuncao').value,
        empresa: document.getElementById('userEmpresa').value,
        admissao: document.getElementById('userAdmissao').value,
        jornadaInicio: document.getElementById('jornadaInicio').value,
        jornadaFim: document.getElementById('jornadaFim').value
    };
    
    localStorage.setItem('userConfig', JSON.stringify(config));
    showNotification('Configurações salvas com sucesso!', 'success');
}
