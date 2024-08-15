import sys
import os
import json
from datetime import datetime

def create_new_article(title):
    # Format the current date and time
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    # Create the content for the new article
    content = f"""---
title: "{title}"
date: "{current_time}"
---

# {title}


"""
    # Define the file name
    file_name = f"articles/{title.replace(' ', '-').lower()}.md"
    # Write the content to the file
    with open(file_name, 'w') as file:
        file.write(content)
    
    # Load the existing articles list
    articles_file = 'assets/json/articles.json'
    if os.path.exists(articles_file):
        with open(articles_file, 'r') as file:
            articles = json.load(file)
    else:
        articles = []

    # Add the new article to the list
    articles.append({'title': title, 'file': file_name.replace('articles/', ''), 'date': current_time})
    
    # Write the updated list back to the JSON file
    with open(articles_file, 'w') as file:
        json.dump(articles, file, indent=4)

    print(f"New article created: {file_name}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python new.py <article-title>")
    else:
        article_title = sys.argv[1]
        create_new_article(article_title)
