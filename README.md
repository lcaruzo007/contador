# 🗓️ Contador Diário de 360 Dias

Um contador automático que funciona continuamente por 360 dias, exibindo horário e data no formato brasileiro (pt-BR).

## ✨ Características

- **Contagem Automática**: Conta automaticamente os dias desde o início
- **Horário Real**: Exibe horário atual atualizado a cada segundo
- **Data Brasileira**: Formato de data e hora em português brasileiro (GMT-3)
- **Persistência**: Mantém o progresso mesmo se a página for fechada
- **Marcos Visuais**: Mostra próximos marcos importantes (30, 60, 90 dias, etc.)
- **Barra de Progresso**: Visualização gráfica do progresso
- **Controles**: Pausar/retomar e reiniciar o contador
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Notificações**: Alerta quando completa os 360 dias

## 🚀 Como Usar

1. **Iniciar**: Abra o arquivo `index.html` no navegador
2. **Automático**: O contador inicia automaticamente na primeira vez
3. **Persistente**: O progresso é salvo no navegador
4. **Controles**: Use os botões para pausar ou reiniciar

## 📱 Interface

### Exibição Principal
- **Horário Atual**: Atualizado em tempo real
- **Data Atual**: Formato brasileiro completo
- **Dia Atual**: Qual dia da contagem você está
- **Dias Restantes**: Quantos dias faltam para 360

### Seção de Progresso
- **Barra Visual**: Mostra percentual concluído
- **Percentual**: Valor exato do progresso

### Próximos Marcos
- **30 dias**: 1º Mês 🎯
- **60 dias**: 2 Meses 💪
- **90 dias**: 3 Meses 🚀
- **120 dias**: 4 Meses ⭐
- **150 dias**: 5 Meses 🏆
- **180 dias**: 6 Meses 🎊
- **240 dias**: 8 Meses 🔥
- **300 dias**: 10 Meses 💎
- **360 dias**: Conclusão! 🎉

### Informações
- **Data de Início**: Quando o contador foi iniciado
- **Data Final**: Previsão de conclusão dos 360 dias

## 🔧 Controles

### Pausar/Retomar
- Clique em "⏸️ Pausar" para pausar a contagem
- Clique em "▶️ Retomar" para continuar

### Reiniciar
- Clique em "🔄 Reiniciar Contador" para começar do zero
- Confirmação necessária para evitar perda acidental

## 💾 Armazenamento

O contador salva automaticamente:
- Data de início da contagem
- Dia atual do progresso
- Estado de pausa/execução

Os dados ficam salvos no navegador (localStorage) e persistem entre sessões.

## 🌐 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, smartphone
- **Sistemas**: Windows, macOS, Linux, iOS, Android

## 🛠️ Desenvolvimento

### Estrutura de Arquivos
```
contador/
├── index.html      # Interface principal
├── style.css       # Estilos e layout
├── script.js       # Lógica do contador
└── README.md       # Este arquivo
```

### Funcionalidades Técnicas
- HTML5 semântico
- CSS3 com gradientes e animações
- JavaScript ES6+ com classes
- LocalStorage para persistência
- API de Notificações (opcional)
- Design responsivo com CSS Grid/Flexbox

### Debug (Console do Navegador)
```javascript
// Avançar dias para teste
contadorDebug.advanceDays(30);

// Reset completo
contadorDebug.fullReset();

// Informações de debug
contadorDebug.info();
```

## 📅 Formato de Data/Hora

- **Horário**: HH:MM:SS (24 horas)
- **Data**: dia da semana, DD de mês de AAAA
- **Fuso**: Horário de Brasília (GMT-3)
- **Idioma**: Português brasileiro

### Exemplos:
- Horário: `14:30:45`
- Data: `segunda-feira, 15 de agosto de 2025`

## 🎯 Casos de Uso

- **Projetos**: Acompanhar progresso de projetos de longo prazo
- **Hábitos**: Formar novos hábitos em 360 dias
- **Metas**: Alcançar objetivos com prazo definido
- **Estudos**: Cronograma de estudos anuais
- **Exercícios**: Programa de exercícios de 360 dias
- **Dietas**: Acompanhamento de dieta/nutrição

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique se o JavaScript está habilitado
2. Use navegador atualizado
3. Limpe cache se necessário
4. Use as funções de debug no console

## 🔄 Atualizações

- **v1.0**: Versão inicial com todas as funcionalidades básicas
- Interface responsiva e moderna
- Suporte completo a português brasileiro
- Persistência de dados local
