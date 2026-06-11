
const currentUrl = window.location.href;
const siteUrl = "https://KeiHiroshima.github.io";
let updatedUrl = currentUrl.replace("https://KeiHiroshima.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("ja".length > 0) {
  updatedUrl = updatedUrl.replace("/ja", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "ナビゲーションメニュー",
    handler: () => {
      window.location.href = "/ja/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "ナビゲーションメニュー",
          handler: () => {
            window.location.href = "/ja/publications/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "ナビゲーションメニュー",
          handler: () => {
            window.location.href = "/ja/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "ナビゲーションメニュー",
          handler: () => {
            window.location.href = "/ja/teaching/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/ja/books/the_godfather/";
            },},{id: "news-論文-tunable-magmax-preference-aware-model-merging-for-continual-learning-が-第28回国際パターン認識会議-icpr-2026-フランス-リヨン-2026年8月17日-22日-に採択されました",
          title: '論文 “Tunable MAGMAX: Preference-Aware Model Merging for Continual Learning” が 第28回国際パターン認識会議 (ICPR 2026)（フランス・リヨン，2026年8月17日〜22日）に採択されました。...',
          description: "",
          section: "ニュース",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "プロジェクト",handler: () => {
              window.location.href = "/ja/projects/9_project/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'SNS',
        handler: () => {
          window.open("/assets/pdf/ja//assets/pdf/en/CV_en.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'メールを送る',
        section: 'SNS',
        handler: () => {
          window.open("mailto:%68%69%72%6F%73%68%69%6D%61-%6B%65%69-%73%74@%79%6E%75.%6A%70", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'SNS',
        handler: () => {
          window.open("https://github.com/KeiHiroshima", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'SNS',
        handler: () => {
          window.open("https://www.linkedin.com/in/kei-hiroshima", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'SNS',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=2nqp4DYAAAAJ", "_blank");
        },
      },{
          id: 'lang-en',
          title: 'en',
          section: '言語',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'ライトテーマに変更',
      description: 'ライトテーマに変更する',
      section: 'テーマ',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'ダークテーマに変更',
      description: 'ダークテーマに変更する',
      section: 'テーマ',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'システムデフォルトテーマを使用',
      description: 'システムデフォルトテーマに変更する',
      section: 'テーマ',
      handler: () => {
        setThemeSetting("system");
      },
    },];
