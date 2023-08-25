#!/bin/bash

# Check if the correct number of arguments is passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_branch> <target_branch>"
    exit 1
fi

# Assign branch names from arguments
SOURCE_BRANCH="$1"
TARGET_BRANCH="$2"

# Define a function to handle cleanup on error
function cleanup_on_error {
    echo "Operation failed. Cleaning up backup branch..."
    git branch -D $BACKUP_BRANCH
    echo "Backup branch deleted locally."
}

# Register the cleanup function to run on script exit due to an error
trap cleanup_on_error ERR

# Ensure we're on the latest version of both branches
git fetch

# Check if the remote is using HTTPS and switch to SSH if needed
REMOTE_URL=$(git remote get-url origin)
if [[ $REMOTE_URL == https://* ]]; then
    SSH_URL=${REMOTE_URL/https:\/\/github.com\//git@github.com:}
    git remote set-url origin $SSH_URL
    echo "Switched remote URL to SSH"
else
    echo "Remote is already using SSH"
fi

# Create a backup branch with the naming schema "branchname-day-month-year-hourminsec"
BACKUP_BRANCH="$TARGET_BRANCH-backup-$(date "+%d-%m-%Y-%H%M%S")"

# Checkout the target branch
git checkout $TARGET_BRANCH

# Create the backup branch
git branch $BACKUP_BRANCH

# Reset target branch to be the same as source branch
git reset --hard $SOURCE_BRANCH

# Push the backup branch to remote
git push origin $BACKUP_BRANCH

# Confirm and push changes to the overridden branch
read -p "Do you want to force push these changes to remote? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git push origin $TARGET_BRANCH --force
fi

echo "Operation completed!"
