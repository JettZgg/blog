window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Function to set the theme based on localStorage value
    function setTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(theme);
        document.body.classList.add('theme-transition');
        sunIcon.style.display = theme === 'dark-mode' ? 'none' : 'block';
        moonIcon.style.display = theme === 'dark-mode' ? 'block' : 'none';

        // Remove the transition class after the transition is complete
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300); // Adjust this value to match your CSS transition duration
    }

    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const currentTheme = localStorage.getItem('theme') || 'dark-mode';

    // Apply the current theme from localStorage
    setTheme(currentTheme);

    themeToggle.addEventListener('click', function () {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    });

    function renderMathJax() {
        if (window.MathJax) {
            if (window.MathJax.typesetPromise) {
                MathJax.typesetPromise();
            } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }
        }
    }

    function parseMetadata(content) {
        const metadata = {};
        const metadataRegex = /^---\n([\s\S]+?)\n---/;
        const match = content.match(metadataRegex);

        if (match) {
            const metadataContent = match[1].trim().split('\n');
            metadataContent.forEach(line => {
                const [key, value] = line.split(':').map(item => item.trim());
                metadata[key.toLowerCase()] = value.replace(/["']/g, ''); // Remove quotes if any
            });
            metadata.content = content.replace(metadataRegex, '').trim();
        } else {
            metadata.content = content;
        }

        return metadata;
    }

    function setArticleTitle(title) {
        document.title = title;
    }

    const contentElement = document.getElementById('content');
    const articleListElement = document.getElementById('article-list');
    const urlParams = new URLSearchParams(window.location.search);
    const article = urlParams.get('article');

    // Define the groupArticlesByDate function
    function groupArticlesByDate(articles) {
        const groupedArticles = {};
        articles.forEach(article => {
            const date = new Date(article.date);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            if (!groupedArticles[formattedDate]) {
                groupedArticles[formattedDate] = [];
            }
            groupedArticles[formattedDate].push(article);
        });
        return groupedArticles;
    }

    fetch('assets/json/articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(articles => {
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            const groupedArticles = groupArticlesByDate(articles);

            if (articleListElement) {
                for (const date in groupedArticles) {
                    const dateElement = document.createElement('h2');
                    dateElement.className = 'article-date';
                    dateElement.textContent = date;
                    articleListElement.appendChild(dateElement);

                    groupedArticles[date].forEach(article => {
                        const articleItem = document.createElement('div');
                        articleItem.className = 'article-entry';
                        articleItem.innerHTML = `<span class="article-title"><a href="template.html?article=${article.file.replace('.md', '')}">${article.title}</a></span>`;
                        articleListElement.appendChild(articleItem);
                    });
                }
            }

            if (contentElement && article) {
                const articleData = articles.find(a => a.file.replace('.md', '') === article);

                if (articleData) {
                    fetch(`https://raw.githubusercontent.com/JettZgg/blog/master/articles/${articleData.file}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                        .then(text => {
                            const metadata = parseMetadata(text);
                            contentElement.innerHTML = marked.parse(metadata.content, {
                                breaks: true,
                                gfm: true,
                                sanitize: false,
                                renderer: new marked.Renderer()
                            });
                            Prism.highlightAll();
                            renderMathJax();
                            setArticleTitle(articleData.title);
                        })
                        .catch(error => {
                            contentElement.innerHTML = '<p>Failed to load article. Please refresh or try again later.</p>';
                            console.error('Error fetching the Markdown file:', error);
                        });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching articles list:', error);
        });
});