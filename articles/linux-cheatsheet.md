---
title: "Linux Cheatsheet"
date: "2025-01-11T19:48:42"
---

# Linux Cheatsheet
## File and Directory
- **ls**: list
    - -l: detailed info
    - -a: show hidden files
- **cd**: change directory
- **pwd**: print working directory
- **mkdir**: make directory
- **rm**: remove
    - -r: recursive path
    - -f: force remove
- **cp**: copy
    - -r: recursive path
- **mv**: move or rename
- **touch**: create or update file timestamp
- **cat**: view the file
- **head**: view frist 10 lines of the file
    - -n 5: first 5 lines
- **tail**: view list 10 lines

## File permission
- **chmod**: change mod
    - u: user permissions
    - g: group permissions
    - o: other permissions
    - +: add permissions
    - -: remove permissions
    - =: set permissions explicitly
    - r: read
    - w: write
    - x: excute
    ```bash
    chmod u+rwx file.txt 
    ```
- **chown**: change owner of the file
    ```bash
    chown user1 file.txt
    chown user:group file.txt
    ```
- **chgrp**: change group ownership
- **sudo**: give command admin permissons

## Process Management
- **ps**: display running process
    - aux: all process
- **top**: displays system processes and their resource usage
- **kill**: kill a process
    - -9: force kill
    ```bash
    kill PID
    ```
- **pkill**: kill a process by name
    ```bash
    pkill process_name
    ```
- **pgrep**: list all processes with the specified name
    ```bash
    pgrep process_name
    ```
- **grep**: used to search for specific patterns or regular expressions in text files or streams and display matching lines
    - -i: Ignore case distinctions while searching
    - -v: Invert the match, displaying non-matching lines
    - -r or -R: Recursively search directories for matching patterns
    - -l: Print only the names of files containing matches
    - -n: Display line numbers alongside matching lines
    - -w: Match whole words only, rather than partial matches
    - -c: Count the number of matching lines instead of displaying them
    - -e: Specify multiple patterns to search for
    - -A: Display lines after the matching line
    - -B: Display lines before the matching line
    - -C: Display lines both before and after the matching line
    ```bash
    grep -i "hello" file.txt
    grep -v "error" file.txt
    grep -r "pattern" directory/
    grep -l "keyword" file.txt
    grep -n "pattern" file.txt
    ```

## System information
- **uname**: display system information
    - -a: all information
    ```bash
    uname -a
    ```
- **df**: display disk space usage
    - -h: human readable
- **du**: stimate file and directory sizes
    - -h: human readable
    - -s: summary
- **free**: display memory usage
    - -h: human readable
- **uptime**: display system uptime
- **lscpu**: display CPU information

## Network
- **ifconfig**: display network interface information
- **ping**: test network connectivity
- **netstat**: display network statistics
    - -t: TCP
    - -u: UDP
    - -l: listening
    - -n: numeric
    ```bash
    netstat -tuln
    ```
- **ss**: display network statistics
- **curl**: transfer data with URLs
    - -O: output to file
    ```bash
    curl -O file.txt https://example.com/file.txt
    ```
- **wget**: download files from the web
    - -O: output to file
    ```bash
    wget -O file.txt https://example.com/file.txt
    ```
- **ssh**: secure shell
    ```bash
    ssh user@hostname
    ```
- **scp**: secure copy files between hosts
    ```bash
    scp file.txt user@hostname:/path/to/destination 
    ```

