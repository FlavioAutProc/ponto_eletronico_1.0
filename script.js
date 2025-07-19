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
    loadRegistros();
    updateBackupStats();

    // Configurar listeners dos botões
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
        <h1 style="text-align: center;">Relatório Mensal de Ponto</h1>
        <h2 style="text-align: center;">${monthName}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 8px;">Data</th>
                    <th style="border: 1px solid #000; padding: 8px;">Dia</th>
                    <th style="border: 1px solid #000; padding: 8px;">Entrada</th>
                    <th style="border: 1px solid #000; padding: 8px;">Intervalo</th>
                    <th style="border: 1px solid #000; padding: 8px;">Retorno</th>
                    <th style="border: 1px solid #000; padding: 8px;">Saída</th>
                    <th style="border: 1px solid #000; padding: 8px;">Total</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    let totalHorasMes = 0;
    let diasUteis = 0;
    let diasTrabalhados = 0;
    
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
            
            // Formatar horas
            const hours = Math.floor(diffHours);
            const minutes = Math.floor((diffHours - hours) * 60);
            horasStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        
        totalHorasMes += horasTrabalhadas;
        
        pdfContent += `
            <tr ${isFeriado ? 'style="background-color: #fff3cd;"' : ''}>
                <td style="border: 1px solid #000; padding: 8px;">${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}</td>
                <td style="border: 1px solid #000; padding: 8px;">${dayName}${isFeriado ? ' (Feriado)' : ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${entrada ? new Date(entrada.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td style="border: 1px solid #000; padding: 8px;">${intervalo ? new Date(intervalo.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td style="border: 1px solid #000; padding: 8px;">${retorno ? new Date(retorno.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td style="border: 1px solid #000; padding: 8px;">${saida ? new Date(saida.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                <td style="border: 1px solid #000; padding: 8px;">${horasStr}</td>
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
    
    pdfContent += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Total do Mês:</strong></td>
                    <td style="border: 1px solid #000; padding: 8px;"><strong>${totalStr}</strong></td>
                </tr>
                <tr>
                    <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Média Diária:</strong></td>
                    <td style="border: 1px solid #000; padding: 8px;"><strong>${mediaStr}</strong></td>
                </tr>
                <tr>
                    <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Dias Úteis:</strong></td>
                    <td style="border: 1px solid #000; padding: 8px;"><strong>${diasUteis}</strong></td>
                </tr>
                <tr>
                    <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Dias Trabalhados:</strong></td>
                    <td style="border: 1px solid #000; padding: 8px;"><strong>${diasTrabalhados}</strong></td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top: 30px; font-size: 0.9rem;">
            <p><strong>Observações:</strong></p>
            <ul>
                <li>Horas calculadas considerando 1 hora de intervalo para jornadas acima de 6 horas</li>
                <li>Feriados destacados em amarelo</li>
                <li>Relatório gerado automaticamente pelo sistema de ponto eletrônico</li>
            </ul>
        </div>
        <p style="margin-top: 20px; text-align: right; font-size: 0.9rem;">Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
    `;
    
    // Gerar PDF (simulação - em produção usar biblioteca como jsPDF)
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório Mensal de Ponto - ${monthName}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #000; padding: 8px; text-align: center; }
                .feriado { background-color: #fff3cd; }
                tfoot tr { font-weight: bold; background-color: #f2f2f2; }
                h1, h2 { color: #2c3e50; }
                ul { padding-left: 20px; }
            </style>
        </head>
        <body>
            ${pdfContent}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

// Exportar relatório anual em PDF
function exportYearPDF() {
    const registros = JSON.parse(localStorage.getItem('registrosPontos') || '[]');
    const year = document.getElementById('reportYear').value;
    
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
        <h1 style="text-align: center;">Relatório Anual de Ponto</h1>
        <h2 style="text-align: center;">Ano ${year}</h2>
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
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">Data</th>
                            <th style="border: 1px solid #000; padding: 8px;">Dia</th>
                            <th style="border: 1px solid #000; padding: 8px;">Entrada</th>
                            <th style="border: 1px solid #000; padding: 8px;">Intervalo</th>
                            <th style="border: 1px solid #000; padding: 8px;">Retorno</th>
                            <th style="border: 1px solid #000; padding: 8px;">Saída</th>
                            <th style="border: 1px solid #000; padding: 8px;">Total</th>
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
                    <tr ${isFeriado ? 'style="background-color: #fff3cd;"' : ''}>
                        <td style="border: 1px solid #000; padding: 8px;">${day.toString().padStart(2, '0')}/${(month+1).toString().padStart(2, '0')}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${dayName}${isFeriado ? ' (Feriado)' : ''}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${entrada ? new Date(entrada.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${intervalo ? new Date(intervalo.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${retorno ? new Date(retorno.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${saida ? new Date(saida.data).toLocaleTimeString('pt-BR') : 'N/A'}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${horasStr}</td>
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
                            <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Total do Mês:</strong></td>
                            <td style="border: 1px solid #000; padding: 8px;"><strong>${totalStr}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Média Diária:</strong></td>
                            <td style="border: 1px solid #000; padding: 8px;"><strong>${mediaStr}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Dias Úteis:</strong></td>
                            <td style="border: 1px solid #000; padding: 8px;"><strong>${diasUteisMes}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="border: 1px solid #000; padding: 8px; text-align: right;"><strong>Dias Trabalhados:</strong></td>
                            <td style="border: 1px solid #000; padding: 8px;"><strong>${diasTrabalhadosMes}</strong></td>
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
        <div style="margin-top: 30px; border-top: 2px solid #000; padding-top: 15px;">
            <h3>Resumo Anual</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tbody>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; width: 30%;"><strong>Total de Horas Trabalhadas:</strong></td>
                        <td style="border: 1px solid #000; padding: 8px;">${totalStr}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px;"><strong>Média Mensal:</strong></td>
                        <td style="border: 1px solid #000; padding: 8px;">${mediaMensalStr}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px;"><strong>Média Diária:</strong></td>
                        <td style="border: 1px solid #000; padding: 8px;">${mediaDiariaStr}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px;"><strong>Dias Úteis no Ano:</strong></td>
                        <td style="border: 1px solid #000; padding: 8px;">${totalDiasUteis}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px;"><strong>Dias Trabalhados:</strong></td>
                        <td style="border: 1px solid #000; padding: 8px;">${totalDiasTrabalhados}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top: 30px; font-size: 0.9rem;">
            <p><strong>Observações:</strong></p>
            <ul>
                <li>Horas calculadas considerando 1 hora de intervalo para jornadas acima de 6 horas</li>
                <li>Feriados destacados em amarelo</li>
                <li>Relatório gerado automaticamente pelo sistema de ponto eletrônico</li>
            </ul>
        </div>
        <p style="margin-top: 20px; text-align: right; font-size: 0.9rem;">Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
    `;
    
    // Gerar PDF (simulação - em produção usar biblioteca como jsPDF)
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório Anual de Ponto - ${year}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #000; padding: 8px; text-align: center; }
                .feriado { background-color: #fff3cd; }
                tfoot tr { font-weight: bold; background-color: #f2f2f2; }
                h1, h2, h3 { color: #2c3e50; }
                ul { padding-left: 20px; }
            </style>
        </head>
        <body>
            ${pdfContent}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `);
    win.document.close();
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