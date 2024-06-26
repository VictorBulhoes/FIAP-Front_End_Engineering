# Blog Victor B. Bulhões

Este projeto representa um blog simples, que utiliza Contentful como DB para armazenar os posts, que foi desenvolvido como projeto final da disciplina de Front End Engineering na pós-graduação de Engenharia de Software da FIAP em 2024. 

# Instalação:

Clone este repositório com o comando `git clone https://github.com/VictorBulhoes/FIAP-Front_End_Engineering.git` no terminal.

Navegue pelo terminal até o diretório que foi clonado e rode o comando `npm install`.

# Contentful: 

Para este projeto funcionar, você precisa seguir esses passos: 

1. Criar uma conta em https://www.contentful.com/.
2. Criar dois _Content Models_, um chamado **Blog Category** e outro chamado **Blog Post**.
    - **Blog Category** precisa ter dois campos, **Blog Category Title** (Entry Title, Short Text) e **Blog Category Slug** (Short Text).
    - **Blog Post** precisa ter os seguintes campos:
        - **Blog Post Title** (Entry Title, Short Text)
        - **Blog Post Description** (Short Text)
        - **Blog Post Slug** (Short Text)
        - **Blog Post Content** (Rich Text)
        - **Blog Post Category** (Reference) (Blog Category)
3. Acessar a aba de API Keys do seu Space, e salvar o _Space ID_ e o _Content Delivery API_ em algum lugar.
4. Criar um documento chamado `.env.local` no diretório do projeto clonado, e colocar o seguinte conteúdo: <div>
`VITE_SPACE_ID=<Space ID copiado>` <div>
`VITE_ACCESS_TOKEN=<Contend Delivery API copiado>`

# Execução: 

Para rodar o projeto, rode o comando `npm run dev` pelo terminal no diretório em que o projeto foi clonado.