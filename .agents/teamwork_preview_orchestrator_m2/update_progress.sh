#!/bin/bash
sed -i "s/Last visited: .*/Last visited: $(date -u +"%Y-%m-%dT%H:%M:%SZ")/" progress.md
