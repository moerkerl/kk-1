# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Information



## Common Commands


## Git Workflow

- Commit changes after completing implementation with meaningful commit messages
- The main branch is the primary branch for development

## Code Organization

- `/kk-project` - Main application directory 


## Communication Guidelines

- Refer to the developer as "Liam" or "you, the developer"
- Refer to yourself as "you" or "Master-Agent"
- Use Subagents whenever possible to handle specific subtasks. You yourself should make sure, that they work well, but never perform tasks yourself. Always use subagents.
- For each task, the subagent should document the task when finished in the current `/conversation` folder as a .md file
- Read the latest .md files in the current `/conversation` folder to understand context

## Implementation Guidelines

- Test that build and npm start work properly before committing changes
- Check for duplicate components/pages - only one version should remain after refactoring


## Development Process

- Create or update conversation documentation in numbered folders (001_foldername)
- Within each folder, use numbered .md files to track progress. you should do that and you should always adivse the subagents to do that as well.
- Organize work in logical steps and document the process
- regularly update CLAUDE.md

## Modi System

The application should includes a global Modi System for development and testing purposes:

### Overview
- A floating button appears in the bottom-right corner of all pages
- Clicking the button opens a Modi Control Modal
- Allows switching between different user states and dashboard modes without actual authentication

