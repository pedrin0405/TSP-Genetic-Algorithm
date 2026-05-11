# TSP Genetic Algorithm Solver

Uma aplicação web interativa que visualiza a solução do **Problema do Caixeiro Viajante (Traveling Salesman Problem - TSP)** usando um **Algoritmo Genético**.

## Características Principais

### 🎨 Canvas Interativo
- Clique para adicionar cidades ao mapa
- Visualização em SVG com grid de referência
- Desenho automático do melhor caminho encontrado

### 🎮 Controles
- **Play**: Inicia a execução do algoritmo
- **Stop**: Para a execução
- **Step**: Avança uma geração por vez
- **Aleatório**: Gera 10-25 cidades automaticamente
- **Limpar**: Reseta tudo e limpa o canvas

### 📊 Estatísticas em Tempo Real
- Número de gerações executadas
- Melhor distância encontrada
- Contagem de cidades
- Fase atual do algoritmo com descrição visual

### 🔄 Visualização das Fases
- **Inicialização**: Criação da população inicial
- **Avaliação**: Cálculo do fitness de cada indivíduo
- **Seleção**: Seleção dos melhores indivíduos (torneio)
- **Reprodução**: Criação da nova geração (crossover e mutação)

### 📈 Gráfico de Convergência
- Linha mostrando a evolução da melhor distância ao longo das gerações
- Atualização em tempo real

### ⚙️ Parâmetros Ajustáveis
- **Tamanho da População**: 4-200 indivíduos
- **Taxa de Mutação**: 0-100%
- **Taxa de Elitismo**: 0-100%
- Os parâmetros são bloqueados durante a execução

## 🎨 Design
- Interface limpa e profissional
- Dark mode por padrão
- Paleta de cores: Azul principal (#6495ED) com cinzas neutros
- Totalmente responsivo (desktop, tablet e mobile)
- Animações suaves e feedback visual

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Build de Produção
```bash
npm run build
npm start
```

## 📋 Como Jogar

1. **Adicione Cidades**:
   - Clique no canvas para adicionar cidades manualmente
   - Ou use o botão "Aleatório" para gerar automaticamente

2. **Configure os Parâmetros**:
   - Ajuste o tamanho da população
   - Configure a taxa de mutação
   - Configure a taxa de elitismo

3. **Execute o Algoritmo**:
   - Clique "Play" para iniciar automaticamente
   - Use "Step" para avançar manualmente
   - Observe o gráfico de convergência em tempo real

4. **Analise os Resultados**:
   - Veja as estatísticas atualizadas em tempo real
   - Observe qual fase está sendo executada
   - Acompanhe a melhoria da solução no gráfico

## 🧬 Algoritmo Genético Implementado

### Operadores Genéticos
- **Seleção**: Torneio com tamanho 3
- **Crossover**: Ordem com preservação (Order Crossover)
- **Mutação**: Troca aleatória de duas cidades
- **Elitismo**: Preservação dos melhores indivíduos

### Características
- Inicialização com permutações aleatórias
- Função de fitness = distância total da rota
- População dinâmica conforme configuração
- Convergência progressiva

## 🛠️ Stack Tecnológico
- **Next.js 14**: Framework React moderno
- **React 18**: UI interativa
- **TypeScript**: Type safety
- **Recharts**: Gráficos
- **CSS Modules**: Estilos isolados
- **SVG**: Renderização do canvas

## 📱 Responsividade
- Desktop (≥1200px): Layout 2 colunas
- Tablet (768px-1199px): Layout 1 coluna
- Mobile (<768px): Interface otimizada para toque

## 📝 Estrutura do Projeto
```
TSP-Genetic-Algorithm/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Canvas.tsx
│   ├── Canvas.module.css
│   ├── Controls.tsx
│   ├── Controls.module.css
│   ├── Statistics.tsx
│   ├── Statistics.module.css
│   ├── Parameters.tsx
│   ├── Parameters.module.css
│   ├── ConvergenceChart.tsx
│   ├── ConvergenceChart.module.css
│   ├── TSPSolver.tsx
│   └── TSPSolver.module.css
├── lib/
│   └── tsp.ts (Algoritmo genético)
├── public/
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎓 Propósito Educacional
Esta aplicação foi desenvolvida para fins educacionais, demonstrando:
- Como implementar um algoritmo genético
- Visualização de algoritmos em tempo real
- UI/UX interativa com React
- Responsividade com CSS

## 📄 Licença
Projeto para Universidade Luterana do Brasil (ULBRA)

## 👨‍💻 Desenvolvedor
Noobmaster
