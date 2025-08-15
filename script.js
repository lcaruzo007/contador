class ContadorDiario {
    constructor() {
        this.isRunning = true;
        this.isPaused = false;
        this.startDate = null;
        this.currentDay = 1;
        this.totalDays = 365;
        
        this.init();
        this.setupEventListeners();
        this.startCounter();
    }

    init() {
        // Verifica se já existe uma data de início salva
        const savedStartDate = localStorage.getItem('contador_start_date');
        const savedCurrentDay = localStorage.getItem('contador_current_day');
        
        if (savedStartDate) {
            this.startDate = new Date(savedStartDate);
            this.currentDay = parseInt(savedCurrentDay) || this.calculateCurrentDay();
        } else {
            this.startDate = new Date();
            this.saveToLocalStorage();
        }
        
        this.updateDisplay();
        this.updateDateTime();
    }

    calculateCurrentDay() {
        const now = new Date();
        const diffTime = Math.abs(now - this.startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return Math.min(diffDays, this.totalDays);
    }

    updateDateTime() {
        const now = new Date();
        
        // Formatação da hora
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Sao_Paulo'
        };
        
        // Formatação da data
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Sao_Paulo'
        };
        
        const timeString = now.toLocaleTimeString('pt-BR', timeOptions);
        const dateString = now.toLocaleDateString('pt-BR', dateOptions);
        
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDate').textContent = dateString;
    }

    updateDisplay() {
        if (this.isPaused) return;
        
        // Calcula o dia atual baseado no tempo decorrido
        this.currentDay = this.calculateCurrentDay();
        
        // Atualiza os elementos do DOM
        document.getElementById('currentDay').textContent = this.currentDay;
        document.getElementById('remainingDays').textContent = Math.max(0, this.totalDays - this.currentDay);
        
        // Calcula e atualiza o progresso
        const progressPercent = (this.currentDay / this.totalDays) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        document.getElementById('progressPercent').textContent = `${progressPercent.toFixed(2)}%`;
        
        // Atualiza as datas de início e fim
        this.updateDates();
        
        // Atualiza os marcos
        this.updateMilestones();
        
        // Verifica se completou os 360 dias
        if (this.currentDay >= this.totalDays) {
            this.onCounterComplete();
        }
        
        // Salva o progresso
        this.saveToLocalStorage();
    }

    updateDates() {
        const startDateString = this.startDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + this.totalDays - 1);
        
        const endDateString = endDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('startDate').textContent = startDateString;
        document.getElementById('endDate').textContent = endDateString;
    }

    updateMilestones() {
        const milestones = [
            { day: 30, name: '1º Mês', emoji: '🎯' },
            { day: 60, name: '2 Meses', emoji: '💪' },
            { day: 90, name: '3 Meses', emoji: '🚀' },
            { day: 120, name: '4 Meses', emoji: '⭐' },
            { day: 150, name: '5 Meses', emoji: '🏆' },
            { day: 180, name: '6 Meses', emoji: '🎊' },
            { day: 240, name: '8 Meses', emoji: '🔥' },
            { day: 300, name: '10 Meses', emoji: '💎' },
            { day: 360, name: 'Conclusão!', emoji: '🎉' }
        ];
        
        const milestonesContainer = document.getElementById('milestones');
        milestonesContainer.innerHTML = '';
        
        // Mostra apenas os próximos 4 marcos não atingidos
        const upcomingMilestones = milestones
            .filter(milestone => milestone.day > this.currentDay)
            .slice(0, 4);
        
        upcomingMilestones.forEach(milestone => {
            const milestoneElement = document.createElement('div');
            milestoneElement.className = 'milestone';
            
            const daysToMilestone = milestone.day - this.currentDay;
            
            milestoneElement.innerHTML = `
                <h4>${milestone.emoji} ${milestone.name}</h4>
                <p>Dia ${milestone.day}</p>
                <p>Em ${daysToMilestone} dias</p>
            `;
            
            milestonesContainer.appendChild(milestoneElement);
        });
        
        // Se não há marcos futuros, mostra mensagem de conclusão
        if (upcomingMilestones.length === 0 && this.currentDay >= this.totalDays) {
            milestonesContainer.innerHTML = `
                <div class="milestone completed">
                    <h4>🎉 Parabéns!</h4>
                    <p>Você completou os 365 dias!</p>
                </div>
            `;
        }
    }

    onCounterComplete() {
        document.body.classList.add('completed');
        
        // Mostra uma notificação de conclusão
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Contador Concluído!', {
                body: 'Parabéns! Você completou os 365 dias!',
                icon: '🎉'
            });
        }
    }

    startCounter() {
        // Atualiza a cada segundo
        this.intervalId = setInterval(() => {
            this.updateDateTime();
            
            // Atualiza o contador a cada minuto para verificar mudança de dia
            const now = new Date();
            if (now.getSeconds() === 0) {
                this.updateDisplay();
            }
        }, 1000);
        
        // Solicita permissão para notificações
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    pause() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.isPaused) {
            pauseBtn.textContent = '▶️ Retomar';
            pauseBtn.classList.add('paused');
            document.body.classList.add('paused');
        } else {
            pauseBtn.textContent = '⏸️ Pausar';
            pauseBtn.classList.remove('paused');
            document.body.classList.remove('paused');
            this.updateDisplay();
        }
    }

    reset() {
        if (confirm('Tem certeza que deseja reiniciar o contador? Todo o progresso será perdido.')) {
            this.startDate = new Date();
            this.currentDay = 1;
            this.isPaused = false;
            
            // Remove classes especiais
            document.body.classList.remove('completed', 'paused');
            document.getElementById('pauseBtn').classList.remove('paused');
            document.getElementById('pauseBtn').textContent = '⏸️ Pausar';
            
            this.saveToLocalStorage();
            this.updateDisplay();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('contador_start_date', this.startDate.toISOString());
        localStorage.setItem('contador_current_day', this.currentDay.toString());
    }

    setupEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        
        // Salva o estado quando a página for fechada
        window.addEventListener('beforeunload', () => this.saveToLocalStorage());
        
        // Atualiza quando a página ganha foco (caso tenha ficado inativa)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.updateDisplay();
                this.updateDateTime();
            }
        });
    }
}

// Inicializa o contador quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    new ContadorDiario();
});

// Funções auxiliares para desenvolvimento/debug
window.contadorDebug = {
    // Avança dias para teste
    advanceDays: (days) => {
        const startDate = new Date(localStorage.getItem('contador_start_date'));
        startDate.setDate(startDate.getDate() - days);
        localStorage.setItem('contador_start_date', startDate.toISOString());
        location.reload();
    },
    
    // Reseta completamente
    fullReset: () => {
        localStorage.removeItem('contador_start_date');
        localStorage.removeItem('contador_current_day');
        location.reload();
    },
    
    // Mostra informações de debug
    info: () => {
        console.log({
            startDate: localStorage.getItem('contador_start_date'),
            currentDay: localStorage.getItem('contador_current_day'),
            now: new Date().toISOString()
        });
    }
};
