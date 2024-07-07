window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});

// Ensure MathJax processes any LaTeX in the loaded content after Marked.js parsing
function renderMathJax() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// Set article tile
function setArticleTitle(title) {
    document.title = title;
}

// Function to parse the metadata from the markdown content
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

// Function to group articles by date
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

// Load and parse Markdown file
document.addEventListener('DOMContentLoaded', function() {
    const contentElement = document.getElementById('content');
    const articleListElement = document.getElementById('article-list');
    const urlParams = new URLSearchParams(window.location.search);
    const article = urlParams.get('article');

    // Fetch the articles list from articles.json
    fetch('assets/json/articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(articles => {
            // Sort articles by date in descending order
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Group articles by date
            const groupedArticles = groupArticlesByDate(articles);

            if (articleListElement) {
                // Display grouped article titles on the home page
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
                // Find the article file in the articles list
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
                            contentElement.innerHTML = marked.parse(metadata.content); // Use metadata.content instead of raw text
                            Prism.highlightAll(); // Apply Prism.js highlighting
                            renderMathJax(); // Ensure MathJax processes the content
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
