
const currentUrl = window.location.href;
const siteUrl = "https://KeiHiroshima.github.io";
let updatedUrl = currentUrl.replace("https://KeiHiroshima.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("pt-br".length > 0) {
  updatedUrl = updatedUrl.replace("/pt-br", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-sobre",
    title: "sobre",
    section: "Menu de navegação",
    handler: () => {
      window.location.href = "/pt-br/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "um tema simples para acadêmicos",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/blog/";
          },
        },{id: "nav-publicações",
          title: "publicações",
          description: "publicações por categoria em ordem cronológica reversa. gerado pelo jekyll-scholar.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/publications/";
          },
        },{id: "nav-projetos",
          title: "projetos",
          description: "Uma crescente coleção de seus projetos interessantes.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/projects/";
          },
        },{id: "nav-repositórios",
          title: "repositórios",
          description: "Edite o `_data/repositories.yml` e mude as listas `github_users` e `github_repos` para incluir seu próprio perfil do GitHub e repositórios.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Esta é uma descrição da página. Você pode modificá-la em &#39;_pages/cv.md&#39;. Também pode alterar ou remover o botão no topo de download de pdf.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/cv/";
          },
        },{id: "nav-ensino",
          title: "ensino",
          description: "Materiais de cursos que você ministrou. Substitua esse texto com sua descrição.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/teaching/";
          },
        },{id: "nav-membros",
          title: "membros",
          description: "membros do grupo de pesquisa ou laboratório",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/people/";
          },
        },{id: "dropdown-estante-de-livros",
              title: "estante de livros",
              description: "",
              section: "Outras opções",
              handler: () => {
                window.location.href = "/pt-br/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Outras opções",
              handler: () => {
                window.location.href = "/pt-br/blog/";
              },
            },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/pt-br/books/the_godfather/";
            },},{id: "news-um-anúncio-simples-em-uma-linha",
          title: 'Um anúncio simples em uma linha.',
          description: "",
          section: "Novidades",},{id: "news-um-anúncio-longo-com-detalhes",
          title: 'Um anúncio longo com detalhes',
          description: "",
          section: "Novidades",handler: () => {
              window.location.href = "/pt-br/news/announcement_2/";
            },},{id: "news-um-anúncio-simples-em-uma-linha-com-markdown-emoji-sparkles-smile",
          title: 'Um anúncio simples em uma linha com Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "Novidades",},{id: "news-tba",
          title: 'TBA',
          description: "",
          section: "Novidades",},{id: "projects-projeto-1",
          title: 'projeto 1',
          description: "com imagem de fundo",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/1_project/";
            },},{id: "projects-projeto-2",
          title: 'projeto 2',
          description: "um projeto com imagem de fundo e comentários do giscus",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/2_project/";
            },},{id: "projects-projeto-3-com-um-nome-bem-longo",
          title: 'projeto 3 com um nome bem longo',
          description: "um projeto que redireciona pra outro website",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/3_project/";
            },},{id: "projects-projeto-4",
          title: 'projeto 4',
          description: "outro sem imagem",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/4_project/";
            },},{id: "projects-projeto-5",
          title: 'projeto 5',
          description: "um projeto com imagem de fundo",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/5_project/";
            },},{id: "projects-projeto-6",
          title: 'projeto 6',
          description: "um projeto sem imagem",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/9_project/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Redes sociais',
        handler: () => {
          window.open("/assets/pdf/pt-br//assets/pdf/en-us/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'Enviar um email',
        section: 'Redes sociais',
        handler: () => {
          window.open("mailto:%68%69%72%6F%73%68%69%6D%61-%6B%65%69-%73%74@%79%6E%75.%6A%70", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://github.com/KeiHiroshima", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://www.linkedin.com/in/kei-hiroshima", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Redes sociais',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eDwf4zYAAAAJ", "_blank");
        },
      },{
          id: 'lang-en-us',
          title: 'en-us',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Muda o tema para claro',
      description: 'Muda o tema do site para claro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Muda o tema para escuro',
      description: 'Muda o tema do site para escuro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Usa o tema padrão do sistema',
      description: 'Muda o tema do site para o padrão do sistema',
      section: 'Tema',
      handler: () => {
        setThemeSetting("system");
      },
    },];
