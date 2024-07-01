#!/bin/bash

# Solicita a mensagem de commit ao usuário
read -p "Digite a mensagem do commit: " commit_message

# Executa os comandos Git
git add .
git commit -m "$commit_message"
git push
