# Deploying the Umaya User Guide to Netlify

This document provides step-by-step instructions for deploying the Umaya User Guide to Netlify.

## Prerequisites

- A [Netlify](https://www.netlify.com/) account
- Git repository with your project (GitHub, GitLab, or Bitbucket)
- Node.js and npm installed locally

## Option 1: Deploy from Git Repository (Recommended)

### Step 1: Push your code to a Git repository

If you haven't already, push your code to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repository-url>
git push -u origin main
```

### Step 2: Connect to Netlify

1. Log in to your [Netlify account](https://app.netlify.com/)
2. Click the "New site from Git" button
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the repository containing your Umaya User Guide

### Step 3: Configure build settings

Configure the following settings:

- **Branch to deploy**: `main` (or your default branch)
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Step 4: Deploy the site

Click the "Deploy site" button and wait for the build to complete. Netlify will provide a unique URL for your deployed site.

## Option 2: Deploy from Local Environment

### Step 1: Install the Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build your site

```bash
npm run build
```

### Step 3: Log in to Netlify via CLI

```bash
netlify login
```

### Step 4: Initialize Netlify site

```bash
netlify init
```

Follow the prompts to either create a new site or connect to an existing site.

### Step 5: Deploy to production

```bash
netlify deploy --prod
```

## Updating Content

To update the content of the user guide:

1. Edit the markdown file at `public/guide-content.md`
2. If using Git deployment:
   ```bash
   git add public/guide-content.md
   git commit -m "Update guide content"
   git push
   ```
   Netlify will automatically redeploy your site.
3. If using local deployment:
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Custom Domain Setup

To use a custom domain with your Netlify deployment:

1. Go to your site's dashboard in Netlify
2. Click "Domain settings"
3. Click "Add custom domain"
4. Follow the instructions to configure DNS settings

## Troubleshooting

### Build Failures

If your build fails, check the build logs in Netlify for specific errors. Common issues include:

- Missing dependencies
- TypeScript errors
- Next.js configuration issues

### Content Not Updating

If your content isn't updating after deployment:

1. Check that you've updated the correct file (`public/guide-content.md`)
2. Verify that the file was committed and pushed to the correct branch
3. Check Netlify build logs for any errors
4. Try clearing your browser cache

For more assistance, refer to [Netlify's documentation](https://docs.netlify.com/) or contact Netlify support. 