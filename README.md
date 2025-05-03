# 🐱‍👤 FURIA CS Chat

Este é um sistema de **chat inteligente** focado nos fãs da organização de e-sports **FURIA**, especialmente na modalidade de **Counter-Strike**. O objetivo é simular um assistente que responde dúvidas comuns dos fãs, oferecendo uma experiência de navegação divertida e interativa, mesmo sem uma API real por trás.

## 🚀 Funcionalidades

- ❓ **Quiz de conhecimento** sobre a FURIA
- 📚 **Curiosidades** históricas e engraçadas
- 🕹️ Informações sobre **jogos passados**
- 📆 Visualização de **jogos futuros** (agenda)
- 👥 Detalhes dos **jogadores**
- 📌 Comandos como `mais` e `voltar` para navegar entre os estados

## 🧠 Estrutura e Estratégia

O sistema foi desenvolvido em **TypeScript** com a ideia de ser facilmente expansível. Para isso, foram aplicados dois padrões de projeto principais:

### 🎯 Strategy Pattern

Cada tópico (quiz, curiosidades, jogos, jogadores etc.) possui sua **própria estratégia**, encapsulando a lógica de resposta:

```ts
export const curiosityStrategy = (msg?: string): Message => { ... };
export const quizStrategy = (msg?: string): Message => { ... };
export const gameStrategy = (msg?: string): Message => { ... };
```

Essa abordagem permite que cada tema evolua separadamente, sem impactar o funcionamento do resto do sistema.

### 🏭 Factory + State Pattern

O arquivo `chatStrategies.ts` atua como uma **fábrica central**, responsável por:

- Detectar o conteúdo da mensagem
- Alterar o estado atual do chat
- Redirecionar a mensagem para a estratégia correta
- Manter controle de estados como `quiz`, `curiosity`, `jogos`, `agenda` etc.

Essa separação facilita:

- Adição de novos tópicos
- Implementação de novas lógicas específicas por tema
- Manutenção do código

---

## 🧩 Estrutura de Arquivos

```
src/
├── strategies/
|   ├──chatFactory.ts
│   ├── curiosityStrategy.ts
│   ├── gameStrategy.ts
│   ├── quizStrategy.ts
│   ├── playersStrategy.ts
│   └── upComingGameStrategy.ts
├── types/
│   └── message.ts
├── data/
│   ├── curiosity.json
│   ├── games.json
│   ├── upcomingGames.json
│   └── players.json
└── App.ts (ou equivalente no front-end)
```

---

## 🛠️ Como utilizar

1. Clone o repositório:

```bash
git clone https://github.com/RobertoSantos98/furia-CSChat
cd furia-CSChat
```

2. Instale as dependências (caso tenha um front-end em Vite/React):

```bash
npm install
npm run dev
```

3. Inicie o projeto e interaja com o chat:
   - Envie perguntas como:
     - `Quero fazer o quiz`
     - `Me fala uma curiosidade`
     - `Quais os próximos jogos?`
     - `Me diga os jogadores`
   - Utilize `voltar` para retornar ao menu
   - Utilize `mais` para continuar a navegação por tópicos

---

## 📈 Conclusão

Esse projeto demonstra como a combinação dos padrões **Strategy** e **Factory** permite construir um **sistema de chat modular, escalável e de fácil manutenção**. Com essa base, é possível adicionar novos temas e lógicas complexas sem afetar funcionalidades já existentes.

Esse tipo de arquitetura é ideal para bots que devem evoluir com o tempo — seja adicionando comandos, integrando com APIs reais ou personalizando interações.

---

## 👨‍💻 Autor

**Roberto dos Santos**  
[GitHub](https://github.com/RobertoSantos98)

---

## 📄 Licença

Este projeto é livre para fins de estudo e demonstração. 😄
