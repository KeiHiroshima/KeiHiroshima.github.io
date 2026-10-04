---
page_id: about
layout: about
title: about
permalink: /
subtitle: PhD student at <a href="https://www.ynu.ac.jp/" target="_blank">Yokohama National University</a> <a href="https://shiralab.ynu.ac.jp/en/" target="_blank">Shirakawa/Uchida Laboratory</a>. # <a href='#'>Affiliations</a>.

profile:
  align: right
  image: prof_pic.png
  image_circular: false # crops the image to make it circular
  # more_info: >
  #   <p>555 your office number</p>
  #   <p>123 your address street</p>
  #   <p>Your City, State 12345</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I am interested in machine learning, optimization, and the intersection of the two. My PhD research focuses on two themes.

The first is continual learning. Machine learning models deployed in real-world settings must keep adapting to new tasks and data. However, training on a new task often causes catastrophic forgetting—the loss of previously acquired capabilities—while retraining from scratch to avoid it is costly. I study how to balance acquiring new knowledge with retaining existing knowledge, using model merging as my main approach.

The second is automating black-box optimization (BBO) with large language models (LLMs). BBO arises widely in practice, from hyperparameter optimization to experimental design, but applying it to a real problem requires designing a search space and selecting an optimizer, both of which demand expert knowledge. I formulate Black-Box Optimization Word Problems (BBOWP), a task in which an LLM makes these design choices from a natural-language problem description alone, and build a benchmark to evaluate LLMs on it.

I expect to complete my PhD in March 2028 and am seeking research positions in machine learning and optimization.

- Machine learning, optimization, large language models
- Continual learning, catastrophic forgetting, model merging
- Black-box optimization, search space design, optimizer selection

<!-- Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](http://reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/multi-language-al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them. -->
