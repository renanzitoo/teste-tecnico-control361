# 🚚 Delivery Tracker App

Aplicativo web desenvolvido como parte de um teste técnico para uma empresa, com o objetivo de rastrear em tempo real os veículos de entrega. O sistema exibe a localização atual dos veículos em um mapa interativo, utilizando a API do Google Maps e a API fornecida pela empresa.

![Mapa com Rastreamento]('demo.png')

## 🛠️ Tecnologias Utilizadas

- **React** – Biblioteca para construção da interface do usuário
- **TypeScript** – Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** – Estilização com utilitários de forma rápida e responsiva
- **Material UI** – Componentes prontos e acessíveis para uma UI moderna
- **Google Maps API** – Exibição de mapas e localização dos veículos
- **API da empresa** – Fornece os dados de localização e status dos veículos

## 📸 Funcionalidades

- Visualização de um mapa com a localização dos veículos em tempo real
- Detalhes de cada carro (ID, status, última atualização)
- Interface moderna, responsiva e de fácil uso
- Atualização automática das posições a cada intervalo de tempo

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/delivery-tracker.git
   cd delivery-tracker
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz com as seguintes variáveis:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=sua-chave-google
   VITE_COMPANY_API_URL=url-da-api-da-empresa
   ```

4. Inicie o projeto:
   ```bash
   npm run dev
   ```

## 📂 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis com Tailwind e Material UI
├── hooks/            # Hooks personalizados para lógica reutilizável
├── pages/            # Páginas principais da aplicação
├── services/         # Integração com APIs externas (Google, empresa)
├── types/            # Tipagens TypeScript usadas na aplicação
├── utils/            # Funções utilitárias e helpers
├── App.tsx           # Componente principal da aplicação
├── App.test.tsx      # Testes da aplicação (opcional)
├── index.tsx         # Ponto de entrada do React
├── index.css         # Estilos globais
├── App.css           # Estilos do componente App
```

## 📌 Observações

- O projeto foi desenvolvido com foco na clareza do código, organização e usabilidade.
- O sistema de rastreamento funciona de forma simulada com base nas informações fornecidas pela API da empresa.
- O design é totalmente responsivo, adaptando-se a diferentes tamanhos de tela.

## 💬 Contato

Caso tenha interesse em discutir este projeto ou queira me conhecer melhor:

**Renanzitoo**  
📧 renan.costa2098@gmail.com
🔗 [linkedin.com/in/renanzitoo](https://linkedin.com/in/renanzitoo)